# ShoppingWebsite

A modern shopping website with login function, an inventory of shopping items, Shopping cart and placing orders.

## Features

### Currently Implemented ✅
- **Home Page**: Featured products display with site statistics
- **Product Listing**: Browse all products with search and category filtering
- **Shopping Cart**: Add items to cart, update quantities, and manage cart contents
- **Responsive Design**: Mobile-friendly interface
- **RESTful API**: Express.js backend with MongoDB integration

### Planned Features 🚧
- User authentication and login system
- User profiles and order history
- Product reviews and ratings
- Payment processing
- Order management
- Admin dashboard for inventory management

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with responsive design

## Project Structure

```
ShoppingWebsite/
├── backend/
│   ├── controllers/         # Request handlers
│   │   ├── homeController.js
│   │   ├── productController.js
│   │   └── cartController.js
│   ├── models/             # Database models
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── routes/             # API routes
│   │   ├── homeRoutes.js
│   │   ├── productRoutes.js
│   │   └── cartRoutes.js
│   ├── config/
│   │   └── db.js           # Database configuration
│   ├── app.js              # Main Express application
│   └── package.json
├── frontend/
│   ├── components/         # React components
│   │   ├── Home/
│   │   │   └── HomePage.jsx
│   │   ├── ProductListing/
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductCard.jsx
│   │   └── Cart/
│   │       └── CartPage.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── ProductListing.jsx
│   │   └── Cart.jsx
│   ├── assets/
│   │   └── images/         # Static images
│   ├── src/
│   │   └── index.js        # React entry point
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── App.jsx             # Main React component
│   ├── App.css             # Global styles
│   └── package.json
└── README.md
```

## API Endpoints

### Home
- `GET /api/home` - Get home page data (featured products + stats)
- `GET /api/home/featured` - Get featured products only

### Products
- `GET /api/products` - Get all products (with pagination, search, category filters)
- `GET /api/products/categories` - Get all product categories
- `GET /api/products/:id` - Get specific product by ID

### Cart
- `GET /api/cart/:sessionId` - Get cart contents
- `POST /api/cart/:sessionId/add` - Add item to cart
- `PUT /api/cart/:sessionId/items/:itemId` - Update item quantity
- `DELETE /api/cart/:sessionId/items/:itemId` - Remove item from cart
- `DELETE /api/cart/:sessionId` - Clear entire cart

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shopping_website
   ```

4. Start the backend server:
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

### Database Setup

1. Make sure MongoDB is running on your system
2. The application will automatically create the `shopping_website` database
3. To populate with sample data, run the seed script:
   ```bash
   cd backend
   npm run seed
   ```

### Quick Start (Development)

For quick development setup, use the provided startup script:

```bash
# Make sure you're in the project root directory
chmod +x start-dev.sh
./start-dev.sh
```

This script will:
- Install all dependencies for both backend and frontend
- Start both servers concurrently
- Backend on http://localhost:5000
- Frontend on http://localhost:3000

## Development

### Adding Sample Products

You can add sample products using the API. Here's an example:

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Product",
    "description": "This is a sample product",
    "price": 29.99,
    "category": "electronics",
    "featured": true,
    "quantity": 100
  }'
```

### Project Conventions

- Use camelCase for JavaScript variables and functions
- Use PascalCase for React components
- Follow RESTful API design principles
- Include error handling in all async operations
- Use semantic HTML and CSS class names

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License.
