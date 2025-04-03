import { getJsonData, StrapiPageData } from '@/lib/data';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';

export default async function AboutPage() {
  const pageData = await getJsonData<StrapiPageData>('Pages/about.json');

  if (!pageData) {
    // Handle case where data fetching fails or file is empty/invalid
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Optionally render a main title if not handled by a banner block */}
      {/* <h1 className="text-4xl font-bold mb-8">{pageData.title}</h1> */}

      {/* Render blocks */}
      {pageData.blocks && Array.isArray(pageData.blocks) ? (
        pageData.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))
      ) : (
        <p>This page currently has no content blocks.</p>
      )}
    </div>
  );
}

// Optional: Add metadata generation if needed
// export async function generateMetadata() { ... }
