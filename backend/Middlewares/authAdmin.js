const jwt = require("jsonwebtoken");

const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token) //  READ FROM COOKIE

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    req.admin = decoded.id;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authAdmin;






