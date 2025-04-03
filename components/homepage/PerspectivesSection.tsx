'use client';

import React from 'react';
import Link from 'next/link';
import { PerspectivesListData, StrapiMediaObject } from '@/lib/data'; // Adjust type import as needed

interface PerspectivesSectionProps {
  // Expecting data that includes industry links/categories
  perspectivesData: PerspectivesListData | null;
  // We might also need data for the actual perspective items (articles, etc.)
  // Or perhaps the perspectivesData block contains these directly?
  // For now, let's use placeholders based on the reference site visuals.
}

// Placeholder for industry links/tabs shown on the homepage
const industries = [
  {
    name: 'Chemicals & Natural Resources',
    slug: 'chemicals-and-natural-resources',
    icon: '🧪',
  },
  { name: 'Energy', slug: 'energy', icon: '⚡️' },
  { name: 'Food & Nutrition', slug: 'food-and-nutrition', icon: '🍎' },
  { name: 'Home & Personal Care', slug: 'home-and-personal-care', icon: '🧼' },
  { name: 'Life Sciences', slug: 'life-sciences', icon: '🧬' },
  { name: 'Industrial Equipment', slug: 'industrial-equipment', icon: '⚙️' },
  { name: 'Mobility', slug: 'mobility', icon: '🚗' },
];

// Placeholder for actual perspective items (articles/cards)
// TODO: Fetch actual perspective items (from Articles/ maybe?)
const perspectiveItems = [
  {
    id: 1,
    title: 'Example Perspective 1',
    industrySlug: 'energy',
    image: null,
    slug: 'example-1',
  },
  {
    id: 2,
    title: 'Example Perspective 2',
    industrySlug: 'mobility',
    image: null,
    slug: 'example-2',
  },
  {
    id: 3,
    title: 'Example Perspective 3',
    industrySlug: 'food-and-nutrition',
    image: null,
    slug: 'example-3',
  },
];

const PerspectivesSection: React.FC<PerspectivesSectionProps> = ({
  perspectivesData,
}) => {
  // State to manage the selected industry tab (optional, for interactivity later)
  const [selectedIndustry, setSelectedIndustry] = React.useState(
    industries[0].slug
  );

  // Filter items based on selected industry (if implementing tabs)
  const filteredItems = perspectiveItems.filter(
    (item) => item.industrySlug === selectedIndustry
  );
  // For now, just show all placeholders
  const displayedItems = perspectiveItems;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Perspectives</h2>

        {/* Industry Tabs/Links - Simplified buttons for now */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {industries.map((industry) => (
            <button
              key={industry.slug}
              // onClick={() => setSelectedIndustry(industry.slug)} // Add interactivity later
              // className={`px-4 py-2 rounded font-medium ${selectedIndustry === industry.slug ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              className="px-4 py-2 rounded font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              {industry.icon} {industry.name}
            </button>
          ))}
        </div>

        {/* Perspective Items Grid - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
            >
              {/* Placeholder for Image */}
              <div className="relative h-48 w-full bg-gray-200">
                <span className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Image
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                {/* TODO: Add link to the actual perspective item page */}
                <Link
                  href={`/perspectives/${item.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-12">
          <Link
            href="/perspectives"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Explore All Perspectives
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PerspectivesSection;
