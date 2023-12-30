import { User } from './user/user';
import { post } from './utils';

export const USER_KEY = 'user';

const baseUrl = new URL('auth/', import.meta.env.VITE_API_URL);

export type VerifyRecoverPasswordRequest = {
  verificationCode: string;
  password: string;
};

export type PasswordRecoveryRequest = {
  email?: string;
  phoneNumber?: string;
};

// export function confirmUser(request: PasswordChangeRequest) {
//   const url = new URL('confirm', baseUrl);
//   return post(url, JSON.stringify(request));
// }

export function recoverPassword(request: PasswordRecoveryRequest) {
  const url = new URL('recover-password', baseUrl);
  return post(url, JSON.stringify(request));
}

export function verifyPasswordRecovery(request: VerifyRecoverPasswordRequest) {
  const url = new URL('verify-recover-password', baseUrl);
  return post(url, JSON.stringify(request));
}

export default function getApiToken(token: string | null) {
  if (token === null) {
    return null;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function isTokenValid(token?: any) {
  console.log('------------------- token valid called');
  if (token === null) {
    return false;
  }

  const expiry = new Date(token['exp'] * 1000);
  const isValid = expiry > new Date();
  if (!isValid) {
    localStorage.removeItem(USER_KEY);
  }
  return isValid;
}

export function getUserFromStorage() {
  const user = sessionStorage.getItem(USER_KEY);
  return user ? (JSON.parse(user) as User) : null;
}

// export function getTokenPermissions(token?: any) {
//   if (token === null) {
//     return [];
//   }

//   return token["permissions"] as string[];
// }
