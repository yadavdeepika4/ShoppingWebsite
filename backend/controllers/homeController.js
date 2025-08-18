const Product = require('../models/Product');

// Get featured products for home page
const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true, inStock: true })
      .limit(6)
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: featuredProducts,
      message: 'Featured products fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products',
      error: error.message
    });
  }
};

// Get home page data (featured products + stats)
const getHomeData = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true, inStock: true })
      .limit(6)
      .sort({ createdAt: -1 });
    
    const totalProducts = await Product.countDocuments({ inStock: true });
    const categories = await Product.distinct('category');
    
    res.json({
      success: true,
      data: {
        featuredProducts,
        stats: {
          totalProducts,
          categories: categories.length
        }
      },
      message: 'Home data fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching home data',
      error: error.message
    });
  }
};

module.exports = {
  getFeaturedProducts,
  getHomeData
};