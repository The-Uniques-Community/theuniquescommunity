import React from 'react';
// Replace with your actual profile image import (or a URL).
import profileImg from '@/assets/img/Community/Sample1.png';

// Simple gear icon (Tailwind Heroicons). Feel free to replace with any icon you prefer.
const GearIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 text-red-500"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 6.75V4.5m-2.25 6.75H4.5m14.25 0h2.25m-2.25 0a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0zM12 9.75v2.25l1.5 1.5"
        />
    </svg>
);

const SevenCardsLayout = () => {
    return (
        <div className=" container mx-auto flex items-center justify-center bg-white">
            {/* 
        3x3 grid:
          - Row 1: Card #1 (col 1), empty (col 2), Card #2 (col 3)
          - Row 2: Card #3 (col 1), Card #4 (center, col 2), Card #5 (col 3)
          - Row 3: Card #6 (col 1), empty (col 2), Card #7 (col 3)
      */}
            <div className="grid w-full rounded-xl grid-cols-3 grid-rows-3 gap-8">
                {/* Card #1 */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute text-gray-200 text-7xl font-bold z-0 select-none">
                        01
                    </span>
                    <div className="relative z-10 w-full rounded-xl h-56 bg-red-600 p-4   flex flex-col">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
                            <GearIcon />
                        </div>
                        <h3 className="text-white font-bold text-lg">Heading</h3>
                        <p className="text-white text-sm mt-1">Text should be here.</p>
                    </div>
                </div>

                {/* Empty cell */}
                <div />

                {/* Card #2 */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute text-gray-200 text-7xl font-bold z-0 select-none">
                        02
                    </span>
                    <div className="relative z-10 w-full rounded-xl h-56 bg-red-600 p-4   flex flex-col">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
                            <GearIcon />
                        </div>
                        <h3 className="text-white font-bold text-lg">Heading</h3>
                        <p className="text-white text-sm mt-1">Text should be here.</p>
                    </div>
                </div>

                {/* Card #3 */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute text-gray-200 text-8xl -right-14 font-bold z-0 select-none">
                        03
                    </span>
                    {/* <div className="relative z-10 w-full rounded-xl h-56 bg-red-600 p-4   flex flex-col">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
                            <GearIcon />
                        </div>
                        <h3 className="text-white font-bold text-lg">Heading</h3>
                        <p className="text-white text-sm mt-1">Text should be here.</p>
                    </div> */}
                </div>

                {/* Card #4 (Center) - With Profile Image */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute text-gray-200 text-7xl font-bold z-0 select-none">
                        04
                    </span>
                    <div className="relative z-10 w-full rounded-xl h-56 bg-red-600 p-4   flex flex-col items-center justify-center">
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="w-20 h-20 object-cover rounded-full mb-2"
                        />
                        <h3 className="text-white font-bold text-lg">Heading</h3>
                        <p className="text-white text-sm mt-1 text-center">
                            Text should be here.
                        </p>
                    </div>
                </div>

                {/* Card #5 */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute text-gray-200 text-8xl -left-14 font-bold z-0 select-none">
                        05
                    </span>
                    {/* <div className="relative z-10 w-full rounded-xl h-56 bg-red-600 p-4   flex flex-col">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
                            <GearIcon />
                        </div>
                        <h3 className="text-white font-bold text-lg">Heading</h3>
                        <p className="text-white text-sm mt-1">Text should be here.</p>
                    </div> */}
                </div>

                {/* Card #6 */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute text-gray-200 text-7xl font-bold z-0 select-none">
                        06
                    </span>
                    <div className="relative z-10 w-full rounded-xl h-56 bg-red-600 p-4   flex flex-col">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
                            <GearIcon />
                        </div>
                        <h3 className="text-white font-bold text-lg">Heading</h3>
                        <p className="text-white text-sm mt-1">Text should be here.</p>
                    </div>
                </div>

                {/* Empty cell */}
                <div />

                {/* Card #7 */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute text-gray-200 text-7xl font-bold z-0 select-none">
                        07
                    </span>
                    <div className="relative z-10 w-full rounded-xl h-56 bg-red-600 p-4   flex flex-col">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
                            <GearIcon />
                        </div>
                        <h3 className="text-white font-bold text-lg">Heading</h3>
                        <p className="text-white text-sm mt-1">Text should be here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SevenCardsLayout;
