const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loom-and-leaf')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['men', 'women', 'kids', 'accessories']
  },
  subCategory: {
    type: String,
    required: true
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }],
  colors: [{
    type: String
  }],
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

// Sample products data
const sampleProducts = [
  {
    name: "Classic Cotton T-Shirt",
    description: "A comfortable and stylish cotton t-shirt perfect for everyday wear.",
    price: 29.99,
    category: "men",
    subCategory: "t-shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    images: ["https://via.placeholder.com/300x400?text=Classic+T-Shirt"],
    stock: 100,
    featured: true
  },
  {
    name: "Floral Summer Dress",
    description: "A beautiful floral dress perfect for summer days and special occasions.",
    price: 59.99,
    category: "women",
    subCategory: "dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue", "Pink"],
    images: ["https://via.placeholder.com/300x400?text=Floral+Dress"],
    stock: 50,
    featured: true
  },
  {
    name: "Denim Jeans",
    description: "Classic blue denim jeans with a comfortable fit.",
    price: 79.99,
    category: "men",
    subCategory: "pants",
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue"],
    images: ["https://via.placeholder.com/300x400?text=Denim+Jeans"],
    stock: 75,
    featured: false
  },
  {
    name: "Leather Handbag",
    description: "Elegant leather handbag with multiple compartments.",
    price: 129.99,
    category: "accessories",
    subCategory: "bags",
    sizes: ["One Size"],
    colors: ["Brown", "Black"],
    images: ["https://via.placeholder.com/300x400?text=Leather+Handbag"],
    stock: 30,
    featured: true
  },
  {
    name: "Kids Play Set",
    description: "Comfortable and durable play set for active kids.",
    price: 39.99,
    category: "kids",
    subCategory: "sets",
    sizes: ["3-4Y", "5-6Y", "7-8Y"],
    colors: ["Red", "Blue", "Green"],
    images: ["https://via.placeholder.com/300x400?text=Kids+Play+Set"],
    stock: 60,
    featured: false
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase(); 