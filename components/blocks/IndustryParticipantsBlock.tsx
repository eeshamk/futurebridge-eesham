import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StrapiMediaObject } from '@/lib/data';

// Interface for a single industry item within the participants block
interface IndustryItem {
  buttonName: string;
  buttonLink: string;
  target?: string;
  variant?: string; // Note: variant is defined but not used for styling in this component
  isExternal?: boolean;
  backgroundImage?: StrapiMediaObject | null;
  // Add other fields like leftIcon, rightIcon, caption if needed
}

// Define IndustryParticipantsBlock interface
interface IndustryParticipantsBlockData {
  __typename: 'ComponentBlocksIndustryParticipants';
  heading?: string | null;
  subHeading?: string | null;
  // Main button/item (if exists separately)
  industryParticipantsButtonName?: string;
  industryParticipantsButtonLink?: string;
  industryParticipantsButtonLinkExternal?: boolean;
  industryParticipantsButtonTarget?: string;
  industryParticipantsButtonVariant?: string;
  backgroundImage?: StrapiMediaObject | null;
  // Array of other industry items
  industryItems?: IndustryItem[];
}

interface IndustryParticipantsBlockProps {
  block: IndustryParticipantsBlockData;
}

const IndustryParticipantsBlock: React.FC<IndustryParticipantsBlockProps> = ({
  block,
}) => {
  // Combine the main item (if present) with the list items for rendering
  const allItems: IndustryItem[] = [];
  if (
    block.industryParticipantsButtonName &&
    block.industryParticipantsButtonLink
  ) {
    allItems.push({
      buttonName: block.industryParticipantsButtonName,
      buttonLink: block.industryParticipantsButtonLink,
      isExternal: block.industryParticipantsButtonLinkExternal,
      target: block.industryParticipantsButtonTarget,
      variant: block.industryParticipantsButtonVariant,
      backgroundImage: block.backgroundImage,
    });
  }
  if (block.industryItems) {
    allItems.push(...block.industryItems);
  }

  return (
    <div className="my-12">
      {block.heading && (
        <h2 className="text-3xl font-bold text-center mb-4">{block.heading}</h2>
      )}
      {block.subHeading && (
        <p className="text-lg text-center text-gray-600 mb-10">
          {block.subHeading}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allItems.map((item, index) => {
          const linkTarget = item.isExternal
            ? '_blank'
            : item.target || '_self';
          const rel = item.isExternal ? 'noopener noreferrer' : undefined;
          const bgImageAttrs = item.backgroundImage?.data?.attributes;

          const linkContent = (
            <div className="relative h-40 rounded-lg overflow-hidden shadow-md group flex items-center justify-center text-center p-4 bg-gray-700">
              {bgImageAttrs?.url && (
                <Image
                  src={bgImageAttrs.url}
                  alt={bgImageAttrs.alternativeText || item.buttonName}
                  fill
                  className="absolute inset-0 object-cover transition-opacity duration-300 opacity-40 group-hover:opacity-60"
                />
              )}
              <h3 className="relative z-10 text-xl font-semibold text-white transition-transform duration-300 group-hover:scale-105">
                {item.buttonName}
              </h3>
            </div>
          );

          return item.isExternal ? (
            <a
              key={index}
              href={item.buttonLink || '#'}
              target={linkTarget}
              rel={rel}
            >
              {linkContent}
            </a>
          ) : (
            <Link key={index} href={item.buttonLink || '#'} target={linkTarget}>
              {linkContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default IndustryParticipantsBlock;
