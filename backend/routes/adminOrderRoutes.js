const express = require('express');
const router = express.Router();
const adminOrderController = require('../controllers/adminOrderController');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');

router.get('/orders', auth, isAdmin, adminOrderController.getAllOrdersForAdmin);
router.put('/orders/:id', auth, isAdmin, adminOrderController.updateOrderStatus);

module.exports = router;
