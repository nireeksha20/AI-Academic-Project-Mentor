import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    domain: {
      type: String,
      required: [true, 'Project domain is required'],
      trim: true,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    team: {
      type: String,
      default: 'Individual',
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    status: {
      type: String,
      enum: ['Planning', 'In Progress', 'Completed'],
      default: 'Planning',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    // The following fields are prepared for future AI generation outputs
    idea: { type: String, default: '' },
    requirements: { type: [String], default: [] },
    preferredTech: { type: [String], default: [] },
    projectType: { type: String, default: '' },
    expectedDuration: { type: String, default: '' },
    additionalRequirements: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
