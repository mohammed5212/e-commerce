const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

/* ADD TO CART */
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  res.status(200).json(cart);
};

/* GET CART */
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate("items.product");

  res.status(200).json(cart || { items: [] });
};

/* REMOVE ITEM */
exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  await cart.save();
  res.status(200).json(cart);
};

/* CLEAR CART */
exports.clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user.id });
  res.status(200).json({ message: "Cart cleared" });
};
