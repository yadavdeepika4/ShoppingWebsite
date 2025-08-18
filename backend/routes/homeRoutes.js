const express = require('express');
const { getFeaturedProducts, getHomeData } = require('../controllers/homeController');

const router = express.Router();

// GET /api/home/featured - Get featured products
router.get('/featured', getFeaturedProducts);

// GET /api/home - Get home page data
router.get('/', getHomeData);

module.exports = router;