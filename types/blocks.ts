import { StrapiMediaObject } from '@/lib/data';

// --- Individual Block Interfaces (Ensure ALL are exported) ---

export interface HeadingBlock {
  __typename: 'ComponentBlocksHeading';
  text: string;
}

export interface DescriptionBlock {
  __typename: 'ComponentBlocksDescription';
  content: string; // Contains HTML content
}

export interface BannerContentBlock {
  __typename: 'ComponentBlocksBannerContent';
  heading: string;
  subHeading?: string | null;
  background?: StrapiMediaObject | null;
}

export interface ImageAndTextBlock {
  __typename: 'ComponentBlocksImageAndTextNonClickable';
  heading?: string;
  description?: string; // Contains HTML
  image?: StrapiMediaObject | null;
  contentVariant?: string; // e.g., 'Text_left_Image_right'
}

export interface ButtonBlock {
  __typename: 'ComponentBlocksButton';
  buttonName: string;
  buttonLink: string;
  isExternal?: boolean;
  target?: string;
  variant?: string;
}

// --- Industry Participants Block Interfaces ---
export interface IndustryItem {
  buttonName: string;
  buttonLink: string;
  target?: string;
  variant?: string;
  isExternal?: boolean;
  backgroundImage?: StrapiMediaObject | null;
}

export interface IndustryParticipantsBlockData {
  __typename: 'ComponentBlocksIndustryParticipants';
  heading?: string | null;
  subHeading?: string | null;
  industryParticipantsButtonName?: string;
  industryParticipantsButtonLink?: string;
  industryParticipantsButtonLinkExternal?: boolean;
  industryParticipantsButtonTarget?: string;
  industryParticipantsButtonVariant?: string;
  backgroundImage?: StrapiMediaObject | null;
  industryItems?: IndustryItem[];
}

// --- Client Logos Block Interfaces ---
export interface ClientLogoBlockData {
  __typename: 'ComponentBlocksClientLogos';
  heading: string;
  subHeading?: string;
  imageSlider: { image: StrapiMediaObject[] }[];
}

// --- Solutions Content Slider Block Interfaces ---
export interface ClientLogoItem {
  image: StrapiMediaObject[];
}
export interface SolutionsContentSliderBlock {
  __typename: 'ComponentBlocksSolutionsContentSlider';
  heading?: string | null;
  content?: string | null; // HTML content
  clientLogos?: ClientLogoItem[];
}

// --- Sticky Sub Menu Block Interfaces ---
export interface MenuItem {
  menuLabel: string;
  menuLink: string;
  menuTarget?: string;
  isMenuLinkExternal?: boolean;
}
export interface StickySubMenuBlock {
  __typename: 'ComponentBlocksStickySubMenu';
  menuLabel?: string;
  menuLink?: string;
  menuTarget?: string;
  isMenuLinkExternal?: boolean;
  stickyMenus?: MenuItem[];
}

// --- Our Solutions Block Interfaces ---
export interface FutureOfIcon {
  iconCaption: string;
  icon: StrapiMediaObject;
}
export interface FutureOfColumn {
  title: string;
  futureOfIcons: FutureOfIcon[];
}
export interface OurSolutionItem {
  title: string;
  description: string; // HTML
}
export interface SolutionDescriptionGroup {
  ourSolutionItems: OurSolutionItem[];
}
export interface OurSolutionsBlock {
  __typename: 'ComponentBlocksOurSolutions';
  heading?: string | null;
  description?: string | null; // HTML
  futureOfColum?: FutureOfColumn | null;
  ourSolutionDescription?: SolutionDescriptionGroup[] | null;
}

// --- Decisive Insights Block Interfaces ---
export interface InsightLinkButton {
  buttonName: string;
  buttonLink: string;
  target?: string;
  variant?: string;
  isExternal?: boolean;
}
export interface DecisiveInsightsBlock {
  __typename: 'ComponentBlocksDecisiveInsights';
  heading?: string | null;
  subHeading?: string | null;
  iconiblocksutton?: InsightLinkButton[] | null;
}

// --- Bo Block Interfaces ---
export interface FutureOfIconItem {
  icon: StrapiMediaObject | null;
}
export interface FutureOfItemData {
  title: string;
  futureOfIcons: FutureOfIconItem[];
}
export interface QuestionItem {
  sections: string;
  question: string;
}
export interface BoSolutionItem {
  solution: string;
  sections: string;
}
export interface BusinessFunctionItem {
  title: string;
  questions: QuestionItem[];
  solutions: BoSolutionItem[];
}
export interface BusinessFunctionData {
  title: string;
  caption: string;
  businessFunctions: BusinessFunctionItem[];
}
export interface BoBlock {
  __typename: 'ComponentBlocksBo';
  heading?: string | null;
  subHeading?: string | null;
  futureOfItem?: FutureOfItemData[] | null;
  businessFunction?: BusinessFunctionData | null;
  topLineText1?: string | null;
  topLineText2?: string | null;
  topLineText3?: string | null;
  bottomLineText1?: string | null;
  bottomLineText2?: string | null;
  bottomLineText3?: string | null;
  [key: string]: any;
}

// --- Promotional Banner CTA Block Interface ---
export interface PromotionalBannerCtaBlock {
  __typename: 'ComponentBlocksPromotionalBannerCta';
  heading?: string | null;
  subHeading?: string | null;
  buttonName?: string | null;
  buttonLink?: string | null;
  isExternal?: boolean | null;
  buttonTarget?: string | null;
  buttonVariant?: 'Primary' | 'Secondary' | string | null;
  PromotionBannerSize?: 'Thin' | 'Standard' | string | null;
  backgroundImage?: StrapiMediaObject | null;
  [key: string]: any;
}

// Interface for items in the 4-column layout (reusing/adapting IndustryItem)
export interface ColumnLayoutItem {
  title: string; // Title displayed on the card
  link?: string | null; // URL the card links to
  isExternal?: boolean | null; // Is the link external?
  target?: string | null; // Link target (_blank, _self)
  image?: StrapiMediaObject | null; // Background or main image for the card
  // Add other potential fields like description, tags if needed
}

// Interface for items in the 2-column layout (e.g., posts, case studies)
export interface PostItem {
  title: string;
  excerpt?: string | null;
  link?: string | null;
  isExternal?: boolean | null;
  target?: string | null;
  image?: StrapiMediaObject | null;
  category?: string | null; // Optional category/tag
  date?: string | null; // Optional date string
  // Add other fields like readTime, author etc.
}

// --- Updated Placeholder for 2 Column Layout ---
export interface PostContent2ColumnLayoutBlock {
  __typename: 'ComponentBlocksPostContent2ColumnLayout';
  heading?: string | null; // Optional heading for the section
  items?: PostItem[] | null; // Array of post-like items
  [key: string]: any;
}

// --- Updated Placeholder for 4 Column Layout ---
export interface PostContent4ColumnLayoutBlock {
  __typename: 'ComponentBlocksPostContent4ColumnLayout';
  heading?: string | null; // Optional heading for the section
  items?: ColumnLayoutItem[] | null; // Array of column items
  [key: string]: any;
}

// --- Clients Stories Block Interface ---
export interface ClientStory {
  title: string;
  description?: string | null;
  link?: string | null;
  isExternal?: boolean | null;
  target?: string | null;
  image?: StrapiMediaObject | null;
  clientName?: string | null;
  position?: string | null;
}

export interface ClientsStoriesBlock {
  __typename: 'ComponentBlocksClientsStories';
  heading?: string | null;
  subHeading?: string | null;
  stories?: ClientStory[] | null;
  [key: string]: any;
}

// --- Image And Text Clickable Block Interface ---
export interface ImageAndTextClickableBlock {
  __typename: 'ComponentBlocksImageAndTextClickable';
  heading?: string | null;
  description?: string | null; // Contains HTML
  image?: StrapiMediaObject | null;
  contentVariant?: string | null; // e.g., 'Text_left_Image_right'
  buttonName?: string | null;
  buttonLink?: string | null;
  isExternal?: boolean | null;
  buttonTarget?: string | null;
  buttonVariant?: string | null;
  [key: string]: any;
}

// --- SGF Block Interface ---
export interface SgfBlock {
  __typename: 'ComponentBlocksSgf';
  heading?: string | null;
  subHeading?: string | null;
  content?: string | null; // HTML content
  image?: StrapiMediaObject | null;
  // SGF likely stands for some specific content format or feature
  // Adding common fields that might be needed
  buttonName?: string | null;
  buttonLink?: string | null;
  isExternal?: boolean | null;
  buttonTarget?: string | null;
  [key: string]: any;
}

// --- Image Popup Block Interface (Ensure Exported) ---
export interface ImagePopupBlock {
  __typename: 'ComponentBlocksImagePopup';
  imagePopupTitle?: string | null;
  imagePopup?: StrapiMediaObject | null;
  enable?: boolean | null;
  [key: string]: any;
}

// --- Sidebar Content and Reference Section Block Interface (Ensure Exported) ---
export interface SidebarContentAndReferenceSectionBlock {
  __typename: 'ComponentBlocksSidebarContentAndReferenceSection';
  title?: string | null;
  description?: string | null; // HTML content
  sizeVariant?: 'Full_width' | 'Half_width' | string | null; // Example variants
  [key: string]: any;
}

// --- Quotes And Contents Block Interface ---
export interface QuotesAndContentsBlock {
  __typename: 'ComponentBlocksQuotesAndContents';
  quote?: string | null;
  content?: string | null; // HTML content
  quoteVariant?: string | null; // e.g., Quote_and_content_right_align
  [key: string]: any;
}

// --- Overview Heading And Content Block Interface ---
export interface OverviewHeadingAndContentBlock {
  __typename: 'ComponentBlocksOverviewHeadingAndContent';
  heading?: string | null;
  description?: string | null; // HTML content
  variant?: string | null; // e.g., Content_with_Top_and_Bottom_border
  [key: string]: any;
}

// --- PDF Cb Block Interface ---
export interface PdfCbBlock {
  __typename: 'ComponentBlocksPdfCb';
  title?: string | null;
  pdf?: StrapiMediaObject | null; // Original expected key
  document?: StrapiMediaObject | null; // Add alternative key found in data
  [key: string]: any;
}

// --- Union Type for All Blocks (Ensure all types are included) ---
export type PageBlock =
  | HeadingBlock
  | DescriptionBlock
  | BannerContentBlock
  | ImageAndTextBlock
  | ButtonBlock
  | IndustryParticipantsBlockData
  | ClientLogoBlockData
  | SolutionsContentSliderBlock
  | StickySubMenuBlock
  | OurSolutionsBlock
  | DecisiveInsightsBlock
  | BoBlock
  | PromotionalBannerCtaBlock
  | PostContent2ColumnLayoutBlock
  | PostContent4ColumnLayoutBlock
  | ClientsStoriesBlock
  | ImageAndTextClickableBlock
  | SgfBlock
  | ImagePopupBlock
  | SidebarContentAndReferenceSectionBlock
  | OverviewHeadingAndContentBlock
  | QuotesAndContentsBlock
  | PdfCbBlock;
