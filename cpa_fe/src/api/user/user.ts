import { MRT_ColumnFiltersState } from "material-react-table";
import {
  Page,
  PageRequest,
  addFilterParams,
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
  apiKey: string;
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
  status: "REQUESTED" | "TRASH" | "CANCELLED" | "DONE";
  name: string;
  country: string;
  address: string;
  phoneNumber: string;
  note: string;
  quantity: number;
  totalPrice: number;
  productId: number;
  preLandingPage: string;
  landingPage: string;
  productName: string;
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
  time: Date;
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

export type StatisticsReport = {
  xvalue: string;
  yvalue: number;
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
