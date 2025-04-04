import React from 'react';
import type { QuotesAndContentsBlock } from '@/types/blocks';

interface QuotesAndContentsProps {
  block: QuotesAndContentsBlock;
}

const QuotesAndContentsBlockComponent: React.FC<QuotesAndContentsProps> = ({
  block,
}) => {
  const { quote, content, quoteVariant } = block;

  // Determine layout direction based on variant
  const isQuoteLeft =
    !quoteVariant || !quoteVariant.toLowerCase().includes('right');

  return (
    <div
      className={`my-12 flex flex-col ${
        isQuoteLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } gap-8 items-start`}
    >
      {/* Quote Section */}
      {quote && (
        <aside className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <blockquote className="relative p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-md">
            {/* Optional: Add a decorative quote mark */}
            <svg
              className="absolute top-2 left-2 w-6 h-6 text-blue-300 opacity-50"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path
                d="M9.333 8C4.733 8 1 11.733 1 16.333S4.733 24.667 9.333 24.667C14.2 24.667 18 20.6 18 16.333h-6.667V8H9.333zm14 0C28.733 8 25 11.733 25 16.333S28.733 24.667 33.333 24.667C38.2 24.667 42 20.6 42 16.333h-6.667V8H31.333z"
                transform="scale(0.75)"
              />
            </svg>
            <p className="text-lg italic text-blue-800 leading-relaxed z-10 relative">
              {quote}
            </p>
          </blockquote>
        </aside>
      )}

      {/* Content Section */}
      {content && (
        <div className="w-full flex-grow prose prose-lg max-w-none text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}

      {!quote && !content && (
        <p className="text-gray-500 italic">Quote and content missing.</p>
      )}
    </div>
  );
};

export default QuotesAndContentsBlockComponent;
