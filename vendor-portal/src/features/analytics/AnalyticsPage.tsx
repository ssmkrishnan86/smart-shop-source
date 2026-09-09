import React from 'react';
import { BarChart3, TrendingUp, Users, ShoppingBag } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Analytics & Sales Reports</h1>
        <p className="text-xs text-slate-500 mt-0.5">Comprehensive store performance, customer conversion metrics & revenue analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Store Visitors</span>
          <h2 className="text-3xl font-black text-slate-900">18,420</h2>
          <span className="text-xs font-bold text-emerald-600">+22.4% vs last week</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Cart Conversion Rate</span>
          <h2 className="text-3xl font-black text-[#800020]">4.82%</h2>
          <span className="text-xs font-bold text-emerald-600">Above industry avg</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Average Order Value</span>
          <h2 className="text-3xl font-black text-amber-700">₹1,840.00</h2>
          <span className="text-xs font-bold text-emerald-600">+8.1% vs target</span>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-white border border-amber-200 shadow-sm text-center space-y-3">
        <BarChart3 className="w-12 h-12 text-[#800020] mx-auto opacity-80" />
        <h3 className="font-extrabold text-base text-slate-900">Interactive Revenue Chart Visualizer</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Detailed sales breakdown by category, top SKUs, customer geographical distribution, and monthly growth trends.
        </p>
      </div>
    </div>
  );
};
