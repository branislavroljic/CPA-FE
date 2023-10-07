import {
  InputFormData,
  Page,
  PageRequest,
  addPaginationParams,
  get,
} from "../utils";

const baseUrl = new URL("user/", import.meta.env.VITE_API_URL);

export type AccountManager = {
  id: number;
  name: string;
  surname: string;
  email: string;
  skypeLink: string;
  telegramLink: string;
  whatsappLink: string;
};

export type User = {
  id: number;
  username: string;
  email?: string;
  roles: string[];
  token: string;
  refreshToken: string;
  accountManager?: AccountManager;
};

export type LoginHistory = {
  id: number;
  ip: string;
  country: string;
  status: string;
  device: string;
  browser: string;
  browserVersion: string;
  operatingSystem: string;
  createdTime: Date;
  userUsername: string;
};

export function getLoginHistory(
  pagination: PageRequest,
  id?: number
): Promise<Page<LoginHistory>> {
  const url = new URL(id + "/login_history", baseUrl);
  console.log(url);
  return get(addPaginationParams(url, pagination));
}
