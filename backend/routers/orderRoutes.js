const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

// Create new order (user only)
router.post("/", auth, orderController.createOrder);

// Get order by ID
router.get("/:id", auth, orderController.getOrderById);

// Get all orders (admin only)
router.get("/", auth, orderController.getAllOrders);

// Update status (admin only)
router.put("/:id/status", auth, orderController.updateOrderStatus);

// Delete order (admin only)
router.delete("/:id", auth, orderController.deleteOrder);

module.exports = router;