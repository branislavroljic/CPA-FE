import { USER_KEY } from "./auth";
import { User } from "./user/user";
import { MRT_ColumnFiltersState } from "material-react-table";
import axiosClient, { headers } from "./axios";

export type PredefinedRequest = Omit<RequestInit, "method" | "body">;

function addToken(headers: HeadersInit): HeadersInit {
  const user = sessionStorage.getItem(USER_KEY);

  if (!user) {
    return headers;
  }
  const parsedUser = JSON.parse(user) as User;

  return {
    ...headers,
    Authorization: `Bearer ${parsedUser.token}`,
  };
}

// export function get(baseUrl: string | URL, init?: PredefinedRequest) {
//   return fetch(baseUrl, {
//     ...init,
//     method: 'GET',
//     headers: addToken({
//       ...init?.headers,
//       Accept: 'application/json',
//       'Accept-Language': i18n.language,
//     }),
//   }).then((x) => x.json());
// }

export function get(url: string | URL) {
  return axiosClient.get(url.toString()).then((x) => x.data);
}
// export function getById(baseUrl: URL, id: string, init?: PredefinedRequest) {
//   return fetch(new URL(id, baseUrl), {
//     ...init,
//     method: 'GET',
//     headers: addToken({
//       ...init?.headers,
//       Accept: 'application/json',
//       'Accept-Language': i18n.language,
//     }),
//   }).then((x) => x.json());
// }

// export function post(
//   baseUrl: string | URL,
//   body: string,
//   init?: PredefinedRequest
// ) {
//   return fetch(baseUrl, {
//     ...init,
//     method: 'POST',
//     body: body,
//     headers: addToken({
//       ...init?.headers,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'Accept-Language': i18n.language,
//     }),
//   });
// }

export function post(url: string | URL, body: string) {
  return axiosClient.post(url.toString(), body, {
    headers: headers(),
  });
}

// export function put(
//   baseUrl: string | URL,
//   body: string,
//   init?: PredefinedRequest
// ) {
//   return fetch(baseUrl, {
//     ...init,
//     method: 'PUT',
//     body: body,
//     headers: addToken({
//       ...init?.headers,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'Accept-Language': i18n.language,
//     }),
//   });
// }

export function put(url: string | URL, body: string) {
  return axiosClient.put(url.toString(), body, {
    headers: headers(),
  });
}

// export function del(baseUrl: URL, id: number, init?: PredefinedRequest) {
//   return fetch(new URL(id.toString(), baseUrl), {
//     ...init,
//     method: 'DELETE',
//     headers: addToken({
//       ...init?.headers,
//       'Accept-Language': i18n.language,
//     }),
//   });
// }

export function del(baseUrl: string | URL, id: number) {
  return axiosClient.delete(new URL(id.toString(), baseUrl).toString());
}

export function restore(baseUrl: string | URL, id: number) {
  return axiosClient.put(new URL("restore/" + id, baseUrl).toString());
}

// export function restore(baseUrl: URL, id: number, init?: PredefinedRequest) {
//   return fetch(new URL('restore/' + id, baseUrl), {
//     ...init,
//     method: 'PUT',
//     headers: addToken({
//       ...init?.headers,
//       'Accept-Language': i18n.language,
//     }),
//   });
// }

export function appendFormDataFromObject(
  formData: FormData,
  obj: any
): FormData {
  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
    } else if (typeof value == "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  }
  return formData;
}

export type InputFormDataSingle<T> = {
  image?: File;
  body?: T;
};

export type InputFormData<T> = {
  images?: File[];
  body?: T;
};

export function postMultipartSingle(
  baseUrl: string | URL,
  input: InputFormDataSingle<unknown>
) {
  let formData = new FormData();

  if (input.image) {
    formData.append("image", input.image);
  }

  if (input.body) formData = appendFormDataFromObject(formData, input.body);
  return axiosClient.post(baseUrl.toString(), formData, {
    headers: headers(undefined, ""),
  });
}

export function postMultipart(
  baseUrl: string | URL,
  input: InputFormData<unknown>
) {
  let formData = new FormData();

  if (input.images && input.images.length > 0) {
    for (const image of input.images) {
      formData.append("images", image);
    }
  }

  if (input.body) formData = appendFormDataFromObject(formData, input.body);
  return axiosClient.post(baseUrl.toString(), formData, {
    headers: headers(undefined, ""),
  });
}

// export function postMultipartMultiple(
//   baseUrl: string | URL,
//   input: InputFormData<unknown>
// ) {
//   let formData = new FormData();

//   if (input.images && input.images.length > 0) {
//     for (const image of input.images) {
//       formData.append('images', image);
//     }
//   }

//   if (input.body) formData = appendFormDataFromObject(formData, input.body);

//   // return fetch(baseUrl, {
//   //   method: 'POST',
//   //   body: formData,
//   //   headers: addToken({
//   //     // ...init?.headers,
//   //     Accept: 'application/json',
//   //     // 'Content-Type': 'multipart/form-data',
//   //     'Accept-Language': i18n.language,
//   //   }),
//   // });

//   return axiosClient.post(baseUrl.toString(), formData, {
//     headers: headers(undefined, ''),
//   });
// }

export function putMultipartSingle(
  baseUrl: string | URL,
  input: InputFormDataSingle<unknown>
) {
  let formData = new FormData();

  if (input.image) {
    formData.append("image", input.image);
  }
  formData = appendFormDataFromObject(formData, input.body);

  return axiosClient.put(baseUrl.toString(), formData, {
    headers: headers(undefined, ""),
  });
}

export function putMultipart(
  baseUrl: string | URL,
  input: InputFormData<unknown>
) {
  let formData = new FormData();

  if (input.images && input.images.length > 0) {
    for (const image of input.images) {
      formData.append("images", image);
    }
  }
  formData = appendFormDataFromObject(formData, input.body);
  return axiosClient.put(baseUrl.toString(), formData, {
    headers: headers(undefined, ""),
  });
}

// export function putMultipartMultiple(
//   baseUrl: string | URL,
//   input: InputFormData<unknown>
// ) {
//   let formData = new FormData();

//   if (input.images && input.images.length > 0) {
//     for (const image of input.images) {
//       formData.append('images', image);
//     }
//   }
//   formData = appendFormDataFromObject(formData, input.body);

//   // return fetch(baseUrl, {
//   //   method: 'PUT',
//   //   body: formData,
//   //   headers: addToken({
//   //     // ...init?.headers,
//   //     Accept: 'application/json',
//   //     // 'Content-Type': 'multipart/form-data',
//   //     'Accept-Language': i18n.language,
//   //   }),
//   // });
//   return axiosClient.put(baseUrl.toString(), formData, {
//     headers: headers(undefined, ''),
//   });
// }

// export function postFormData(
//   baseUrl: string | URL,
//   body: FormData,
//   init?: PredefinedRequest
// ) {
//   return fetch(baseUrl, {
//     ...init,
//     method: 'POST',
//     body: body,
//     headers: addToken({
//       ...init?.headers,
//       Accept: 'application/json',
//       // 'Content-Type': 'multipart/form-data',
//       'Accept-Language': i18n.language,
//     }),
//   });
// }

// export function putFormData(
//   baseUrl: string | URL,
//   body: FormData,
//   init?: PredefinedRequest
// ) {
//   return fetch(baseUrl, {
//     ...init,
//     method: 'PUT',
//     body: body,
//     headers: addToken({
//       ...init?.headers,
//       Accept: 'application/json',
//       // 'Content-Type': 'multipart/form-data',
//       'Accept-Language': i18n.language,
//     }),
//   });
// }

// export function selectGet(
//   baseUrl: URL,
//   skip: number,
//   take: number,
//   query?: string
// ): Promise<Page<SelectInput>> {
//   const url = new URL("select", baseUrl);
//   return get(addFilterParams(url, { skip, take, name: query }));
// }

export function addPaginationParams(baseUrl: URL, ...filters: object[]): URL {
  filters.forEach((f) => {
    for (const [k, v] of Object.entries(f)) {
      if (v != null && !(typeof v == "string" && v.trim().length == 0)) {
        baseUrl.searchParams.set(k, v);
      }
    }
  });
  return baseUrl;
}

export function addFilterParams(baseUrl: URL, filters: MRT_ColumnFiltersState) {
  // baseUrl.searchParams.delete('name');
  // baseUrl.searchParams.delete('typeId');
  console.log("filteri su: " + JSON.stringify(filters));
  console.log("baseUrl prije dodavanja je: " + baseUrl);
  filters.forEach((f) => {
    if (
      f.value != null &&
      !(typeof f.value == "string" && f.value.trim().length == 0)
    ) {
      baseUrl.searchParams.set(f.id, f.value as string);
    }
  });

  console.log("baseURL nakon filtera je:  " + baseUrl);
  return baseUrl;
}

export type Page<T> = {
  rows: T[];
  totalCount: number;
};

export type PageRequest = {
  page: number;
  size: number;
  showDeleted?: boolean;
  sortBy?: string;
  sortDirection?: string;
};

export type SelectInput = {
  text: string;
  value: number | string;
};

export type Status = "ACTIVE" | "DELETED";

export type ImageInfo = {
  imageBytes: Uint8Array;
  imageType: "png" | "jpeg";
  imageName: string;
};

// type Nullable<T> = {
//   [K in keyof T]: T[K] | null;
// };

// function convertNullToUndefined<T>(obj: Nullable<T>): T {
//   const updatedObj = {} as Nullable<T>;

//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       updatedObj[key] =
//         obj[key] === null
//           ? null
//           : (obj[key] as NonNullable<T[Extract<keyof T, string>]>);
//     }
//   }

//   return updatedObj as T;
// }
