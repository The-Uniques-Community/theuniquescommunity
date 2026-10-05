import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    batch: {
      type: String,
      required: [true, "Batch is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      default: "/projects/unicare.webp",
    },
    technologies: {
      type: [String],
      default: ["REACT", "NODE.JS"],
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    link: {
      type: String,
      default: "#",
      trim: true,
    },
    buttonColor: {
      type: String,
      default: "#ea384c",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
