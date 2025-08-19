const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample products data
const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 24-hour battery life.",
    price: 99.99,
    category: "electronics",
    featured: true,
    quantity: 50,
    inStock: true
  },
  {
    name: "Smart Fitness Watch",
    description: "Track your health and fitness with this advanced smartwatch featuring heart rate monitoring.",
    price: 199.99,
    category: "electronics",
    featured: true,
    quantity: 30,
    inStock: true
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    price: 24.99,
    category: "clothing",
    featured: false,
    quantity: 100,
    inStock: true
  },
  {
    name: "Coffee Maker with Grinder",
    description: "Premium coffee maker with built-in grinder for the perfect cup every morning.",
    price: 149.99,
    category: "home",
    featured: true,
    quantity: 25,
    inStock: true
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra thick yoga mat with excellent grip and comfort for all your yoga sessions.",
    price: 39.99,
    category: "sports",
    featured: false,
    quantity: 75,
    inStock: true
  },
  {
    name: "Laptop Backpack",
    description: "Waterproof laptop backpack with multiple compartments and USB charging port.",
    price: 59.99,
    category: "accessories",
    featured: true,
    quantity: 40,
    inStock: true
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 19.99,
    category: "accessories",
    featured: false,
    quantity: 120,
    inStock: true
  },
  {
    name: "Gaming Mechanical Keyboard",
    description: "RGB mechanical keyboard with customizable backlighting and macro keys.",
    price: 79.99,
    category: "electronics",
    featured: true,
    quantity: 35,
    inStock: true
  },
  {
    name: "Indoor Plant - Snake Plant",
    description: "Low-maintenance snake plant that purifies air and adds greenery to your space.",
    price: 12.99,
    category: "home",
    featured: false,
    quantity: 60,
    inStock: true
  },
  {
    name: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 29.99,
    category: "electronics",
    featured: false,
    quantity: 80,
    inStock: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping_website',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Created ${createdProducts.length} sample products`);

    console.log('Database seeded successfully!');
    
    // Display summary
    const totalProducts = await Product.countDocuments();
    const featuredProducts = await Product.countDocuments({ featured: true });
    const categories = await Product.distinct('category');
    
    console.log('\n--- Database Summary ---');
    console.log(`Total Products: ${totalProducts}`);
    console.log(`Featured Products: ${featuredProducts}`);
    console.log(`Categories: ${categories.join(', ')}`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedDatabase();