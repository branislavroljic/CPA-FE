import { Category } from "@api/category/category";
import {
  InputFormData,
  Page,
  PageRequest,
  addListFilterParams,
  addPaginationParams,
  del,
  get,
  postMultipart,
  putMultipart,
} from "@api/utils";

const baseUrl = new URL("product", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL("product/", import.meta.env.VITE_API_URL);

const baseCountryUrl = new URL("country", import.meta.env.VITE_API_URL);
const baseCategoryUrl = new URL("category", import.meta.env.VITE_API_URL);

export type Product = {
  id: number;
  name: string;
  nameEng?: string;
  description: string;
  descriptionEng?: string;
  status: string;
  price: number;
  currency: string;
  payout: number;
  type: string;
  image: string;
  googleDriveLink?: string;
  limit_per_day: number;
  approveRate?: number;
  country_code: string;
  categories: Category[];
  categoriesIDs?: string[];
  approve_rate: number;
  earn_per_click: number;
  landingPagesString?: string;
  prelandingPagesString?: string;
  vertical?: string;
};

export type InputProduct = {
  id?: number;
  name: string;
  nameEng: string;
  description: string;
  descriptionEng: string;
  status: string;
  price: number;
  currency: string;
  payout: number;
  type: string;
  googleDriveLink?: string;
  limit_per_day: number;
  approveRate: number | null;
  country_code: string;
  categoriesIDs?: string[];
  landingPagesString?: string | null;
  prelandingPagesString?: string | null;
  vertical?: string;
};

export interface Country {
  name: string;
  code: string;
  currency: string;
}

export type ProductFormData = {
  image?: File;
  product?: Product;
};

export interface FilterProduct {
  country_code?: string;
  type?: string;
  categories?: string[];
}

export function getCountries(): Promise<Country> {
  return get(baseCountryUrl);
}

export function getCategories(): Promise<Category> {
  return get(baseCategoryUrl);
}

export function getProducts(
  pagination: PageRequest,
  filter?: FilterProduct
): Promise<Page<Product>> {
  return get(
    addPaginationParams(
      addListFilterParams(
        new URL("admin", baseUrlWithSlash),
        filter ?? (null as any)
      ),
      pagination
    )
  );
}

export function createProduct(input: InputFormData<InputProduct>) {
  return postMultipart(baseUrl, input);
}

export function updateProduct(input: InputFormData<InputProduct>) {
  return putMultipart(new URL("" + input.body?.id, baseUrlWithSlash), input);
}

export function deleteProduct(id: number) {
  return del(baseUrlWithSlash, id);
}
