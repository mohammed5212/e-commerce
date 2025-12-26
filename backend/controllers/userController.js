const userDb = require('../models/userModel');
const { hashPassword, comparePassword } = require('../Utils/passwordUtilities');
const createToken = require('../Utils/generateToken');


const register =async (req, res) => {
    try {
        const { username, email, password ,confirmpassword } = req.body;
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
        const user = await userDb.create({ username, email, password:hashedPassword });
        
           const token = createToken(user._id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

return res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          username: user.username,
          email: user.email,
         role: user.role 
          
        },
      });        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message ||  'Server error' });
    }
}

const login = async (req, res) => {
  // try {
    const { email, password } = req.body;
   
    // Check fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const userExist = await userDb.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }

    // Match password
    const passwordMatch = await comparePassword(password, userExist.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    console.log("User authenticated successfully");
      const token = createToken(userExist._id, userExist.role);
           res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Generated Token:");
       return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        username: userExist.username,
        email: userExist.email,
        role: userExist.role

        
      }
    });
   

  // } catch (error) {
  //    console.log(error);
  //       res.status(error.status || 500).json({ error:error.message ||  'Server error' });
  // }
};
 const logout = async (req, res) => {
  try {
    res.clearCookie("token");   
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "Server error" });
  } 
};
///get current user
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user; // Assuming authUser middleware sets req.user
    const user = await userDb.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || 'Server error' });
  } 
};



module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};