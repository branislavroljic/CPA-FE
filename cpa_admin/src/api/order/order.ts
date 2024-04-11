import {
  PageRequest,
  Page,
  addPaginationParams,
  addFilterParams,
  get,
  put,
} from "@api/utils";
import { MRT_ColumnFiltersState } from "material-react-table";

const baseUrl = new URL("orders", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL("orders/", import.meta.env.VITE_API_URL);

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

export type UpdateOrderStatus = {
  id?: number;
  status: string;
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

export function getOrders(
  pagination: PageRequest,
  filter?: MRT_ColumnFiltersState
): Promise<Page<Order>> {
  return get(
    addPaginationParams(
      addFilterParams(baseUrl, filter ?? (null as any)),
      pagination
    )
  );
}

export function updateOrderStatus(input: UpdateOrderStatus) {
  return put(new URL("" + input.id, baseUrlWithSlash), JSON.stringify(input));
}

export function getReports(
  filter: MRT_ColumnFiltersState,
  pagination: PageRequest
): Promise<Page<Report>> {
  return get(
    addPaginationParams(
      addFilterParams(new URL("admin_report", baseUrlWithSlash), filter),
      pagination
    )
  );
}
