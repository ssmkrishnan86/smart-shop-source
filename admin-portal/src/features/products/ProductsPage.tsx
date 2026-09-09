import React, { useEffect, useState } from 'react';
import { adminProductService, getImageUrl } from '../../services/adminProductService';
import { notifyProductSync, subscribeProductSync } from '../../services/productSyncService';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, XCircle, Clock, History, Trash2 } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED'>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  const loadProducts = () => {
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
    adminProductService.getApprovalLogs().then((res) => {
      const normalizedLogs = (res.data || []).map((l: any) => ({
        ...l,
        productName: l.productName || l.product_name || 'Product',
        adminName: l.adminName || l.admin_name || 'Super Admin',
        previousStatus: l.previousStatus || l.previous_status || 'PENDING_APPROVAL',
        newStatus: l.newStatus || l.new_status || 'APPROVED',
        timestamp: l.timestamp || l.created_at || new Date().toLocaleString(),
      }));
      setAuditLogs(normalizedLogs);
    });
  };

  useEffect(() => {
    loadProducts();

    const unsubscribe = subscribeProductSync(() => {
      loadProducts();
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const handleApprove = async (id: string) => {
    await adminProductService.approveProduct(id, 'Verified specifications & pricing. Published to DivineKart.');
    notifyProductSync('APPROVED');
    loadProducts();
    setSelectedProduct(null);
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !rejectReason) return;
    await adminProductService.rejectProduct(selectedProduct.id, rejectReason);
    notifyProductSync('REJECTED');
    loadProducts();
    setIsRejectModalOpen(false);
    setSelectedProduct(null);
    setRejectReason('');
  };

  const [deleteTargetProduct, setDeleteTargetProduct] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDeleteProduct = async () => {
    if (!deleteTargetProduct) return;
    setIsDeleting(true);
    try {
      await adminProductService.deleteProduct(deleteTargetProduct.id);
      notifyProductSync('DELETED');
      loadProducts();
      setDeleteTargetProduct(null);
    } catch (err: any) {
      alert(err?.message || 'Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };



  const filteredProducts = products.filter((p) => {
    if (activeTab === 'ALL') return true;
    return p.approvalStatus === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">DivineAdmin Product Moderation & Approval Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">Review vendor submitted product listings, verify details & publish live to DivineKart.</p>
        </div>
        <Button
          onClick={() => setIsAuditModalOpen(true)}
          variant="outline"
          leftIcon={<History className="w-4 h-4 text-[#800020]" />}
        >
          View Approval Audit Trail
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-amber-200/80 pb-3">
        {(['ALL', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-[#800020] text-amber-100 shadow-md'
                : 'bg-white text-slate-600 hover:bg-amber-50 border border-amber-200/60'
            }`}
          >
            {tab === 'ALL' && 'All Products'}
            {tab === 'PENDING_APPROVAL' && '⏳ Pending Review Queue'}
            {tab === 'APPROVED' && '✅ Published to DivineKart'}
            {tab === 'REJECTED' && '❌ Rejected Submissions'}
          </button>
        ))}
      </div>

      {/* Rejection Modal */}
      {isRejectModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-amber-200 p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-slate-900">Reject Product Submission</h3>
            <p className="text-xs text-slate-500">Provide rejection comments for vendor <span className="font-bold">{selectedProduct.vendorName}</span>.</p>
            <form onSubmit={handleReject} className="space-y-3">
              <textarea
                rows={3}
                placeholder="Enter rejection reason (e.g. Incomplete specifications or low quality images)..."
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

      {/* Audit Log Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-amber-200 p-6 max-w-2xl w-full space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-[#800020]" /> Product Approval Audit Trail
              </h3>
              <button onClick={() => setIsAuditModalOpen(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">Close</button>
            </div>
            <div className="space-y-3 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex items-start justify-between">
                  <div>
                    <p className="font-extrabold text-slate-900">{log.productName}</p>
                    <p className="text-slate-600 mt-0.5">By {log.adminName} • Transition: <span className="font-bold text-[#800020]">{log.previousStatus} ➔ {log.newStatus}</span></p>
                    <p className="text-slate-500 italic mt-1">{log.comments}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Catalog Table */}
      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-amber-50/60 text-slate-500 uppercase text-[10px] font-bold border-b border-amber-200">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Merchant Store</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Approval Status</th>
                <th className="py-3.5 px-4">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50/40">
                  <td className="py-3.5 px-4 flex items-center gap-3 font-bold text-slate-900">
                    <img
                      src={getImageUrl(p.thumbnail)}
                      alt={p.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'http://127.0.0.1:8000/images/products/brass_ganesha_idol.jpg';
                      }}
                      className="w-10 h-10 rounded-xl object-cover border border-amber-200 shrink-0 bg-amber-50"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.category}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#800020]">{p.vendorName}</td>
                  <td className="py-3.5 px-4 font-black">₹{p.price.toLocaleString()}</td>
                  <td className="py-3.5 px-4">{p.stock} units</td>
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
                    {p.approvalStatus === 'PENDING_APPROVAL' && (
                      <>
                        <Button size="sm" variant="success" onClick={() => handleApprove(p.id)} leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                          Approve
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
                    )}
                    {p.approvalStatus === 'APPROVED' && (
                      <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Published
                      </span>
                    )}
                    {p.approvalStatus === 'REJECTED' && (
                      <span className="text-[10px] text-rose-700 font-bold flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Rejected
                      </span>
                    )}
                    <button
                      onClick={() => setDeleteTargetProduct(p)}
                      className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors ml-auto"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE PRODUCT CONFIRMATION MODAL */}
      {deleteTargetProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800">
                  <Trash2 className="w-5 h-5 text-rose-700" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Delete Product Listing</h3>
              </div>
              <button
                onClick={() => setDeleteTargetProduct(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center gap-3">
                <img
                  src={getImageUrl(deleteTargetProduct.thumbnail)}
                  alt={deleteTargetProduct.name}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-300 shrink-0 bg-white"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'http://127.0.0.1:8000/images/products/brass_ganesha_idol.jpg';
                  }}
                />
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">{deleteTargetProduct.name}</p>
                  <p className="text-slate-500">Merchant: <strong className="text-slate-800">{deleteTargetProduct.vendorName}</strong></p>
                  <p className="font-black text-[#800020] text-xs">₹{deleteTargetProduct.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium flex items-start gap-2">
                <XCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>
                  Are you sure you want to delete <strong>{deleteTargetProduct.name}</strong>? This action will permanently remove the product listing from DivineKart.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteTargetProduct(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                isLoading={isDeleting}
                onClick={confirmDeleteProduct}
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Yes, Delete Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

