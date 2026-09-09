import React, { useEffect, useState } from 'react';
import {
  X, CheckCircle2, XCircle, AlertTriangle, Package, Tag, Store, Calendar,
  Image as ImageIcon, Layers, Settings, BarChart2, Search, ShoppingBag,
  Loader2, Star, MessageSquare, ChevronRight, Clock, RefreshCw, Info
} from 'lucide-react';
import { Button } from './Button';
import { adminProductService } from '../../services/adminProductService';

interface ProductDetailsModalProps {
  productId: string;
  onClose: () => void;
  onApproved: () => void;
  onRejected: () => void;
  onChangesRequested: () => void;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  APPROVED: {
    label: 'Approved',
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
  },
  PENDING_APPROVAL: {
    label: 'Pending Approval',
    bg: 'bg-amber-100',
    text: 'text-amber-900',
    icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
  },
  REJECTED: {
    label: 'Rejected',
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    icon: <XCircle className="w-3.5 h-3.5 text-rose-600" />,
  },
  CHANGES_REQUESTED: {
    label: 'Changes Requested',
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    icon: <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />,
  },
};

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-2 pb-2 border-b border-amber-100 mb-3">
    <span className="text-[#800020]">{icon}</span>
    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">{title}</h4>
  </div>
);

const InfoRow: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 py-1.5">
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 w-32">{label}</span>
    <span className="text-xs font-semibold text-slate-800 text-right">{value ?? <span className="text-slate-400 italic">—</span>}</span>
  </div>
);

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  productId,
  onClose,
  onApproved,
  onRejected,
  onChangesRequested,
}) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'images' | 'variants' | 'seo'>('overview');
  const [activeImage, setActiveImage] = useState<string>('');
  const [reviewComment, setReviewComment] = useState('');
  const [actionLoading, setActionLoading] = useState<'approve' | 'reject' | 'changes' | null>(null);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await adminProductService.getProductById(productId);
        const p = res.data;
        setProduct(p);
        setActiveImage(p.thumbnail || (p.images && p.images[0]) || '');
      } catch (e) {
        console.error('Failed to load product details', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [productId]);

  const statusCfg = product
    ? STATUS_CONFIG[product.approvalStatus || product.approval_status || 'PENDING_APPROVAL'] ?? STATUS_CONFIG.PENDING_APPROVAL
    : STATUS_CONFIG.PENDING_APPROVAL;

  const isPending =
    product?.approvalStatus === 'PENDING_APPROVAL' ||
    product?.approval_status === 'PENDING_APPROVAL' ||
    product?.approvalStatus === 'PENDING';

  const handleApprove = async () => {
    if (!product) return;
    setActionLoading('approve');
    setActionError('');
    try {
      await adminProductService.approveProduct(
        product.id,
        reviewComment || 'Verified & approved by DivineAdmin'
      );
      onApproved();
      onClose();
    } catch {
      setActionError('Failed to approve product. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!product) return;
    if (!reviewComment.trim()) {
      setActionError('Please provide a rejection reason before rejecting.');
      return;
    }
    setActionLoading('reject');
    setActionError('');
    try {
      await adminProductService.rejectProduct(product.id, reviewComment);
      onRejected();
      onClose();
    } catch {
      setActionError('Failed to reject product. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRequestChanges = async () => {
    if (!product) return;
    if (!reviewComment.trim()) {
      setActionError('Please describe what changes are needed before sending to vendor.');
      return;
    }
    setActionLoading('changes');
    setActionError('');
    try {
      await adminProductService.requestChanges(product.id, reviewComment);
      onChangesRequested();
      onClose();
    } catch {
      setActionError('Failed to send change request. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const tabs = [
    { key: 'overview', label: 'Overview & Pricing' },
    { key: 'images', label: 'Images & Description' },
    { key: 'variants', label: 'Variants & Specs' },
    { key: 'seo', label: 'SEO & Metadata' },
  ] as const;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-amber-200 shadow-2xl w-full max-w-4xl my-6 flex flex-col">
        {/* ─── Modal Header ─── */}
        <div className="flex items-start justify-between p-6 border-b border-amber-100">
          <div className="flex-1 min-w-0 pr-4">
            {loading ? (
              <div className="h-6 w-64 bg-amber-100 animate-pulse rounded-lg" />
            ) : (
              <>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-lg font-black text-slate-900 leading-tight">{product?.name}</h2>
                  {product && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusCfg.bg} ${statusCfg.text}`}>
                      {statusCfg.icon} {statusCfg.label}
                    </span>
                  )}
                </div>
                {product && (
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs font-mono font-bold text-slate-400">{product.sku || product.vendor_sku}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-semibold text-[#800020] flex items-center gap-1">
                      <Store className="w-3 h-3" />
                      {product.vendor_info?.store_name || product.vendorName || product.vendor_name}
                    </span>
                    {product.rating > 0 && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-bold text-amber-700 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {product.rating} ({product.review_count} reviews)
                        </span>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-amber-50 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#800020] animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-500">Loading product details from backend...</p>
            </div>
          </div>
        ) : product ? (
          <>
            {/* ─── Tab Navigation ─── */}
            <div className="flex gap-1 px-6 pt-4 border-b border-amber-100 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl whitespace-nowrap transition-colors ${
                    activeTab === tab.key
                      ? 'bg-[#800020] text-white'
                      : 'text-slate-600 hover:text-[#800020] hover:bg-amber-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ─── Tab Content ─── */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[55vh]">

              {/* TAB: Overview & Pricing */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pricing Card */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                    <SectionHeader icon={<Tag className="w-4 h-4" />} title="Pricing" />
                    <InfoRow label="Selling Price" value={`₹${product.price?.toLocaleString()}`} />
                    <InfoRow label="Original MRP" value={`₹${product.original_price?.toLocaleString()}`} />
                    <InfoRow label="Discount" value={`${product.discount_percentage}%`} />
                    <InfoRow label="Category" value={product.category} />
                    <InfoRow label="Subcategory" value={product.subcategory} />
                    <InfoRow label="Brand" value={product.brand} />
                  </div>

                  {/* Inventory Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <SectionHeader icon={<ShoppingBag className="w-4 h-4" />} title="Inventory Details" />
                    <InfoRow label="Total Stock" value={`${product.inventory?.stock ?? product.stock} units`} />
                    <InfoRow label="Reserved" value={`${product.inventory?.reserved ?? 0} units`} />
                    <InfoRow label="Available" value={`${product.inventory?.available ?? product.stock} units`} />
                    <InfoRow label="Reorder Level" value={product.inventory?.reorder_level ? `${product.inventory.reorder_level} units` : null} />
                    <InfoRow label="Warehouse" value={product.inventory?.warehouse_location} />
                    <InfoRow label="SKU" value={product.sku} />
                  </div>

                  {/* Vendor Information */}
                  <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-1">
                    <SectionHeader icon={<Store className="w-4 h-4" />} title="Vendor Information" />
                    <InfoRow label="Vendor ID" value={product.vendor_info?.id || product.vendor_id} />
                    <InfoRow label="Store Name" value={product.vendor_info?.store_name || product.vendorName || product.vendor_name} />
                    <InfoRow label="Contact Email" value={product.vendor_info?.contact_email} />
                    <InfoRow label="Contact Phone" value={product.vendor_info?.contact_phone} />
                    <InfoRow label="Vendor Rating" value={product.vendor_info?.rating ? `★ ${product.vendor_info.rating}` : null} />
                  </div>

                  {/* Timestamps & Status */}
                  <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-1">
                    <SectionHeader icon={<Calendar className="w-4 h-4" />} title="Dates & Approval" />
                    <InfoRow label="Created" value={product.created_at ? new Date(product.created_at).toLocaleString('en-IN') : product.createdAt} />
                    <InfoRow label="Last Updated" value={product.updated_at ? new Date(product.updated_at).toLocaleString('en-IN') : null} />
                    <InfoRow label="Approved By" value={product.approved_by} />
                    <InfoRow
                      label="Approval Status"
                      value={statusCfg.label}
                    />
                    {(product.approval_comments || product.approvalComments) && (
                      <InfoRow label="Admin Notes" value={product.approval_comments || product.approvalComments} />
                    )}
                    {(product.rejection_reason) && (
                      <InfoRow label="Rejection Reason" value={product.rejection_reason} />
                    )}
                  </div>
                </div>
              )}

              {/* TAB: Images & Description */}
              {activeTab === 'images' && (
                <div className="space-y-5">
                  {/* Main Image Viewer */}
                  <div>
                    <SectionHeader icon={<ImageIcon className="w-4 h-4" />} title="Product Images" />
                    <div className="flex gap-4 flex-wrap">
                      <div className="flex-1 min-w-[200px]">
                        <img
                          src={activeImage || product.thumbnail}
                          alt={product.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=400&q=80';
                          }}
                          className="w-full max-h-72 object-contain rounded-2xl border border-amber-200 bg-amber-50 p-4"
                        />
                      </div>
                      {/* Thumbnail Gallery */}
                      {product.images && product.images.length > 1 && (
                        <div className="flex flex-row md:flex-col gap-2 flex-wrap">
                          {product.images.map((img: string, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImage(img)}
                              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                                activeImage === img ? 'border-[#800020] shadow-md' : 'border-amber-200 hover:border-amber-400'
                              }`}
                            >
                              <img
                                src={img}
                                alt={`Image ${idx + 1}`}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=100&q=60';
                                }}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <SectionHeader icon={<Info className="w-4 h-4" />} title="Product Description" />
                    {(product.short_description || product.short_desc) && (
                      <p className="text-xs font-semibold text-slate-700 mb-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                        {product.short_description || product.short_desc}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB: Variants & Specifications */}
              {activeTab === 'variants' && (
                <div className="space-y-5">
                  {/* Variants Table */}
                  {product.variants && product.variants.length > 0 && (
                    <div>
                      <SectionHeader icon={<Layers className="w-4 h-4" />} title="Product Variants" />
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-amber-50/80 text-slate-500 uppercase text-[10px] font-bold border-b border-amber-200">
                            <tr>
                              <th className="px-3 py-2.5">Variant Name</th>
                              <th className="px-3 py-2.5">SKU</th>
                              <th className="px-3 py-2.5">Price</th>
                              <th className="px-3 py-2.5">Stock</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-amber-50">
                            {product.variants.map((v: any, idx: number) => (
                              <tr key={idx} className="hover:bg-amber-50/40">
                                <td className="px-3 py-2.5 font-semibold text-slate-800">{v.name}</td>
                                <td className="px-3 py-2.5 font-mono text-slate-600">{v.sku}</td>
                                <td className="px-3 py-2.5 font-bold text-[#800020]">₹{v.price?.toLocaleString()}</td>
                                <td className="px-3 py-2.5 font-bold">{v.stock} units</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Attributes & Specifications */}
                  {product.attributes && Object.keys(product.attributes).length > 0 && (
                    <div>
                      <SectionHeader icon={<Settings className="w-4 h-4" />} title="Attributes & Specifications" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Object.entries(product.attributes).map(([key, val]) => (
                          <div key={key} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <ChevronRight className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{key}</p>
                              <p className="text-xs font-semibold text-slate-800 mt-0.5">{String(val)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: SEO & Metadata */}
              {activeTab === 'seo' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-1">
                    <SectionHeader icon={<Search className="w-4 h-4" />} title="SEO & Metadata" />
                    <InfoRow label="URL Slug" value={product.seo?.slug || product.slug} />
                    <InfoRow label="Meta Title" value={product.seo?.meta_title} />
                    <InfoRow label="Meta Description" value={product.seo?.meta_description} />
                  </div>
                  {product.seo?.keywords && product.seo.keywords.length > 0 && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {product.seo.keywords.map((kw: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-full">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <SectionHeader icon={<BarChart2 className="w-4 h-4" />} title="Performance Metrics" />
                    <InfoRow label="Current Rating" value={product.rating > 0 ? `★ ${product.rating} / 5` : 'No reviews yet'} />
                    <InfoRow label="Total Reviews" value={product.review_count > 0 ? `${product.review_count} reviews` : 'No reviews yet'} />
                    <InfoRow label="Featured" value={product.is_featured ? 'Yes – Featured on homepage' : 'No'} />
                    <InfoRow label="Status" value={product.status} />
                  </div>
                </div>
              )}
            </div>

            {/* ─── Governance Action Panel ─── */}
            <div className="border-t border-amber-100 p-6 bg-amber-50/40 rounded-b-3xl space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-black text-slate-700 mb-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#800020]" />
                  Review Comments / Rejection Reason
                  {!isPending && <span className="text-slate-400 font-normal">(read-only — product already reviewed)</span>}
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => { setReviewComment(e.target.value); setActionError(''); }}
                  disabled={!isPending}
                  rows={3}
                  placeholder={
                    isPending
                      ? 'Enter approval notes, rejection reason, or specific changes requested from the vendor...'
                      : 'No further action available on this product.'
                  }
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-amber-200 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#800020]/30 disabled:bg-amber-50/50 disabled:text-slate-400"
                />
                {actionError && (
                  <p className="text-xs font-bold text-rose-600 mt-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> {actionError}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 justify-between">
                <Button variant="outline" onClick={onClose} size="sm">
                  Close
                </Button>
                {isPending && (
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Request Changes */}
                    <Button
                      variant="secondary"
                      size="sm"
                      isLoading={actionLoading === 'changes'}
                      disabled={actionLoading !== null}
                      onClick={handleRequestChanges}
                      leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                    >
                      Request Changes
                    </Button>

                    {/* Reject */}
                    <Button
                      variant="danger"
                      size="sm"
                      isLoading={actionLoading === 'reject'}
                      disabled={actionLoading !== null}
                      onClick={handleReject}
                      leftIcon={<XCircle className="w-3.5 h-3.5" />}
                    >
                      Reject Product
                    </Button>

                    {/* Approve */}
                    <Button
                      variant="success"
                      size="sm"
                      isLoading={actionLoading === 'approve'}
                      disabled={actionLoading !== null}
                      onClick={handleApprove}
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    >
                      Approve & Publish to DivineKart
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-48">
            <p className="text-sm text-slate-500 font-semibold">Product not found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
