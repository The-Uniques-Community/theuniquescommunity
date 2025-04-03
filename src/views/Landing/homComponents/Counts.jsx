import React, { useEffect, useRef, useState } from 'react';
import { Globe, Cpu, Leaf, Users, Lightbulb, Building, Mic, Award } from 'lucide-react';

const Counts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({ Earnings: 0, Clients: 0, Projects: 0, Events: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  // Intersection Observer for stats visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Counter animation for stats
  useEffect(() => {
    if (statsVisible && !animationComplete) {
      const duration = 2000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);

      const finalValues = {
        Earnings: 400000,
        Clients: 50,
        Projects: 100,
        Events: 30
      };

      let frame = 0;
      const counter = setInterval(() => {
        frame++;

        const progress = frame / totalFrames;
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);

        setCounters({
          Earnings: Math.floor(easeOutQuad * finalValues.Earnings),
          Clients: Math.floor(easeOutQuad * finalValues.Clients),
          Projects: Math.floor(easeOutQuad * finalValues.Projects),
          Events: Math.floor(easeOutQuad * finalValues.Events)
        });

        if (frame === totalFrames) {
          clearInterval(counter);
          setAnimationComplete(true);
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }
  }, [statsVisible, animationComplete]);

  // Add keyframes and styles to document
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes fadeInRight {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes borderPulse {
        0% { border-color: rgba(2, 80, 103, 0.3); }
        50% { border-color: rgba(2, 80, 103, 0.8); }
        100% { border-color: rgba(2, 80, 103, 0.3); }
      }
      
      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-pulse {
        animation: pulse 4s ease-in-out infinite;
      }
      
      .animate-shimmer {
        animation: shimmer 3s linear infinite;
        background: linear-gradient(90deg, 
          rgba(255,255,255,0) 0%, 
          rgba(255,255,255,0.2) 50%, 
          rgba(255,255,255,0) 100%);
        background-size: 200% 100%;
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }
      
      .animate-fade-in-left {
        animation: fadeInLeft 0.8s ease-out forwards;
      }
      
      .animate-fade-in-right {
        animation: fadeInRight 0.8s ease-out forwards;
      }
      
      .animate-scale-in {
        animation: scaleIn 0.8s ease-out forwards;
      }
      
      .animate-border-pulse {
        animation: borderPulse 2s infinite;
      }
      
      .animate-gradient-flow {
        background-size: 200% 200%;
        animation: gradientFlow 5s ease infinite;
      }
      
      .feature-card {
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      .feature-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 25px -5px rgba(2, 80, 103, 0.1), 0 10px 10px -5px rgba(2, 80, 103, 0.04);
      }
      
      .feature-card:hover .feature-icon {
        transform: scale(1.1);
      }
      
      .feature-card:hover .feature-number {
        transform: translateY(-5px);
      }
      
      .feature-card:hover .feature-overlay {
        opacity: 0.15;
      }
      
      .feature-icon {
        transition: transform 0.3s ease;
      }
      
      .feature-number {
        transition: transform 0.3s ease;
      }
      
      .feature-overlay {
        transition: opacity 0.3s ease;
      }
      
      .stat-card {
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      .stat-card:hover {
        transform: translateY(-5px) scale(1.03);
      }
      
      .stat-card:hover .stat-value {
        color: white;
      }
      
      .stat-card:hover .stat-overlay {
        opacity: 0.3;
      }
      
      .stat-value {
        transition: color 0.3s ease;
      }
      
      .stat-overlay {
        transition: opacity 0.3s ease;
      }
      
      .gradient-text {
        background: linear-gradient(to right, #025067, #02A8A8);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      
      .gradient-bg {
        background: linear-gradient(135deg, #025067, #02A8A8);
      }
      
     
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);



  const stats = [
    { value: counters.Earnings, label: "Earnings", icon: <Users className="w-6 h-6" />, delay: 0 },
    { value: counters.Clients, label: "Tech Clients", icon: <Lightbulb className="w-6 h-6" />, delay: 100 },
    { value: counters.Projects, label: "Projects", icon: <Building className="w-6 h-6" />, delay: 200 },
    { value: counters.Events, label: "Events", icon: <Mic className="w-6 h-6" />, delay: 300 }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-6 px-6 overflow-hidden bg-gray-50"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 -right-32 w-96 h-96 rounded-full border-4 border-[#025067]/10 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border-4 border-[#02A8A8]/10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-[#025067]/20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-[#02A8A8]/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full bg-[#025067]/20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        {/* Grid pattern */}

      </div>


      <div ref={statsRef} className="relative max-w-7xl mx-auto">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card relative p-8 rounded-xl overflow-hidden ${statsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{
                animationDelay: `${0.2 + stat.delay / 1000}s`,
                background: 'linear-gradient(135deg, #70000d, #ca0019)'
              }}
            >
              <div className="stat-overlay absolute inset-0 bg-black opacity-20"></div>

              <div className="flex items-center justify-between mb-4 relative z-10">
                <h4 className="stat-value text-4xl font-bold text-white ">{stat.value}+</h4>
                <div className="p-2 bg-white rounded-full">
                  {stat.icon}
                </div>
              </div>

              <p className="text-sm Capitalize tracking-wider text-white/80 font-medium relative z-10">
                {stat.label}
              </p>

              {/* Decorative circles */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border border-white/10"></div>
              <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full border border-white/10"></div>
            </div>
          ))}
        </div>

        {/* CTA Button */}

      </div>

    </section>
  );
};

export default Counts;