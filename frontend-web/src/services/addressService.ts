import { apiClient } from './apiClient';
import { IAddress } from '../interfaces';

interface BackendAddress {
  id: string;
  label: string;
  full_name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
}

function mapAddress(a: BackendAddress): IAddress {
  return {
    id: a.id,
    label: a.label || 'Home',
    fullName: a.full_name,
    street: a.street,
    city: a.city,
    state: a.state,
    zipCode: a.zip_code,
    country: a.country || 'India',
    phone: a.phone,
    isDefault: a.is_default,
  };
}

export interface IAddressInput {
  label?: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  isDefault?: boolean;
}

export const addressService = {
  getAddresses: async (): Promise<IAddress[]> => {
    const res = await apiClient.get<any>('/addresses/');
    const rawData = res.data?.data ?? res.data;
    const list = Array.isArray(rawData) ? rawData : [];
    return list.map(mapAddress);
  },

  addAddress: async (input: IAddressInput): Promise<IAddress> => {
    const res = await apiClient.post<any>('/addresses/', {
      label: input.label || 'Home',
      full_name: input.fullName,
      phone: input.phone,
      street: input.street,
      city: input.city,
      state: input.state,
      zip_code: input.zipCode,
      country: input.country || 'India',
      is_default: input.isDefault ?? false,
    });
    const item = res.data?.data ?? res.data;
    return mapAddress(item);
  },

  updateAddress: async (id: string, input: Partial<IAddressInput>): Promise<IAddress> => {
    const res = await apiClient.put<any>(`/addresses/${id}`, {
      label: input.label,
      full_name: input.fullName,
      phone: input.phone,
      street: input.street,
      city: input.city,
      state: input.state,
      zip_code: input.zipCode,
      country: input.country,
      is_default: input.isDefault,
    });
    const item = res.data?.data ?? res.data;
    return mapAddress(item);
  },

  deleteAddress: async (id: string): Promise<void> => {
    await apiClient.delete(`/addresses/${id}`);
  },

  setDefaultAddress: async (id: string): Promise<IAddress> => {
    const res = await apiClient.post<any>(`/addresses/${id}/default`);
    const item = res.data?.data ?? res.data;
    return mapAddress(item);
  },
};
