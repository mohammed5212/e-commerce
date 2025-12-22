const CategoryDb = require("../models/categoryModel");
const ProductDb = require("../models/productModel");

/**
 * CREATE CATEGORY
 */
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const isExist = await CategoryDb.findOne({ name });
    if (isExist) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await CategoryDb.create({ name });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * LIST CATEGORIES
 */
const listCategories = async (req, res) => {
  try {
    const categories = await CategoryDb.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * UPDATE CATEGORY
 */
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await CategoryDb.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE CATEGORY
 * (only if no products exist)
 */
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await ProductDb.find({ category: categoryId });

    if (products.length > 0) {
      return res.status(400).json({
        message: "Cannot delete category with existing products",
      });
    }

    await CategoryDb.findByIdAndDelete(categoryId);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
};
