import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../ProductListing/ProductCard';

const HomePage = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/home');
      if (response.data.success) {
        setHomeData(response.data.data);
      } else {
        setError('Failed to fetch home data');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching home data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading home page...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopEasy</h1>
          <p>Discover amazing products at great prices</p>
          <div className="hero-stats">
            {homeData?.stats && (
              <>
                <div className="stat">
                  <h3>{homeData.stats.totalProducts}</h3>
                  <p>Products Available</p>
                </div>
                <div className="stat">
                  <h3>{homeData.stats.categories}</h3>
                  <p>Categories</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        {homeData?.featuredProducts && homeData.featuredProducts.length > 0 ? (
          <div className="grid grid-3">
            {homeData.featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p>No featured products available</p>
        )}
      </section>

      <style jsx>{`
        .home-page {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          border-radius: 12px;
          margin-bottom: 3rem;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
        }

        .stat {
          text-align: center;
        }

        .stat h3 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: #fff;
        }

        .stat p {
          font-size: 1rem;
          opacity: 0.8;
          margin: 0;
        }

        .featured-products h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #2c3e50;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 2rem 1rem;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .stat h3 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;