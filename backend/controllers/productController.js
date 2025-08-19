const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    
    let query = { inStock: true };
    
    // Add category filter if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Add search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Product.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalProducts: total,
          hasNext: skip + products.length < total,
          hasPrev: page > 1
        }
      },
      message: 'Products fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product,
      message: 'Product fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Get product categories
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    
    res.json({
      success: true,
      data: categories,
      message: 'Categories fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getCategories
};