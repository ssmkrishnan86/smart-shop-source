import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { store } from '../store';
import { queryClient } from '../config/queryClient';
import { ToastProvider } from '../contexts/ToastContext';
import { AddressProvider } from '../contexts/AddressContext';
import { useAuthSync } from '../hooks/useAuthSync';
import { useCartSync } from '../hooks/useCartSync';
import { useWishlistSync } from '../hooks/useWishlistSync';
import '../i18n/config';

const SessionSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useAuthSync();
  useCartSync();
  useWishlistSync();
  return <>{children}</>;
};

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ToastProvider>
            <AddressProvider>
              <SessionSyncProvider>
                {children}
              </SessionSyncProvider>
            </AddressProvider>
          </ToastProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};
