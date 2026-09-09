/**
 * useCartSync.ts
 * ==============
 * Global cart hydration hook — mounted once at the app root level.
 *
 * Responsibilities:
 *  1. On app mount: load the persisted cart from the backend for the current user.
 *  2. On login / user change: re-load the cart for the new user.
 *  3. On logout: clear the in-memory Redux cart state.
 *
 * This ensures the cart badge in the header always shows the correct count
 * immediately after a page refresh or login from a different device.
 */

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { loadCartFromBackend, clearCart } from '../store/slices/cartSlice';
import { cartService } from '../services/cartService';

export function useCartSync() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const prevUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const userId = user?.id ?? null;

    if (!isAuthenticated || !userId) {
      // User logged out — clear local cart state
      if (prevUserIdRef.current !== null) {
        dispatch(clearCart());
      }
      prevUserIdRef.current = null;
      return;
    }

    // Skip if same user already synced (prevents duplicate syncs on re-renders)
    if (prevUserIdRef.current === userId) return;
    prevUserIdRef.current = userId;

    // Hydrate cart from backend
    const hydrateCart = async () => {
      try {
        const cart = await cartService.getCart(userId);
        if (cart.cart_id || cart.items.length >= 0) {
          dispatch(
            loadCartFromBackend({
              cartId: cart.cart_id,
              userId,
              items: cart.items,
              totals: cart.totals,
            })
          );
          if (cart.items.length > 0) {
            console.info(
              `[CartSync] Restored ${cart.items.length} item(s) for user ${userId}`
            );
          }
        }
      } catch (err) {
        console.warn('[CartSync] Failed to hydrate cart from backend:', err);
        // Non-fatal — user can still shop, cart just won't persist this session
      }
    };

    hydrateCart();
  }, [user?.id, isAuthenticated, dispatch]);
}
