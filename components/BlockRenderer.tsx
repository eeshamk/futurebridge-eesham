import React from 'react';

// Import Block Types
import type {
  PageBlock,
  HeadingBlock,
  DescriptionBlock,
  BannerContentBlock,
  ImageAndTextBlock,
  ButtonBlock,
  IndustryParticipantsBlockData,
  ClientLogoBlockData,
  SolutionsContentSliderBlock,
  StickySubMenuBlock,
  OurSolutionsBlock,
  DecisiveInsightsBlock,
  BoBlock,
  PromotionalBannerCtaBlock,
  PostContent2ColumnLayoutBlock,
  PostContent4ColumnLayoutBlock,
  ClientsStoriesBlock,
} from '@/types/blocks';

// Import ALL block components
import StickySubMenu from './blocks/StickySubMenu';
import OurSolutions from './blocks/OurSolutions';
import DecisiveInsights from './blocks/DecisiveInsights';
import BoBlockComponent from './blocks/BoBlockComponent';
import SolutionsContentSlider from './blocks/SolutionsContentSlider';
import PromotionalBannerCta from './blocks/PromotionalBannerCta';
import HeadingBlockComponent from './blocks/HeadingBlockComponent';
import DescriptionBlockComponent from './blocks/DescriptionBlockComponent';
import BannerContentBlockComponent from './blocks/BannerContentBlockComponent';
import ImageAndTextBlockComponent from './blocks/ImageAndTextBlockComponent';
import StandaloneButtonBlock from './blocks/StandaloneButtonBlock';
import IndustryParticipantsBlock from './blocks/IndustryParticipantsBlock';
import ClientLogosBlock from './blocks/ClientLogosBlock';
import PostContent2ColumnLayout from './blocks/PostContent2ColumnLayout';
import PostContent4ColumnLayout from './blocks/PostContent4ColumnLayout';
import ClientsStories from './blocks/ClientsStories';

// Remove all local interface definitions for blocks
// They are now imported from @/types/blocks

interface BlockRendererProps {
  // Use the imported union type or keep general if needed, but casting will use imported types
  block: Record<string, any>;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  if (!block || typeof block.__typename !== 'string') {
    console.warn('Received invalid block data:', block);
    return null;
  }

  // Use imported types for casting
  switch (block.__typename) {
    case 'ComponentBlocksHeading':
      return <HeadingBlockComponent block={block as HeadingBlock} />;

    case 'ComponentBlocksDescription':
      return <DescriptionBlockComponent block={block as DescriptionBlock} />;

    case 'ComponentBlocksBannerContent':
      return (
        <BannerContentBlockComponent block={block as BannerContentBlock} />
      );

    case 'ComponentBlocksImageAndTextNonClickable':
      return <ImageAndTextBlockComponent block={block as ImageAndTextBlock} />;

    case 'ComponentBlocksButton':
      return <StandaloneButtonBlock block={block as ButtonBlock} />;

    case 'ComponentBlocksIndustryParticipants':
      return (
        <IndustryParticipantsBlock
          block={block as IndustryParticipantsBlockData}
        />
      );

    case 'ComponentBlocksClientLogos':
      return <ClientLogosBlock block={block as ClientLogoBlockData} />;

    case 'ComponentBlocksSolutionsContentSlider':
      return (
        <SolutionsContentSlider block={block as SolutionsContentSliderBlock} />
      );

    case 'ComponentBlocksStickySubMenu':
      return <StickySubMenu block={block as StickySubMenuBlock} />;

    case 'ComponentBlocksOurSolutions':
      return <OurSolutions block={block as OurSolutionsBlock} />;

    case 'ComponentBlocksDecisiveInsights':
      return <DecisiveInsights block={block as DecisiveInsightsBlock} />;

    case 'ComponentBlocksBo':
      return <BoBlockComponent block={block as BoBlock} />;

    case 'ComponentBlocksPromotionalBannerCta':
      return (
        <PromotionalBannerCta block={block as PromotionalBannerCtaBlock} />
      );

    case 'ComponentBlocksPostContent2ColumnLayout':
      return (
        <PostContent2ColumnLayout
          block={block as PostContent2ColumnLayoutBlock}
        />
      );

    case 'ComponentBlocksPostContent4ColumnLayout':
      return (
        <PostContent4ColumnLayout
          block={block as PostContent4ColumnLayoutBlock}
        />
      );

    case 'ComponentBlocksClientsStories':
      return <ClientsStories block={block as ClientsStoriesBlock} />;

    default:
      const typeName = block.__typename;
      console.warn(`Unsupported block type encountered: ${typeName}`);
      return (
        <div className="my-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          Block type "{typeName}" is not yet supported.
        </div>
      );
  }
};

export default BlockRenderer;
