import { get } from "@api/utils";

export interface Notification {
  id: number;
  title: string;
  text: string;
  timeCreated: string;
}

const baseUrl = new URL("notification", import.meta.env.VITE_API_URL);

export function getNotifications(): Promise<Notification[]> {
  return get(baseUrl);
}
