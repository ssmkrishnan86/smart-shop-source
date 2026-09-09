import { apiClient } from './apiClient';

export interface IVendorSubOrderModel {
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
  items: Array<{
    id: string;
    product_name?: string;
    productName?: string;
    product_image?: string;
    productImage?: string;
    price: number;
    quantity: number;
    subtotal?: number;
  }>;
}

export const MOCK_VENDOR_SUB_ORDERS: IVendorSubOrderModel[] = [
  {
    id: 'sub_ord_101',
    subOrderNumber: 'DK2026100012-V1',
    vendorName: 'Vedic Crafts Heritage',
    vendorStatus: 'NEW',
    fulfillmentStatus: 'UNFULFILLED',
    shipmentStatus: 'NOT_SHIPPED',
    subtotal: 1599,
    discount: 0,
    shippingFee: 0,
    tax: 287.82,
    total: 1886.82,
    commissionRate: 8.0,
    platformCommission: 127.92,
    vendorPayableAmount: 1471.08,
    settlementStatus: 'PENDING',
    items: [
      {
        id: 'item_1',
        productName: 'Brass Ganesha Idol',
        productImage: '/images/products/brass_ganesha_idol.jpg',
        price: 1599,
        quantity: 1,
        subtotal: 1599,
      },
    ],
  },
  {
    id: 'sub_ord_102',
    subOrderNumber: 'DK2026100014-V1',
    vendorName: 'Vedic Crafts Heritage',
    vendorStatus: 'PACKED',
    fulfillmentStatus: 'PACKED',
    shipmentStatus: 'NOT_SHIPPED',
    subtotal: 2299,
    discount: 0,
    shippingFee: 0,
    tax: 413.82,
    total: 2712.82,
    commissionRate: 8.0,
    platformCommission: 183.92,
    vendorPayableAmount: 2115.08,
    settlementStatus: 'PENDING',
    courierPartner: 'BlueDart Express',
    trackingNumber: 'BD-88992211',
    items: [
      {
        id: 'item_2',
        productName: 'Marble Lakshmi Idol',
        productImage: '/images/products/lakshmi_saraswati_ganesha.jpg',
        price: 2299,
        quantity: 1,
        subtotal: 2299,
      },
    ],
  },
];

export interface IReturnClaim {
  id: string;
  returnId: string;
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
  itemName: string;
  itemImage?: string;
  amount: number;
  reason: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  rejectionReason?: string;
}

export const MOCK_RETURNS: IReturnClaim[] = [
  {
    id: 'ret_101',
    returnId: 'RET-2026-9810',
    orderNumber: 'ORD-2026-9810',
    customerName: 'Ananya Verma',
    customerEmail: 'ananya.v@example.com',
    itemName: 'Brass Ganesha Idol',
    itemImage: '/images/products/brass_ganesha_idol.jpg',
    amount: 1599,
    reason: 'Slight color variance from catalog image',
    status: 'PENDING_REVIEW',
    createdAt: '2026-08-08T10:30:00Z',
  },
  {
    id: 'ret_102',
    returnId: 'RET-2026-9844',
    orderNumber: 'ORD-2026-9844',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh.k@example.com',
    itemName: 'Handcrafted Wooden Altar',
    itemImage: '/images/products/pooja_thali_set.jpg',
    amount: 3499,
    reason: 'Dimensions did not match expected altar specifications',
    status: 'PENDING_REVIEW',
    createdAt: '2026-08-07T14:15:00Z',
  },
  {
    id: 'ret_103',
    returnId: 'RET-2026-9790',
    orderNumber: 'ORD-2026-9790',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.s@example.com',
    itemName: 'Pure Silver Diya Pair',
    itemImage: '/images/products/brass_oil_lamp_diya.jpg',
    amount: 1299,
    reason: 'Damaged outer box packaging during courier transit',
    status: 'APPROVED',
    createdAt: '2026-08-05T09:20:00Z',
  },
];

export const vendorOrderService = {
  getSubOrders: async (): Promise<IVendorSubOrderModel[]> => {
    try {
      const res = await apiClient.get<any>('/orders/vendor/sub-orders');
      if (res.data && res.data.data) {
        return res.data.data;
      }
      return MOCK_VENDOR_SUB_ORDERS;
    } catch {
      return MOCK_VENDOR_SUB_ORDERS;
    }
  },

  updateSubOrderStatus: async (
    subOrderId: string,
    status: string,
    courierPartner?: string,
    trackingNumber?: string
  ): Promise<IVendorSubOrderModel> => {
    try {
      const res = await apiClient.post<any>(`/orders/vendor/sub-orders/${subOrderId}/status`, {
        status,
        courier_partner: courierPartner,
        tracking_number: trackingNumber,
      });
      return res.data.data;
    } catch {
      const item = MOCK_VENDOR_SUB_ORDERS.find((s) => s.id === subOrderId);
      if (item) {
        item.vendorStatus = status;
        if (courierPartner) item.courierPartner = courierPartner;
        if (trackingNumber) item.trackingNumber = trackingNumber;
        return item;
      }
      throw new Error('Sub-order not found');
    }
  },

  getReturns: async (): Promise<IReturnClaim[]> => {
    try {
      const res = await apiClient.get<any>('/orders/vendor/returns');
      if (res.data && res.data.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return res.data.data.map((r: any) => ({
          id: r.id,
          returnId: r.return_id || r.id,
          orderNumber: r.order_number,
          customerName: r.customer_name,
          customerEmail: r.customer_email,
          itemName: r.item_name,
          itemImage: r.item_image,
          amount: r.amount,
          reason: r.reason,
          status: r.status,
          createdAt: r.created_at || new Date().toISOString(),
          rejectionReason: r.rejection_reason,
        }));
      }
      return MOCK_RETURNS;
    } catch {
      return MOCK_RETURNS;
    }
  },

  processReturnAction: async (
    returnId: string,
    action: 'APPROVE' | 'REJECT',
    rejectionReason?: string
  ): Promise<{ id: string; status: 'APPROVED' | 'REJECTED'; rejectionReason?: string }> => {
    try {
      const res = await apiClient.post<any>(`/orders/vendor/returns/${returnId}/action`, {
        action,
        rejection_reason: rejectionReason,
      });
      return res.data.data;
    } catch {
      const item = MOCK_RETURNS.find((r) => r.id === returnId);
      if (item) {
        item.status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
        if (rejectionReason) item.rejectionReason = rejectionReason;
      }
      return {
        id: returnId,
        status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
        rejectionReason,
      };
    }
  },
};

