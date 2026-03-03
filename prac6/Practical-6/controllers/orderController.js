const Order = require("../models/Order");
const cartController = require("./cartController");

exports.placeOrder = async (req, res) => {
  try {
    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({ error: "No items in order" });
    }
    const order = new Order({ items: req.body.items });
    await order.save();
    await cartController.clearCart();
    res.json({ message: "Order placed", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
