"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card } from "@mui/material"
import { Users, GraduationCap, UserCheck } from "lucide-react"
import { useThemeContext } from "@/theme/ThemeProvider"

const sections = [
    { title: "Ready? Let's Start!", color: "text-blue-900" },
    {
        title: "Mentors",
        icon: <Users />,
        description: "Connect with experienced professionals who can guide your journey.",
        color: "bg-blue-900 text-white",
    },
    {
        title: "Alumni",
        icon: <GraduationCap />,
        description: "Learn from graduates who've successfully navigated their careers.",
        color: "bg-yellow-400 text-black",
    },
    {
        title: "Student",
        icon: <UserCheck />,
        description: "Connect with current students for insider tips and advice.",
        color: "bg-amber-400 text-black",
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
        <section ref={containerRef} className="relative py-32 px-4 overflow-hidden bg-white dark:bg-[#161616]">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 dark:text-white">Our Flight to <span className="text-[#ca0019]">Excellence</span></h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Every member of our community contributes to the journey. See how we support each other at every stage.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sections.slice(1).map((item, idx) => (
                        <div key={idx} className="flight-card">
                            <Card className="h-full group hover:translate-y-[-10px] transition-transform duration-500 bg-white dark:bg-[#424D53]/20 border-none shadow-xl rounded-3xl overflow-hidden backdrop-blur-sm">
                                <div className={`h-2 w-full ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-yellow-500' : 'bg-amber-500'}`} />
                                <div className="p-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color} shadow-lg group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 dark:text-white">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                                    
                                    <button className="mt-8 flex items-center gap-2 text-[#ca0019] font-bold group/btn">
                                        Learn More 
                                        <div className="w-6 h-6 rounded-full border border-[#ca0019] flex items-center justify-center group-hover/btn:bg-[#ca0019] group-hover/btn:text-white transition-all">
                                            →
                                        </div>
                                    </button>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlightPathAnimation;
