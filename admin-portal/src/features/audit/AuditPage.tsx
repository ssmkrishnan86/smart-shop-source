import React, { useState } from 'react';
import { History, ShieldCheck, Search, X, Download, Filter, CheckCircle2, Lock, DollarSign, Store, Tag } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface IAuditLog {
  id: string;
  action: string;
  category: 'AUTH' | 'VENDOR' | 'FINANCE' | 'CATALOG';
  admin: string;
  details: string;
  ip: string;
  time: string;
}

export const INITIAL_AUDIT_LOGS: IAuditLog[] = [
  { id: 'log_1', action: 'VENDOR_APPROVE', category: 'VENDOR', admin: 'Alex Morgan', details: 'Approved KYB vendor store application for Vedic Crafts Heritage.', ip: '192.168.1.45', time: '2026-08-09 18:05:12' },
  { id: 'log_2', action: 'DISBURSE_PAYOUT', category: 'FINANCE', admin: 'Meera Iyer', details: 'Disbursed batch payout ₹41,650 (UTR98421008123) to Vedic Crafts Heritage.', ip: '192.168.1.52', time: '2026-08-09 17:42:00' },
  { id: 'log_3', action: 'COMMISSION_UPDATE', category: 'VENDOR', admin: 'Siddharth Rao', details: 'Updated commission rate for Jaipur Murti Kala to 10%.', ip: '192.168.1.48', time: '2026-08-09 15:20:10' },
  { id: 'log_4', action: 'PRODUCT_DELIST', category: 'CATALOG', admin: 'Alex Morgan', details: 'Removed product listing "Fake Rudraksha Bead" due to compliance check.', ip: '192.168.1.45', time: '2026-08-09 12:11:44' },
  { id: 'log_5', action: 'CUSTOMER_BAN', category: 'AUTH', admin: 'Alex Morgan', details: 'Banned customer account rahul.sharma@example.com (Reason: Suspicious chargebacks).', ip: '192.168.1.45', time: '2026-08-08 21:04:19' },
  { id: 'log_6', action: 'ROLE_UPDATE', category: 'AUTH', admin: 'Alex Morgan', details: 'Updated permission role for Vikram Seth to ORDER_OPERATOR.', ip: '192.168.1.45', time: '2026-08-08 19:30:00' },
];

export const AuditPage: React.FC = () => {
  const [logs, setLogs] = useState<IAuditLog[]>(INITIAL_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'AUTH' | 'VENDOR' | 'FINANCE' | 'CATALOG'>('ALL');
  const [toastMessage, setToastMessage] = useState<{ type: 'success'; text: string } | null>(null);

  const filteredLogs = logs.filter((l) => {
    const matchesTab = activeTab === 'ALL' || l.category === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      l.action.toLowerCase().includes(q) ||
      l.admin.toLowerCase().includes(q) ||
      l.details.toLowerCase().includes(q) ||
      l.ip.includes(q);

    return matchesTab && matchesSearch;
  });

  const handleExportCsv = () => {
    const headers = ['Timestamp', 'Admin Member', 'Action', 'Category', 'Details', 'IP Address'];
    const rows = filteredLogs.map((l) => [
      `"${l.time}"`,
      `"${l.admin}"`,
      `"${l.action}"`,
      `"${l.category}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      `"${l.ip}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `divineadmin_audit_trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage({ type: 'success', text: 'Audit trail CSV exported successfully!' });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'AUTH':
        return <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold border border-rose-300">SECURITY / AUTH</span>;
      case 'FINANCE':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">FINANCIAL</span>;
      case 'VENDOR':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">VENDOR VETTING</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-bold border border-indigo-300">CATALOG</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl bg-emerald-900 text-emerald-50 border border-emerald-700 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Immutable Audit Trail Logs</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically logged administrative action history, IP addresses &amp; timestamped mutations.
          </p>
        </div>
        <Button
          onClick={handleExportCsv}
          variant="outline"
          leftIcon={<Download className="w-4 h-4 text-[#800020]" />}
        >
          Export Audit CSV
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-amber-50/70 rounded-xl border border-amber-200/60 w-full sm:w-auto">
          {(['ALL', 'AUTH', 'VENDOR', 'FINANCE', 'CATALOG'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {tab === 'ALL' && `All Logs (${logs.length})`}
              {tab === 'AUTH' && 'Security'}
              {tab === 'VENDOR' && 'Vendors'}
              {tab === 'FINANCE' && 'Finance'}
              {tab === 'CATALOG' && 'Catalog'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search action, admin, IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-mono"
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

      {/* Audit Log Table */}
      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-amber-50/80 text-slate-600 uppercase text-[10px] font-bold border-b border-amber-200/80 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Admin Member</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Action Type</th>
                <th className="py-3.5 px-4">Mutation Details</th>
                <th className="py-3.5 px-4">Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100/70 font-mono">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-4 px-4 font-normal text-slate-500 whitespace-nowrap text-[11px]">
                    {l.time}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap font-sans">
                    {l.admin}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {getCategoryBadge(l.category)}
                  </td>
                  <td className="py-4 px-4 font-black text-[#800020] whitespace-nowrap">
                    {l.action}
                  </td>
                  <td className="py-4 px-4 text-slate-800 font-sans text-xs max-w-md">
                    {l.details}
                  </td>
                  <td className="py-4 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                    {l.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
