const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const { authMiddleware } = require("../../middlewares/auth.middlewares");

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

//me
router.get("/me", authMiddleware, authController.me);

module.exports = router;
