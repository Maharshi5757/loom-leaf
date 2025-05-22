import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface FavoritesProps {
  open: boolean;
  onClose: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({ open, onClose }) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    favorites.reduce((acc, product) => ({ ...acc, [product._id]: 1 }), {})
  );

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const handleAddToCart = (product: any) => {
    addToCart({ ...product, quantity: quantities[product._id] });
    removeFromFavorites(product._id);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          position: 'fixed',
          top: 20,
          m: 0
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Your Favorites</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {favorites.length === 0 ? (
          <Typography color="text.secondary" align="center">
            Your favorites list is empty
          </Typography>
        ) : (
          <List>
            {favorites.map((product) => (
              <React.Fragment key={product._id}>
                <ListItem
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    width: '100%',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <ListItemAvatar>
                      <Avatar 
                        src={product.images[0]} 
                        alt={product.name}
                        sx={{ 
                          width: 60, 
                          height: 60,
                          cursor: 'pointer'
                        }}
                        onClick={() => handleProductClick(product._id)}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary={`$${product.price.toFixed(2)}`}
                      onClick={() => handleProductClick(product._id)}
                      sx={{ cursor: 'pointer' }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        borderRadius: 1
                      }}>
                        <IconButton 
                          size="small"
                          onClick={() => handleQuantityChange(product._id, -1)}
                          disabled={quantities[product._id] <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ px: 1, minWidth: '24px', textAlign: 'center' }}>
                          {quantities[product._id]}
                        </Typography>
                        <IconButton 
                          size="small"
                          onClick={() => handleQuantityChange(product._id, 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAddToCart(product)}
                        sx={{
                          backgroundColor: '#2e7d32',
                          '&:hover': {
                            backgroundColor: '#1b5e20'
                          }
                        }}
                      >
                        Add to Cart
                      </Button>
                      <IconButton 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromFavorites(product._id);
                        }}
                        color="error"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Favorites; 