import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { CartDrawer } from '../components/common/CartDrawer';
import { AddressDrawer } from '../components/common/AddressDrawer';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#2C1E16]">
      <Header />
      <main className="flex-1 w-full px-4 sm:px-6 md:px-10 lg:px-[100px] py-6">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <AddressDrawer />
    </div>
  );
};
