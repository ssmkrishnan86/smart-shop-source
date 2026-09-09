import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { AccountLayout } from '../layouts/AccountLayout';

import { Home } from '../pages/Home';
import { Products } from '../pages';
import { ProductDetail } from '../pages';
import { Categories } from '../pages/Categories';
import { Search } from '../pages/Search';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { Cart } from '../pages';
import { Checkout } from '../pages';
import { Login } from '../pages';
import { Register } from '../pages';
import { ForgotPassword } from '../pages';
import { ResetPassword } from '../pages';
import { Profile } from '../pages';
import { Addresses } from '../pages';
import { Orders } from '../pages';
import { OrderDetail } from '../pages';
import { Wishlist } from '../pages';
import { Notifications } from '../pages';
import { Settings } from '../pages';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  // Public App Routes (MainLayout)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'categories', element: <Categories /> },
      { path: 'search', element: <Search /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
  // Auth Layout Routes
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
  // Protected Routes (Guarded by ProtectedLayout)
  {
    element: <ProtectedLayout />,
    children: [
      { path: 'checkout', element: <Checkout /> },
      { path: 'track-order', element: <Orders /> },
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'addresses', element: <Addresses /> },
          { path: 'orders', element: <Orders /> },
          { path: 'orders/:id', element: <OrderDetail /> },
          { path: 'wishlist', element: <Wishlist /> },
          { path: 'notifications', element: <Notifications /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
  // Fallback 404
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
