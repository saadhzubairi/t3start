/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Needs to be a client component for IntersectionObserver

import React, { useEffect, useRef, useState, ElementType, HTMLAttributes } from 'react';

interface ScrollAnimatedProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  delay?: "0" | "75" | "100" | "200" | "300" | "500" | "700" | "1000" | null;
  animationClass?: string;
  threshold?: number;
  href?: string; // Optional href for anchor tags
  /* href?: string; // Optional href for anchor tags */
  as?: ElementType; // Allows specifying the wrapper element type
}

const ScrollAnimated: React.FC<ScrollAnimatedProps> = ({
  children,
  delay,
  animationClass = 'scroll-animate',
  threshold = 0.1,
  as: Tag = 'div', // Default to 'div'
  className,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Observe only once
          }
        });
      },
      { threshold }
    );

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const delayClass = delay ? `delay-${delay}` : '';
  const combinedClassName = `${animationClass} ${isVisible ? 'is-visible' : ''} ${delayClass} ${className ?? ''}`.trim();

  return (
    <Tag ref={domRef as any} className={combinedClassName} {...rest}>
      {children}
    </Tag>
  );
};

export default ScrollAnimated;