import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ClientStoryData } from '@/lib/data'; // Import the type

interface ClientStoriesSectionProps {
  stories: ClientStoryData[];
}

const ClientStoriesSection: React.FC<ClientStoriesSectionProps> = ({
  stories,
}) => {
  // Show only the first few (e.g., 3)
  const displayedStories = stories.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Client Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedStories.map((story) => {
            // If story or story.attributes is invalid, return null for this iteration
            if (!story || !story.attributes) {
              return null;
            }

            // Calculate alt text safely
            const thumbnailUrl =
              story.attributes.thumbnail?.data?.attributes?.url;
            const thumbnailAlt =
              story.attributes.thumbnail?.data?.attributes?.alternativeText ||
              story.attributes.clientName ||
              'Client Thumbnail';
            const displayName =
              story.attributes.clientName || story.attributes.title;
            const designation = story.attributes.clientDesignation;

            // Return the JSX for valid stories
            return (
              <div key={story.id} className="text-center">
                {/* Thumbnail */}
                <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={thumbnailAlt}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {/* Client Name/Title */}
                <h3 className="text-lg font-semibold mb-1">{displayName}</h3>
                {/* Designation */}
                {designation && (
                  <p className="text-gray-500 text-sm">{designation}</p>
                )}
              </div>
            );
          })}
        </div>
        {stories.length > 3 && (
          <div className="text-center mt-12">
            {/* TODO: Update link when Case Study listing page exists */}
            <Link
              href="#"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View More
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientStoriesSection;
