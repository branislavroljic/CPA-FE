import { post } from "@api/utils";

const baseUrl = new URL("payment_info", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL("payment_info/", import.meta.env.VITE_API_URL);

export interface PaymentSettings {
  method: string;
  info: string;
  userId: number;
}

export interface WirePaymentSettings {
  bankName: string;
  accountHolder: string;
  country: string;
  iban: string;
  swift: string;
  userId: number;
}

export function createPaymentSetting(input: PaymentSettings) {
  return post(baseUrl, JSON.stringify(input));
}

export function createWirePaymentSetting(input: WirePaymentSettings) {
  return post(new URL("wire", baseUrlWithSlash), JSON.stringify(input));
}
