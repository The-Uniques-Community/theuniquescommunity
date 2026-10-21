import React, { useEffect, useRef, useState } from 'react';
import { Users, Lightbulb, BarChart, Calendar } from 'lucide-react';
import { getStoredStats, fetchStats } from '@/utils/stats/statsData';

const Counts = () => {
  const sectionRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [targetValues, setTargetValues] = useState(() => getStoredStats());
  const [counters, setCounters] = useState({ Earnings: 0, Clients: 0, Projects: 0, Events: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Fetch latest stats from backend API once on mount
    fetchStats().then((fresh) => {
      if (fresh) {
        setTargetValues(fresh);
      }
    });

    const handleStatsUpdated = (e) => {
      const updated = e.detail || getStoredStats();
      setTargetValues(updated);
    };
    window.addEventListener("stats-updated", handleStatsUpdated);
    return () => window.removeEventListener("stats-updated", handleStatsUpdated);
  }, []);

  // Use Intersection Observer to detect when stats are visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (statsVisible && !animationComplete) {
      const duration = 2500;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);

      const finalValues = targetValues;

      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easeOutQuint = 1 - Math.pow(1 - progress, 5); // Smoother easing

        setCounters({
          Earnings: Math.floor(easeOutQuint * finalValues.Earnings),
          Clients: Math.floor(easeOutQuint * finalValues.Clients),
          Projects: Math.floor(easeOutQuint * finalValues.Projects),
          Events: Math.floor(easeOutQuint * finalValues.Events)
        });

        if (frame === totalFrames) {
          clearInterval(counter);
          setAnimationComplete(true);
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }
  }, [statsVisible, animationComplete]);

  // Update counters with fresh targetValues once initial animation has completed
  useEffect(() => {
    if (animationComplete) {
      setCounters(targetValues);
    }
  }, [animationComplete, targetValues]);

  const stats = [
    {
      value: counters.Earnings,
      label: "Revenue Generated",
      icon: <BarChart className="h-5 w-5" />,
      prefix: "₹",
    },
    {
      value: counters.Clients,
      label: "Tech Partners",
      icon: <Users className="h-5 w-5" />,
      prefix: "",
    },
    {
      value: counters.Projects,
      label: "Projects Delivered",
      icon: <Lightbulb className="h-5 w-5" />,
      prefix: "",
    },
    {
      value: counters.Events,
      label: "Community Events",
      icon: <Calendar className="h-5 w-5" />,
      prefix: "",
    }
  ];

  return (
    <section ref={sectionRef} className="pt-6 sm:pt-10 lg:pt-14 pb-4 sm:pb-8 lg:pb-10 bg-transparent relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ca0019]/5 rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ca0019]/5 rounded-full -z-10"></div>

      {/* Additional decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border border-[#ca0019]/10 rounded-xl rotate-12 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#ca0019]/10 rounded-xl -rotate-12 -z-10"></div>
      <div className="absolute top-40 right-1/4 w-8 h-8 border border-[#ca0019]/20 rounded-full -z-10"></div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-5 -z-10"
        style={{
          backgroundImage: 'radial-gradient(#ca0019 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      {/* Small decorative dots */}
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#ca0019]/30 rounded-full -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#ca0019]/20 rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-[#ca0019]/10 rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced heading with decorative elements */}
        <div className="text-center mb-16 relative flex flex-col items-center">
          <div className="inline-block relative">
            <h2 className="text-sm font-semibold text-[#ca0019] uppercase tracking-wide mb-2 relative z-10">
              Our Achievements
            </h2>
            <div className="absolute h-2 w-full bottom-0 left-0 bg-[#ca0019]/10 -z-0"></div>
          </div>
          <p className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            <span className="pb-1">Making an </span>
            <span className="">Impact</span>
            <span className="absolute -right-6 -top-6 text-6xl text-[#ca0019]/5 font-serif">&#8221;</span>
          </p>
        </div>

        {/* Enhanced stats grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${statsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Improved card with more initial visual interest */}
              <div className="bg-white/60 dark:bg-[#424D53] backdrop-blur-lg p-3.5 sm:p-6 rounded-lg shadow-[0_4px_20px_-4px_rgba(202,0,25,0.1)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-white/40 dark:border-none group relative overflow-hidden flex flex-col items-center sm:items-start text-center sm:text-left">
                {/* Card corner accent (visible without hover) */}
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#ca0019]/5 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#ca0019]/10 rounded-bl-xl"></div>
                </div>

                {/* Fancier icon with animation */}
                <div className="flex items-center justify-center sm:justify-start w-full mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#ca0019]/20 to-[#ca0019]/10 flex items-center justify-center sm:mr-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-[#ca0019] group-hover:rotate-12 transition-transform duration-300">{stat.icon}</span>
                  </div>
                  <div className="hidden sm:block h-px flex-grow bg-gradient-to-r from-[#ca0019]/30 via-gray-200 to-transparent"></div>
                </div>

                {/* Enhanced typography with subtle animations */}
                <div className="mb-2 sm:mb-3 w-full group-hover:-translate-y-0.5 sm:group-hover:translate-x-1 sm:group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white inline-flex items-center justify-center sm:justify-start">
                    <span>{stat.prefix}{stat.value.toLocaleString()}</span>
                    <span className="text-base sm:text-lg font-bold text-[#ca0019] ml-1 animate-pulse">+</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium leading-snug">{stat.label}</p>

                {/* Subtle decorative corner element */}
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-[#ca0019]/5 rounded-full transition-opacity duration-300 opacity-10 group-hover:opacity-100 pointer-events-none"></div>

                {/* Bottom line - partially visible by default */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 h-0.5 w-1/3 sm:w-1/5 bg-[#ca0019]/30 group-hover:w-full group-hover:bg-[#ca0019] transition-all duration-500 ease-out"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced footer element */}
      <div className="mt-8 sm:mt-12 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-px bg-gradient-to-r from-transparent via-[#ca0019]/30 to-transparent"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-3 bg-white border-2 border-[#ca0019]/30 rounded-full -mt-1.5"></div>
      </div>
    </section>
  );
};

export default Counts;
