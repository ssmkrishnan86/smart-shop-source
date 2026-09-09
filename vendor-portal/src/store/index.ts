import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IVendorUser, IVendorStore } from '../interfaces';

interface AuthState {
  user: IVendorUser | null;
  store: IVendorStore | null;
  token: string | null;
  isAuthenticated: boolean;
  /** True once the initial silent SSO session check has completed (success or not) */
  sessionChecked: boolean;
}

const initialAuthState: AuthState = {
  user: null,
  store: null,
  token: null,
  isAuthenticated: false,
  sessionChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loginSuccess: (state: AuthState, action: PayloadAction<{ user: IVendorUser; store: IVendorStore | null; token: string }>) => {
      state.user = action.payload.user;
      state.store = action.payload.store;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state: AuthState) => {
      state.user = null;
      state.store = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setSessionChecked: (state: AuthState) => {
      state.sessionChecked = true;
    },
    updateStoreProfile: (state: AuthState, action: PayloadAction<Partial<IVendorStore>>) => {
      if (state.store) {
        state.store = { ...state.store, ...action.payload };
      }
    },
  },
});

export const { loginSuccess, logout, setSessionChecked, updateStoreProfile } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
