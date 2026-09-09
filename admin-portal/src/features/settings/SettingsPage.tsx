import React, { useState } from 'react';
import { Settings, DollarSign, Percent, ShieldCheck, CheckCircle2, AlertCircle, X, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    defaultCommission: 8,
    currency: 'INR',
    gstRate: 18,
    supportEmail: 'support@smartshop.com',
    minPayoutThreshold: 1000,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      showToast('success', 'Platform system settings saved successfully!');
    } catch {
      showToast('error', 'Failed to save settings.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl pb-12">
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
      <div>
        <h1 className="text-2xl font-black text-slate-900 font-serif">Platform System Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure default platform commission fees, GST tax rules, &amp; minimum merchant payout thresholds.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-6 text-xs">
        <div className="space-y-2">
          <label className="block text-slate-900 font-extrabold text-sm">Default Merchant Commission Rate (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={50}
              value={formData.defaultCommission}
              onChange={(e) => setFormData((prev) => ({ ...prev, defaultCommission: Number(e.target.value) }))}
              className="w-36 p-3 rounded-xl border border-slate-300 font-bold text-base text-[#800020] focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <span className="font-bold text-slate-600">% per order sale</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-amber-100">
          <div className="space-y-2">
            <label className="block text-slate-900 font-extrabold">Platform Base Currency</label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData((prev) => ({ ...prev, currency: e.target.value }))}
              className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="INR">Indian Rupee (₹ INR)</option>
              <option value="USD">US Dollar ($ USD)</option>
              <option value="EUR">Euro (€ EUR)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-900 font-extrabold">Default GST Tax Rate (%)</label>
            <input
              type="number"
              value={formData.gstRate}
              onChange={(e) => setFormData((prev) => ({ ...prev, gstRate: Number(e.target.value) }))}
              className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-amber-100">
          <div className="space-y-2">
            <label className="block text-slate-900 font-extrabold">Platform Support Email</label>
            <input
              type="email"
              value={formData.supportEmail}
              onChange={(e) => setFormData((prev) => ({ ...prev, supportEmail: e.target.value }))}
              className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-slate-900 font-extrabold">Min Vendor Payout Threshold (₹)</label>
            <input
              type="number"
              value={formData.minPayoutThreshold}
              onChange={(e) => setFormData((prev) => ({ ...prev, minPayoutThreshold: Number(e.target.value) }))}
              className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-amber-100 flex items-center justify-end">
          <Button
            type="submit"
            variant="gold"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4 text-[#DAA520]" />}
          >
            Save System Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
