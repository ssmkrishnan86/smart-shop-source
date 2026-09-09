import React from 'react';
import { Boxes, AlertTriangle } from 'lucide-react';

export const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Global Inventory Audit & Stock Overview</h1>
        <p className="text-xs text-slate-500 mt-0.5">Platform-wide stock auditing, out-of-stock item tracking & inventory health reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Total Platform Stock Units</span>
          <h2 className="text-3xl font-black text-slate-900">54,200</h2>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Low Stock Listings (&lt;5 units)</span>
          <h2 className="text-3xl font-black text-amber-600">18</h2>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Out-Of-Stock Listings</span>
          <h2 className="text-3xl font-black text-rose-600">4</h2>
        </div>
      </div>
    </div>
  );
};
