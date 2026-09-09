import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  AlertCircle,
  Filter,
  DollarSign,
  Package,
  X,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { MetricCard } from '../../components/ui/MetricCard';
import { vendorOrderService, IReturnClaim } from '../../services/vendorOrderService';

export const ReturnsPage: React.FC = () => {
  const [returns, setReturns] = useState<IReturnClaim[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED'>('ALL');
  
  // Action Modal State
  const [selectedReturn, setSelectedReturn] = useState<IReturnClaim | null>(null);
  const [modalType, setModalType] = useState<'APPROVE' | 'REJECT' | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState<string>('');
  const [isSubmittingAction, setIsSubmittingAction] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Fetch returns on mount
  useEffect(() => {
    loadReturns();
  }, []);

  const loadReturns = async () => {
    setIsLoading(true);
    try {
      const data = await vendorOrderService.getReturns();
      setReturns(data);
    } catch {
      setToastMessage({ type: 'error', text: 'Failed to load return requests.' });
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

  const handleOpenApproveModal = (claim: IReturnClaim) => {
    setSelectedReturn(claim);
    setModalType('APPROVE');
  };

  const handleOpenRejectModal = (claim: IReturnClaim) => {
    setSelectedReturn(claim);
    setRejectionReasonInput('');
    setModalType('REJECT');
  };

  const handleConfirmAction = async () => {
    if (!selectedReturn || !modalType) return;
    
    if (modalType === 'REJECT' && !rejectionReasonInput.trim()) {
      showToast('error', 'Please provide or select a reason for rejecting the return claim.');
      return;
    }

    setIsSubmittingAction(true);
    try {
      const result = await vendorOrderService.processReturnAction(
        selectedReturn.id,
        modalType,
        modalType === 'REJECT' ? rejectionReasonInput : undefined
      );

      // Update local state
      setReturns((prev) =>
        prev.map((item) =>
          item.id === selectedReturn.id
            ? {
                ...item,
                status: modalType === 'APPROVE' ? 'APPROVED' : 'REJECTED',
                rejectionReason: modalType === 'REJECT' ? rejectionReasonInput : item.rejectionReason,
              }
            : item
        )
      );

      if (modalType === 'APPROVE') {
        showToast('success', `Refund approved for ${selectedReturn.orderNumber}! Payment gateway will issue ₹${selectedReturn.amount} refund.`);
      } else {
        showToast('info', `Return claim for ${selectedReturn.orderNumber} rejected.`);
      }

      setModalType(null);
      setSelectedReturn(null);
    } catch (err) {
      showToast('error', 'Failed to process return claim action. Please try again.');
    } finally {
      setIsSubmittingAction(false);
    }
  };

  // Filtered list calculation
  const filteredReturns = returns.filter((ret) => {
    const matchesTab =
      activeTab === 'ALL' || ret.status === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      ret.orderNumber.toLowerCase().includes(q) ||
      ret.returnId.toLowerCase().includes(q) ||
      ret.customerName.toLowerCase().includes(q) ||
      ret.itemName.toLowerCase().includes(q) ||
      ret.reason.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  // Calculate Metrics
  const totalCount = returns.length;
  const pendingCount = returns.filter((r) => r.status === 'PENDING_REVIEW').length;
  const approvedCount = returns.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = returns.filter((r) => r.status === 'REJECTED').length;
  const totalRefundedAmount = returns
    .filter((r) => r.status === 'APPROVED')
    .reduce((sum, r) => sum + r.amount, 0);

  const presetRejectionReasons = [
    'Item passed 7-day return policy window',
    'Customer damaged product after delivery',
    'Product serial number / tags mismatch',
    'Minor color variance within standard tolerance',
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification Alert */}
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
          {toastMessage.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toastMessage.type === 'info' && <Clock className="w-5 h-5 text-amber-400 shrink-0" />}
          <span>{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Customer Returns & Refund Claims</h1>
          <p className="text-xs text-slate-500 mt-1">
            Inspect 7-day customer return claims, approve refunds, or reject invalid claims.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadReturns} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Refresh Claims
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Return Claims"
          value={totalCount.toString()}
          icon={RotateCcw}
          color="bg-amber-50 text-amber-700"
          change={`${returns.length} claims`}
          subtitle="lifetime"
        />
        <MetricCard
          title="Pending Review"
          value={pendingCount.toString()}
          icon={Clock}
          color="bg-amber-100 text-amber-800"
          change={pendingCount > 0 ? "Requires action" : "All reviewed"}
          isPositive={pendingCount === 0}
        />
        <MetricCard
          title="Approved & Refunded"
          value={approvedCount.toString()}
          icon={CheckCircle}
          color="bg-emerald-50 text-emerald-700"
          change={`₹${totalRefundedAmount.toLocaleString('en-IN')}`}
          subtitle="refunded"
        />
        <MetricCard
          title="Rejected Claims"
          value={rejectedCount.toString()}
          icon={XCircle}
          color="bg-rose-50 text-rose-700"
          change={`${rejectedCount} claims`}
          isPositive={false}
        />
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-amber-50/70 rounded-xl border border-amber-200/60">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ALL'
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              All Claims ({returns.length})
            </button>
            <button
              onClick={() => setActiveTab('PENDING_REVIEW')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'PENDING_REVIEW'
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab('APPROVED')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'APPROVED'
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              Approved ({approvedCount})
            </button>
            <button
              onClick={() => setActiveTab('REJECTED')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'REJECTED'
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-rose-500" />
              Rejected ({rejectedCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search order #, customer, item..."
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
      </div>

      {/* Main Returns Table */}
      <div className="rounded-2xl bg-white border border-amber-200/80 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading return claim requests...</span>
          </div>
        ) : filteredReturns.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
            <RotateCcw className="w-8 h-8 text-amber-300 stroke-1" />
            <p className="font-bold text-slate-700">No return claims found</p>
            <p className="text-[11px] text-slate-400">
              {searchQuery ? 'Try adjusting your search filter.' : 'All customer return claims are up to date!'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-amber-50/80 text-slate-600 uppercase text-[10px] font-bold border-b border-amber-200/80 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Order / Claim ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Product Item</th>
                  <th className="py-3.5 px-4">Refund Amount</th>
                  <th className="py-3.5 px-4">Claim Reason</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100/70">
                {filteredReturns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-4 px-4 font-extrabold text-[#800020] whitespace-nowrap">
                      <div className="flex flex-col">
                        <span>{ret.orderNumber}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-normal">{ret.returnId}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span>{ret.customerName}</span>
                        {ret.customerEmail && (
                          <span className="text-[10px] text-slate-400 font-normal">{ret.customerEmail}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {ret.itemImage ? (
                          <img
                            src={ret.itemImage}
                            alt={ret.itemName}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                            <Package className="w-5 h-5" />
                          </div>
                        )}
                        <span className="font-semibold text-slate-800 line-clamp-1">{ret.itemName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                      ₹{ret.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-4 text-slate-600 max-w-xs">
                      <p className="line-clamp-2 text-xs leading-relaxed">{ret.reason}</p>
                      {ret.rejectionReason && ret.status === 'REJECTED' && (
                        <p className="text-[10px] text-rose-600 font-semibold mt-1">
                          Rejection note: {ret.rejectionReason}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {ret.status === 'PENDING_REVIEW' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Pending Review
                        </span>
                      )}
                      {ret.status === 'APPROVED' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Approved & Refunded
                        </span>
                      )}
                      {ret.status === 'REJECTED' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          Claim Rejected
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {ret.status === 'PENDING_REVIEW' ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleOpenApproveModal(ret)}
                            leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleOpenRejectModal(ret)}
                            leftIcon={<XCircle className="w-3.5 h-3.5" />}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400 italic">
                          Action completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* APPROVE CONFIRMATION MODAL */}
      {modalType === 'APPROVE' && selectedReturn && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Approve Return & Refund</h3>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600">
              <p>Are you sure you want to approve this return claim and authorize an automated refund?</p>
              
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-slate-800">
                <div className="flex justify-between font-bold">
                  <span>Order Number:</span>
                  <span className="text-[#800020] font-mono">{selectedReturn.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="font-semibold">{selectedReturn.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Product:</span>
                  <span className="font-semibold">{selectedReturn.itemName}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-extrabold text-sm pt-1 border-t border-amber-200/80">
                  <span>Refund Amount:</span>
                  <span>₹{selectedReturn.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  The platform payment engine will initiate an immediate reverse transfer of ₹{selectedReturn.amount} back to the customer's original payment source.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModalType(null)}
                disabled={isSubmittingAction}
              >
                Cancel
              </Button>
              <Button
                variant="success"
                size="sm"
                isLoading={isSubmittingAction}
                onClick={handleConfirmAction}
                leftIcon={<Check className="w-4 h-4" />}
              >
                Confirm Approval & Refund
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT CONFIRMATION MODAL */}
      {modalType === 'REJECT' && selectedReturn && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Reject Return Claim</h3>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600">
              <p>Please select or state the technical reason for rejecting this customer claim:</p>

              {/* Preset tags */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quick Reasons:</span>
                <div className="flex flex-wrap gap-1.5">
                  {presetRejectionReasons.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRejectionReasonInput(preset)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border text-left transition-all ${
                        rejectionReasonInput === preset
                          ? 'bg-rose-900 text-rose-50 border-rose-900 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom reason input */}
              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-bold text-slate-700">Detailed Rejection Note:</label>
                <textarea
                  rows={3}
                  value={rejectionReasonInput}
                  onChange={(e) => setRejectionReasonInput(e.target.value)}
                  placeholder="Enter specific condition inspection note to notify customer..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModalType(null)}
                disabled={isSubmittingAction}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                isLoading={isSubmittingAction}
                onClick={handleConfirmAction}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnsPage;
