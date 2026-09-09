import React, { useState } from 'react';
import { RotateCcw, ShieldAlert, CheckCircle2, AlertCircle, X, ShieldCheck, DollarSign, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface IDisputeRecord {
  id: string;
  customer: string;
  vendor: string;
  item: string;
  amount: number;
  claim: string;
  status: 'PENDING_ARBITRATION' | 'REFUND_APPROVED' | 'CLAIM_DISMISSED';
  date: string;
  notes?: string;
}

export const INITIAL_DISPUTES: IDisputeRecord[] = [
  { id: 'DISP-101', customer: 'Ananya Verma', vendor: 'Vedic Crafts Heritage', item: 'Handcrafted Brass Ganesha Idol (8 Inch)', amount: 2199, claim: 'Color variance from image catalog', status: 'PENDING_ARBITRATION', date: '2026-08-05' },
  { id: 'DISP-102', customer: 'Karthik Raja', vendor: 'Kanchipuram Silk Trust', item: 'Pure Kanchi Silk Zari Saree', amount: 4800, claim: 'Delivered item has minor thread snag', status: 'PENDING_ARBITRATION', date: '2026-08-07' },
  { id: 'DISP-103', customer: 'Meera Nair', vendor: 'Jaipur Murti Kala', item: 'White Marble Shiva Idol (10 Inch)', amount: 3500, claim: 'Package outer box damaged during transit', status: 'PENDING_ARBITRATION', date: '2026-08-08' },
];

export const ReturnsPage: React.FC = () => {
  const [disputes, setDisputes] = useState<IDisputeRecord[]>(INITIAL_DISPUTES);
  
  // Refund Modal State
  const [refundTarget, setRefundTarget] = useState<IDisputeRecord | null>(null);
  const [refundDestination, setRefundDestination] = useState<string>('Original Gateway (Razorpay Refund)');
  const [refundNote, setRefundNote] = useState<string>('Approved based on product photo inspection.');

  // Dismiss Modal State
  const [dismissTarget, setDismissTarget] = useState<IDisputeRecord | null>(null);
  const [dismissReason, setDismissReason] = useState<string>('Item matches specifications & imagery');
  const [dismissNote, setDismissNote] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirmRefund = async () => {
    if (!refundTarget) return;
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));

      setDisputes((prev) =>
        prev.map((d) =>
          d.id === refundTarget.id
            ? { ...d, status: 'REFUND_APPROVED', notes: `Refund approved: ${refundDestination}` }
            : d
        )
      );

      showToast('success', `Refund of ₹${refundTarget.amount.toLocaleString()} authorized for ${refundTarget.customer}!`);
      setRefundTarget(null);
    } catch {
      showToast('error', 'Failed to authorize refund.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDismiss = async () => {
    if (!dismissTarget) return;
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));

      setDisputes((prev) =>
        prev.map((d) =>
          d.id === dismissTarget.id
            ? { ...d, status: 'CLAIM_DISMISSED', notes: `Claim dismissed: ${dismissReason}` }
            : d
        )
      );

      showToast('info', `Dispute ${dismissTarget.id} dismissed with formal notice sent to customer.`);
      setDismissTarget(null);
    } catch {
      showToast('error', 'Failed to dismiss claim.');
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
          <h1 className="text-2xl font-black text-slate-900 font-serif">Cross-Vendor Return &amp; Refund Disputes</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Arbitrate customer return claims, approve financial refunds, &amp; enforce merchant quality standards.
          </p>
        </div>
      </div>

      {/* Main Table */}
      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-amber-50/80 text-slate-600 uppercase text-[10px] font-bold border-b border-amber-200/80 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Dispute ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Merchant Store</th>
                <th className="py-3.5 px-4">Item &amp; Claim Reason</th>
                <th className="py-3.5 px-4">Refund Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Arbitration Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100/70">
              {disputes.map((d) => (
                <tr key={d.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-extrabold text-[#800020] whitespace-nowrap">
                    {d.id}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                    {d.customer}
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#800020] whitespace-nowrap">
                    {d.vendor}
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <p className="font-bold text-slate-800 truncate">{d.item}</p>
                    <p className="text-[11px] text-slate-500 truncate">{d.claim}</p>
                  </td>
                  <td className="py-4 px-4 font-black text-slate-900 whitespace-nowrap">
                    ₹{d.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {d.status === 'REFUND_APPROVED' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold border border-emerald-300">
                        REFUND APPROVED
                      </span>
                    ) : d.status === 'CLAIM_DISMISSED' ? (
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold border border-slate-300">
                        CLAIM DISMISSED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold border border-amber-300">
                        IN ARBITRATION
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    {d.status === 'PENDING_ARBITRATION' ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => setRefundTarget(d)}
                          leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                        >
                          Authorize Refund
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDismissTarget(d)}
                          leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-600" />}
                        >
                          Dismiss Claim
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400 italic">
                        {d.notes || 'Resolved'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AUTHORIZE REFUND MODAL */}
      {refundTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <DollarSign className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Authorize Refund Payment</h3>
              </div>
              <button
                onClick={() => setRefundTarget(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <p className="font-extrabold text-slate-900 text-sm">{refundTarget.customer}</p>
                <p className="text-slate-600 font-semibold">{refundTarget.item}</p>
                <p className="text-slate-500">Merchant Store: <strong className="text-slate-800">{refundTarget.vendor}</strong></p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-900 font-black">
                <span>Authorized Refund Amount:</span>
                <span className="text-lg">₹{refundTarget.amount.toLocaleString()}</span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Refund Destination Method *</label>
                <select
                  value={refundDestination}
                  onChange={(e) => setRefundDestination(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Original Gateway (Razorpay Refund)">Original Payment Method (Razorpay Instant Refund)</option>
                  <option value="Customer DivineWallet Credit">Customer DivineWallet Credit</option>
                  <option value="Direct Bank Account IMPS Transfer">Direct Bank Account IMPS Transfer</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Approval Note</label>
                <input
                  type="text"
                  value={refundNote}
                  onChange={(e) => setRefundNote(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRefundTarget(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="success"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleConfirmRefund}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Confirm &amp; Authorize Refund
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DISMISS CLAIM MODAL */}
      {dismissTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <XCircle className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Dismiss Dispute Claim</h3>
              </div>
              <button
                onClick={() => setDismissTarget(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <p className="font-extrabold text-slate-900 text-sm">{dismissTarget.customer}</p>
                <p className="text-slate-600 font-semibold">{dismissTarget.item}</p>
                <p className="text-slate-500">Claim Reason: <strong className="text-slate-800">{dismissTarget.claim}</strong></p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Dismissal Reason *</label>
                <select
                  value={dismissReason}
                  onChange={(e) => setDismissReason(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Item matches specifications & imagery">Item matches specifications &amp; imagery</option>
                  <option value="Return period window expired">Return period window expired</option>
                  <option value="Damage occurred after delivery completion">Damage occurred after delivery completion</option>
                  <option value="Insufficient proof provided">Insufficient proof provided</option>
                  <option value="Other">Other decision reason</option>
                </select>
              </div>

              {dismissReason === 'Other' && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Specify Reason Details</label>
                  <textarea
                    rows={2}
                    value={dismissNote}
                    onChange={(e) => setDismissNote(e.target.value)}
                    placeholder="Enter details..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDismissTarget(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="maroon"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleConfirmDismiss}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Dismiss Claim
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
