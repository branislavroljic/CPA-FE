import { post } from "@api/utils";

const baseUrl = new URL("payment", import.meta.env.VITE_API_URL);

export type InputPayment = {
  amount: number;
  method: "INVOICE";
  userId: number;
};

export function requestPayment(input: InputPayment) {
  return post(baseUrl, JSON.stringify(input));
}
