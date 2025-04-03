'use client'; // Tabs require client-side state

import React, { useState } from 'react';
// Import the specific types needed
import type { BoBlock, QuestionItem, BoSolutionItem } from '@/types/blocks';
// Keep StrapiMediaObject if needed, or remove if BoBlock doesn't use it directly
// import { StrapiMediaObject } from '@/lib/data';

// --- Remove local Interfaces (they are in @/types/blocks) ---
// interface FutureOfIconItem { ... }
// interface FutureOfItemData { ... }
// interface QuestionItem { ... }
// interface SolutionItem { ... }
// interface BusinessFunctionItem { ... }
// interface BusinessFunctionData { ... }

// --- Use the imported BoBlock type for props ---
interface BoBlockProps {
  block: BoBlock; // Use the imported central type definition
}

// --- Helper function to filter items based on section key ---
const filterBySection = (
  items: (QuestionItem | BoSolutionItem)[],
  sectionKey: string
) => {
  return items.filter((item) => {
    // Simple check for now, might need refinement based on all possible section values
    if ('question' in item) {
      // Match question sections directly
      return item.sections.toLowerCase().includes(sectionKey.toLowerCase());
    } else if ('solution' in item) {
      // Match solution sections (handle multi-term like Short_Mid_Long)
      const solutionSections = item.sections.toLowerCase().split('_');
      return solutionSections.includes(sectionKey.toLowerCase());
    }
    return false;
  });
};

// --- The Component ---
const BoBlockComponent: React.FC<BoBlockProps> = ({ block }) => {
  const {
    heading,
    subHeading,
    businessFunction,
    topLineText1 = 'Insights',
    topLineText2 = 'Strategize',
    topLineText3 = 'Implement Disruption',
    bottomLineText1 = 'Short Term',
    bottomLineText2 = 'Medium Term',
    bottomLineText3 = 'Long Term',
  } = block;

  const tabs = businessFunction?.businessFunctions || [];
  const [activeTab, setActiveTab] = useState(0); // Default to the first tab

  if (tabs.length === 0) {
    // Render nothing or a placeholder if no tab data exists
    return (
      <div className="my-12 p-6 bg-gray-100 border border-gray-300 rounded-lg text-center">
        <p className="text-gray-600">
          BoBlockComponent: No business function data found.
        </p>
      </div>
    );
  }

  const activeTabData = tabs[activeTab];

  // Filter questions and solutions for the active tab and sections
  const insightsQuestions = filterBySection(
    activeTabData.questions,
    'insights'
  ) as QuestionItem[];
  const strategizeQuestions = filterBySection(
    activeTabData.questions,
    'strategize'
  ) as QuestionItem[];
  const implementQuestions = filterBySection(
    activeTabData.questions,
    'implement'
  ) as QuestionItem[];

  const insightsSolutions = filterBySection(
    activeTabData.solutions,
    'short'
  ) as BoSolutionItem[];
  const strategizeSolutions = filterBySection(
    activeTabData.solutions,
    'mid'
  ) as BoSolutionItem[];
  const implementSolutions = filterBySection(
    activeTabData.solutions,
    'long'
  ) as BoSolutionItem[];

  return (
    <div className="my-12 py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            {heading}
          </h2>
        )}
        {subHeading && (
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
            {subHeading}
          </p>
        )}

        {/* Tab Buttons */}
        <div className="mb-8 border-b border-gray-300 flex justify-center flex-wrap">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 text-sm md:text-base font-medium focus:outline-none transition-colors duration-200 ${
                activeTab === index
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6 bg-gray-50 rounded-lg shadow">
          {businessFunction?.caption && (
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
              {businessFunction.caption}
            </h3>
          )}

          {/* Grid for Questions and Solutions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Column 1: Insights / Short Term */}
            <div className="border border-gray-200 p-4 rounded bg-white">
              <h4 className="font-bold text-blue-700 text-lg mb-1">
                {topLineText1}
              </h4>
              <p className="text-sm text-gray-500 mb-4">{bottomLineText1}</p>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-600 mb-2 border-b pb-1">
                    Questions:
                  </h5>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {insightsQuestions.map((q, i) => (
                      <li key={`q1-${i}`}>{q.question}</li>
                    ))}
                    {insightsQuestions.length === 0 && (
                      <li className="text-gray-400 italic">None</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-600 mt-4 mb-2 border-b pb-1">
                    Solutions:
                  </h5>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {insightsSolutions.map((s, i) => (
                      <li key={`s1-${i}`}>{s.solution}</li>
                    ))}
                    {insightsSolutions.length === 0 && (
                      <li className="text-gray-400 italic">None</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 2: Strategize / Medium Term */}
            <div className="border border-gray-200 p-4 rounded bg-white">
              <h4 className="font-bold text-green-700 text-lg mb-1">
                {topLineText2}
              </h4>
              <p className="text-sm text-gray-500 mb-4">{bottomLineText2}</p>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-600 mb-2 border-b pb-1">
                    Questions:
                  </h5>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {strategizeQuestions.map((q, i) => (
                      <li key={`q2-${i}`}>{q.question}</li>
                    ))}
                    {strategizeQuestions.length === 0 && (
                      <li className="text-gray-400 italic">None</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-600 mt-4 mb-2 border-b pb-1">
                    Solutions:
                  </h5>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {strategizeSolutions.map((s, i) => (
                      <li key={`s2-${i}`}>{s.solution}</li>
                    ))}
                    {strategizeSolutions.length === 0 && (
                      <li className="text-gray-400 italic">None</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 3: Implement Disruption / Long Term */}
            <div className="border border-gray-200 p-4 rounded bg-white">
              <h4 className="font-bold text-purple-700 text-lg mb-1">
                {topLineText3}
              </h4>
              <p className="text-sm text-gray-500 mb-4">{bottomLineText3}</p>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-600 mb-2 border-b pb-1">
                    Questions:
                  </h5>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {implementQuestions.map((q, i) => (
                      <li key={`q3-${i}`}>{q.question}</li>
                    ))}
                    {implementQuestions.length === 0 && (
                      <li className="text-gray-400 italic">None</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-600 mt-4 mb-2 border-b pb-1">
                    Solutions:
                  </h5>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {implementSolutions.map((s, i) => (
                      <li key={`s3-${i}`}>{s.solution}</li>
                    ))}
                    {implementSolutions.length === 0 && (
                      <li className="text-gray-400 italic">None</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoBlockComponent;
