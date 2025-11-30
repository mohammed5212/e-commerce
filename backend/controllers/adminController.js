const adminDb = require('../Models/adminModel');
const { hashPassword, comparePassword } = require('../Utils/passwordUtilities');
const createToken = require('../Utils/generateToken');

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
    const newAdmin = new adminDb({ email, password: hashedPassword });
    const savedAdmin = await newAdmin.save();

    // Create JWT token
    const token = createToken(savedAdmin._id, "admin");

    return res.status(201).json({
      message: 'Admin registered successfully',
      token, 
      admin: { email: savedAdmin.email }
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
    if (!admin)
      return res.status(400).json({ message: 'Admin not found' });

    const passwordMatch = await comparePassword(password, admin.password);
    if (!passwordMatch)
      return res.status(400).json({ message: 'Invalid password' });

    // Create token
    const token = createToken(admin._id, "admin");

    return res.status(200).json({
      message: 'Login successful',
      token,
      admin: { email: admin.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// LOGOUT ADMIN 
const logoutAdmin = async (req, res) => {
  try {
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

module.exports = { registerAdmin, loginAdmin, logoutAdmin };