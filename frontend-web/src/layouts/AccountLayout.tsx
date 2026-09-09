import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, Bell, LogOut, Settings } from 'lucide-react';
import { ROUTES } from '../constants';
import { useAuth } from '../hooks/useAuth';

export const AccountLayout: React.FC = () => {
  const { logoutUser, user } = useAuth();

  const navItems = [
    { label: 'My Profile', href: ROUTES.PROFILE, icon: User },
    { label: 'My Orders', href: ROUTES.ORDERS, icon: ShoppingBag },
    { label: 'Wishlist', href: ROUTES.WISHLIST, icon: Heart },
    { label: 'Saved Addresses', href: ROUTES.ADDRESSES, icon: MapPin },
    { label: 'Notifications', href: ROUTES.NOTIFICATIONS, icon: Bell },
    { label: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Account Navigation Sidebar */}
      <div className="md:col-span-1">
        <div className="bg-[#F8F5F0] border border-[#EAE1D0] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-[#EAE1D0]">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={user?.firstName}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#C59B34]"
            />
            <div className="min-w-0">
              <h4 className="font-serif font-bold text-sm text-[#2C1E16] truncate">
                {user?.firstName} {user?.lastName}
              </h4>
              <p className="text-xs text-[#6E584B] truncate font-sans">{user?.email}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1 text-xs font-serif font-bold uppercase tracking-wider">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? 'gold-gradient-btn text-[#2C1E16] font-bold shadow-xs border border-[#E6C875]'
                        : 'text-[#6E584B] hover:bg-[#FAF2E4] hover:text-[#7A1F1E]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-[#C59B34]" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
            <button
              onClick={logoutUser}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#7A1F1E] hover:bg-[#FAF2E4] transition-colors w-full text-left font-serif font-bold uppercase tracking-wider mt-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:col-span-3">
        <Outlet />
      </div>
    </div>
  );
};
