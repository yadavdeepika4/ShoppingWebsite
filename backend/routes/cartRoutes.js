const express = require('express');
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} = require('../controllers/cartController');

const router = express.Router();

// GET /api/cart/:sessionId - Get cart by session ID
router.get('/:sessionId', getCart);

// POST /api/cart/:sessionId/add - Add item to cart
router.post('/:sessionId/add', addToCart);

// PUT /api/cart/:sessionId/items/:itemId - Update cart item quantity
router.put('/:sessionId/items/:itemId', updateCartItem);

// DELETE /api/cart/:sessionId/items/:itemId - Remove item from cart
router.delete('/:sessionId/items/:itemId', removeFromCart);

// DELETE /api/cart/:sessionId - Clear cart
router.delete('/:sessionId', clearCart);

module.exports = router;