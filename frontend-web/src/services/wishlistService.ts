import { apiClient } from './apiClient';
import { IWishlistItem } from '../interfaces';

interface BackendWishlistItem {
  id: string;
  product_id: string;
  added_at?: string;
  product_name?: string;
  product_thumbnail?: string;
  product_price?: number;
  product_original_price?: number;
  product_category?: string;
  product_stock?: number;
}

function mapItem(i: BackendWishlistItem): IWishlistItem {
  return {
    id: i.id,
    productId: i.product_id,
    addedAt: i.added_at,
    productName: i.product_name,
    productThumbnail: i.product_thumbnail,
    productPrice: i.product_price,
    productOriginalPrice: i.product_original_price,
    productCategory: i.product_category,
    productStock: i.product_stock,
  };
}

export const wishlistService = {
  getWishlist: async (): Promise<IWishlistItem[]> => {
    try {
      const res = await apiClient.get<{ data: BackendWishlistItem[] }>('/wishlist/');
      return res.data.data.map(mapItem);
    } catch {
      return [];
    }
  },

  addToWishlist: async (productId: string): Promise<IWishlistItem[]> => {
    const res = await apiClient.post<{ data: BackendWishlistItem[] }>('/wishlist/', { product_id: productId });
    return res.data.data.map(mapItem);
  },

  removeFromWishlist: async (productId: string): Promise<IWishlistItem[]> => {
    const res = await apiClient.delete<{ data: BackendWishlistItem[] }>(`/wishlist/${productId}`);
    return res.data.data.map(mapItem);
  },
};
