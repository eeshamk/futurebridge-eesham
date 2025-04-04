import React from 'react';
import Image from 'next/image';
import { StrapiMediaObject } from '@/lib/data'; // Assuming image uses this

interface ImageAndTextBlock {
  __typename: 'ComponentBlocksImageAndTextNonClickable';
  heading?: string;
  description?: string; // Contains HTML
  image?: StrapiMediaObject | null;
  contentVariant?: string; // e.g., 'Text_left_Image_right'
}

interface ImageAndTextBlockProps {
  block: ImageAndTextBlock;
}

const ImageAndTextBlockComponent: React.FC<ImageAndTextBlockProps> = ({
  block,
}) => {
  // Special handling for the "Past..." section
  if (block.heading === 'Past…') {
    return (
      <div className="my-8">
        {block.heading && (
          <h2 className="text-3xl font-bold mb-4">{block.heading}</h2> // Use standard heading style
        )}
        {block.description && (
          <div
            className="prose max-w-none text-gray-700" // Standard description styling
            dangerouslySetInnerHTML={{ __html: block.description }}
          />
        )}
      </div>
    );
  }

  // Default rendering for other ImageAndText blocks
  const isTextLeft = block.contentVariant === 'Text_left_Image_right';
  const imageAttributes = block.image?.data?.attributes;
  const imageUrl = imageAttributes?.url;

  return (
    <div
      className={`flex flex-col md:flex-row my-12 gap-8 items-center ${
        isTextLeft ? '' : 'md:flex-row-reverse'
      }`}
    >
      <div className="md:w-1/2">
        {block.heading && (
          <h3 className="text-2xl font-semibold mb-4">{block.heading}</h3>
        )}
        {block.description && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: block.description }}
          />
        )}
      </div>
      <div className="md:w-1/2 relative" style={{ minHeight: '300px' }}>
        {' '}
        {/* Added minHeight */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={
              imageAttributes?.alternativeText ||
              block.heading ||
              'Section image'
            }
            fill
            className="rounded-lg shadow-md object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default ImageAndTextBlockComponent;
