import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage';
import { AddressesPage } from './pages/AddressesPage';

export const profileRoutes: RouteObject[] = [
  { path: '/account/profile', element: <ProfilePage /> },
  { path: '/account/addresses', element: <AddressesPage /> },
];
