import React from 'react';
import Image from 'next/image';
import { StrapiMediaObject } from '@/lib/data'; // Use the correct type

// Define the structure for the logo items within the block
interface ClientLogoItem {
  image: StrapiMediaObject[];
}

// Define the props interface based on the observed JSON structure
interface SolutionsContentSliderProps {
  block: {
    __typename: 'ComponentBlocksSolutionsContentSlider';
    heading?: string | null;
    content?: string | null; // HTML content from the JSON
    clientLogos?: ClientLogoItem[]; // Array of logo entries
  };
}

const SolutionsContentSlider: React.FC<SolutionsContentSliderProps> = ({
  block,
}) => {
  // Safely extract and flatten the logo data
  const allLogos =
    block.clientLogos
      ?.flatMap((logoEntry) =>
        // Ensure logoEntry.image is an array before mapping
        Array.isArray(logoEntry.image)
          ? logoEntry.image.map((img) => img?.data?.attributes)
          : []
      )
      .filter((logo) => logo !== undefined && logo !== null) || [];

  return (
    <div className="my-12 p-6 md:p-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg">
      {block.heading && (
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
          {block.heading}
        </h2>
      )}
      {block.content && (
        <div
          className="prose prose-lg max-w-none mx-auto mb-8 text-gray-700"
          // Ensure the HTML content is properly handled
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )}

      {/* Render Client Logos Section */}
      {allLogos.length > 0 && (
        <div className="mt-10">
          {/* Optional: Add a title for the logo section if desired */}
          {/* <h3 className="text-xl font-semibold text-center text-gray-600 mb-6">Featured In</h3> */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {allLogos.map(
              (logo, index) =>
                // Check if logo and logo.url exist
                logo?.url && (
                  <div
                    key={index}
                    className="flex justify-center items-center h-12"
                  >
                    {' '}
                    {/* Fixed height for alignment */}
                    <Image
                      src={logo.url}
                      alt={logo.alternativeText || `Client Logo ${index + 1}`}
                      // Use layout='fill' and objectFit='contain' within a sized container for better responsiveness
                      width={120} // Provide a base width
                      height={40} // Provide a base height
                      className="object-contain max-h-full max-w-full" // Tailwind classes for contain
                    />
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionsContentSlider;
