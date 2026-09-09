import React, { useEffect, useState } from 'react';
import { SEO } from '../../../components/common/SEO';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useToast } from '../../../hooks/useToast';
import { addressService, IAddressInput } from '../../../services/addressService';
import { IAddress } from '../../../interfaces';
import { MapPin, Plus, Trash2, Pencil, Star, X } from 'lucide-react';

const EMPTY_FORM: IAddressInput = {
  label: 'Home',
  fullName: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'India',
  isDefault: false,
};

export const AddressesPage: React.FC = () => {
  const { showToast } = useToast();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<IAddressInput>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      setAddresses(await addressService.getAddresses());
    } catch {
      showToast('Failed to load addresses', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIsFormOpen(true);
  };

  const openEditForm = (addr: IAddress) => {
    setEditingId(addr.id);
    setForm({
      label: 'Home',
      fullName: addr.fullName,
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
      country: addr.country,
      isDefault: addr.isDefault,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await addressService.updateAddress(editingId, form);
        showToast('Address updated', 'success');
      } else {
        await addressService.addAddress(form);
        showToast('Address added', 'success');
      }
      setIsFormOpen(false);
      await loadAddresses();
    } catch (err: any) {
      showToast(err?.response?.data?.detail || 'Failed to save address', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await addressService.deleteAddress(id);
      showToast('Address deleted', 'success');
      await loadAddresses();
    } catch {
      showToast('Failed to delete address', 'error');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await addressService.setDefaultAddress(id);
      await loadAddresses();
    } catch {
      showToast('Failed to update default address', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <SEO title="Saved Addresses" />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Saved Addresses ({addresses.length})</h2>
        <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddForm}>Add New Address</Button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm">{editingId ? 'Edit Address' : 'Add New Address'}</h3>
            <button type="button" onClick={() => setIsFormOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            <div className="sm:col-span-2">
              <Input label="Street Address" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} required />
            </div>
            <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            <Input label="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
            <Input label="Pincode" value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} required />
            <Input label="Label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Home / Work" />
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
            Set as default address
          </label>
          <Button type="submit" size="sm" isLoading={isSaving}>{editingId ? 'Update Address' : 'Save Address'}</Button>
        </form>
      )}

      {isLoading ? (
        <p className="text-xs text-muted-foreground">Loading addresses...</p>
      ) : addresses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl">
          <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-semibold">No saved addresses yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-2 relative">
              {addr.isDefault && (
                <span className="absolute top-4 right-4 text-[10px] font-extrabold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                  DEFAULT
                </span>
              )}
              <h4 className="font-bold text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> {addr.fullName}
              </h4>
              <p className="text-xs text-muted-foreground">{addr.street}</p>
              <p className="text-xs text-muted-foreground">{addr.city}, {addr.state} {addr.zipCode}</p>
              <p className="text-xs text-muted-foreground">{addr.phone}</p>
              <div className="flex items-center gap-3 pt-2 text-xs font-bold">
                <button onClick={() => openEditForm(addr)} className="inline-flex items-center gap-1 text-primary hover:underline">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr.id)} className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary">
                    <Star className="w-3.5 h-3.5" /> Set Default
                  </button>
                )}
                <button onClick={() => handleDelete(addr.id)} className="inline-flex items-center gap-1 text-rose-600 hover:underline">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
