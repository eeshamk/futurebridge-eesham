import React from 'react';
import Image from 'next/image';
import { ClientLogoBlock } from '@/lib/data';

interface ClientLogosSectionProps {
  clientData: ClientLogoBlock | undefined;
}

const ClientLogosSection: React.FC<ClientLogosSectionProps> = ({
  clientData,
}) => {
  if (!clientData) {
    return null; // Don't render the section if data is missing
  }

  // Flatten the array of logo objects from the slider structure
  const allLogos = clientData.imageSlider
    .flatMap(
      (slide) => slide.image.map((img) => img.data?.attributes) // Extract attributes
    )
    .filter((logo) => logo !== undefined); // Filter out any potential undefined entries

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          {clientData.heading}
        </h2>
        {clientData.subHeading && (
          <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            {clientData.subHeading}
          </p>
        )}

        {/* Logo Grid/Slider - Simple grid layout for now */}
        {allLogos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {allLogos.map((logo, index) =>
              logo && logo.url ? (
                <div key={index} className="flex justify-center">
                  <Image
                    src={logo.url}
                    alt={logo.alternativeText || `Client Logo ${index + 1}`}
                    width={logo.width || 150} // Use provided width or fallback
                    height={logo.height || 50} // Use provided height or fallback
                    objectFit="contain"
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

export default ClientLogosSection;
