import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Ensure password is not returned in queries by default
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },
    profile: {
      college: { type: String, default: "" },
      department: { type: String, default: "" },
      bio: { type: String, default: "" },
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    skillAssessment: {
      programming: { type: String, default: "" },
      frontend: { type: String, default: "" },
      backend: { type: String, default: "" },
      database: { type: String, default: "" },
      ai: { type: String, default: "" },
      experience: { type: String, default: "" },
      role: { type: String, default: "" },

      interests: {
        type: [String],
        default: [],
      },

      preferredTech: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
