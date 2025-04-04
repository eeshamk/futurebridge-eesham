import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import BlockRenderer from '@/components/BlockRenderer';
import type { PageBlock } from '@/types/blocks';

// Interface for Webinar data (adjust if structure differs significantly from ArticleData)
interface WebinarData {
  title?: string;
  slug?: string;
  featuredImage?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  content?: PageBlock[]; // Assuming webinars also use a content block array
  // Add webinar-specific fields if needed (e.g., video URL, speaker info)
}

// --- generateStaticParams: Tell Next.js which webinar slugs exist ---
export async function generateStaticParams() {
  const webinarsPath = path.join(process.cwd(), 'public', 'data', 'Webinars');
  try {
    const files = await fs.readdir(webinarsPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    return jsonFiles.map((fileName) => ({
      slug: fileName.replace(/\.json$/, ''),
    }));
  } catch (error) {
    console.error(
      '[generateStaticParams - Webinars] Error reading directory:',
      error
    );
    return [];
  }
}

// --- Helper function to get data for a single webinar ---
async function getWebinarData(slug: string): Promise<WebinarData | null> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'Webinars',
    `${slug}.json`
  );
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    // Extract webinar data (assuming data.webinars[0] structure)
    const webinarData: WebinarData | undefined = jsonData?.data?.webinars?.[0];
    return webinarData || null;
  } catch (error) {
    console.error(
      `[getWebinarData] Error reading/parsing file ${filePath}:`,
      error
    );
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }
    return null;
  }
}

// --- Page Component Props ---
interface WebinarPageProps {
  params: Promise<{ slug: string }>;
}

// --- The Dynamic Webinar Page Component ---
export default async function WebinarPage({ params }: WebinarPageProps) {
  const { slug } = await params;
  const webinarData = await getWebinarData(slug);

  if (!webinarData) {
    notFound();
  }

  // Assuming similar fields to Article for basic layout
  const { title, featuredImage, content = [] } = webinarData;
  const imageAttrs = featuredImage?.url ? featuredImage : null;

  return (
    // Using <article> tag, but could be <section> or <div>
    <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <header className="mb-8 md:mb-12 border-b pb-6">
        {title && (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>
        )}
        {/* TODO: Add webinar specific info (date, speakers, video embed?) */}
      </header>

      {imageAttrs?.url && (
        <div className="mb-8 md:mb-12 relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src={imageAttrs.url}
            alt={
              imageAttrs.alternativeText || title || 'Webinar featured image'
            }
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Webinar Body/Content */}
      <div className="prose prose-lg max-w-none">
        {/* TODO: Potentially add a video embed block here if data available */}

        {content.length > 0 ? (
          content.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))
        ) : (
          <p className="text-gray-500">Webinar content is not available.</p>
        )}
      </div>
    </article>
  );
}

// --- Optional: generateMetadata ---
// import { Metadata } from 'next';
// export async function generateMetadata({ params }: WebinarPageProps): Promise<Metadata> {
//   const webinarData = await getWebinarData(await params.slug); // Need await here too potentially
//   return {
//     title: webinarData?.title || 'Webinar',
//     // description: webinarData?.excerpts || 'Watch this webinar from FutureBridge',
//   };
// }
