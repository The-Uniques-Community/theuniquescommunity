import React, { useState } from "react";
import { useThemeContext } from "@/theme/ThemeProvider";
import { Code, Calendar, Database, BookOpen } from "lucide-react";

const getCategoryIcon = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("react") || cat.includes("frontend") || cat.includes("code")) {
    return <Code className="w-10 h-10 text-[#CA0019]" />;
  }
  if (cat.includes("event") || cat.includes("management")) {
    return <Calendar className="w-10 h-10 text-[#CA0019]" />;
  }
  if (cat.includes("backend") || cat.includes("database") || cat.includes("server")) {
    return <Database className="w-10 h-10 text-[#CA0019]" />;
  }
  return <BookOpen className="w-10 h-10 text-[#CA0019]" />;
};

const BlogCard = ({ title, description, category, readTime, image, onClick }) => {
  const { isDarkMode } = useThemeContext() || {};
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="w-full h-full cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className={`relative flex flex-col h-full overflow-hidden transition-all duration-300 transform border shadow-sm group rounded-2xl hover:shadow-xl hover:-translate-y-1.5 ${
        isDarkMode 
          ? 'bg-[#1E1E1E] border-white/10 hover:border-[#CA0019]/50' 
          : 'bg-white border-gray-100 hover:border-[#CA0019]/30'
      }`}>
        {/* Image Container with Fallback */}
        <div className="w-full h-48 sm:h-52 overflow-hidden shrink-0 relative bg-slate-100 dark:bg-zinc-800">
          {!imgError && image ? (
            <img
              className="object-cover w-full h-full transition-all duration-500 transform group-hover:scale-105"
              src={image}
              alt={title}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 to-[#1e1e24] text-center select-none relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#CA0019_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 z-10 shadow-lg">
                {getCategoryIcon(category)}
              </div>
              <span className="text-xs font-semibold text-zinc-300 tracking-wider uppercase z-10">
                The Uniques
              </span>
            </div>
          )}

          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-[#CA0019] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md z-20">
            {category || "General"}
          </span>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className={`text-lg font-bold leading-snug line-clamp-2 mb-2 transition-colors ${
              isDarkMode ? 'text-white group-hover:text-[#CA0019]' : 'text-gray-900 group-hover:text-[#CA0019]'
            }`}>
              {title}
            </h3>
            <p className={`text-sm leading-relaxed line-clamp-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {description}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-semibold ${
            isDarkMode ? 'border-white/10 text-gray-400' : 'border-gray-100 text-gray-500'
          }`}>
            <span>{category}</span>
            <span>•</span>
            <span>{readTime || 5} Mins Read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
