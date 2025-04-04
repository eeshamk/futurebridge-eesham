import React from 'react';
import Image from 'next/image';
import type { ImagePopupBlock } from '@/types/blocks';

interface ImagePopupBlockProps {
  block: ImagePopupBlock;
}

const ImagePopupBlockComponent: React.FC<ImagePopupBlockProps> = ({
  block,
}) => {
  const {
    imagePopupTitle,
    imagePopup,
    enable = true, // Default to enabled if not specified
  } = block;

  const imageAttrs = imagePopup?.data?.attributes;

  // Don't render if disabled or no image data
  if (!enable || !imageAttrs?.url) {
    return null;
  }

  // Calculate aspect ratio to prevent layout shift, default to 16:9 if dimensions missing
  const aspectRatio =
    imageAttrs.width && imageAttrs.height
      ? imageAttrs.width / imageAttrs.height
      : 16 / 9;

  return (
    <div className="my-8 flex flex-col items-center">
      <figure className="w-full max-w-3xl">
        <div
          className="relative overflow-hidden rounded-lg shadow-md"
          // Use padding-bottom trick for aspect ratio before image loads
          // style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
          // Alternatively, specify width/height on Image if available
        >
          <Image
            src={imageAttrs.url}
            alt={imageAttrs.alternativeText || imagePopupTitle || 'Popup image'}
            width={imageAttrs.width || undefined} // Pass dimensions if available
            height={imageAttrs.height || undefined}
            // If using fill, need width/height on parent or style aspect ratio
            // fill
            // className="object-contain absolute top-0 left-0 w-full h-full"
            className="object-contain w-full h-auto" // Use width/height if available
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 66vw"
          />
        </div>
        {imagePopupTitle && (
          <figcaption className="mt-2 text-center text-sm text-gray-600 italic">
            {imagePopupTitle}
          </figcaption>
        )}
      </figure>
    </div>
  );
};

export default ImagePopupBlockComponent;
