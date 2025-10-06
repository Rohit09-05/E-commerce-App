const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Admin (for now public)
const createProduct = async (req, res) => {
  const { name, imageUrl, description, price } = req.body;

  if(!name || !imageUrl || !price) {
    return res.status(400).json({ message: 'Name, imageUrl and price are required' });
  }

  try {
    const product = new Product({ name, imageUrl, description, price });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin (for now public)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(product) {
      product.name = req.body.name || product.name;
      product.imageUrl = req.body.imageUrl || product.imageUrl;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin (for now public)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(product) {
  await product.deleteOne();
  res.json({ message: 'Product removed' });
} else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
