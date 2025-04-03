import React from 'react';

interface DescriptionBlock {
  __typename: 'ComponentBlocksDescription';
  content: string; // Contains HTML content
}

interface DescriptionBlockProps {
  block: DescriptionBlock;
}

const DescriptionBlockComponent: React.FC<DescriptionBlockProps> = ({
  block,
}) => {
  return (
    <div
      className="prose lg:prose-xl max-w-none my-4"
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );
};

export default DescriptionBlockComponent;
