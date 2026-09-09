import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  Ban,
  ShieldCheck,
  UserCheck,
  ShieldAlert,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { adminCustomerService, ICustomerAccount } from '../../services/adminCustomerService';

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<ICustomerAccount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'BANNED'>('ALL');

  // Ban / Unban Modal State
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomerAccount | null>(null);
  const [banReason, setBanReason] = useState<string>('Suspicious account activity');
  const [customNote, setCustomNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await adminCustomerService.getCustomers();
      setCustomers(data);
    } catch {
      showToast('error', 'Failed to load customer directory.');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenBanModal = (customer: ICustomerAccount) => {
    setSelectedCustomer(customer);
    setBanReason('Suspicious account activity');
    setCustomNote('');
  };

  const handleToggleBanSubmit = async () => {
    if (!selectedCustomer) return;
    setIsSubmitting(true);
    const isBanning = selectedCustomer.status === 'ACTIVE';
    const action = isBanning ? 'BAN' : 'UNBAN';
    const finalReason = banReason === 'Other' && customNote.trim() ? `Other: ${customNote.trim()}` : banReason;

    try {
      const updated = await adminCustomerService.toggleCustomerBan(selectedCustomer.id, action, finalReason);
      setCustomers((prev) =>
        prev.map((c) => (c.id === selectedCustomer.id ? { ...c, status: updated.status, banReason: finalReason } : c))
      );

      showToast(
        isBanning ? 'error' : 'success',
        `Customer account for ${selectedCustomer.name} has been ${isBanning ? 'banned' : 'unbanned'}.`
      );
      setSelectedCustomer(null);
    } catch {
      showToast('error', `Failed to ${action.toLowerCase()} customer account.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter logic
  const filteredCustomers = customers.filter((c) => {
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'ACTIVE' && c.status === 'ACTIVE') ||
      (activeTab === 'BANNED' && c.status === 'BANNED');

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  const totalCount = customers.length;
  const activeCount = customers.filter((c) => c.status === 'ACTIVE').length;
  const bannedCount = customers.filter((c) => c.status === 'BANNED').length;

  return (
    <div className="space-y-6 pb-12">
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Platform Customer Accounts</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Directory of registered marketplace customers, order histories, &amp; security ban management.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Customers</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">{totalCount}</span>
            <Users className="w-6 h-6 text-amber-700" />
          </div>
          <p className="text-[11px] text-slate-400">Registered marketplace accounts</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Active Accounts</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-emerald-700">{activeCount}</span>
            <UserCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-[11px] text-emerald-800 font-semibold">Good standing status</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Banned Accounts</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-rose-700">{bannedCount}</span>
            <ShieldAlert className="w-6 h-6 text-rose-600" />
          </div>
          <p className="text-[11px] text-rose-800 font-semibold">Access restricted</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-50/70 rounded-xl border border-amber-200/60 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ALL'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            All Customers ({totalCount})
          </button>
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ACTIVE'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab('BANNED')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'BANNED'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Banned ({bannedCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
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

      {/* Main Customers Table */}
      <div className="rounded-2xl bg-white border border-amber-200/80 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading customer directory...</span>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
            <Users className="w-8 h-8 text-amber-300 stroke-1" />
            <p className="font-bold text-slate-700">No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-amber-50/80 text-slate-600 uppercase text-[10px] font-bold border-b border-amber-200/80 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Contact Phone</th>
                  <th className="py-3.5 px-4">Total Orders</th>
                  <th className="py-3.5 px-4">Total Spent</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100/70">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-serif font-black flex items-center justify-center border border-amber-300 text-sm shrink-0">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="block font-extrabold text-slate-900">{c.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{c.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-medium text-slate-700 whitespace-nowrap">
                      {c.phone}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">
                      {c.ordersCount} orders
                    </td>
                    <td className="py-4 px-4 font-black text-[#800020] whitespace-nowrap">
                      {c.totalSpent}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {c.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold border border-rose-300">
                          <Ban className="w-3 h-3 text-rose-600" /> BANNED
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {c.status === 'ACTIVE' ? (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleOpenBanModal(c)}
                          leftIcon={<Ban className="w-3.5 h-3.5" />}
                        >
                          Ban Account
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenBanModal(c)}
                          leftIcon={<RefreshCw className="w-3.5 h-3.5 text-emerald-700" />}
                          className="border-emerald-400 text-emerald-800 hover:bg-emerald-50"
                        >
                          Unban Account
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* BAN / UNBAN CUSTOMER CONFIRMATION MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-xl ${
                    selectedCustomer.status === 'ACTIVE'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {selectedCustomer.status === 'ACTIVE' ? (
                    <Ban className="w-5 h-5 text-rose-700" />
                  ) : (
                    <UserCheck className="w-5 h-5 text-emerald-700" />
                  )}
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">
                  {selectedCustomer.status === 'ACTIVE' ? 'Ban Customer Account' : 'Unban Customer Account'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Overview Card */}
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <p className="font-extrabold text-slate-900 text-sm">{selectedCustomer.name}</p>
                <p className="font-mono text-slate-500 text-[11px]">{selectedCustomer.email}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                    {selectedCustomer.ordersCount} Total Orders
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
                    {selectedCustomer.totalSpent} Spent
                  </span>
                </div>
              </div>

              {selectedCustomer.status === 'ACTIVE' ? (
                <>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                    <span>
                      Banning this customer account will immediately revoke login sessions and restrict them from placing future marketplace orders.
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-800">Select Ban Reason *</label>
                    <select
                      value={banReason}
                      onChange={(e) => setBanReason(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                    >
                      <option value="Suspicious account activity">Suspicious / fraudulent account activity</option>
                      <option value="Violation of terms of service">Violation of terms of service</option>
                      <option value="Spamming fake reviews / feedback">Spamming fake reviews / feedback</option>
                      <option value="Chargeback & payment dispute abuse">Chargeback &amp; payment dispute abuse</option>
                      <option value="Other">Other policy reason</option>
                    </select>
                  </div>

                  {banReason === 'Other' && (
                    <div className="space-y-1">
                      <label className="font-bold text-slate-800">Specify Reason Details</label>
                      <textarea
                        rows={2}
                        value={customNote}
                        onChange={(e) => setCustomNote(e.target.value)}
                        placeholder="Enter reason details..."
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020]"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    Unbanning <strong>{selectedCustomer.name}</strong> will restore full access to their customer account.
                  </span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCustomer(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant={selectedCustomer.status === 'ACTIVE' ? 'danger' : 'gold'}
                size="sm"
                isLoading={isSubmitting}
                onClick={handleToggleBanSubmit}
                leftIcon={
                  isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : selectedCustomer.status === 'ACTIVE' ? (
                    <Ban className="w-4 h-4" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )
                }
              >
                {selectedCustomer.status === 'ACTIVE' ? 'Yes, Ban Account' : 'Restore & Unban'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
