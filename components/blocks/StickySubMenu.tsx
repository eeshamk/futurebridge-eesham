import React from 'react';
import Link from 'next/link';

// Define the structure for individual menu items within the sticky menu
interface MenuItem {
  menuLabel: string;
  menuLink: string;
  menuTarget?: string; // e.g., self, _blank
  isMenuLinkExternal?: boolean;
}

// Define the props interface based on the observed JSON structure
interface StickySubMenuProps {
  block: {
    __typename: 'ComponentBlocksStickySubMenu';
    menuLabel?: string; // Main overview label
    menuLink?: string; // Main overview link
    menuTarget?: string;
    isMenuLinkExternal?: boolean;
    stickyMenus?: MenuItem[]; // Array of sub-menu items
  };
}

const StickySubMenu: React.FC<StickySubMenuProps> = ({ block }) => {
  // Combine the main link (if present) with the sub-menu items
  const allMenuItems: MenuItem[] = [];
  if (block.menuLabel && block.menuLink) {
    allMenuItems.push({
      menuLabel: block.menuLabel,
      menuLink: block.menuLink,
      menuTarget: block.menuTarget,
      isMenuLinkExternal: block.isMenuLinkExternal,
    });
  }
  if (Array.isArray(block.stickyMenus)) {
    allMenuItems.push(...block.stickyMenus);
  }

  if (allMenuItems.length === 0) {
    return null; // Don't render anything if there are no menu items
  }

  return (
    // Apply sticky positioning and styling
    <div className="sticky top-0 z-40 bg-white shadow-md py-3 border-b border-gray-200 mb-8">
      <div className="container mx-auto px-6">
        <nav className="flex justify-center space-x-6 md:space-x-8 overflow-x-auto whitespace-nowrap">
          {allMenuItems.map((item, index) => {
            const target = item.isMenuLinkExternal
              ? '_blank'
              : item.menuTarget || '_self';
            const rel = item.isMenuLinkExternal
              ? 'noopener noreferrer'
              : undefined;
            const linkHref = item.menuLink || '#'; // Default to # if link is missing

            // Use Next Link for internal links, anchor for external/hash links
            const isInternalPageLink =
              !item.isMenuLinkExternal && linkHref.startsWith('/');

            return (
              <React.Fragment key={index}>
                {isInternalPageLink ? (
                  <Link href={linkHref} passHref legacyBehavior>
                    <a
                      target={target}
                      rel={rel}
                      className="text-sm md:text-base font-medium text-gray-600 hover:text-blue-600 transition duration-200 py-1"
                    >
                      {item.menuLabel}
                    </a>
                  </Link>
                ) : (
                  <a
                    href={linkHref}
                    target={target}
                    rel={rel}
                    className="text-sm md:text-base font-medium text-gray-600 hover:text-blue-600 transition duration-200 py-1"
                  >
                    {item.menuLabel}
                  </a>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default StickySubMenu;
