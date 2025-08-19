import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    page: 1
  });
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      params.append('page', filters.page);
      params.append('limit', '12');

      const response = await axios.get(`http://localhost:5000/api/products?${params}`);
      
      if (response.data.success) {
        setProducts(response.data.data.products);
        setPagination(response.data.data.pagination);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1 // Reset page when other filters change
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled by useEffect when filters.search changes
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-list">
      {/* Filters */}
      <div className="filters">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="category-filter">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <div className="products-info">
                <p>{pagination?.totalProducts} products found</p>
              </div>
              <div className="grid grid-4">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handleFilterChange('page', filters.page - 1)}
                disabled={!pagination.hasPrev}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <span className="page-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handleFilterChange('page', filters.page + 1)}
                disabled={!pagination.hasNext}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .product-list {
          max-width: 1200px;
          margin: 0 auto;
        }

        .filters {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          flex-wrap: wrap;
          align-items: end;
        }

        .search-form {
          display: flex;
          gap: 0.5rem;
          flex: 1;
          min-width: 300px;
        }

        .search-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .category-filter {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .category-filter label {
          font-weight: 500;
          color: #555;
        }

        .category-select {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          min-width: 180px;
        }

        .products-info {
          margin-bottom: 1rem;
          color: #666;
        }

        .no-products {
          text-align: center;
          padding: 3rem;
          color: #666;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 3rem;
          padding: 2rem;
        }

        .page-info {
          font-weight: 500;
          color: #555;
        }

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
            gap: 1rem;
          }

          .search-form {
            min-width: auto;
          }

          .category-select {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;