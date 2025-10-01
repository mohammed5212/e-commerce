import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRoutes from "./routers/authRoutes.js";
import orderRoutes from "./routers/orderRoutes.js";
import connectDB from "./config/db.js";
connectDB();
import userRoutes from "./routers/userRoutes.js";
import productRoutes from "./routers/productRoutes.js";
import categoryRoutes from "./routers/categoryRoutes.js";
import cartRoutes from "./routers/cartRoutes.js";
import paymentRoutes from "./routers/paymentRoutes.js";
const app = express(); 
// Middleware 
 app.use(cors()); 
 app.use(express.json()); // 
// Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes); 
  app.use("/api/orders", orderRoutes); 
  app.use("/api/categories", categoryRoutes);
  app.use("/api/cart", cartRoutes);        // All cart-related endpoints
app.use("/api/payment", paymentRoutes);  // All payment-related endpoints
// // Example root
  app.get("/", (req, res) => {
 res.send("API is running..."); 
 });
 
 export default  app;