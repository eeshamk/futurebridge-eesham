import {
  getJsonData,
  getJsonDataFromDirectory,
  StrapiPageData,
  EventData,
  ClientStoryData,
  SolutionsPageData,
  PerspectivesListData,
  ClientLogoBlock,
} from '@/lib/data';

import HeroSection from '@/components/homepage/HeroSection';
import SpotlightSection from '@/components/homepage/SpotlightSection';
import ClientStoriesSection from '@/components/homepage/ClientStoriesSection';
import SolutionsSection from '@/components/homepage/SolutionsSection';
import PerspectivesSection from '@/components/homepage/PerspectivesSection';
import ClientLogosSection from '@/components/homepage/ClientLogosSection';

// Helper function to safely find a block by type
const findBlock = <T extends { __typename: string }>(
  blocks: any[],
  typeName: string
): T | undefined => {
  if (!Array.isArray(blocks)) return undefined;
  return blocks.find((block) => block && block.__typename === typeName) as
    | T
    | undefined;
};

export default async function Home() {
  // Fetch data for all sections concurrently
  const [
    rawEvents,
    rawWebinars,
    rawClientStories,
    solutionsData,
    perspectivesData,
    aboutData,
  ] = await Promise.all([
    getJsonDataFromDirectory<EventData>('Events'),
    getJsonDataFromDirectory<EventData>('Webinars'),
    getJsonDataFromDirectory<ClientStoryData>('Client Videos'),
    getJsonData<SolutionsPageData>('Pages/solutions.json'),
    getJsonData<PerspectivesListData>('Pages/listing/perspectives.json'),
    getJsonData<StrapiPageData>('Pages/about.json'),
  ]);

  // Filter valid items first
  const validEvents = rawEvents.filter((item) => item && item.attributes);
  const validWebinars = rawWebinars.filter((item) => item && item.attributes);
  const validClientStories = rawClientStories.filter(
    (story) => story && story.attributes
  );

  // Combine and sort Spotlight items
  const spotlightItems = [...validEvents, ...validWebinars].sort((a, b) => {
    const dateA = a.attributes.date ? new Date(a.attributes.date).getTime() : 0;
    const dateB = b.attributes.date ? new Date(b.attributes.date).getTime() : 0;
    const timeA = isNaN(dateA) ? 0 : dateA;
    const timeB = isNaN(dateB) ? 0 : dateB;
    return timeB - timeA; // Sort descending
  });

  // Extract client logos data from aboutData blocks
  const clientLogosBlock = findBlock<ClientLogoBlock>(
    aboutData?.blocks || [],
    'ComponentBlocksClientLogos'
  );

  return (
    <>
      <HeroSection />
      <SpotlightSection items={spotlightItems} />
      <ClientStoriesSection stories={validClientStories} />
      <SolutionsSection solutionsData={solutionsData} />
      <PerspectivesSection perspectivesData={perspectivesData} />
      {/* TODO: Pass actual perspective items (articles etc.) to PerspectivesSection */}
      <ClientLogosSection clientData={clientLogosBlock} />
    </>
  );
}
