const admindb = require("../models/adminModel");
const { hashPassword } = require("../Utils/passwordUtilities");
const { comparePassword } = require("../Utils/passwordUtilities");
const generateToken = require("../Utils/generateToken");

const register = async (req, res) => {

    try {
        const { email, password } = req.body;
        // Check fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const alreadExist = await admindb.findOne({ email})
        if (alreadExist) {
            return res.status(400).json({ message: "Admin already exist" });
        }  
        const hashedPassword = await hashPassword(password);
        const newAdmin = new admindb({ email, password:hashedPassword });
        const saved = await newAdmin.save();
        if (saved) {
            return res.status(201).json({ message: "Admin registered successfully" ,saved});
        }
    }catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message ||  'Server error' });
    }
}





const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check missing fields
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields." });
        }

        // 2. Find Admin by Email
        const admin = await admindb.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // 3. Compare Password
        const isMatch = await comparePassword(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // 4. Generate JWT Token
        const token = generateToken(admin._id);
         res.cookie("token",token)

       
      
        return res.status(200).json({
            message: "Login successful.",
            admin: {
                _id: admin._id,
                email: admin.email,
            },
        });
       
    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({ message: "Server error during login." });
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