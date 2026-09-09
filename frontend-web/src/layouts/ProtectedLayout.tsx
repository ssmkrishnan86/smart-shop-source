import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';
import { ROUTES } from '../constants';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { CartDrawer } from '../components/common/CartDrawer';

export const ProtectedLayout: React.FC = () => {
  const { isAuthenticated, sessionChecked } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Wait for the silent SSO session check (POST /auth/refresh) to resolve
  // before deciding to redirect — otherwise a hard refresh on a protected
  // route always bounces to /login even when a valid session cookie exists.
  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
