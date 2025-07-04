const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const upload = require('../middleware/upload');
const auth = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');
const router = express.Router();


router.get('/', getAllProducts);
router.post('/', auth, upload.single('image'),  // handle file
  productController.addProduct );

module.exports = router;

