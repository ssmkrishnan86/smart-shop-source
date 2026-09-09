import React from 'react';
import { RouteObject } from 'react-router-dom';
import { CartPage } from './pages/CartPage';

export const cartRoutes: RouteObject[] = [
  { path: '/cart', element: <CartPage /> },
];
