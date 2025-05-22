# Loom & Leaf - Modern E-commerce Platform

A full-stack e-commerce platform for clothing brands, built with React, Node.js, Express, and MongoDB.

## Project Structure

```
loom-and-leaf/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
│
└── backend/           # Node.js backend application
    ├── src/          # Source files
    │   ├── routes/   # API routes
    │   ├── controllers/ # Route controllers
    │   ├── models/   # Database models
    │   └── middleware/ # Custom middleware
    └── package.json  # Backend dependencies
```

## Features

- Product catalog with categories
- Shopping cart functionality
- User authentication
- Responsive design
- Product filtering and search
- Checkout process

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/loom-and-leaf
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm start
   ```

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
   npm run dev
   ```

## API Endpoints

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get a single product
- POST /api/products - Create a new product
- PUT /api/products/:id - Update a product
- DELETE /api/products/:id - Delete a product
- GET /api/products/category/:category - Get products by category

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 