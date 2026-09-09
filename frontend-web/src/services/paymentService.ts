import { IApiResponse } from '../interfaces';

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
