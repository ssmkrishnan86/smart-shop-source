import { apiClient } from './apiClient';
import { IVendorStore } from '../interfaces';

interface BackendVendor {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  banner?: string;
  description?: string;
  category?: string;
  status: string;
  rating: number;
  gst_number?: string;
  pan_number?: string;
  phone?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

function mapVendor(v: BackendVendor): IVendorStore {
  return {
    id: v.id,
    name: v.name,
    slug: v.slug,
    logo: v.logo || '',
    banner: v.banner || '',
    description: v.description || '',
    category: v.category || '',
    status: v.status as any,
    rating: v.rating,
    totalReviews: 0,
    gstNumber: v.gst_number || '',
    panNumber: v.pan_number || '',
    phone: v.phone || '',
    email: v.email || '',
    address: {
      street: v.street || '',
      city: v.city || '',
      state: v.state || '',
      zipCode: v.zip_code || '',
      country: 'India',
    },
    // Bank account fields aren't part of the vendors schema yet — left blank
    // rather than fabricated. A real payouts/banking module would add these.
    bankAccount: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      accountHolder: '',
    },
  };
}

export const vendorService = {
  getMyStore: async (): Promise<IVendorStore | null> => {
    try {
      const res = await apiClient.get<{ data: BackendVendor }>('/vendors/me');
      return mapVendor(res.data.data);
    } catch {
      return null;
    }
  },
};
