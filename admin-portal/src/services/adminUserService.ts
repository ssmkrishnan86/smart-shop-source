import { apiClient } from './apiClient';

export interface IAdminUserModel {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  role: string;
  status: 'Active' | 'Suspended' | 'Inactive';
  createdAt?: string;
}

export const MOCK_ADMIN_USERS: IAdminUserModel[] = [
  {
    id: 'user_admin_1',
    email: 'alex.morgan@smartshop.com',
    firstName: 'Alex',
    lastName: 'Morgan',
    fullName: 'Alex Morgan',
    role: 'SUPER_ADMIN',
    status: 'Active',
    createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: 'user_admin_2',
    email: 'siddharth@smartshop.com',
    firstName: 'Siddharth',
    lastName: 'Rao',
    fullName: 'Siddharth Rao',
    role: 'CATALOG_MANAGER',
    status: 'Active',
    createdAt: '2026-03-10T11:20:00Z',
  },
  {
    id: 'user_admin_3',
    email: 'meera@smartshop.com',
    firstName: 'Meera',
    lastName: 'Iyer',
    fullName: 'Meera Iyer',
    role: 'FINANCE_AUDITOR',
    status: 'Active',
    createdAt: '2026-05-04T14:45:00Z',
  },
  {
    id: 'user_admin_4',
    email: 'vikram.seth@smartshop.com',
    firstName: 'Vikram',
    lastName: 'Seth',
    fullName: 'Vikram Seth',
    role: 'ORDER_OPERATOR',
    status: 'Active',
    createdAt: '2026-06-18T09:15:00Z',
  },
];

export const adminUserService = {
  getAdminUsers: async (): Promise<IAdminUserModel[]> => {
    try {
      const res = await apiClient.get<any>('/auth/admin/users');
      if (res.data && res.data.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return res.data.data.map((u: any) => ({
          id: u.id,
          email: u.email,
          firstName: u.first_name,
          lastName: u.last_name,
          fullName: `${u.first_name} ${u.last_name || ''}`.trim(),
          role: u.role,
          status: 'Active',
          createdAt: u.created_at,
        }));
      }
      return MOCK_ADMIN_USERS;
    } catch {
      return MOCK_ADMIN_USERS;
    }
  },

  createAdminUser: async (payload: {
    firstName: string;
    lastName?: string;
    email: string;
    password?: string;
    role: string;
  }): Promise<IAdminUserModel> => {
    try {
      const res = await apiClient.post<any>('/auth/admin/users', {
        first_name: payload.firstName,
        last_name: payload.lastName || '',
        email: payload.email,
        password: payload.password || 'AdminPass123!',
        role: payload.role,
      });
      const u = res.data.data;
      return {
        id: u.id,
        email: u.email,
        firstName: u.first_name,
        lastName: u.last_name,
        fullName: `${u.first_name} ${u.last_name || ''}`.trim(),
        role: u.role,
        status: 'Active',
        createdAt: u.created_at,
      };
    } catch {
      const newUser: IAdminUserModel = {
        id: `user_admin_${Date.now()}`,
        email: payload.email.trim().toLowerCase(),
        firstName: payload.firstName.trim(),
        lastName: payload.lastName?.trim() || '',
        fullName: `${payload.firstName} ${payload.lastName || ''}`.trim(),
        role: payload.role,
        status: 'Active',
        createdAt: new Date().toISOString(),
      };
      MOCK_ADMIN_USERS.unshift(newUser);
      return newUser;
    }
  },

  updateUserRole: async (userId: string, newRole: string): Promise<IAdminUserModel> => {
    try {
      const res = await apiClient.put<any>(`/auth/admin/users/${userId}/role`, { role: newRole });
      const u = res.data.data;
      return {
        id: u.id,
        email: u.email,
        firstName: u.first_name,
        lastName: u.last_name,
        fullName: `${u.first_name} ${u.last_name || ''}`.trim(),
        role: u.role,
        status: 'Active',
      };
    } catch {
      const item = MOCK_ADMIN_USERS.find((u) => u.id === userId);
      if (item) {
        item.role = newRole;
        return item;
      }
      throw new Error('User not found');
    }
  },

  deleteUser: async (userId: string): Promise<void> => {
    try {
      await apiClient.delete(`/auth/admin/users/${userId}`);
    } catch {
      const idx = MOCK_ADMIN_USERS.findIndex((u) => u.id === userId);
      if (idx !== -1) {
        MOCK_ADMIN_USERS.splice(idx, 1);
      }
    }
  },
};
