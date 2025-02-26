import React, { useState } from "react";
import { Modal, Box, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BlogCard from "@/utils/Card/BlogCard";
import ContainerFull from "@/utils/Container/ContainerFull";
import { blogData } from "@/assets/dummyData/blogData";
import office from "@/assets/img/office.jpg";
const index = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="relative">
        <div
          style={{
            backgroundImage: office ? `url(${office})` : "none",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="h-[70vh] w-full bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="lg:w-3/4 w-[85%] mx-auto h-80 bg-black absolute top-1/2 left-0 right-0 transform z-10 rounded-lg"></div>
      </div>
      <div className="lg:max-w-7xl max-w-5xl mx-auto py-12 my-20">
        <h1 className="text-3xl font-bold text-center text-gray-800 my-8">
          Latest Blogs
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols- grid-cols-1 gap-6 snap-x scroll-p-6 place-items-center p-6">
          {blogData.map((blog, index) => (
            <BlogCard
              key={index}
              {...blog}
              onClick={() => setSelectedBlog(blog)}
            />
          ))}
        </div>
      </div>

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
                <h2
                  id="blog-title"
                  className="text-4xl font-bold text-gray-800"
                >
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

export default index;
