import React from 'react';
import { Tag, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const CouponsPage: React.FC = () => {
  const coupons = [
    { code: 'FESTIVE30', discount: '30% OFF', scope: 'Site-Wide', status: 'Active' },
    { code: 'SMART500', discount: '₹500 OFF', scope: 'Orders above ₹2,999', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Site-Wide Coupons & Platform Campaigns</h1>
          <p className="text-xs text-slate-500 mt-0.5">Create platform-funded promotional campaigns & site-wide discount codes.</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4 text-[#DAA520]" />}>Create Global Campaign</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map((c, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-mono font-black text-lg text-[#800020] bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                {c.code}
              </span>
              <p className="text-xs font-bold text-slate-900 mt-2">{c.discount} • {c.scope}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
