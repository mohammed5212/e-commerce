const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { initiatePayment, getPaymentDetails } = require("../controllers/paymentController");

// pay for an order
router.post("/", protect, initiatePayment);

// get payment details for an order
router.get("/:orderId", protect, getPaymentDetails);

module.exports = router;