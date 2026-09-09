import React, { useEffect, useState } from 'react';
import { vendorPaymentService } from '../../services/vendorPaymentService';
import { IPayout } from '../../interfaces';
import { DollarSign, ArrowUpRight, Building2, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const PaymentsPage: React.FC = () => {
  const [payouts, setPayouts] = useState<IPayout[]>([]);

  useEffect(() => {
    vendorPaymentService.getPayouts().then((res) => setPayouts([...res.data]));
  }, []);

  const handleRequestPayout = async () => {
    const res = await vendorPaymentService.requestWithdrawal(25000);
    setPayouts([res.data, ...payouts]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Payouts & Financial Settlements</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track net merchant earnings, bank payouts & download GST tax invoices.</p>
        </div>
        <Button onClick={handleRequestPayout} leftIcon={<ArrowUpRight className="w-4 h-4 text-[#DAA520]" />}>
          Request Payout (₹25,000)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Available for Payout</span>
          <h2 className="text-3xl font-black text-emerald-600">₹45,200.00</h2>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Total Settled Earnings</span>
          <h2 className="text-3xl font-black text-[#800020]">₹4,85,200.00</h2>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center gap-3">
          <Building2 className="w-8 h-8 text-[#800020]" />
          <div>
            <p className="font-bold text-xs text-slate-900">HDFC Bank • Account ending 9821</p>
            <p className="text-[10px] text-slate-500">Auto-payout schedule: Weekly (Every Monday)</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900">Payout Transaction History</h3>
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-amber-50/60 text-slate-500 uppercase text-[10px] font-bold border-b border-amber-200">
            <tr>
              <th className="py-3.5 px-4">Payout ID</th>
              <th className="py-3.5 px-4">Requested Date</th>
              <th className="py-3.5 px-4">Gross Amount</th>
              <th className="py-3.5 px-4">Platform Fee (2%)</th>
              <th className="py-3.5 px-4">Net Payout</th>
              <th className="py-3.5 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100">
            {payouts.map((p) => (
              <tr key={p.id}>
                <td className="py-3.5 px-4 font-bold text-[#800020]">{p.payoutNumber}</td>
                <td className="py-3.5 px-4">{p.requestedAt}</td>
                <td className="py-3.5 px-4 font-bold">₹{p.amount.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-slate-500">₹{p.fee.toLocaleString()}</td>
                <td className="py-3.5 px-4 font-black text-emerald-600">₹{p.netAmount.toLocaleString()}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
