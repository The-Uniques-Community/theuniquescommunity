import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import SuccessStory from "../../models/community/successStoryModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load initial seed dataset
let SEED_STORIES = [];
try {
  const seedPath = path.join(__dirname, "seedSuccessStories.json");
  if (fs.existsSync(seedPath)) {
    const rawData = fs.readFileSync(seedPath, "utf8");
    SEED_STORIES = JSON.parse(rawData);
  }
} catch (err) {
  console.warn("Could not load seedSuccessStories.json:", err.message);
}

// Memory store fallback for environments where MongoDB is offline or in transition
let memoryStories = SEED_STORIES.map((s, index) => ({
  ...s,
  _id: s._id || `seed_${index + 1}`,
  storyId: s.storyId || s.id,
  isPublished: s.isPublished !== undefined ? s.isPublished : true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// Helper to check valid Mongo ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Auto-seed database if collection is empty
const ensureDatabaseSeeded = async () => {
  if (mongoose.connection.readyState >= 1) {
    try {
      const count = await SuccessStory.countDocuments();
      if (count === 0 && SEED_STORIES.length > 0) {
        console.log(`Auto-seeding ${SEED_STORIES.length} initial success stories into database...`);
        const formattedSeeds = SEED_STORIES.map((story, idx) => ({
          storyId: story.id || `story_${idx + 1}`,
          name: story.name,
          image: story.image || "",
          video: story.video || "",
          batch: story.batch || "The Uniques 1.0",
          company: story.company || "",
          role: story.role || "",
          summary: story.summary || "",
          timeline: Array.isArray(story.timeline) ? story.timeline : [],
          education: story.education || {},
          experience: Array.isArray(story.experience) ? story.experience : [],
          projects: Array.isArray(story.projects) ? story.projects : [],
          skills: story.skills || { languages: [], technologies: [], tools: [] },
          leadership: story.leadership || { achievements: [] },
          isPublished: true,
          order: idx,
        }));
        await SuccessStory.insertMany(formattedSeeds);
        console.log("Success stories seeded successfully.");
      }
    } catch (err) {
      console.error("Error auto-seeding success stories:", err.message);
    }
  }
};

/**
 * GET /api/success-stories
 * Public endpoint to retrieve all published success stories
 * Supports query ?includeDrafts=true (for coordinators)
 */
export const getAllSuccessStories = async (req, res) => {
  try {
    const includeDrafts = req.query.includeDrafts === "true";

    if (mongoose.connection.readyState >= 1) {
      await ensureDatabaseSeeded();
      const filter = includeDrafts ? {} : { isPublished: { $ne: false } };
      const stories = await SuccessStory.find(filter).sort({ order: 1, createdAt: -1 });

      const mappedStories = stories.map((doc) => {
        const obj = doc.toJSON();
        obj.id = obj.storyId || obj._id.toString();
        return obj;
      });

      return res.status(200).json({
        success: true,
        count: mappedStories.length,
        data: mappedStories,
      });
    }

    // Memory fallback if DB is not connected
    const fallbackList = includeDrafts
      ? memoryStories
      : memoryStories.filter((s) => s.isPublished !== false);

    return res.status(200).json({
      success: true,
      count: fallbackList.length,
      data: fallbackList,
    });
  } catch (error) {
    console.error("Error fetching success stories:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching success stories",
      error: error.message,
    });
  }
};

/**
 * GET /api/success-stories/:id
 * Public endpoint to retrieve a single story by ID or slug
 */
export const getSuccessStoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState >= 1) {
      await ensureDatabaseSeeded();

      const queryConditions = [{ storyId: id }];
      if (isValidObjectId(id)) {
        queryConditions.push({ _id: id });
      }

      const story = await SuccessStory.findOne({ $or: queryConditions });

      if (story) {
        const obj = story.toJSON();
        obj.id = obj.storyId || obj._id.toString();
        return res.status(200).json({
          success: true,
          data: obj,
        });
      }
    }

    // Check memory store
    const foundInMemory = memoryStories.find(
      (s) => s.id === id || s.storyId === id || String(s._id) === String(id)
    );

    if (foundInMemory) {
      return res.status(200).json({
        success: true,
        data: foundInMemory,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Success story not found",
    });
  } catch (error) {
    console.error("Error fetching single success story:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching success story",
      error: error.message,
    });
  }
};

/**
 * POST /api/success-stories
 * Protected: Coordinator only
 * Create a new success story
 */
export const createSuccessStory = async (req, res) => {
  try {
    const {
      id,
      storyId: inputStoryId,
      name,
      image,
      video,
      batch,
      company,
      role,
      summary,
      timeline,
      education,
      experience,
      projects,
      skills,
      leadership,
      isPublished,
      order,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Student name is required",
      });
    }

    // Generate unique storyId/slug if not supplied
    const baseSlug = (inputStoryId || id || name)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const generatedStoryId = `${baseSlug}${Date.now().toString().slice(-4)}`;
    const finalStoryId = inputStoryId || id || generatedStoryId;

    const normalizedSkills = {
      languages: Array.isArray(skills?.languages)
        ? skills.languages
        : typeof skills?.languages === "string"
        ? skills.languages.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      technologies: Array.isArray(skills?.technologies)
        ? skills.technologies
        : typeof skills?.technologies === "string"
        ? skills.technologies.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      tools: Array.isArray(skills?.tools)
        ? skills.tools
        : typeof skills?.tools === "string"
        ? skills.tools.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    const normalizedTimeline = (Array.isArray(timeline) ? timeline : [])
      .filter((t) => t && (t.year || (t.achievements && t.achievements.length > 0)))
      .map((t) => ({
        year: t.year || new Date().getFullYear(),
        achievements: Array.isArray(t.achievements)
          ? t.achievements.filter(Boolean)
          : typeof t.achievements === "string" && t.achievements.trim()
          ? [t.achievements.trim()]
          : [],
      }));

    const storyData = {
      storyId: finalStoryId,
      name: name.trim(),
      image: image || "",
      video: video || "",
      batch: batch || "Uniques 1.0",
      company: company || "",
      role: role || "",
      summary: summary || "",
      timeline: normalizedTimeline,
      education: education || {},
      experience: Array.isArray(experience) ? experience : [],
      projects: Array.isArray(projects) ? projects : [],
      skills: normalizedSkills,
      leadership: leadership || { achievements: [] },
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      order: Number(order) || 0,
      createdBy: req.user?.id || req.user?.email || "coordinator",
    };

    let resultStory;

    if (mongoose.connection.readyState >= 1) {
      const newDoc = new SuccessStory(storyData);
      const savedDoc = await newDoc.save();
      resultStory = savedDoc.toJSON();
      resultStory.id = resultStory.storyId || resultStory._id.toString();
    } else {
      resultStory = {
        ...storyData,
        _id: `story_${Date.now()}`,
        id: finalStoryId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // Keep memory fallback in sync
    memoryStories.unshift(resultStory);

    return res.status(201).json({
      success: true,
      message: "Success story created successfully",
      data: resultStory,
    });
  } catch (error) {
    console.error("Error creating success story:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating success story",
      error: error.message,
    });
  }
};

/**
 * PUT /api/success-stories/:id
 * Protected: Coordinator only
 * Update an existing success story
 */
export const updateSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    delete updates._id;

    if (updates.name !== undefined && !updates.name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Student name cannot be empty",
      });
    }

    let updatedStory = null;

    if (mongoose.connection.readyState >= 1) {
      const queryConditions = [{ storyId: id }];
      if (isValidObjectId(id)) {
        queryConditions.push({ _id: id });
      }

      const doc = await SuccessStory.findOneAndUpdate(
        { $or: queryConditions },
        updates,
        { new: true, runValidators: true }
      );

      if (doc) {
        updatedStory = doc.toJSON();
        updatedStory.id = updatedStory.storyId || updatedStory._id.toString();
      }
    }

    // Also update in memory store
    const memIndex = memoryStories.findIndex(
      (s) => s.id === id || s.storyId === id || String(s._id) === String(id)
    );

    if (memIndex !== -1) {
      memoryStories[memIndex] = {
        ...memoryStories[memIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      if (!updatedStory) {
        updatedStory = memoryStories[memIndex];
      }
    }

    if (!updatedStory) {
      return res.status(404).json({
        success: false,
        message: "Success story not found to update",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Success story updated successfully",
      data: updatedStory,
    });
  } catch (error) {
    console.error("Error updating success story:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating success story",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/success-stories/:id
 * Protected: Coordinator only
 * Delete an existing success story
 */
export const deleteSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (mongoose.connection.readyState >= 1) {
      const queryConditions = [{ storyId: id }];
      if (isValidObjectId(id)) {
        queryConditions.push({ _id: id });
      }

      const doc = await SuccessStory.findOneAndDelete({ $or: queryConditions });
      if (doc) deleted = true;
    }

    // Also delete from memory store
    const memIndex = memoryStories.findIndex(
      (s) => s.id === id || s.storyId === id || String(s._id) === String(id)
    );

    if (memIndex !== -1) {
      memoryStories.splice(memIndex, 1);
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Success story not found to delete",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Success story deleted successfully",
      data: { id },
    });
  } catch (error) {
    console.error("Error deleting success story:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting success story",
      error: error.message,
    });
  }
};
