import { axiosInstance } from "./axiosConfig";

const DESTINATIONS_URLS = {
  GET_ALL: "/destinations",
};

interface Place {
  id: number;
  title: string;
  description: string;
}
export interface GetAllPlacesResponse {
  data: Place[];
}

async function getAllPlaces(): Promise<GetAllPlacesResponse> {
  const response = await axiosInstance.get(DESTINATIONS_URLS.GET_ALL);
  return response.data;
}

export const PLACES = {
  GET_ALL: getAllPlaces,
};
