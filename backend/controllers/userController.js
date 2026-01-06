const userDb = require('../models/userModel');
const { hashPassword, comparePassword } = require('../Utils/passwordUtilities');
const createToken = require('../Utils/generateToken');

// USER REGISTER
const userRegister = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const userExist = await userDb.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await userDb.create({ username, email, password: hashedPassword });

    // Generate JWT token
    const token = createToken(user._id, user.role);

    // Set cookie
    res.cookie('userToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { username: user.username, email: user.email, role: user.role },
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// USER LOGIN
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await userDb.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = createToken(user._id, user.role);

    // Set cookie
    res.cookie('userToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      user: { username: user.username, email: user.email, role: user.role },
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// USER LOGOUT
const userLogout = async (req, res) => {
  try {
    res.clearCookie('userToken', { path: '/' });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// GET CURRENT USER
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user; // set by auth middleware from JWT cookie
    const user = await userDb.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  getCurrentUser
};
