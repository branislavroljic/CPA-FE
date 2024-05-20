import { Page, PageRequest, addPaginationParams, get } from "@api/utils";
const companiesUrl = new URL("company", import.meta.env.VITE_API_URL);

export type Company = {
  id: number;
  companyName: string;
  country: string;
  city: string;
  address: string;
  zipcode: string;
  companyEmail: string;
  tax: string | null;
  userId: number;
};

export function getCompanies(pagination: PageRequest): Promise<Page<Company>> {
  return get(addPaginationParams(companiesUrl, pagination));
}
