import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useProducts } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: products, isLoading, error } = useProducts();
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const product = products?.find(p => p._id === id);
  const productIsFavorite = product ? isFavorite(product._id) : false;

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleFavoriteClick = () => {
    if (product) {
      if (productIsFavorite) {
        removeFromFavorites(product._id);
      } else {
        addToFavorites(product);
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error" align="center">
          {error || 'Product not found'}
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4
        }}>
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={product.images[0]}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 1
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <IconButton
                onClick={handleFavoriteClick}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0
                }}
              >
                {productIsFavorite ? (
                  <FavoriteIcon sx={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Size</InputLabel>
              <Select
                value={selectedSize}
                label="Size"
                onChange={handleSizeChange}
              >
                {product.sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Color</InputLabel>
              <Select
                value={selectedColor}
                label="Color"
                onChange={handleColorChange}
              >
                {product.colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleAddToCart}
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20'
                }
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail; 