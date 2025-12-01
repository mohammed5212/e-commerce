const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "Access denied, user only" });
    }

    req.user = decoded.id; // Attach user ID
    next();

  } catch (error) {
    return res.status(401).json({ error:error.message || "Invalid token" });
  }
};

module.exports = authUser;