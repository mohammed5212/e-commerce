const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");

// Routes
router.get("/",protect, getCategories);       // GET all categories
router.post("/",protect , createCategory);     // POST new category
router.put("/:id", protect ,updateCategory);   // PUT update category
router.delete("/:id", protect ,deleteCategory);// DELETE category

module.exports = router;