import React, { useState } from "react";
import { Modal, Box, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BlogCard from "@/utils/Card/BlogCard";
import CelebrationComponent from "@/utils/Header";
import CallToAction from "../homComponents/CallToAction";
import { blogData } from "@/assets/dummyData/blogData";

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState(null);

  // Extract unique categories from blogData
  const categories = ["All", ...new Set(blogData.map((blog) => blog.category))];

  // Extract unique tags from blogData
  const tags = [
    "All",
    ...new Set(blogData.flatMap((blog) => blog.tags)),
  ];

  // Filtering logic
  const filteredBlogs = blogData.filter((blog) => {
    const matchesCategory =
      categoryFilter === "All" || blog.category === categoryFilter;
    const matchesTag = !tagFilter || blog.tags.includes(tagFilter);

    return matchesCategory && matchesTag;
  });

  return (
    <div className="min-h-screen">
      <CelebrationComponent title="Shaping Perspectives → Read & Grow ✦" />

      <div className="lg:max-w-7xl max-w-5xl mx-auto py-12 mt-5">
        <h1 className="lg:text-5xl text-3xl font-bold text-center text-gray-800 my-8">
          Latest Blogs
        </h1>

        {/* Filters Section */}
        <div className="flex flex-wrap justify-center space-x-4 mb-6">
          {/* Category Filter */}
          {/* {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                categoryFilter === category
                  ? "bg-[#CA0019] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => {
                setCategoryFilter(category);
                setTagFilter(null); // Reset tag filter on category change
              }}
            >
              {category}
            </button>
          ))} */}
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap justify-center space-x-2 mb-8">
          {tags.map((tag) => (
            <button
              style={{borderRadius:12}}
              key={tag}
              className={`cursor-pointer px-3 m-2 py-1 ${
                tagFilter === tag ? "bg-[#ca0019] text-white" : "bg-gray-200"
              }`}
              onClick={() => setTagFilter(tag === "All" ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 snap-x scroll-p-6 place-items-center p-6">
          {filteredBlogs.map((blog, index) => (
            <BlogCard key={index} {...blog} onClick={() => setSelectedBlog(blog)} />
          ))}
        </div>

        <div className="py-8"></div>
      </div>

      <CallToAction />
      <div className="py-8"></div>

      {/* Blog Modal - Full Page */}
      <Modal
        open={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        aria-labelledby="blog-title"
        aria-describedby="blog-content"
      >
        <Box className="fixed inset-0 bg-white overflow-auto">
          {selectedBlog && (
            <div className="max-w-6xl mx-auto p-6">
              {/* Close Button */}
              <div className="flex justify-between items-center">
                <h2 id="blog-title" className="text-4xl font-bold text-gray-800">
                  {selectedBlog.title}
                </h2>
                <IconButton onClick={() => setSelectedBlog(null)}>
                  <CloseIcon className="text-gray-600" />
                </IconButton>
              </div>

              {/* Blog Meta Info */}
              <p className="text-gray-600 text-lg mt-2">
                {selectedBlog.category} • {selectedBlog.readTime} Mins Read
              </p>

              {/* Blog Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedBlog.tags.map((tag, index) => (
                  <Chip key={index} label={tag} className="bg-gray-200" />
                ))}
              </div>

              {/* Blog Image */}
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-[400px] object-cover rounded-lg mt-6"
              />

              {/* Blog Content Sections */}
              <div
                id="blog-content"
                className="mt-6 text-gray-700 text-lg leading-7 space-y-6"
              >
                {selectedBlog.subContents.map((section, index) => (
                  <div key={index}>
                    {section.heading && (
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {section.heading}
                      </h3>
                    )}
                    <p className="mt-2">{section.paragraph}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BlogPage;
