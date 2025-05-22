import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  IconButton, 
  InputBase, 
  Box,
  Typography,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Product } from '../services/productService';

interface SearchProps {
  open: boolean;
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement actual search functionality
    // For now, we'll just use mock data
    const mockResults: Product[] = [
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
      // Add more mock products as needed
    ];
    
    setSearchResults(mockResults.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    ));
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
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <SearchIcon sx={{ color: 'gray', mr: 1 }} />
        <InputBase
          autoFocus
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          fullWidth
          sx={{ ml: 1 }}
        />
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent>
        {searchQuery && (
          <List>
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <ListItemButton 
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                >
                  <ListItemAvatar>
                    <Avatar src={product.images[0]} alt={product.name} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={product.name}
                    secondary={`$${product.price.toFixed(2)}`}
                  />
                </ListItemButton>
              ))
            ) : (
              <Typography color="text.secondary" align="center">
                No results found
              </Typography>
            )}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Search; 