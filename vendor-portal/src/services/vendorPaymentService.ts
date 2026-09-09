import { IPayout, IApiResponse } from '../interfaces';
import { PayoutStatus } from '../enums';

export const MOCK_PAYOUTS: IPayout[] = [
  {
    id: 'pay_9901',
    payoutNumber: 'PAY-2026-081',
    amount: 42500,
    fee: 850,
    netAmount: 41650,
    status: PayoutStatus.COMPLETED,
    bankName: 'HDFC Bank',
    accountEnding: '9821',
    requestedAt: '2026-08-01',
    processedAt: '2026-08-02',
  },
  {
    id: 'pay_9902',
    payoutNumber: 'PAY-2026-082',
    amount: 32000,
    fee: 640,
    netAmount: 31360,
    status: PayoutStatus.PROCESSING,
    bankName: 'HDFC Bank',
    accountEnding: '9821',
    requestedAt: '2026-08-06',
  },
];

export const vendorPaymentService = {
  getPayouts: async (): Promise<IApiResponse<IPayout[]>> => {
    return {
      success: true,
      message: 'Payouts loaded',
      data: MOCK_PAYOUTS,
    };
  },

  requestWithdrawal: async (amount: number): Promise<IApiResponse<IPayout>> => {
    const newPayout: IPayout = {
      id: `pay_${Date.now()}`,
      payoutNumber: `PAY-2026-${Math.floor(Math.random() * 900 + 100)}`,
      amount,
      fee: Math.round(amount * 0.02),
      netAmount: amount - Math.round(amount * 0.02),
      status: PayoutStatus.PENDING,
      bankName: 'HDFC Bank',
      accountEnding: '9821',
      requestedAt: new Date().toISOString().split('T')[0],
    };

    MOCK_PAYOUTS.unshift(newPayout);

    return {
      success: true,
      message: 'Withdrawal requested successfully',
      data: newPayout,
    };
  },
};
