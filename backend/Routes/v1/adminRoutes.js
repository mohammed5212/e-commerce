const  express = require('express');
const {
  registerAdmin,loginAdmin,logoutAdmin,getAdminDetails} = require('../../Controllers/adminController');
const authAdmin = require('../../Middlewares/authAdmin');
const router = express.Router();

// Public routes
router.post('/register',registerAdmin);
router.post('/login', loginAdmin);

// Protected route example
router.get('/me', authAdmin, getAdminDetails
);

// Logout admin
router.get('/logout', authAdmin, logoutAdmin);

module.exports = router;