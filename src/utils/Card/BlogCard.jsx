import React from "react";

const BlogCard = ({ title, description, category, readTime, image }) => {
  return (
    <div className="relative snap-start scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
      <div className="relative flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow w-60 md:w-80 group rounded-xl hover:shadow-lg hover:-translate-y-1">
        <a href="#" className="flex shrink-0 aspect-w-4 aspect-h-3">
          <img
            className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
            src={image}
            alt={title}
          />
        </a>
        <div className="flex-1 px-4 py-5 sm:p-6">
          <a href="#">
            <p className="text-lg font-bold text-gray-900">{title}</p>
            <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
              {description}
            </p>
          </a>
        </div>
        <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-900">{category}</p>
              <span className="text-sm font-medium text-gray-900">•</span>
              <p className="text-sm font-medium text-gray-900">{readTime} Mins Read</p>
            </div>
            <a href="#" role="button">
              <svg
                className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="17" y1="7" x2="7" y2="17"></line>
                <polyline points="8 7 17 7 17 16"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
