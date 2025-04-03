import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type {
  PostContent4ColumnLayoutBlock,
  ColumnLayoutItem,
} from '@/types/blocks';
import { StrapiMediaObject } from '@/lib/data';

interface PostContent4ColumnLayoutProps {
  block: PostContent4ColumnLayoutBlock;
}

const PostContent4ColumnLayout: React.FC<PostContent4ColumnLayoutProps> = ({
  block,
}) => {
  const { heading, items } = block;

  if (!items || items.length === 0) {
    // Optional: Render nothing or a message if no items exist
    return null;
  }

  const renderItem = (item: ColumnLayoutItem, index: number) => {
    const linkHref = item.link || '#';
    const linkTarget = item.isExternal ? '_blank' : item.target || '_self';
    const rel = item.isExternal ? 'noopener noreferrer' : undefined;
    const imageAttrs = item.image?.data?.attributes;

    const content = (
      <div className="relative h-48 rounded-lg overflow-hidden shadow-md group flex items-end justify-start text-left p-4 bg-gradient-to-t from-black/60 to-transparent">
        {imageAttrs?.url && (
          <Image
            src={imageAttrs.url}
            alt={imageAttrs.alternativeText || item.title}
            fill
            className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-105 -z-10"
          />
        )}
        <h3 className="relative z-10 text-lg font-semibold text-white">
          {item.title}
        </h3>
      </div>
    );

    if (item.link) {
      return item.isExternal ? (
        <a key={index} href={linkHref} target={linkTarget} rel={rel}>
          {content}
        </a>
      ) : (
        <Link key={index} href={linkHref} target={linkTarget}>
          {content}
        </Link>
      );
    } else {
      // Render as a non-linked div if no link provided
      return <div key={index}>{content}</div>;
    }
  };

  return (
    <div className="my-12">
      {heading && (
        <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>
      )}
      {/* Adjust grid columns based on screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(renderItem)}
      </div>
    </div>
  );
};

export default PostContent4ColumnLayout;
