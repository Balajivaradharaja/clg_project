const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, stock, expiry } = req.body;
    if (!name || stock === undefined) {
      return res.status(400).json({ message: "Name and stock are required" });
    }

    const newProduct = new Product({ name, stock, expiry });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { name, stock, expiry } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, stock, expiry },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    console.log('Attempting to delete product with ID:', req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {        
    console.error('Error in deleting product:', err);
    res.status(500).json({ error: err.message });
  }
};
exports.orderProduct = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    product.stock -= quantity;
    await product.save();
    res.json({ message: 'Order placed successfully', product });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};
