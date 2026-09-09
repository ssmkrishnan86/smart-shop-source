import React from 'react';
import { RouteObject } from 'react-router-dom';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { OrderDetailPage } from './pages/OrderDetailPage';

export const orderRoutes: RouteObject[] = [
  { path: '/account/orders', element: <OrderHistoryPage /> },
  { path: '/account/orders/:id', element: <OrderDetailPage /> },
];
