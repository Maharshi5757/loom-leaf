import React from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { data: products, isLoading, error } = useProducts(category);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          Error loading products: {error}
        </Typography>
      </Container>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Container>
        <Typography align="center" sx={{ mt: 4 }}>
          No products found in this category.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 3,
        py: 4
      }}>
        {products?.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </Box>
    </Container>
  );
};

export default ProductList; 