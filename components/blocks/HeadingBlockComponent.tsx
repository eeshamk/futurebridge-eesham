import React from 'react';

interface HeadingBlock {
  __typename: 'ComponentBlocksHeading';
  text: string;
}

interface HeadingBlockProps {
  block: HeadingBlock;
}

const HeadingBlockComponent: React.FC<HeadingBlockProps> = ({ block }) => {
  return <h2 className="text-3xl font-bold my-6">{block.text}</h2>;
};

export default HeadingBlockComponent;
