import { OrderStatus, VendorStatus, PaymentMethod, UserRole, Currency, PayoutStatus, AuditAction, MicroserviceStatus } from '../enums';

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

export interface IAdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
}

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: 'ACTIVE' | 'BANNED';
  joinedDate: string;
}

export interface IVendor {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  category: string;
  status: VendorStatus;
  commissionRate: number; // e.g. 8%
  gstNumber: string;
  rating: number;
  appliedDate: string;
}

export interface IProduct {
  id: string;
  name: string;
  vendorName: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: 'ACTIVE' | 'FLAGGED' | 'DELISTED';
  thumbnail: string;
  createdAt: string;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  vendorName: string;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface IPayout {
  id: string;
  payoutNumber: string;
  vendorName: string;
  amount: number;
  fee: number;
  status: PayoutStatus;
  requestedAt: string;
}

export interface IAuditLog {
  id: string;
  adminName: string;
  action: AuditAction;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface ISystemHealth {
  service: string;
  status: MicroserviceStatus;
  latencyMs: number;
  uptime: string;
}
