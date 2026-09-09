import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout';

// Auth Page
import { LoginPage } from './features/auth/LoginPage';

// 22 Admin Feature Modules
import { DashboardPage } from './features/dashboard/DashboardPage';
import { UsersPage } from './features/users/UsersPage';
import { CustomersPage } from './features/customers/CustomersPage';
import { VendorsPage } from './features/vendors/VendorsPage';
import { ProductsPage } from './features/products/ProductsPage';
import { CategoriesPage } from './features/categories/CategoriesPage';
import { BrandsPage } from './features/brands/BrandsPage';
import { InventoryPage } from './features/inventory/InventoryPage';
import { OrdersPage } from './features/orders/OrdersPage';
import { PaymentsPage } from './features/payments/PaymentsPage';
import { ShippingPage } from './features/shipping/ShippingPage';
import { ReturnsPage } from './features/returns/ReturnsPage';
import { CouponsPage } from './features/coupons/CouponsPage';
import { ReviewsPage } from './features/reviews/ReviewsPage';
import { CmsPage } from './features/cms/CmsPage';
import { NotificationsPage } from './features/notifications/NotificationsPage';
import { AnalyticsPage } from './features/analytics/AnalyticsPage';
import { RbacPage } from './features/rbac/RbacPage';
import { AuditPage } from './features/audit/AuditPage';
import { SettingsPage } from './features/settings/SettingsPage';
import { ConfigurationPage } from './features/configuration/ConfigurationPage';
import { MonitoringPage } from './features/monitoring/MonitoringPage';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Super Admin Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/coupons" element={<CouponsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/cms" element={<CmsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/rbac" element={<RbacPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/configuration" element={<ConfigurationPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
