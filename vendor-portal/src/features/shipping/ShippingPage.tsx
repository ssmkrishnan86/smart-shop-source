import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';

export const ShippingPage: React.FC = () => {
  const partners = [
    { name: 'BlueDart Express', type: 'Express (1-2 Days)', rate: '₹80 / order', status: 'Active' },
    { name: 'Delhivery Surface', type: 'Standard (3-5 Days)', rate: '₹40 / order', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Shipping & Delivery Partners</h1>
        <p className="text-xs text-slate-500 mt-0.5">Configure logistics partner integrations, delivery SLA & flat shipping rates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partners.map((p, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#800020]" />
                <h3 className="font-extrabold text-base text-slate-900">{p.name}</h3>
              </div>
              <p className="text-xs text-slate-500">{p.type}</p>
              <span className="text-xs font-bold text-[#800020]">{p.rate}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
