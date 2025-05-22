import { useState, useEffect } from 'react';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  sizes: string[];
  colors: string[];
  images: string[];
  stock: number;
  featured: boolean;
}

const sampleProducts: Product[] = [
  {
    _id: '1',
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear',
    price: 29.99,
    category: 'mens',
    subCategory: 'tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue'],
    images: ['https://via.placeholder.com/300x400'],
    stock: 10,
    featured: true
  },
  {
    _id: '2',
    name: 'Denim Jeans',
    description: 'Classic denim jeans with a modern fit',
    price: 49.99,
    category: 'mens',
    subCategory: 'bottoms',
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    images: ['https://via.placeholder.com/300x400'],
    stock: 15,
    featured: true
  },
  {
    _id: '3',
    name: 'Summer Dress',
    description: 'Light and airy summer dress',
    price: 39.99,
    category: 'womens',
    subCategory: 'dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink', 'Yellow', 'White'],
    images: ['https://via.placeholder.com/300x400'],
    stock: 8,
    featured: true
  }
];

export const useProducts = (category?: string) => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      // Use sample products for now
      const filteredProducts = category
        ? sampleProducts.filter(product => product.category === category)
        : sampleProducts;
      setData(filteredProducts);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setIsLoading(false);
    }
  }, [category]);

  return { data, isLoading, error };
};

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      // For now, return sample products
      return sampleProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getProductById: async (id: string): Promise<Product | null> => {
    try {
      // For now, return sample product by id
      return sampleProducts.find(product => product._id === id) || null;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      // For now, return filtered sample products
      return sampleProducts.filter(product => product.category === category);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      return [];
    }
  }
}; 