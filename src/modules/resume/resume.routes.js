const express = require("express");
const router = express.Router();
const resumeController = require("./resume.controller");
const { authMiddleware } = require("../../middlewares/auth.middlewares");
const { roleMiddleware } = require("../../middlewares/role.middlewares");
const upload = require("../../middlewares/upload.middleware");


// Upload resume (CANDIDATE only)
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware(["CANDIDATE"]),
  upload.single("resume"),
  resumeController.uploadResume
);

// Get resume by ID
router.get(
  "/:id",
  authMiddleware,
  resumeController.getResume
);

module.exports = router;
