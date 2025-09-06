const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, ref: "User", // reference to User model
      required: true
    },
    shippingAddress: {
      type: Object,  required: true
    },
    orderDate: {
      type: Date, default: Date.now
    },
    status: {
      type: String,  enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    totalAmount: {
      type: Number, required: true
    }
  },
  { timestamps: true }
);

// 🔹 Virtual populate (Order → OrderItems)//
orderSchema.virtual("orderItems", {
  ref: "OrderItem",         // The model to use//
  localField: "_id",        // Find OrderItems where `order_id` = this._id//
  foreignField: "order_id"
});

// Enable virtuals in JSON and objects//
orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Order", orderSchema);