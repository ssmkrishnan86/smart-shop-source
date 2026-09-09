import React from 'react';
import { RouteObject } from 'react-router-dom';
import { WishlistPage } from './pages/WishlistPage';

export const wishlistRoutes: RouteObject[] = [
  { path: '/account/wishlist', element: <WishlistPage /> },
];
