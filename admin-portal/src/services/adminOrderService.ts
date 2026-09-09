import { apiClient } from './apiClient';

export interface IAdminOrderModel {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  orderStatus: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  shipmentStatus: string;
  returnStatus?: string;
  refundStatus?: string;
  total: number;
  subtotal: number;
  shippingFee?: number;
  createdAt: string;
  subOrders: Array<{
    id: string;
    subOrderNumber: string;
    vendorName: string;
    vendorStatus: string;
    subtotal?: number;
    total: number;
    commissionRate: number;
    platformCommission: number;
    vendorPayableAmount: number;
    settlementStatus: string;
    courierPartner?: string;
    trackingNumber?: string;
    items: Array<{
      id: string;
      productName: string;
      price: number;
      quantity: number;
    }>;
  }>;
}

export const MOCK_ADMIN_ORDERS: IAdminOrderModel[] = [
  {
    id: 'ord_adm_101',
    orderNumber: 'DK2026100012',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@example.com',
    customerPhone: '+91 9876543210',
    orderStatus: 'CONFIRMED',
    paymentStatus: 'PAID',
    fulfillmentStatus: 'UNFULFILLED',
    shipmentStatus: 'NOT_SHIPPED',
    returnStatus: 'NONE',
    refundStatus: 'NONE',
    subtotal: 1948,
    total: 2235.82,
    createdAt: '2026-08-08T10:15:00Z',
    subOrders: [
      {
        id: 'sub_1',
        subOrderNumber: 'DK2026100012-V1',
        vendorName: 'Vedic Crafts Heritage',
        vendorStatus: 'NEW',
        subtotal: 1599,
        total: 1886.82,
        commissionRate: 8.0,
        platformCommission: 127.92,
        vendorPayableAmount: 1471.08,
        settlementStatus: 'PENDING',
        items: [{ id: 'i1', productName: 'Brass Ganesha Idol', price: 1599, quantity: 1 }],
      },
      {
        id: 'sub_2',
        subOrderNumber: 'DK2026100012-V2',
        vendorName: 'Sacred Organics & Incense',
        vendorStatus: 'NEW',
        subtotal: 349,
        total: 349,
        commissionRate: 10.0,
        platformCommission: 34.9,
        vendorPayableAmount: 314.1,
        settlementStatus: 'PENDING',
        items: [{ id: 'i2', productName: 'Organic Dhoop & Incense Sticks Box', price: 349, quantity: 1 }],
      },
    ],
  },
];

export const adminOrderService = {
  getAllOrders: async (): Promise<IAdminOrderModel[]> => {
    try {
      const res = await apiClient.get<any>('/orders/admin/all');
      if (res.data && res.data.data && res.data.data.orders) {
        return res.data.data.orders.map((raw: any) => ({
          ...raw,
          orderNumber: raw.orderNumber || raw.order_number,
          customerName: raw.customerName || raw.customer_name,
          orderStatus: raw.orderStatus || raw.order_status,
          paymentStatus: raw.paymentStatus || raw.payment_status,
          fulfillmentStatus: raw.fulfillmentStatus || raw.fulfillment_status,
          shipmentStatus: raw.shipmentStatus || raw.shipment_status,
          createdAt: raw.createdAt || raw.created_at,
          subOrders: (raw.sub_orders || raw.subOrders || []).map((s: any) => ({
            ...s,
            subOrderNumber: s.subOrderNumber || s.sub_order_number,
            vendorName: s.vendorName || s.vendor_name,
            vendorStatus: s.vendorStatus || s.vendor_status,
            commissionRate: s.commissionRate || s.commission_rate || 8.0,
            platformCommission: s.platformCommission || s.platform_commission || 0,
            vendorPayableAmount: s.vendorPayableAmount || s.vendor_payable_amount || 0,
            settlementStatus: s.settlementStatus || s.settlement_status || 'PENDING',
            items: (s.items || []).map((i: any) => ({
              ...i,
              productName: i.productName || i.product_name,
            })),
          })),
        }));
      }
      return MOCK_ADMIN_ORDERS;
    } catch {
      return MOCK_ADMIN_ORDERS;
    }
  },
};
