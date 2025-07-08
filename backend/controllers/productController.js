
const Product = require('../models/ProductModel');
const path = require('path');
const fs = require('fs');
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

//Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Remove associated image from assets (if not default)
    if (product.image && product.image !== '/assets/default.jpg') {
      const imagePath = path.join(__dirname, '..', 'public', product.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Failed to delete image:', err.message);
        } else {
          console.log('Deleted product image:', imagePath);
        }
      });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};


// @desc Update product by ID (admin only)
// @route PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, description, category } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // If a new image is uploaded, delete the old one
    if (req.file) {
      const oldImagePath = path.join(__dirname, '..', 'public', product.image);
      if (product.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      product.image = `/assets/${req.file.filename}`;
    }

    // Update fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;

    await product.save();

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
