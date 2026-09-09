import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  ShieldCheck,
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  Shield,
  Edit2,
  Trash2,
  Key,
  UserPlus,
  Lock,
  Mail,
  UserCheck,
  Check,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { MetricCard } from '../../components/ui/MetricCard';
import { adminUserService, IAdminUserModel } from '../../services/adminUserService';

const ADMIN_ROLES = [
  {
    key: 'SUPER_ADMIN',
    label: 'Super Admin',
    color: 'bg-rose-900 text-rose-50 border-rose-800',
    desc: 'Full unrestricted platform access: settings, RBAC, financial ledgers, system config.',
  },
  {
    key: 'CATALOG_MANAGER',
    label: 'Catalog Manager',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    desc: 'Manage global products, categories, brands, price overrides, and store imagery.',
  },
  {
    key: 'FINANCE_AUDITOR',
    label: 'Finance Auditor',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    desc: 'Access payout settlements, vendor commissions, tax reports, and refund ledgers.',
  },
  {
    key: 'ORDER_OPERATOR',
    label: 'Order Operator',
    color: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    desc: 'Inspect customer orders, sub-orders, fulfillment status, and logistics tracking.',
  },
  {
    key: 'VENDOR_MANAGER',
    label: 'Vendor Manager',
    color: 'bg-purple-100 text-purple-900 border-purple-300',
    desc: 'Approve vendor seller applications, inspect store profiles, and commission terms.',
  },
  {
    key: 'CUSTOMER_SUPPORT',
    label: 'Customer Support',
    color: 'bg-teal-100 text-teal-900 border-teal-300',
    desc: 'Handle customer return tickets, replacement claims, and review moderations.',
  },
];

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<IAdminUserModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('ALL');

  // Add User Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [addFormData, setAddFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'SUPER_ADMIN',
  });

  // Edit Role Modal State
  const [selectedUser, setSelectedUser] = useState<IAdminUserModel | null>(null);
  const [editRoleInput, setEditRoleInput] = useState<string>('SUPER_ADMIN');

  // Delete User Confirmation Modal State
  const [deleteTargetUser, setDeleteTargetUser] = useState<IAdminUserModel | null>(null);

  // Status & Feedback State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await adminUserService.getAdminUsers();
      setUsers(data);
    } catch {
      showToast('error', 'Failed to load staff user list.');
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

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let pwd = '';
    for (let i = 0; i < 10; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setAddFormData((prev) => ({ ...prev, password: pwd }));
  };

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!addFormData.firstName.trim()) {
      setFormError('Please enter first name.');
      return;
    }
    if (!addFormData.email.trim() || !addFormData.email.includes('@')) {
      setFormError('Please enter a valid staff email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = await adminUserService.createAdminUser({
        firstName: addFormData.firstName,
        lastName: addFormData.lastName,
        email: addFormData.email,
        password: addFormData.password || 'AdminPass123!',
        role: addFormData.role,
      });

      setUsers((prev) => [newUser, ...prev.filter((u) => u.id !== newUser.id)]);
      showToast('success', `Admin staff account for ${newUser.fullName} created successfully!`);

      // Reset & Close Modal
      setIsAddModalOpen(false);
      setAddFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'SUPER_ADMIN',
      });
    } catch (err: any) {
      setFormError(err?.response?.data?.detail || 'Failed to create staff account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEditRoleModal = (user: IAdminUserModel) => {
    setSelectedUser(user);
    setEditRoleInput(user.role);
  };

  const handleEditRoleSubmit = async () => {
    if (!selectedUser) return;
    setIsSubmitting(true);
    try {
      const updated = await adminUserService.updateUserRole(selectedUser.id, editRoleInput);
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, role: updated.role } : u))
      );
      showToast('success', `Role for ${selectedUser.fullName} updated to ${updated.role}!`);
      setSelectedUser(null);
    } catch {
      showToast('error', 'Failed to update user role.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteUser = async () => {
    if (!deleteTargetUser) return;
    setIsSubmitting(true);
    try {
      await adminUserService.deleteUser(deleteTargetUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTargetUser.id));
      showToast('info', `Staff member ${deleteTargetUser.fullName} removed.`);
      setDeleteTargetUser(null);
    } catch {
      showToast('error', 'Failed to delete user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered staff list
  const filteredUsers = users.filter((u) => {
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'SUPER_ADMIN' && u.role === 'SUPER_ADMIN') ||
      (activeTab === 'CATALOG' && u.role === 'CATALOG_MANAGER') ||
      (activeTab === 'FINANCE' && u.role === 'FINANCE_AUDITOR') ||
      (activeTab === 'OTHERS' && !['SUPER_ADMIN', 'CATALOG_MANAGER', 'FINANCE_AUDITOR'].includes(u.role));

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q || u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  const getRoleConfig = (roleKey: string) => {
    return ADMIN_ROLES.find((r) => r.key === roleKey) || {
      key: roleKey,
      label: roleKey,
      color: 'bg-slate-100 text-slate-800 border-slate-300',
      desc: 'Standard administrative access.',
    };
  };

  // Metrics
  const totalCount = users.length;
  const superAdminCount = users.filter((u) => u.role === 'SUPER_ADMIN').length;
  const managerCount = users.filter((u) => ['CATALOG_MANAGER', 'VENDOR_MANAGER'].includes(u.role)).length;
  const financeCount = users.filter((u) => u.role === 'FINANCE_AUDITOR').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification Alert */}
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Admin Staff &amp; Internal Users</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage platform administrative staff accounts, assign granular roles &amp; control access permissions.
          </p>
        </div>
        <Button
          onClick={() => {
            setIsAddModalOpen(true);
            setFormError(null);
          }}
          leftIcon={<Plus className="w-4 h-4 text-[#DAA520]" />}
        >
          Add Admin User
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Admin Staff"
          value={totalCount.toString()}
          icon={Users}
          color="bg-amber-50 text-amber-700"
          change={`${users.length} registered`}
          subtitle="accounts"
        />
        <MetricCard
          title="Super Admins"
          value={superAdminCount.toString()}
          icon={Shield}
          color="bg-rose-50 text-rose-700"
          change="Full system root access"
        />
        <MetricCard
          title="Category & Vendor Managers"
          value={managerCount.toString()}
          icon={UserCheck}
          color="bg-amber-100 text-amber-800"
          change="Store operations"
        />
        <MetricCard
          title="Finance Auditors"
          value={financeCount.toString()}
          icon={ShieldCheck}
          color="bg-emerald-50 text-emerald-700"
          change="Ledger & payout access"
        />
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-amber-50/70 rounded-xl border border-amber-200/60 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ALL'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            All Staff ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('SUPER_ADMIN')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'SUPER_ADMIN'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Super Admins ({superAdminCount})
          </button>
          <button
            onClick={() => setActiveTab('CATALOG')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'CATALOG'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Catalog Managers
          </button>
          <button
            onClick={() => setActiveTab('FINANCE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'FINANCE'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Finance
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search staff name or email..."
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

      {/* Main Staff Table */}
      <div className="rounded-2xl bg-white border border-amber-200/80 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading admin staff directory...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
            <Users className="w-8 h-8 text-amber-300 stroke-1" />
            <p className="font-bold text-slate-700">No staff members found</p>
            <p className="text-[11px] text-slate-400">Click "Add Admin User" above to create an account.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-amber-50/80 text-slate-600 uppercase text-[10px] font-bold border-b border-amber-200/80 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Staff Member</th>
                  <th className="py-3.5 px-4">Email Address</th>
                  <th className="py-3.5 px-4">Assigned Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100/70">
                {filteredUsers.map((u) => {
                  const roleConfig = getRoleConfig(u.role);
                  return (
                    <tr key={u.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-4 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-serif font-black flex items-center justify-center border border-amber-300 text-sm shrink-0">
                            {u.firstName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="block font-extrabold text-slate-900">{u.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {u.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono font-medium text-slate-700 whitespace-nowrap">
                        {u.email}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border ${roleConfig.color}`}
                        >
                          <Shield className="w-3 h-3 shrink-0" />
                          {roleConfig.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {u.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditRoleModal(u)}
                            className="px-3 py-1.5 rounded-xl border border-amber-300 text-[#800020] bg-amber-50/50 hover:bg-amber-100 font-bold flex items-center gap-1.5 text-xs transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-amber-700" />
                            Edit Role
                          </button>
                          <button
                            onClick={() => setDeleteTargetUser(u)}
                            title="Remove staff member"
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD ADMIN USER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Add Internal Admin Staff</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddUserSubmit} className="py-4 space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Name inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth"
                    value={addFormData.firstName}
                    onChange={(e) => setAddFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rao"
                    value={addFormData.lastName}
                    onChange={(e) => setAddFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 font-semibold"
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Company Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@smartshop.com"
                    value={addFormData.email}
                    onChange={(e) => setAddFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 font-semibold"
                  />
                </div>
              </div>

              {/* Temporary Password & Generator */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-800">Temporary Password</label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="text-[11px] font-bold text-amber-800 hover:underline flex items-center gap-1"
                  >
                    <Key className="w-3 h-3 text-amber-600" /> Auto-Generate
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Leave blank for default AdminPass123!"
                    value={addFormData.password}
                    onChange={(e) => setAddFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-9 pr-4 py-3 rounded-xl font-mono bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              {/* Role Selector */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800">Select Permission Role *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border rounded-2xl border-slate-200">
                  {ADMIN_ROLES.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setAddFormData((prev) => ({ ...prev, role: r.key }))}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        addFormData.role === r.key
                          ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs">{r.label}</span>
                        {addFormData.role === r.key && <Check className="w-3.5 h-3.5 text-amber-300" />}
                      </div>
                      <span
                        className={`text-[10px] mt-1 line-clamp-2 ${
                          addFormData.role === r.key ? 'text-amber-200' : 'text-slate-500'
                        }`}
                      >
                        {r.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  isLoading={isSubmitting}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Create Admin Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ROLE MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Edit2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Edit Permission Role</h3>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-slate-600">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <p className="font-extrabold text-slate-900 text-sm">{selectedUser.fullName}</p>
                <p className="font-mono text-slate-500 text-[11px]">{selectedUser.email}</p>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-800">Assign New Role:</label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {ADMIN_ROLES.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setEditRoleInput(r.key)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start justify-between ${
                        editRoleInput === r.key
                          ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-sm'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                          <span className="font-extrabold text-xs">{r.label}</span>
                        </div>
                        <p
                          className={`text-[10px] leading-relaxed ${
                            editRoleInput === r.key ? 'text-amber-200' : 'text-slate-500'
                          }`}
                        >
                          {r.desc}
                        </p>
                      </div>
                      {editRoleInput === r.key && (
                        <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedUser(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="maroon"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleEditRoleSubmit}
                leftIcon={<Check className="w-4 h-4" />}
              >
                Save Role Change
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTargetUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800">
                  <Trash2 className="w-5 h-5 text-rose-700" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900">Remove Staff Member</h3>
              </div>
              <button
                onClick={() => setDeleteTargetUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <p className="font-extrabold text-slate-900 text-sm">{deleteTargetUser.fullName}</p>
                <p className="font-mono text-slate-500 text-[11px]">{deleteTargetUser.email}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/60 text-amber-900">
                  Role: {deleteTargetUser.role}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>
                  Are you sure you want to remove <strong>{deleteTargetUser.fullName}</strong>? This staff member will lose all access to the DivineAdmin Console.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteTargetUser(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="maroon"
                size="sm"
                isLoading={isSubmitting}
                onClick={confirmDeleteUser}
                leftIcon={<Trash2 className="w-4 h-4" />}
                className="bg-rose-800 hover:bg-rose-900 border-rose-900 text-white"
              >
                Remove Staff Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
