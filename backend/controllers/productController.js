
const Product = require('../models/ProductModel');

// Create Product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;

    if (!name || !price || !description || !image || !category) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newProduct = await Product.create({
      name,
      price,
      description,
      image,
      category
    });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Server error while adding product' });
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
