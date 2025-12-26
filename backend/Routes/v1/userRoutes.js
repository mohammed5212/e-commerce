const express = require("express");
const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../../Controllers/userController");

const authUser = require("../../Middlewares/authUser");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", authUser, getCurrentUser);

// Logout user
router.get("/logout", authUser, logout);

module.exports = router;
