import { apiClient } from './apiClient';
import { adjustMockStock } from './productService';
import { IOrder, IOrderItem, IVendorSubOrder, IOrderTimelineLog } from '../interfaces';


function mapOrderItem(i: any): IOrderItem {
  return {
    id: i.id,
    orderId: i.order_id || i.orderId,
    subOrderId: i.sub_order_id || i.subOrderId,
    vendorId: i.vendor_id || i.vendorId,
    productId: i.product_id || i.productId || '',
    productName: i.product_name || i.productName || 'Product',
    productImage: i.product_image || i.productImage || '/images/products/brass_ganesha_idol.jpg',
    price: floatNum(i.price),
    quantity: i.quantity || 1,
    subtotal: floatNum(i.subtotal),
  };
}

function floatNum(val: any): number {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') return parseFloat(val) || 0;
  return 0;
}

function mapOrder(o: any): IOrder {
  const items = (o.items || []).map(mapOrderItem);
  const subOrders: IVendorSubOrder[] = (o.sub_orders || o.subOrders || []).map((s: any) => ({
    id: s.id,
    parentOrderId: s.parent_order_id || s.parentOrderId || o.id,
    subOrderNumber: s.sub_order_number || s.subOrderNumber || s.id,
    vendorId: s.vendor_id || s.vendorId,
    vendorName: s.vendor_name || s.vendorName || 'Vendor Store',
    vendorStatus: s.vendor_status || s.vendorStatus || 'NEW',
    fulfillmentStatus: s.fulfillment_status || s.fulfillmentStatus || 'UNFULFILLED',
    shipmentStatus: s.shipment_status || s.shipmentStatus || 'NOT_SHIPPED',
    subtotal: floatNum(s.subtotal),
    discount: floatNum(s.discount),
    shippingFee: floatNum(s.shipping_fee || s.shippingFee),
    tax: floatNum(s.tax),
    total: floatNum(s.total),
    courierPartner: s.courier_partner || s.courierPartner,
    trackingNumber: s.tracking_number || s.trackingNumber,
    shippedDate: s.shipped_date || s.shippedDate,
    estimatedDeliveryDate: s.estimated_delivery_date || s.estimatedDeliveryDate,
    deliveredAt: s.delivered_at || s.deliveredAt,
    commissionRate: floatNum(s.commission_rate || s.commissionRate),
    platformCommission: floatNum(s.platform_commission || s.platformCommission),
    vendorPayableAmount: floatNum(s.vendor_payable_amount || s.vendorPayableAmount),
    settlementStatus: s.settlement_status || s.settlementStatus,
    items: (s.items || []).map(mapOrderItem),
  }));

  const timelineLogs: IOrderTimelineLog[] = (o.timeline_logs || o.timelineLogs || []).map((t: any) => ({
    id: t.id,
    subOrderId: t.sub_order_id || t.subOrderId,
    actorType: t.actor_type || t.actorType || 'SYSTEM',
    actorName: t.actor_name || t.actorName || 'System',
    eventName: t.event_name || t.eventName || 'Event',
    description: t.description || '',
    createdAt: t.created_at || t.createdAt || new Date().toISOString(),
  }));

  const addr = o.shipping_address || {};

  return {
    id: o.id,
    orderNumber: o.order_number || o.orderNumber || 'DK-ORDER',
    userId: o.user_id || o.userId || '',
    customerName: o.customer_name || o.customerName || 'Customer',
    customerEmail: o.customer_email || o.customerEmail,
    customerPhone: o.customer_phone || o.customerPhone,
    items,
    subOrders,
    timelineLogs,
    shippingAddress: {
      id: '',
      fullName: o.customer_name || addr.fullName || 'Customer',
      street: addr.street || o.street || '',
      city: addr.city || o.city || '',
      state: addr.state || o.state || '',
      zipCode: addr.zip_code || addr.zipCode || o.zip_code || '',
      country: 'India',
      phone: o.customer_phone || addr.phone || '',
      isDefault: false,
    },
    paymentMethod: o.payment_method || o.paymentMethod || 'UPI',
    paymentStatus: o.payment_status || o.paymentStatus || 'PAID',
    orderStatus: o.order_status || o.status || 'CONFIRMED',
    fulfillmentStatus: o.fulfillment_status || o.fulfillmentStatus || 'UNFULFILLED',
    shipmentStatus: o.shipment_status || o.shipmentStatus || 'NOT_SHIPPED',
    returnStatus: o.return_status || o.returnStatus || 'NONE',
    refundStatus: o.refund_status || o.refundStatus || 'NONE',
    subtotal: floatNum(o.subtotal),
    discount: floatNum(o.discount),
    shippingFee: floatNum(o.shipping_fee || o.shippingFee),
    tax: floatNum(o.tax),
    total: floatNum(o.total),
    createdAt: o.created_at || o.createdAt || new Date().toISOString(),
    estimatedDelivery: o.created_at || new Date().toISOString(),
    trackingNumber: o.tracking_number || o.trackingNumber,
    courierPartner: o.courier_partner || o.courierPartner,
  };
}

function getStoredLocalOrders(): IOrder[] {
  try {
    const raw = localStorage.getItem('divinekart_local_orders');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredLocalOrder(order: IOrder): void {
  try {
    const existing = getStoredLocalOrders();
    const updated = [order, ...existing.filter((o) => o.id !== order.id && o.orderNumber !== order.orderNumber)];
    localStorage.setItem('divinekart_local_orders', JSON.stringify(updated));
  } catch {
    // Ignore storage quota
  }
}

export const orderService = {
  getUserOrders: async (params?: { page?: number; limit?: number; status?: string }): Promise<{ data: IOrder[] }> => {
    let apiOrders: IOrder[] = [];
    try {
      const query = new URLSearchParams();
      if (params?.page) query.set('page', String(params.page));
      if (params?.limit) query.set('limit', String(params.limit));
      if (params?.status) query.set('status', params.status);
      const res = await apiClient.get<any>(`/orders/?${query.toString()}`);
      const rawData = res.data?.data;
      const rawList = Array.isArray(rawData) ? rawData : (rawData?.orders || rawData?.items || []);
      apiOrders = rawList.map(mapOrder);
    } catch {
      // API call error fallback
    }

    const localOrders = getStoredLocalOrders();
    // Merge API orders with local orders (API orders take priority, missing local orders appended)
    const apiOrderIds = new Set(apiOrders.map((o) => o.id));
    const merged = [...apiOrders];
    for (const loc of localOrders) {
      if (!apiOrderIds.has(loc.id)) {
        merged.push(loc);
      }
    }

    return { data: merged };
  },

  getOrderById: async (id: string): Promise<{ data: IOrder }> => {
    try {
      const res = await apiClient.get<any>(`/orders/${id}`);
      const raw = res.data?.data || res.data;
      const mapped = mapOrder(raw);
      saveStoredLocalOrder(mapped);
      return { data: mapped };
    } catch (err) {
      const localOrders = getStoredLocalOrders();
      const found = localOrders.find((o) => o.id === id || o.orderNumber === id);
      if (found) {
        return { data: found };
      }
      throw err;
    }
  },

  createOrder: async (payload: {
    addressId?: string;
    fullName?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    paymentMethod?: string;
  }): Promise<{ data: IOrder }> => {
    const res = await apiClient.post<any>('/orders/', {
      address_id: payload.addressId,
      full_name: payload.fullName,
      phone: payload.phone,
      street: payload.street,
      city: payload.city,
      state: payload.state,
      zip_code: payload.zipCode,
      payment_method: payload.paymentMethod || 'UPI',
    });
    const raw = res.data?.data || res.data;
    const mapped = mapOrder(raw);
    saveStoredLocalOrder(mapped);

    (mapped.items || []).forEach((i) => {
      if (i.productId) adjustMockStock(i.productId, -i.quantity);
    });

    return { data: mapped };
  },

  cancelOrder: async (orderId: string, reason?: string): Promise<{ data: IOrder }> => {
    const res = await apiClient.post<any>(`/orders/${orderId}/cancel`, { reason });
    const raw = res.data?.data || res.data;
    const mapped = mapOrder(raw);
    saveStoredLocalOrder(mapped);

    (mapped.items || []).forEach((i) => {
      if (i.productId) adjustMockStock(i.productId, i.quantity);
    });

    return { data: mapped };
  },
};

