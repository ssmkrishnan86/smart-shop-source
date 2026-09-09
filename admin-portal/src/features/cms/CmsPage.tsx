import React, { useState } from 'react';
import { FileText, Image, CheckCircle2, AlertCircle, X, ShieldCheck, Edit2, Link as LinkIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface IBannerItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaLink: string;
  active: boolean;
}

export interface IPolicyItem {
  key: string;
  title: string;
  content: string;
  lastUpdated: string;
}

export const INITIAL_BANNERS: IBannerItem[] = [
  { id: 'banner_1', title: 'Festive Divine Handicrafts Sale', subtitle: 'Up to 30% Off Authentic Brass Idols & Temple Diya Sets', imageUrl: 'http://127.0.0.1:8000/images/products/brass_ganesha_idol.jpg', ctaLink: '/category/idols-statues', active: true },
  { id: 'banner_2', title: 'Lab Certified Rudraksha Collection', subtitle: 'Consecrated 1 to 14 Mukhi Beads from Nepal & Java', imageUrl: 'http://127.0.0.1:8000/images/products/5_mukhi_rudraksha_mala.jpg', ctaLink: '/category/certified-rudraksha', active: true },
  { id: 'banner_3', title: 'Pure Samagri & Camphor Wicks', subtitle: 'Organically Sourced Pure Sandalwood, Dhoop & Ghee', imageUrl: 'http://127.0.0.1:8000/images/products/akhand_diya_lamp.jpg', ctaLink: '/category/puja-samagri', active: true },
];

export const INITIAL_POLICIES: IPolicyItem[] = [
  { key: 'terms', title: 'Platform Terms of Service', content: 'DivineKart operates as a multi-vendor spiritual marketplace connecting authenticated artisan vendors with customers.', lastUpdated: '01 Aug 2026' },
  { key: 'returns', title: 'Return & Refund Policy', content: 'Customers may initiate a return within 7 days of delivery for damaged or defective spiritual items.', lastUpdated: '15 Jul 2026' },
  { key: 'seller_agreement', title: 'Seller Marketplace Agreement', content: 'Vendors must ensure all brass items, rudraksha beads, and puja samagri meet certified quality standards.', lastUpdated: '10 Jun 2026' },
];

export const CmsPage: React.FC = () => {
  const [banners, setBanners] = useState<IBannerItem[]>(INITIAL_BANNERS);
  const [policies, setPolicies] = useState<IPolicyItem[]>(INITIAL_POLICIES);

  // Hero Banner Modal State
  const [isBannerModalOpen, setIsBannerModalOpen] = useState<boolean>(false);
  const [editingBanner, setEditingBanner] = useState<IBannerItem>(INITIAL_BANNERS[0]);

  // Policy Modal State
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const [selectedPolicyKey, setSelectedPolicyKey] = useState<string>('terms');
  const [policyContentInput, setPolicyContentInput] = useState<string>(INITIAL_POLICIES[0].content);

  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenBannerModal = (banner: IBannerItem) => {
    setEditingBanner(banner);
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    setBanners((prev) => prev.map((b) => (b.id === editingBanner.id ? editingBanner : b)));
    showToast('success', `Hero Banner "${editingBanner.title}" updated successfully!`);
    setIsBannerModalOpen(false);
  };

  const handleOpenPolicyModal = (policy: IPolicyItem) => {
    setSelectedPolicyKey(policy.key);
    setPolicyContentInput(policy.content);
    setIsPolicyModalOpen(true);
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    setPolicies((prev) =>
      prev.map((p) =>
        p.key === selectedPolicyKey
          ? { ...p, content: policyContentInput, lastUpdated: new Date().toLocaleDateString() }
          : p
      )
    );
    showToast('success', 'Policy content updated & published to storefront!');
    setIsPolicyModalOpen(false);
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
          <h1 className="text-2xl font-black text-slate-900 font-serif">CMS &amp; Content Management Editor</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage home page promotional banners, hero sliders &amp; legal terms policy content.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner Section Card */}
        <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-[#800020]">
                <Image className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 font-serif">Home Hero Banners</h3>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              {banners.length} Active Banners
            </span>
          </div>

          <div className="space-y-3">
            {banners.map((b) => (
              <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={b.imageUrl} alt={b.title} className="w-12 h-12 rounded-xl object-cover border border-amber-200 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{b.title}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{b.subtitle}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleOpenBannerModal(b)} leftIcon={<Edit2 className="w-3.5 h-3.5" />}>
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Section Card */}
        <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-[#800020]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 font-serif">Terms &amp; Policy Pages</h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Legal Pages
            </span>
          </div>

          <div className="space-y-3">
            {policies.map((p) => (
              <div key={p.key} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900 text-xs">{p.title}</p>
                  <p className="text-[10px] text-slate-500 font-mono">Updated: {p.lastUpdated}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleOpenPolicyModal(p)} leftIcon={<Edit2 className="w-3.5 h-3.5" />}>
                  Edit Policy
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EDIT HERO BANNER MODAL */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Image className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Edit Hero Banner</h3>
              </div>
              <button
                onClick={() => setIsBannerModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Banner Title *</label>
                <input
                  type="text"
                  required
                  value={editingBanner.title}
                  onChange={(e) => setEditingBanner((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={editingBanner.subtitle}
                  onChange={(e) => setEditingBanner((prev) => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Banner Image URL</label>
                <input
                  type="text"
                  value={editingBanner.imageUrl}
                  onChange={(e) => setEditingBanner((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">CTA Target Link</label>
                <input
                  type="text"
                  value={editingBanner.ctaLink}
                  onChange={(e) => setEditingBanner((prev) => ({ ...prev, ctaLink: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsBannerModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm" leftIcon={<ShieldCheck className="w-4 h-4" />}>
                  Save Banner
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT POLICY MODAL */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <FileText className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Edit Policy Content</h3>
              </div>
              <button
                onClick={() => setIsPolicyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePolicy} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Policy Page Document</label>
                <select
                  value={selectedPolicyKey}
                  onChange={(e) => {
                    setSelectedPolicyKey(e.target.value);
                    const item = policies.find((p) => p.key === e.target.value);
                    if (item) setPolicyContentInput(item.content);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {policies.map((p) => (
                    <option key={p.key} value={p.key}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Policy Terms Content Body *</label>
                <textarea
                  rows={6}
                  required
                  value={policyContentInput}
                  onChange={(e) => setPolicyContentInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-sans text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsPolicyModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm" leftIcon={<ShieldCheck className="w-4 h-4" />}>
                  Save &amp; Publish Policy
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
