const Resume = require("./resume.model");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resume = await Resume.create({
      candidateId: req.user.userId,
      originalFileName: req.file.originalname,
      storagePath: req.file.location, // S3 URL
      status: "UPLOADED"
    });

    res.status(201).json({
      message: "Resume uploaded to S3",
      resumeId: resume._id,
      fileUrl: req.file.location
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get Resume by ID
 */
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // candidate can only see their own resume
    if (resume.candidateId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
