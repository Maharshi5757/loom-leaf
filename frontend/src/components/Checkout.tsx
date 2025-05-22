import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';
import { Product } from '../services/productService';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../api/payment';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const steps = ['Review Cart', 'Shipping Information', 'Payment', 'Confirmation'];

const PaymentForm: React.FC<{ 
  onSuccess: () => void;
  onError: (error: string) => void;
  amount: number;
}> = ({ onSuccess, onError, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const response = await createPaymentIntent({ amount: amount * 100 });
        if (response.error) {
          onError(response.error);
        } else {
          setClientSecret(response.clientSecret);
        }
      } catch (error) {
        onError('Failed to initialize payment');
      }
    };

    initializePayment();
  }, [amount, onError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    try {
      const { error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (paymentError) {
        onError(paymentError.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (err) {
      onError('An error occurred during payment processing');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!stripe || processing || !clientSecret}
        sx={{
          backgroundColor: '#2e7d32',
          '&:hover': {
            backgroundColor: '#1b5e20',
          },
        }}
      >
        {processing ? <CircularProgress size={24} /> : 'Pay Now'}
      </Button>
    </form>
  );
};

const Checkout: React.FC<CheckoutProps> = ({ open, onClose }) => {
  const { cart, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [error, setError] = useState<string>('');

  const calculateTotal = (): number => {
    return cart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Process order
      handleOrderComplete();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleOrderComplete = () => {
    clearCart();
  };

  const handlePaymentSuccess = () => {
    handleOrderComplete();
    setActiveStep(3);
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            {cart.map((item: CartItem) => (
              <Box
                key={item._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'background.paper'
                }}
              >
                <Box
                  component="img"
                  src={item.images[0]}
                  alt={item.name}
                  sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity} × ${item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Typography variant="subtitle1">
                  ${(item.quantity * item.price).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="h6" align="right">
                Total: ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '240px' }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={shippingInfo.firstName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                />
              </Box>
              <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '240px' }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={shippingInfo.lastName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '240px' }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                />
              </Box>
              <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '240px' }}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                />
              </Box>
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Address"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '240px' }}>
                <TextField
                  fullWidth
                  label="City"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                />
              </Box>
              <Box sx={{ flex: '1 1 calc(25% - 8px)', minWidth: '120px' }}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={shippingInfo.state}
                    label="State"
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                  >
                    <MenuItem value="CA">California</MenuItem>
                    <MenuItem value="NY">New York</MenuItem>
                    {/* Add more states */}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 calc(25% - 8px)', minWidth: '120px' }}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                />
              </Box>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={calculateTotal() * 100} // Convert to cents
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </Elements>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              Your order has been placed successfully!
            </Alert>
            <Typography variant="body1" paragraph>
              Thank you for shopping with Loom & Leaf. We'll send you an email confirmation shortly.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order total: ${calculateTotal().toFixed(2)}
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Checkout</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ py: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mt: 3 }}>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
            {activeStep !== 0 && activeStep !== steps.length - 1 && (
              <Button onClick={handleBack}>
                Back
              </Button>
            )}
            {activeStep !== 2 && activeStep !== steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  backgroundColor: '#2e7d32',
                  '&:hover': {
                    backgroundColor: '#1b5e20'
                  }
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout; 