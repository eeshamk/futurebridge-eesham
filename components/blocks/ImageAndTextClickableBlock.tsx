import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageAndTextClickableBlock } from '@/types/blocks';

interface ImageAndTextClickableBlockProps {
  block: ImageAndTextClickableBlock;
}

const ImageAndTextClickableBlockComponent: React.FC<
  ImageAndTextClickableBlockProps
> = ({ block }) => {
  const {
    heading,
    description,
    image,
    contentVariant,
    buttonName,
    buttonLink,
    isExternal,
    buttonTarget,
    buttonVariant,
  } = block;

  const imageAttrs = image?.data?.attributes;
  const hasButton = buttonName && buttonLink;
  const target = isExternal ? '_blank' : buttonTarget || '_self';
  const rel = isExternal ? 'noopener noreferrer' : undefined;

  // Determine layout based on contentVariant
  const isImageRight = contentVariant?.includes('right') || false;

  // Button styling based on variant
  const getButtonStyles = () => {
    if (buttonVariant?.toLowerCase() === 'secondary') {
      return 'bg-white text-primary border border-primary hover:bg-gray-50';
    }
    return 'bg-primary text-white hover:bg-primary-dark';
  };

  // Render the button (either internal link or external)
  const renderButton = () => {
    if (!hasButton) return null;

    const buttonStyles = `inline-block px-6 py-2 rounded-md transition duration-200 ${getButtonStyles()}`;

    if (isExternal) {
      return (
        <a
          href={buttonLink!}
          target={target}
          rel={rel}
          className={buttonStyles}
        >
          {buttonName}
        </a>
      );
    }

    return (
      <Link
        href={buttonLink!}
        target={(buttonTarget as string) || '_self'}
        className={buttonStyles}
      >
        {buttonName}
      </Link>
    );
  };

  return (
    <div className="my-16 px-4 md:px-8">
      <div
        className={`flex flex-col ${
          isImageRight ? 'md:flex-row' : 'md:flex-row-reverse'
        } items-center gap-8 md:gap-12`}
      >
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-4">
          {heading && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {heading}
            </h2>
          )}

          {description && (
            <div
              className="prose prose-lg text-gray-700"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {hasButton && <div className="mt-6">{renderButton()}</div>}
        </div>

        {/* Image */}
        {imageAttrs?.url && (
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={imageAttrs.url}
                alt={imageAttrs.alternativeText || heading || 'Featured image'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageAndTextClickableBlockComponent;
