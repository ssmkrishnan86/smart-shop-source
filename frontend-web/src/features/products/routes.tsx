import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export const productRoutes: RouteObject[] = [
  { path: '/products', element: <ProductListPage /> },
  { path: '/products/:id', element: <ProductDetailPage /> },
];
