import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CelebrationComponent from "@/utils/Header";
import {
  Shield,
  ShieldCheck,
  User,
  Monitor,
  FileText,
  Settings,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Calendar,
  ChevronRight
} from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", label: "Introduction", icon: Shield },
    { id: "data-collection", label: "Data Collection", icon: FileText },
    { id: "how-we-use-data", label: "How We Use Data", icon: Settings },
    { id: "contact", label: "Contact & Support", icon: Mail },
  ];

  // Set up intersection observer for scrollspy active highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0.05,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // account for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="bg-slate-50/60 dark:bg-[#0a0a0a] min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300 pb-16">
      
      {/* Standard Header - Matches Contact Us and other Landing pages */}
      <CelebrationComponent title="Privacy Policy → Trust & Transparency ✦" />

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT WITH STICKY SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* ═══════════════════════════════════════════════════════════
              LEFT STICKY SIDEBAR (Table of Contents + Community Trust Card)
          ═══════════════════════════════════════════════════════════ */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white dark:bg-[#161618] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 px-2 flex items-center justify-between">
                <span>Table of Contents</span>
                <span className="text-xs font-semibold text-[#ea384c] px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40">
                  {sections.length} Sections
                </span>
              </h2>

              <nav className="space-y-1.5" aria-label="Table of Contents">
                {sections.map(({ id, label, icon: IconComponent }) => {
                  const isActive = activeSection === id;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={(e) => scrollToSection(e, id)}
                      className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#ea384c] text-white shadow-md shadow-red-500/25 font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <IconComponent
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? "text-white" : "text-slate-400 dark:text-slate-500 group-hover:text-[#ea384c]"
                        }`}
                      />
                      <span className="truncate">{label}</span>
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 ml-auto text-white shrink-0 animate-pulse" />
                      )}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Student Collaboration Trust Badge Card (Replaces Dog Mockup) */}
            <div className="hidden lg:block bg-gradient-to-br from-red-50 via-white to-amber-50/40 dark:from-red-950/20 dark:via-[#161618] dark:to-slate-900/60 rounded-2xl p-6 border border-red-100 dark:border-red-950/40 text-center relative overflow-hidden shadow-sm">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#ea384c] to-rose-400 text-white flex items-center justify-center shadow-lg shadow-red-500/30 mb-4 transform -rotate-3 hover:rotate-0 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                Your Trust Fuels Our Innovation
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Built by students, for students. We guard your journey with uncompromising integrity and transparent ethics.
              </p>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ea384c]">
                <Heart className="w-3.5 h-3.5 fill-[#ea384c]" />
                <span>The Uniques Community</span>
              </div>
            </div>
          </aside>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT CONTENT PANELS
          ═══════════════════════════════════════════════════════════ */}
          <main className="flex-1 min-w-0 space-y-12 sm:space-y-16">
            
            {/* ─────────────────────────────────────────────────────────
                SECTION 1 — INTRODUCTION
            ───────────────────────────────────────────────────────── */}
            <section
              id="introduction"
              className="scroll-mt-28 bg-white dark:bg-[#161618] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="flex-1">
                  {/* Eyebrow Label & Last Updated */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
                      Introduction
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#ea384c]" />
                      Last Updated: September 27, 2026
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
                    Welcome to Our <span className="text-[#ea384c]">Privacy Policy!</span>
                  </h2>

                  {/* Body Paragraphs */}
                  <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    <p>
                      At <strong className="text-slate-900 dark:text-white font-semibold">The Uniques Community</strong>, your trust matters to us. This policy explains how we collect, use, and protect your personal information when you visit our website, register as a member, or reach out through our contact form.
                    </p>
                    <p>
                      We are committed to keeping your data safe and handling it with transparency, honesty, and care. Please read this policy carefully to understand how we manage your information as a student-led community.
                    </p>
                  </div>
                </div>

                {/* Decorative Badge Icon (Matching Mockup's Shield check bubble) */}
                <div className="shrink-0 hidden sm:flex flex-col items-center justify-center w-[72px] h-[72px] rounded-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-red-950/40 dark:to-orange-950/30 p-2 shadow-inner border border-orange-200/60 dark:border-red-900/30">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ea384c] to-orange-500 text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-bold text-orange-700 dark:text-orange-400 mt-0.5 uppercase tracking-wider">
                    Verified
                  </span>
                </div>
              </div>
            </section>

            {/* ─────────────────────────────────────────────────────────
                SECTION 2 — DATA COLLECTION (3-Column Cards)
            ───────────────────────────────────────────────────────── */}
            <section id="data-collection" className="scroll-mt-28 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/50 text-[#ea384c] mb-3">
                  Data Collection
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                  What Information Do We Collect?
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  We collect only the information necessary to run our community programs, mentorship sessions, and events. This includes:
                </p>
              </div>

              {/* 3-Column Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card A */}
                <div className="bg-[#fbf7f4] dark:bg-[#1a1515] rounded-2xl p-6 border border-orange-100 dark:border-orange-950/40 flex flex-col justify-between hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-900/60 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4 shadow-sm">
                      <User className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                      Information You Provide Directly
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      When you sign up for membership, submit our contact form, subscribe to updates, or register for an event, we may collect your first name, last name, email address, phone number, college or batch details, and any message you choose to share with us.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-orange-100/60 dark:border-orange-950/40 flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Explicit Consent</span>
                  </div>
                </div>

                {/* Card B */}
                <div className="bg-[#f4f8fb] dark:bg-[#131920] rounded-2xl p-6 border border-blue-100 dark:border-blue-950/40 flex flex-col justify-between hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/60 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 shadow-sm">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                      Automatically Collected Information
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      We collect basic technical data such as cookies, pages visited, time spent on the page, device type, browser type, and IP address. This helps us understand how visitors use our site and improve the experience.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-blue-100/60 dark:border-blue-950/40 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Analytics & Telemetry</span>
                  </div>
                </div>

                {/* Card C */}
                <div className="bg-[#f4faf6] dark:bg-[#121c17] rounded-2xl p-6 border border-emerald-100 dark:border-emerald-950/40 flex flex-col justify-between hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-900/60 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-sm">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                      Third-Party Sources
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      We may receive limited information from trusted third-party services, such as payment gateways used for event registrations, media platforms where our work is showcased, or analytics tools that help us measure community growth.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-emerald-100/60 dark:border-emerald-950/40 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Gateways</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ─────────────────────────────────────────────────────────
                SECTION 3 — HOW WE USE DATA (4 Feature Grid Cards)
            ───────────────────────────────────────────────────────── */}
            <section id="how-we-use-data" className="scroll-mt-28 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 mb-3">
                  How We Use Data
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                  How We Use Your Information
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  We use the collected information to:
                </p>
              </div>

              {/* 4 Cards (Responsive Grid: 1 col on mobile, 2 col on tablet, 4 col on wide screens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Item 1 */}
                <div className="bg-white dark:bg-[#161618] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-950/60 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-3.5">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    Provide & Maintain
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Manage memberships, batches, training models, and project collaborations smoothly.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="bg-white dark:bg-[#161618] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-950/60 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#ea384c] flex items-center justify-center mb-3.5">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    Improve UX
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Understand what content and design blocks resonate with our students and members.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="bg-white dark:bg-[#161618] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-950/60 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    Communicate
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Send event announcements, workshop updates, mentorship schedules, and newsletters.
                  </p>
                </div>

                {/* Item 4 */}
                <div className="bg-white dark:bg-[#161618] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-950/60 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    Ensure Security
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Detect spam submissions, unauthorised access, and fraudulent activities proactively.
                  </p>
                </div>
              </div>
            </section>

            {/* ─────────────────────────────────────────────────────────
                SECTION 7 — CONTACT / FOOTER CTA
            ───────────────────────────────────────────────────────── */}
            <section
              id="contact"
              className="scroll-mt-28 bg-[#fdfaf7] dark:bg-[#161618] rounded-3xl p-6 sm:p-10 border border-orange-100/90 dark:border-slate-800 shadow-sm relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="max-w-xl">
                  {/* Eyebrow Label */}
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 mb-3">
                    Data Support
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                    We're Here to Help
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    If you have any questions or concerns about this Privacy Policy, feel free to reach out to us. We're happy to walk you through anything.
                  </p>

                  {/* Direct Contact Points */}
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <a
                      href="mailto:team.theuniques@sviet.ac.in"
                      className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-[#ea384c] dark:hover:text-[#ea384c] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#ea384c] shrink-0" />
                      <span>Email us: <strong className="font-semibold">team.theuniques@sviet.ac.in</strong></span>
                    </a>

                    <a
                      href="tel:+917318004841"
                      className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-[#ea384c] dark:hover:text-[#ea384c] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#ea384c] shrink-0" />
                      <span>Call us: <strong className="font-semibold">+91 73180 04841</strong></span>
                    </a>

                    <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                      <MapPin className="w-4 h-4 text-[#ea384c] shrink-0 mt-0.5" />
                      <span>Visit us: <strong className="font-semibold">SVIET, Banur, Punjab-140601</strong></span>
                    </div>
                  </div>
                </div>

                {/* CTA Action Column */}
                <div className="shrink-0 flex flex-col items-start lg:items-end justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#ea384c] hover:bg-black text-white text-sm font-bold rounded-full shadow-lg shadow-red-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-xs italic text-slate-500 dark:text-slate-400">
                    Because you deserve the best. ✦
                  </p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
