import React from 'react';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Platform GMV Reports & Revenue Heatmaps</h1>
        <p className="text-xs text-slate-500 mt-0.5">High-level macro telemetry: platform GMV, commission growth, merchant acquisition trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Total GMV (Current Quarter)</span>
          <h2 className="text-3xl font-black text-slate-900">₹1.42 Cr</h2>
          <span className="text-xs font-bold text-emerald-600">+24.8% YoY Growth</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Platform Net Revenue</span>
          <h2 className="text-3xl font-black text-[#800020]">₹11.36 Lakhs</h2>
          <span className="text-xs font-bold text-emerald-600">8% Avg Commission Fee</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Active Selling Stores</span>
          <h2 className="text-3xl font-black text-amber-700">1,420 Vendors</h2>
          <span className="text-xs font-bold text-emerald-600">+42 applications pending</span>
        </div>
      </div>
    </div>
  );
};
