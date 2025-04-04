'use client'; // Tabs require client-side state

import React, { useState, useMemo } from 'react';
// Import the specific types needed
import type {
  BoBlock,
  QuestionItem,
  BoSolutionItem,
  BusinessFunctionItem,
} from '@/types/blocks';
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

// Helper function to convert polar to Cartesian coordinates
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

// Helper function to describe an SVG arc path
const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
  return d;
};

// Helper function to describe an SVG donut segment path
const describeDonutSegment = (
  x: number,
  y: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
): string => {
  const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
  const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
  const startInner = polarToCartesian(x, y, innerRadius, endAngle);
  const endInner = polarToCartesian(x, y, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M',
    startOuter.x,
    startOuter.y, // Move to start of outer arc
    'A',
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    0,
    endOuter.x,
    endOuter.y, // Outer arc
    'L',
    endInner.x,
    endInner.y, // Line to start of inner arc
    'A',
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    1,
    startInner.x,
    startInner.y, // Inner arc (reversed sweep-flag)
    'Z', // Close path
  ].join(' ');

  return d;
};

// Simplified filtering logic just for questions based on keywords
const filterQuestions = (
  questions: QuestionItem[],
  keyword: string
): QuestionItem[] => {
  // Keywords match the section names in the data (e.g., Insights_Short_Term)
  const lowerKeyword = keyword.toLowerCase();
  return questions.filter((q) =>
    q.sections.toLowerCase().includes(lowerKeyword)
  );
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

  const functions = businessFunction?.businessFunctions || [];
  const [activeIndex, setActiveIndex] = useState(0); // Index of the active segment

  const activeFunctionData =
    functions.length > 0 ? functions[activeIndex] : null;

  // Memoize filtered questions to avoid recalculation on every render
  const filteredQuestions = useMemo(() => {
    if (!activeFunctionData) {
      return { insights: [], strategize: [], implement: [] };
    }
    return {
      insights: filterQuestions(activeFunctionData.questions, 'insights'), // Assuming 'insights' is part of section key
      strategize: filterQuestions(activeFunctionData.questions, 'strategize'), // Assuming 'strategize' is part of section key
      implement: filterQuestions(activeFunctionData.questions, 'implement'), // Assuming 'implement' is part of section key
    };
  }, [activeFunctionData]);

  if (functions.length === 0) {
    // Render nothing or a placeholder if no tab data exists
    return (
      <div className="my-12 p-6 bg-gray-100 border border-gray-300 rounded-lg text-center">
        <p className="text-gray-600">
          BoBlockComponent: No business function data found.
        </p>
      </div>
    );
  }

  // --- SVG Donut Chart Calculations ---
  const numSegments = functions.length;
  const anglePerSegment = 360 / numSegments;
  const svgSize = 400; // Adjust size as needed
  const center = svgSize / 2;
  const outerRadius = svgSize * 0.4; // e.g., 80% of half the size
  const innerRadius = svgSize * 0.2; // e.g., 40% of half the size
  const labelRadius = (outerRadius + innerRadius) / 2; // Radius for placing labels

  // Colors (adjust as needed)
  const activeColor = 'fill-teal-500';
  const inactiveColor = 'fill-gray-600';
  const hoverColor = 'fill-teal-400'; // Optional hover effect

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

        {/* Main Layout: Diagram + Questions */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Circular Diagram */}
          <div className="relative w-full max-w-[400px] lg:max-w-[450px] shrink-0">
            <svg
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              className="w-full h-auto"
            >
              <defs>{/* Define paths for text labels if needed */}</defs>
              {functions.map((func, index) => {
                const startAngle = index * anglePerSegment;
                const endAngle = startAngle + anglePerSegment;
                const isActive = index === activeIndex;
                const segmentPath = describeDonutSegment(
                  center,
                  center,
                  outerRadius,
                  innerRadius,
                  startAngle,
                  endAngle
                );

                // Calculate label position
                const midAngle = startAngle + anglePerSegment / 2;
                const labelPos = polarToCartesian(
                  center,
                  center,
                  labelRadius,
                  midAngle
                );

                return (
                  <g
                    key={func.title}
                    onClick={() => setActiveIndex(index)}
                    className={`cursor-pointer transition-opacity duration-200 group ${
                      !isActive ? 'opacity-70 hover:opacity-100' : ''
                    }`}
                  >
                    <path
                      d={segmentPath}
                      className={`${
                        isActive ? activeColor : inactiveColor
                      } transition-colors duration-200 ${
                        !isActive ? `group-hover:${hoverColor}` : ''
                      }`}
                      stroke="#fff" // White stroke for separation
                      strokeWidth="2"
                    />
                    {/* Text Label - Needs careful positioning */}
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      dy=".3em" // Vertical alignment adjustment
                      textAnchor="middle"
                      className={`text-xs pointer-events-none ${
                        isActive ? 'fill-white font-semibold' : 'fill-white'
                      }`}
                    >
                      {/* Break title if too long - basic example */}
                      {func.title.split('&').map((part, i) => (
                        <tspan
                          key={i}
                          x={labelPos.x}
                          dy={i > 0 ? '1.2em' : '0'}
                        >
                          {part.trim()}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}
              {/* Central Circle */}
              <circle
                cx={center}
                cy={center}
                r={innerRadius * 0.8}
                className="fill-white"
              />
              <text
                x={center}
                y={center}
                textAnchor="middle"
                dy=".3em"
                className="text-xs font-semibold fill-gray-800"
              >
                Your Business
                <tspan x={center} dy="1.2em">
                  Objectives
                </tspan>
              </text>
            </svg>
          </div>

          {/* Questions Display Area */}
          <div className="w-full lg:flex-1">
            {/* Timeline Headers */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-center text-gray-500 font-semibold text-sm md:text-base">
              <div>{topLineText1}</div>
              <div>{topLineText2}</div>
              <div>{topLineText3}</div>
            </div>
            {/* Dashed lines for timeline */}
            <div className="relative h-px bg-gray-300 mb-8">
              {/* You could add markers here if needed */}
            </div>

            {/* Question Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Column 1: Insights */}
              <div className="space-y-3">
                {filteredQuestions.insights.map((q, i) => (
                  <div
                    key={`q1-${i}`}
                    className="bg-white p-3 rounded shadow border border-gray-200 text-sm text-gray-700"
                  >
                    {q.question}
                  </div>
                ))}
                {filteredQuestions.insights.length === 0 && (
                  <p className="text-gray-400 italic text-sm">
                    No specific questions for this section.
                  </p>
                )}
              </div>

              {/* Column 2: Strategize */}
              <div className="space-y-3">
                {filteredQuestions.strategize.map((q, i) => (
                  <div
                    key={`q2-${i}`}
                    className="bg-white p-3 rounded shadow border border-gray-200 text-sm text-gray-700"
                  >
                    {q.question}
                  </div>
                ))}
                {filteredQuestions.strategize.length === 0 && (
                  <p className="text-gray-400 italic text-sm">
                    No specific questions for this section.
                  </p>
                )}
              </div>

              {/* Column 3: Implement */}
              <div className="space-y-3">
                {filteredQuestions.implement.map((q, i) => (
                  <div
                    key={`q3-${i}`}
                    className="bg-white p-3 rounded shadow border border-gray-200 text-sm text-gray-700"
                  >
                    {q.question}
                  </div>
                ))}
                {filteredQuestions.implement.length === 0 && (
                  <p className="text-gray-400 italic text-sm">
                    No specific questions for this section.
                  </p>
                )}
              </div>
            </div>

            {/* Timeline Footers */}
            <div className="grid grid-cols-3 gap-4 mt-8 text-center text-gray-500 text-sm">
              <div>{bottomLineText1}</div>
              <div>{bottomLineText2}</div>
              <div>{bottomLineText3}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoBlockComponent;
