import { Notification } from "@api/notification/notification";
import { create } from "zustand";

export interface NotificationState {
  activeNotification?: Notification;
  setNotification: (data: Notification) => void;
  removeNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  activeNotification: {} as Notification,
  setNotification: (data) => set(() => ({ activeNotification: data })),
  removeNotification: () => set(() => ({ activeNotification: {} as Notification })),
}));
