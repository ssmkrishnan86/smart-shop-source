import React, { useState } from 'react';
import { Truck, Plus, CheckCircle2, AlertCircle, X, ShieldCheck, Globe, Navigation } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface IShippingPartner {
  id: string;
  name: string;
  serviceType: string;
  coverage: string;
  trackingUrl: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export const INITIAL_PARTNERS: IShippingPartner[] = [
  { id: 'partner_1', name: 'BlueDart Express', serviceType: 'Air Express', coverage: 'Pan-India (19,000+ Pincodes)', trackingUrl: 'https://www.bluedart.com/tracking?awb={AWB}', status: 'ACTIVE' },
  { id: 'partner_2', name: 'Delhivery Surface & Express', serviceType: 'Express Cargo', coverage: 'Pan-India (18,500+ Pincodes)', trackingUrl: 'https://www.delhivery.com/track/package/{AWB}', status: 'ACTIVE' },
  { id: 'partner_3', name: 'Ekart Logistics', serviceType: 'Surface & Air', coverage: 'Pan-India (14,000+ Pincodes)', trackingUrl: 'https://ekartlogistics.com/shipmenttrack/{AWB}', status: 'ACTIVE' },
  { id: 'partner_4', name: 'Xpressbees Courier', serviceType: 'Express Delivery', coverage: 'Pan-India (12,000+ Pincodes)', trackingUrl: 'https://www.xpressbees.com/track?isAWB=true&trackNo={AWB}', status: 'ACTIVE' },
];

export const ShippingPage: React.FC = () => {
  const [partners, setPartners] = useState<IShippingPartner[]>(INITIAL_PARTNERS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    serviceType: 'Air Express',
    coverage: 'Pan-India',
    apiKey: '',
    trackingUrl: '',
  });
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddPartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('error', 'Please enter partner name.');
      return;
    }

    const newPartner: IShippingPartner = {
      id: `partner_${Date.now()}`,
      name: formData.name.trim(),
      serviceType: formData.serviceType,
      coverage: formData.coverage || 'Pan-India (15,000+ Pincodes)',
      trackingUrl: formData.trackingUrl || 'https://courier.com/track/{AWB}',
      status: 'ACTIVE',
    };

    setPartners([newPartner, ...partners]);
    showToast('success', `Logistics partner "${newPartner.name}" added successfully!`);
    setIsModalOpen(false);
    setFormData({ name: '', serviceType: 'Air Express', coverage: 'Pan-India', apiKey: '', trackingUrl: '' });
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
          <h1 className="text-2xl font-black text-slate-900 font-serif">Courier &amp; Logistics Partners</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage global logistics integrations, pincode serviceability, &amp; automated AWB tracking integrations.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4 text-[#DAA520]" />}
        >
          Add Logistics Partner
        </Button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((p) => (
          <div key={p.id} className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 border border-amber-300 text-[#800020] flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ACTIVE
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900 font-serif">{p.name}</h3>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <Navigation className="w-3 h-3 text-amber-700" /> Service: {p.serviceType}
              </p>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <Globe className="w-3 h-3 text-slate-400" /> Coverage: {p.coverage}
              </p>
            </div>

            <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="text-slate-500 font-mono text-[10px] truncate max-w-[200px]">{p.trackingUrl}</span>
              <span className="text-emerald-700 font-bold">API Connected</span>
            </div>
          </div>
        ))}
      </div>

      {/* ADD LOGISTICS PARTNER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Truck className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Add Logistics Partner</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPartnerSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Logistics Partner Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ekart Express Logistics"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Service Type</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData((prev) => ({ ...prev, serviceType: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Air Express">Air Express</option>
                    <option value="Surface Cargo">Surface Cargo</option>
                    <option value="Hyper-Local Delivery">Hyper-Local Delivery</option>
                    <option value="International Air">International Air</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Coverage Region</label>
                  <input
                    type="text"
                    value={formData.coverage}
                    onChange={(e) => setFormData((prev) => ({ ...prev, coverage: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">API Integration Secret Key</label>
                <input
                  type="password"
                  placeholder="e.g. secret_live_ekart_984210"
                  value={formData.apiKey}
                  onChange={(e) => setFormData((prev) => ({ ...prev, apiKey: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Tracking URL Template ({`{AWB}`})</label>
                <input
                  type="text"
                  placeholder="https://courier.com/track/{AWB}"
                  value={formData.trackingUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, trackingUrl: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                  Save Logistics Partner
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
