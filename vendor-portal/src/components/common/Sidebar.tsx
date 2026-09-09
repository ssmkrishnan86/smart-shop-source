import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ShoppingBag,
  Truck,
  RotateCcw,
  DollarSign,
  Tag,
  Star,
  BarChart3,
  Bell,
  Store,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store';
import { authService } from '../../services/authService';

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.auth.store);

  const handleLogout = async () => {
    await authService.logout().catch(() => undefined);
    dispatch(logout());
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/products', label: 'Products Catalog', icon: Package },
    { to: '/categories', label: 'Store Categories', icon: Layers },
    { to: '/inventory', label: 'Inventory Manager', icon: Boxes },
    { to: '/orders', label: 'Orders & Fulfillment', icon: ShoppingBag },
    { to: '/shipping', label: 'Shipping & Delivery', icon: Truck },
    { to: '/returns', label: 'Returns & Refunds', icon: RotateCcw },
    { to: '/payments', label: 'Payouts & Settlements', icon: DollarSign },
    { to: '/coupons', label: 'Coupons & Campaigns', icon: Tag },
    { to: '/reviews', label: 'Customer Reviews', icon: Star },
    { to: '/analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/profile', label: 'Store Profile', icon: Store },
    { to: '/settings', label: 'Store Settings', icon: Settings },
    { to: '/support', label: 'Support & Help', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 border-r border-[#EAE1D0] bg-[#F8F5F0] p-5 flex flex-col justify-between h-screen sticky top-0 overflow-y-auto shrink-0 transition-colors">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-10 h-10 rounded-xl gold-gradient text-[#2C1E16] flex items-center justify-center font-black text-xl shadow-sm border border-[#E6C875]">
            🪔
          </div>
          <div>
            <h2 className="font-serif font-black text-xl text-[#2C1E16] leading-none">
              DIVINE<span className="text-[#C59B34]">VENDOR</span>
            </h2>
            <span className="text-[10px] font-serif font-bold text-[#6E584B] tracking-widest uppercase">
              Merchant Seller Hub
            </span>
          </div>
        </div>

        {/* Store Badge */}
        <div className="p-3 rounded-xl bg-[#F8F5F0] border border-[#EAE1D0] flex items-center gap-2.5 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="min-w-0">
            <p className="font-serif font-bold text-xs text-[#2C1E16] truncate">{store?.name || 'Store Pending Setup'}</p>
            <p className="text-[10px] text-emerald-700 font-semibold">{store?.status === 'ACTIVE' ? 'Verified Active Merchant' : store?.status || 'Awaiting verification'}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'maroon-gradient-btn text-white font-bold shadow-xs'
                      : 'text-[#6E584B] hover:bg-[#FAF2E4] hover:text-[#7A1F1E]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0 text-[#C59B34]" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-[#EAE1D0] mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#7A1F1E] hover:bg-[#FAF2E4] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
