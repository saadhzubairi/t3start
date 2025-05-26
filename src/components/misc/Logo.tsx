// components/Logo.tsx
import Link from 'next/link';
import { Major_Mono_Display } from 'next/font/google'; // Corrected import name
import React from 'react';

// Initialize the Major Mono Display font
// This setup allows Next.js to optimize font loading.
// Major Mono Display typically only supports a '400' (Regular) weight.
// Setting a different weight (e.g., '700', '900', or 'bold') in the options below
// will likely have no visual effect as the font file itself does not contain other weights.
// The browser will render the available '400' weight.
const majorMonoDisplay = Major_Mono_Display({
  weight: '400', // '400' is the standard and generally only available weight for Major Mono Display.
  subsets: ['latin'],
  display: 'swap', // Ensures text is visible while the font loads
});

// Define the props for the Logo component
interface LogoProps {
  /**
   * The font size for the logo. Can be any valid CSS font-size value (e.g., '2rem', '24px').
   * Defaults to '2rem'.
   */
  size?: string;
  /**
   * The color of the logo text. Can be any valid CSS color value (e.g., '#FF0000', 'blue', 'var(--custom-color)').
   * Defaults to 'inherit', which will take the color from its parent element.
   */
  color?: string;
  /**
   * The destination URL for the link.
   * Defaults to '/'.
   */
  href?: string;
  /**
   * Optional additional className for further Tailwind CSS or custom styling.
   */
  className?: string;
}

/**
 * ViewfinderLogo component.
 * Displays the "Viewfinder" text as a link, styled with the Major Mono Display font.
 * Allows customization of size and color through props.
 */
const ViewfinderLogo: React.FC<LogoProps> = ({
  size = '2rem', // Default font size
  color = 'inherit', // Default color
  href = '/', // Default link to homepage
  className = '', // Default empty className
}) => {
  return (
    <Link href={href} passHref>
      <span // Using a span for the text itself to apply styles
        className={`${majorMonoDisplay.className} ${className} transition-opacity hover:opacity-80`} // Apply the font class and any additional classes
        style={{
          fontSize: size,
          color: color,
          lineHeight: 1, // Often good for single-line display fonts to prevent extra spacing
          textDecoration: 'none', // Ensuring no underline from the link by default on the span
        }}
      >
        Viewfinder
      </span>
    </Link>
  );
};

export default ViewfinderLogo;

// How to use it in another component:
/*
import ViewfinderLogo from './components/Logo'; // Adjust path as needed

function Header() {
  return (
    <header className="p-4 bg-gray-800">
      <ViewfinderLogo size="2.5rem" color="#FFFFFF" />
      {/* Or using Tailwind for color if you have it defined *\/}
      {/* <ViewfinderLogo size="32px" className="text-custom-sky-deep" /> *\/}
    </header>
  );
}

export default Header;
*/
