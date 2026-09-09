import React from 'react';
import { RouteObject } from 'react-router-dom';
import { NotificationsPage } from './pages/NotificationsPage';

export const notificationRoutes: RouteObject[] = [
  { path: '/account/notifications', element: <NotificationsPage /> },
];
