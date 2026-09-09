import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { loadWishlistFromBackend, clearWishlist } from '../store/slices/wishlistSlice';
import { wishlistService } from '../services/wishlistService';

export function useWishlistSync() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const prevUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const userId = user?.id ?? null;

    if (!isAuthenticated || !userId) {
      if (prevUserIdRef.current !== null) dispatch(clearWishlist());
      prevUserIdRef.current = null;
      return;
    }

    if (prevUserIdRef.current === userId) return;
    prevUserIdRef.current = userId;

    wishlistService.getWishlist().then((items) => {
      dispatch(loadWishlistFromBackend(items.map((i) => i.productId)));
    });
  }, [user?.id, isAuthenticated, dispatch]);
}
