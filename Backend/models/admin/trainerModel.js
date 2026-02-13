import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    batch: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    skills: {
        type: [String],
        default: [],
    },
    profileStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    profilePic: {
        type: String, // URL or File ID
        default: null,
    },
    linkedinProfile: {
        type: String,
        default: "",
    },
    githubProfile: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;
