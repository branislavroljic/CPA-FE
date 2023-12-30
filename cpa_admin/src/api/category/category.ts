import { del, get, post, put } from "@api/utils";

const baseUrl = new URL("category", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL("category/", import.meta.env.VITE_API_URL);

export type Category = {
  id?: number;
  name: string;
  nameEng: string;
  color: string;
};

export function getCategories(): Promise<Category[]> {
  return get(baseUrl);
}

export function createCategory(input: Category) {
  return post(baseUrl, JSON.stringify(input));
}

export function updateCategory(input: Category) {
  return put(new URL("" + input.id, baseUrlWithSlash), JSON.stringify(input));
}

export function deleteCategory(id: number) {
  return del(baseUrlWithSlash, id);
}
