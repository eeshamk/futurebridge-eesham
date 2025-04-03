'use client'; // Mark this component as a Client Component

import React from 'react';
import Image from 'next/image';
// Import specific block type and nested types from central definition
import type {
  OurSolutionsBlock,
  FutureOfColumn,
  FutureOfIcon,
  SolutionDescriptionGroup,
  OurSolutionItem,
} from '@/types/blocks';
// Remove StrapiMediaObject import if not directly used here

// --- Remove local interface definitions ---
// interface FutureOfIcon { ... }
// interface FutureOfColumn { ... }
// interface SolutionItem { ... } // Renamed to OurSolutionItem in types/blocks.ts
// interface SolutionDescriptionGroup { ... }

// --- Update Props interface ---
interface OurSolutionsProps {
  block: OurSolutionsBlock; // Use the imported type
}

const OurSolutions: React.FC<OurSolutionsProps> = ({ block }) => {
  const { heading, description, futureOfColum, ourSolutionDescription } = block;

  // Flatten the solution items from the groups for easier rendering in a grid
  const allSolutionItems: OurSolutionItem[] =
    ourSolutionDescription?.flatMap((group) => group.ourSolutionItems) || [];

  return (
    <div className="my-12 py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            {heading}
          </h2>
        )}
        {description && (
          <div
            className="prose prose-lg max-w-3xl mx-auto text-center text-gray-600 mb-10"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Render "Future Of" Icons */}
        {futureOfColum && futureOfColum.futureOfIcons?.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
              {futureOfColum.title || 'Future of...'}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              {futureOfColum.futureOfIcons.map((item, index) => {
                const iconAttrs = item.icon?.data?.attributes;
                return iconAttrs?.url ? (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center w-24"
                  >
                    <Image
                      src={iconAttrs.url}
                      alt={iconAttrs.alternativeText || item.iconCaption}
                      width={iconAttrs.width || 40}
                      height={iconAttrs.height || 40}
                      className="mb-1"
                    />
                    <span className="text-sm text-gray-600">
                      {item.iconCaption}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Render Solution Items Grid - Use OurSolutionItem type */}
        {allSolutionItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allSolutionItems.map((item: OurSolutionItem, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h4 className="text-lg font-semibold text-blue-700 mb-3">
                  {item.title}
                </h4>
                <div
                  className="prose prose-sm text-gray-600 solution-item-description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Add global styles if needed for the nested lists in solution-item-description */}
      <style jsx global>{`
        .solution-item-description ul {
          padding-left: 1.25rem; /* Add some padding to lists */
          margin-top: 0.5rem;
        }
        .solution-item-description li {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default OurSolutions;
