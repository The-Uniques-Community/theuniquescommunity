import express from "express";
import {
  getAllSuccessStories,
  getSuccessStoryById,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
} from "../../controller/Community/successStoryController.js";

const router = express.Router();

// Public routes: Anyone (visitors and common users) can view published stories
router.get("/", getAllSuccessStories);
router.get("/:id", getSuccessStoryById);

// Coordinator CRUD routes: create, update, delete
router.post("/", createSuccessStory);
router.put("/:id", updateSuccessStory);
router.delete("/:id", deleteSuccessStory);

export default router;
