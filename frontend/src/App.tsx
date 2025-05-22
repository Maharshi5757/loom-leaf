import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Badge, 
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Search from './components/Search';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { CartProvider, useCart } from './context/CartContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import Favorites from './components/Favorites';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Forest green color
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          scrollBehavior: 'smooth', // Add smooth scrolling
        },
      },
    },
  },
});

const Navigation: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('lastCategory');
    return savedCategory || 'mens';
  });
  const [currentSubcategory, setCurrentSubcategory] = useState<string>('');
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { 
      name: 'MEN', 
      path: 'mens',
      subcategories: [
        'CASUAL SHIRTS',
        'DRESS SHIRTS (FORMALS)',
        'LINEN (SHIRTS)',
        'T-SHIRTS',
        'SWEATSHIRTS',
        'HOODIE',
        'JEANS',
        'TROUSERS',
        'DRESS PANTS (FORMALS)',
        'LINEN (PANTS)',
        'SHORTS',
        'SWEATPANTS'
      ]
    },
    { 
      name: 'WOMEN', 
      path: 'womens',
      subcategories: [
        'CASUAL SHIRTS',
        'DRESS SHIRTS (FORMALS)',
        'LINEN (SHIRTS)',
        'T-SHIRTS',
        'SWEATSHIRTS',
        'HOODIE',
        'JEANS',
        'TROUSERS',
        'DRESS PANTS (FORMALS)',
        'LINEN (PANTS)',
        'SHORTS',
        'SWEATPANTS'
      ]
    },
    { 
      name: 'KIDS', 
      path: 'kids',
      subcategories: ['BOYS', 'GIRLS']
    },
    { 
      name: 'ETHNIC WEAR', 
      path: 'ethnic',
      subcategories: ['MEN\'S ETHNIC', 'WOMEN\'S ETHNIC', 'KID\'S ETHNIC', 'FOOTWEAR']
    }
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentSubcategory('');
    localStorage.setItem('lastCategory', category);
  };

  const handleSubcategoryClick = (category: string, subcategory: string) => {
    const formattedSubcategory = subcategory.toLowerCase().replace(/\s+/g, '-');
    navigate(`/category/${category}/${formattedSubcategory}`);
    setCurrentSubcategory(subcategory);
    setDrawerOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setProfileOpen(true);
    } else {
      setSignInOpen(true);
    }
  };

  const handleSignInClose = () => {
    setSignInOpen(false);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  const handleSwitchToSignUp = () => {
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  const handleSwitchToSignIn = () => {
    setSignUpOpen(false);
    setSignInOpen(true);
  };

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const handleCheckoutClick = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={() => setDrawerOpen(true)}
              sx={{ color: '#333' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                color: '#2e7d32',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              Loom & Leaf
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={handleProfileClick}>
              <PersonOutlineIcon />
            </IconButton>
            <IconButton onClick={() => setFavoritesOpen(true)}>
              <Badge badgeContent={totalFavorites} color="secondary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={handleCartClick}>
              <Badge badgeContent={totalItems} color="secondary">
                <LocalMallOutlinedIcon />
              </Badge>
            </IconButton>
            {user?.role === 'admin' && (
              <IconButton onClick={() => navigate('/admin')}>
                <PersonOutlineIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 500,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}>
          <IconButton 
            onClick={() => {
              setDrawerOpen(false);
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            flex: 1,
            justifyContent: 'space-between'
          }}>
            {categories.map((category) => (
              <Button
                key={category.path}
                variant="text"
                onClick={() => handleCategoryClick(category.path)}
                sx={{
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  color: '#333',
                  fontWeight: selectedCategory === category.path ? 'bold' : 'normal',
                  outline: 'none',
                  '&:hover': {
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    color: '#2e7d32'
                  },
                  '&:focus': {
                    outline: 'none'
                  }
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            {categories.find(cat => cat.path === selectedCategory)?.name}
          </Typography>
          <List>
            {categories.find(cat => cat.path === selectedCategory)?.subcategories.map((subcategory) => (
              <ListItemButton 
                key={subcategory}
                onClick={() => handleSubcategoryClick(selectedCategory, subcategory)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  fontWeight: currentSubcategory === subcategory ? 'bold' : 'normal',
                  color: currentSubcategory === subcategory ? '#2e7d32' : '#333',
                  '&:hover': {
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    color: '#2e7d32'
                  }
                }}
              >
                <ListItemText 
                  primary={subcategory}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: currentSubcategory === subcategory ? 'bold' : 'normal'
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Profile 
        open={profileOpen} 
        onClose={() => setProfileOpen(false)} 
      />
      <Cart 
        open={cartOpen} 
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckoutClick}
      />
      <Checkout 
        open={checkoutOpen} 
        onClose={() => setCheckoutOpen(false)} 
      />
      <Favorites open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
      <SignIn 
        open={signInOpen} 
        onClose={handleSignInClose}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <SignUp 
        open={signUpOpen} 
        onClose={handleSignUpClose}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Navigation />
              <Box 
                component="main" 
                sx={{ 
                  pt: 2, 
                  p: 3, 
                  mt: 2,
                  minHeight: '100vh',
                  backgroundColor: '#f5f5f5'
                }}
              >
                <Routes>
                  <Route path="/" element={<ProductList />} />
                  <Route path="/category/:category" element={<ProductList />} />
                  <Route path="/category/:category/:subcategory" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </Box>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
