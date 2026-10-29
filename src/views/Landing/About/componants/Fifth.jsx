/**
 * @file Fifth.jsx
 * @description Educational working model section depicting the community's three-step cycle: industry mentorship, peer collaboration, and practical project execution.
 * @architecture Sub-component loaded into the About page (`src/views/Landing/About/index.jsx`). Pure presentational component with custom curved connecting SVG paths on desktop.
 * @agent_note The connecting SVG is hidden on mobile/tablet viewports and rendered from `md` breakpoint upwards. The step cards use clean semantic HTML and tailwind utility classes.
 */

import React from 'react';

/**
 * @component Fifth
 * @description Three-step process flow visualization representing the foundational methodology of The Uniques Community.
 * @returns {JSX.Element} The rendered working model section.
 * @state None.
 * @api None.
 */
const Fifth = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Our Working Model</h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
            At The Uniques, we bridge the gap between theory and practice through a structured learning approach.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28 pointer-events-none">
            <svg
              className="w-full h-auto"
              viewBox="0 0 960 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M50 45 C 200 85, 300 5, 480 45 C 660 85, 760 5, 910 45"
                stroke="#CBD5E1"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 1 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Learn from Industry Experts
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Engage with professionals through workshops and seminars to gain real-world insights and knowledge.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 2 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Peer-to-Peer Learning
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Collaborate with peers across different batches, fostering a community of shared learning and growth.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 3 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Apply Knowledge Practically
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Implement your learning through live projects and real-world applications, bridging the gap between theory and practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fifth;
