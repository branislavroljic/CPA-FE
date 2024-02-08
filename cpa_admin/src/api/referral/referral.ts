import { Page, PageRequest, addPaginationParams, get } from "@api/utils";

const baseUrl = new URL("referral", import.meta.env.VITE_API_URL);

export type Referral = {
  id?: number;
  referralUserId: number;
  referralUserUsername: string;
  newUserId: number;
  newUserUsername: number;
  registrationDate: string;
};

export function getReferrals(pagination: PageRequest): Promise<Page<Referral>> {
  return get(addPaginationParams(baseUrl, pagination));
}
