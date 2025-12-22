const { uploadToCloudinary } = require("../Utils/imageUpload");
const ProductDb = require("../models/productModel");
const CategoryDb = require("../models/categoryModel");

/**
 * CREATE PRODUCT
 */
const create = async (req, res) => {
  try {
    const { title, price, category } = req.body;

    if (!title || !price || !category || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check category exists
    const isCategoryExist = await CategoryDb.findById(category);
    if (!isCategoryExist) {
      return res.status(404).json({ message: "Category not found" });
    }

    const cloudinaryRes = await uploadToCloudinary(req.file.path);

    const newProduct = new ProductDb({
      title,
      price,
      category,
      image: cloudinaryRes,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

/**
 * LIST PRODUCTS
 */
const listProducts = async (req, res) => {
  try {
    const products = await ProductDb.find()
      .populate("category", "name");

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * PRODUCT DETAILS
 */
const productDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await ProductDb.findById(productId)
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * UPDATE PRODUCT
 */
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, price, category } = req.body;

    const product = await ProductDb.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = product.image;

    if (req.file) {
      const cloudinaryRes = await uploadToCloudinary(req.file.path);
      imageUrl = cloudinaryRes;
    }

    // validate category if provided
    if (category) {
      const isCategoryExist = await CategoryDb.findById(category);
      if (!isCategoryExist) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const updatedProduct = await ProductDb.findByIdAndUpdate(
      productId,
      {
        title: title || product.title,
        price: price || product.price,
        category: category || product.category,
        image: imageUrl,
      },
      { new: true }
    ).populate("category", "name");

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

/**
 * DELETE PRODUCT
 */
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await ProductDb.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = {
  create,
  listProducts,
  productDetails,
  updateProduct,
  deleteProduct,
};
