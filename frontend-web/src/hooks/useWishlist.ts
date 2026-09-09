import { useAppDispatch, useAppSelector } from '../store';
import { addToWishlistOptimistic, removeFromWishlistOptimistic } from '../store/slices/wishlistSlice';
import { wishlistService } from '../services/wishlistService';
import { IProduct } from '../interfaces';
import { useToast } from './useToast';

export function useWishlist() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const productIds = useAppSelector((state) => state.wishlist.productIds);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const isWishlisted = (productId: string) => productIds.includes(productId);

  const toggle = async (product: IProduct) => {
    if (!isAuthenticated) {
      showToast('Please sign in to save items to your wishlist', 'error');
      return;
    }
    const wasWishlisted = isWishlisted(product.id);

    if (wasWishlisted) {
      dispatch(removeFromWishlistOptimistic(product.id));
      try {
        await wishlistService.removeFromWishlist(product.id);
      } catch {
        dispatch(addToWishlistOptimistic(product.id)); // revert on failure
        showToast('Failed to update wishlist', 'error');
      }
    } else {
      dispatch(addToWishlistOptimistic(product.id));
      try {
        await wishlistService.addToWishlist(product.id);
        showToast(`${product.name} added to wishlist`, 'success');
      } catch {
        dispatch(removeFromWishlistOptimistic(product.id)); // revert on failure
        showToast('Failed to update wishlist', 'error');
      }
    }
  };

  return { productIds, isWishlisted, toggle };
}
