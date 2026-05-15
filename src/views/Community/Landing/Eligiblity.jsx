import React from 'react';
import SpotlightCard from '@/utils/Card/SpotLightCard';
import profileImg from '@/assets/img/Community/Sample1.png';
import { useThemeContext } from "@/theme/ThemeProvider";

const SevenCardsLayout = () => {
    const { isDarkMode } = useThemeContext();
    return (
        <div className={`transition-colors duration-500 py-12 ${isDarkMode ? 'bg-[#161616]' : 'bg-white'}`}>
            <h2 className="text-center text-5xl font-bold my-24">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Exciting </span>
                <span className="text-[#ca0019]">Perks </span>
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>for You</span>
            </h2>
            <div className="container mx-auto flex items-center justify-center px-4">
                <div className="grid w-full rounded-xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                    <div className="relative flex items-center justify-center">
                        <SpotlightCard spotlightColor={isDarkMode ? "rgba(202, 0, 25, 0.3)" : "rgba(191, 0, 0, 0.50)"}>
                            <span className={`relative text-7xl font-bold z-0 select-none transition-colors duration-300 ${isDarkMode ? 'text-white/10' : 'text-gray-200'}`}>01</span>
                            <div className="relative z-10 w-full rounded-xl h-auto p-4 flex flex-col">
                                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Exclusive Events</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get access to members-only workshops, webinars, and meetups.</p>
                            </div>
                        </SpotlightCard>
                    </div>

                    <div />

                    <div className="relative flex items-center justify-center">
                        <SpotlightCard spotlightColor={isDarkMode ? "rgba(202, 0, 25, 0.3)" : "rgba(191, 0, 0, 0.50)"}>
                            <span className={`relative text-7xl font-bold z-0 select-none transition-colors duration-300 ${isDarkMode ? 'text-white/10' : 'text-gray-200'}`}>02</span>
                            <div className="relative z-10 w-full rounded-xl h-auto p-4 flex flex-col">
                                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Networking</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Connect with industry experts, mentors, and like-minded peers.</p>
                            </div>
                        </SpotlightCard>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <span className="absolute text-[#ca0019] text-8xl right-14 font-bold z-0 select-none opacity-20">03</span>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <SpotlightCard spotlightColor={isDarkMode ? "rgba(202, 0, 25, 0.3)" : "rgba(191, 0, 0, 0.50)"}>
                            <span className={`relative text-7xl font-bold z-0 select-none transition-colors duration-300 ${isDarkMode ? 'text-white/10' : 'text-gray-200'}`}>04</span>
                            <div className="relative z-10 w-full rounded-xl h-auto p-4 flex flex-col">
                                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skill Development</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Participate in hands-on projects and learning opportunities.</p>
                            </div>
                        </SpotlightCard>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <span className="absolute text-[#ca0019] text-8xl left-14 font-bold z-0 select-none opacity-20">05</span>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <SpotlightCard spotlightColor={isDarkMode ? "rgba(202, 0, 25, 0.3)" : "rgba(191, 0, 0, 0.50)"}>
                            <span className={`relative text-7xl font-bold z-0 select-none transition-colors duration-300 ${isDarkMode ? 'text-white/10' : 'text-gray-200'}`}>06</span>
                            <div className="relative z-10 w-full rounded-xl h-auto p-4 flex flex-col">
                                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recognition</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get featured on our platforms and earn rewards for contributions.</p>
                            </div>
                        </SpotlightCard>
                    </div>

                    <div />

                    <div className="relative flex items-center justify-center">
                        <SpotlightCard spotlightColor={isDarkMode ? "rgba(202, 0, 25, 0.3)" : "rgba(191, 0, 0, 0.50)"}>
                            <span className={`relative text-7xl font-bold z-0 select-none transition-colors duration-300 ${isDarkMode ? 'text-white/10' : 'text-gray-200'}`}>07</span>
                            <div className="relative z-10 w-full rounded-xl h-auto p-4 flex flex-col">
                                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Exclusive Merchandise</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Receive branded goodies, T-shirts, and special gifts.</p>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SevenCardsLayout;
