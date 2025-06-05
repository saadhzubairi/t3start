/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Needs to be a client component for IntersectionObserver

import React, { useEffect, useRef, useState, ElementType, HTMLAttributes } from 'react';

interface FadeInProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: ElementType;        // Allows specifying the wrapper element type, defaults to 'div'
  threshold?: number;      // IntersectionObserver threshold (0 to 1)
  duration?: number;       // Fade-in duration in milliseconds
  delay?: number;          // Delay before fade-in starts in milliseconds
  translateY?: number;     // Optional vertical translation in pixels (e.g., 20 for a 20px upward move on reveal)
  // className and style are part of HTMLAttributes
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  as: Tag = 'div',
  threshold = 0.1,       // Default threshold
  duration = 500,        // Default duration: 500ms
  delay = 0,             // Default delay: 0ms
  translateY = 0,        // Default no vertical translation
  className,
  style,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  // Using HTMLElement for the ref type as 'as' can be any HTML tag.
  const domRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentElement = domRef.current;

    if (!currentElement) {
      return; // Element not yet available
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(currentElement); // Animate only once
          }
        });
      },
      { threshold }
    );

    observer.observe(currentElement);

    return () => {
      // Cleanup: unobserve the element when the component unmounts or threshold changes
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]); // Re-run effect if threshold changes

  // Define animation styles dynamically
  const animationStyles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${translateY}px)`,
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'ease-in-out',
    transitionDelay: `${delay}ms`,
  };

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ref={domRef as any /* Casting for dynamic Tag type, common in polymorphic components */}
      className={className} // Allows users to add their own classes
      style={{ ...animationStyles, ...style }} // Merge animation styles with any user-provided styles
      {...rest} // Spread other HTML attributes
    >
      {children}
    </Tag>
  );
};

export default FadeIn;