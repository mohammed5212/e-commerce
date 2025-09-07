const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { protect, admin, authorize } = require("../middleware/auth");

// USER ROUTES

// Create a new order (logged-in user)
router.post("/", protect, createOrder);

// Get logged-in user's order history
router.get("/my", protect, getUserOrders);

// Get single order by ID (must be logged in)
router.get("/:id", protect, getOrderById);

// ADMIN ROUTES

// Get all orders (Admin only)
router.get("/", protect, authorize ("admin"), getAllOrders);

// Update order status (Admin only)
router.put("/:id/status", protect, authorize ("admin"), updateOrderStatus);

// Delete an order (Admin only)
router.delete("/:id", protect,authorize ("admin"), deleteOrder);

module.exports = router;