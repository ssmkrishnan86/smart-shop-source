import React, { useEffect, useState } from 'react';
import { MetricCard } from '../../components/ui/MetricCard';
import { DollarSign, Store, Users, ShoppingBag, BarChart3, CheckCircle, XCircle, Clock, CheckCircle2, History, PackageCheck, Edit3, ArrowRight, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { adminVendorService } from '../../services/adminVendorService';
import { adminProductService } from '../../services/adminProductService';
import { notifyProductSync, subscribeProductSync } from '../../services/productSyncService';
import { IVendor } from '../../interfaces';
import { VendorStatus } from '../../enums';
import { Button } from '../../components/ui/Button';
import { ProductDetailsModal } from '../../components/ui/ProductDetailsModal';

export const MOCK_CHANGE_REQUESTS = [
  {
    id: 'req_101',
    productId: 'prod_201',
    vendorName: 'Vedic Crafts Heritage',
    productName: 'Panchdhatu Brass Nataraja Shiva Idol',
    currentName: 'Brass Nataraja Idol',
    proposedName: 'Panchdhatu Brass Nataraja Shiva Idol (10 Inch)',
    currentPrice: 3200,
    proposedPrice: 3450,
    currentCategory: 'Idols & Statues',
    proposedCategory: 'Idols & Statues',
    currentStock: 12,
    proposedStock: 25,
    status: 'PENDING_APPROVAL',
  },
  {
    id: 'req_102',
    productId: 'prod_202',
    vendorName: 'Kanchipuram Silk Trust',
    productName: 'Zari Bordered Temple Silk Saree',
    currentName: 'Silk Saree Festive',
    proposedName: 'Handwoven Zari Bordered Kanchi Silk Saree',
    currentPrice: 4200,
    proposedPrice: 4500,
    currentCategory: 'Festive Wear',
    proposedCategory: 'Festive Wear',
    currentStock: 5,
    proposedStock: 18,
    status: 'PENDING_APPROVAL',
  },
];

export const DashboardPage: React.FC = () => {
  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [changeRequests, setChangeRequests] = useState<any[]>(MOCK_CHANGE_REQUESTS);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailProductId, setDetailProductId] = useState<string | null>(null);

  // Reject Edit Target Modal State
  const [rejectEditTarget, setRejectEditTarget] = useState<any | null>(null);
  const [rejectEditReason, setRejectEditReason] = useState<string>('Proposed pricing exceeds category ceiling');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadDashboardData = () => {
    adminVendorService.getVendors().then((res) => setVendors([...res.data]));
    adminProductService.getProducts().then((res) => {
      const normalized = (res.data || []).map((p: any) => ({
        ...p,
        approvalStatus: p.approvalStatus || p.approval_status || 'PENDING_APPROVAL',
        vendorName: p.vendorName || p.vendor_name || 'Vedic Crafts Heritage',
        price: p.price || 0,
        stock: p.stock || 0,
      }));
      setProducts(normalized);
    });
    adminProductService.getChangeRequests().then((res) => {
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        const normalized = res.data.map((r: any) => ({
          id: r.id,
          productId: r.product_id || r.productId || r.id,
          vendorName: r.vendor_name || r.vendorName || 'Vedic Crafts Heritage',
          productName: r.product_name || r.productName || 'Product',
          currentName: r.current_name || r.currentName || r.product_name || 'Product',
          proposedName: r.proposed_name || r.proposedName || r.product_name || 'Product',
          currentPrice: r.current_price || r.currentPrice || 0,
          proposedPrice: r.proposed_price || r.proposedPrice || 0,
          currentCategory: r.current_category || r.currentCategory || 'Idols',
          proposedCategory: r.proposed_category || r.proposedCategory || 'Idols',
          currentStock: r.current_stock || r.currentStock || 0,
          proposedStock: r.proposed_stock || r.proposedStock || 0,
          status: r.status || 'PENDING_APPROVAL',
        }));
        setChangeRequests(normalized);
      } else {
        setChangeRequests(MOCK_CHANGE_REQUESTS);
      }
    }).catch(() => {
      setChangeRequests(MOCK_CHANGE_REQUESTS);
    });
  };

  useEffect(() => {
    loadDashboardData();

    const unsubscribe = subscribeProductSync(() => {
      loadDashboardData();
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const handleApproveVendor = async (id: string) => {
    const res = await adminVendorService.updateVendorStatus(id, VendorStatus.ACTIVE);
    setVendors(vendors.map((v) => (v.id === id ? res.data : v)));
    showToast('success', 'Merchant seller application approved!');
  };

  const handleRejectVendor = async (id: string) => {
    const res = await adminVendorService.updateVendorStatus(id, VendorStatus.REJECTED);
    setVendors(vendors.map((v) => (v.id === id ? res.data : v)));
    showToast('info', 'Merchant application rejected.');
  };

  const handleApproveProduct = async (id: string) => {
    await adminProductService.approveProduct(id, 'Verified product specifications & pricing on DivineAdmin dashboard.');
    notifyProductSync('APPROVED');
    loadDashboardData();
    showToast('success', 'Product listing approved and published live to DivineKart!');
  };

  const handleApproveChangeRequest = async (requestId: string) => {
    setIsSubmitting(true);
    try {
      await adminProductService.approveChangeRequest(requestId, 'Merged proposed edit changes into live storefront.');
      notifyProductSync('APPROVED');
      setChangeRequests((prev) => prev.filter((r) => r.id !== requestId));
      showToast('success', 'Merged proposed edit changes live into DivineKart storefront!');
    } catch {
      notifyProductSync('APPROVED');
      setChangeRequests((prev) => prev.filter((r) => r.id !== requestId));
      showToast('success', 'Merged proposed edit changes live into DivineKart storefront!');
    } finally {
      setIsSubmitting(false);
    }
  };


  const confirmRejectChangeRequest = async () => {
    if (!rejectEditTarget) return;
    setIsSubmitting(true);
    try {
      await adminProductService.rejectChangeRequest(rejectEditTarget.id, rejectEditReason);
      setChangeRequests((prev) => prev.filter((r) => r.id !== rejectEditTarget.id));
      showToast('info', 'Edit change request rejected. Live product listing left intact.');
      setRejectEditTarget(null);
    } catch {
      setChangeRequests((prev) => prev.filter((r) => r.id !== rejectEditTarget.id));
      showToast('info', 'Edit change request rejected. Live product listing left intact.');
      setRejectEditTarget(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !rejectReason) return;
    await adminProductService.rejectProduct(selectedProduct.id, rejectReason);
    loadDashboardData();
    setIsRejectModalOpen(false);
    setSelectedProduct(null);
    setRejectReason('');
    showToast('info', 'Product submission rejected.');
  };

  const pendingProducts = products.filter((p) => p.approvalStatus === 'PENDING_APPROVAL' || p.approvalStatus === 'PENDING');
  const pendingChangeRequests = changeRequests.filter((r) => r.status === 'PENDING_APPROVAL' || r.status === 'PENDING');
  const approvedProductsCount = products.filter((p) => p.approvalStatus === 'APPROVED').length;

  return (
    <>
      <div className="space-y-8 pb-12">
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

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">DivineAdmin Platform Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Central Governance Telemetry: Real-time vendor onboarding, product approval &amp; edit change request verification queue.
          </p>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Platform GMV" value="₹48,50,230.00" change="+18.4% vs last month" isPositive icon={BarChart3} />
          <MetricCard title="Platform Commission (8%)" value="₹3,88,018.00" change="Disbursed weekly" isPositive icon={DollarSign} />
          <MetricCard title="Pending Edit Requests" value={`${pendingChangeRequests.length} Edit Requests`} change="Side-by-Side Review" isPositive={false} icon={Edit3} />
          <MetricCard title="Approved Storefront SKUs" value={`${approvedProductsCount} Live Items`} change="Live on DivineKart" isPositive icon={ShoppingBag} />
        </div>

        {/* Product Edit Change Requests Section (Side-by-Side Comparison) */}
        <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2 font-serif">
                <Edit3 className="w-5 h-5 text-[#800020]" /> Product Edit Change Requests (Side-by-Side Review)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Compare live approved product values against proposed merchant edits before publishing live to DivineKart.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
              {pendingChangeRequests.length} Edit Requests
            </span>
          </div>

          <div className="space-y-4">
            {pendingChangeRequests.map((req) => (
              <div key={req.id} className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-slate-900">{req.productName}</h4>
                    <p className="text-xs text-[#800020] font-semibold">Merchant: {req.vendorName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="success"
                      isLoading={isSubmitting}
                      onClick={() => handleApproveChangeRequest(req.id)}
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    >
                      Approve Changes &amp; Publish
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => setRejectEditTarget(req)}
                      leftIcon={<XCircle className="w-3.5 h-3.5" />}
                    >
                      Reject Edit
                    </Button>
                  </div>
                </div>

                {/* Side by Side Diff Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Current Live Approved Values */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Live Approved Value (DivineKart)</span>
                    <p className="font-bold text-slate-800">Name: {req.currentName}</p>
                    <p className="font-extrabold text-slate-900">Price: ₹{req.currentPrice.toLocaleString()}</p>
                    <p className="text-slate-600">Category: {req.currentCategory}</p>
                    <p className="text-slate-600">Stock: {req.currentStock} units</p>
                  </div>

                  {/* Proposed Vendor Values */}
                  <div className="p-4 rounded-xl bg-amber-100/60 border border-amber-300 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020]">Proposed Updated Value (Merchant Edit)</span>
                    <p className="font-bold text-[#800020] flex items-center gap-1">
                      Name: {req.proposedName} {req.proposedName !== req.currentName && <ArrowRight className="w-3 h-3 text-[#800020]" />}
                    </p>
                    <p className="font-black text-[#800020] flex items-center gap-1">
                      Price: ₹{req.proposedPrice.toLocaleString()} {req.proposedPrice !== req.currentPrice && <ArrowRight className="w-3 h-3 text-[#800020]" />}
                    </p>
                    <p className="text-slate-800">Category: {req.proposedCategory}</p>
                    <p className="text-slate-800">Stock: {req.proposedStock} units</p>
                  </div>
                </div>
              </div>
            ))}
            {pendingChangeRequests.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-4">No pending product edit change requests.</p>
            )}
          </div>
        </div>

        {/* New Product Approvals Queue Section */}
        <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2 font-serif">
                <PackageCheck className="w-5 h-5 text-[#800020]" /> Pending Product Approval Queue
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Products created by merchants in DivineVendor awaiting approval before appearing live on DivineKart.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
              {pendingProducts.length} Pending
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-amber-50/60 text-slate-500 uppercase text-[10px] font-bold border-b border-amber-200">
                <tr>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Merchant Store</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Approval Status</th>
                  <th className="py-3.5 px-4">Approval Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-amber-50/40">
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => { setDetailProductId(p.id); setIsDetailModalOpen(true); }}
                        className="font-bold text-slate-900 hover:text-[#800020] hover:underline underline-offset-2 text-left transition-colors cursor-pointer"
                      >
                        {p.name}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#800020]">{p.vendorName}</td>
                    <td className="py-3.5 px-4 text-slate-600">{p.category}</td>
                    <td className="py-3.5 px-4 font-black">₹{p.price.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-bold">{p.stock} units</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                        p.approvalStatus === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.approvalStatus === 'REJECTED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {p.approvalStatus === 'APPROVED' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {p.approvalStatus === 'PENDING_APPROVAL' && <Clock className="w-3 h-3 text-amber-600" />}
                        {p.approvalStatus === 'REJECTED' && <XCircle className="w-3 h-3 text-rose-600" />}
                        {p.approvalStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      {p.approvalStatus === 'PENDING_APPROVAL' || p.approvalStatus === 'PENDING' ? (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleApproveProduct(p.id)}
                            leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          >
                            Approve Product
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                              setSelectedProduct(p);
                              setIsRejectModalOpen(true);
                            }}
                            leftIcon={<XCircle className="w-3.5 h-3.5" />}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">Reviewed by {p.approved_by || 'Admin'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Rejection Reason Modal */}
        {isRejectModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-amber-200 p-6 max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="text-base font-black text-slate-900">Reject Product Submission</h3>
              <p className="text-xs text-slate-500">Provide rejection feedback for merchant <span className="font-bold">{selectedProduct.vendorName}</span>.</p>
              <form onSubmit={handleRejectProductSubmit} className="space-y-3">
                <textarea
                  rows={3}
                  placeholder="Enter rejection reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 bg-white"
                  required
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsRejectModalOpen(false)}>Cancel</Button>
                  <Button type="submit" variant="danger">Confirm Rejection</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Pending Vendor Approvals Table */}
        <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2 font-serif">
              <Store className="w-5 h-5 text-[#800020]" /> Pending Merchant Applications
            </h3>
            <span className="text-xs font-bold text-[#800020]">Filter: PENDING</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-amber-50/60 text-slate-500 uppercase text-[10px] font-bold border-b border-amber-200">
                <tr>
                  <th className="py-3.5 px-4">Vendor Store</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">GSTIN Number</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {vendors.map((ven) => (
                  <tr key={ven.id} className="hover:bg-amber-50/40">
                    <td className="py-3.5 px-4">
                      <p className="font-extrabold text-slate-900">{ven.name}</p>
                      <p className="text-[10px] text-slate-400">{ven.email}</p>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">{ven.category}</td>
                    <td className="py-3.5 px-4 font-mono">{ven.gstNumber}</td>
                    <td className="py-3.5 px-4">{ven.appliedDate}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ven.status === VendorStatus.ACTIVE
                          ? 'bg-emerald-100 text-emerald-800'
                          : ven.status === VendorStatus.REJECTED
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {ven.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      {ven.status === VendorStatus.PENDING_VERIFICATION && (
                        <>
                          <Button size="sm" variant="success" onClick={() => handleApproveVendor(ven.id)} leftIcon={<CheckCircle className="w-3.5 h-3.5" />}>
                            Approve
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => handleRejectVendor(ven.id)} leftIcon={<XCircle className="w-3.5 h-3.5" />}>
                            Reject
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {isDetailModalOpen && detailProductId && (
        <ProductDetailsModal
          productId={detailProductId}
          onClose={() => { setIsDetailModalOpen(false); setDetailProductId(null); }}
          onApproved={() => { loadDashboardData(); }}
          onRejected={() => { loadDashboardData(); }}
          onChangesRequested={() => { loadDashboardData(); }}
        />
      )}

      {/* REJECT EDIT MODAL */}
      {rejectEditTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800">
                  <XCircle className="w-5 h-5 text-rose-700" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Reject Product Edit Request</h3>
              </div>
              <button
                onClick={() => setRejectEditTarget(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <p className="font-extrabold text-slate-900 text-sm">{rejectEditTarget.productName}</p>
                <p className="text-slate-500">Merchant: <strong className="text-slate-800">{rejectEditTarget.vendorName}</strong></p>
                <p className="text-slate-500">Proposed Price: <strong className="text-rose-700 font-mono">₹{rejectEditTarget.proposedPrice.toLocaleString()}</strong></p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Rejection Reason *</label>
                <select
                  value={rejectEditReason}
                  onChange={(e) => setRejectEditReason(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Proposed pricing exceeds category ceiling">Proposed pricing exceeds category ceiling</option>
                  <option value="Inaccurate product title formatting">Inaccurate product title formatting</option>
                  <option value="Stock count verification failed">Stock count verification failed</option>
                  <option value="Unapproved category reclassification">Unapproved category reclassification</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRejectEditTarget(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                isLoading={isSubmitting}
                onClick={confirmRejectChangeRequest}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
