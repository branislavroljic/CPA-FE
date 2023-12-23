import { Page, PageRequest, addListFilterParams, get, post } from "@api/utils";

const baseProductUrl = new URL("product", import.meta.env.VITE_API_URL);
const baseProductUrlWithSlash = new URL(
  "product/",
  import.meta.env.VITE_API_URL
);
const baseOrderUrl = new URL("order", import.meta.env.VITE_API_URL);

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
  prelandingPages?: LandingPage[];
  conversion_rate: number;
  flow: string;
  offerURL?: string;
}

export interface FilterProduct {
  country_code?: string;
  type?: string;
  categories?: string[];
}

export interface Order {
  name: string;
  country: string;
  address: string;
  phoneNumber: string;
  note?: string;
  quantity: number;
  totalPrice: number;
  productId: number;
  userId: number;
}

export function getProducts(
  pagination: PageRequest,
  filter?: FilterProduct
): Promise<Page<Product>> {
  return get(
    addListFilterParams(baseProductUrl, pagination, filter ?? (null as any))
  );
}

export function getProductDetails(productId: string): Promise<ProductDetails> {
  return get(new URL(productId, baseProductUrlWithSlash));
}

export function orderProduct(order: Order) {
  return post(baseOrderUrl, JSON.stringify(order));
}
