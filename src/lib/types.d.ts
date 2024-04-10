export type User = {
  id: number;
  email: string;
  role: "USER" | "MANAGER";
  firstName?: string;
  lastName?: string;
  username?: string;
  picture?: string;
};

export type BackendTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
