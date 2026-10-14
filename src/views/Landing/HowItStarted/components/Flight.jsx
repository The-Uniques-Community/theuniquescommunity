"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, GraduationCap, UserCheck } from "lucide-react"

const sections = [
    { title: "Ready? Let's Start!", color: "text-blue-900" },
    {
        title: "Mentors",
        icon: <Users className="w-6 h-6" />,
        description: "Connect with experienced professionals who can guide your journey.",
        color: "bg-blue-900 text-white",
        accent: "bg-blue-600",
        hoverBorder: "hover:border-blue-500/50 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)]",
    },
    {
        title: "Alumni",
        icon: <GraduationCap className="w-6 h-6" />,
        description: "Learn from graduates who've successfully navigated their careers.",
        color: "bg-yellow-400 text-black",
        accent: "bg-yellow-500",
        hoverBorder: "hover:border-yellow-500/50 hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.25)]",
    },
    {
        title: "Student",
        icon: <UserCheck className="w-6 h-6" />,
        description: "Connect with current students for insider tips and advice.",
        color: "bg-amber-400 text-black",
        accent: "bg-amber-500",
        hoverBorder: "hover:border-amber-500/50 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)]",
    },
]

const FlightPathAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Card entrance animations
            gsap.utils.toArray(".flight-card").forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                    duration: 0.8,
                    delay: i * 0.1
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-20 sm:py-28 px-4 overflow-hidden bg-white dark:bg-[#161616]">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-14 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 dark:text-white">Our Flight to <span className="text-[#ca0019]">Excellence</span></h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">Every member of our community contributes to the journey. See how we support each other at every stage.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {sections.slice(1).map((item, idx) => (
                        <div key={idx} className="flight-card h-full">
                            <div 
                                className={`h-full group relative bg-white dark:bg-[#1e1e1e] border border-gray-200/80 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2.5 transition-all duration-500 ease-out cursor-pointer will-change-transform ${item.hoverBorder}`}
                            >
                                <div className={`h-1.5 group-hover:h-2 w-full transition-all duration-500 ease-out ${item.accent}`} />
                                <div className="p-6 sm:p-7 flex flex-col justify-between">
                                    <div>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.color} shadow-sm group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 ease-out`}>
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold mb-2.5 text-gray-900 dark:text-white group-hover:text-[#ca0019] transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlightPathAnimation;
