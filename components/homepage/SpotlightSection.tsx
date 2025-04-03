import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EventData } from '@/lib/data'; // Import the type

interface SpotlightSectionProps {
  items: EventData[]; // Expecting an array of Event/Webinar data
}

// Helper function to format dates (simplified)
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Date TBD';
  try {
    // Basic formatting, adjust as needed for specific date formats in JSON
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch (e) {
    return dateString; // Return original string if parsing fails
  }
};

const SpotlightSection: React.FC<SpotlightSectionProps> = ({ items }) => {
  // Show only the first few items (e.g., 4)
  const displayedItems = items.slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          In the Spotlight
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedItems.map(
            (item) =>
              item && (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="relative h-48 w-full bg-gray-200">
                    {item.attributes?.image?.data?.attributes?.url && (
                      <Image
                        src={item.attributes.image.data.attributes.url}
                        alt={
                          item.attributes.image.data.attributes
                            .alternativeText || item.attributes.title
                        }
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                    {!item.attributes?.image?.data?.attributes?.url && (
                      <span className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No Image
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(item.attributes?.date)}
                    </p>
                    <h3 className="text-lg font-semibold mb-3 flex-grow">
                      {item.attributes?.title}
                    </h3>
                    {item.attributes?.shortDescription && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {item.attributes.shortDescription}
                      </p>
                    )}
                    <Link
                      href={`#`}
                      className="mt-auto inline-block text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Register Now →
                    </Link>
                  </div>
                </div>
              )
          )}
        </div>
        {items.length > 4 && (
          <div className="text-center mt-12">
            <Link
              href="/events"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View More
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpotlightSection;
