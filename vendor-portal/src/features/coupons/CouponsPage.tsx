import React, { useState, useEffect } from 'react';
import {
  Tag,
  Plus,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Calendar,
  DollarSign,
  TrendingUp,
  Percent,
  Search,
  X,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Clock,
  ShieldCheck,
  Info
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { MetricCard } from '../../components/ui/MetricCard';
import { vendorCouponService, ICouponModel } from '../../services/vendorCouponService';

export const CouponsPage: React.FC = () => {
  const [coupons, setCoupons] = useState<ICouponModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Form State for New Coupon
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'PERCENTAGE' as 'PERCENTAGE' | 'FLAT',
    discountValue: '',
    minPurchase: '',
    maxDiscount: '',
    maxUses: '100',
    expiryDate: '2026-12-31',
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    setIsLoading(true);
    try {
      const data = await vendorCouponService.getCoupons();
      setCoupons(data);
    } catch {
      showToast('error', 'Failed to load coupons.');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('info', `Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleGenerateRandomCode = () => {
    const prefixes = ['DIVINE', 'VEDIC', 'HOLI', 'FESTIVE', 'SMART', 'SPECIAL'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(10 + Math.random() * 90);
    setFormData((prev) => ({ ...prev, code: `${randomPrefix}${randomNum}` }));
    setFormError(null);
  };

  const handleCreateCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanCode = formData.code.trim().toUpperCase();
    if (!cleanCode) {
      setFormError('Please enter a valid promo coupon code.');
      return;
    }

    const val = parseFloat(formData.discountValue);
    if (isNaN(val) || val <= 0) {
      setFormError('Please enter a positive discount value.');
      return;
    }

    if (formData.discountType === 'PERCENTAGE' && val > 90) {
      setFormError('Percentage discount cannot exceed 90%.');
      return;
    }

    const minBuy = parseFloat(formData.minPurchase) || 0;
    const maxDisc = formData.maxDiscount ? parseFloat(formData.maxDiscount) : undefined;
    const maxUses = parseInt(formData.maxUses, 10) || 100;

    setIsSubmitting(true);
    try {
      const created = await vendorCouponService.createCoupon({
        code: cleanCode,
        discountType: formData.discountType,
        discountValue: val,
        minPurchase: minBuy,
        maxDiscount: maxDisc,
        maxUses,
        expiryDate: formData.expiryDate || '2026-12-31',
      });

      setCoupons((prev) => [created, ...prev.filter((c) => c.id !== created.id)]);
      showToast('success', `Promo code ${created.code} created successfully!`);
      
      // Reset & Close Modal
      setIsModalOpen(false);
      setFormData({
        code: '',
        discountType: 'PERCENTAGE',
        discountValue: '',
        minPurchase: '',
        maxDiscount: '',
        maxUses: '100',
        expiryDate: '2026-12-31',
      });
    } catch (err: any) {
      setFormError(err?.response?.data?.detail || 'Failed to create coupon code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (couponId: string) => {
    try {
      const updated = await vendorCouponService.toggleCouponStatus(couponId);
      setCoupons((prev) =>
        prev.map((c) => (c.id === couponId ? { ...c, status: updated.status } : c))
      );
      showToast(
        'info',
        `Coupon ${updated.code} is now ${updated.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE'}.`
      );
    } catch {
      showToast('error', 'Failed to update coupon status.');
    }
  };

  const handleDeleteCoupon = async (couponId: string, code: string) => {
    if (!window.confirm(`Are you sure you want to delete coupon ${code}?`)) return;
    try {
      await vendorCouponService.deleteCoupon(couponId);
      setCoupons((prev) => prev.filter((c) => c.id !== couponId));
      showToast('info', `Coupon ${code} deleted.`);
    } catch {
      showToast('error', 'Failed to delete coupon.');
    }
  };

  // Filtered List
  const filteredCoupons = coupons.filter((c) => {
    const matchesTab = activeTab === 'ALL' || c.status === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || c.code.toLowerCase().includes(q) || c.discountDisplay.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  // Calculate Metrics
  const activeCount = coupons.filter((c) => c.status === 'ACTIVE').length;
  const totalUses = coupons.reduce((sum, c) => sum + (c.usesCount || 0), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-xs font-bold transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
              : toastMessage.type === 'error'
              ? 'bg-rose-900 text-rose-50 border-rose-700'
              : 'bg-amber-950 text-amber-100 border-amber-800'
          }`}
        >
          {toastMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toastMessage.type === 'info' && <Tag className="w-5 h-5 text-amber-400 shrink-0" />}
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Promotions & Coupon Creator</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create store promo codes, set minimum purchase rules & track usage analytics.
          </p>
        </div>
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormError(null);
          }}
          leftIcon={<Plus className="w-4 h-4 text-[#DAA520]" />}
        >
          Create Coupon Code
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Active Promo Codes"
          value={activeCount.toString()}
          icon={Tag}
          color="bg-amber-50 text-amber-700"
          change={`${coupons.length} total created`}
          subtitle="live coupons"
        />
        <MetricCard
          title="Total Redemptions"
          value={totalUses.toString()}
          icon={TrendingUp}
          color="bg-emerald-50 text-emerald-700"
          change="Customer orders"
          subtitle="redeemed"
        />
        <MetricCard
          title="Max Discount Value"
          value="Up to 90%"
          icon={Percent}
          color="bg-rose-50 text-rose-700"
          change="Storewide campaigns"
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-50/70 rounded-xl border border-amber-200/60 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ALL'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            All Coupons ({coupons.length})
          </button>
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ACTIVE'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab('INACTIVE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'INACTIVE'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Inactive ({coupons.length - activeCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search coupon code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Coupons Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading store promotional coupons...</span>
        </div>
      ) : filteredCoupons.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2 bg-white rounded-2xl border border-amber-200/80">
          <Tag className="w-8 h-8 text-amber-300 stroke-1" />
          <p className="font-bold text-slate-700">No coupon codes found</p>
          <p className="text-[11px] text-slate-400">Click "Create Coupon Code" above to set up a promo offer!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCoupons.map((c) => (
            <div
              key={c.id}
              className={`p-5 rounded-2xl bg-white border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 group ${
                c.status === 'ACTIVE'
                  ? 'border-amber-200/80 hover:border-amber-400'
                  : 'border-slate-200 bg-slate-50/50 opacity-80'
              }`}
            >
              <div className="space-y-3">
                {/* Code & Actions */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-base text-[#800020] bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 tracking-wider">
                      {c.code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(c.code)}
                      title="Copy Coupon Code"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                    >
                      {copiedCode === c.code ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      c.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-200 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                {/* Offer details */}
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {c.discountDisplay} on orders above ₹{c.minPurchase.toLocaleString('en-IN')}
                  </h3>
                  {c.maxDiscount && (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Max discount limit: ₹{c.maxDiscount.toLocaleString('en-IN')}
                    </p>
                  )}
                </div>

                {/* Progress bar for uses */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>Usage limit</span>
                    <span>
                      {c.usesCount} / {c.maxUses || 100} used
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-600 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, ((c.usesCount || 0) / (c.maxUses || 100)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Expiry */}
                {c.expiryDate && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Valid until {c.expiryDate}</span>
                  </div>
                )}
              </div>

              {/* Bottom Card Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-amber-100/60 text-xs">
                <button
                  onClick={() => handleToggleStatus(c.id)}
                  className={`flex items-center gap-1 font-bold transition-colors ${
                    c.status === 'ACTIVE'
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-emerald-700 hover:text-emerald-900'
                  }`}
                >
                  {c.status === 'ACTIVE' ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-600" /> Deactivate
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-slate-400" /> Activate
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDeleteCoupon(c.id, c.code)}
                  className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 hover:underline text-[11px]"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE COUPON MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Create New Coupon Code</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateCouponSubmit} className="py-4 space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Coupon Code Input & Generator */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-800">Promo Code Name *</label>
                  <button
                    type="button"
                    onClick={handleGenerateRandomCode}
                    className="text-[11px] font-bold text-amber-800 hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" /> Auto-Generate Code
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. DIVINE25 or FESTIVE500"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))
                  }
                  className="w-full p-3 rounded-xl font-mono font-extrabold uppercase bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 tracking-wider"
                />
              </div>

              {/* Discount Type Toggle */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Discount Type *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, discountType: 'PERCENTAGE' }))}
                    className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                      formData.discountType === 'PERCENTAGE'
                        ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Percent className="w-4 h-4 text-amber-400" /> Percentage (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, discountType: 'FLAT' }))}
                    className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                      formData.discountType === 'FLAT'
                        ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <DollarSign className="w-4 h-4 text-amber-400" /> Flat Amount (₹)
                  </button>
                </div>
              </div>

              {/* Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">
                    Discount Value * ({formData.discountType === 'PERCENTAGE' ? '%' : '₹'})
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder={formData.discountType === 'PERCENTAGE' ? '20' : '200'}
                    value={formData.discountValue}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discountValue: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Minimum Order Amount (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="999"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData((prev) => ({ ...prev, minPurchase: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 font-bold"
                  />
                </div>
              </div>

              {/* Extra Limits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {formData.discountType === 'PERCENTAGE' && (
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Max Discount (₹)</label>
                    <input
                      type="number"
                      placeholder="500"
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, maxDiscount: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Max Total Uses</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="100"
                    value={formData.maxUses}
                    onChange={(e) => setFormData((prev) => ({ ...prev, maxUses: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-slate-800">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Live Preview:</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-slate-900 text-sm">
                    {formData.code || 'COUPON_CODE'}
                  </span>
                  <span className="font-extrabold text-[#800020]">
                    {formData.discountValue
                      ? formData.discountType === 'PERCENTAGE'
                        ? `${formData.discountValue}% OFF`
                        : `₹${formData.discountValue} OFF`
                      : 'OFFER'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Applicable on orders over ₹{formData.minPurchase || '0'}. Valid until {formData.expiryDate || '2026-12-31'}.
                </p>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  isLoading={isSubmitting}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Publish Coupon Code
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsPage;
