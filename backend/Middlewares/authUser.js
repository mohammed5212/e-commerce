const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token; //  read from cookie

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "User access only" });
    }

    req.user = decoded.id;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authUser;