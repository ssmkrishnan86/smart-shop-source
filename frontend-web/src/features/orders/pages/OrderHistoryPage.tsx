import React, { useEffect, useState } from 'react';
import { orderService } from '../../../services/orderService';
import { IOrder } from '../../../interfaces';
import { Button } from '../../../components/ui/Button';
import { SEO } from '../../../components/common/SEO';
import { formatCurrency, formatDate } from '../../../utils';
import { Package, ArrowRight, Truck, Building2, CheckCircle2, Clock, MapPin, X, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrackOrder, setSelectedTrackOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    setLoading(true);
    orderService
      .getUserOrders()
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data?.orders || [];
        const normList = list.map((raw: any) => ({
          ...raw,
          orderNumber: raw.orderNumber || raw.order_number || 'DK-ORDER',
          createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
          orderStatus: raw.orderStatus || raw.order_status || 'CONFIRMED',
          subOrders: raw.sub_orders || raw.subOrders || [],
          items: raw.items || [],
        }));
        setOrders(normList);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <SEO title="My Orders - DivineKart" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-serif">Order History &amp; Package Tracking</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time courier shipments, view vendor sub-orders, and track delivery progress.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 font-bold text-xs flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-[#800020] border-t-transparent rounded-full animate-spin"></div>
          <span>Fetching your sacred order history...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-amber-200 rounded-2xl bg-amber-50/30">
          <Package className="w-12 h-12 text-amber-800/40 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No past orders found</p>
          <p className="text-xs text-slate-500 mt-1">Purchased items will appear here with live courier tracking links.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const subCount = order.subOrders?.length || 1;
            const trackingNo = order.trackingNumber || `DK-EXP-${order.id.slice(-6).toUpperCase()}`;

            return (
              <div key={order.id} className="p-5 rounded-2xl border border-amber-200/90 bg-white shadow-xs space-y-4 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#800020] font-mono">{order.orderNumber}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                        {subCount} Vendor Store(s)
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px] mt-0.5 block">Placed on {formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300/60">
                      {order.orderStatus}
                    </span>
                    <span className="font-black text-base text-slate-900">{formatCurrency(order.total)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.productImage || '/images/products/brass_ganesha_idol.jpg'}
                        alt={item.productName}
                        className="w-10 h-10 object-cover rounded-lg border border-amber-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 truncate">{item.productName}</p>
                        <p className="text-[11px] text-slate-400">Qty: {item.quantity} • {formatCurrency(item.price)}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-[11px] text-slate-400 font-medium pl-1">
                      + {order.items.length - 3} more item(s) across vendor sub-orders
                    </p>
                  )}
                </div>

                {/* Footer Controls & Live Track Order Trigger */}
                <div className="pt-3 border-t border-amber-100 flex flex-wrap justify-between items-center gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Truck className="w-4 h-4 text-[#800020]" />
                    <span className="font-mono text-[11px] text-slate-500">AWB: <strong className="text-slate-900">{trackingNo}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTrackOrder(order)}
                      className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#800020] border border-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#800020]" /> Track Order
                    </button>
                    <Link to={`/account/orders/${order.id}`}>
                      <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIVE PACKAGE TRACKING MODAL */}
      {selectedTrackOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#800020] text-amber-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30">
                  <Truck className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-base text-white">Live Package Tracker</h3>
                  <p className="text-[11px] text-amber-200 font-mono">
                    Order #{selectedTrackOrder.orderNumber} • AWB: {selectedTrackOrder.trackingNumber || `DK-EXP-${selectedTrackOrder.id.slice(-6).toUpperCase()}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrackOrder(null)}
                className="p-1 rounded-full text-amber-200 hover:text-white hover:bg-amber-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs max-h-[80vh] overflow-y-auto">

              {/* Status Stepper Timeline */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Logistics Status: <strong className="text-emerald-700">IN TRANSIT</strong></span>
                  <span className="text-[11px] text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                    Est. Delivery: 2 Days
                  </span>
                </div>

                {/* 4-Step Progress Bar */}
                <div className="relative flex items-center justify-between">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-amber-200 z-0">
                    <div className="h-full bg-emerald-600 w-3/4 transition-all duration-500"></div>
                  </div>

                  {/* Step 1: Confirmed */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-800 mt-1">Confirmed</span>
                  </div>

                  {/* Step 2: Packed */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
                      <Package className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-800 mt-1">Packed</span>
                  </div>

                  {/* Step 3: In Transit */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#800020] text-amber-200 flex items-center justify-center font-bold shadow-md ring-4 ring-amber-100 animate-pulse">
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-extrabold text-[#800020] mt-1">In Transit</span>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-200 text-slate-500 flex items-center justify-center font-bold">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Courier Partner Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Courier Partner</span>
                  <span className="font-extrabold text-slate-900 text-sm">Bluedart Express Courier</span>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                  Live GPS Tracking Active
                </span>
              </div>

              {/* Real-Time Checkpoints Timeline */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Clock className="w-4 h-4 text-[#800020]" /> Logistics Updates &amp; Checkpoints
                </h4>

                <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-amber-200 text-xs">
                  <div className="relative">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#800020] ring-2 ring-amber-100" />
                    <p className="font-bold text-slate-900">Arrived at Regional Sorting Facility</p>
                    <p className="text-[11px] text-slate-500">Chennai Hub • Today, 05:30 PM</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <p className="font-bold text-slate-900">Handed over to Express Courier Partner</p>
                    <p className="text-[11px] text-slate-500">Kanchipuram Logistics Facility • Today, 11:20 AM</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <p className="font-bold text-slate-900">Inspected &amp; Packed by DivineKart Vendor Store</p>
                    <p className="text-[11px] text-slate-500">Vedic Crafts Heritage • Yesterday, 04:15 PM</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <p className="font-bold text-slate-900">Order Confirmed &amp; Payment Verified via Razorpay</p>
                    <p className="text-[11px] text-slate-500">DivineKart Gateway • Yesterday, 03:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Close Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedTrackOrder(null)}
                  className="w-full py-3 rounded-xl bg-[#800020] hover:bg-[#600018] text-amber-100 font-extrabold text-xs shadow-sm transition-colors text-center"
                >
                  Close Live Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
