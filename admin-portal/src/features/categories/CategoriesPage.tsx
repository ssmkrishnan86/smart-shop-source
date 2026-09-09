import React, { useState } from 'react';
import { Layers, Plus, CheckCircle2, AlertCircle, X, ShieldCheck, Tag } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface ICategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemsCount: number;
  commissionRate: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export const INITIAL_CATEGORIES: ICategoryItem[] = [
  { id: 'cat_1', name: 'Idols & Statues', slug: 'idols-statues', description: 'Handcrafted brass, marble, and panchdhatu divine idols.', itemsCount: 450, commissionRate: 8, status: 'ACTIVE' },
  { id: 'cat_2', name: 'Puja Samagri', slug: 'puja-samagri', description: 'Pure camphor, organic dhoop, agarbatti, ghee, and chandan.', itemsCount: 820, commissionRate: 10, status: 'ACTIVE' },
  { id: 'cat_3', name: 'Certified Rudraksha', slug: 'certified-rudraksha', description: 'Lab certified 1 to 14 Mukhi Nepal and Java Rudraksha beads.', itemsCount: 140, commissionRate: 12, status: 'ACTIVE' },
  { id: 'cat_4', name: 'Sacred Books', slug: 'sacred-books', description: 'Bhagavad Gita, Ramayana, Upanishads, and Vedic scriptures.', itemsCount: 310, commissionRate: 5, status: 'ACTIVE' },
  { id: 'cat_5', name: 'Yantras & Frames', slug: 'yantras-frames', description: 'Consecrated Sri Yantra, Kuber Yantra, and gold foiled frames.', itemsCount: 95, commissionRate: 10, status: 'ACTIVE' },
  { id: 'cat_6', name: 'Gifts & Devotional Art', slug: 'gifts-devotional-art', description: 'Panchamrita kalash, brass diya sets, and festive return gifts.', itemsCount: 220, commissionRate: 8, status: 'ACTIVE' },
];

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategoryItem[]>(INITIAL_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    commissionRate: 8,
  });
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleNameChange = (val: string) => {
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData((prev) => ({ ...prev, name: val, slug: generatedSlug }));
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('error', 'Please enter a category name.');
      return;
    }

    const newCat: ICategoryItem = {
      id: `cat_${Date.now()}`,
      name: formData.name.trim(),
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description.trim() || 'Sacred catalog department.',
      itemsCount: 0,
      commissionRate: formData.commissionRate || 8,
      status: 'ACTIVE',
    };

    setCategories([newCat, ...categories]);
    showToast('success', `Category "${newCat.name}" added to global catalog!`);
    setIsModalOpen(false);
    setFormData({ name: '', slug: '', description: '', commissionRate: 8 });
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
          <h1 className="text-2xl font-black text-slate-900 font-serif">Global Category Hierarchy</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage root departments, category icons, commission rules &amp; product mappings.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4 text-[#DAA520]" />}
        >
          Add Category
        </Button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 border border-amber-300 text-[#800020] flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold border border-emerald-300">
                {c.status}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900 font-serif">{c.name}</h3>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">/{c.slug}</p>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{c.description}</p>
            </div>

            <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="text-slate-500">{c.itemsCount} Global Products</span>
              <span className="text-[#800020] font-black">{c.commissionRate}% Fee</span>
            </div>
          </div>
        ))}
      </div>

      {/* ADD CATEGORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Tag className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Add New Category</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategorySubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Temple Jewellery & Accessories"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">URL Slug</label>
                <input
                  type="text"
                  placeholder="temple-jewellery-accessories"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Category Description</label>
                <textarea
                  rows={2}
                  placeholder="Enter short department description..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Category Commission Rate (%)</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={formData.commissionRate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, commissionRate: Number(e.target.value) }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-bold text-sm text-[#800020] focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
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
                  Save &amp; Create Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
