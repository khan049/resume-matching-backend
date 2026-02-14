const Job = require("./job.model");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const { title, description, requiredSkills, optionalSkills, minExperience, location } = req.body;

    const job = await Job.create({
      title,
      description,
      requiredSkills,
      optionalSkills,
      minExperience,
      location,
      createdBy: req.user.userId
    });

    res.status(201).json({ message: "Job created", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Job by ID
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// List Jobs with filtering and pagination
exports.listJobs = async (req, res) => {
  try {
    const { skill, minExp, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (skill) filter.$text = { $search: skill };
    if (minExp) filter.minExperience = { $gte: Number(minExp) };

    const jobs = await Job.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
