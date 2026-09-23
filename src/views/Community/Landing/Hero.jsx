import React, { useState } from "react";
import "./style.css";
import HeroClip from "@/assets/img/Community/Sample1.png";
import Button from "@/utils/Buttons/Button";
import DoubleQuotes from "@/assets/img/Community/Double.png";
import ApplicationForm from '@/components/ApplicationForm';



const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
// comment

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };
    
    return (
        <div className="relative container mx-auto">
            {/* Hidden SVG clipPath definition */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    <clipPath id="heroClip" clipPathUnits="objectBoundingBox">
                        <path d="M0.704,1 H0.024 C0.0114,1 0.00115,0.9844 0.00115,0.9653 V0.0347 C0.00115,0.0156 0.0114,0 0.024,0 H0.6117 C0.617,0 0.622,0.00358 0.627,0.00998 L0.687,0.0994 C0.691,0.1058 0.697,0.1094 0.704,0.1094 H0.977 C0.989,0.1094 1,0.125 1,0.144 V0.7604 C1,0.7805 0.989,0.794 0.977,0.794 H0.725 C0.709,0.794 0.698,0.817 0.703,0.840 L0.727,0.955 C0.731,0.978 0.719,1 0.704,1 Z" />
                    </clipPath>
                </defs>
            </svg>

            <div className="svg-shaped-div flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-8 md:py-10 lg:py-12">
                <div className="text-content relative z-10 w-full md:w-[54%] lg:w-[52%] xl:w-[50%] md:max-w-2xl lg:max-w-3xl flex flex-col justify-center">
                    <h1
                        className="!text-black w-full pb-4 sm:pb-6 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-[54px] 2xl:text-6xl font-bold tracking-tight"
                        style={{ lineHeight: "1.18" }}
                    >
                        <span className="inline sm:whitespace-nowrap">
                            Discover your <span className="text-[#ca0019]">community,</span>
                        </span>
                        <br className="hidden sm:inline" />{" "}
                        <span className="inline sm:whitespace-nowrap">
                            <span className="text-[#ca0019]">join us</span> and thrive.
                        </span>
                    </h1>

                    <div className="text-gray-800 mt-5 sm:mt-7 pb-5 sm:pb-7 flex items-center gap-3.5 max-w-md">
                        <span className="shrink-0 opacity-75">
                            <img src={DoubleQuotes} alt="quote icon" className="w-10 h-10 md:w-11 md:h-11 object-contain" />
                        </span>
                        <p className="text-sm sm:text-base md:text-[16px] text-gray-700 leading-relaxed font-normal max-w-sm sm:max-w-md">
                            Join the community of unique individuals and learn from the best
                        </p>
                    </div>

                    <div className="pt-2">
                        <Button 
                            onClick={openModal}
                            color="white"
                            bgColor="#ca0019"
                            border={3}
                            borderColor="black"
                            iconColor="black"
                        >
                            Register
                        </Button>
                    </div>
                </div>

                <div className="image-container absolute md:left-[43%] left-0 bottom-[0%] z-0 w-full md:w-[61%] lg:w-[60%] mt-10 md:mt-0 pointer-events-none select-none flex justify-end items-end">
                    <img 
                        className="w-full h-auto object-contain object-bottom" 
                        src={HeroClip} 
                        alt="Community Members" 
                        draggable="false"
                    />
                </div>
            </div>

            <div className="absolute bottom-1 md:bottom-1.5 lg:bottom-2 right-2 md:right-4 lg:right-6 w-[29.6%] hidden md:flex flex-col items-center justify-center text-center z-20 px-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#ca0019] text-center tracking-tight leading-tight mb-2">
                    Be the part of it.
                </h3>
                <Button
                    path="https://chat.whatsapp.com/HYOloogGXKcIkR83DnOjFj"
                    color="white"
                    bgColor="black"
                    border={3}
                    borderColor="black"
                    iconColor="black"
                >
                    <span>Join Community</span>
                </Button>
            </div>
            
            {/* Application Form Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Campus Ambassador Application"
            >
                <ApplicationForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Hero;
