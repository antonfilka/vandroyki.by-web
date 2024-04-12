export type User = {
  id: number;
  email: string;
  role: Role;
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

export type TelegramAuthPayload = {
  id: number;
  username?: string;
  firstName: string;
  lastName?: string;
  picture?: string;
  authDate: number;
  hash: string;
};

export type Role = "MANAGER" | "USER" | "ADMIN";
