import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import UniquesFormation from "@/assets/img/HowItStarted/1.jpg";
import FirstBatch from "@/assets/img/HowItStarted/2.jpg";
import Naveen from "@/assets/img/HowItStarted/3.jpeg";
import Praveen from "@/assets/img/HowItStarted/3-1.jpeg";
import Uniques2 from '@/assets/img/HowItStarted/4.jpeg'
import ICTA from "@/assets/img/HowItStarted/5.jpeg";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const Timeline = ({ data }) => {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 90%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-white  font-sans md:px-10"
            ref={containerRef}
        >
            {/* <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <h2 className="text-lg md:text-4xl font-semibold mb-4 text-black  max-w-4xl">
                    Sparking Success: The Uniques’ Odyssey from Idea to Impact
                </h2>
                <p className="text-neutral-700  text-sm md:text-base max-w-sm">

                </p>
            </div> */}

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-300 p-2" />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-black  ">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="text-4xl mb-4 text-left font-bold text-black ">
                                {item.subtitle}
                            </h3>
                            {item.content}{" "}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-red-500 via-red-300 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

// Example Usage
const dummyData = [
    {
        title: "2022",
        subtitle: "Formation of The Uniques",
        content: (
            <>
                The Uniques was formed as a dedicated community for the Batch of 2021-2025 B.Tech CSE students. It started as a small group of like-minded individuals passionate about technology, innovation, and collaboration. The vision was to create a supportive and engaging space for students to learn, grow, and work on impactful projects together.
                <div className="flex flex-wrap gap-10">
                    <img src={UniquesFormation} alt="Coding journey" className="mt-4 rounded-lg w-[300px]" />
                </div>
            </>
        ),
    },
    {
        title: "2022",
        subtitle: "Selection of First Batch",
        content: (
            <>
                14 students from the Batch of 2021-2025 were carefully selected based on their aptitude and technical skills. These students became the core members of The Uniques, driving the community forward with their expertise, dedication, and enthusiasm for technology.
                <div className="flex flex-wrap gap-10">
                    <img src={FirstBatch} alt="Coding journey" className="mt-4 rounded-lg w-[300px]" />
                </div>
            </>
        ),
    },
    {
        title: "2022",
        subtitle: "Achievements of Uniques 1.0",
        content: (
            <>
                Two talented members of The Uniques 1.0, Naveen and Praveen Jaiswal, secured prestigious positions as Data Repository Officers in the Ministry of Cooperation, India. Their hard work and technical expertise not only brought pride to the community but also inspired future members to strive for excellence.
                <div className="flex flex-wrap gap-10">

                    <img src={Naveen} alt="Coding journey" className="mt-4 rounded-lg w-[300px]" />
                    <img src={Praveen} alt="Coding journey" className="mt-4 rounded-lg w-[300px]" />
                </div>
            </>
        ),
    },
    {
        title: "2023",
        subtitle: "The Uniques 2.0 – Expansion of the Community",
        content: (
            <>
                In January 2023, The Uniques 2.0 batch was formed, selecting 25 students from the Batch of 2022-2026. The selection process was rigorous, evaluating candidates through an aptitude test, technical test, and personal interview (PI) round. This expansion marked a new phase for The Uniques, bringing in fresh talent and ideas to strengthen the community further.
                <div className="flex flex-wrap gap-10">
                    <img src={Uniques2} alt="Coding journey" className="mt-4 rounded-lg w-full md:w-[400px] lg:w-[350px] sm:w-[400px] " />

                </div>
            </>
        ),
    },
    {
        title: "2023",
        subtitle: "International Conference on Technological Advancements 2023",
        content: (
            <>
                Three Uniques 1.0 members—Naveen, Praveen, and Ronit—contributed to the International Conference on Technological Advancements 2023 with their dedication and expertise. Their efforts played a significant role in making the event a success, showcasing innovation and technical excellence.
                <div className="flex flex-wrap gap-10">
                    <img src={ICTA} alt="Coding journey" className="mt-4 rounded-lg w-full md:w-[400px] lg:w-[350px] sm:w-[400px] " />

                </div>
            </>
        ),
    },
    {
        title: "2023",
        subtitle: "International Conference on Technological Advancements 2023",
        content: (
            <>
                Three Uniques 1.0 members—Naveen, Praveen, and Ronit—contributed to the International Conference on Technological Advancements 2023 with their dedication and expertise. Their efforts played a significant role in making the event a success, showcasing innovation and technical excellence.
                <div className="flex flex-wrap gap-10">
                    <img src={ICTA} alt="Coding journey" className="mt-4 rounded-lg w-full md:w-[400px] lg:w-[350px] sm:w-[400px] " />

                </div>
            </>
        ),
    },
];

export default function App() {
    return (
        <Timeline
            title="My Developer Journey"
            description="A timeline of key milestones in my development career."
            data={dummyData}
        />
    );
}
