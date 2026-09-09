/**
 * cartSlice.ts
 * ============
 * Redux slice for the DivineKart persistent shopping cart.
 *
 * Design:
 *  - Redux is the UI source of truth (instant updates, no flicker).
 *  - The backend PostgreSQL DB is the persistent source of truth.
 *  - `loadCartFromBackend` bulk-hydrates this slice from the API response.
 *  - All other actions are optimistic-UI mutations that get synced async.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, IProduct } from '../../interfaces';
import { ICartItemResponse, ICartTotals } from '../../services/cartService';

// ─── State ────────────────────────────────────────────────────────────────────

interface CartState {
  /** In-memory items array — maps to shopping_cart_items */
  items: ICartItem[];

  /** Cart-level metadata from backend */
  cartId: string | null;
  userId: string | null;

  /** Coupon state */
  couponCode: string | null;
  discountAmount: number;

  /** Computed totals from backend (updated on every sync) */
  serverTotals: ICartTotals | null;

  /** UI state */
  isOpen: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
}

const initialState: CartState = {
  items: [],
  cartId: null,
  userId: null,
  couponCode: null,
  discountAmount: 0,
  serverTotals: null,
  isOpen: false,
  isSyncing: false,
  lastSyncedAt: null,
};

// ─── Helper: Convert backend cart item → Redux ICartItem ──────────────────────

function backendItemToCartItem(apiItem: ICartItemResponse): ICartItem {
  return {
    id: apiItem.id,
    productId: apiItem.product_id,
    product: {
      id: apiItem.product_id,
      name: apiItem.product_name,
      thumbnail: apiItem.product_thumbnail ?? '',
      category: apiItem.product_category ?? '',
      price: apiItem.unit_price,
      originalPrice: apiItem.original_price ?? apiItem.unit_price,
      // Minimal IProduct fields — enough for cart display
      slug: apiItem.product_id,
      description: '',
      shortDescription: '',
      discountPercentage: 0,
      rating: 0,
      reviewCount: 0,
      stock: 99,
      brand: '',
      images: apiItem.product_thumbnail ? [apiItem.product_thumbnail] : [],
      tags: [],
      features: [],
      vendor: { id: '', name: '', logo: '', rating: 0, totalProducts: 0, verified: true },
    } as any,
    quantity: apiItem.quantity,
    price: apiItem.unit_price,
    selectedAttributes: apiItem.selected_variant
      ? { variant: apiItem.selected_variant }
      : undefined,
  };
}

// ─── Slice ────────────────────────────────────────────────────────────────────

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ── Hydrate from backend (called on app load / login) ──────────────────
    loadCartFromBackend: (
      state,
      action: PayloadAction<{
        cartId: string;
        userId: string;
        items: ICartItemResponse[];
        totals: ICartTotals;
      }>
    ) => {
      const { cartId, userId, items, totals } = action.payload;
      state.cartId = cartId;
      state.userId = userId;
      state.items = items.map(backendItemToCartItem);
      state.serverTotals = totals;
      state.couponCode = totals.coupon_code;
      state.discountAmount = totals.discount_amount;
      state.lastSyncedAt = new Date().toISOString();
    },

    // ── Optimistic: Add item (fires async sync to backend) ────────────────
    addToCart: (
      state,
      action: PayloadAction<{ product: IProduct; quantity?: number; selectedVariant?: string }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.productId === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id: `cart_optimistic_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          productId: product.id,
          product,
          quantity,
          price: product.price,
          selectedAttributes: action.payload.selectedVariant
            ? { variant: action.payload.selectedVariant }
            : undefined,
        });
      }
    },

    // ── Optimistic: Update quantity ───────────────────────────────────────
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },

    // ── Optimistic: Remove item ────────────────────────────────────────────
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // ── Optimistic: Clear cart ────────────────────────────────────────────
    clearCart: (state) => {
      state.items = [];
      state.couponCode = null;
      state.discountAmount = 0;
      state.serverTotals = null;
    },

    // ── Coupon ────────────────────────────────────────────────────────────
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
      const CODES: Record<string, number> = {
        SMART20: 20, PROMO10: 10, DIVINE10: 10, FEST30: 30, WELCOME50: 50,
      };
      state.discountAmount = CODES[action.payload.toUpperCase()] ?? 5;
    },

    removeCoupon: (state) => {
      state.couponCode = null;
      state.discountAmount = 0;
    },

    // ── Sync server totals back after backend confirms ────────────────────
    syncServerTotals: (state, action: PayloadAction<ICartTotals>) => {
      state.serverTotals = action.payload;
      state.couponCode = action.payload.coupon_code;
      state.discountAmount = action.payload.discount_amount;
      state.lastSyncedAt = new Date().toISOString();
    },

    // ── UI ────────────────────────────────────────────────────────────────
    toggleCartDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setCartSyncing: (state, action: PayloadAction<boolean>) => {
      state.isSyncing = action.payload;
    },
  },
});

export const {
  loadCartFromBackend,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  toggleCartDrawer,
  setCartOpen,
  applyCoupon,
  removeCoupon,
  syncServerTotals,
  setCartSyncing,
} = cartSlice.actions;

export default cartSlice.reducer;
