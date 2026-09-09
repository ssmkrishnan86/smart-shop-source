import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAuthSync } from './hooks/useAuthSync';

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';

import { DashboardPage } from './features/dashboard/DashboardPage';
import { ProductsPage } from './features/products/ProductsPage';
import { CategoriesPage } from './features/categories/CategoriesPage';
import { InventoryPage } from './features/inventory/InventoryPage';
import { OrdersPage } from './features/orders/OrdersPage';
import { ShippingPage } from './features/shipping/ShippingPage';
import { ReturnsPage } from './features/returns/ReturnsPage';
import { PaymentsPage } from './features/payments/PaymentsPage';
import { CouponsPage } from './features/coupons/CouponsPage';
import { ReviewsPage } from './features/reviews/ReviewsPage';
import { AnalyticsPage } from './features/analytics/AnalyticsPage';
import { NotificationsPage } from './features/notifications/NotificationsPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { SettingsPage } from './features/settings/SettingsPage';
import { SupportPage } from './features/support/SupportPage';

/** Mounts the SSO session-bootstrap hook inside the Redux Provider. */
const AuthSyncBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useAuthSync();
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthSyncBoundary>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Vendor Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/coupons" element={<CouponsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      </AuthSyncBoundary>
    </Provider>
  );
};

export default App;
