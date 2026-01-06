const express = require("express");
const {
  userRegister,
 userLogin,
   userLogout,
  getCurrentUser,
} = require("../../Controllers/userController");

const authUser = require("../../Middlewares/authUser");

const router = express.Router();

// Public routes
router.post("/register", userRegister);
router.post("/login", userLogin);

// Protected routes
router.get("/me", authUser, getCurrentUser);

// Logout user
router.get("/logout", authUser, userLogout);

module.exports = router;
