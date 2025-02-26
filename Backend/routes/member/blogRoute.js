import express from "express";
import { createBlog, getAllBlogs, getBlogById } from "../../controller/member/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/", createBlog);          // Create a new blog
blogRouter.get("/", getAllBlogs);          // Get all blogs
blogRouter.get("/:id", getBlogById);       // Get a single blog by ID


export default blogRouter;
