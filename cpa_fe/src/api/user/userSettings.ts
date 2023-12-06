import { get, post, put } from "@api/utils";

const baseUrl = new URL("user_settings/user/", import.meta.env.VITE_API_URL);

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export type CompanyInfo = {
  companyName: string;
  country: string;
  city: string;
  address: string;
  zipcode: string;
  companyEmail: string;
  tex: string;
  userId: number;
};

export type SocialMediaLinks = {
  facebookLink?: string;
  googleLink?: string;
  twitterLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
};

export type MessagingLinks = {
  skypeLink?: string;
  telegramLink?: string;
  whatsappLink?: string;
};

export type BasicInfo = {
  name: string;
  surname: string;
  country: string;
};

export function getBasicInfo(id?: number) {
  return get(new URL(id + "/basic_info", baseUrl));
}

export function updateBasicInfo(input: BasicInfo, id?: number) {
  return put(new URL(id + "/basic_info", baseUrl), JSON.stringify(input));
}

export function changePassword(input: ChangePassword, id?: number) {
  return post(new URL(id + "/basic_info", baseUrl), JSON.stringify(input));
}

export function getSocialMediaLinks(id?: number) {
  return get(new URL(id + "/social_media", baseUrl));
}

export function updateSocialMediaLinks(input: SocialMediaLinks, id?: number) {
  return put(new URL(id + "/social_media", baseUrl), JSON.stringify(input));
}

export function getMessagingLinks(id?: number) {
  return get(new URL(id + "/message_social_media", baseUrl));
}

export function updateMessagingLinks(input: MessagingLinks, id?: number) {
  return put(
    new URL(id + "/message_social_media", baseUrl),
    JSON.stringify(input)
  );
}
