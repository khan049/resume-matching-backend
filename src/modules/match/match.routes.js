const express = require("express");
const router = express.Router();
const matchController = require("./match.controller");
const { authMiddleware } = require("../../middlewares/auth.middlewares");
const { roleMiddleware } = require("../../middlewares/role.middlewares");

// Compute matches (ADMIN / RECRUITER)
router.post(
  "/:jobId",
  authMiddleware,
  roleMiddleware(["ADMIN", "RECRUITER"]),
  matchController.computeMatches
);

// Get ranked candidates
router.get(
  "/:jobId/top",
  authMiddleware,
  roleMiddleware(["ADMIN", "RECRUITER"]),
  matchController.getTopCandidates
);

module.exports = router;
