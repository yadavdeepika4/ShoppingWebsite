import React from 'react';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      // Generate a simple session ID for cart (in a real app, this would be handled differently)
      const sessionId = localStorage.getItem('sessionId') || 
                       Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);

      const response = await axios.post(`http://localhost:5000/api/cart/${sessionId}/add`, {
        productId: product._id,
        quantity: 1
      });

      if (response.data.success) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.imageUrl || '/images/default-product.jpg'} 
          alt={product.name}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDOTQuNDc3MiA3MCA5MCA3NC40NzcyIDkwIDgwVjEyMEM5MCAyNS41MjI4IDk0LjQ3NzIgMTMwIDEwMCAxMzBDMTA1LjUyMyAxMzAgMTEwIDEyNS41MjMgMTEwIDEyMFY4MEMxMTAgNzQuNDc3MiAxMDUuNTIzIDcwIDEwMCA3MFoiIGZpbGw9IiM2QjczODAiLz4KPHBhdGggZD0iTTcwIDEwMEM3MCA5NC40NzcyIDc0LjQ3NzIgOTAgODAgOTBIMTIwQzEyNS41MjMgOTAgMTMwIDk0LjQ3NzIgMTMwIDEwMEMxMzAgMTA1LjUyMyAxMjUuNTIzIDExMCAxMjAgMTEwSDgwQzc0LjQ3NzIgMTEwIDcwIDEwNS41MjMgNzAgMTAwWiIgZmlsbD0iIzZCNzM4MCIvPgo8L3N2Zz4K';
          }}
        />
        {product.featured && (
          <div className="featured-badge">Featured</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="product-actions">
          {product.inStock ? (
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary add-to-cart-btn"
            >
              Add to Cart
            </button>
          ) : (
            <button className="btn btn-secondary" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .product-image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .featured-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #e74c3c;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .product-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-name {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2c3e50;
          line-height: 1.3;
        }

        .product-description {
          color: #666;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .product-category {
          background: #ecf0f1;
          color: #7f8c8d;
          padding: 0.25rem 0.75rem;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .product-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #27ae60;
        }

        .product-actions {
          margin-top: auto;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 0.75rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .add-to-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }

        @media (max-width: 480px) {
          .product-info {
            padding: 1rem;
          }

          .product-name {
            font-size: 1rem;
          }

          .product-meta {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;