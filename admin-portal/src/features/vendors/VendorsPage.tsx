import React, { useEffect, useState } from 'react';
import { adminVendorService } from '../../services/adminVendorService';
import { IVendor } from '../../interfaces';
import { VendorStatus } from '../../enums';
import { Store, Percent, CheckCircle2, AlertCircle, X, Edit2, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const VendorsPage: React.FC = () => {
  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Edit Commission Modal State
  const [editingVendor, setEditingVendor] = useState<IVendor | null>(null);
  const [commissionRate, setCommissionRate] = useState<number>(8);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    setLoading(true);
    try {
      const res = await adminVendorService.getVendors();
      setVendors([...res.data]);
    } catch {
      showToast('error', 'Failed to load merchant vendors.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenEditModal = (vendor: IVendor) => {
    setEditingVendor(vendor);
    setCommissionRate(vendor.commissionRate || 8);
  };

  const handleSaveCommission = async () => {
    if (!editingVendor) return;
    setIsSubmitting(true);
    try {
      // Update local state
      setVendors((prev) =>
        prev.map((v) => (v.id === editingVendor.id ? { ...v, commissionRate } : v))
      );
      showToast('success', `Commission rate for ${editingVendor.name} updated to ${commissionRate}%.`);
      setEditingVendor(null);
    } catch {
      showToast('error', 'Failed to update commission rate.');
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-2xl font-black text-slate-900 font-serif">Merchant Seller Directory &amp; Vetting</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage active vendors, inspect KYB credentials, &amp; set category commission rates.
          </p>
        </div>
      </div>

      {/* Main Vendor Table */}
      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading vendor merchants...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-amber-50/80 text-slate-600 uppercase text-[10px] font-bold border-b border-amber-200/80 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Merchant Store</th>
                  <th className="py-3.5 px-4">Primary Category</th>
                  <th className="py-3.5 px-4">Commission Fee</th>
                  <th className="py-3.5 px-4">GSTIN Number</th>
                  <th className="py-3.5 px-4">KYB Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100/70">
                {vendors.map((ven) => (
                  <tr key={ven.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-900 flex items-center justify-center border border-amber-300 font-bold shrink-0">
                          <Store className="w-4 h-4 text-amber-800" />
                        </div>
                        <div>
                          <span className="block font-extrabold text-slate-900 text-sm">{ven.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {ven.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                      {ven.category}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-black text-sm text-[#800020] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                        <Percent className="w-3.5 h-3.5 text-[#800020]" />
                        {ven.commissionRate}%
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {ven.gstNumber}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                          ven.status === VendorStatus.ACTIVE
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border-amber-300'
                        }`}
                      >
                        {ven.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEditModal(ven)}
                        className="px-3.5 py-1.5 rounded-xl border border-amber-300 text-[#800020] bg-amber-50/60 hover:bg-amber-100 font-bold text-xs flex items-center gap-1.5 ml-auto transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-700" />
                        Edit Commission
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT COMMISSION MODAL */}
      {editingVendor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Percent className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Edit Vendor Commission</h3>
              </div>
              <button
                onClick={() => setEditingVendor(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <p className="font-extrabold text-slate-900 text-sm">{editingVendor.name}</p>
                <p className="text-slate-500">Category: <strong className="text-slate-800">{editingVendor.category}</strong></p>
                <p className="font-mono text-slate-500 text-[11px]">GSTIN: {editingVendor.gstNumber}</p>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-800">Platform Commission Rate (%) *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Math.max(1, Math.min(50, Number(e.target.value))))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono font-black text-lg text-[#800020] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="font-black text-lg text-slate-700">%</span>
                </div>
              </div>

              {/* Quick Percentage Pills */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 text-[11px]">Quick Presets:</label>
                <div className="flex flex-wrap gap-2">
                  {[5, 8, 10, 12, 15, 20].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setCommissionRate(rate)}
                      className={`px-3 py-1 rounded-lg border font-bold text-xs transition-all ${
                        commissionRate === rate
                          ? 'bg-[#800020] text-amber-100 border-[#800020] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-100'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Calculator Preview */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[11px] text-slate-600">
                <div className="flex justify-between">
                  <span>Gross Sale Value:</span>
                  <span className="font-bold text-slate-900">₹1,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Commission ({commissionRate}%):</span>
                  <span className="font-bold text-emerald-700">+₹{(1000 * (commissionRate / 100)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
                  <span>Vendor Payout Net:</span>
                  <span className="text-[#800020]">₹{(1000 * (1 - commissionRate / 100)).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingVendor(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="maroon"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleSaveCommission}
                leftIcon={<ShieldCheck className="w-4 h-4" />}
              >
                Save Commission Rate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
