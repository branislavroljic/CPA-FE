import { post } from "@api/utils";

const baseUrl = new URL("domain", import.meta.env.VITE_API_URL);

export type InputDomain = {
  domain: string;
  type: string;
  userId: number;
};

export function addDomain(input: InputDomain) {
  return post(baseUrl, JSON.stringify(input));
}
