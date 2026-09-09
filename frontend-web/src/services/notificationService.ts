import { apiClient } from './apiClient';
import { INotification } from '../interfaces';

interface BackendNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  is_read: boolean;
  created_at?: string;
}

const TYPE_MAP: Record<string, INotification['type']> = {
  ORDER: 'order',
  PROMO: 'promo',
  SYSTEM: 'system',
  WISHLIST: 'wishlist',
};

function mapNotification(n: BackendNotification): INotification {
  return {
    id: n.id,
    title: n.title,
    message: n.message,
    type: TYPE_MAP[n.type] || 'system',
    read: n.is_read,
    createdAt: n.created_at || new Date().toISOString(),
    link: n.link,
  };
}

export const notificationService = {
  getNotifications: async (page = 1, limit = 50): Promise<{ items: INotification[]; unreadCount: number }> => {
    try {
      const res = await apiClient.get<{ data: { items: BackendNotification[]; unread_count: number } }>(
        `/notifications/?page=${page}&limit=${limit}`
      );
      return { items: res.data.data.items.map(mapNotification), unreadCount: res.data.data.unread_count };
    } catch {
      return { items: [], unreadCount: 0 };
    }
  },

  markAsRead: async (id: string): Promise<void> => {
    await apiClient.post(`/notifications/${id}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.post('/notifications/read-all');
  },

  deleteNotification: async (id: string): Promise<void> => {
    await apiClient.delete(`/notifications/${id}`);
  },
};
