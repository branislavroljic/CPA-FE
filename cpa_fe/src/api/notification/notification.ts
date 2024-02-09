import { post } from "@api/utils";

export interface ReadNotification {
  userId?: number;
  notificationId?: number;
}

const baseUrl = new URL("notification/", import.meta.env.VITE_API_URL);

export function readNotification(input: ReadNotification) {
  return post(new URL("read", baseUrl), JSON.stringify(input));
}
