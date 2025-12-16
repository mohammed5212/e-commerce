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
        const newUser = new userDb({ username, email, password:hashedPassword });
        
        const saved = await newUser.save();
        if (saved) {
          const token = createToken(saved._id);
          res.cookie("token",token)

return res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          username: saved.username,
          email: saved.email,
         role: saved.role 
          
        },
      });        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message ||  'Server error' });
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);

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
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
      const token = createToken(userExist._id, userExist.role);
          res.cookie("token",token)

    
       return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        username: userExist.username,
        email: userExist.email,
        role: userExist.role

        
      }
    });
   

  } catch (error) {
     console.log(error);
        res.status(error.status || 500).json({ error:error.message ||  'Server error' });
  }
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


module.exports = {
  register,
  login,
  logout
};