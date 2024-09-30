import {
  Page,
  PageRequest,
  addPaginationParams,
  del,
  get,
  post,
} from "@api/utils";

const baseUrl = new URL("custom_payout", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL(
  "custom_payout/",
  import.meta.env.VITE_API_URL
);

export type CustomPayout = {
  id?: number;
  payout?: number;
  userId: number;
  productId: number;
};

export function getCustomPayouts(
  pagination: PageRequest
): Promise<Page<CustomPayout>> {
  return get(addPaginationParams(baseUrl, pagination));
}

export function createCustomPayout(input: CustomPayout) {
  return post(baseUrl, JSON.stringify(input));
}

export function deleteCustomPayout(id: number) {
  return del(baseUrlWithSlash, id);
}
