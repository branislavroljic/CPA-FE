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
  productId: number;
  preLandingPage: string;
  landingPage: string;
  productName: string;
};

export type UpdateOrderStatus = {
  id?: number;
  status: string;
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
