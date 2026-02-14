const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  originalFileName: {
    type: String,
    required: true
  },

  storagePath: {
    type: String,
    required: true
    // later this becomes S3 URL
  },

  parsedData: {
    skills: { type: [String], default: [] },
    experience: { type: Number, default: 0 }, // years
    education: { type: String }
  },

  status: {
    type: String,
    enum: ["UPLOADED", "PROCESSING", "PROCESSED", "FAILED"],
    default: "UPLOADED"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Indexes (backend signal 🔥)
 */
ResumeSchema.index({ candidateId: 1 });
ResumeSchema.index({ status: 1 });

module.exports = mongoose.model("Resume", ResumeSchema);
