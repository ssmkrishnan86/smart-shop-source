import React from 'react';
import { Settings, Bell, DollarSign, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Store Settings & Preferences</h1>
        <p className="text-xs text-slate-500 mt-0.5">Configure store notifications, default currency & security settings.</p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-6 text-xs font-semibold">
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#800020]" /> Email & SMS Order Notifications
          </h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-amber-300 text-[#800020] focus:ring-[#800020]" />
            <span>Receive instant email notification when a new order is placed</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-amber-300 text-[#800020] focus:ring-[#800020]" />
            <span>Receive low stock alerts when product units fall below 5</span>
          </label>
        </div>

        <div className="pt-4 border-t border-amber-100 space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#800020]" /> Store Currency
          </h3>
          <select className="px-3 py-2 rounded-xl border border-amber-200 bg-white font-bold">
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
          </select>
        </div>

        <div className="pt-4 border-t border-amber-100">
          <Button>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
};
