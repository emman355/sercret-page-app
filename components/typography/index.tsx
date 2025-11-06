import React from 'react';
import clsx from 'clsx';

// --- Type Definitions ---

/**
 * Defines the available text variants (styles) for the component.
 * This ensures type safety and autocompletion when using the component.
 */
type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body'
  | 'small'
  ;

/**
 * Defines the allowed HTML elements for each variant.
 */
const ElementMap: Record<Variant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subtitle: 'p', // Render subtitle as a paragraph tag
  body: 'p',     // Render body text as a paragraph tag
  small: 'span',
};

/**
 * Defines the properties for the Typography component.
 */
interface TypographyProps {
  /** The text content to display. */
  children: React.ReactNode;
  /** The predefined style variant to use (e.g., 'h1', 'body'). */
  variant: Variant;
  /** Optional custom Tailwind classes to override or extend the variant styles. */
  className?: string;
  /** Optional text color utility (e.g., 'text-red-500'). */
  color?: string;
}

// --- Typography Component ---

/**
 * A highly reusable component for consistent text styling using Tailwind CSS.
 */
const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  className,
  color = 'text-gray-200',
  ...props
}) => {

  // 1. Determine the Tailwind classes based on the chosen variant
  let variantClasses: string;

  switch (variant) {
    case 'h1':
      // Extrabold, large text, large bottom margin
      variantClasses = 'text-4xl sm:text-5xl font-extrabold tracking-tight';
      break;
    case 'h2':
      // Bold text, standard size
      variantClasses = 'text-3xl font-bold';
      break;
    case 'h3':
      // Semi-bold, mid-size, good for section titles
      variantClasses = 'text-xl font-semibold';
      break;
    case 'subtitle':
      // Slightly larger body text, lighter color
      variantClasses = 'text-lg font-semibold font-normal';
      break;
    case 'body':
      // Standard paragraph text
      variantClasses = 'text-base leading-relaxed';
      break;
    case 'small':
      // Footnotes or helper text
      variantClasses = 'text-sm';
      break;
    default:
      // Fallback for safety
      variantClasses = 'text-base';
  }

  // 2. Determine the semantic HTML element to render
  const Component = ElementMap[variant];

  // 3. Combine base, variant, color, and custom classes
  const finalClasses = clsx(
    variantClasses,
    color,
    className,
    'font-[family-name:var(--font-geist-sans)]'
  );

  // 4. Render the component with the determined tag and classes
  return (
    <Component className={finalClasses} {...props}>
      {children}
    </Component>
  );
};

export default Typography