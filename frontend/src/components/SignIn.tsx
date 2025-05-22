import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

interface SignInProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ open, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  // Clear form when dialog opens
  useEffect(() => {
    if (open) {
      setEmail('');
      setPassword('');
      setError('');
      setShowPassword(false);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
          Sign In
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            error={!!error}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            error={!!error}
            helperText={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#2e7d32',
              '&:hover': {
                backgroundColor: '#1b5e20',
              },
            }}
          >
            Sign In
          </Button>
          <Typography align="center">
            Don't have an account?{' '}
            <Button
              onClick={onSwitchToSignUp}
              sx={{
                color: '#2e7d32',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn; 