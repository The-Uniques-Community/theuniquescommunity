import React from "react";
import { useThemeContext } from "@/theme/ThemeProvider";

const BlogCard = ({ title, description, category, readTime, image, onClick }) => {
  const { isDarkMode } = useThemeContext() || {};

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
        {/* Fixed Height Image Container */}
        <div className="w-full h-48 sm:h-52 overflow-hidden shrink-0 relative bg-gray-100 dark:bg-gray-800">
          <img
            className="object-cover w-full h-full transition-all duration-500 transform group-hover:scale-105"
            src={image}
            alt={title}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop";
            }}
          />
          <span className="absolute top-3 left-3 bg-[#CA0019] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
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
