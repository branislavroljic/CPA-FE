import { post } from "@api/utils";

const baseUrl = new URL("vip_products_request", import.meta.env.VITE_API_URL);

export type VIPRequest = {
  description: string;
  userId: number;
};

export function requestVIP(input: VIPRequest) {
  return post(baseUrl, JSON.stringify(input));
}
