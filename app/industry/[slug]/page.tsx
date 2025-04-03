import { getIndustrySlugs, getJsonData } from '@/lib/data';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';
import type { PageBlock } from '@/types/blocks'; // Assuming PageBlock is exported

// Define the expected structure for a single industry page from the JSON
// Adapt this based on the actual structure if different from SolutionsPageData
interface IndustryPage {
  title: string;
  slug: string;
  blocks: PageBlock[];
  // Add other fields like seo, parentPage etc. if they exist
}

interface IndustryPageData {
  data: {
    pages: IndustryPage[];
  };
}

// Generate static paths for each industry slug
export async function generateStaticParams() {
  const slugs = await getIndustrySlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Props for the page component
interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

// The Dynamic Industry Page Component
export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const filePath = `Pages/industry/${slug}.json`;

  // Fetch data for the specific industry
  const pageData: IndustryPageData | null = await getJsonData(filePath);

  const pageContent = pageData as IndustryPage | null;

  if (!pageContent) {
    console.warn(
      `[IndustryPage] No pageContent found for slug: ${slug} at path: ${filePath}. Triggering notFound().`
    );
    notFound();
  }

  const blocks = pageContent.blocks || [];

  return (
    <main className="container mx-auto px-6 py-8">
      {/* Optional: Render page title or other top-level elements like a banner */}
      {/* <h1 className="text-4xl font-bold mb-8">{pageContent.title}</h1> */}

      {/* Render the blocks using BlockRenderer */}
      {blocks.length > 0 ? (
        blocks.map((block: any, index: number) => (
          <BlockRenderer key={index} block={block} />
        ))
      ) : (
        <p className="text-center text-gray-500">
          No content blocks available for this industry page.
        </p>
      )}
    </main>
  );
}

// Optional: Add metadata generation based on fetched data
// export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const filePath = `Pages/industry/${slug}.json`;
//   const pageData: IndustryPageData | null = await getJsonData(filePath);
//   const pageContent = pageData?.data?.pages?.[0];

//   return {
//     title: pageContent?.title || 'Industry Page',
//     // Add other metadata like description based on pageData.seo if available
//   };
// }
