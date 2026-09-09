import React, { useState } from 'react';
import { ShieldCheck, Lock, Plus, CheckCircle2, AlertCircle, X, Check, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface IRbacRole {
  id: string;
  key: string;
  name: string;
  permissions: string[];
  members: number;
  description: string;
}

export const INITIAL_ROLES: IRbacRole[] = [
  { id: 'role_1', key: 'SUPER_ADMIN', name: 'Super Admin', permissions: ['Full Platform Root Access', 'RBAC Management', 'Financial Ledgers', 'System Config'], members: 3, description: 'Unrestricted system root access across all modules.' },
  { id: 'role_2', key: 'CATALOG_MANAGER', name: 'Catalog Manager', permissions: ['Product Moderation', 'Category Hierarchy', 'Brand Registry', 'Price Overrides'], members: 6, description: 'Manages products, brand applications, and department structures.' },
  { id: 'role_3', key: 'FINANCE_AUDITOR', name: 'Finance Auditor', permissions: ['Payout Disbursals', 'GST Tax Invoices', 'Revenue Ledgers', 'Refund Audits'], members: 4, description: 'Monitors financial settlements, vendor payouts, and tax reports.' },
];

export const RbacPage: React.FC = () => {
  const [roles, setRoles] = useState<IRbacRole[]>(INITIAL_ROLES);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    description: '',
    selectedPermissions: ['Product Moderation'],
  });
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const AVAILABLE_PERMISSIONS = [
    'Product Moderation & Delist',
    'Category & Brand Hierarchy',
    'Vendor Application Approval',
    'Financial Disbursals & Ledger',
    'Return & Dispute Arbitration',
    'CMS & Banner Management',
    'System Configuration & Secrets',
  ];

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleNameChange = (val: string) => {
    const keyVal = val.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/(^_|_$)/g, '');
    setFormData((prev) => ({ ...prev, name: val, key: keyVal }));
  };

  const togglePermission = (perm: string) => {
    setFormData((prev) => {
      const exists = prev.selectedPermissions.includes(perm);
      return {
        ...prev,
        selectedPermissions: exists
          ? prev.selectedPermissions.filter((p) => p !== perm)
          : [...prev.selectedPermissions, perm],
      };
    });
  };

  const handleCreateRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('error', 'Please enter a role name.');
      return;
    }

    const newRole: IRbacRole = {
      id: `role_${Date.now()}`,
      key: formData.key || formData.name.toUpperCase().replace(/\s+/g, '_'),
      name: formData.name.trim(),
      permissions: formData.selectedPermissions.length > 0 ? formData.selectedPermissions : ['Basic View Access'],
      members: 0,
      description: formData.description.trim() || 'Custom administrative staff role.',
    };

    setRoles([...roles, newRole]);
    showToast('success', `Custom role "${newRole.name}" created successfully!`);
    setIsModalOpen(false);
    setFormData({ name: '', key: '', description: '', selectedPermissions: ['Product Moderation'] });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-xs font-bold transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
              : 'bg-rose-900 text-rose-50 border-rose-700'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Role-Based Access Control (RBAC)</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Define granular access permission matrices for administrative staff roles.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4 text-[#DAA520]" />}
        >
          Create Custom Role
        </Button>
      </div>

      {/* Roles Cards */}
      <div className="space-y-4">
        {roles.map((r) => (
          <div key={r.id} className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#800020]" />
                <h3 className="font-extrabold text-base text-slate-900 font-serif">{r.name}</h3>
                <span className="font-mono text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{r.key}</span>
              </div>
              <p className="text-xs text-slate-500">{r.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {r.permissions.map((perm, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-xl border border-amber-300 w-fit shrink-0">
              {r.members} Staff Members
            </span>
          </div>
        ))}
      </div>

      {/* CREATE CUSTOM ROLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Shield className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Create Custom Admin Role</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Role Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inventory Auditor"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">System Role Key</label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) => setFormData((prev) => ({ ...prev, key: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Role Description</label>
                <input
                  type="text"
                  placeholder="Short description of duties..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-800">Assign Module Permissions *</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {AVAILABLE_PERMISSIONS.map((perm) => {
                    const isChecked = formData.selectedPermissions.includes(perm);
                    return (
                      <button
                        key={perm}
                        type="button"
                        onClick={() => togglePermission(perm)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between font-semibold transition-all ${
                          isChecked
                            ? 'bg-amber-900 text-amber-50 border-amber-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{perm}</span>
                        {isChecked && <Check className="w-4 h-4 text-amber-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  leftIcon={<ShieldCheck className="w-4 h-4" />}
                >
                  Create &amp; Save Role
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
