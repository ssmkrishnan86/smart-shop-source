import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '../../enums';

interface SettingsState {
  currency: Currency;
  language: string;
}

const initialState: SettingsState = {
  currency: Currency.USD,
  language: 'en',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setCurrency, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
