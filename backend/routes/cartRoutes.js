const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');


router.post('/cart', authMiddleware, cartController.addToCart);
router.get('/cart', authMiddleware, cartController.getCart);
router.delete('/cart/:productId', authMiddleware, cartController.removeFromCart);
router.patch('/cart/:productId', authMiddleware, cartController.updateCartQuantity);

module.exports = router;
