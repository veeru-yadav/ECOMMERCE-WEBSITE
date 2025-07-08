const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const upload = require('../middleware/upload');
const auth = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');
const isAdmin = require('../middleware/isAdminMiddleware');
const router = express.Router();


router.get('/', getAllProducts);
// handle file
router.post('/', auth, upload.single('image'),productController.addProduct );
// DELETE /api/products/:id
router.delete('/:id', auth, isAdmin, productController.deleteProduct);
// Updating
router.put('/:id', auth, isAdmin, upload.single('image'), productController.updateProduct);
//Get Single Product
router.get('/:id', productController.getProductById);

module.exports = router;

