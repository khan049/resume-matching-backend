const express = require("express");
const router = express.Router();
const resumeController = require("./resume.controller");
const { authMiddleware } = require("../../middlewares/auth.middlewares");
const { roleMiddleware } = require("../../middlewares/role.middlewares");

// Upload resume (CANDIDATE only)
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware(["CANDIDATE"]),
  resumeController.uploadResume
);

// Get resume by ID
router.get(
  "/:id",
  authMiddleware,
  resumeController.getResume
);

module.exports = router;
