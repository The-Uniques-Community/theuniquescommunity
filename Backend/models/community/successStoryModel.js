import mongoose from "mongoose";

const timelineItemSchema = new mongoose.Schema(
  {
    year: { type: mongoose.Schema.Types.Mixed, required: true },
    achievements: { type: [String], default: [] },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, default: "" },
    degree: { type: String, default: "" },
    duration: { type: String, default: "" },
    location: { type: String, default: "" },
    details: { type: String, default: "" },
  },
  { _id: false }
);

const experienceItemSchema = new mongoose.Schema(
  {
    company: { type: String, default: "" },
    role: { type: String, default: "" },
    duration: { type: String, default: "" },
    location: { type: String, default: "" },
    responsibilities: { type: [String], default: [] },
  },
  { _id: false }
);

const projectItemSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    technologies: { type: String, default: "" },
    date: { type: String, default: "" },
    description: { type: String, default: "" },
    achievements: { type: [String], default: [] },
  },
  { _id: false }
);

const skillsSchema = new mongoose.Schema(
  {
    languages: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    tools: { type: [String], default: [] },
  },
  { _id: false }
);

const leadershipSchema = new mongoose.Schema(
  {
    organization: { type: String, default: "" },
    role: { type: String, default: "" },
    duration: { type: String, default: "" },
    achievements: { type: [String], default: [] },
  },
  { _id: false }
);

const successStorySchema = new mongoose.Schema(
  {
    storyId: {
      type: String,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    video: {
      type: String,
      default: "",
      trim: true,
    },
    batch: {
      type: String,
      default: "The Uniques 1.0",
      trim: true,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      default: "",
      trim: true,
    },
    summary: {
      type: String,
      default: "",
      trim: true,
    },
    timeline: {
      type: [timelineItemSchema],
      default: [],
    },
    education: {
      type: educationSchema,
      default: () => ({}),
    },
    experience: {
      type: [experienceItemSchema],
      default: [],
    },
    projects: {
      type: [projectItemSchema],
      default: [],
    },
    skills: {
      type: skillsSchema,
      default: () => ({ languages: [], technologies: [], tools: [] }),
    },
    leadership: {
      type: leadershipSchema,
      default: () => ({ achievements: [] }),
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      default: "coordinator",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret.storyId || ret._id.toString();
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret.storyId || ret._id.toString();
        return ret;
      },
    },
  }
);

const SuccessStory =
  mongoose.models.SuccessStory ||
  mongoose.model("SuccessStory", successStorySchema);

export default SuccessStory;
