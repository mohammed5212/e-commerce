const admindb = require("../models/adminModel");
const { hashPassword } = require("../Utils/passwordUtilities");

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
module.exports = {register};