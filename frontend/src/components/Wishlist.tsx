import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Box,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Product } from '../services/productService';
import { useNavigate } from 'react-router-dom';

interface WishlistProps {
  open: boolean;
  onClose: () => void;
}

// Mock wishlist data
const mockWishlistItems: Product[] = [
  {
    _id: '1',
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 29.99,
    category: 'mens',
    subCategory: 'tops',
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'White'],
    images: ['https://via.placeholder.com/150'],
    stock: 10,
    featured: true
  },
  // Add more mock items as needed
];

const Wishlist: React.FC<WishlistProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = React.useState<Product[]>(mockWishlistItems);

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(items => items.filter(item => item._id !== productId));
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
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">My Wishlist</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {wishlistItems.length > 0 ? (
          <List>
            {wishlistItems.map((item) => (
              <ListItem
                key={item._id}
                sx={{
                  mb: 1,
                  border: '1px solid #eee',
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.images[0]}
                    alt={item.name}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleProductClick(item._id)}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={`$${item.price.toFixed(2)}`}
                  sx={{ ml: 2 }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveFromWishlist(item._id)}
                    size="small"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography color="text.secondary" gutterBottom>
              Your wishlist is empty
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate('/');
                onClose();
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Wishlist; 