const express = require("express"); 
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");  
const orderRoutes = require("./routers/orderRoutes");
const userRoutes = require("./routers/userRoutes");
const productRoutes = require("./routers/productRoutes");
const categoryRoutes = require("./routers/categoryRoutes");
const cartRoutes = require("./routers/cartRoutes");
const paymentRoutes = require("./routers/paymentRoutes");
const app = express(); 
// Middleware 
 app.use(cors()); 
 app.use(express.json()); // 
// Routes
  app.use("/api/auth", require("./routers/authRoutes"));
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes); 
  app.use("/api/orders", orderRoutes); 
  app.use("/api/categories", categoryRoutes);
  app.use("/api/cart", cartRoutes);        // All cart-related endpoints
app.use("/api/payment", paymentRoutes);  // All payment-related endpoints
// // Example root
  app.get("/", (req, res) => {
 res.send("API is running..."); 
 }); module.exports = app;