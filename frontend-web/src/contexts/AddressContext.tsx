import React, { createContext, useContext, useState, useEffect } from 'react';
import { IAddress } from '../interfaces';
import { addressService } from '../services/addressService';

interface AddressContextType {
  activeAddress: IAddress | null;
  savedAddresses: IAddress[];
  isDrawerOpen: boolean;
  openAddressDrawer: () => void;
  closeAddressDrawer: () => void;
  selectAddress: (addr: IAddress) => void;
  addNewAddress: (addr: IAddress) => void;
  useCurrentLocation: () => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedAddresses, setSavedAddresses] = useState<IAddress[]>([]);
  const [activeAddress, setActiveAddress] = useState<IAddress | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    addressService
      .getAddresses()
      .then((addrs) => {
        if (addrs && addrs.length > 0) {
          setSavedAddresses(addrs);
          const def = addrs.find((a) => a.isDefault) || addrs[0];
          setActiveAddress(def);
        }
      })
      .catch(() => undefined);
  }, []);

  const openAddressDrawer = () => setIsDrawerOpen(true);
  const closeAddressDrawer = () => setIsDrawerOpen(false);

  const selectAddress = (addr: IAddress) => {
    setActiveAddress(addr);
    setIsDrawerOpen(false);
  };

  const addNewAddress = (newAddr: IAddress) => {
    setSavedAddresses((prev) => [newAddr, ...prev]);
    setActiveAddress(newAddr);
  };

  const useCurrentLocation = () => {
    const locAddr: IAddress = {
      id: `gps_${Date.now()}`,
      fullName: 'Current Location',
      phone: '',
      street: 'Temple Car Street, Near Ekambareswarar Temple',
      city: 'Kanchipuram',
      state: 'Tamil Nadu',
      zipCode: '631501',
      country: 'India',
      isDefault: false,
    };
    setActiveAddress(locAddr);
    setIsDrawerOpen(false);
  };

  return (
    <AddressContext.Provider
      value={{
        activeAddress,
        savedAddresses,
        isDrawerOpen,
        openAddressDrawer,
        closeAddressDrawer,
        selectAddress,
        addNewAddress,
        useCurrentLocation,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useDeliveryAddress = (): AddressContextType => {
  const ctx = useContext(AddressContext);
  if (!ctx) {
    throw new Error('useDeliveryAddress must be used within an AddressProvider');
  }
  return ctx;
};
