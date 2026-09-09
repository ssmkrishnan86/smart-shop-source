import React, { useState } from 'react';
import { Award, Plus, CheckCircle2, AlertCircle, X, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface IBrandItem {
  id: string;
  name: string;
  country: string;
  category: string;
  productsCount: number;
  verified: boolean;
}

export const INITIAL_BRANDS: IBrandItem[] = [
  { id: 'brand_1', name: 'DivineKart Artisan', country: 'India', category: 'Idols & Statues', productsCount: 120, verified: true },
  { id: 'brand_2', name: 'Vedic Crafts Heritage', country: 'India', category: 'Brass Handicrafts', productsCount: 85, verified: true },
  { id: 'brand_3', name: 'Kanchipuram Silk Trust', country: 'India', category: 'Festive Sarees', productsCount: 40, verified: true },
  { id: 'brand_4', name: 'Nepal Rudraksha Sansthan', country: 'Nepal', category: 'Certified Beads', productsCount: 65, verified: true },
  { id: 'brand_5', name: 'Gita Press Gorakhpur', country: 'India', category: 'Sacred Books', productsCount: 110, verified: true },
];

export const BrandsPage: React.FC = () => {
  const [brands, setBrands] = useState<IBrandItem[]>(INITIAL_BRANDS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    country: 'India',
    category: 'Idols & Statues',
    trademarkNumber: '',
  });
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRegisterBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('error', 'Please enter a brand name.');
      return;
    }

    const newBrand: IBrandItem = {
      id: `brand_${Date.now()}`,
      name: formData.name.trim(),
      country: formData.country.trim() || 'India',
      category: formData.category,
      productsCount: 0,
      verified: true,
    };

    setBrands([newBrand, ...brands]);
    showToast('success', `Brand "${newBrand.name}" registered and verified!`);
    setIsModalOpen(false);
    setFormData({ name: '', country: 'India', category: 'Idols & Statues', trademarkNumber: '' });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-xs font-bold transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
              : 'bg-rose-900 text-rose-50 border-rose-700'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Verified Brand Registry</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage officially recognized brand trademarks, authorized sellers &amp; IP protection.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4 text-[#DAA520]" />}
        >
          Register Brand
        </Button>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((b) => (
          <div key={b.id} className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 border border-amber-300 text-[#800020] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> VERIFIED
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900 font-serif">{b.name}</h3>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <Globe className="w-3 h-3 text-slate-400" /> {b.country} • {b.category}
              </p>
            </div>

            <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="text-slate-500">{b.productsCount} Authorized Listings</span>
              <span className="text-emerald-700 font-bold">IP Protected</span>
            </div>
          </div>
        ))}
      </div>

      {/* REGISTER BRAND MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Award className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Register Official Brand</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterBrandSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kanchi Silk Weavers Guild"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Country of Origin</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Primary Department</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Idols & Statues">Idols &amp; Statues</option>
                    <option value="Puja Samagri">Puja Samagri</option>
                    <option value="Certified Beads">Certified Beads</option>
                    <option value="Festive Sarees">Festive Sarees</option>
                    <option value="Sacred Books">Sacred Books</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Trademark / Registration Reg. No.</label>
                <input
                  type="text"
                  placeholder="TM-2026-984210"
                  value={formData.trademarkNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, trademarkNumber: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-semibold">Registered brands receive verified badges across product cards.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  leftIcon={<ShieldCheck className="w-4 h-4" />}
                >
                  Register &amp; Verify Brand
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
