/**
 * useCart.ts
 * ==========
 * Primary hook for all shopping cart interactions.
 *
 * Pattern — Optimistic UI + Async Backend Sync:
 *  1. Every mutation dispatches a Redux action immediately (instant UI update).
 *  2. The mutation is then fired to the backend async.
 *  3. When backend responds with the authoritative cart, Redux is re-hydrated
 *     via `loadCartFromBackend`, correcting any inconsistency.
 *
 * This gives the UX feel of a local app while keeping the backend as the
 * source of truth for persistence across refreshes and devices.
 */

import { useAppDispatch, useAppSelector } from '../store';
import {
  addToCart as addToCartOptimistic,
  removeFromCart as removeFromCartOptimistic,
  updateQuantity as updateQuantityOptimistic,
  clearCart as clearCartOptimistic,
  toggleCartDrawer,
  applyCoupon as applyCouponOptimistic,
  removeCoupon as removeCouponOptimistic,
  loadCartFromBackend,
  syncServerTotals,
  setCartSyncing,
} from '../store/slices/cartSlice';
import { IProduct } from '../interfaces';
import { useToast } from './useToast';
import { cartService } from '../services/cartService';

export function useCart() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const {
    items,
    isOpen,
    couponCode,
    discountAmount,
    serverTotals,
    isSyncing,
    cartId,
    userId,
    lastSyncedAt,
  } = useAppSelector((state) => state.cart);
  const authUser = useAppSelector((state) => state.auth.user);

  // ─── Computed totals (prefer server totals when available) ───────────────
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.length;
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const taxRate = serverTotals?.tax_rate ?? 18;
  const taxAmount = serverTotals?.tax_amount ?? 0;
  const shippingFee = serverTotals?.shipping_fee ?? (subtotal >= 499 ? 0 : 60);
  const grandTotal = serverTotals?.grand_total ?? Math.max(0, subtotal - discountAmount + taxAmount + shippingFee);
  const total = Math.max(0, subtotal - discountAmount); // kept for backwards compat

  // ─── Backend sync helper ─────────────────────────────────────────────────
  const syncFromBackend = async (uid: string) => {
    try {
      const cart = await cartService.getCart(uid);
      if (cart.cart_id) {
        dispatch(
          loadCartFromBackend({
            cartId: cart.cart_id,
            userId: uid,
            items: cart.items,
            totals: cart.totals,
          })
        );
      }
    } catch (err) {
      console.warn('[useCart] Failed to sync from backend', err);
    }
  };

  // ─── Add to cart ──────────────────────────────────────────────────────────
  const handleAddToCart = async (product: IProduct, quantity = 1, selectedVariant?: string) => {
    const uid = authUser?.id;

    // 1. Optimistic update
    dispatch(addToCartOptimistic({ product, quantity, selectedVariant }));
    showToast(`✓ ${product.name} added to cart`, 'success');

    // 2. Sync to backend
    if (uid) {
      dispatch(setCartSyncing(true));
      try {
        const cart = await cartService.addItem(uid, product, quantity, selectedVariant);
        if (cart.cart_id) {
          dispatch(
            loadCartFromBackend({
              cartId: cart.cart_id,
              userId: uid,
              items: cart.items,
              totals: cart.totals,
            })
          );
        }
      } catch (err) {
        console.warn('[useCart] addItem sync failed', err);
      } finally {
        dispatch(setCartSyncing(false));
      }
    }
  };

  // ─── Update quantity ──────────────────────────────────────────────────────
  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    const uid = authUser?.id;

    // Optimistic update
    dispatch(updateQuantityOptimistic({ id: itemId, quantity }));

    if (uid) {
      dispatch(setCartSyncing(true));
      try {
        const cart = await cartService.updateItem(uid, itemId, quantity);
        if (cart.cart_id) {
          dispatch(
            loadCartFromBackend({
              cartId: cart.cart_id,
              userId: uid,
              items: cart.items,
              totals: cart.totals,
            })
          );
        }
      } catch (err) {
        console.warn('[useCart] updateItem sync failed', err);
      } finally {
        dispatch(setCartSyncing(false));
      }
    }
  };

  // ─── Remove from cart ─────────────────────────────────────────────────────
  const handleRemoveFromCart = async (itemId: string) => {
    const uid = authUser?.id;

    // Optimistic update
    dispatch(removeFromCartOptimistic(itemId));

    if (uid) {
      dispatch(setCartSyncing(true));
      try {
        const cart = await cartService.removeItem(uid, itemId);
        if (cart.cart_id) {
          dispatch(
            loadCartFromBackend({
              cartId: cart.cart_id,
              userId: uid,
              items: cart.items,
              totals: cart.totals,
            })
          );
        }
      } catch (err) {
        console.warn('[useCart] removeItem sync failed', err);
      } finally {
        dispatch(setCartSyncing(false));
      }
    }
  };

  // ─── Clear cart ───────────────────────────────────────────────────────────
  const handleClearCart = async () => {
    const uid = authUser?.id;
    dispatch(clearCartOptimistic());
    if (uid) {
      try {
        await cartService.clearCart(uid);
      } catch (err) {
        console.warn('[useCart] clearCart sync failed', err);
      }
    }
  };

  // ─── Apply coupon ──────────────────────────────────────────────────────────
  const handleApplyCoupon = async (code: string) => {
    const uid = authUser?.id;

    // Optimistic
    dispatch(applyCouponOptimistic(code));

    if (uid) {
      try {
        const { cart, message } = await cartService.applyCoupon(uid, code);
        if (cart.cart_id) {
          dispatch(syncServerTotals(cart.totals));
        }
        showToast(message, 'success');
      } catch (err: any) {
        // Revert coupon on backend error
        dispatch(removeCouponOptimistic());
        showToast(err?.message ?? 'Invalid coupon code', 'error');
      }
    } else {
      showToast(`Coupon ${code.toUpperCase()} applied!`, 'success');
    }
  };

  // ─── Remove coupon ────────────────────────────────────────────────────────
  const handleRemoveCoupon = async () => {
    const uid = authUser?.id;
    dispatch(removeCouponOptimistic());
    if (uid) {
      try {
        const cart = await cartService.removeCoupon(uid);
        if (cart.cart_id) dispatch(syncServerTotals(cart.totals));
      } catch (err) {
        console.warn('[useCart] removeCoupon sync failed', err);
      }
    }
  };

  // ─── Load cart from backend ───────────────────────────────────────────────
  const loadCart = async (uid?: string) => {
    const resolvedUid = uid ?? authUser?.id;
    if (!resolvedUid) return;
    await syncFromBackend(resolvedUid);
  };

  return {
    // State
    items,
    isOpen,
    couponCode,
    discountAmount,
    serverTotals,
    isSyncing,
    cartId,
    lastSyncedAt,

    // Computed
    itemCount,
    totalQuantity,
    subtotal,
    total,           // backwards compat: subtotal - discount
    taxRate,
    taxAmount,
    shippingFee,
    grandTotal,

    // Actions
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    toggleCartDrawer: () => dispatch(toggleCartDrawer()),
    applyCoupon: handleApplyCoupon,
    removeCoupon: handleRemoveCoupon,
    loadCart,
  };
}
