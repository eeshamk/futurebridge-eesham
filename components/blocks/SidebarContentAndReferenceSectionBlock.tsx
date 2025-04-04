import React from 'react';
import type { SidebarContentAndReferenceSectionBlock } from '@/types/blocks';

interface SidebarContentProps {
  block: SidebarContentAndReferenceSectionBlock;
}

const SidebarContentAndReferenceSection: React.FC<SidebarContentProps> = ({
  block,
}) => {
  const {
    title,
    description,
    sizeVariant = 'Full_width', // Default to full width
  } = block;

  // Determine container classes based on sizeVariant
  const containerClasses =
    sizeVariant === 'Half_width'
      ? 'md:w-1/2 lg:w-2/5 p-6 bg-gray-100 rounded-lg shadow-inner' // Example style for half-width
      : 'w-full'; // Full width default

  // Common styling for the content
  const contentWrapperClasses = 'prose prose-sm max-w-none';

  return (
    <section className={`my-8 ${containerClasses}`}>
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          {title}
        </h3>
      )}
      {description && (
        <div
          className={contentWrapperClasses}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      {!title && !description && (
        <p className="text-gray-500 italic">
          Sidebar/Reference section content missing.
        </p>
      )}
    </section>
  );
};

export default SidebarContentAndReferenceSection;
