import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../../components/common/SEO';
import { wishlistService } from '../../../services/wishlistService';
import { useAppDispatch } from '../../../store';
import { removeFromWishlistOptimistic } from '../../../store/slices/wishlistSlice';
import { useToast } from '../../../hooks/useToast';
import { IWishlistItem } from '../../../interfaces';
import { formatCurrency } from '../../../utils';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [items, setItems] = useState<IWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    wishlistService
      .getWishlist()
      .then(setItems)
      .finally(() => setIsLoading(false));
  }, []);

  const handleRemove = async (productId: string) => {
    dispatch(removeFromWishlistOptimistic(productId));
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    try {
      await wishlistService.removeFromWishlist(productId);
    } catch {
      showToast('Failed to remove item', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <SEO title="My Wishlist" />
      <h2 className="text-xl font-bold text-foreground">Saved Wishlist ({items.length})</h2>

      {isLoading ? (
        <p className="text-xs text-muted-foreground">Loading wishlist...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl bg-card">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-bold">Your Wishlist is Empty</h3>
          <p className="text-sm text-muted-foreground mt-1">Save items you love by clicking the heart icon on any product card!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden group">
              <Link to={`/products/${item.productId}`} className="block aspect-square bg-muted overflow-hidden">
                <img src={item.productThumbnail} alt={item.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </Link>
              <div className="p-4 space-y-2">
                <Link to={`/products/${item.productId}`} className="font-bold text-sm line-clamp-2 hover:text-primary">
                  {item.productName}
                </Link>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black text-primary">{formatCurrency(item.productPrice || 0)}</span>
                  {item.productOriginalPrice && item.productOriginalPrice > (item.productPrice || 0) && (
                    <span className="text-xs text-muted-foreground line-through">{formatCurrency(item.productOriginalPrice)}</span>
                  )}
                </div>
                {item.productStock === 0 && <p className="text-xs font-bold text-rose-600">Out of stock</p>}
                <div className="flex items-center gap-2 pt-2">
                  <Link
                    to={`/products/${item.productId}`}
                    className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> View Product
                  </Link>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="p-2.5 rounded-xl border border-border text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
