import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import BlockRenderer from '@/components/BlockRenderer';
import type { PageBlock } from '@/types/blocks';

// Interface for Case Study data (adjust if needed)
interface CaseStudyData {
  title?: string;
  slug?: string;
  featuredImage?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  content?: PageBlock[];
  // Add specific fields if needed
}

// --- generateStaticParams: Tell Next.js which slugs exist ---
export async function generateStaticParams() {
  // Note the directory name "Case Study"
  const caseStudiesPath = path.join(
    process.cwd(),
    'public',
    'data',
    'Case Study'
  );
  try {
    const files = await fs.readdir(caseStudiesPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    return jsonFiles.map((fileName) => ({
      slug: fileName.replace(/\.json$/, ''),
    }));
  } catch (error) {
    console.error(
      '[generateStaticParams - Case Studies] Error reading directory:',
      error
    );
    return [];
  }
}

// --- Helper function to get data for a single case study ---
async function getCaseStudyData(slug: string): Promise<CaseStudyData | null> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'Case Study',
    `${slug}.json`
  );
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    // Use the correct dataKey "caseStudies"
    const caseStudyData: CaseStudyData | undefined =
      jsonData?.data?.caseStudies?.[0];
    return caseStudyData || null;
  } catch (error) {
    console.error(
      `[getCaseStudyData] Error reading/parsing file ${filePath}:`,
      error
    );
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }
    return null;
  }
}

// --- Page Component Props ---
interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

// --- The Dynamic Case Study Page Component ---
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudyData = await getCaseStudyData(slug);

  if (!caseStudyData) {
    notFound();
  }

  const { title, featuredImage, content = [] } = caseStudyData;
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
              imageAttrs.alternativeText || title || 'Case study featured image'
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
          <p className="text-gray-500">Case study content is not available.</p>
        )}
      </div>
    </article>
  );
}

// --- Optional: generateMetadata ---
// ... (similar structure to other pages)
