import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../../services/orderService';
import { notifyProductSync } from '../../../services/productSyncService';
import { useToast } from '../../../hooks/useToast';

import { IOrder } from '../../../interfaces';
import { Button } from '../../../components/ui/Button';
import { SEO } from '../../../components/common/SEO';
import { formatCurrency, formatDate } from '../../../utils';
import {
  ArrowLeft,
  Truck,
  Package,
  Clock,
  Building2,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  Loader2,
  XCircle,
  X,
} from 'lucide-react';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'timeline'>('details');

  // Cancel Order Modal State
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('Ordered by mistake');
  const [customReasonNote, setCustomReasonNote] = useState<string>('');

  const fetchOrder = () => {
    if (id) {
      setLoading(true);
      orderService
        .getOrderById(id)
        .then((res) => {
          const raw = res.data;
          const normOrder: IOrder = {
            ...raw,
            orderNumber: raw.orderNumber || raw.order_number || 'DK-ORDER',
            createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
            orderStatus: raw.orderStatus || raw.order_status || 'CONFIRMED',
            paymentStatus: raw.paymentStatus || raw.payment_status || 'PAID',
            fulfillmentStatus: raw.fulfillmentStatus || raw.fulfillment_status || 'UNFULFILLED',
            shipmentStatus: raw.shipmentStatus || raw.shipment_status || 'NOT_SHIPPED',
            subOrders: (raw.sub_orders || raw.subOrders || []).map((s: any) => ({
              ...s,
              subOrderNumber: s.subOrderNumber || s.sub_order_number,
              vendorName: s.vendorName || s.vendor_name,
              vendorStatus: s.vendorStatus || s.vendor_status,
              courierPartner: s.courierPartner || s.courier_partner,
              trackingNumber: s.trackingNumber || s.tracking_number,
              items: s.items || [],
            })),
            timelineLogs: (raw.timeline_logs || raw.timelineLogs || []).map((t: any) => ({
              ...t,
              actorType: t.actorType || t.actor_type,
              actorName: t.actorName || t.actor_name,
              eventName: t.eventName || t.event_name,
              createdAt: t.createdAt || t.created_at,
            })),
          };
          setOrder(normOrder);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!order) return;

    setCancelling(true);
    try {
      const fullReason =
        cancelReason === 'Other' && customReasonNote.trim()
          ? `Other: ${customReasonNote.trim()}`
          : cancelReason;
      await orderService.cancelOrder(order.id, fullReason);
      notifyProductSync('EDITED');
      showToast('Order cancelled successfully. Stock released to inventory.', 'success');

      setShowCancelModal(false);
      fetchOrder();
    } catch (err: any) {
      showToast(err.message || 'Failed to cancel order', 'error');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center font-bold text-slate-600">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm">Fetching multi-vendor order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-amber-200">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Order Not Found</h2>
        <p className="text-xs text-slate-500 mb-4">We couldn't locate the requested order details.</p>
        <Link to="/account/orders">
          <Button size="sm">Back to Order History</Button>
        </Link>
      </div>
    );
  }

  const isCancellable = ['CONFIRMED', 'PROCESSING', 'PENDING'].includes(order.orderStatus.toUpperCase());
  const subOrders = order.subOrders || [];
  const timelineLogs = order.timelineLogs || [];

  return (
    <div className="space-y-6">
      <SEO title={`Order #${order.orderNumber}`} />

      <div className="flex items-center justify-between">
        <Link to="/account/orders" className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 hover:text-amber-700">
          <ArrowLeft className="w-4 h-4" /> Back to Orders History
        </Link>
        <span className="text-xs font-mono font-medium text-slate-400">Order ID: {order.id}</span>
      </div>

      {/* Parent Order Banner */}
      <div className="p-6 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 font-mono tracking-tight">{order.orderNumber}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/60">
                Parent Order
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-700" /> Placed on {formatDate(order.createdAt)} • Contains items from {subOrders.length || 1} Vendor(s)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-[#800020]">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Multi-Status Badges Matrix */}
        <div className="pt-3 border-t border-amber-200/60 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white border border-amber-100 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Order Status</span>
            <span className="font-extrabold text-slate-900 mt-0.5 block">{order.orderStatus}</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-amber-100 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Status</span>
            <span className="font-extrabold text-emerald-700 mt-0.5 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {order.paymentStatus} ({order.paymentMethod})
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-amber-100 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Fulfillment Status</span>
            <span className="font-extrabold text-amber-900 mt-0.5 block">{order.fulfillmentStatus}</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-amber-100 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Shipment Status</span>
            <span className="font-extrabold text-blue-700 mt-0.5 block">{order.shipmentStatus}</span>
          </div>
        </div>
      </div>

      {/* Tabs for Vendor Sub-Orders & Timeline */}
      <div className="flex items-center border-b border-amber-200 text-xs font-bold gap-6">
        <button
          onClick={() => setActiveTab('details')}
          className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'details' ? 'border-[#800020] text-[#800020]' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" /> Vendor Sub-Orders Breakdown ({subOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'timeline' ? 'border-[#800020] text-[#800020]' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" /> Immutable Order Timeline ({timelineLogs.length})
        </button>
      </div>

      {activeTab === 'details' ? (
        <div className="space-y-6">
          {/* Vendor Sub-Orders List */}
          {subOrders.length > 0 ? (
            subOrders.map((sub, idx) => (
              <div key={sub.id || idx} className="p-6 rounded-2xl border border-amber-200/90 bg-white shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-900">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">{sub.vendorName}</h3>
                      <p className="text-[11px] text-slate-400 font-mono">Sub-order #{sub.subOrderNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                      Status: {sub.vendorStatus}
                    </span>
                    <span className="font-black text-sm text-slate-900">{formatCurrency(sub.total)}</span>
                  </div>
                </div>

                {/* Logistics & Shipping Partner */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Truck className="w-4 h-4 text-amber-700" />
                    <span>Courier Partner: <strong className="text-slate-900">{sub.courierPartner || 'Pending Assignment'}</strong></span>
                  </div>
                  <div>
                    <span className="text-slate-500">AWB / Tracking No: </span>
                    <span className="font-mono font-bold text-[#800020]">{sub.trackingNumber || 'Not Shipped Yet'}</span>
                  </div>
                </div>

                {/* Items under this vendor */}
                <div className="space-y-3 divide-y divide-amber-100">
                  {sub.items.map((item) => (
                    <div key={item.id} className="pt-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.productImage || '/images/products/brass_ganesha_idol.jpg'}
                          alt={item.productName}
                          className="w-12 h-12 object-cover rounded-xl border border-amber-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{item.productName}</p>
                          <p className="text-[11px] text-slate-400">Qty: {item.quantity} × {formatCurrency(item.price)}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 rounded-2xl border border-amber-200 bg-white space-y-4 shadow-sm">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-900" /> Items in Order
              </h3>
              <div className="space-y-3 divide-y divide-amber-100">
                {order.items.map((item) => (
                  <div key={item.id} className="pt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-cover rounded-xl border border-amber-200" />
                      <div>
                        <p className="font-semibold text-slate-900">{item.productName}</p>
                        <p className="text-[11px] text-slate-400">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            {isCancellable && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCancelModal(true)}
                disabled={cancelling}
                leftIcon={<XCircle className="w-4 h-4 text-rose-600" />}
              >
                Cancel Order
              </Button>
            )}
            <p className="text-[11px] text-slate-400 italic">Need assistance with your order? Contact DivineKart customer support.</p>
          </div>
        </div>
      ) : (
        /* Timeline Audit Logs View */
        <div className="p-6 rounded-2xl border border-amber-200 bg-white shadow-sm space-y-6">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#800020]" /> Lifecycle Event Audit Trail
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-200">
            {timelineLogs.map((log, index) => (
              <div key={log.id || index} className="relative flex items-start gap-3 text-xs">
                <div className="absolute -left-[23px] top-0.5 w-5 h-5 rounded-full bg-amber-100 border-2 border-[#800020] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#800020]" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">{log.eventName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                      {log.actorType} ({log.actorName})
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs">{log.description}</p>
                  <p className="text-[10px] text-slate-400">{formatDate(log.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CUSTOM THEME CANCEL ORDER MODAL DIALOG */}
      {showCancelModal && order && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-rose-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#800020] text-amber-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-400/30">
                  <AlertTriangle className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-sm text-white">Cancel Order #{order.orderNumber}</h3>
                  <p className="text-[11px] text-amber-200 font-medium">Total: {formatCurrency(order.total)}</p>
                </div>
              </div>
              <button
                onClick={() => setShowCancelModal(false)}
                className="p-1 rounded-full text-amber-200 hover:text-white hover:bg-amber-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-slate-700">
                <p className="font-extrabold text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" /> Important Cancellation Notice:
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Cancelling this order will release the reserved item inventory back to vendor stock and initiate an automated refund process for online payments.
                </p>
              </div>

              {/* Cancellation Reason Dropdown */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800">Select Cancellation Reason *</label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                >
                  <option value="Ordered by mistake">Ordered by mistake</option>
                  <option value="Found better price elsewhere">Found better price elsewhere</option>
                  <option value="Need to change delivery address / contact">Need to change delivery address / contact</option>
                  <option value="Selected wrong items or payment method">Selected wrong items or payment method</option>
                  <option value="Delayed delivery time">Delayed delivery time</option>
                  <option value="Other">Other reason</option>
                </select>
              </div>

              {cancelReason === 'Other' && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Specify Reason Details</label>
                  <textarea
                    rows={2}
                    value={customReasonNote}
                    onChange={(e) => setCustomReasonNote(e.target.value)}
                    placeholder="Enter reason details..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Keep My Order
                </button>
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={handleCancelOrder}
                  className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-extrabold shadow-md transition-all flex items-center gap-2"
                >
                  {cancelling ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Cancelling Order...
                    </>
                  ) : (
                    'Yes, Cancel Order'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
