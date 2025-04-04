import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import BlockRenderer from '@/components/BlockRenderer';
import type { PageBlock } from '@/types/blocks';

// Interface for White Paper data (adjust if needed)
interface WhitePaperData {
  title?: string;
  slug?: string;
  featuredImage?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  content?: PageBlock[];
}

// --- generateStaticParams: Tell Next.js which slugs exist ---
export async function generateStaticParams() {
  const whitePapersPath = path.join(
    process.cwd(),
    'public',
    'data',
    'White Paper'
  );
  try {
    const files = await fs.readdir(whitePapersPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    return jsonFiles.map((fileName) => ({
      slug: fileName.replace(/\.json$/, ''),
    }));
  } catch (error) {
    console.error(
      '[generateStaticParams - White Papers] Error reading directory:',
      error
    );
    return [];
  }
}

// --- Helper function to get data for a single white paper ---
async function getWhitePaperData(slug: string): Promise<WhitePaperData | null> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'White Paper',
    `${slug}.json`
  );
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    // Use the correct dataKey "whitePapers"
    const whitePaperData: WhitePaperData | undefined =
      jsonData?.data?.whitePapers?.[0];
    return whitePaperData || null;
  } catch (error) {
    console.error(
      `[getWhitePaperData] Error reading/parsing file ${filePath}:`,
      error
    );
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }
    return null;
  }
}

// --- Page Component Props ---
interface WhitePaperPageProps {
  params: Promise<{ slug: string }>;
}

// --- The Dynamic White Paper Page Component ---
export default async function WhitePaperPage({ params }: WhitePaperPageProps) {
  const { slug } = await params;
  const whitePaperData = await getWhitePaperData(slug);

  if (!whitePaperData) {
    notFound();
  }

  const { title, featuredImage, content = [] } = whitePaperData;
  const imageAttrs = featuredImage?.url ? featuredImage : null;

  return (
    <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <header className="mb-8 md:mb-12 border-b pb-6">
        {title && (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>
        )}
      </header>

      {imageAttrs?.url && (
        <div className="mb-8 md:mb-12 relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src={imageAttrs.url}
            alt={
              imageAttrs.alternativeText ||
              title ||
              'White paper featured image'
            }
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {content.length > 0 ? (
          content.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))
        ) : (
          <p className="text-gray-500">White paper content is not available.</p>
        )}
      </div>
    </article>
  );
}

// --- Optional: generateMetadata ---
// ...
