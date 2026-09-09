import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../../interfaces';

interface NotificationState {
  notifications: INotification[];
}

// Notifications are now fetched directly from the backend by
// NotificationsPage/Header (see notificationService) rather than kept here —
// this slice is left registered only for the legacy markAsRead/markAllAsRead
// actions in case any other component still dispatches them.
const initialState: NotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) notif.read = true;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.read = true));
    },
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications.unshift(action.payload);
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
