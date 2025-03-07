// models/memberModel.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import File from "./fileModel.js";

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    googleId:{
      type:String,
    },
    admno: {
      type: String,
      sparse: true,
      unique: true,
      match: [/^[0-9]{4}(BTCS|BTCSD)[0-9]{3}$/],
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "member",
    },
    batch: {
      type: String,

      enum: ["The Uniques 1.0", "The Uniques 2.0", "The Uniques 3.0"],
    },
    contact: {
      type: String,
    },
    whatsappContact: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    isPlaced: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    profileStatus: {
      type: String,
      default: "inactive",
      enum: ["inactive", "active", "pending", "blocked"],
    },
    fineStatus: {
      type: String,
      default: "0",
    },
    certifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    profilePic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    skills: {
      type: Array,
      default: [],
    },
    projects: {
      type: Array,
      default: [],
    },
    internships: {
      type: Array,
      default: [],
    },
    achievements: {
      type: Array,
      default: [],
    },
    linkedinProfile: {
      type: String,
      default: "",
    },
    instagramProfile: {
      type: String,
      default: "",
    },
    twitterProfile: {
      type: String,
      default: "",
    },
    githubProfile: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    event_participation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    eventContributionType: [
      {
        type: String,
        enum: [
          "Organizer",
          "Co-Organizer",
          "Infrastructure",
          "Marketing",
          "Graphic Designing",
          "Volunteer",
          "Participant",
          "Technical Team",
          "Printing & Stationery",
          "Others",
        ],
      },
    ],
    course: {
      type: String,

      enum: ["B.Tech CSE", "CSD"],
    },
  },
  { timestamps: true }
);

// Compare candidatePassword with the hashed password
memberSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Member = mongoose.model("Member", memberSchema);
export default Member;
