const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: { type: [String], default: [] },
  optionalSkills: { type: [String], default: [] },
  minExperience: { type: Number, default: 0 }, // in years
  location: { type: String, default: "Remote" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

// Text index for skills and title search
JobSchema.index({ title: "text", requiredSkills: "text", optionalSkills: "text" });

// Compound index for filtering by creator + experience
JobSchema.index({ createdBy: 1, minExperience: 1 });

module.exports = mongoose.model("Job", JobSchema);
