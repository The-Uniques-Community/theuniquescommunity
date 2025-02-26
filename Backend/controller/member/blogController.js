import Blog from "../../models/member/blogModel.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, category, readTime, image, subContents, tags } = req.body;

    if (!title || !description || !category || !readTime || !image || !subContents) {
      return res.status(400).json({ message: "All fields except heading are required." });
    }

    const newBlog = new Blog({
      title,
      description,
      category,
      readTime,
      image,
      subContents,
      tags,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// Fetch all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};
