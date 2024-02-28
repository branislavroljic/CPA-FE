import {
  Page,
  PageRequest,
  addListFilterParams,
  addPaginationParams,
  get,
  post,
} from "@api/utils";
import i18n from "../../i18n";

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
  status: string;
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
  googleDriveLink?: string;
  limit_per_day: number;
  country_code: string;
  categories?: Category[];
  approve_rate: number;
  earn_per_click: number;
  landingPages: LandingPage[];
  prelandingPages?: LandingPage[];
  conversion_rate: number;
  flow: string;
  offerUrl?: string;
  status: string;
  vertical: string;
}

export interface FilterProduct {
  nameSearch?: string;
  country_code?: string;
  type?: string;
  category?: string[];
  paymentModel?: string;
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
  let localizedFilter;

  if (filter) {
    const commonProps = {
      country_code: filter.country_code,
      type: filter.type,
      category: filter.category,
      paymentModel: filter.paymentModel,
    };

    if (i18n.language === "en")
      localizedFilter = {
        ...commonProps,
        name_eng: filter.nameSearch,
      };
    else
      localizedFilter = {
        ...commonProps,
        name: filter.nameSearch,
      };
  }


  return get(
    addPaginationParams(
      addListFilterParams(
        baseProductUrl,
        filter ? localizedFilter : (null as any)
      ),
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

export function getProductsShortResponse() {
  return get(new URL("short_response", baseProductUrlWithSlash));
}
