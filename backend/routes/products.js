const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, getAllProducts);
router.get('/:id', authenticateToken, getProductById);

module.exports = router;
