import React, { useEffect, useState } from 'react';
import { adminOrderService, IAdminOrderModel } from '../../services/adminOrderService';
import { ShoppingBag, Eye, ShieldCheck, ChevronDown, ChevronUp, Layers, DollarSign, RefreshCw, XCircle } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<IAdminOrderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<IAdminOrderModel | null>(null);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchAdminOrders = async () => {
    setLoading(true);
    try {
      const data = await adminOrderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } fontally: {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminOrders();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const filteredOrders = statusFilter === 'ALL'
    ? orders
    : orders.filter((o) => o.orderStatus === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Multi-Vendor Global Orders Monitor & Settlement Engine</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track parent orders, inspect vendor sub-orders, audit commission deductions, and manage settlements.
          </p>
        </div>

        <button
          onClick={fetchAdminOrders}
          className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-xs font-bold text-amber-900 flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Orders
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-amber-200 pb-2 text-xs font-bold overflow-x-auto">
        {['ALL', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              statusFilter === st
                ? 'bg-[#800020] text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-amber-50 border border-amber-200/60'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Main Multi-Vendor Orders Table */}
      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs font-bold text-slate-500">Loading multi-vendor global orders...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-amber-50/60 text-slate-500 uppercase text-[10px] font-bold border-b border-amber-200">
                <tr>
                  <th className="py-3.5 px-4"></th>
                  <th className="py-3.5 px-4">Parent Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Vendors Included</th>
                  <th className="py-3.5 px-4">Grand Total</th>
                  <th className="py-3.5 px-4">Order Status</th>
                  <th className="py-3.5 px-4">Payment Status</th>
                  <th className="py-3.5 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {filteredOrders.map((ord) => {
                  const isExpanded = expandedOrderId === ord.id;
                  const subs = ord.subOrders || [];

                  return (
                    <React.Fragment key={ord.id}>
                      <tr className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3.5 px-2 text-center cursor-pointer" onClick={() => toggleExpand(ord.id)}>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-800" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-extrabold text-[#800020]">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{ord.customerName}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">
                            {subs.length} Vendor(s)
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-black text-slate-900">₹{ord.total.toLocaleString()}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                            {ord.orderStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                            {ord.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-3 py-1 rounded-lg border border-amber-200 hover:bg-amber-100 font-bold text-[#800020] flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" /> Details
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Sub-Orders Matrix Row */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="p-4 bg-amber-50/30 border-b border-amber-200">
                            <div className="p-4 rounded-xl bg-white border border-amber-200/80 space-y-3">
                              <h4 className="font-extrabold text-xs text-slate-800 flex items-center gap-2">
                                <Layers className="w-4 h-4 text-amber-900" /> Vendor Sub-Orders Breakdown for Order #{ord.orderNumber}
                              </h4>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {subs.map((sub, sIdx) => (
                                  <div key={sub.id || sIdx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                                    <div className="flex items-center justify-between font-bold">
                                      <span className="text-amber-900 font-mono">{sub.subOrderNumber}</span>
                                      <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-bold text-[10px] border">
                                        {sub.vendorStatus}
                                      </span>
                                    </div>
                                    <p className="font-bold text-slate-900">{sub.vendorName}</p>

                                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200 text-[11px]">
                                      <div>
                                        <span className="text-slate-400 text-[10px] block uppercase">Gross</span>
                                        <span className="font-bold">₹{sub.total}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400 text-[10px] block uppercase">Commission ({sub.commissionRate}%)</span>
                                        <span className="font-bold text-rose-600">₹{sub.platformCommission}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400 text-[10px] block uppercase">Vendor Net</span>
                                        <span className="font-bold text-emerald-700">₹{sub.vendorPayableAmount}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Order Details Inspector Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base font-mono">Parent Order #{selectedOrder.orderNumber}</h3>
                <p className="text-xs text-slate-500">Customer: {selectedOrder.customerName} ({selectedOrder.customerEmail})</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            {/* Separated Multi-Statuses Grid */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Order Status</span>
                <span className="font-extrabold text-slate-900">{selectedOrder.orderStatus}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Payment Status</span>
                <span className="font-extrabold text-emerald-700">{selectedOrder.paymentStatus}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Fulfillment Status</span>
                <span className="font-extrabold text-amber-900">{selectedOrder.fulfillmentStatus}</span>
              </div>
            </div>

            {/* Sub-Orders Breakdown */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Allocated Vendor Sub-Orders</h4>
              {selectedOrder.subOrders.map((sub, i) => (
                <div key={i} className="p-3 rounded-xl border border-amber-200 bg-amber-50/20 text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span>{sub.vendorName} ({sub.subOrderNumber})</span>
                    <span className="text-[#800020]">Status: {sub.vendorStatus}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-[11px]">
                    <span>Gross: ₹{sub.total}</span>
                    <span>Commission: ₹{sub.platformCommission}</span>
                    <span className="font-bold text-emerald-800">Net Payable: ₹{sub.vendorPayableAmount}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-amber-100">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
