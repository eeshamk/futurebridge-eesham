import React from 'react';
import type { OverviewHeadingAndContentBlock } from '@/types/blocks';

interface OverviewProps {
  block: OverviewHeadingAndContentBlock;
}

const OverviewHeadingAndContent: React.FC<OverviewProps> = ({ block }) => {
  const { heading, description, variant } = block;

  // Determine container classes based on variant
  let containerClasses = 'my-8'; // Base margin
  if (variant === 'Content_with_Top_and_Bottom_border') {
    containerClasses += ' py-6 border-t border-b border-gray-200'; // Add padding and borders
  } else {
    containerClasses += ' py-4'; // Default padding if no specific variant
  }

  return (
    <div className={containerClasses}>
      {heading && (
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{heading}</h2>
      )}
      {description && (
        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      {!heading && !description && (
        <p className="text-gray-500 italic">Overview content missing.</p>
      )}
    </div>
  );
};

export default OverviewHeadingAndContent;
