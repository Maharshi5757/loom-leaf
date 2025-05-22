import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Zoom } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../services/productService';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isMobile?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isMobile = false
}) => {
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const productIsFavorite = isFavorite(product._id);

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productIsFavorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Card 
      sx={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        },
        margin: 0,
        padding: 0,
        borderRadius: isMobile ? 1 : 2
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={isMobile ? "150" : "200"}
          image={product.images[0] || 'https://via.placeholder.com/200'}
          alt={product.name}
          sx={{ objectFit: 'cover', width: '100%' }}
        />
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: isMobile ? 8 : 16,
              right: isMobile ? 8 : 16,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                transform: 'scale(1.1)'
              }
            }}
            onClick={handleFavoriteClick}
          >
            {productIsFavorite ? (
              <FavoriteIcon 
                sx={{ 
                  color: 'red',
                  transform: 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.2)'
                  }
                }} 
              />
            ) : (
              <FavoriteBorderIcon 
                sx={{
                  transform: 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.2)'
                  }
                }}
              />
            )}
          </IconButton>
        </Zoom>
      </Box>
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: isMobile ? 1 : 2 
      }}>
        <Typography 
          gutterBottom 
          variant={isMobile ? "subtitle1" : "h6"} 
          component="div"
          sx={{ 
            fontWeight: 'bold',
            fontSize: isMobile ? '0.9rem' : '1.1rem'
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: isMobile ? 1 : 2, 
            flexGrow: 1,
            fontSize: isMobile ? '0.8rem' : '0.875rem',
            display: '-webkit-box',
            WebkitLineClamp: isMobile ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.description}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 0
        }}>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            color="primary"
            sx={{ fontWeight: 'bold' }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleAddToCart}
            sx={{
              backgroundColor: '#2e7d32',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#1b5e20',
                transform: 'scale(1.02)'
              },
              width: isMobile ? '100%' : 'auto',
              fontSize: isMobile ? '0.8rem' : '0.875rem'
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 