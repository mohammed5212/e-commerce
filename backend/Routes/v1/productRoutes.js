const express = require("express");
const upload = require("../../Middlewares/multer");
const authAdmin = require("../../Middlewares/authAdmin");

const {
  create,
  listProducts,
  productDetails,
  updateProduct,
  deleteProduct,
} = require("../../Controllers/productController");

const router = express.Router();

// CREATE PRODUCT (ADMIN)
router.post("/", authAdmin, upload.single("image"), create);

// GET ALL PRODUCTS (PUBLIC)
router.get("/", listProducts);

// GET SINGLE PRODUCT
router.get("/:id", productDetails);

// UPDATE PRODUCT (ADMIN)
router.put("/:id", authAdmin, upload.single("image"), updateProduct);

// DELETE PRODUCT (ADMIN)
router.delete("/:id", authAdmin, deleteProduct);

module.exports = router;
