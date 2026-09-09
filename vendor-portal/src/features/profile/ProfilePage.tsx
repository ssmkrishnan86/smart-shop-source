import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { updateStoreProfile } from '../../store';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Store, Save, ShieldCheck } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { store } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(store?.name || '');
  const [description, setDescription] = useState(store?.description || '');
  const [phone, setPhone] = useState(store?.phone || '');
  const [email, setEmail] = useState(store?.email || '');
  const [gst, setGst] = useState(store?.gstNumber || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateStoreProfile({ name, description, phone, email, gstNumber: gst }));
    alert('Store profile saved successfully');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Vendor Store Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage store branding, business registration documents & contact information.</p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-6">
        {/* Banner & Logo preview */}
        <div className="relative h-40 rounded-2xl overflow-hidden border border-amber-200">
          <img src={store?.banner} alt="Store Banner" className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3 flex items-center gap-3">
            <img src={store?.logo} alt="Logo" className="w-16 h-16 rounded-xl object-cover border-2 border-[#DAA520] shadow-md" />
            <div className="text-white drop-shadow">
              <h3 className="font-black text-base">{store?.name}</h3>
              <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded-full font-bold">Verified Merchant</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input label="Store Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Store Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs font-medium p-3 rounded-xl border border-amber-200 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Store Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Support Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="GSTIN Tax Number" value={gst} onChange={(e) => setGst(e.target.value)} />
            <Input label="PAN Card Number" value={store?.panNumber || ''} readOnly />
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" leftIcon={<Save className="w-4 h-4 text-[#DAA520]" />}>
              Save Store Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
