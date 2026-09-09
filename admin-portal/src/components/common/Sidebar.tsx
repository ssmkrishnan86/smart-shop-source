import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Store,
  Package,
  Layers,
  Award,
  Boxes,
  ShoppingBag,
  DollarSign,
  Truck,
  RotateCcw,
  Tag,
  Star,
  FileText,
  Bell,
  BarChart3,
  ShieldCheck,
  History,
  Settings,
  Sliders,
  Activity,
  LogOut,
} from 'lucide-react';
import { useAppDispatch } from '../../store';
import { logout } from '../../store';

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const navItems = [
    { to: '/dashboard', label: 'Platform Telemetry', icon: LayoutDashboard },
    { to: '/users', label: 'Admin Staff Users', icon: Users },
    { to: '/customers', label: 'Customers Directory', icon: UserCheck },
    { to: '/vendors', label: 'Vendor Approvals', icon: Store },
    { to: '/products', label: 'Catalog Moderation', icon: Package },
    { to: '/categories', label: 'Category Hierarchy', icon: Layers },
    { to: '/brands', label: 'Brand Registry', icon: Award },
    { to: '/inventory', label: 'Global Stock Audit', icon: Boxes },
    { to: '/orders', label: 'Multi-Vendor Orders', icon: ShoppingBag },
    { to: '/payments', label: 'Payouts & Commission', icon: DollarSign },
    { to: '/shipping', label: 'Courier Partners', icon: Truck },
    { to: '/returns', label: 'Return Disputes', icon: RotateCcw },
    { to: '/coupons', label: 'Site-Wide Campaigns', icon: Tag },
    { to: '/reviews', label: 'Review Moderation', icon: Star },
    { to: '/cms', label: 'CMS Content Editor', icon: FileText },
    { to: '/notifications', label: 'System Broadcasts', icon: Bell },
    { to: '/analytics', label: 'GMV & Analytics', icon: BarChart3 },
    { to: '/rbac', label: 'RBAC Permissions', icon: ShieldCheck },
    { to: '/audit', label: 'Audit Trail Logs', icon: History },
    { to: '/settings', label: 'System Settings', icon: Settings },
    { to: '/configuration', label: 'App Configuration', icon: Sliders },
    { to: '/monitoring', label: 'Microservices Health', icon: Activity },
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
              DIVINE<span className="text-[#C59B34]">ADMIN</span>
            </h2>
            <span className="text-[10px] font-serif font-bold text-[#6E584B] tracking-widest uppercase">
              Super Admin Console
            </span>
          </div>
        </div>

        {/* Admin Badge */}
        <div className="p-3 rounded-xl bg-[#F8F5F0] border border-[#EAE1D0] flex items-center gap-2.5 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-[#C59B34] shrink-0" />
          <div className="min-w-0">
            <p className="font-serif font-bold text-xs text-[#2C1E16] truncate">Platform Super Admin</p>
            <p className="text-[10px] text-[#6E584B] font-semibold">Full Governance Access</p>
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
          onClick={() => dispatch(logout())}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#7A1F1E] hover:bg-[#FAF2E4] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
