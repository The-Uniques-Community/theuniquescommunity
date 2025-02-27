import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    readTime: { type: Number, required: true },
    image: { type: String, required: true },
    subContents: [
      {
        heading: { type: String, required: false },
        paragraph: { type: String, required: true },
      },
    ],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
