const Resume = require("../modules/resume/resume.model");

/**
 * Mock resume parser
 * Later this can be replaced with real PDF parsing
 */
const parseResumeMock = (fileName) => {
  // Simple simulation logic
  return {
    skills: ["Node.js", "Express", "MongoDB"],
    experience: 2,
    education: "B.Tech Computer Science"
  };
};

/**
 * Worker Function
 */
const processResumes = async () => {
  try {
    // Find resumes that are UPLOADED
    const resumes = await Resume.find({ status: "UPLOADED" });

    for (let resume of resumes) {
      console.log(`Processing resume: ${resume._id}`);

      // Update status → PROCESSING
      resume.status = "PROCESSING";
      await resume.save();

      // Simulate parsing
      const parsedData = parseResumeMock(resume.originalFileName);

      // Update resume with parsed data
      resume.parsedData = parsedData;
      resume.status = "PROCESSED";

      await resume.save();

      console.log(`Resume processed: ${resume._id}`);
    }
  } catch (error) {
    console.error("Worker error:", error);
  }
};

/**
 * Poll every 10 seconds
 */
setInterval(processResumes, 10000);

module.exports = processResumes;
