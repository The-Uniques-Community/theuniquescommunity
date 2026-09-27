import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Check } from "lucide-react";
import { useThemeContext } from "@/theme/ThemeProvider";

const PrivacyPolicy = () => {
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [acceptedMessage, setAcceptedMessage] = useState(false);

  const sections = [
    {
      id: 1,
      title: "1 - Information We Collect",
      content:
        "We collect personal identifiers such as name, email address, academic affiliation, and skills when you register on our portal or enroll in training cohorts.",
    },
    {
      id: 2,
      title: "2 - How We Use Data",
      content:
        "Data is used solely to coordinate batches, evaluate project milestones, issue verified certificates, and communicate important community announcements.",
    },
    {
      id: 3,
      title: "3 - No Data Monetization",
      content:
        "We never sell, rent, or trade your personal data to third parties. Information is strictly used for internal educational initiatives.",
    },
    {
      id: 4,
      title: "4 - Security & Retention",
      content:
        "We implement secure data transmission and access control measures. You can request profile updates or account deletion anytime via support.",
    },
  ];

  const handleAccept = () => {
    if (!agreeTerms || !agreePrivacy) {
      setAgreeTerms(true);
      setAgreePrivacy(true);
    }
    setAcceptedMessage(true);
    setTimeout(() => {
      setAcceptedMessage(false);
      navigate("/");
    }, 1500);
  };

  const handleDecline = () => {
    navigate(-1);
  };

  return (
    <div
      className={`min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 transition-colors duration-300 ${
        isDarkMode ? "bg-[#121212]" : "bg-slate-100"
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
          isDarkMode
            ? "bg-[#1c1c1f] border-zinc-800 text-zinc-100 shadow-black/50"
            : "bg-white border-slate-200 text-slate-900 shadow-slate-300/60"
        }`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ca0019]/10 dark:bg-[#ca0019]/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#ca0019]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Update 27/09/2025
            </p>
          </div>
        </div>

        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className={`h-72 sm:h-80 overflow-y-auto overscroll-contain rounded-2xl p-4 sm:p-5 mb-6 border text-xs sm:text-sm leading-relaxed space-y-5 scrollbar-thin ${
            isDarkMode
              ? "bg-[#141416] border-zinc-800/80 text-zinc-300 scrollbar-thumb-zinc-700"
              : "bg-slate-50/80 border-slate-200 text-slate-700 scrollbar-thumb-slate-300"
          }`}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: isDarkMode ? "#3f3f46 #18181b" : "#cbd5e1 #f8fafc",
          }}
        >
          {sections.map((section) => (
            <div key={section.id} className="space-y-1.5">
              <h3 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                {section.title}
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2.5 mb-6">
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div
              onClick={() => setAgreeTerms(!agreeTerms)}
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                agreeTerms
                  ? "bg-[#ca0019] border-[#ca0019] text-white"
                  : isDarkMode
                  ? "border-zinc-700 bg-zinc-800/60 group-hover:border-zinc-500"
                  : "border-slate-300 bg-white group-hover:border-slate-400"
              }`}
            >
              {agreeTerms && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span
              onClick={() => setAgreeTerms(!agreeTerms)}
              className="text-xs text-slate-600 dark:text-zinc-300"
            >
              I agree with the{" "}
              <strong className="text-slate-900 dark:text-white font-medium">
                Terms and Conditions
              </strong>
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div
              onClick={() => setAgreePrivacy(!agreePrivacy)}
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                agreePrivacy
                  ? "bg-[#ca0019] border-[#ca0019] text-white"
                  : isDarkMode
                  ? "border-zinc-700 bg-zinc-800/60 group-hover:border-zinc-500"
                  : "border-slate-300 bg-white group-hover:border-slate-400"
              }`}
            >
              {agreePrivacy && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span
              onClick={() => setAgreePrivacy(!agreePrivacy)}
              className="text-xs text-slate-600 dark:text-zinc-300"
            >
              I agree with the{" "}
              <strong className="text-slate-900 dark:text-white font-medium">
                Privacy Policy
              </strong>
            </span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleDecline}
            className={`w-full py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold border transition-colors ${
              isDarkMode
                ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600"
                : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
            }`}
          >
            Decline
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className="w-full py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold bg-[#ca0019] text-white hover:bg-red-700 shadow-md shadow-red-900/20 active:scale-[0.98] transition-all"
          >
            {acceptedMessage ? "Accepted ✓" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
