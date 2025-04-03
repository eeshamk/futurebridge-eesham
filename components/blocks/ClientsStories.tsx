import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ClientsStoriesBlock, ClientStory } from '@/types/blocks';
import { StrapiMediaObject } from '@/lib/data';

interface ClientsStoriesProps {
  block: ClientsStoriesBlock;
}

const ClientsStories: React.FC<ClientsStoriesProps> = ({ block }) => {
  const { heading, subHeading, stories } = block;

  if (!stories || stories.length === 0) {
    return null;
  }

  const renderStory = (story: ClientStory, index: number) => {
    const imageAttrs = story.image?.data?.attributes;
    const hasLink = !!story.link;
    const target = story.isExternal ? '_blank' : story.target || '_self';
    const rel = story.isExternal ? 'noopener noreferrer' : undefined;

    // Card content
    const storyCard = (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
        {/* Top section with quote */}
        <div className="p-6 bg-blue-50 flex-grow">
          {/* Quote icon */}
          <div className="mb-4 text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          {/* Quote/testimonial text */}
          <p className="text-gray-700 mb-4 italic">{story.description}</p>
          <h3 className="font-bold text-lg text-gray-900">{story.title}</h3>
        </div>

        {/* Bottom section with client info */}
        <div className="border-t border-gray-200 p-4 flex items-center">
          {imageAttrs?.url && (
            <div className="flex-shrink-0 mr-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={imageAttrs.url}
                  alt={
                    imageAttrs.alternativeText || story.clientName || 'Client'
                  }
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <div>
            {story.clientName && (
              <p className="font-semibold text-gray-800">{story.clientName}</p>
            )}
            {story.position && (
              <p className="text-sm text-gray-500">{story.position}</p>
            )}
          </div>
        </div>
      </div>
    );

    // Wrap with link if link exists
    if (hasLink) {
      return story.isExternal ? (
        <a
          key={index}
          href={story.link!}
          target={target}
          rel={rel}
          className="block h-full"
        >
          {storyCard}
        </a>
      ) : (
        <Link
          key={index}
          href={story.link!}
          target={target}
          className="block h-full"
        >
          {storyCard}
        </Link>
      );
    }

    return (
      <div key={index} className="h-full">
        {storyCard}
      </div>
    );
  };

  return (
    <div className="my-12 px-4">
      {/* Section heading */}
      {heading && (
        <h2 className="text-3xl font-bold text-center mb-3">{heading}</h2>
      )}
      {subHeading && (
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          {subHeading}
        </p>
      )}

      {/* Stories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map(renderStory)}
      </div>
    </div>
  );
};

export default ClientsStories;
