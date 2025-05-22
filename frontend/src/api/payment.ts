import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables
const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn('Stripe secret key is not set in environment variables');
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2025-03-31.basil',
}) : null;

interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
}

interface CreatePaymentIntentResponse {
  clientSecret: string;
  error?: string;
}

export const createPaymentIntent = async (
  request: CreatePaymentIntentRequest
): Promise<CreatePaymentIntentResponse> => {
  if (!stripe) {
    return {
      clientSecret: '',
      error: 'Stripe is not properly configured. Please check your environment variables.',
    };
  }

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: request.amount,
      currency: request.currency || 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret || '',
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      clientSecret: '',
      error: 'Failed to create payment intent',
    };
  }
}; 