
const Product = require('../models/ProductModel');
const path = require('path');

// Create Product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: '❌ No image file uploaded' });
    }

    const imageUrl = `/assets/${imageFile.filename}`; // Save relative path

    const product = await Product.create({
      name,
      price,
      description,
      image: imageUrl,
      category
    });

    res.status(201).json({ message: '✅ Product created successfully', product });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: '❌ Failed to add product' });
  }
};


// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};
