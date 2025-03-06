import React from "react";
import "./style.css";
import HeroClip from "@/assets/img/Community/Sample1.png";
import Button from "@/utils/Buttons/Button";

const Hero = () => {
    return (
        <div className="relative container  mx-auto">
            {/* Hidden SVG clipPath definition */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    <clipPath id="heroClip" clipPathUnits="objectBoundingBox">
                        <path d="M0.704,1 H0.024 C0.0114,1 0.00115,0.9844 0.00115,0.9653 V0.0347 C0.00115,0.0156 0.0114,0 0.024,0 H0.6117 C0.617,0 0.622,0.00358 0.627,0.00998 L0.687,0.0994 C0.691,0.1058 0.697,0.1094 0.704,0.1094 H0.977 C0.989,0.1094 1,0.125 1,0.144 V0.7604 C1,0.7805 0.989,0.794 0.977,0.794 H0.725 C0.709,0.794 0.698,0.817 0.703,0.840 L0.727,0.955 C0.731,0.978 0.719,1 0.704,1 Z" />
                    </clipPath>
                </defs>
            </svg>

            <div className="svg-shaped-div flex flex-col md:flex-row items-center justify-between p-6">
                <div className="text-content z-0 p-5">
                    <h1 className="text-black max-w-5xl w-full pt-6 pb-6 md:pt-32 md:text-6xl text-2xl font-semibold">
                        Connecting you to the community you love
                    </h1>
                    <p className="text-black py-5 text-lg max-w-lg">
                        Join the community of unique individuals and learn from the best
                    </p>
                    <Button className="z-[999]"
                        path="/register"
                        color="white"
                        bgColor="#ca0019"
                        border={4}
                        borderColor="#ca0019"
                        iconColor="black"
                    >
                        <span>Register</span>
                    </Button>
                </div>
                <div className="image-container absolute left-[50%] bottom-[10%] z-[999] w-full md:w-3/6 mt-10 md:mt-0">
                    <img className="w-full z-0 h-auto" src={HeroClip} alt="Clipped Image" />
                </div>
            </div>
            <div className="absolute bottom-5 right-14 flex flex-col items-end">
                <h3 className="max-w-xl text-4xl font-semibold text-[#ca0019] text-right py-5">Be the part of it.</h3>
                <Button
                    className="pt-10"
                    path="/register"
                    color="white"
                    bgColor="black"
                    border={4}
                    borderColor="black"
                    iconColor="black"
                >
                    <span>Join Community</span>
                </Button>
            </div>
        </div>
    );
};

export default Hero;
