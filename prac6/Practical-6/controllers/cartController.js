const Cart = require("../models/Cart");

// Simple cart logic: maintain a single cart document
async function getOrCreateCart() {
  let cart = await Cart.findOne();
  if (!cart) {
    cart = new Cart({ items: [] });
    await cart.save();
  }
  return cart;
}

exports.addToCart = async (req, res) => {
  try {
    const { product, quantity = 1 } = req.body;
    if (!product) {
      return res.status(400).json({ error: "Product required" });
    }
    const cart = await getOrCreateCart();
    cart.items.push({ product, quantity });
    await cart.save();
    res.json({ message: "Added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.clearCart = async () => {
  await Cart.deleteMany({});
};
