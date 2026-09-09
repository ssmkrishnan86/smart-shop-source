import React, { useEffect, useState } from 'react';
import { SEO } from '../../../components/common/SEO';
import { Button } from '../../../components/ui/Button';
import { notificationService } from '../../../services/notificationService';
import { useToast } from '../../../hooks/useToast';
import { formatTimeAgo } from '../../../utils';
import { INotification } from '../../../interfaces';
import { Bell, CheckCheck, Package, Tag, Info, Heart } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    const { items } = await notificationService.getNotifications();
    setNotifications(items);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMarkAsRead = async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    try {
      await notificationService.markAsRead(id);
    } catch {
      showToast('Failed to update notification', 'error');
    }
  };

  const handleMarkAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await notificationService.markAllAsRead();
    } catch {
      showToast('Failed to update notifications', 'error');
    }
  };

  const iconFor = (type: INotification['type']) => {
    if (type === 'order') return <Package className="w-5 h-5" />;
    if (type === 'promo') return <Tag className="w-5 h-5" />;
    if (type === 'wishlist') return <Heart className="w-5 h-5" />;
    return <Info className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      <SEO title="Notifications" />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Notifications</h2>
        <Button size="sm" variant="ghost" onClick={handleMarkAllAsRead} leftIcon={<CheckCheck className="w-4 h-4" />}>
          Mark all as read
        </Button>
      </div>

      {isLoading ? (
        <p className="text-xs text-muted-foreground">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl">
          <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-semibold">You're all caught up</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.read && handleMarkAsRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                notif.read
                  ? 'border-border bg-card/60 opacity-80'
                  : 'border-primary/40 bg-primary/5 shadow-sm'
              }`}
            >
              <div className="p-2 rounded-xl bg-primary/10 text-primary mt-0.5">{iconFor(notif.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-foreground">{notif.title}</h4>
                  <span className="text-[11px] text-muted-foreground">{formatTimeAgo(notif.createdAt)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
