import { post } from "@api/utils";

const baseUrl = new URL("domain", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL("domain/", import.meta.env.VITE_API_URL);

export type InputDomain = {
  domain: string;
  type: string;
  userId: number;
};

export function addDomain(input: InputDomain) {
  return post(baseUrl, JSON.stringify(input));
}

export function verifyDomain(id: number) {
  return post(new URL(id + "/verify", baseUrlWithSlash), "");
}
