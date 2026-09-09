import { describe, it, expect } from 'vitest';
import cartReducer, { addToCart, removeFromCart, applyCoupon } from '../../store/slices/cartSlice';
import { MOCK_PRODUCTS } from '../../services/productService';

describe('cartSlice reducer', () => {
  const initialState = {
    items: [],
    isOpen: false,
    couponCode: null,
    discountAmount: 0,
  };

  it('adds a product to cart', () => {
    const nextState = cartReducer(initialState, addToCart({ product: MOCK_PRODUCTS[0], quantity: 1 }));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].productId).toBe(MOCK_PRODUCTS[0].id);
  });

  it('applies promo coupon code SMART20', () => {
    const nextState = cartReducer(initialState, applyCoupon('SMART20'));
    expect(nextState.couponCode).toBe('SMART20');
    expect(nextState.discountAmount).toBe(20);
  });
});
