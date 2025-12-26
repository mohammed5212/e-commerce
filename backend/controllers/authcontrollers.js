// const userDb = require("../models/userModel");
// const adminDb = require("../models/adminModel");
// const { comparePassword } = require("../Utils/passwordUtilities");
// const createToken = require("../Utils/generateToken");

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     //  Check ADMIN first
//     let account = await adminDb.findOne({ email });
//     let role = "admin";

//     //  If not admin → check USER
//     if (!account) {
//       account = await userDb.findOne({ email });
//       role = "user";
//     }

//     if (!account) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await comparePassword(password, account.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     //  Create JWT with role
//     const token = createToken(
//        account._id,
//       role,
//     );
//      res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//       path: "/",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       token,
//       user: {
//         id: account._id,
//         email: account.email,
//         role,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Login failed", error });
//   }
// };

// module.exports = { login };
