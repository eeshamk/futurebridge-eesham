import React from 'react';
import type { PdfCbBlock } from '@/types/blocks';
import { StrapiMediaObject } from '@/lib/data'; // Keep this for the block prop type

// Local interface defining the expected attributes for the PDF media object
interface PdfAttributes {
  url?: string | null;
  name?: string | null;
  size?: number | null;
  // Add other relevant attributes if needed (e.g., mime, width, height for images)
}

// Interface for the direct document structure
interface DirectPdfDocument {
  url?: string | null;
  name?: string | null;
  alternativeText?: string | null;
  size?: number | null;
  width?: number | null;
  height?: number | null;
  previewUrl?: string | null;
}

interface PdfCbProps {
  block: PdfCbBlock;
}

const PdfCbBlockComponent: React.FC<PdfCbProps> = ({ block }) => {
  const {
    title,
    pdf,
    document, // Destructure the alternative key
  } = block;

  // Prioritize 'pdf' key, but fallback to 'document' key
  const pdfMediaObject = pdf || document;

  // Handle both possible structures: data.attributes.url or direct url property
  let pdfUrl: string | null | undefined;
  let pdfName: string | null | undefined;
  let pdfSize: number | null | undefined;

  if (pdfMediaObject) {
    // Check if it follows the data.attributes structure
    if (pdfMediaObject.data?.attributes) {
      const attrs = pdfMediaObject.data.attributes as PdfAttributes;
      pdfUrl = attrs.url;
      pdfName = attrs.name;
      pdfSize = attrs.size;
    } else {
      // Handle direct properties on the media object
      const directDoc = pdfMediaObject as unknown as DirectPdfDocument;
      pdfUrl = directDoc.url;
      pdfName = directDoc.name || directDoc.alternativeText;
      pdfSize = directDoc.size;
    }
  }

  // Check for URL
  if (!pdfUrl) {
    return (
      <div className="my-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
        PDF block is missing the PDF file URL (checked pdf and document fields).
      </div>
    );
  }

  // Use the extracted values
  const linkText = title || pdfName || 'Download PDF';
  const fileName = pdfName || 'download.pdf';

  return (
    <div className="my-6 p-4 bg-gray-100 border border-gray-300 rounded-lg flex items-center space-x-3">
      {/* PDF Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-600 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {/* Download Link */}
      <a
        href={pdfUrl}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
      >
        {linkText}
      </a>
      {/* Optional: Display file size */}
      {typeof pdfSize === 'number' && (
        <span className="text-sm text-gray-500">
          ({(pdfSize / 1024).toFixed(1)} KB)
        </span>
      )}
    </div>
  );
};

export default PdfCbBlockComponent;
