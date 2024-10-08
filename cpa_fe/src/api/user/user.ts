import { MRT_ColumnFiltersState } from "material-react-table";
import {
  Page,
  PageRequest,
  addFilterParams,
  addPaginationParams,
  get,
} from "../utils";
import { PaymentSettings, WirePaymentSettings } from "@api/payment/settings";

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
  apiKey: string;
  username: string;
  email?: string;
  name: string;
  surname: string;
  roles: string[];
  token: string;
  refreshToken: string;
  accountManager?: AccountManager;
  referrerLink?: string;
  enabledVipProducts?: string;
  status: string;
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
  createdTime: string;
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
  createdAt: string;
  editedAt: string;
  userUsername: string;
};

export type Domain = {
  id: number;
  domain: string;
  type: string;
  status: string;
  userId: number;
};

export type Referral = {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  status: string;
};

export type Order = {
  id: number;
  time: string;
  status: "HOLD" | "TRASH" | "CANCELLED" | "APPROVED";
  name: string;
  country: string;
  address: string;
  phoneNumber: string;
  note: string;
  quantity: number;
  totalPrice: number;
  productCurrency?: string;
  productId: number;
  productName: string;
  preLandingPage: string;
  landingPage: string;
  userId: number;
  userUsername: string;
  userIP?: string;
  referrer?: string;
  sub1?: string;
  sub2?: string;
  sub3?: string;
  sub4?: string;
  operatingSystem?: string;
  browserName?: string;
  browserVersion?: string;
  deviceType?: string;
};

export type BalanceOrder = {
  orderId: number;
  offerName: string;
  payout: number;
};

export type Report = {
  total: number;
  hold: number;
  conversions: number;
  conversionRate: number;
  trash: number;
  cancelled: number;
  totalHoldRevenue: number;
  holdRevenue: number;
  revenue: number;
  totalTrashRevenue: number;
  totalCancelledRevenue: number;
  productName: string;
  productId: number;
};

export type Postback = {
  id: number;
  name: string;
  method: string;
  url: string;
  finalUrl: string;
  event: string;
  level: string;
  productId?: number;
  status: string;
  userId: number;
};

export type PostbackHistory = {
  id: number;
  requestUrl: string;
  status: string;
  time: string;
  productId: number;
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

export type Manager = {
  id: number;
  name: string;
  surname: string;
  email: string;
  skypeLink: string;
  telegramLink: string;
  whatsappLink: string;
};

export type StatisticsReport = {
  xvalue: string;
  yvalue: number;
};

export type Balance = {
  balance: number;
  paid: number;
  total: number;
};

export interface Notification {
  id: number;
  title: string;
  text: string;
  timeCreated: string;
  read: boolean;
}

export interface Notifications {
  notifications: Notification[];
  totalNotifications: number;
  notReadNotifications: number;
  userId: number;
}

export interface PaymentMethod {
  id: number;
  method: string;
  methodString: string;
  info: string;
  userId: number;
  available: boolean;
}

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

export function getReferrals(
  pagination: PageRequest,
  id?: number
): Promise<Page<Referral>> {
  return get(
    addPaginationParams(new URL(id + "/referral", baseUrl), pagination)
  );
}

export function getOrders(
  filter: MRT_ColumnFiltersState,
  pagination: PageRequest,
  id?: number
): Promise<Page<Order>> {
  return get(
    addPaginationParams(
      addFilterParams(new URL(id + "/order", baseUrl), filter),
      pagination
    )
  );
}

export function getBalanceOrders(
  filter: MRT_ColumnFiltersState,
  pagination: PageRequest,
  id?: number
): Promise<Page<BalanceOrder>> {
  return get(
    addPaginationParams(
      addFilterParams(new URL(id + "/balance_orders", baseUrl), filter),
      pagination
    )
  );
}

export function getReports(
  filter: MRT_ColumnFiltersState,
  pagination: PageRequest,
  id?: number
): Promise<Page<Report>> {
  return get(
    addPaginationParams(
      addFilterParams(new URL(id + "/report", baseUrl), filter),
      pagination
    )
  );
}

export function getPostbacks(
  pagination: PageRequest,
  id?: number
): Promise<Page<Postback>> {
  return get(
    addPaginationParams(new URL(id + "/postback_rule", baseUrl), pagination)
  );
}

export function getPostbackHistory(
  pagination: PageRequest,
  id?: number
): Promise<Page<PostbackHistory>> {
  return get(
    addPaginationParams(new URL(id + "/postback_history", baseUrl), pagination)
  );
}

export function getDashboardData(id?: number): Promise<DasboardData> {
  return get(new URL(id + "/dashboard", baseUrl));
}

export function getRevenueStatistics(id?: number): Promise<StatisticsReport[]> {
  return get(new URL(id + "/statistic/revenue", baseUrl));
}

export function getHoldStatistics(id?: number): Promise<StatisticsReport[]> {
  return get(new URL(id + "/statistic/hold", baseUrl));
}

export function getConversionRateStatistics(
  id?: number
): Promise<StatisticsReport[]> {
  return get(new URL(id + "/statistic/conversion_rate", baseUrl));
}

export function getConversionStatistics(
  id?: number
): Promise<StatisticsReport[]> {
  return get(new URL(id + "/statistic/conversion", baseUrl));
}

export function getBalance(id?: number): Promise<Balance> {
  return get(new URL(id + "/short_balance", baseUrl));
}

export function getUnreadNotifications(id: number) {
  return get(new URL(id + "/number_not_read_notification", baseUrl));
}

export function getNotifications(id?: number): Promise<Notifications> {
  return get(new URL(id + "/notification", baseUrl));
}

export function getPaymentMethodInfo(
  method: string,
  id?: number
): Promise<PaymentSettings> {
  return get(new URL(id + "/payment_info/" + method, baseUrl));
}

export function getWirePaymentMethodInfo(
  id?: number
): Promise<WirePaymentSettings> {
  return get(new URL(id + "/wire_payment_info", baseUrl));
}

export function getAllPaymentMethods(id?: number): Promise<PaymentMethod[]> {
  return get(new URL(id + "/all_payment_methods", baseUrl));
}
