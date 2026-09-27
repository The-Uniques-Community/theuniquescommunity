import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useThemeContext } from "@/theme/ThemeProvider";

// Realistic student & ambassador portrait photos with guaranteed fallbacks
const testimonials = [
    {
        id: 1,
        quote:
            "Being an ambassador has been an incredible journey! The opportunity to organize events and lead a community of like-minded individuals has helped me grow both personally and professionally. The mentorship from regional leads has been invaluable in shaping my leadership skills.",
        name: "Vasu Malhotra",
        title: "Lead Ambassador",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80",
    },
    {
        id: 2,
        quote:
            "The Uniques Community has provided me with a platform to connect with developers and industry experts. Hosting events and engaging with my peers has enhanced my communication skills, and I love being part of a network that fosters innovation and collaboration.",
        name: "Sarah Johnson",
        title: "Community Organizer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    },
    {
        id: 3,
        quote:
            "As an ambassador, I've learned the importance of teamwork and event planning. Organizing workshops and reporting activities have strengthened my ability to lead and manage a core team effectively. The experience has been nothing short of rewarding!",
        name: "David Williams",
        title: "Technical Lead",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    },
    {
        id: 4,
        quote:
            "One of the best aspects of being an ambassador is the chance to make a real impact. Whether it's mentoring aspiring developers or planning tech events, I've gained valuable experience that will stay with me throughout my career.",
        name: "Emily Chen",
        title: "Event Coordinator",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80",
    },
    {
        id: 5,
        quote:
            "The Uniques Community has helped me develop leadership skills while allowing me to engage with the local developer community. The experience of participating in campaigns and networking with professionals has been incredibly beneficial for my career.",
        name: "Robert Miller",
        title: "Program Ambassador",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    },
];

// Fallback avatar component with initials and brand styling to prevent broken image icons
function AvatarImage({ src, name, className = "" }) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
        setHasError(false);
    }, [src]);

    const initials = name
        ? name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        : "TU";

    if (hasError || !imgSrc) {
        return (
            <div className={`w-full h-full flex items-center justify-center font-bold text-white bg-gradient-to-tr from-[#8B0000] to-[#ca0019] text-sm select-none ${className}`}>
                {initials}
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={name}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover ${className}`}
            loading="lazy"
        />
    );
}

export default function TestimonialCarousel() {
    const { isDarkMode } = useThemeContext();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const touchStartX = useRef(null);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
            setTimeout(() => setIsAnimating(false), 400);
        }, 200);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            setTimeout(() => setIsAnimating(false), 400);
        }, 200);
    };

    // Touch swipe support for mobile
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const diffX = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 40) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        touchStartX.current = null;
    };

    // Auto-rotate slides every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);

        return () => clearInterval(interval);
    }, [activeIndex, isAnimating]);

    // Calculate indices for visible cards
    const getVisibleIndices = () => {
        const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
        const nextIndex = (activeIndex + 1) % testimonials.length;
        return { prevIndex, activeIndex, nextIndex };
    };

    const { prevIndex, nextIndex } = getVisibleIndices();

    return (
        <div className={`transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
            <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 max-w-6xl">
                <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-14 md:mb-16 tracking-tight">
                    <span className={isDarkMode ? "text-white" : "text-gray-900"}>Benefits </span>
                    <span className="text-gray-400">You will </span>
                    <span className="text-[#ca0019]">Get</span>
                </h2>

                <div 
                    className="relative h-[380px] sm:h-[440px] md:h-[480px] select-none"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Carousel Track */}
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden sm:overflow-visible">
                        {/* Previous Card - Hidden on extra-small mobile to prevent clutter, visible on tablet+ */}
                        <div
                            className="hidden sm:block absolute top-1/2 left-0 sm:w-[260px] md:w-[320px] lg:w-[360px] transform-gpu transition-all duration-700 ease-out z-10 opacity-50 hover:opacity-80 cursor-pointer"
                            style={{
                                transform: `translateY(-50%) translateX(${isAnimating ? "-5%" : "2%"}) rotate(-5deg) perspective(1000px) rotateY(10deg)`,
                                transformOrigin: "center right",
                            }}
                            onClick={prevSlide}
                        >
                            <TestimonialCard testimonial={testimonials[prevIndex]} variant="light" isDarkMode={isDarkMode} />
                        </div>

                        {/* Active Card - Cleanly centered and responsive on all devices */}
                        <div
                            className="absolute top-1/2 left-1/2 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] -translate-x-1/2 -translate-y-1/2 transform-gpu transition-all duration-700 ease-out z-20 px-2 sm:px-0"
                            style={{
                                transform: `translateY(-50%) translateX(-50%) ${isAnimating ? "scale(0.96)" : "scale(1)"}`,
                            }}
                        >
                            <TestimonialCard testimonial={testimonials[activeIndex]} variant="highlight" isDarkMode={isDarkMode} />
                        </div>

                        {/* Next Card - Hidden on extra-small mobile, visible on tablet+ */}
                        <div
                            className="hidden sm:block absolute top-1/2 right-0 sm:w-[260px] md:w-[320px] lg:w-[360px] transform-gpu transition-all duration-700 ease-out z-10 opacity-50 hover:opacity-80 cursor-pointer"
                            style={{
                                transform: `translateY(-50%) translateX(${isAnimating ? "5%" : "-2%"}) rotate(5deg) perspective(1000px) rotateY(-10deg)`,
                                transformOrigin: "center left",
                            }}
                            onClick={nextSlide}
                        >
                            <TestimonialCard testimonial={testimonials[nextIndex]} variant="light" isDarkMode={isDarkMode} />
                        </div>
                    </div>

                    {/* Curved Navigation Line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 sm:w-64 h-12 sm:h-14">
                        <svg width="100%" height="100%" viewBox="0 0 256 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Curved background line */}
                            <path
                                d="M16 24C48 8 96 0 128 0C160 0 208 8 240 24"
                                stroke={isDarkMode ? "#374151" : "#E5E7EB"}
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            {/* Active position indicator dots */}
                            {testimonials.map((_, index) => {
                                const percentage = index / (testimonials.length - 1);
                                const cx = 16 + percentage * 224;
                                const cy = 24 - Math.sin(Math.PI * percentage) * 24;
                                const isActive = index === activeIndex;

                                return (
                                    <circle
                                        key={index}
                                        cx={cx}
                                        cy={cy}
                                        r={isActive ? 4.5 : 3}
                                        fill={isActive ? "#ca0019" : isDarkMode ? "#1f2937" : "white"}
                                        stroke={isActive ? "#ca0019" : isDarkMode ? "#4b5563" : "#D1D5DB"}
                                        strokeWidth="2"
                                        className="transition-all duration-500 cursor-pointer"
                                        onClick={() => setActiveIndex(index)}
                                    />
                                );
                            })}
                        </svg>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
                    <button
                        onClick={prevSlide}
                        className={`w-10 h-10 sm:w-11 sm:h-11 flex justify-center items-center rounded-full transition-all duration-300 shadow-md ${
                            isDarkMode 
                                ? 'bg-[#18181b] border border-neutral-700 text-gray-200 hover:bg-neutral-800' 
                                : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        disabled={isAnimating}
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 sm:w-11 sm:h-11 flex justify-center items-center rounded-full bg-[#ca0019] hover:bg-[#b00016] text-white transition-all duration-300 shadow-md shadow-red-600/30"
                        disabled={isAnimating}
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function TestimonialCard({ testimonial, variant = "light", isDarkMode = false }) {
    const isHighlight = variant === "highlight";

    return (
        <div
            className={`rounded-2.5xl sm:rounded-3xl p-5 sm:p-6 md:p-7 transition-all duration-500 h-full flex flex-col justify-between ${
                isHighlight
                    ? "bg-[#ca0019] text-white ring-2 ring-red-500"
                    : isDarkMode 
                        ? "bg-[#141414] text-gray-200 border border-neutral-800 shadow-xl"
                        : "bg-white text-gray-800 border border-gray-100 shadow-lg"
            }`}
            style={{
                boxShadow: isHighlight
                    ? "0 14px 30px -5px rgba(202, 0, 25, 0.5), 0 8px 12px -6px rgba(202, 0, 25, 0.2)"
                    : isDarkMode 
                        ? "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
                        : "0 10px 20px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
            }}
        >
            <div className="relative flex-grow flex flex-col justify-between">
                <div>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 line-clamp-5 sm:line-clamp-none font-normal">
                        "{testimonial.quote}"
                    </p>
                </div>

                <div className="flex items-center mt-3 pt-3 border-t border-white/10">
                    <div className="flex-shrink-0 mr-3.5">
                        <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden ring-2 ring-white/20 shadow-md">
                            <AvatarImage
                                src={testimonial.avatar}
                                name={testimonial.name}
                            />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-base sm:text-lg leading-tight truncate">
                            {testimonial.name}
                        </h4>
                        <p className={`text-xs sm:text-sm font-medium mt-0.5 truncate ${
                            isHighlight ? "text-red-100" : isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                            {testimonial.title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
