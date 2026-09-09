import { apiClient } from './apiClient';

export interface ICouponModel {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: number;
  discountDisplay: string;
  minPurchase: number;
  maxDiscount?: number;
  usesCount: number;
  maxUses?: number;
  expiryDate?: string;
  status: 'ACTIVE' | 'EXPIRED' | 'INACTIVE';
  createdAt?: string;
}

export const MOCK_COUPONS: ICouponModel[] = [
  {
    id: 'coup_1',
    code: 'DIVINE20',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    discountDisplay: '20% OFF',
    minPurchase: 999,
    maxDiscount: 500,
    usesCount: 142,
    maxUses: 500,
    expiryDate: '2026-12-31',
    status: 'ACTIVE',
  },
  {
    id: 'coup_2',
    code: 'FESTIVE10',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    discountDisplay: '10% OFF',
    minPurchase: 499,
    maxDiscount: 250,
    usesCount: 88,
    maxUses: 200,
    expiryDate: '2026-10-15',
    status: 'ACTIVE',
  },
  {
    id: 'coup_3',
    code: 'FLAT200',
    discountType: 'FLAT',
    discountValue: 200,
    discountDisplay: '₹200 OFF',
    minPurchase: 1499,
    usesCount: 35,
    maxUses: 100,
    expiryDate: '2026-09-01',
    status: 'ACTIVE',
  },
];

export const vendorCouponService = {
  getCoupons: async (): Promise<ICouponModel[]> => {
    try {
      const res = await apiClient.get<any>('/coupons');
      if (res.data && res.data.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return res.data.data;
      }
      return MOCK_COUPONS;
    } catch {
      return MOCK_COUPONS;
    }
  },

  createCoupon: async (payload: {
    code: string;
    discountType: 'PERCENTAGE' | 'FLAT';
    discountValue: number;
    minPurchase: number;
    maxDiscount?: number;
    maxUses?: number;
    expiryDate?: string;
  }): Promise<ICouponModel> => {
    try {
      const res = await apiClient.post<any>('/coupons', payload);
      return res.data.data;
    } catch {
      const discDisplay =
        payload.discountType === 'PERCENTAGE' ? `${payload.discountValue}% OFF` : `₹${payload.discountValue} OFF`;
      const newCoupon: ICouponModel = {
        id: `coup_${Date.now()}`,
        code: payload.code.toUpperCase().trim(),
        discountType: payload.discountType,
        discountValue: payload.discountValue,
        discountDisplay: discDisplay,
        minPurchase: payload.minPurchase,
        maxDiscount: payload.maxDiscount,
        usesCount: 0,
        maxUses: payload.maxUses || 100,
        expiryDate: payload.expiryDate || '2026-12-31',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      };
      MOCK_COUPONS.unshift(newCoupon);
      return newCoupon;
    }
  },

  toggleCouponStatus: async (couponId: string): Promise<ICouponModel> => {
    try {
      const res = await apiClient.post<any>(`/coupons/${couponId}/toggle-status`, {});
      return res.data.data;
    } catch {
      const item = MOCK_COUPONS.find((c) => c.id === couponId);
      if (item) {
        item.status = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        return item;
      }
      throw new Error('Coupon not found');
    }
  },

  deleteCoupon: async (couponId: string): Promise<void> => {
    try {
      await apiClient.delete(`/coupons/${couponId}`);
    } catch {
      const idx = MOCK_COUPONS.findIndex((c) => c.id === couponId);
      if (idx !== -1) {
        MOCK_COUPONS.splice(idx, 1);
      }
    }
  },
};
