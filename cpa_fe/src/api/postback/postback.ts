import { del, post, put } from "@api/utils";

const baseUrl = new URL("postback_rule", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL(
  "postback_rule/",
  import.meta.env.VITE_API_URL
);

export type Postback = {
  id?: number;
  name: string;
  method: string;
  url: string;
  finalUrl: string;
  event: string;
  level: string;
  productId?: number;
  status: string;
  userId: number;
};

export function createPostback(input: Postback) {
  return post(baseUrl, JSON.stringify(input));
}

export function updatePostback(input: Postback) {
  return put(new URL(input.id + "", baseUrlWithSlash), JSON.stringify(input));
}

export function deletePostback(id: number) {
  return del(baseUrlWithSlash, id);
}
