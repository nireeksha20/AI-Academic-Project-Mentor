import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
  },
  { _id: true },
);

const progressSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    overallCompletion: {
      type: Number,
      default: 0,
    },

    currentStage: {
      type: String,
      default: "Planning",
    },

    currentGoal: {
      type: String,
      default: "",
    },

    tasks: {
      type: [taskSchema],
      default: [],
    },

    blockers: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      default: "",
    },

    health: {
      type: String,
      enum: ["On Track", "At Risk", "Delayed"],
      default: "On Track",
    },

    aiSuggestion: {
      type: String,
      default: "",
    },

    updatedTimeline: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Progress", progressSchema);
