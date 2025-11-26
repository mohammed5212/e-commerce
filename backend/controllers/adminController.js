const admindb = require("../models/adminModel");
const { hashPassword } = require("../Utils/passwordUtilities");
const { comparePassword } = require("../Utils/passwordUtilities");
const generateToken = require("../Utils/generateToken");

// const register = async (req, res) => {

//     try {
//         const { email, password } = req.body;
//         // Check fields
//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         const alreadExist = await admindb.findOne({ email})
//         if (alreadExist) {
//             return res.status(400).json({ message: "Admin already exist" });
//         }  
//         const hashedPassword = await hashPassword(password);
//         const newAdmin = new admindb({ email, password:hashedPassword });
//         const saved = await newAdmin.save();
//         if (saved) {
//             return res.status(201).json({ message: "Admin registered successfully" ,saved});
//         }
//     }catch (error) {
//         console.log(error);
//         res.status(error.status || 500).json({ error:error.message ||  'Server error' });
//     }
// }

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
          email: saved.email
         
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

        //  Check missing fields
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields." });
        }

        //  Find the Admin by Email
        const admin = await admindb.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // 3. Compare Password
      
        const isMatch = await comparePassword(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        //  Generate JWT Token
        // Assumes generateToken creates a JWT
        const token = generateToken(admin._id);

  
        return res.status(200).json({
            message: "Login successful.",
            token: token,
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