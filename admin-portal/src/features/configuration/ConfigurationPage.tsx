import React, { useState } from 'react';
import { Sliders, Server, Cpu, CheckCircle2, AlertCircle, X, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ConfigurationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    backendUrl: 'http://localhost:8000/api/v1',
    redisHost: '127.0.0.1:6379',
    razorpayMode: 'SANDBOX',
    maintenanceMode: false,
    logLevel: 'INFO',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      showToast('success', 'Application configuration saved successfully!');
    } catch {
      showToast('error', 'Failed to save application configuration.');
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
        <h1 className="text-2xl font-black text-slate-900 font-serif">Application Configuration</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage API Gateway connection endpoints, Redis caching, Razorpay mode, &amp; maintenance flags.
        </p>
      </div>

      <form onSubmit={handleSaveConfig} className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-6 text-xs font-sans">
        <div className="space-y-2">
          <label className="block text-slate-900 font-extrabold text-sm">FastAPI Backend Target Endpoint</label>
          <input
            type="text"
            required
            value={formData.backendUrl}
            onChange={(e) => setFormData((prev) => ({ ...prev, backendUrl: e.target.value }))}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-amber-100">
          <div className="space-y-2">
            <label className="block text-slate-900 font-extrabold">Redis Cache Connection</label>
            <input
              type="text"
              value={formData.redisHost}
              onChange={(e) => setFormData((prev) => ({ ...prev, redisHost: e.target.value }))}
              className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-slate-900 font-extrabold">Razorpay Payment Environment</label>
            <select
              value={formData.razorpayMode}
              onChange={(e) => setFormData((prev) => ({ ...prev, razorpayMode: e.target.value }))}
              className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="SANDBOX">SANDBOX (Test Credentials Mode)</option>
              <option value="LIVE">LIVE (Production Gateway Mode)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
          <div>
            <p className="font-extrabold text-slate-900 text-sm">Marketplace Maintenance Mode</p>
            <p className="text-slate-500 text-[11px]">When active, DivineKart storefront displays a maintenance banner to shoppers.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              formData.maintenanceMode
                ? 'bg-rose-900 text-rose-50 border border-rose-700'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}
          >
            {formData.maintenanceMode ? <ToggleRight className="w-5 h-5 text-rose-400" /> : <ToggleLeft className="w-5 h-5 text-emerald-600" />}
            {formData.maintenanceMode ? 'ENABLED (Store Offline)' : 'DISABLED (Store Live)'}
          </button>
        </div>

        <div className="pt-4 border-t border-amber-100 flex items-center justify-end">
          <Button
            type="submit"
            variant="gold"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4 text-[#DAA520]" />}
          >
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};
