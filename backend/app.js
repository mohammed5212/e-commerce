const express = require("express"); 
const dotenv = require("dotenv"); 
const cors = require("cors"); 
const orderRoutes = require("./routers/orderRoutes");
const app = express(); 
dotenv.config(); 
// Middleware 
 app.use(cors()); 
 app.use(express.json()); // 
// Routes
  app.use("/api/auth", require("./routers/authRoutes"));
  app.use("/api/orders", orderRoutes); 
// // Example root
  app.get("/", (req, res) => {
 res.send("API is running..."); 
 }); module.exports = app;