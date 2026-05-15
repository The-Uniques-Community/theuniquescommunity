import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useThemeContext } from "@/theme/ThemeProvider";
import ONE from "@/assets/img/HowItStarted/1.jpg";
import TWO from "@/assets/img/HowItStarted/2.jpg";
import THREE from "@/assets/img/HowItStarted/3.jpg";
import FOUR from "@/assets/img/HowItStarted/4.jpg";
import FIVE from '@/assets/img/HowItStarted/5.jpg';
import SIX from "@/assets/img/HowItStarted/6.jpg";
import SEVEN from "@/assets/img/HowItStarted/7.jpg";
import EIGHT from "@/assets/img/HowItStarted/8.jpg";
import NINE from "@/assets/img/HowItStarted/9.jpg";
import TEN from "@/assets/img/HowItStarted/10.jpg";
import ELEVEN from "@/assets/img/HowItStarted/11.jpg";
import TWELVE from "@/assets/img/HowItStarted/12.jpg";
import THIRTEEN from "@/assets/img/HowItStarted/13.jpg";
import FOURTEEN from "@/assets/img/HowItStarted/14.jpg";
import FIFTEEN from "@/assets/img/HowItStarted/15.jpg";
import SIXTEEN from "@/assets/img/HowItStarted/16.jpg";
import SEVENTEEN from "@/assets/img/HowItStarted/17.jpg";
import EIGHTEEN from "@/assets/img/HowItStarted/18.jpg";
import NINETEEN from "@/assets/img/HowItStarted/19.jpg";
import TWENTY from "@/assets/img/HowItStarted/20.jpg";
import TWENTYONE from "@/assets/img/HowItStarted/21.jpg";
import TWENTYTWO from "@/assets/img/HowItStarted/22.jpg";
import TWENTYTHREE from "@/assets/img/HowItStarted/23.jpg";
import TWENTYFOUR from "@/assets/img/HowItStarted/24.jpg";
import TWENTYFIVE from "@/assets/img/HowItStarted/25.jpg";
import TWENTYSIX from "@/assets/img/HowItStarted/26.jpg";
import TWENTYSEVEN from "@/assets/img/HowItStarted/27.jpg";
import TWENTYEIGHT from "@/assets/img/HowItStarted/28.jpg";
import TWENTYNINE from "@/assets/img/HowItStarted/29.jpg";
import THIRTY from "@/assets/img/HowItStarted/30.jpg";
import THIRTYONE from "@/assets/img/HowItStarted/31.jpg";
import THIRTYTWO from "@/assets/img/HowItStarted/32.jpg";
import THIRTYTHREE from "@/assets/img/HowItStarted/33.jpg";
import THIRTYFOUR from "@/assets/img/HowItStarted/34.jpg";
import THIRTYFIVE from "@/assets/img/HowItStarted/35.jpg";
import THIRTYSIX from "@/assets/img/HowItStarted/36.jpg";
import THIRTYSEVEN from "@/assets/img/HowItStarted/37.jpg";
import THIRTYEIGHT from "@/assets/img/HowItStarted/38.jpg";
import THIRTYNINE from "@/assets/img/HowItStarted/39.jpg";
import FORTY from "@/assets/img/HowItStarted/40.jpg";
import FORTYONE from "@/assets/img/HowItStarted/41.jpg";
import FORTYTWO from "@/assets/img/HowItStarted/42.jpg";
import FORTYTHREE from "@/assets/img/HowItStarted/43.jpg";
import FORTYFOUR from "@/assets/img/HowItStarted/44.jpg";
import FORTYFIVE from "@/assets/img/HowItStarted/45.jpg";
import FORTYSIX from "@/assets/img/HowItStarted/46.jpg";
import FORTYSEVEN from "@/assets/img/HowItStarted/47.jpg";
import FORTYEIGHT from "@/assets/img/HowItStarted/48.jpg";
import FORTYNINE from "@/assets/img/HowItStarted/49.jpg";
import FIFTY from "@/assets/img/HowItStarted/50.jpg";
import FIFTYONE from "@/assets/img/HowItStarted/51.jpg";
import FIFTYTWO from "@/assets/img/HowItStarted/52.jpg";
import FIFTYTHREE from "@/assets/img/HowItStarted/53.jpg";
import FIFTYFOUR from "@/assets/img/HowItStarted/54.jpg";
import FIFTYFIVE from "@/assets/img/HowItStarted/55.jpg";
import FIFTYSIX from "@/assets/img/HowItStarted/56.jpg";
import FIFTYSEVEN from "@/assets/img/HowItStarted/57.jpg";
import FIFTYEIGHT from "@/assets/img/HowItStarted/58.jpg";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const Timeline = ({ data, title, description }) => {
    const containerRef = useRef(null);
    const { isDarkMode } = useThemeContext();

    return (
        <div
            className="w-full bg-slate-50 dark:bg-[#161616] transition-colors duration-500 font-sans md:px-10 py-20 overflow-hidden"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-8 lg:px-10 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
                >
                    {title || "Sparking Success: The Uniques' Odyssey"}
                </motion.h2>
                {description && (
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                        {description}
                    </motion.p>
                )}
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Central Timeline Line (Desktop) */}
                <div className="absolute left-[21px] md:left-1/2 md:-ml-[1.5px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#ca0019] via-[#ca0019]/20 to-transparent dark:via-[#ca0019]/40" />

                {data.map((item, index) => (
                    <div key={index} className="relative mb-24 md:mb-40 group">
                        {/* Dot */}
                        <div className="absolute left-0 md:left-1/2 md:-ml-4 top-0 z-10 w-11 h-11 rounded-full bg-white dark:bg-[#161616] border-4 border-[#ca0019] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                           <div className="w-3 h-3 rounded-full bg-[#ca0019] animate-pulse" />
                        </div>

                        <div className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            {/* Year/Title (Sticky-ish on mobile, side on desktop) */}
                            <div className="w-full md:w-1/2 px-12 md:px-16 pt-1">
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                >
                                    <span className="text-[#ca0019] font-black text-4xl md:text-7xl mb-2 block opacity-30 group-hover:opacity-100 transition-opacity">
                                        {item.title}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                        {item.subtitle}
                                    </h3>
                                </motion.div>
                            </div>

                            {/* Content Card */}
                            <div className="w-full md:w-1/2 px-12 md:px-16 mt-6 md:mt-0">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#424D53]/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                        {item.content}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Complete dummy data using all images
const timelineData = [
    {
        title: "2021",
        subtitle: "Formation of The Uniques",
        content: (
            <>
                <p className="mb-4">The Uniques was formed as a dedicated community for the Batch of 2021-2025 B.Tech CSE students. It started as a small group of like-minded individuals passionate about technology, innovation, and collaboration. The vision was to create a supportive and engaging space for students to learn, grow, and work on impactful projects together.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={ONE} alt="Formation of The Uniques" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWO} alt="Early team members" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2022 Q1",
        subtitle: "Selection of First Batch",
        content: (
            <>
                <p className="mb-4">14 students from the Batch of 2021-2025 were carefully selected based on their aptitude and technical skills. These students became the core members of The Uniques, driving the community forward with their expertise, dedication, and enthusiasm for technology.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THREE} alt="First batch selection" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FOUR} alt="Selection process" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2022 Q2",
        subtitle: "First Hackathon Success",
        content: (
            <>
                <p className="mb-4">The Uniques organized their first internal hackathon, bringing together talented coders and creators. The event was a tremendous success with innovative projects ranging from AI applications to sustainability solutions.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIVE} alt="Hackathon participants" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={SIX} alt="Project presentations" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2022 Q3",
        subtitle: "Industry Project Collaborations",
        content: (
            <>
                <p className="mb-4">The Uniques began collaborating with local businesses to solve real-world problems. These projects gave members practical experience and established the community's reputation for delivering high-quality technical solutions.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={SEVEN} alt="Industry collaboration" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={EIGHT} alt="Project meeting" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <img src={NINE} alt="Client presentation" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                </div>
            </>
        ),
    },
    {
        title: "2022 Q4",
        subtitle: "Achievement Recognition",
        content: (
            <>
                <p className="mb-4">Two talented members of The Uniques 1.0, Naveen and Praveen Jaiswal, secured prestigious positions as Data Repository Officers in the Ministry of Cooperation, India. Their hard work and technical expertise brought pride to the community and inspired future members.</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TEN} alt="Achievement ceremony" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={ELEVEN} alt="Award winners" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2023 Q1",
        subtitle: "The Uniques 2.0 – Expansion",
        content: (
            <>
                <p className="mb-4">In January 2023, The Uniques 2.0 batch was formed, selecting 25 students from the Batch of 2022-2026. The selection process was rigorous, evaluating candidates through an aptitude test, technical test, and personal interview (PI) round.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWELVE} alt="New batch selection" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTEEN} alt="The Uniques 2.0 team" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2023 Q2",
        subtitle: "Tech Conference Participation",
        content: (
            <>
                <p className="mb-4">Three Uniques 1.0 members—Naveen, Praveen, and Ronit—contributed to the International Conference on Technological Advancements 2023. Their efforts played a significant role in making the event a success, showcasing innovation and technical excellence.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FOURTEEN} alt="Conference setup" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all md:col-span-2">
                        <img src={FIFTEEN} alt="Conference presentation" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2023 Q3",
        subtitle: "Community Workshop Series",
        content: (
            <>
                <p className="mb-4">The Uniques launched a series of technical workshops open to all students. These sessions covered topics from web development to artificial intelligence, supporting knowledge sharing and skill development across the campus.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={SIXTEEN} alt="Workshop instruction" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={SEVENTEEN} alt="Workshop participants" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <img src={EIGHTEEN} alt="Hands-on coding session" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                </div>
            </>
        ),
    },
    {
        title: "2023 Q4",
        subtitle: "Launching The Uniques 3.0",
        content: (
            <>
                <p className="mb-4">The Uniques continued its growth with the launch of The Uniques 3.0, bringing in 30 talented students from the newest batch. The selection process was even more competitive, reflecting the community's growing reputation and impact on campus.</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={NINETEEN} alt="3.0 selection process" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWENTY} alt="New members orientation" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2024 Q1",
        subtitle: "National Hackathon Victory",
        content: (
            <>
                <p className="mb-4">A team from The Uniques won first place at a prestigious national hackathon. Their project, focusing on sustainable urban development using AI, received recognition from industry experts and demonstrated the technical excellence fostered within the community.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWENTYONE} alt="Hackathon team" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWENTYTWO} alt="Winner announcement" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <img src={TWENTYTHREE} alt="Award ceremony" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                </div>
            </>
        ),
    },
    {
        title: "2024 Q2",
        subtitle: "Corporate Partnership Program",
        content: (
            <>
                <p className="mb-4">The Uniques established formal partnerships with five tech companies, creating internship pipelines and project collaboration opportunities. These partnerships enhanced the professional development of members and strengthened the community's industry connections.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWENTYFOUR} alt="Partnership signing" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWENTYFIVE} alt="Corporate meeting" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWENTYSIX} alt="Industry visit" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2024 Q3",
        subtitle: "Research Publications",
        content: (
            <>
                <p className="mb-4">Several research papers authored by The Uniques members were published in international journals. These publications covered topics in machine learning, cybersecurity, and sustainable computing, establishing the community's academic credibility.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWENTYSEVEN} alt="Research presentation" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWENTYEIGHT} alt="Publication announcement" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2024 Q4",
        subtitle: "Alumni Network Launch",
        content: (
            <>
                <p className="mb-4">With the first batch of The Uniques approaching graduation, an alumni network was established to maintain connections and continue the mentorship cycle. This network ensures the community's knowledge and values are preserved and passed on to future generations.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={TWENTYNINE} alt="Alumni network launch" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTY} alt="Alumni meetup" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2025 Q1",
        subtitle: "International Tech Exchange Program",
        content: (
            <>
                <p className="mb-4">The Uniques initiated an international tech exchange program with universities in Singapore and Germany. This program provided members with global exposure and the opportunity to collaborate on cross-cultural projects addressing worldwide challenges.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTYONE} alt="International delegates" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all md:col-span-2">
                        <img src={THIRTYTWO} alt="Exchange program kickoff" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2025 Q2",
        subtitle: "Open Source Contribution Initiative",
        content: (
            <>
                <p className="mb-4">The Uniques launched a structured program to support members in contributing to major open-source projects. This initiative enhanced their technical skills and visibility in the global developer community while giving back to projects they relied on.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTYTHREE} alt="Open source workshop" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTYFOUR} alt="Contribution statistics" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2025 Q3",
        subtitle: "Tech for Social Good Hackathon",
        content: (
            <>
                <p className="mb-4">The Uniques organized a large-scale hackathon focused on technology solutions for social challenges. The event attracted participants from multiple universities and resulted in several projects that were adopted by NGOs for implementation.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTYFIVE} alt="Social good hackathon" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTYSIX} alt="Project demos" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTYSEVEN} alt="NGO partnerships" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2025 Q4",
        subtitle: "Celebrating 100 Industry Placements",
        content: (
            <>
                <p className="mb-4">The Uniques celebrated a significant milestone: 100 members placed in top tech companies, including Microsoft, Google, and Amazon. This achievement highlighted the community's role in preparing students for successful careers in the technology industry.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTYEIGHT} alt="Placement celebration" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={THIRTYNINE} alt="Alumni in industry" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2026 Q1",
        subtitle: "Campus Innovation Lab",
        content: (
            <>
                <p className="mb-4">The Uniques established a dedicated innovation lab on campus with support from university administration and corporate sponsors. The lab provides specialized equipment and mentorship for members to develop cutting-edge projects and startups.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FORTY} alt="Innovation lab inauguration" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all md:col-span-2">
                        <img src={FORTYONE} alt="Lab facilities" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2026 Q2",
        subtitle: "The Uniques 4.0 Launch",
        content: (
            <>
                <p className="mb-4">The community continued its tradition of growth and renewal with The Uniques 4.0, selecting 40 exceptional students from the newest batch. The expanded intake reflected the community's growing capacity to mentor and develop new talent.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FORTYTWO} alt="4.0 selection process" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FORTYTHREE} alt="New batch orientation" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2026 Q3",
        subtitle: "First Member-Founded Startup Acquisition",
        content: (
            <>
                <p className="mb-4">A startup founded by early Uniques members was acquired by a major tech company, marking a significant milestone for the community. The success story inspired current members and demonstrated the entrepreneurial potential within The Uniques.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FORTYFOUR} alt="Acquisition announcement" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FORTYFIVE} alt="Founders celebration" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2026 Q4",
        subtitle: "5-Year Anniversary Celebration",
        content: (
            <>
                <p className="mb-4">The Uniques celebrated five years of impact with a grand event that brought together current members, alumni, faculty, and industry partners. The celebration included an exhibition of projects, panel discussions, and recognition of key contributors to the community's success.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FORTYSIX} alt="Anniversary celebration" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FORTYSEVEN} alt="Project exhibition" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FORTYEIGHT} alt="Recognition ceremony" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2027 Q1",
        subtitle: "Educational Technology Initiative",
        content: (
            <>
                <p className="mb-4">The Uniques launched an educational technology initiative to develop digital tools for underserved schools. This project combined technical expertise with social impact, creating accessible learning resources for students without adequate technological access.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FORTYNINE} alt="EdTech development" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIFTY} alt="School implementation" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2027 Q2",
        subtitle: "Regional Tech Hub Status",
        content: (
            <>
                <p className="mb-4">The university recognized The Uniques as an official Regional Technology Hub, providing dedicated funding and resources. This status formalized the community's role in driving technological innovation and education in the region.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIFTYONE} alt="Hub designation ceremony" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIFTYTWO} alt="Regional impact meeting" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2027 Q3",
        subtitle: "Global Tech Conference Hosting",
        content: (
            <>
                <p className="mb-4">The Uniques successfully hosted an international technology conference, welcoming speakers and attendees from around the world. The event highlighted emerging technologies and provided members with unparalleled networking opportunities.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIFTYTHREE} alt="Conference opening" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIFTYFOUR} alt="International speakers" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIFTYFIVE} alt="Panel discussion" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "2027 Q4",
        subtitle: "Looking to the Future",
        content: (
            <>
                <p className="mb-4">As The Uniques approaches its seventh year, the community continues to evolve while staying true to its founding principles of innovation, collaboration, and excellence. With an expanding network of alumni, industry partnerships, and academic achievements, The Uniques is positioned for even greater impact in the years ahead.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIFTYSIX} alt="Strategic planning" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIFTYSEVEN} alt="Future vision workshop" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                        <img src={FIFTYEIGHT} alt="Community growth" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </>
        ),
    },
];

export default function TimelineView() {
    return (
        <Timeline
            title="Sparking Success: The Uniques' Odyssey from Idea to Impact"
            description="Follow the journey of The Uniques community from its founding vision to becoming a transformative force in technical education and innovation."
            data={timelineData}
        />
    );
}
