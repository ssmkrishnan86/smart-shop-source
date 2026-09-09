import React from 'react';
import { RouteObject } from 'react-router-dom';
import { CheckoutPage } from './pages/CheckoutPage';

export const checkoutRoutes: RouteObject[] = [
  { path: '/checkout', element: <CheckoutPage /> },
];
