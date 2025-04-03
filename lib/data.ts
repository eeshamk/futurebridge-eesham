import fs from 'fs/promises';
import path from 'path';

// Base directory where the JSON data is stored
const dataDir = path.join(process.cwd(), 'public', 'data');

/**
 * Reads and parses a JSON file from the public/data directory.
 * Assumes the relevant content is nested under a top-level 'data' key in the JSON.
 * @param filePath - The relative path to the JSON file within the data directory (e.g., 'Pages/about.json').
 * @returns The parsed JSON data under the 'data' key, or null if the file doesn't exist, is invalid, or lacks the 'data' key.
 */
export async function getJsonData<T>(filePath: string): Promise<T | null> {
  const fullPath = path.join(dataDir, filePath);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const jsonData = JSON.parse(fileContents);

    if (jsonData && jsonData.data) {
      if (
        Array.isArray(jsonData.data.pages) &&
        jsonData.data.pages.length > 0
      ) {
        return jsonData.data.pages[0] as T;
      }
      console.warn(
        `[getJsonData] 'data' key found, but 'data.pages[0]' structure not found in ${filePath}. Assuming page structure failure.`
      );
      return null;
    } else {
      console.warn(
        `[getJsonData] Data structure in ${filePath} missing top-level 'data' key. Returning null.`
      );
      return null;
    }
  } catch (error) {
    console.error(
      `[getJsonData] Error reading or parsing JSON file ${filePath}:`,
      error
    );
    return null;
  }
}

/**
 * Reads all JSON files from a specific directory within public/data.
 * @param dirPath - The relative path to the directory within the data directory (e.g., 'Events').
 * @returns An array of parsed JSON data (content under the 'data' key) from each file, filtering out nulls.
 */
export async function getJsonDataFromDirectory<T>(
  dirPath: string
): Promise<T[]> {
  const fullDirPath = path.join(dataDir, dirPath);
  try {
    const filenames = await fs.readdir(fullDirPath);
    const jsonDataPromises = filenames
      .filter((filename) => filename.endsWith('.json'))
      .map((filename) => getJsonData<T>(path.join(dirPath, filename))); // Returns Promise<T | null>[]

    // Explicitly type the result of Promise.all
    const results: (T | null)[] = await Promise.all(jsonDataPromises);

    // Filter out null values using a type predicate
    return results.filter((data): data is T => data !== null);
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

// Define interfaces for the expected data structures (examples)
// We'll need to refine these based on the actual JSON content

// Example for a generic page structure (like about.json)
// Note: getJsonData returns the content *inside* data.pages[0]
export interface StrapiPageData {
  title: string;
  slug: string;
  blocks: any[]; // Define more specific block types later
  seo?: any;
  // ... other fields
}

// Example for an Event/Webinar item
// Note: getJsonData returns the content *inside* data
export interface EventData {
  // Assuming the JSON has data: { attributes: { title: ..., slug: ... } }
  attributes: {
    title: string;
    slug: string;
    shortDescription?: string;
    date?: string;
    image?: StrapiMediaObject; // Changed from StrapiMedia
    // ... other fields
  };
  id: number; // Usually included outside attributes
}

// Example for Client Video/Story
// Note: getJsonData returns the content *inside* data
export interface ClientStoryData {
  // Assuming the JSON has data: { attributes: { ... } }
  attributes: {
    title: string;
    slug: string;
    videoLink?: string;
    thumbnail?: StrapiMediaObject; // Changed from StrapiMedia
    clientName?: string;
    clientDesignation?: string;
    // ... other fields
  };
  id: number;
}

// Example for Strapi Media object (often nested under data.attributes)
export interface StrapiMediaData {
  attributes: StrapiMedia;
  id: number;
}

// Example for Strapi Media attributes
export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

// Example for a media field which might contain data object
export interface StrapiMediaObject {
  data: StrapiMediaData | null;
}

// Example structure for solutions.json (assuming it's a page)
export interface SolutionsPageData extends StrapiPageData {
  // Add specific fields for Solutions page if any
}

// Example structure for perspectives.json (assuming it's a listing page)
export interface PerspectivesListData extends StrapiPageData {
  // Or a specific structure for the listing
}

// Example structure for the ClientLogos block within about.json page blocks
export interface ClientLogoBlock {
  __typename: 'ComponentBlocksClientLogos';
  heading: string;
  subHeading?: string;
  // Assuming imageSlider contains an array of objects, each with an 'image' field which is an array of media objects
  imageSlider: { image: StrapiMediaObject[] }[];
}

// --- Function to get available industry slugs ---
export async function getIndustrySlugs(): Promise<string[]> {
  const industryDataBasePath = 'Pages/industry'; // Relative path within public/data
  const directoryPath = path.join(
    process.cwd(),
    'public',
    'data',
    industryDataBasePath
  );

  try {
    // Use fs.readdir from fs/promises, it returns string[]
    const files: string[] = await fs.readdir(directoryPath);

    // Filter for .json files and extract the slug (filename without extension)
    const slugs = files
      .filter((file: string) => path.extname(file).toLowerCase() === '.json')
      .map((file: string) => path.basename(file, '.json'));

    return slugs;
  } catch (error) {
    // More specific error check for directory not found
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      console.warn(
        `Industry directory not found: ${directoryPath}. Returning empty slug list.`
      );
    } else {
      console.error(
        `Error reading industry directory ${directoryPath}:`,
        error
      );
    }
    return []; // Return empty array on error
  }
}
