import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProfileProps {
  open: boolean;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ open, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleProfileClick = () => {
    onClose();
    navigate('/profile');
  };

  const handleOrdersClick = () => {
    onClose();
    navigate('/orders');
  };

  const handleWishlistClick = () => {
    onClose();
    navigate('/wishlist');
  };

  const handleAddressesClick = () => {
    onClose();
    navigate('/addresses');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="h6" align="center">
            {isAuthenticated ? 'My Account' : 'Welcome'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {isAuthenticated ? (
            <>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItemButton onClick={handleProfileClick}>
                  <ListItemText primary="Profile Details" />
                </ListItemButton>
                <ListItemButton onClick={handleOrdersClick}>
                  <ListItemText primary="My Orders" />
                </ListItemButton>
                <ListItemButton onClick={handleWishlistClick}>
                  <ListItemText primary="Wishlist" />
                </ListItemButton>
                <ListItemButton onClick={handleAddressesClick}>
                  <ListItemText primary="Saved Addresses" />
                </ListItemButton>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Sign Out" />
                </ListItemButton>
              </List>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={onClose}
                sx={{
                  backgroundColor: '#2e7d32',
                  '&:hover': {
                    backgroundColor: '#1b5e20',
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile; 