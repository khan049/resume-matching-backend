const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  breakdown: {
    skillsScore: Number,
    experienceScore: Number,
    educationScore: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔥 Index for ranking queries
MatchSchema.index({ jobId: 1, score: -1 });
MatchSchema.index({ resumeId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model("Match", MatchSchema);
