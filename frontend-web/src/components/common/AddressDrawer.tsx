import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useDeliveryAddress } from '../../contexts/AddressContext';
import { IAddress } from '../../interfaces';
import { MapPin, Search, Navigation, Plus, CheckCircle2, Home, Building2, MoreVertical, X } from 'lucide-react';

export const AddressDrawer: React.FC = () => {
  const {
    activeAddress,
    savedAddresses,
    isDrawerOpen,
    closeAddressDrawer,
    selectAddress,
    addNewAddress,
    useCurrentLocation,
  } = useDeliveryAddress();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newForm, setNewForm] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: 'Kanchipuram',
    state: 'Tamil Nadu',
    zipCode: '',
    label: 'Home',
  });

  const filteredAddresses = savedAddresses.filter(
    (addr) =>
      addr.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.zipCode.includes(searchQuery) ||
      addr.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.fullName || !newForm.street || !newForm.zipCode) return;
    const newAddr: IAddress = {
      id: `addr_${Date.now()}`,
      fullName: newForm.fullName,
      phone: newForm.phone || '+91 98765 43210',
      street: newForm.street,
      city: newForm.city,
      state: newForm.state,
      zipCode: newForm.zipCode,
      country: 'India',
      isDefault: false,
    };
    addNewAddress(newAddr);
    setIsAddingNew(false);
    setNewForm({ fullName: '', phone: '', street: '', city: 'Kanchipuram', state: 'Tamil Nadu', zipCode: '', label: 'Home' });
  };

  return (
    <Drawer isOpen={isDrawerOpen} onClose={closeAddressDrawer} title="Select delivery address">
      <div className="flex flex-col h-full space-y-4 bg-[#F8F5F0]">
        {/* Search Bar matching screenshot */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#6E584B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by area, street name, pin code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-sans rounded-xl border border-[#EAE1D0] bg-white text-[#2C1E16] placeholder:text-[#6E584B] focus:outline-none focus:ring-1 focus:ring-[#C59B34] shadow-2xs"
          />
        </div>

        {/* Use My Current Location Action Button matching screenshot */}
        <button
          onClick={useCurrentLocation}
          className="flex items-center gap-3 w-full p-3 rounded-xl border border-[#EAE1D0] bg-white text-[#7A1F1E] hover:bg-[#FAF2E4] transition-colors text-xs font-serif font-bold tracking-wider"
        >
          <div className="p-1.5 rounded-full bg-[#FAF2E4] text-[#C59B34]">
            <Navigation className="w-4 h-4 text-[#C59B34]" />
          </div>
          <span>Use my current location</span>
        </button>

        {/* Saved Addresses Section Header matching screenshot */}
        <div className="flex items-center justify-between pt-2">
          <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#2C1E16]">
            Saved addresses
          </h4>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="text-xs font-serif font-bold text-[#7A1F1E] hover:text-[#C59B34] flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#C59B34]" /> {isAddingNew ? 'Cancel' : '+ Add New'}
          </button>
        </div>

        {/* Add New Address Form Modal/Collapsible */}
        {isAddingNew && (
          <form onSubmit={handleAddSubmit} className="p-4 rounded-xl border border-[#EAE1D0] bg-white shadow-xs space-y-3">
            <h5 className="font-serif text-xs font-bold text-[#2C1E16] uppercase">New Address Details</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Input label="Full Name" value={newForm.fullName} onChange={(e) => setNewForm({ ...newForm, fullName: e.target.value })} required />
              <Input label="Phone" value={newForm.phone} onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })} />
              <div className="sm:col-span-2">
                <Input label="Street Address" value={newForm.street} onChange={(e) => setNewForm({ ...newForm, street: e.target.value })} required />
              </div>
              <Input label="City" value={newForm.city} onChange={(e) => setNewForm({ ...newForm, city: e.target.value })} />
              <Input label="Pincode" value={newForm.zipCode} onChange={(e) => setNewForm({ ...newForm, zipCode: e.target.value })} required />
            </div>
            <Button type="submit" variant="gold" size="sm" className="w-full mt-1">
              SAVE &amp; SELECT ADDRESS
            </Button>
          </form>
        )}

        {/* Saved Addresses List matching reference screenshot */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredAddresses.map((addr) => {
            const isSelected = activeAddress.id === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => selectAddress(addr)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-[#C59B34] bg-white shadow-md ring-1 ring-[#C59B34]'
                    : 'border-[#EAE1D0] bg-white hover:border-[#C59B34] hover:bg-[#FAF6EE] shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-[#FAF2E4] text-[#C59B34]">
                      {addr.zipCode === '631502' ? <Home className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                    </div>
                    <h5 className="font-serif text-xs font-bold text-[#2C1E16]">{addr.fullName}</h5>
                    {isSelected && (
                      <span className="px-2 py-0.5 text-[10px] font-serif font-extrabold rounded-md maroon-gradient-btn text-white tracking-wide shadow-2xs">
                        Selected
                      </span>
                    )}
                  </div>
                  <MoreVertical className="w-4 h-4 text-[#6E584B]" />
                </div>

                <p className="text-xs font-sans text-[#6E584B] mt-2 line-clamp-2 leading-relaxed">
                  {addr.street}, {addr.city}, {addr.state} {addr.zipCode}
                </p>

                {addr.phone && (
                  <p className="text-[11px] font-sans text-[#6E584B] mt-1">
                    Phone: <span className="font-semibold text-[#2C1E16]">{addr.phone}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Drawer>
  );
};
