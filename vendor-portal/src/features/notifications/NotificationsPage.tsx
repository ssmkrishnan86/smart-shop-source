import React from 'react';
import { Bell, ShoppingBag, Sparkles, DollarSign } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const notifications = [
    { title: 'New Customer Order Received!', desc: 'Order #ORD-2026-9821 placed for Brass Ganesha Idol', time: '10 mins ago', icon: ShoppingBag },
    { title: 'Payout Processed Successfully', desc: '₹41,650 transferred to HDFC Bank A/c ending 9821', time: '2 hours ago', icon: DollarSign },
    { title: 'Festive Campaign Active', desc: 'Festive offer Upto 30% OFF banner is live on your store', time: '1 day ago', icon: Sparkles },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Vendor Notification Center</h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time alerts for customer orders, payouts & store updates.</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n, idx) => {
          const Icon = n.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-50 text-[#800020] border border-amber-200 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-sm text-slate-900">{n.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{n.desc}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
