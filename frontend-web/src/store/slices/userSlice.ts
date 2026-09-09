import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddress } from '../../interfaces';

interface UserState {
  addresses: IAddress[];
  selectedAddressId: string | null;
}

// Saved addresses are now fetched directly from the backend by
// AddressesPage/CheckoutPage (see addressService) rather than kept here —
// this slice is left registered only in case any other component still
// dispatches its legacy actions.
const initialState: UserState = {
  addresses: [],
  selectedAddressId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<IAddress>) => {
      state.addresses.push(action.payload);
      if (action.payload.isDefault) {
        state.addresses.forEach((addr) => {
          if (addr.id !== action.payload.id) addr.isDefault = false;
        });
      }
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter((addr) => addr.id !== action.payload);
    },
    setSelectedAddress: (state, action: PayloadAction<string>) => {
      state.selectedAddressId = action.payload;
    },
  },
});

export const { addAddress, removeAddress, setSelectedAddress } = userSlice.actions;
export default userSlice.reducer;
