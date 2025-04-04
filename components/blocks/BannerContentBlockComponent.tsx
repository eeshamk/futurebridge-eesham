'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BannerContentBlock } from '@/types/blocks';
import { StrapiMediaObject } from '@/lib/data';

interface BannerContentBlockProps {
  block: BannerContentBlock;
}

// Add extended interface to handle the missing button properties
interface ExtendedBannerContentBlock extends BannerContentBlock {
  bannerButtonName?: string | null;
  bannerButtonLink?: string | null;
  isbannerButtonLinkExternal?: boolean;
  bannerButtonTarget?: string;
  bannerButtonVariant?: string;
  textPosition?: string;
  bannerSize?: string;
}

const BannerContentBlockComponent: React.FC<BannerContentBlockProps> = ({
  block,
}) => {
  // Cast to extended interface to access additional properties
  const extendedBlock = block as ExtendedBannerContentBlock;
  const pathname = usePathname();

  // Get the URL from the StrapiMediaObject structure
  const backgroundUrl = block.background?.data?.attributes?.url;

  // Determine which image to use based on the page
  let imageUrl = backgroundUrl;

  // Special case for About page
  if (block.heading === 'Get to know us' || pathname?.includes('/about')) {
    imageUrl = '/images/About-Us-Banner.jpg';
  }

  // Special cases for Industry pages
  if (pathname?.includes('/industry/')) {
    if (
      pathname.includes('chemicals') ||
      block.heading?.includes('Chemicals')
    ) {
      imageUrl = '/images/Chemicals-banner.png';
    } else if (
      pathname.includes('energy') ||
      block.heading?.includes('Energy')
    ) {
      imageUrl = '/images/Energy-banner.jpg';
    } else if (pathname.includes('food') || block.heading?.includes('Food')) {
      imageUrl = '/images/Food-banner.jpg';
    } else if (
      pathname.includes('home-and-personal-care') ||
      block.heading?.includes('Home')
    ) {
      imageUrl = '/images/Home-and-personal-care-banner.jpg';
    } else if (
      pathname.includes('life-sciences') ||
      block.heading?.includes('Life Sciences')
    ) {
      imageUrl = '/images/life-sciences-banner.png';
    } else if (
      pathname.includes('industrial-equipment') ||
      block.heading?.includes('Industrial')
    ) {
      imageUrl = '/images/industrial-equipment-banner.png';
    } else if (
      pathname.includes('mobility') ||
      block.heading?.includes('Mobility')
    ) {
      imageUrl = '/images/mobility-banner.webp';
    }
  }

  // Console log to debug
  console.log('Banner image URL:', imageUrl);
  console.log('Current pathname:', pathname);

  return (
    <div className="relative py-40 text-center text-white">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={
            block.background?.data?.attributes?.alternativeText ||
            block.heading ||
            'Banner image'
          }
          fill
          className="absolute inset-0 z-0 object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="relative z-10 container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{block.heading}</h1>
        {block.subHeading && <p className="text-xl">{block.subHeading}</p>}
        {extendedBlock.bannerButtonName && (
          <a
            href={extendedBlock.bannerButtonLink || '#'}
            className="inline-block mt-6 px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
          >
            {extendedBlock.bannerButtonName}
          </a>
        )}
      </div>
    </div>
  );
};

export default BannerContentBlockComponent;
