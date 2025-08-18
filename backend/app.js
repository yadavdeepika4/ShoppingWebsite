const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/home', homeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Shopping Website API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;