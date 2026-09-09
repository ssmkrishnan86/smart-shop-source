import { OrderStatus, PaymentMethod, PaymentStatus, UserRole, Currency } from '../enums';

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore?: boolean;
  };
}

export interface IVendor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  totalProducts: number;
  verified: boolean;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  itemCount?: number;
  parentId?: string;
  children?: ICategory[];
}

export interface IProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
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
  rating: number;
  reviewCount: number;
  stock: number;
  category: string;
  brand: string;
  images: string[];
  thumbnail: string;
  tags: string[];
  features: string[];
  vendor: IVendor;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface ICartItem {
  id: string;
  productId: string;
  product: IProduct;
  quantity: number;
  selectedAttributes?: Record<string, string>;
  price: number;
}

export interface IAddress {
  id: string;
  label?: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  addresses: IAddress[];
  createdAt: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}

export interface IWishlistItem {
  id: string;
  productId: string;
  addedAt?: string;
  productName?: string;
  productThumbnail?: string;
  productPrice?: number;
  productOriginalPrice?: number;
  productCategory?: string;
  productStock?: number;
}

export interface ISession {
  id: string;
  userAgent?: string;
  ipAddress?: string;
  createdAt?: string;
  expiresAt?: string;
  isCurrent: boolean;
}

export interface IOrderTimelineLog {
  id: string;
  sub_order_id?: string;
  subOrderId?: string;
  actor_type?: string;
  actorType?: string;
  actor_name?: string;
  actorName?: string;
  event_name?: string;
  eventName?: string;
  description?: string;
  created_at?: string;
  createdAt?: string;
}

export interface IOrderItem {
  id: string;
  orderId?: string;
  subOrderId?: string;
  vendorId?: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal?: number;
}

export interface IVendorSubOrder {
  id: string;
  parent_order_id?: string;
  parentOrderId?: string;
  sub_order_number?: string;
  subOrderNumber?: string;
  vendor_id?: string;
  vendorId?: string;
  vendor_name?: string;
  vendorName?: string;
  vendor_status?: string;
  vendorStatus?: string;
  fulfillment_status?: string;
  fulfillmentStatus?: string;
  shipment_status?: string;
  shipmentStatus?: string;
  subtotal: number;
  discount: number;
  shipping_fee?: number;
  shippingFee?: number;
  tax: number;
  total: number;
  courier_partner?: string;
  courierPartner?: string;
  tracking_number?: string;
  trackingNumber?: string;
  shipped_date?: string;
  shippedDate?: string;
  estimated_delivery_date?: string;
  estimatedDeliveryDate?: string;
  delivered_at?: string;
  deliveredAt?: string;
  commission_rate?: number;
  commissionRate?: number;
  platform_commission?: number;
  platformCommission?: number;
  vendor_payable_amount?: number;
  vendorPayableAmount?: number;
  settlement_status?: string;
  settlementStatus?: string;
  items: IOrderItem[];
}

export interface IOrder {
  id: string;
  order_number?: string;
  orderNumber: string;
  userId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: IOrderItem[];
  sub_orders?: IVendorSubOrder[];
  subOrders?: IVendorSubOrder[];
  timeline_logs?: IOrderTimelineLog[];
  timelineLogs?: IOrderTimelineLog[];
  shippingAddress: IAddress;
  paymentMethod: PaymentMethod | string;
  paymentStatus: PaymentStatus | string;
  orderStatus: OrderStatus | string;
  fulfillmentStatus?: string;
  shipmentStatus?: string;
  returnStatus?: string;
  refundStatus?: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  createdAt: string;
  created_at?: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  courierPartner?: string;
}

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system' | 'wishlist';
  read: boolean;
  createdAt: string;
  link?: string;
}

