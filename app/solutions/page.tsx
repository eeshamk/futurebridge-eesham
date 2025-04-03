import { getJsonData, SolutionsPageData } from '@/lib/data';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';

export default async function SolutionsPage() {
  // Use SolutionsPageData, assuming it extends StrapiPageData or is similar
  const pageData = await getJsonData<SolutionsPageData>('Pages/solutions.json');

  if (!pageData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
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
