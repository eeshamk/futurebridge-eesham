import React from 'react';
import Image from 'next/image';
import { StrapiMediaObject } from '@/lib/data';

// Interface matches definition in BlockRenderer.tsx
interface ClientLogoBlockData {
  __typename: 'ComponentBlocksClientLogos';
  heading: string;
  subHeading?: string;
  imageSlider: { image: StrapiMediaObject[] }[];
}

interface ClientLogosBlockProps {
  block: ClientLogoBlockData;
}

const ClientLogosBlock: React.FC<ClientLogosBlockProps> = ({ block }) => {
  // Flatten the array of logo objects from the slider structure
  const allLogos = block.imageSlider
    .flatMap((slide) =>
      Array.isArray(slide.image)
        ? slide.image.map((img) => img?.data?.attributes)
        : []
    )
    .filter((logo) => logo !== undefined && logo !== null);

  return (
    <section className="py-16 bg-gray-50 my-8">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">{block.heading}</h2>
        {block.subHeading && (
          <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            {block.subHeading}
          </p>
        )}

        {/* Logo Grid/Slider - Simple grid layout for now */}
        {allLogos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {allLogos.map((logo, index) =>
              logo?.url ? (
                <div key={index} className="flex justify-center">
                  <Image
                    src={logo.url}
                    alt={logo.alternativeText || `Client Logo ${index + 1}`}
                    width={logo.width || 150} // Use provided width or fallback
                    height={logo.height || 50} // Use provided height or fallback
                    className="object-contain" // Use Tailwind for object-fit
                  />
                </div>
              ) : null
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Client logos are currently unavailable.
          </p>
        )}
      </div>
    </section>
  );
};

export default ClientLogosBlock;
