"use client";
// components/Logo.tsx
import Link from 'next/link';
import { Lobster } from 'next/font/google'; // Corrected import name and removed unused fonts
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useTheme } from 'next-themes';

// Initialize the Major Mono Display font
const majorMonoDisplay = Lobster({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Define the props for the Logo component
interface LogoProps {
  size?: string;
  href?: string;
  className?: string;
}

const ViewfinderLogo: React.FC<LogoProps> = ({
  size = '2rem',
  href = '/',
  className = '',
}) => {
  const { theme, resolvedTheme } = useTheme(); // Get both theme and resolvedTheme
  const [mounted, setMounted] = useState(false); // State to track if component is mounted

  // useEffect to set mounted to true after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the color based on the resolved theme AFTER hydration
  const textColor = mounted ? (resolvedTheme === 'light' ? 'black' : 'white') : 'black'; // Default to black during SSR/initial hydration for consistency or a fallback

  // If you strictly want the system theme before mount,
  // or a consistent SSR color, you could also do:
  // const textColor = resolvedTheme === 'light' ? 'black' : 'white';
  // And apply a `key` prop to the span if still getting hydration errors,
  // or use `mounted &&` for the span directly, but the current approach
  // with a fallback color during SSR is generally safer.

  return (
    <>
      <Link
        href={{
          pathname: href,
          query: { name: 'test' },

        }}
        className={`${majorMonoDisplay.className} ${className} transition-opacity hover:opacity-80`}
        style={{
          fontSize: size,
          color: textColor, 
          lineHeight: 1,
          textDecoration: 'none',
        }}
      >
        Viewfinder
      </Link>
    </>
  );
};

export default ViewfinderLogo;