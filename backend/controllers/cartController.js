const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // from auth middleware

  try {
    const existing = await Cart.findOne({ where: { userId, productId } });
    if (existing) {
      existing.quantity += quantity || 1;
      await existing.save();
    } else {
      await Cart.create({ userId, productId, quantity: quantity || 1 });
    }
    res.json({ message: 'Product added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cartItems = await Cart.findAll({ where: { userId }, include: [{ model: Product, as: 'Product' }] });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    await Cart.destroy({ where: { userId, productId } });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

// PATCH /api/cart/:productId
exports.updateCartQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  try {
    const cartItem = await Cart.findOne({ where: { userId, productId } });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Prevent 0 or negative quantity
    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: 'Quantity updated', cartItem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update quantity' });
  }
};
