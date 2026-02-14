const express = require("express");
const router = express.Router();
const jobController = require("./job.controller");
const { authMiddleware } = require("../../middlewares/auth.middlewares");
const { roleMiddleware } = require("../../middlewares/role.middlewares");

// Create Job (only ADMIN or RECRUITER)
router.post("/", authMiddleware, roleMiddleware(["ADMIN", "RECRUITER"]), jobController.createJob);

// Get Job by ID
router.get("/:id", authMiddleware, jobController.getJob);

// List Jobs (any logged-in user)
router.get("/", authMiddleware, jobController.listJobs);

module.exports = router;
