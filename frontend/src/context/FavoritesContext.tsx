import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../services/productService';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { user, isAuthenticated } = useAuth();

  // Load favorites from localStorage when component mounts or user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      const guestFavorites = localStorage.getItem('guest_favorites');
      if (guestFavorites) {
        setFavorites(JSON.parse(guestFavorites));
      }
    }
  }, [isAuthenticated, user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    } else {
      localStorage.setItem('guest_favorites', JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user]);

  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(item => item._id === product._id)) {
        return prevFavorites;
      }
      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(item => item._id !== productId)
    );
  };

  const isFavorite = (productId: string) => {
    return favorites.some(item => item._id === productId);
  };

  const totalFavorites = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        totalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 