import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password?: string; // Make password optional
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In-memory storage for registered users
// In a real app, this would be replaced with a database
const registeredUsers: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Verify the user is still registered
      const isValidUser = registeredUsers.some(u => u.email === parsedUser.email);
      if (isValidUser) {
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const foundUser = registeredUsers.find(
      user => user.email === email && user.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Remove password before storing in state/localStorage
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    // Clear any stored form data
    localStorage.removeItem('signInForm');
  };

  const register = async (name: string, email: string, password: string) => {
    // Check if user already exists
    if (registeredUsers.some(user => user.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'user'
    };

    // Add to registered users
    registeredUsers.push(newUser);

    // Remove password before storing in state/localStorage
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 