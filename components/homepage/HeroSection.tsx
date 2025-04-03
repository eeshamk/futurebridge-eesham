import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder data - replace with actual data fetching later
const heroData = {
  heading: 'The future is here',
  subHeading: 'The opportunities are limitless',
  description:
    'FutureBridge tracks and advises on the future of industries from a 1-to-25 year perspective',
  buttonText: 'Read more',
  buttonLink: '/about', // Link to about page for example
  backgroundImageUrl: '/images/hero-image-home.webp', // Correct path and extension
};

const HeroSection = () => {
  return (
    <div className="relative bg-gray-800 text-white py-24 md:py-32 lg:py-48 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {heroData.backgroundImageUrl && (
        <Image
          src={heroData.backgroundImageUrl}
          alt="Hero Background"
          fill
          quality={85}
          priority // Prioritize loading the hero image
          className="absolute inset-0 z-0 opacity-40 object-cover"
        />
      )}
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {heroData.heading}
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
          {heroData.subHeading}
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto md:mx-0">
          {heroData.description}
        </p>
        <Link
          href={heroData.buttonLink}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded text-lg transition duration-300"
        >
          {heroData.buttonText}
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
