const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { createProduct, getProducts } = require("../controllers/productController");

// Public route
router.get("/", getProducts);

// Protected (only logged-in users)
router.post("/", protect, authorize("admin"), createProduct);

module.exports = router;