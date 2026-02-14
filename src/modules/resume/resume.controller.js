const Resume = require("./resume.model");

/**
 * Upload Resume (metadata only for now)
 * Async-ready design
 */
exports.uploadResume = async (req, res) => {
  try {
    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).json({ message: "File name required" });
    }

    const resume = await Resume.create({
      candidateId: req.user.userId,
      originalFileName: fileName,
      storagePath: `/uploads/${fileName}`, // placeholder for now
      status: "UPLOADED"
    });

    /**
     * IMPORTANT:
     * We DO NOT process the resume here.
     * This keeps API fast & scalable.
     */

    res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId: resume._id,
      status: resume.status
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
