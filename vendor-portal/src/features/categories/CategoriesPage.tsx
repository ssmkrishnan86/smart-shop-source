import React from 'react';
import { Layers, Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const CategoriesPage: React.FC = () => {
  const categories = [
    { name: 'Idols & Statues', count: 45, status: 'Active' },
    { name: 'Puja Samagri Sets', count: 82, status: 'Active' },
    { name: 'Certified Rudraksha', count: 14, status: 'Active' },
    { name: 'Sacred Books', count: 31, status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Store Department Mapping</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage store categories and request platform department access.</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4 text-[#DAA520]" />}>Request New Department</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <Layers className="w-5 h-5 text-[#800020]" />
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {cat.status}
              </span>
            </div>
            <h3 className="font-extrabold text-base text-slate-900">{cat.name}</h3>
            <p className="text-xs text-slate-500">{cat.count} Active Products</p>
          </div>
        ))}
      </div>
    </div>
  );
};
