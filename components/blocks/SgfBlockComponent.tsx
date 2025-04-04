import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SgfBlock } from '@/types/blocks';

interface SgfBlockComponentProps {
  block: SgfBlock;
}

const SgfBlockComponent: React.FC<SgfBlockComponentProps> = ({ block }) => {
  const {
    heading,
    subHeading,
    content,
    image,
    buttonName,
    buttonLink,
    isExternal,
    buttonTarget,
  } = block;

  const imageAttrs = image?.data?.attributes;
  const hasButton = buttonName && buttonLink;
  const target = isExternal ? '_blank' : buttonTarget || '_self';
  const rel = isExternal ? 'noopener noreferrer' : undefined;

  // Render the button if it exists
  const renderButton = () => {
    if (!hasButton) return null;

    const buttonStyles =
      'inline-block px-6 py-3 mt-4 bg-primary text-white rounded-md transition hover:bg-primary-dark';

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
    <section className="my-16 px-4 md:px-8 max-w-6xl mx-auto">
      {/* SGF Header */}
      <div className="text-center mb-8">
        {heading && (
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{heading}</h2>
        )}
        {subHeading && <p className="text-xl text-gray-600">{subHeading}</p>}
      </div>

      {/* SGF Body - Flexible layout with image and content */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* If image exists, show it on the left in desktop view */}
        {imageAttrs?.url && (
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={imageAttrs.url}
                alt={imageAttrs.alternativeText || heading || 'SGF visual'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Content section */}
        <div className={`w-full ${imageAttrs?.url ? 'lg:w-1/2' : ''}`}>
          {content && (
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {renderButton()}
        </div>
      </div>
    </section>
  );
};

export default SgfBlockComponent;
