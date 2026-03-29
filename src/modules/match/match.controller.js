const Resume = require("../resume/resume.model");
const Job = require("../job/job.model");
const Match = require("./match.model");

/**
 * Score calculation logic
 */
const calculateScore = (resume, job) => {
  let skillsScore = 0;
  let experienceScore = 0;
  let educationScore = 0;

  // Skill Matching
  const matchedSkills = resume.parsedData.skills.filter((skill) =>
    job.requiredSkills.includes(skill),
  );

  skillsScore = (matchedSkills.length / job.requiredSkills.length) * 50;

  // Experience Matching
  if (resume.parsedData.experience >= job.minExperience) {
    experienceScore = 30;
  } else {
    experienceScore = (resume.parsedData.experience / job.minExperience) * 30;
  }

  // Education Bonus (simple rule)
  if (resume.parsedData.education?.toLowerCase().includes("computer")) {
    educationScore = 20;
  }

  const totalScore = skillsScore + experienceScore + educationScore;

  return {
    totalScore: Math.min(Math.round(totalScore), 100),
    breakdown: {
      skillsScore,
      experienceScore,
      educationScore,
    },
  };
};

/**
 * Compute matches for a job
 */
exports.computeMatches = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const resumes = await Resume.find({ status: "PROCESSED" });

    for (let resume of resumes) {
      const { totalScore, breakdown } = calculateScore(resume, job);

      await Match.findOneAndUpdate(
        {
          resumeId: resume._id,
          jobId: job._id,
        },
        {
          score: totalScore,
          breakdown,
          createdAt: new Date(),
        },
        {
          upsert: true,
          new: true,
        },
      );
    }

    res.json({ message: "Matching completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get Top Candidates
 */
exports.getTopCandidates = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const matches = await Match.find({ jobId: req.params.jobId })
      .sort({ score: -1 })
      .limit(Number(limit))
      .populate("resumeId");

    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
