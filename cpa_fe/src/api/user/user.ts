import {
  ImageInfo,
  InputFormData,
  post,
  postMultipartSingle,
  put,
} from "../utils";

const baseUrl = new URL("users/", import.meta.env.VITE_API_URL);

export type User = ImageInfo & {
  id: number;
  username: string;
  email?: string;
  phoneNumber?: string;
  firstname: string;
  lastname: string;
  role: string;
  companyId: number;
  token: string;
  refreshToken: string;
};

export type PasswordUpdateRequest = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function updatePassword(request: PasswordUpdateRequest) {
  return put(new URL("change-password", baseUrl), JSON.stringify(request));
}

export function updateProfileImage(image: InputFormData<any>) {
  return postMultipartSingle(new URL("profile-image", baseUrl), image);
}
