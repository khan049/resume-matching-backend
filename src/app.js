const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.route");
const jobRoutes = require("./modules/job/job.routes");
const resumeRoutes = require("./modules/resume/resume.routes");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/resumes", resumeRoutes);




app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy" });
});

module.exports = app;
