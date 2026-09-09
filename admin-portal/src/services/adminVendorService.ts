import { IVendor, IApiResponse } from '../interfaces';
import { VendorStatus } from '../enums';

export const MOCK_ADMIN_VENDORS: IVendor[] = [
  {
    id: 'ven_1',
    name: 'Vedic Crafts Heritage',
    slug: 'vedic-crafts-heritage',
    email: 'contact@vediccrafts.com',
    phone: '+91 9876543210',
    category: 'Idols & Puja Samagri',
    status: VendorStatus.ACTIVE,
    commissionRate: 8,
    gstNumber: '33AAAAA0000A1Z5',
    rating: 4.9,
    appliedDate: '2026-07-15',
  },
  {
    id: 'ven_101',
    name: 'TechZone Direct',
    slug: 'techzone-direct',
    email: 'contact@techzone.com',
    phone: '+91 9811223344',
    category: 'Electronics',
    status: VendorStatus.PENDING_VERIFICATION,
    commissionRate: 10,
    gstNumber: '27ABCDE1234F1Z9',
    rating: 0,
    appliedDate: '2026-08-07',
  },
  {
    id: 'ven_102',
    name: 'Luxe Apparel Hub',
    slug: 'luxe-apparel-hub',
    email: 'sales@luxeapparel.com',
    phone: '+91 9822334455',
    category: 'Fashion',
    status: VendorStatus.PENDING_VERIFICATION,
    commissionRate: 12,
    gstNumber: '07FGHIJ5678K1Z2',
    rating: 0,
    appliedDate: '2026-08-06',
  },
];

export const adminVendorService = {
  getVendors: async (): Promise<IApiResponse<IVendor[]>> => {
    return {
      success: true,
      message: 'Vendors loaded',
      data: MOCK_ADMIN_VENDORS,
    };
  },

  updateVendorStatus: async (vendorId: string, status: VendorStatus): Promise<IApiResponse<IVendor>> => {
    const vendor = MOCK_ADMIN_VENDORS.find((v) => v.id === vendorId);
    if (vendor) {
      vendor.status = status;
      return { success: true, message: 'Vendor status updated', data: vendor };
    }
    throw new Error('Vendor not found');
  },
};
