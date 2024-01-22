import { get } from "@api/utils";

const baseUrlWithSlash = new URL("enum/", import.meta.env.VITE_API_URL);

export function getPostbackStatuses(): Promise<string[]> {
  return get(new URL("postback_status", baseUrlWithSlash));
}

export function getPostbackMethods(): Promise<string[]> {
  return get(new URL("postback_method", baseUrlWithSlash));
}

export function getPostbackLevels(): Promise<string[]> {
  return get(new URL("postback_level", baseUrlWithSlash));
}
