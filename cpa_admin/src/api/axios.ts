import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import i18n from "../i18n";
import { USER_KEY, getUserFromStorage } from "./auth";
import { User } from "./user/user";

const baseUrl = import.meta.env.VITE_API_URL;

export const headers = (
  additionalHeaders?: AxiosRequestHeaders,
  contentType = "application/json"
) => {
  return {
    Accept: "application/json",
    "Content-Type": contentType,
    "Accept-Language": i18n.language,
    "Access-Control-Allow-Origin": "*",
    ...additionalHeaders,
  };
};

export const handleError = <T>(error: AxiosError<T>) => {
  if (axios.isAxiosError(error)) {
    return error.response;
  }

  console.error(error);

  return undefined;
};

const refreshAxios = axios.create({
  baseURL: baseUrl,
});

const refreshTokenFunction = () => {
  const user = getUserFromStorage();

  return refreshAxios.post(
    "/auth/refreshtoken",
    {
      refreshToken: user ? user.refreshToken : null,
    },
    {
      headers: headers(),
    }
  );

  // handle case when both tokens expire
};

const axiosClient = () => {
  const defaultOptions = {
    baseURL: baseUrl,
  };

  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const user = getUserFromStorage();

    console.log(user);
    config.headers.Authorization = user ? `Bearer ${user.token}` : "";

    return config;
  });

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig.retry) {
          originalConfig.retry = true;
          try {
            const rs = await refreshTokenFunction();
            const { jwtToken } = rs.data;
            const token: string = jwtToken;

            const user = getUserFromStorage();
            sessionStorage.setItem(
              USER_KEY,
              JSON.stringify({ ...user, token: token } as User)
            );
            originalConfig.headers.authorization = `Bearer ${token}`;

            return instance(originalConfig);
          } catch (error) {
            handleError<string>(error as AxiosError<string>);
            localStorage.removeItem(USER_KEY);
            sessionStorage.removeItem(USER_KEY);
            window.location.reload();
          }
        }
      }
      return Promise.reject(err);
    }
  );

  return instance;
};

export default axiosClient();
