import { OrderStatus, VendorStatus, PaymentMethod, UserRole, Currency, PayoutStatus, CouponStatus } from '../enums';

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface IVendorUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  storeId: string;
  storeName: string;
  avatar?: string;
}

export interface IVendorStore {
  id: string;
  name: string;
  slug: string;
  logo: string;
  banner: string;
  description: string;
  category: string;
  status: VendorStatus;
  rating: number;
  totalReviews: number;
  gstNumber: string;
  panNumber: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  bankAccount: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    accountHolder: string;
  };
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  category: string;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  status: 'ACTIVE' | 'DRAFT' | 'OUT_OF_STOCK';
  thumbnail: string;
  images: string[];
  features: string[];
  createdAt: string;
}

export interface IOrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: IOrderItem[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  total: number;
  trackingNumber?: string;
  courierPartner?: string;
  createdAt: string;
}

export interface IPayout {
  id: string;
  payoutNumber: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: PayoutStatus;
  bankName: string;
  accountEnding: string;
  requestedAt: string;
  processedAt?: string;
}

export interface ICoupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minPurchase: number;
  usageLimit: number;
  usageCount: number;
  status: CouponStatus;
  startDate: string;
  endDate: string;
}

export interface IReview {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  sellerReply?: string;
  createdAt: string;
}

export interface IShippingPartner {
  id: string;
  name: string;
  logo: string;
  type: 'EXPRESS' | 'STANDARD';
  flatRate: number;
  active: boolean;
}
