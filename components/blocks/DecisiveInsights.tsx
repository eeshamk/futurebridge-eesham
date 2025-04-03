import React from 'react';
import Link from 'next/link';

// Interface for the button/link items in this block
interface InsightLinkButton {
  buttonName: string;
  buttonLink: string;
  target?: string;
  variant?: string; // Although variant is present, we might use a consistent style here
  isExternal?: boolean;
  // Other potential fields like caption, leftIcon, rightIcon, backgroundImage are ignored for now
}

// Define the props interface based on the observed JSON structure
interface DecisiveInsightsProps {
  block: {
    __typename: 'ComponentBlocksDecisiveInsights';
    heading?: string | null;
    subHeading?: string | null;
    iconiblocksutton?: InsightLinkButton[] | null; // The array of links/buttons
  };
}

const DecisiveInsights: React.FC<DecisiveInsightsProps> = ({ block }) => {
  const { heading, subHeading, iconiblocksutton } = block;
  const platformLinks = iconiblocksutton || [];

  return (
    <div className="my-12 py-12 bg-gradient-to-r from-teal-50 to-cyan-50">
      <div className="container mx-auto px-6">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            {heading}
          </h2>
        )}
        {subHeading && (
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
            {subHeading}
          </p>
        )}

        {/* Render Platform Links/Buttons */}
        {platformLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {platformLinks.map((link, index) => {
              const linkHref = link.buttonLink || '#';
              const target = link.isExternal
                ? '_blank'
                : link.target || '_self';
              const rel = link.isExternal ? 'noopener noreferrer' : undefined;
              const isInternalPageLink =
                !link.isExternal && linkHref.startsWith('/');

              // Consistent button styling for this block
              const buttonClasses =
                'bg-white hover:bg-blue-600 hover:text-white border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-full transition duration-300 shadow-sm';

              return (
                <React.Fragment key={index}>
                  {isInternalPageLink ? (
                    <Link href={linkHref} passHref legacyBehavior>
                      <a target={target} rel={rel} className={buttonClasses}>
                        {link.buttonName}
                      </a>
                    </Link>
                  ) : (
                    <a
                      href={linkHref}
                      target={target}
                      rel={rel}
                      className={buttonClasses}
                    >
                      {link.buttonName}
                    </a>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisiveInsights;
