import React, { useEffect, useState } from 'react';
import { MetricCard } from '../../components/ui/MetricCard';
import { DollarSign, Boxes, ShoppingBag, Star, Plus, TrendingUp, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { vendorProductService } from '../../services/vendorProductService';
import { vendorOrderService } from '../../services/vendorOrderService';
import { IProduct, IOrder } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    vendorProductService.getProducts().then((res) => setProducts(res.data));
    vendorOrderService.getSubOrders().then((data) => setOrders(data));
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Merchant Seller Telemetry</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time GMV sales, order fulfillment queue, and inventory health.</p>
        </div>

        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-amber-100 font-extrabold text-xs shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#DAA520]" /> Add New Product
        </button>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Net Monthly Revenue" value="₹84,250.00" change="+14.2% vs last month" isPositive icon={DollarSign} />
        <MetricCard title="Active Listings" value={`${products.length} Items`} change="2 Low Stock" isPositive={false} icon={Boxes} />
        <MetricCard title="Pending Fulfillment" value={`${orders.length} Sub-Orders`} change="All within SLA" isPositive icon={ShoppingBag} />
        <MetricCard title="Store Reputation" value="4.9 ★" change="1,420 Customer Ratings" isPositive icon={Star} />
      </div>

      {/* Recent Orders & Stock Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Queue */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-amber-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#800020]" /> Recent Vendor Sub-Orders
            </h3>
            <button onClick={() => navigate('/orders')} className="text-xs font-extrabold text-[#800020] hover:underline">
              View All Queue &gt;
            </button>
          </div>

          <div className="divide-y divide-amber-100">
            {orders.map((ord: any) => (
              <div key={ord.id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold font-mono text-[#800020]">{ord.subOrderNumber || ord.sub_order_number || ord.id}</span>
                  <p className="text-slate-900 font-bold mt-0.5">{ord.vendorName || ord.vendor_name}</p>
                </div>

                <div className="text-right">
                  <span className="font-black text-slate-900 text-sm">₹{(ord.total || 0).toLocaleString()}</span>
                  <span className="block text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-1">
                    {ord.vendorStatus || ord.vendor_status || 'NEW'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-6 rounded-2xl bg-white border border-amber-200/80 shadow-sm space-y-4 h-fit">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" /> Stock Health Alerts
          </h3>

          <div className="space-y-3">
            {products.map((prod) => (
              <div key={prod.id} className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 flex items-center justify-between text-xs">
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-slate-900 truncate">{prod.name}</p>
                  <span className="text-[10px] text-slate-500 font-mono">SKU: {prod.sku}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                  prod.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {prod.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
