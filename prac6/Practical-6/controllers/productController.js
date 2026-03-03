const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price required" });
    }
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
