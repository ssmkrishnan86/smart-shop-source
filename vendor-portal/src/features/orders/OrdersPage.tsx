import React, { useEffect, useState } from 'react';
import { vendorOrderService, IVendorSubOrderModel } from '../../services/vendorOrderService';
import { Button } from '../../components/ui/Button';
import { ShoppingBag, Truck, Printer, CheckCircle, PackageCheck, AlertCircle, X } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const [subOrders, setSubOrders] = useState<IVendorSubOrderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [shippingSubOrder, setShippingSubOrder] = useState<IVendorSubOrderModel | null>(null);
  const [courierPartner, setCourierPartner] = useState('BlueDart Express');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await vendorOrderService.getSubOrders();
      setSubOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (subOrderId: string, status: string, courier?: string, tracking?: string) => {
    setProcessing(true);
    try {
      await vendorOrderService.updateSubOrderStatus(subOrderId, status, courier, tracking);
      fetchOrders();
      setShippingSubOrder(null);
    } catch (err: any) {
      alert(err.message || 'Failed to update sub-order status');
    } finally {
      setProcessing(false);
    }
  };

  const openShipModal = (sub: IVendorSubOrderModel) => {
    setShippingSubOrder(sub);
    setTrackingNumber(sub.trackingNumber || sub.tracking_number || `BD-${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Vendor Sub-Orders & Fulfillment Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Process assigned sub-orders, reserve stock, generate packing slips, and enter courier tracking numbers.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-500">Loading vendor queue...</div>
      ) : (
        <div className="p-6 rounded-2xl bg-white border border-amber-200/80 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-amber-50/60 text-slate-500 uppercase text-[10px] font-bold border-b border-amber-200">
                <tr>
                  <th className="py-3.5 px-4">Sub-Order No.</th>
                  <th className="py-3.5 px-4">Items & Details</th>
                  <th className="py-3.5 px-4">Gross Subtotal</th>
                  <th className="py-3.5 px-4">Platform Fee (8%)</th>
                  <th className="py-3.5 px-4">Net Vendor Payable</th>
                  <th className="py-3.5 px-4">Vendor Status</th>
                  <th className="py-3.5 px-4">Fulfillment Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {subOrders.map((sub) => {
                  const subNum = sub.subOrderNumber || sub.sub_order_number || sub.id;
                  const vStatus = sub.vendorStatus || sub.vendor_status || 'NEW';
                  const subtot = sub.subtotal || 0;
                  const platformFee = sub.platformCommission || sub.platform_commission || Math.round(subtot * 0.08);
                  const netPayable = sub.vendorPayableAmount || sub.vendor_payable_amount || subtot - platformFee;

                  return (
                    <tr key={sub.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-extrabold text-[#800020]">
                        {subNum}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          {(sub.items || []).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{item.productName || item.product_name}</span>
                              <span className="text-[10px] text-slate-400">×{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-black text-slate-900">₹{subtot.toLocaleString()}</td>
                      <td className="py-3.5 px-4 font-bold text-rose-600">-₹{platformFee.toLocaleString()}</td>
                      <td className="py-3.5 px-4 font-black text-emerald-700">₹{netPayable.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            vStatus === 'SHIPPED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : vStatus === 'PACKED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {vStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {vStatus === 'NEW' && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(sub.id, 'ACCEPTED')}
                              disabled={processing}
                              leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
                            >
                              Accept Order
                            </Button>
                          )}
                          {vStatus === 'ACCEPTED' && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(sub.id, 'PACKED')}
                              disabled={processing}
                              leftIcon={<PackageCheck className="w-3.5 h-3.5" />}
                            >
                              Mark Packed
                            </Button>
                          )}
                          {vStatus === 'PACKED' && (
                            <Button
                              size="sm"
                              onClick={() => openShipModal(sub)}
                              disabled={processing}
                              leftIcon={<Truck className="w-3.5 h-3.5" />}
                            >
                              Ship & AWB
                            </Button>
                          )}
                          {vStatus === 'SHIPPED' && (
                            <span className="text-[10px] text-slate-400 font-medium">Shipped ({sub.courierPartner || sub.courier_partner})</span>
                          )}
                          <button
                            onClick={() => window.print()}
                            className="p-1.5 rounded-lg border border-amber-200 hover:bg-amber-100"
                            title="Print Packing Slip"
                          >
                            <Printer className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Shipment & AWB Generation Modal */}
      {shippingSubOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-amber-200">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm">Generate Shipment & Courier AWB</h3>
              <button onClick={() => setShippingSubOrder(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Courier Partner</label>
                <select
                  value={courierPartner}
                  onChange={(e) => setCourierPartner(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-slate-50 font-semibold"
                >
                  <option value="BlueDart Express">BlueDart Express</option>
                  <option value="Delhivery Logistics">Delhivery Logistics</option>
                  <option value="India Post SpeedPost">India Post SpeedPost</option>
                  <option value="XpressBees Courier">XpressBees Courier</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">AWB / Air Waybill Tracking Number</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 font-mono font-bold"
                  placeholder="e.g. BD-88229910"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShippingSubOrder(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleUpdateStatus(shippingSubOrder.id, 'SHIPPED', courierPartner, trackingNumber)}
                disabled={processing}
              >
                Confirm Shipment & Notify Customer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
