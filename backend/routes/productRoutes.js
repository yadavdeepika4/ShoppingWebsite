const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  getCategories 
} = require('../controllers/productController');

const router = express.Router();

// GET /api/products - Get all products with pagination and filters
router.get('/', getAllProducts);

// GET /api/products/categories - Get all categories
router.get('/categories', getCategories);

// GET /api/products/:id - Get single product by ID
router.get('/:id', getProductById);

module.exports = router;