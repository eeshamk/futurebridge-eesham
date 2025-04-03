import React from 'react';
import Link from 'next/link';
import { StrapiMediaObject } from '@/lib/data'; // For potential backgroundImage

// --- Utility function for class names (simplified version) ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Interface based on the provided JSON structure
interface PromotionalBannerCtaProps {
  block: {
    __typename: 'ComponentBlocksPromotionalBannerCta';
    heading?: string | null;
    subHeading?: string | null;
    buttonName?: string | null;
    buttonLink?: string | null;
    isExternal?: boolean | null;
    buttonTarget?: string | null;
    buttonVariant?: 'Primary' | 'Secondary' | string | null; // Add variants as needed
    PromotionBannerSize?: 'Thin' | 'Standard' | string | null; // Add sizes as needed
    backgroundImage?: StrapiMediaObject | null;
    [key: string]: any; // Allow any other properties
  };
}

const PromotionalBannerCta: React.FC<PromotionalBannerCtaProps> = ({
  block,
}) => {
  const {
    heading,
    subHeading,
    buttonName,
    buttonLink,
    isExternal,
    buttonTarget,
    buttonVariant,
    PromotionBannerSize,
    backgroundImage,
  } = block;

  const bgImageUrl = backgroundImage?.data?.attributes?.url;
  const sizeClass =
    PromotionBannerSize === 'Thin' ? 'py-8 md:py-12' : 'py-16 md:py-20';
  const textAlignmentClass = 'text-center'; // Or adjust based on design

  const baseContainerClasses =
    'my-12 bg-blue-600 text-white rounded-lg shadow-md relative overflow-hidden';
  const contentWrapperClasses = cn(
    'container mx-auto px-6 relative z-10',
    textAlignmentClass
  );

  // Button Classes (Basic Tailwind styling)
  const baseButtonClasses =
    'inline-block px-6 py-3 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 transition duration-150 ease-in-out';
  const primaryButtonClasses =
    'bg-white text-blue-600 hover:bg-gray-100 focus:ring-white';
  const secondaryButtonClasses =
    'bg-transparent border border-white hover:bg-white hover:bg-opacity-10 focus:ring-white';
  const buttonVariantClass =
    buttonVariant?.toLowerCase() === 'secondary'
      ? secondaryButtonClasses
      : primaryButtonClasses;

  const renderButton = () => {
    if (!buttonName || !buttonLink) return null;

    const target = isExternal ? '_blank' : buttonTarget || '_self';
    const rel = isExternal ? 'noopener noreferrer' : undefined;
    const isInternalPageLink = !isExternal && buttonLink.startsWith('/');

    const commonProps = {
      className: cn(baseButtonClasses, buttonVariantClass),
      target: target,
      rel: rel,
    };

    // Use Link for internal, <a> for external, apply classes directly
    const buttonElement = isInternalPageLink ? (
      <Link href={buttonLink} {...commonProps}>
        {buttonName}
      </Link>
    ) : (
      <a href={buttonLink} {...commonProps}>
        {buttonName}
      </a>
    );

    return <div className="mt-6 md:mt-8">{buttonElement}</div>;
  };

  return (
    <div
      className={cn(baseContainerClasses, sizeClass)}
      style={
        bgImageUrl
          ? {
              backgroundImage: `url(${bgImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {/* Optional: Add overlay if background image exists for text readability */}
      {bgImageUrl && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      )}

      <div className={contentWrapperClasses}>
        {heading && (
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{heading}</h2>
        )}
        {subHeading && (
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
            {subHeading}
          </p>
        )}
        {renderButton()}
      </div>
    </div>
  );
};

export default PromotionalBannerCta;
