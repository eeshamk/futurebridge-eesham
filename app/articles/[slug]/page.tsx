import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import BlockRenderer from '@/components/BlockRenderer';
import type { PageBlock } from '@/types/blocks'; // Import the PageBlock type

// Interface for the expected structure of the article data within the JSON
interface ArticleData {
  title?: string;
  slug?: string;
  featuredImage?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  content?: PageBlock[]; // Array of blocks for the article body
  // Add other fields if needed (author, date, etc.)
}

// --- generateStaticParams: Tell Next.js which slugs exist ---
export async function generateStaticParams() {
  const articlesPath = path.join(process.cwd(), 'public', 'data', 'Articles');
  try {
    const files = await fs.readdir(articlesPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    return jsonFiles.map((fileName) => ({
      slug: fileName.replace(/\.json$/, ''), // Remove .json extension for the slug
    }));
  } catch (error) {
    console.error(
      '[generateStaticParams - Articles] Error reading directory:',
      error
    );
    return []; // Return empty array on error
  }
}

// --- Helper function to get data for a single article ---
async function getArticleData(slug: string): Promise<ArticleData | null> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'Articles',
    `${slug}.json`
  );
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    // Extract the article data (assuming same structure as perspectives)
    const articleData: ArticleData | undefined = jsonData?.data?.articles?.[0];
    return articleData || null;
  } catch (error) {
    console.error(
      `[getArticleData] Error reading/parsing file ${filePath}:`,
      error
    );
    // Handle file not found specifically
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }
    // Rethrow other errors or return null
    return null;
  }
}

// --- Page Component Props ---
interface ArticlePageProps {
  // Correctly type params as a Promise
  params: Promise<{ slug: string }>;
}

// --- The Dynamic Article Page Component ---
export default async function ArticlePage({ params }: ArticlePageProps) {
  // Await params before destructuring slug
  const { slug } = await params;
  const articleData = await getArticleData(slug);

  // If no data found for the slug, show 404
  if (!articleData) {
    notFound();
  }

  const { title, featuredImage, content = [] } = articleData;
  const imageAttrs = featuredImage?.url ? featuredImage : null;

  return (
    <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      {/* Article Header */}
      <header className="mb-8 md:mb-12 border-b pb-6">
        {title && (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>
        )}
        {/* TODO: Add meta info like author, date if available */}
      </header>

      {/* Optional Featured Image */}
      {imageAttrs?.url && (
        <div className="mb-8 md:mb-12 relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src={imageAttrs.url}
            alt={
              imageAttrs.alternativeText || title || 'Article featured image'
            }
            fill
            className="object-cover"
            priority // Prioritize loading the main article image
          />
        </div>
      )}

      {/* Article Body - Rendered using BlockRenderer */}
      <div className="prose prose-lg max-w-none">
        {content.length > 0 ? (
          content.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))
        ) : (
          <p className="text-gray-500">Article content is not available.</p>
        )}
      </div>

      {/* TODO: Add related articles or other sections if needed */}
    </article>
  );
}

// --- Optional: generateMetadata --- (Add if SEO data exists in JSON)
// import { Metadata } from 'next';
// export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
//   const articleData = await getArticleData(params.slug);
//   return {
//     title: articleData?.title || 'Article',
//     description: articleData?.excerpts || 'Read this article on FutureBridge',
//     // Add other metadata from articleData.seo if available
//   };
// }
