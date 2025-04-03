import React from 'react';
import Link from 'next/link';

// Helper to get button styles based on variant
const getButtonClasses = (variant?: string) => {
  switch (
    variant?.toLowerCase() // Use lower case for comparison
  ) {
    case 'primary':
      return 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300 inline-block';
    case 'secondary':
      return 'border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 px-6 rounded transition duration-300 inline-block';
    // Add more variants as needed
    default:
      return 'bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition duration-300 inline-block';
  }
};

interface StandaloneButtonBlockData {
  __typename: 'ComponentBlocksButton';
  buttonName: string;
  buttonLink: string;
  isExternal?: boolean;
  target?: string; // e.g., '_blank', 'self'
  variant?: string; // e.g., 'Primary', 'Secondary'
}

interface StandaloneButtonBlockProps {
  block: StandaloneButtonBlockData;
}

const StandaloneButtonBlock: React.FC<StandaloneButtonBlockProps> = ({
  block,
}) => {
  const buttonClasses = getButtonClasses(block.variant);
  const linkTarget = block.isExternal ? '_blank' : block.target || '_self';
  const rel = block.isExternal ? 'noopener noreferrer' : undefined;
  const isInternalPageLink =
    !block.isExternal && block.buttonLink?.startsWith('/');

  const buttonContent = (
    <>
      {' '}
      {/* Use fragment if needed, or just text */}
      {block.buttonName}
    </>
  );

  return (
    <div className="my-6 text-center">
      {' '}
      {/* Center align the button */}
      {isInternalPageLink ? (
        <Link
          href={block.buttonLink || '#'}
          target={linkTarget}
          className={buttonClasses}
        >
          {buttonContent}
        </Link>
      ) : (
        <a
          href={block.buttonLink || '#'}
          target={linkTarget}
          rel={rel}
          className={buttonClasses}
        >
          {buttonContent}
        </a>
      )}
    </div>
  );
};

export default StandaloneButtonBlock;
