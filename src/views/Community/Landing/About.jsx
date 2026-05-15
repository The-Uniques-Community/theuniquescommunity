import * as React from "react";
import { useThemeContext } from "@/theme/ThemeProvider";

const About = (props) => {
    const { isDarkMode } = useThemeContext();
    return (
        <div className={`transition-colors duration-500 py-24 ${isDarkMode ? 'bg-[#161616]' : 'bg-white'}`}>
            <div className="flex container mx-auto justify-center gap-16 md:flex-nowrap flex-wrap items-center">
                <div className="lg:w-1/2">
                    <div className="lg:ml-auto lg:mx-0 mx-auto">
                        <svg
                            width="100%"
                            height="auto"
                            viewBox="0 0 342 265"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            {...props}
                        >
                            <defs>
                                <clipPath id="aboutClip">
                                    <path
                                        d="M0 56V30C0 23.3726 5.37258 18 12 18H42C48.6274 18 54 23.3726 54 30V37C54 43.6274 59.3726 49 66 49H68C74.6274 49 80 43.6274 80 37V30C80 23.3726 85.3726 18 92 18H275C279.971 18 284 13.9706 284 9C284 4.02944 288.029 0 293 0H330C336.627 0 342 5.37258 342 12V79C342 85.6274 336.627 91 330 91H296C289.373 91 284 96.3726 284 103V167.5C284 169.985 286.015 172 288.5 172C290.985 172 293 169.985 293 167.5V151C293 144.373 298.373 139 305 139H330C336.627 139 342 144.373 342 151V181C342 187.627 336.627 193 330 193H304C297.925 193 293 197.925 293 204C293 210.075 297.925 215 304 215H330C336.627 215 342 220.373 342 227V253C342 259.627 336.627 265 330 265H305C298.373 265 293 259.627 293 253V232.5C293 230.015 290.985 228 288.5 228C286.015 228 284 230.015 284 232.5V253C284 259.627 278.627 265 272 265H92C85.3726 265 80 259.627 80 253V232C80 225.373 74.6274 220 68 220H35C28.3726 220 23 214.627 23 208V173.5C23 167.149 17.8513 162 11.5 162C5.14873 162 0 156.851 0 150.5V103C0 96.3726 5.37258 91 12 91H36.5C42.8513 91 48 85.8513 48 79.5C48 73.1487 42.8513 68 36.5 68H12C5.37258 68 0 62.6274 0 56Z"
                                    />
                                </clipPath>
                            </defs>
                            <image
                                href="https://studymelbourne.vic.gov.au/__data/assets/image/0009/2336490/Ambassadors-3.jpg"
                                width="342"
                                height="265"
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="url(#aboutClip)"
                            />
                        </svg>
                    </div>
                </div>
                <div className="md:w-1/2 p-4">
                    <div className="text-left">
                        <p className="bg-[#ca0019] md:text-left p-4 text-2xl text-white font-bold rounded-tr-3xl rounded-bl-3xl shadow-lg">
                            What is the Criteria for Being an Ambassador?
                        </p>
                        <div className={`mt-8 space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                            <p className="text-sm text-left">
                                <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Minimum One Year Until Graduation:</strong> Applicants should have at least one year remaining until graduation from their undergraduate or graduate program.
                            </p>
                            <p className="text-sm text-left">
                                <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Full-Time Enrollment:</strong> Applicants must be enrolled full-time in an undergraduate or graduate program at a college or university.
                            </p>
                            <p className="text-sm text-left">
                                <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Commitment:</strong> Individuals must commit to the program for a minimum of one year, demonstrating dedication to their role as a Lead.
                            </p>
                            <p className="text-sm text-left">
                                <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Passion for Impact:</strong> Applicants should be passionate about creating a positive impact within their community and fostering growth and collaboration among peers.
                            </p>
                            <p className="text-sm text-left">
                                <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Technical Understanding:</strong> Individuals should possess a foundational understanding of computer programming and/or software engineering concepts.
                            </p>
                            <p className="text-sm text-left">
                                <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Event Planning Experience:</strong> Preference will be given to applicants with prior experience in event planning or leading a team.
                            </p>
                            <p className="text-sm text-left">
                                <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Connection to Local Developer Community:</strong> Applicants should have a connection to the local developer community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
