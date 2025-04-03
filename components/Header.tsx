'use client'; // This component needs state for the dropdown

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'; // Example icons

// Define props for the Header
interface HeaderProps {
  industrySlugs: string[];
}

const Header: React.FC<HeaderProps> = ({ industrySlugs }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for detecting outside clicks

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to format slug for display (e.g., 'chemicals-natural-resources' -> 'Chemicals & Natural Resources')
  const formatSlugForDisplay = (slug: string): string => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/&/g, ' & '); // Add space around ampersand if needed
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          {/* Replace with your logo if available */}
          <Image
            src="/futurebridge-logo.svg"
            alt="FutureBridge Logo"
            width={180}
            height={40}
          />
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link href="/solutions" className="text-gray-600 hover:text-blue-600">
            Solutions
          </Link>

          {/* Industries Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              Industries
              {isDropdownOpen ? (
                <ChevronUpIcon className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-60 bg-white rounded-md shadow-xl z-20">
                {industrySlugs.length > 0 ? (
                  industrySlugs.map((slug) => (
                    <Link
                      key={slug}
                      href={`/industry/${slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      {formatSlugForDisplay(slug)}
                    </Link>
                  ))
                ) : (
                  <span className="block px-4 py-2 text-sm text-gray-500">
                    No industries found
                  </span>
                )}
              </div>
            )}
          </div>

          <Link
            href="/perspectives"
            className="text-gray-600 hover:text-blue-600"
          >
            Perspectives
          </Link>
          {/* Add other links like login/contact if needed */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
