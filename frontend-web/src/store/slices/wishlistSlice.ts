import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  productIds: string[];
}

const initialState: WishlistState = {
  productIds: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    loadWishlistFromBackend: (state, action: PayloadAction<string[]>) => {
      state.productIds = action.payload;
    },
    addToWishlistOptimistic: (state, action: PayloadAction<string>) => {
      if (!state.productIds.includes(action.payload)) {
        state.productIds.push(action.payload);
      }
    },
    removeFromWishlistOptimistic: (state, action: PayloadAction<string>) => {
      state.productIds = state.productIds.filter((id) => id !== action.payload);
    },
    clearWishlist: (state) => {
      state.productIds = [];
    },
  },
});

export const {
  loadWishlistFromBackend,
  addToWishlistOptimistic,
  removeFromWishlistOptimistic,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
