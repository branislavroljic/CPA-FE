import {
  Page,
  PageRequest,
  addFilterParams,
  addPaginationParams,
  get,
  put,
} from "@api/utils";
import { MRT_ColumnFiltersState } from "material-react-table";

const baseUrl = new URL("user", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL("user/", import.meta.env.VITE_API_URL);

export type UserRole = {
  id: number;
  name: "ROLE_USER";
};

export type User = {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  roles: UserRole[];
  country: string;
  experience: "NO_EXPERIENCE";
  chatService: "SKYPE";
  status:
    | "BLOCKED"
    | "APPROVED"
    | "ON_HOLD_MAIL_CONFIRMED"
    | "ON_HOLD_MAIL_NOT_CONFIRMED";
  registrationDate: string;
  enabledVipProducts: "ENABLED" | "REQUESTED" | "BLOCKED";
  balance: number;
  facebookLink: string;
  googleLink: string;
  twitterLink: string;
  linkedinLink: string;
  instagramLink: string;
  skypeLink: string;
  telegramLink: string;
  whatsappLink: string;
  accountManagerId: number;
  accountManagerUsername?: string;
  paid?: number;
  hasExternalMarketars?: boolean;
};

export type Marketar = {
  id: number;
  externalMarketarId: string;
  userId: number;
};

export type Analytics = {
  total: number;
  hold: number;
  conversions: number;
  conversionRate: number;
  trash: number;
  cancelled: number;
};

export type AnalyticsPerDate = {
  date: Date;
  total: number;
  hold: number;
  conversions: number;
  conversionRate: number;
  trash: number;
  cancelled: number;
};

export type AnalyticsPerOffer = {
  productId: number;
  productName: string;
  total: number;
  hold: number;
  conversions: number;
  conversionRate: number;
  trash: number;
  cancelled: number;
};

export function getUsers(
  pagination: PageRequest,
  filter?: MRT_ColumnFiltersState
): Promise<Page<User>> {
  return get(
    addPaginationParams(
      addFilterParams(baseUrl, filter ?? (null as any)),
      pagination
    )
  );
}

export function getMarketars(
  id: number,
  pagination: PageRequest
): Promise<Page<Marketar>> {
  return get(
    addPaginationParams(
      new URL(id + "/external_marketars", baseUrlWithSlash),
      pagination
    )
  );
}

export function getAnalytics(filter: any, userId: number, marketarId?: number) {
  const url = addFilterParams(
    new URL(userId + "/analytics", baseUrlWithSlash),
    filter
  );

  if (marketarId) {
    url.searchParams.append("sub_2", marketarId.toString());
  }

  return get(url);
}

export function getAnalyticsPerDate(
  userId: number,
  filter: MRT_ColumnFiltersState,
  pagination: PageRequest
): Promise<Page<AnalyticsPerDate>> {
  return get(
    addPaginationParams(
      addFilterParams(
        new URL(userId + "/analytics_per_date", baseUrlWithSlash),
        filter
      ),
      pagination
    )
  );
}

export function getAnalyticsPerOffer(
  userId: number,
  filter: MRT_ColumnFiltersState,
  pagination: PageRequest
): Promise<Page<AnalyticsPerOffer>> {
  return get(
    addPaginationParams(
      addFilterParams(
        new URL(userId + "/analytics_per_product", baseUrlWithSlash),
        filter
      ),
      pagination
    )
  );
}
