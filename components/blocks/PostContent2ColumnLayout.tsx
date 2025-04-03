import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PostContent2ColumnLayoutBlock, PostItem } from '@/types/blocks';
import { StrapiMediaObject } from '@/lib/data';

interface PostContent2ColumnLayoutProps {
  block: PostContent2ColumnLayoutBlock;
}

const PostContent2ColumnLayout: React.FC<PostContent2ColumnLayoutProps> = ({
  block,
}) => {
  const { heading, items } = block;

  if (!items || items.length === 0) {
    return null;
  }

  const renderItem = (item: PostItem, index: number) => {
    const linkHref = item.link || '#';
    const linkTarget = item.isExternal ? '_blank' : item.target || '_self';
    const rel = item.isExternal ? 'noopener noreferrer' : undefined;
    const imageAttrs = item.image?.data?.attributes;

    const content = (
      <div className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col h-full">
        {imageAttrs?.url && (
          <div className="relative w-full h-48">
            {' '}
            {/* Fixed height for image container */}
            <Image
              src={imageAttrs.url}
              alt={imageAttrs.alternativeText || item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
          {item.category && (
            <span className="text-xs font-semibold text-blue-600 uppercase mb-1">
              {item.category}
            </span>
          )}
          <h3 className="text-lg font-semibold mb-2 text-gray-800 flex-grow">
            {item.title}
          </h3>
          {item.date && (
            <p className="text-sm text-gray-500 mb-3">{item.date}</p>
          )}
          {item.excerpt && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {' '}
              {/* Limit excerpt lines */}
              {item.excerpt}
            </p>
          )}
          {/* Optionally add a Read More button/link if not linking the whole card */}
        </div>
      </div>
    );

    if (item.link) {
      return item.isExternal ? (
        <a
          key={index}
          href={linkHref}
          target={linkTarget}
          rel={rel}
          className="block h-full"
        >
          {content}
        </a>
      ) : (
        <Link
          key={index}
          href={linkHref}
          target={linkTarget}
          className="block h-full"
        >
          {content}
        </Link>
      );
    } else {
      return (
        <div key={index} className="h-full">
          {content}
        </div>
      );
    }
  };

  return (
    <div className="my-12">
      {heading && (
        <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>
      )}
      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {items.map(renderItem)}
      </div>
    </div>
  );
};

export default PostContent2ColumnLayout;
