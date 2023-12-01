import { Page, PageRequest, addPaginationParams, get } from "../utils";

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

export type Payment = {
  id: number;
  amount: number;
  balanceBeforeRequest: number;
  method: string;
  description: string;
  descriptionEng: string;
  rejectComment: string;
  rejectCommentEng: string;
  status: string;
  createdAt: Date;
  editedAt: Date;
  userUsername: string;
};

export type Domain = {
  id: number;
  domain: string;
  type: string;
  status: string;
  userId: number;
};

export function getLoginHistory(
  pagination: PageRequest,
  id?: number
): Promise<Page<LoginHistory>> {
  return get(
    addPaginationParams(new URL(id + "/login_history", baseUrl), pagination)
  );
}

export function getPayments(
  pagination: PageRequest,
  id?: number
): Promise<Page<Payment>> {
  return get(
    addPaginationParams(new URL(id + "/payment", baseUrl), pagination)
  );
}

export function getDomains(
  pagination: PageRequest,
  id?: number
): Promise<Page<Domain>> {
  return get(addPaginationParams(new URL(id + "/domain", baseUrl), pagination));
}
