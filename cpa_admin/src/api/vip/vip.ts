import { get, put } from "@api/utils";

const baseUrl = new URL("vip_products_request", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL(
  "vip_products_request/",
  import.meta.env.VITE_API_URL
);

export type VIPRequest = {
  id: number;
  description: string;
  done: boolean;
  userId: number;
  userUsername: string;
};

export function getVIPRequests(): Promise<VIPRequest[]> {
  return get(baseUrl);
}

export function resolveVIPRequest(requestId: number, status: string) {
  return put(
    new URL(requestId + "/resolve", baseUrlWithSlash),
    JSON.stringify({ status: status })
  );
}
