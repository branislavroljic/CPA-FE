import { del, get, post } from "@api/utils";

export interface Notification {
  id?: number;
  title: string;
  titleEng: string;
  text: string;
  textEng: string;
}

const baseUrl = new URL("notification", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL("notification/", import.meta.env.VITE_API_URL);

export function createNotification(input: Notification) {
  return post(baseUrl, JSON.stringify(input));
}

export function deleteNotification(id: number) {
  return del(baseUrlWithSlash, id);
}
