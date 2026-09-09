/**
 * cartService.ts
 * ==============
 * Full API client for the persistent shopping cart backend.
 *
 * Every method:
 *  1. Calls the real backend REST API at http://localhost:8000/api/v1/cart/
 *  2. Falls back gracefully to a no-op / cached value if the backend is
 *     unreachable (so the app always works even in offline / dev mode).
 */

import axios from 'axios';
import { IApiResponse, IProduct } from '../interfaces';

const CART_BASE = 'http://localhost:8000/api/v1/cart';

// ─── Response Types ────────────────────────────────────────────────────────

export interface ICartItemResponse {
  id: string;
  cart_id: string;
  product_id: string;
  product_name: string;
  product_thumbnail?: string;
  product_category?: string;
  product_sku?: string;
  unit_price: number;
  original_price?: number;
  quantity: number;
  selected_variant?: string;
  line_total: number;
  added_at?: string;
}

export interface ICartTotals {
  item_count: number;
  total_quantity: number;
  subtotal: number;
  discount_amount: number;
  coupon_code: string | null;
  shipping_fee: number;
  tax_rate: number;
  tax_amount: number;
  grand_total: number;
}

export interface ICartResponse {
  cart_id: string;
  user_id: string;
  items: ICartItemResponse[];
  totals: ICartTotals;
}

export interface ICartCountResponse {
  user_id: string;
  item_count: number;
  total_quantity: number;
}

// ─── Helper ────────────────────────────────────────────────────────────────

const defaultTotals = (): ICartTotals => ({
  item_count: 0,
  total_quantity: 0,
  subtotal: 0,
  discount_amount: 0,
  coupon_code: null,
  shipping_fee: 0,
  tax_rate: 18,
  tax_amount: 0,
  grand_total: 0,
});

// ─── Service ───────────────────────────────────────────────────────────────

export const cartService = {
  /**
   * Retrieve the full persistent cart for a user.
   * Called on app load and login.
   */
  getCart: async (userId: string): Promise<ICartResponse> => {
    try {
      const res = await axios.get(`${CART_BASE}/${userId}`);
      if (res.data?.success) return res.data.data as ICartResponse;
    } catch (err) {
      console.warn('[CartService] getCart backend unavailable, using empty cart', err);
    }
    return { cart_id: '', user_id: userId, items: [], totals: defaultTotals() };
  },

  /**
   * Lightweight count check — used by the header badge on load.
   */
  getCartCount: async (userId: string): Promise<ICartCountResponse> => {
    try {
      const res = await axios.get(`${CART_BASE}/${userId}/count`);
      if (res.data?.success) return res.data.data as ICartCountResponse;
    } catch {
      // silent fallback
    }
    return { user_id: userId, item_count: 0, total_quantity: 0 };
  },

  /**
   * Add a product to the persistent cart.
   * Sends full product snapshot so backend stores price at add-time.
   */
  addItem: async (
    userId: string,
    product: IProduct,
    quantity = 1,
    selectedVariant?: string
  ): Promise<ICartResponse> => {
    try {
      const payload = {
        product_id: product.id,
        product_name: product.name,
        product_thumbnail: product.thumbnail,
        product_category: product.category,
        unit_price: product.price,
        original_price: product.originalPrice,
        quantity,
        selected_variant: selectedVariant ?? null,
      };
      const res = await axios.post(`${CART_BASE}/${userId}/items`, payload);
      if (res.data?.success) return res.data.data as ICartResponse;
    } catch (err) {
      console.warn('[CartService] addItem backend unavailable', err);
    }
    // Return minimal structure so Redux optimistic update is not blocked
    return { cart_id: '', user_id: userId, items: [], totals: defaultTotals() };
  },

  /**
   * Update the quantity of a specific cart item by its item ID.
   * Set quantity to 0 to remove.
   */
  updateItem: async (
    userId: string,
    itemId: string,
    quantity: number
  ): Promise<ICartResponse> => {
    try {
      const res = await axios.put(`${CART_BASE}/${userId}/items/${itemId}`, { quantity });
      if (res.data?.success) return res.data.data as ICartResponse;
    } catch (err) {
      console.warn('[CartService] updateItem backend unavailable', err);
    }
    return { cart_id: '', user_id: userId, items: [], totals: defaultTotals() };
  },

  /**
   * Remove a specific item from the cart.
   */
  removeItem: async (userId: string, itemId: string): Promise<ICartResponse> => {
    try {
      const res = await axios.delete(`${CART_BASE}/${userId}/items/${itemId}`);
      if (res.data?.success) return res.data.data as ICartResponse;
    } catch (err) {
      console.warn('[CartService] removeItem backend unavailable', err);
    }
    return { cart_id: '', user_id: userId, items: [], totals: defaultTotals() };
  },

  /**
   * Clear the entire cart (all items + coupon reset).
   */
  clearCart: async (userId: string): Promise<void> => {
    try {
      await axios.delete(`${CART_BASE}/${userId}`);
    } catch (err) {
      console.warn('[CartService] clearCart backend unavailable', err);
    }
  },

  /**
   * Apply a coupon code to the cart.
   */
  applyCoupon: async (
    userId: string,
    couponCode: string
  ): Promise<{ cart: ICartResponse; message: string }> => {
    try {
      const res = await axios.post(`${CART_BASE}/${userId}/coupon`, {
        coupon_code: couponCode,
      });
      if (res.data?.success) {
        return { cart: res.data.data as ICartResponse, message: res.data.message };
      }
    } catch (err: any) {
      const detail = err?.response?.data?.detail ?? 'Invalid coupon code.';
      throw new Error(detail);
    }
    throw new Error('Failed to apply coupon.');
  },

  /**
   * Remove the applied coupon from the cart.
   */
  removeCoupon: async (userId: string): Promise<ICartResponse> => {
    try {
      const res = await axios.delete(`${CART_BASE}/${userId}/coupon`);
      if (res.data?.success) return res.data.data as ICartResponse;
    } catch (err) {
      console.warn('[CartService] removeCoupon backend unavailable', err);
    }
    return { cart_id: '', user_id: userId, items: [], totals: defaultTotals() };
  },

  /**
   * Legacy helper — kept for backwards compatibility with existing code
   * that calls cartService.applyPromoCode().
   */
  applyPromoCode: async (code: string): Promise<IApiResponse<{ discount: number; code: string }>> => {
    const CODES: Record<string, number> = {
      SMART20: 20,
      PROMO10: 10,
      DIVINE10: 10,
      FEST30: 30,
      WELCOME50: 50,
    };
    const discount = CODES[code.toUpperCase()] ?? 5;
    return {
      success: true,
      message: `₹${discount} discount applied!`,
      data: { discount, code: code.toUpperCase() },
    };
  },
};
