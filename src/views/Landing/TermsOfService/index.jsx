import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Check } from "lucide-react";
import { useThemeContext } from "@/theme/ThemeProvider";
import CallToAction from "../homComponents/CallToAction";

const TermsOfService = () => {
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [acceptedMessage, setAcceptedMessage] = useState(false);

  const sections = [
    {
      id: 1,
      title: "1 - Terms and Conditions",
      content:
        "Welcome to The Uniques Community. Don't misuse our services or portal. You may use our platforms and learning resources only as permitted by law and our community guidelines. We may suspend or stop providing services to you if you do not comply with our terms or if we are investigating suspected misconduct.",
    },
    {
      id: 2,
      title: "2 - Community & Membership",
      content:
        "Membership in The Uniques Community is open to students and developers committed to learning, collaboration, and professional growth. You are responsible for safeguarding your portal credentials and activities under your account.",
    },
    {
      id: 3,
      title: "3 - Training & Cohorts",
      content:
        "Participants enrolled in our training programs (Four-Phase Model, Web Dev, MERN, AI/GenAI) must maintain required attendance and project submission standards. Educational resources are for personal learning and cannot be redistributed without permission.",
    },
    {
      id: 4,
      title: "4 - Code of Conduct",
      content:
        "We maintain a strictly inclusive, harassment-free, and respectful environment. Plagiarism, offensive communication, unauthorized scraping, or disruptive actions across any digital or physical forum will result in immediate revocation of membership.",
    },
    {
      id: 5,
      title: "5 - Projects & Intellectual Property",
      content:
        "You retain ownership of the original code and applications you create. By submitting projects to community showcases or hackathons, you grant The Uniques permission to feature and celebrate your work with proper creator attribution.",
    },
    {
      id: 6,
      title: "6 - Disclaimers & Updates",
      content:
        "All services are provided on an 'as is' basis without warranties. We may periodically update these terms to reflect program enhancements. Continued participation indicates acceptance of any revised terms.",
    },
  ];

  const handleAccept = () => {
    if (!agreeTerms) {
      setAgreeTerms(true);
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
      className={`transition-colors duration-300 ${
        isDarkMode ? "bg-[#121212]" : "bg-slate-100"
      }`}
    >
      <div className="flex items-center justify-center py-12 px-4 sm:px-6">
        {/* Simple Card Modal Container */}
      <div
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
          isDarkMode
            ? "bg-[#1c1c1f] border-zinc-800 text-zinc-100 shadow-black/50"
            : "bg-white border-slate-200 text-slate-900 shadow-slate-300/60"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ca0019]/10 dark:bg-[#ca0019]/20 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-[#ca0019]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Update 27/09/2025
            </p>
          </div>
        </div>

        {/* Scrollable Terms Content Box */}
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

        {/* Agreement Checkbox */}
        <div className="mb-6">
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
                Terms of Service
              </strong>
            </span>
          </label>
        </div>

        {/* Action Buttons */}
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

      {/* Call To Action */}
      <CallToAction />
    </div>
  );
};

export default TermsOfService;
