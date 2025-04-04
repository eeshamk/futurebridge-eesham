import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Removed getJsonData as we'll use fs directly here
import fs from 'fs/promises'; // Use promises version of fs
import path from 'path';

// Interface for the data needed for each card on the landing page
interface PerspectiveItem {
  title: string;
  slug: string;
  type: 'articles' | 'webinars' | 'case-studies' | 'white-papers'; // Corresponds to URL path
  typeName: string; // Display name e.g., "Article"
  // Allow undefined for optional fields to match data extraction results
  excerpt?: string | null | undefined;
  imageUrl?: string | null | undefined;
  imageAlt?: string | null | undefined;
  // TODO: Add date field if available in JSON for sorting
  // publishedDate?: string | null;
}

// Define the structure we expect within each JSON file
// Adjust based on actual structure for webinars, case studies, etc.
interface JsonItemData {
  title?: string;
  slug?: string;
  excerpts?: string | null; // Note: 'excerpts' key used in article example
  featuredImage?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  // Add other common fields if needed (e.g., publish date)
}

// --- Data Fetching Implementation ---
async function getAllPerspectiveItems(): Promise<PerspectiveItem[]> {
  console.log('--- Fetching all perspective items ---');
  const items: PerspectiveItem[] = [];
  const dataBasePath = path.join(process.cwd(), 'public', 'data');

  const directories = [
    {
      dirName: 'Articles',
      urlType: 'articles',
      dataKey: 'articles',
      typeName: 'Article',
    },
    {
      dirName: 'Webinars',
      urlType: 'webinars',
      dataKey: 'webinars',
      typeName: 'Webinar',
    },
    {
      dirName: 'Case Study',
      urlType: 'case-studies',
      dataKey: 'caseStudies',
      typeName: 'Case Study',
    },
    {
      dirName: 'White Paper',
      urlType: 'white-papers',
      dataKey: 'whitePapers',
      typeName: 'White Paper',
    },
  ];

  for (const dirInfo of directories) {
    const dirPath = path.join(dataBasePath, dirInfo.dirName);
    try {
      const files = await fs.readdir(dirPath);
      const jsonFiles = files.filter((file) => file.endsWith('.json'));

      const fileReadPromises = jsonFiles.map(async (fileName) => {
        const filePath = path.join(dirPath, fileName);
        try {
          const fileContent = await fs.readFile(filePath, 'utf-8');
          const jsonData = JSON.parse(fileContent);
          const itemData: JsonItemData | undefined =
            jsonData?.data?.[dirInfo.dataKey]?.[0];

          if (itemData?.title && itemData?.slug) {
            // Explicitly create object matching PerspectiveItem, using ?? undefined
            const perspectiveItem: PerspectiveItem = {
              title: itemData.title,
              slug: itemData.slug,
              type: dirInfo.urlType as PerspectiveItem['type'],
              typeName: dirInfo.typeName,
              excerpt: itemData.excerpts ?? undefined, // Use ?? undefined
              imageUrl: itemData.featuredImage?.url ?? undefined, // Use ?? undefined
              imageAlt:
                itemData.featuredImage?.alternativeText ??
                itemData.title ??
                undefined, // Use ?? undefined
            };
            return perspectiveItem;
          } else {
            console.warn(
              `Skipping ${fileName}: Missing title, slug, or expected data structure.`
            );
            return null;
          }
        } catch (parseError) {
          console.error(
            `Error reading or parsing file ${filePath}:`,
            parseError
          );
          return null;
        }
      });

      const results = await Promise.all(fileReadPromises);
      // Filter out nulls without using a type predicate
      const validItems = results.filter((item) => item !== null);
      items.push(...validItems);
    } catch (error) {
      // ... (error handling for directory reading) ...
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'ENOENT'
      ) {
        console.warn(`Directory not found: ${dirPath}. Skipping.`);
      } else {
        console.error(`Error reading directory ${dirPath}:`, error);
      }
    }
  }

  console.log(`--- Fetched ${items.length} perspective items ---`);
  items.sort((a, b) => a.title.localeCompare(b.title));
  return items;
}

// --- Page Component ---
export default async function PerspectivesPage() {
  const allItems = await getAllPerspectiveItems();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative text-white py-32 px-4 text-center bg-cover bg-center" // Increased padding, removed gradient, added bg-cover/center
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-image-perspective.jpg')`, // Added image and overlay
          minHeight: '40vh', // Ensure a minimum height
          display: 'flex', // Use flexbox for centering
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Perspectives</h1>
        <p className="text-xl md:text-2xl text-gray-100 max-w-3xl">
          {' '}
          {/* Changed text color slightly, added max-width */}
          Explore Strategic growth fields, hot topics and insights
        </p>
      </div>

      {/* Filter Bar (Placeholder) */}
      <div className="container mx-auto px-4 py-6 flex justify-end">
        <div className="inline-block relative w-64">
          <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>Filter by: Strategic Growth Fields & Hot Topics</option>
            {/* Add filter options later */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="container mx-auto px-4 pb-16">
        {allItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allItems.map((item, index) => (
              <Link
                key={`${item.type}-${item.slug}-${index}`}
                href={`/${item.type}/${item.slug}`}
                className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  {/* Add Date/Read Time here if available */}
                  {item.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                  )}
                  <span className="text-primary font-semibold text-sm group-hover:underline">
                    Read More &rarr;
                  </span>
                  <div className=" text-right text-xs font-semibold px-2 py-1 rounded">
                    {item.typeName}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No perspective items found.
          </p>
        )}
      </div>
    </div>
  );
}
