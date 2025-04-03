import React from 'react';
import Link from 'next/link';
import { SolutionsPageData } from '@/lib/data'; // Assuming a type for solutions page data

interface SolutionsSectionProps {
  // We might pass specific blocks or processed data later
  // For now, let's assume we just need a title and maybe some intro text
  // from the solutions page data, or we can hardcode the structure.
  solutionsData: SolutionsPageData | null;
}

// Placeholder data for the structure, as extracting from blocks is complex initially
const solutionsStructure = {
  heading: 'Our Solutions',
  description:
    'Our solutions combine a unique blend of hyper customised on demand engagements and subscription based membership programs. We unearth growth opportunities and lift the lid on transformative technologies.',
  pillars: [
    {
      title: 'Future of',
      items: [
        'Industry',
        'Markets',
        'Technology',
        'Competition',
        'Business Models',
        'Regulations',
      ],
    },
    {
      title: 'Discovery & Actionable Insights',
      items: [
        'Foresight & Horizon Planning',
        'Technology Scouting & Monitoring',
        'Opportunity Identification',
      ],
    },
    {
      title: 'Positioning & Strategy',
      items: [
        'Market Assessment',
        'Competitive Intelligence',
        'Strategy Development',
        'Partner Identification & M&A',
        'Sustainability',
      ],
    },
    {
      title: 'Implementation & Driving Disruption',
      items: [
        'Technology, Market & Business Model Evaluation',
        'Continuous Disruption Monitoring',
        'Technology Adoption',
        'Technology Commercialization',
        'Company / Technology Due Diligence',
        'Technology Implementation Ecosystem',
      ],
    },
  ],
  readMoreLink: '/solutions',
};

const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  solutionsData,
}) => {
  // Use data from props if available and structured, otherwise use placeholder
  const heading =
    solutionsData?.blocks?.find(
      (b) => b.__typename === 'ComponentBlocksHeading'
    )?.text || solutionsStructure.heading;
  // Finding the description might require checking ComponentBlocksDescription and parsing HTML, so using placeholder is simpler for now.
  const description = solutionsStructure.description;

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">{heading}</h2>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          {description}
        </p>

        {/* Simplified representation of the solutions pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutionsStructure.pillars.map((pillar) => (
            <div key={pillar.title} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                {pillar.title}
              </h3>
              <ul className="space-y-2">
                {pillar.items.map((item) => (
                  <li key={item} className="text-gray-700 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={solutionsStructure.readMoreLink}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Read more about our Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
