


const adminDb = require('../models/adminModel');
const { hashPassword, comparePassword  } = require('../Utils/passwordUtilities');
const createToken = require('../Utils/generateToken');
const { login } = require('./userController');

// REGISTER ADMIN
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const adminExist = await adminDb.findOne({ email });
    if (adminExist) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(password);
    const admin = await adminDb.create({ email, password: hashedPassword });

    // Create JWT token
    const token = createToken(admin._id, admin.role);

    return res.status(201).json({
      message: 'Admin registered successfully',
      user: {
        email: admin.email,
        role: admin.role,
      },
      token, // frontend stores in localStorage
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    const admin = await adminDb.findOne({ email });
    if (!admin){
      login(req, res); 
      return;           
        
    }

    const passwordMatch = await comparePassword(password, admin.password);
    if (!passwordMatch)
      return res.status(400).json({ message: 'Invalid password' });

    // Create token
    const token = createToken(admin._id, admin.role);
     res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Admin login success",
      user: {
        email: admin.email,
        role: admin.role,
        token, // send token to frontend
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// LOGOUT ADMIN (for SPA, just frontend delete token)
const logoutAdmin = async (req, res) => {
  try {
    // Just inform frontend to remove token
    res.status(200).json({ message: "Admin logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ADMIN DETAILS
const getAdminDetails = async (req, res) => {
  try {
    // req.admin comes from header-based auth middleware
    const adminId = req.admin;

    const admin = await adminDb.findById(adminId).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

module.exports = { registerAdmin, loginAdmin, logoutAdmin, getAdminDetails };


