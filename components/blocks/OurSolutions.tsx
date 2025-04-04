'use client'; // Mark this component as a Client Component

import React, { useState } from 'react';
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
  const [activeItem, setActiveItem] = useState<{
    index: number;
    sectionIndex: number;
  } | null>(null);

  // Section titles
  const sectionTitles = [
    'Discovery & Actionable Insights',
    'Positioning & Strategy',
    'Implementation & Driving Disruption',
  ];

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

        {/* Render "Future Of" Icons - only for mobile view */}
        <div className="md:hidden mb-12">
          {futureOfColum && futureOfColum.futureOfIcons?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
                {futureOfColum.title || 'Future of...'}
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-8">
                {futureOfColum.futureOfIcons.map((item, index) => {
                  const iconData = item.icon?.data?.attributes;
                  return iconData?.url ? (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center w-24"
                    >
                      <Image
                        src={iconData.url}
                        alt={iconData.alternativeText || item.iconCaption}
                        width={iconData.width || 40}
                        height={iconData.height || 40}
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
        </div>

        {/* Main layout with sidebar and content - Use CSS Grid */}
        <div className="md:grid md:grid-cols-[auto_1fr] gap-8">
          {/* Left sidebar with icons */}
          <div className="hidden md:block md:w-48 lg:w-56 shrink-0 relative">
            {/* Red vertical line on the left of sidebar */}
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-lg"></div>

            <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
              <div className="py-6 px-4 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Future of
                </h3>
              </div>

              {futureOfColum &&
                futureOfColum.futureOfIcons?.length > 0 &&
                futureOfColum.futureOfIcons.map((item, index) => {
                  // Calculate approximate vertical center for each sidebar item
                  // This assumes roughly equal height for each item. Adjust if needed.
                  const itemHeight = 100 / futureOfColum.futureOfIcons.length;
                  const verticalCenter = `${
                    itemHeight * index + itemHeight / 2
                  }%`;

                  const iconData = item.icon?.data?.attributes;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center py-5 px-4 border-t border-gray-600 relative" // Added relative for line positioning
                    >
                      {/* Dotted line from item to right edge */}
                      <div
                        className="hidden md:block absolute h-0 border-t border-dashed border-red-300 w-4"
                        style={{ right: '-1rem', top: '50%' }}
                      ></div>

                      {/* Icon */}
                      {iconData?.url ? (
                        <Image
                          src={iconData.url}
                          alt={iconData.alternativeText || item.iconCaption}
                          width={iconData.width || 40}
                          height={iconData.height || 40}
                          className="mb-3 opacity-70"
                        />
                      ) : (
                        <></> // Placeholder if no icon
                      )}
                      {/* Caption */}
                      <span className="text-base text-white font-medium">
                        {item.iconCaption}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Main content area spanning grid rows */}
          <div className="mt-8 md:mt-0 relative">
            {/* Define grid rows - let them size automatically */}
            <div
              className="relative" // Remove h-full
              style={{
                display: 'grid',
                gridTemplateRows: `repeat(${
                  ourSolutionDescription?.length || 1
                }, auto)`, // Use 'auto' rows
                rowGap: '3rem', // Add row gap for spacing instead of margin
              }}
            >
              {/* Vertical connecting line spanning all rows - Adjust top/bottom */}
              {/* Adjust calculation to account for row gaps */}
              <div
                className="hidden md:block absolute w-0.5 bg-red-500"
                style={{
                  left: '-1.5rem',
                  top: '1.25rem', // Start at first connector
                  // Approximate end calculation - might need further tuning
                  bottom: `calc(${
                    3 * (ourSolutionDescription?.length || 1 - 1)
                  }rem + 1.25rem)`,
                }}
              ></div>

              {/* Map through sections and place them in consecutive grid rows */}
              {ourSolutionDescription?.map((section, sectionIndex) => {
                // Place in rows 1, 2, 3, ...
                const gridRowStart = sectionIndex + 1;

                return (
                  <div
                    key={sectionIndex}
                    className="relative md:pl-8" // Remove bottom margin
                    style={{ gridRow: `${gridRowStart} / span 1` }} // Place in consecutive grid rows
                  >
                    {/* Horizontal connector line */}
                    <div
                      className="hidden md:block absolute w-8 h-0.5 bg-red-500"
                      style={{ left: '-1.5rem', top: '1.25rem' }}
                    ></div>

                    {/* Section row with heading and dots */}
                    <div className="flex flex-col md:flex-row items-start">
                      {/* Section header */}
                      <div className="bg-white rounded-lg shadow-md p-4 mb-8 md:mb-0 md:mr-8 md:w-64 md:flex-shrink-0 z-10">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {sectionTitles[sectionIndex] ||
                            `Section ${sectionIndex + 1}`}
                        </h3>
                      </div>

                      {/* Horizontal dots section */}
                      <div className="flex-1 relative mt-1">
                        {/* Horizontal line connecting all dots */}
                        <div className="hidden md:block h-1 bg-red-500 absolute top-2.5 left-0 right-0 z-10"></div>

                        {/* Items container */}
                        <div className="flex flex-col md:flex-row w-full">
                          {section.ourSolutionItems.map((item, index) => (
                            <div
                              key={index}
                              className="relative flex flex-row md:flex-col items-start md:items-center md:justify-start py-2 md:py-0"
                              style={{
                                flex: `0 0 ${
                                  100 / section.ourSolutionItems.length
                                }%`,
                                maxWidth: `${
                                  100 / section.ourSolutionItems.length
                                }%`,
                              }}
                            >
                              {/* Red Dot */}
                              <button
                                className="w-5 h-5 bg-white border-2 border-red-500 rounded-full hover:bg-red-100 transition-colors relative z-20 flex-shrink-0 mr-3 md:mr-0 md:mb-3"
                                onMouseEnter={() =>
                                  setActiveItem({ index, sectionIndex })
                                }
                                onMouseLeave={() => setActiveItem(null)}
                              />

                              {/* Title below dot */}
                              <h4 className="text-sm font-medium md:text-center md:w-full">
                                {item.title}
                              </h4>

                              {/* Hover Details Popup */}
                              {activeItem?.index === index &&
                                activeItem?.sectionIndex === sectionIndex && (
                                  <div className="absolute md:left-1/2 md:-translate-x-1/2 top-6 md:top-8 left-8 md:left-auto z-30 bg-white rounded-lg shadow-lg p-4 w-64 border border-gray-200">
                                    <h5 className="font-semibold text-blue-700 mb-2">
                                      {item.title}
                                    </h5>
                                    <div
                                      className="prose prose-sm text-gray-600 text-left"
                                      dangerouslySetInnerHTML={{
                                        __html: item.description,
                                      }}
                                    />
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add global styles for the nested lists in hover details */}
      <style jsx global>{`
        .prose ul {
          padding-left: 1.25rem;
          margin-top: 0.5rem;
        }
        .prose li {
          margin-bottom: 0.25rem;
          list-style-type: disc;
        }
      `}</style>
    </div>
  );
};

export default OurSolutions;
