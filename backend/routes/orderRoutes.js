const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.post('/order', auth, orderController.placeOrder);
router.get('/order/:orderId', auth, orderController.getOrderDetails);
router.get('/my-orders', auth, orderController.getUserOrders);
router.patch('/cancel/:orderId', auth, orderController.cancelOrder);

module.exports = router;
