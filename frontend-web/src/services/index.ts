import { IApiResponse } from '../interfaces';

export const checkoutService = {
  calculateShipping: async (zipCode: string) => {
    return {
      standard: 0,
      express: 15.0,
      overnight: 29.99,
    };
  },
};

export const paymentService = {
  processPayment: async (paymentDetails: any): Promise<IApiResponse<{ transactionId: string }>> => {
    await new Promise((r) => setTimeout(r, 1000));
    return {
      success: true,
      message: 'Payment processed successfully',
      data: { transactionId: `TXN_${Date.now()}` },
    };
  },
};

export const wishlistService = {
  getWishlist: async (): Promise<IApiResponse<any[]>> => {
    return { success: true, message: 'Wishlist loaded', data: [] };
  },
};

export const reviewService = {
  getProductReviews: async (productId: string): Promise<IApiResponse<any[]>> => {
    return {
      success: true,
      message: 'Reviews loaded',
      data: [
        {
          id: 'rev_1',
          userName: 'Sarah Jenkins',
          userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
          rating: 5,
          comment: 'Absolutely spectacular sound quality! The noise cancellation completely silences airplane engine noise.',
          date: '2026-07-28',
          verifiedPurchase: true,
          helpfulCount: 42,
        },
        {
          id: 'rev_2',
          userName: 'David Miller',
          rating: 4,
          comment: 'Extremely comfortable for long listening sessions. Battery lasts as advertised.',
          date: '2026-07-15',
          verifiedPurchase: true,
          helpfulCount: 18,
        },
      ],
    };
  },
};

export const notificationService = {
  getNotifications: async () => {
    return { success: true, message: 'Notifications loaded', data: [] };
  },
};
