const express = require("express");
const router = express.Router();
const {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
} = require("../../Controllers/categoryController");

router.post("/", createCategory);
router.get("/", listCategories);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
