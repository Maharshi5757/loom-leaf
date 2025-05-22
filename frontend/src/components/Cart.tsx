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
  Divider,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { Product } from '../services/productService';

interface CartProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

interface CartItem extends Product {
  quantity: number;
}

const Cart: React.FC<CartProps> = ({ open, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { addToFavorites } = useFavorites();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');

  const handleQuantityChange = (productId: string, change: number) => {
    const currentItem = cart.find(item => item._id === productId);
    if (currentItem) {
      const newQuantity = Math.max(1, currentItem.quantity + change);
      updateQuantity(productId, newQuantity);
    }
  };

  const handleMoveToFavorites = (product: CartItem) => {
    addToFavorites(product);
    removeFromCart(product._id);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const calculateTotal = (): number => {
    return cart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
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
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {cart.length === 0 ? (
          <Typography color="text.secondary" align="center">
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List>
              {cart.map((item: CartItem) => (
                <React.Fragment key={item._id}>
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
                          src={item.images[0]} 
                          alt={item.name}
                          sx={{ 
                            width: 60, 
                            height: 60,
                            cursor: 'pointer'
                          }}
                          onClick={() => handleProductClick(item._id)}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`$${item.price.toFixed(2)}`}
                        onClick={() => handleProductClick(item._id)}
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
                            onClick={() => handleQuantityChange(item._id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ px: 1, minWidth: '24px', textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small"
                            onClick={() => handleQuantityChange(item._id, 1)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <IconButton 
                          size="small"
                          onClick={() => handleMoveToFavorites(item)}
                          sx={{
                            color: '#2e7d32',
                            '&:hover': {
                              color: '#1b5e20'
                            }
                          }}
                        >
                          <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton 
                          size="small"
                          onClick={() => removeFromCart(item._id)}
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
            <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  size="small"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <Button variant="outlined" size="small">
                  Apply
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal</Typography>
                <Typography>${calculateTotal().toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
              </Box>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={onCheckout}
                  disabled={cart.length === 0}
                  sx={{
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#1b5e20',
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Cart; 