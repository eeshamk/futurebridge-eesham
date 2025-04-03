import React from 'react';
import Image from 'next/image';
import { StrapiMediaObject } from '@/lib/data'; // Assuming background uses this

interface BannerContentBlock {
  __typename: 'ComponentBlocksBannerContent';
  heading: string;
  subHeading?: string | null;
  // The background field holds the whole StrapiMediaObject or null
  background?: StrapiMediaObject | null;
  // Add other banner properties if needed (button, size, position etc.)
}

interface BannerContentBlockProps {
  block: BannerContentBlock;
}

const BannerContentBlockComponent: React.FC<BannerContentBlockProps> = ({
  block,
}) => {
  // Access attributes safely
  const bgImageAttributes = block.background?.data?.attributes;
  const bgImageUrl = bgImageAttributes?.url;

  return (
    <div className="relative py-16 bg-gray-200 my-8 text-center">
      {bgImageUrl && (
        <Image
          src={bgImageUrl}
          alt={bgImageAttributes?.alternativeText || block.heading}
          fill
          className="absolute inset-0 z-0 opacity-30 object-cover"
          priority // Consider adding priority if it's often LCP
        />
      )}
      <div className="relative z-10 container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{block.heading}</h1>
        {block.subHeading && <p className="text-xl">{block.subHeading}</p>}
        {/* TODO: Add button rendering logic if banner includes button fields */}
      </div>
    </div>
  );
};

export default BannerContentBlockComponent;
