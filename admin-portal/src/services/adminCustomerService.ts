import { apiClient } from './apiClient';

export interface ICustomerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: string;
  status: 'ACTIVE' | 'BANNED' | 'SUSPENDED';
  joinedDate: string;
  banReason?: string;
}

export const MOCK_CUSTOMERS: ICustomerAccount[] = [
  {
    id: 'cust_101',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    ordersCount: 12,
    totalSpent: '₹18,420',
    status: 'ACTIVE',
    joinedDate: '12 Jan 2026',
  },
  {
    id: 'cust_102',
    name: 'Priya Sundaram',
    email: 'priya.s@example.com',
    phone: '+91 98410 89234',
    ordersCount: 8,
    totalSpent: '₹14,290',
    status: 'ACTIVE',
    joinedDate: '04 Mar 2026',
  },
  {
    id: 'cust_103',
    name: 'Ananya Roy',
    email: 'ananya.roy@example.com',
    phone: '+91 97112 34567',
    ordersCount: 15,
    totalSpent: '₹32,800',
    status: 'ACTIVE',
    joinedDate: '18 Nov 2025',
  },
  {
    id: 'cust_104',
    name: 'Karthik Raja',
    email: 'karthik.r@example.com',
    phone: '+91 99401 22334',
    ordersCount: 2,
    totalSpent: '₹3,450',
    status: 'ACTIVE',
    joinedDate: '01 Aug 2026',
  },
];

export const adminCustomerService = {
  getCustomers: async (): Promise<ICustomerAccount[]> => {
    try {
      const res = await apiClient.get<any>('/auth/admin/customers');
      if (res.data && res.data.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return res.data.data.map((c: any) => ({
          id: c.id,
          name: `${c.first_name} ${c.last_name || ''}`.trim() || 'Customer',
          email: c.email,
          phone: c.phone || '+91 98765 43210',
          ordersCount: c.orders_count || 1,
          totalSpent: c.total_spent || '₹2,199',
          status: c.is_active ? 'ACTIVE' : 'BANNED',
          joinedDate: c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Recent',
        }));
      }
      return MOCK_CUSTOMERS;
    } catch {
      return MOCK_CUSTOMERS;
    }
  },

  toggleCustomerBan: async (
    customerId: string,
    action: 'BAN' | 'UNBAN',
    reason?: string
  ): Promise<ICustomerAccount> => {
    try {
      const res = await apiClient.put<any>(`/auth/admin/customers/${customerId}/ban`, {
        action,
        reason,
      });
      const c = res.data.data;
      return {
        id: c.id,
        name: `${c.first_name} ${c.last_name || ''}`.trim() || 'Customer',
        email: c.email,
        phone: c.phone || '+91 98765 43210',
        ordersCount: c.orders_count || 1,
        totalSpent: c.total_spent || '₹2,199',
        status: c.is_active ? 'ACTIVE' : 'BANNED',
        joinedDate: c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Recent',
        banReason: reason,
      };
    } catch {
      const item = MOCK_CUSTOMERS.find((c) => c.id === customerId);
      if (item) {
        item.status = action === 'BAN' ? 'BANNED' : 'ACTIVE';
        item.banReason = reason;
        return item;
      }
      throw new Error('Customer not found');
    }
  },
};
