export type User = {
  id: number;
  username: string;
  email?: string;
  roles: string[];
  token: string;
  refreshToken: string;
};
