#!/bin/bash

# Shopping Website Development Startup Script

echo "🛍️ Starting Shopping Website Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running (optional - will show warning if not available)
if ! command -v mongod &> /dev/null; then
    echo "⚠️ MongoDB is not installed. Please install MongoDB or use MongoDB Atlas."
    echo "The application will try to connect to MongoDB at mongodb://localhost:27017"
fi

echo ""
echo "📦 Installing dependencies..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend && npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend && npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "🚀 Starting development servers..."
echo ""
echo "Backend will start on: http://localhost:5000"
echo "Frontend will start on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend and frontend concurrently
cd ..
npx concurrently --kill-others --prefix-colors "bgBlue.bold,bgMagenta.bold" --prefix "[{name}]" \
  --names "BACKEND,FRONTEND" \
  "cd backend && npm run dev" \
  "cd frontend && npm start"