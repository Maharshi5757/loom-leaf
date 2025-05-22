import { Product } from '../services/productService';

export const mockProducts: Product[] = [
  {
    _id: "1",
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
    _id: "2",
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
    _id: "3",
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
    _id: "4",
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
    _id: "5",
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