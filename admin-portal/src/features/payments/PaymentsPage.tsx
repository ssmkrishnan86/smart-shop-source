import React, { useState } from 'react';
import { DollarSign, CheckCircle2, ArrowUpRight, AlertCircle, X, ShieldCheck, Banknote, Building2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface IPayoutRecord {
  id: string;
  vendor: string;
  amount: number;
  fee: number;
  netPayable: number;
  bankAccount: string;
  ifsc: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED';
  date: string;
  utrNumber?: string;
}

export const INITIAL_PAYOUTS: IPayoutRecord[] = [
  { id: 'PAY-2026-081', vendor: 'Vedic Crafts Heritage', amount: 42500, fee: 850, netPayable: 41650, bankAccount: 'HDFC •••• 8912', ifsc: 'HDFC0001234', status: 'COMPLETED', date: '2026-08-02', utrNumber: 'UTR98421008123' },
  { id: 'PAY-2026-082', vendor: 'Jaipur Murti Kala', amount: 32000, fee: 640, netPayable: 31360, bankAccount: 'SBI •••• 4510', ifsc: 'SBIN0004510', status: 'PENDING', date: '2026-08-06' },
  { id: 'PAY-2026-083', vendor: 'Kanchipuram Silk Trust', amount: 54000, fee: 1080, netPayable: 52920, bankAccount: 'ICICI •••• 3341', ifsc: 'ICIC0003341', status: 'PENDING', date: '2026-08-08' },
  { id: 'PAY-2026-084', vendor: 'Gita Press Gorakhpur', amount: 18500, fee: 370, netPayable: 18130, bankAccount: 'PNB •••• 7729', ifsc: 'PUNB0007729', status: 'PENDING', date: '2026-08-09' },
];

export const PaymentsPage: React.FC = () => {
  const [payouts, setPayouts] = useState<IPayoutRecord[]>(INITIAL_PAYOUTS);
  const [selectedPayout, setSelectedPayout] = useState<IPayoutRecord | null>(null);
  const [utrInput, setUtrInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenDisburseModal = (payout: IPayoutRecord) => {
    setSelectedPayout(payout);
    setUtrInput(`UTR${Date.now().toString().slice(-9)}`);
  };

  const handleConfirmSingleDisbursal = async () => {
    if (!selectedPayout) return;
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));

      setPayouts((prev) =>
        prev.map((p) =>
          p.id === selectedPayout.id
            ? { ...p, status: 'COMPLETED', utrNumber: utrInput || `UTR${Date.now()}` }
            : p
        )
      );

      showToast('success', `Payout ${selectedPayout.id} of ₹${selectedPayout.netPayable.toLocaleString()} disbursed to ${selectedPayout.vendor}!`);
      setSelectedPayout(null);
    } catch {
      showToast('error', 'Failed to disburse payout.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisburseAllPending = async () => {
    const pendingList = payouts.filter((p) => p.status === 'PENDING');
    if (pendingList.length === 0) {
      showToast('info', 'No pending payout requests to disburse.');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 800));

      let totalDisbursed = 0;
      setPayouts((prev) =>
        prev.map((p) => {
          if (p.status === 'PENDING') {
            totalDisbursed += p.netPayable;
            return {
              ...p,
              status: 'COMPLETED',
              utrNumber: `UTR${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100)}`,
            };
          }
          return p;
        })
      );

      showToast(
        'success',
        `Disbursed all ${pendingList.length} pending payouts totaling ₹${totalDisbursed.toLocaleString()}!`
      );
    } catch {
      showToast('error', 'Failed to disburse pending payouts.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalVolume = payouts.reduce((acc, p) => acc + p.amount, 0);
  const totalCompleted = payouts.filter((p) => p.status === 'COMPLETED').reduce((acc, p) => acc + p.netPayable, 0);
  const totalPending = payouts.filter((p) => p.status === 'PENDING').reduce((acc, p) => acc + p.netPayable, 0);
  const totalFeeRevenue = payouts.reduce((acc, p) => acc + p.fee, 0);

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
          {toastMessage.type === 'info' && <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />}
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Financial Settlements &amp; Disbursals</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Approve merchant payout requests, track platform commission revenue, &amp; disburse vendor settlements.
          </p>
        </div>
        <Button
          onClick={handleDisburseAllPending}
          isLoading={isSubmitting}
          leftIcon={<ArrowUpRight className="w-4 h-4 text-[#DAA520]" />}
        >
          Disburse All Pending Payouts
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Volume</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">₹{totalVolume.toLocaleString()}</span>
            <DollarSign className="w-6 h-6 text-amber-700" />
          </div>
          <p className="text-[11px] text-slate-400">Settlement ledger total</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Disbursed Funds</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-emerald-700">₹{totalCompleted.toLocaleString()}</span>
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-[11px] text-emerald-800 font-semibold">Bank transfer complete</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Pending Payouts</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-amber-800">₹{totalPending.toLocaleString()}</span>
            <Banknote className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-[11px] text-amber-900 font-semibold">Awaiting disbursal</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Commission Revenue</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#800020]">₹{totalFeeRevenue.toLocaleString()}</span>
            <Building2 className="w-6 h-6 text-[#800020]" />
          </div>
          <p className="text-[11px] text-[#800020] font-bold">DivineKart platform fee</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-amber-50/80 text-slate-600 uppercase text-[10px] font-bold border-b border-amber-200/80 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Payout ID</th>
                <th className="py-3.5 px-4">Vendor Store</th>
                <th className="py-3.5 px-4">Bank Account</th>
                <th className="py-3.5 px-4">Net Disbursal</th>
                <th className="py-3.5 px-4">Platform Fee</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Disbursal Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100/70">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-extrabold text-[#800020] whitespace-nowrap">
                    {p.id}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                    {p.vendor}
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-600 whitespace-nowrap">
                    {p.bankAccount} ({p.ifsc})
                  </td>
                  <td className="py-4 px-4 font-black text-slate-900 whitespace-nowrap">
                    ₹{p.netPayable.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-700 whitespace-nowrap">
                    +₹{p.fee.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {p.status === 'COMPLETED' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold border border-emerald-300">
                        COMPLETED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold border border-amber-300">
                        PENDING
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    {p.status === 'PENDING' ? (
                      <Button size="sm" onClick={() => handleOpenDisburseModal(p)}>
                        Disburse Funds
                      </Button>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400 font-bold">
                        UTR: {p.utrNumber}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISBURSE FUNDS MODAL */}
      {selectedPayout && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Banknote className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Authorize Bank Disbursal</h3>
              </div>
              <button
                onClick={() => setSelectedPayout(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1 text-slate-700">
                <p className="font-extrabold text-slate-900 text-sm">{selectedPayout.vendor}</p>
                <p className="text-slate-500">Payout Reference: <strong className="text-slate-800 font-mono">{selectedPayout.id}</strong></p>
                <p className="text-slate-500">Bank Account: <strong className="text-slate-900 font-mono">{selectedPayout.bankAccount}</strong> ({selectedPayout.ifsc})</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-900">
                <div className="flex justify-between items-center text-sm font-black">
                  <span>Net Disbursal Amount:</span>
                  <span className="text-lg">₹{selectedPayout.netPayable.toLocaleString()}</span>
                </div>
                <p className="text-[11px] text-emerald-700">Platform commission of ₹{selectedPayout.fee} already deducted.</p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Bank UTR Transaction Reference *</label>
                <input
                  type="text"
                  required
                  value={utrInput}
                  onChange={(e) => setUtrInput(e.target.value)}
                  placeholder="UTR98421008123"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono font-bold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPayout(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="gold"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleConfirmSingleDisbursal}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Confirm &amp; Disburse Funds
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
