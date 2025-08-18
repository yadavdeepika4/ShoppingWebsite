import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const sessionId = localStorage.getItem('sessionId') || 
                       Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);

      const response = await axios.get(`http://localhost:5000/api/cart/${sessionId}`);
      
      if (response.data.success) {
        setCart(response.data.data);
      } else {
        setError('Failed to fetch cart');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await axios.put(
        `http://localhost:5000/api/cart/${sessionId}/items/${itemId}`,
        { quantity: newQuantity }
      );

      if (response.data.success) {
        setCart(response.data.data);
      } else {
        alert('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Error updating quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${sessionId}/items/${itemId}`
      );

      if (response.data.success) {
        setCart(response.data.data);
      } else {
        alert('Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Error removing item');
    }
  };

  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear the cart?')) return;
    
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await axios.delete(`http://localhost:5000/api/cart/${sessionId}`);

      if (response.data.success) {
        setCart(response.data.data);
      } else {
        alert('Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Error clearing cart');
    }
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      {cart && cart.items && cart.items.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.product?.imageUrl || '/images/default-product.jpg'} 
                    alt={item.product?.name || 'Product'}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCAzNUM0Ny4yMzg2IDM1IDQ1IDM3LjIzODYgNDUgNDBWNjBDNDUgNjIuNzYxNCA0Ny4yMzg2IDY1IDUwIDY1QzUyLjc2MTQgNjUgNTUgNjIuNzYxNCA1NSA2MFY0MEM1NSAzNy4yMzg2IDUyLjc2MTQgMzUgNTAgMzVaIiBmaWxsPSIjNkI3MzgwIi8+CjxwYXRoIGQ9Ik0zNSA1MEMzNSA0Ny4yMzg2IDM3LjIzODYgNDUgNDAgNDVINjBDNjIuNzYxNCA0NSA2NSA0Ny4yMzg2IDY1IDUwQzY1IDUyLjc2MTQgNjIuNzYxNCA1NSA2MCA1NUg0MEMzNy4yMzg2IDU1IDM1IDUyLjc2MTQgMzUgNTBaIiBmaWxsPSIjNkI3MzgwIi8+Cjwvc3ZnPgo=';
                    }}
                  />
                </div>
                
                <div className="item-details">
                  <h3>{item.product?.name || 'Unknown Product'}</h3>
                  <p className="item-price">${item.price?.toFixed(2) || '0.00'}</p>
                  <p className="item-category">{item.product?.category}</p>
                </div>
                
                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button 
                  onClick={() => removeItem(item._id)}
                  className="remove-btn"
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Total Items:</span>
                <span>{cart.totalItems}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>${cart.totalAmount?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="cart-actions">
                <button onClick={clearCart} className="btn btn-secondary">
                  Clear Cart
                </button>
                <button className="btn btn-primary">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart to see them here.</p>
          <a href="/products" className="btn btn-primary">
            Continue Shopping
          </a>
        </div>
      )}

      <style jsx>{`
        .cart-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .cart-page h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #2c3e50;
          text-align: center;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 80px 1fr auto auto auto;
          gap: 1rem;
          align-items: center;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .cart-item:hover {
          transform: translateY(-2px);
        }

        .item-image {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details h3 {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        .item-price {
          font-size: 1rem;
          font-weight: 600;
          color: #27ae60;
          margin-bottom: 0.25rem;
        }

        .item-category {
          font-size: 0.875rem;
          color: #666;
          margin: 0;
        }

        .item-quantity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 0.25rem;
        }

        .quantity-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: #f8f9fa;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.125rem;
          font-weight: 600;
          transition: background-color 0.2s;
        }

        .quantity-btn:hover:not(:disabled) {
          background: #e9ecef;
        }

        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity {
          min-width: 40px;
          text-align: center;
          font-weight: 600;
        }

        .item-total {
          font-size: 1.125rem;
          font-weight: 700;
          color: #2c3e50;
          min-width: 80px;
          text-align: right;
        }

        .remove-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: #e74c3c;
          color: white;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .remove-btn:hover {
          background: #c0392b;
        }

        .cart-summary {
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        .summary-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .summary-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #2c3e50;
          text-align: center;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
        }

        .summary-row.total {
          border-top: 2px solid #ecf0f1;
          padding-top: 1rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #2c3e50;
        }

        .cart-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }

        .empty-cart {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-cart h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #666;
        }

        .empty-cart p {
          font-size: 1.125rem;
          color: #888;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .cart-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .cart-item {
            grid-template-columns: 60px 1fr auto;
            gap: 0.75rem;
            padding: 1rem;
          }

          .item-quantity {
            grid-column: 2;
            justify-self: start;
            margin-top: 0.5rem;
          }

          .item-total {
            grid-column: 3;
            grid-row: 1;
            justify-self: end;
          }

          .remove-btn {
            grid-column: 3;
            grid-row: 2;
            justify-self: end;
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;