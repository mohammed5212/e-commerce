
const express = require('express');
const {
  registerAdmin,loginAdmin,logoutAdmin} = require('../../Controllers/adminController');
const router = express.Router();
const authAdmin = require('../../Middlewares/authAdmin');

// Public routes
router.post('/register',registerAdmin);
router.post('/login', loginAdmin);

// Protected route example
router.get('/dashboard', authAdmin, (req, res) => {
  res.json({
    message: "Admin dashboard access granted",
    adminId: req.admin
  });
});

// Logout admin
router.get('/logout', logoutAdmin);

module.exports = router;