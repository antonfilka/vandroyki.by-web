import { axiosInstance } from "./axiosConfig";

const AUTH_URLS = {
  SIGN_UP: "/auth/register",
  SIGN_IN: "/auth/login",
  REFRESH: "/auth/refresh",
  GET_MY_PROFILE: "/users",
};

interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

interface SignUpResponse {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}
interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: {
    id: number;
    role: "USER" | "MANAGER";
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface GetMyProfileResponse {
  id: number;
  username?: string;
  accessToken?: string;
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  role: "USER" | "MANAGER";
}

async function SignUp(data: SignUpPayload): Promise<SignUpResponse> {
  const response = await axiosInstance.post(AUTH_URLS.SIGN_UP, data);
  return response.data;
}
async function SignIn(data: SignInPayload): Promise<SignInResponse> {
  const response = await axiosInstance.post(AUTH_URLS.SIGN_IN, data);
  return response.data;
}

async function GetMyProfile(
  accessToken: string
): Promise<GetMyProfileResponse> {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
  const response = await axiosInstance.get(AUTH_URLS.GET_MY_PROFILE);
  return response.data;
}

export const API_AUTH = {
  SIGN_UP: SignUp,
  SIGN_IN: SignIn,
  GET_MY_PROFILE: GetMyProfile,
};
