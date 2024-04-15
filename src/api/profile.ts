import { LanguageCode, Role } from "@/lib/types";
import { axiosInstance } from "./axiosConfig";

const PROFILE_URLS = {
  GET_PROFILE: "/users",
};

interface GetMyProfileUser {
  city: {
    id: string;
    name: string;
  };
  id: string;
  location: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  restPictures: string[];
  role: Role;
  bio: string;
  language: LanguageCode;
}
export interface GetMyProfile {
  data: GetMyProfileUser;
}

async function getProfile(): Promise<GetMyProfile> {
  const response = await axiosInstance.get(PROFILE_URLS.GET_PROFILE);
  return response.data;
}

export const PROFILE = {
  GET_PROFILE: getProfile,
};
