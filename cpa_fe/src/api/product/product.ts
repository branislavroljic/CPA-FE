import {
  Page,
  PageRequest,
  addListFilterParams,
  addPaginationParams,
  get,
  post,
} from "@api/utils";

const baseProductUrl = new URL("product", import.meta.env.VITE_API_URL);
const baseProductUrlWithSlash = new URL(
  "product/",
  import.meta.env.VITE_API_URL
);
const baseOrderUrl = new URL("orders", import.meta.env.VITE_API_URL);

const baseCountryUrl = new URL("country", import.meta.env.VITE_API_URL);
const baseCategoryUrl = new URL("category", import.meta.env.VITE_API_URL);

export interface Category {
  id: number;
  name: string;
  color: string;
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

export interface InputOrder {
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

export interface Country {
  name: string;
  code: string;
  currency: string;
}

export function getProducts(
  pagination: PageRequest,
  filter?: FilterProduct
): Promise<Page<Product>> {
  return get(
    addPaginationParams(
      addListFilterParams(baseProductUrl, filter ?? (null as any)),
      pagination
    )
  );
}

export function getProductDetails(productId: string): Promise<ProductDetails> {
  return get(new URL(productId, baseProductUrlWithSlash));
}

export function orderProduct(order: InputOrder) {
  return post(baseOrderUrl, JSON.stringify(order));
}

export function getCountries(): Promise<Country> {
  return get(baseCountryUrl);
}

export function getCategories(): Promise<Category> {
  return get(baseCategoryUrl);
}
