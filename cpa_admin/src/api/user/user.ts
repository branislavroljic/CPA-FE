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
  enabledVipProducts: "ENABLED" | "REQUESTED" | "BLOCKED";
  balance: number;
  facebookLink: string;
  googleLink: string;
  twitterLink: string;
  linkedinLink: string;
  instagramLink: string;
  skypeLink: string;
  telegramLink: string;
  whatsappLink: string;
  accountManagerId: number;
  accountManagerUsername?: string;
  paid?: number;
};

export type DasboardData = {
  conversionsToday: number;
  conversionsYesterday: number;
  conversionsThisWeek: number;
  conversionsThisMonth: number;
  conversionRateToday: number;
  conversionsPercentage: number;
  conversionRateYesterday: number;
  conversionRateThisWeek: number;
  conversionRateThisMonth: number;
  conversionRatePercentage: number;
  requestedToday: number;
  requestedYesterday: number;
  requestedThisWeek: number;
  requestedThisMonth: number;
  requestedPercentage: number;
  revenueToday: number;
  revenueYesterday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  revenuePercentage: number;
  cancelledToday: number;
  cancelledYesterday: number;
  cancelledThisWeek: number;
  cancelledThisMonth: number;
  cancelledPercentage: number;
  trashToday: number;
  trashYesterday: number;
  trashThisWeek: number;
  trashThisMonth: number;
  trashPercentage: number;
};

export type AdminDashboardData = DasboardData & {
  numApprovedUsers: number;
  numHoldUsers: number;
  numRejectedUsers: number;
  numTotalUsers: number;
  numActiveProducts: number;
  numPendingProducts: number;
  numPausedProducts: number;
  numTotalProducts: number;
};

export interface Notification {
  id: number;
  title: string;
  text: string;
  timeCreated: string;
}

export interface Notifications {
  notifications: Notification[];
  totalNotifications: number;
  notReadNotifications: number;
  userId: number;
}

export interface AccountManager {
  id: number;
  name: string;
  surname: string;
  email: string;
  skypeLink: string;
  telegramLink: string;
  whatsappLink: string;
}

export type StatisticsReport = {
  xvalue: string;
  yvalue: number;
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

export function updateVIP(id: number, status: string) {
  return put(
    new URL(id + "/vip_products", baseUrlWithSlash),
    JSON.stringify({
      status: status,
    })
  );
}

export function getNotifications(id: number): Promise<Notifications> {
  return get(new URL(id + "/notification", baseUrlWithSlash));
}

export function getAdminDashboardData(): Promise<AdminDashboardData> {
  return get(new URL("admin_dashboard", baseUrlWithSlash));
}

export function getAccountManagers(): Promise<AccountManager[]> {
  return get(new URL("account_managers", baseUrlWithSlash));
}

export function updateAccountManager(id: number, accountManagerId: number) {
  return put(
    new URL(id + "/account_manager", baseUrlWithSlash),
    JSON.stringify({
      accountManagerId: accountManagerId,
    })
  );
}

export function approveAccount(id: number, accountManagerId: number) {
  return put(
    new URL(id + "/approve_status", baseUrlWithSlash),
    JSON.stringify({
      status: "APPROVED",
      accountManagerId: accountManagerId,
    })
  );
}

export function getDashboardData(id?: number): Promise<DasboardData> {
  return get(new URL(id + "/dashboard", baseUrlWithSlash));
}

export function getRevenueStatistics(id?: number): Promise<StatisticsReport[]> {
  return get(new URL(id + "/statistic/revenue", baseUrlWithSlash));
}

export function getHoldStatistics(id?: number): Promise<StatisticsReport[]> {
  return get(new URL(id + "/statistic/hold", baseUrlWithSlash));
}

export function getConversionRateStatistics(
  id?: number
): Promise<StatisticsReport[]> {
  return get(new URL(id + "/statistic/conversion_rate", baseUrlWithSlash));
}

export function getConversionStatistics(
  id?: number
): Promise<StatisticsReport[]> {
  return get(new URL(id + "/statistic/conversion", baseUrlWithSlash));
}
