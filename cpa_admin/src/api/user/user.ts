import {
  Page,
  PageRequest,
  addFilterParams,
  addPaginationParams,
  get,
  put,
} from "@api/utils";
import { MRT_ColumnFiltersState } from "material-react-table";

const baseUrl = new URL("user", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL("user/", import.meta.env.VITE_API_URL);

export type AuthUser = {
  id: number;
  username: string;
  email?: string;
  roles: string[];
  token: string;
  refreshToken: string;
};

export type UserRole = {
  id: number;
  name: "ROLE_USER";
};

export type User = {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  roles: UserRole[];
  country: string;
  experience: "NO_EXPERIENCE";
  chatService: "SKYPE";
  status:
    | "BLOCKED"
    | "APPROVED"
    | "ON_HOLD_MAIL_CONFIRMED"
    | "ON_HOLD_MAIL_NOT_CONFIRMED";
  registrationDate: string;
  enabledVipProducts: boolean;
  balance: number;
  facebookLink: string;
  googleLink: string;
  twitterLink: string;
  linkedinLink: string;
  instagramLink: string;
  skypeLink: string;
  telegramLink: string;
  whatsappLink: string;
  accountManager: {
    id: number;
    username: string;
    password: string;
    apikey: string;
    name: string;
    surname: string;
    email: string;
    roles: UserRole[];
    country: string;
    experience: "NO_EXPERIENCE";
    chatService: "SKYPE";
    status:
      | "BLOCKED"
      | "APPROVED"
      | "ON_HOLD_MAIL_CONFIRMED"
      | "ON_HOLD_MAIL_NOT_CONFIRMED";
    registrationDate: string;
    enabledVipProducts: boolean;
    balance: number;
    facebookLink: string;
    googleLink: string;
    twitterLink: string;
    linkedinLink: string;
    instagramLink: string;
    skypeLink: string;
    telegramLink: string;
    whatsappLink: string;
    accountManager: string;
  };
};

export function getUsers(
  pagination: PageRequest,
  filter?: MRT_ColumnFiltersState
): Promise<Page<User>> {
  return get(
    addPaginationParams(
      addFilterParams(baseUrl, filter ?? (null as any)),
      pagination
    )
  );
}

export function updateStatus(id: number, status: string) {
  return put(
    new URL(id + "/status", baseUrlWithSlash),
    JSON.stringify({
      status: status,
    })
  );
}

export function updateVIP(id: number, status: boolean) {
  return put(
    new URL(id + "/vip_products", baseUrlWithSlash),
    JSON.stringify({
      status: status,
    })
  );
}
