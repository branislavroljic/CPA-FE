import { Page, PageRequest, addListFilterParams, get } from "@api/utils";

const baseUrl = new URL("product", import.meta.env.VITE_API_URL);

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  payout: number;
  type: string;
  image: string;
  limit_per_day: number;
  country_code: string;
  categories: Category[];
  approve_rate: number;
  earn_per_click: number;
}

export interface LandingPage {
  id: number;
  url: string;
  product: Product;
}

export interface ProductDetails {
  id: number;
  name: string;
  nameEng: string;
  description: string;
  descriptionEng: string;
  price: number;
  currency: string;
  payout: number;
  type: string;
  image: string;
  limit_per_day: number;
  country_code: string;
  categories: Category[];
  approve_rate: number;
  earn_per_click: number;
  landingPages: LandingPage[];
  conversion_rate: number;
  flow: string;
}

export interface FilterProduct {
  country_code?: string;
  type?: string;
  categories?: string[];
}

export function getProducts(
  pagination: PageRequest,
  filter?: FilterProduct
): Promise<Page<Product>> {
  return get(addListFilterParams(baseUrl, pagination, filter ?? (null as any)));
}
