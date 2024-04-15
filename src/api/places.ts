import { axiosInstance } from "./axiosConfig";

const DESTINATIONS_URLS = {
  GET_ALL: "/destinations",
  CREATE: "/destinations",
  GET_CITIES: "/editable-constants/cities",
  ADD_CITIES: "/editable-constants/cities",
  DELETE_CITIES: "/editable-constants/cities/delete",
  GET_INTERESTS: "/editable-constants/interests",
  ADD_INTERESTS: "/editable-constants/interests",
  DELETE_INTERESTS: "/editable-constants/interests/delete",
};

interface Place {
  id: number;
  title: string;
  description: string;
}
export interface GetAllPlacesResponse {
  data: Place[];
}

export interface CreatePLaceBody {
  title: string;
  description: string;
  images: string[];
  location: string;
}

interface City {
  id: string;
  name: string;
}
interface Interest {
  id: string;
  name: string;
}
export interface GetCitiesResponse {
  data: City[];
}
export interface GetInterestsResponse {
  data: Interest[];
}

export interface CreateConstantsBody {
  names: string[];
}
export interface DeleteConstantsBody {
  ids: string[];
}

async function getAllPlaces(): Promise<GetAllPlacesResponse> {
  const response = await axiosInstance.get(DESTINATIONS_URLS.GET_ALL);
  return response.data;
}

async function createPlace(body: CreatePLaceBody): Promise<void> {
  const response = await axiosInstance.post(DESTINATIONS_URLS.CREATE, body);
  return response.data;
}

async function getCities(): Promise<GetCitiesResponse> {
  const response = await axiosInstance.get(DESTINATIONS_URLS.GET_CITIES);
  return response.data;
}

async function createCities(body: CreateConstantsBody): Promise<void> {
  const response = await axiosInstance.post(DESTINATIONS_URLS.ADD_CITIES, body);
  return response.data;
}

async function deleteCities(body: DeleteConstantsBody): Promise<void> {
  const response = await axiosInstance.post(
    DESTINATIONS_URLS.DELETE_CITIES,
    body
  );
  return response.data;
}

async function getInterests(): Promise<GetInterestsResponse> {
  const response = await axiosInstance.get(DESTINATIONS_URLS.GET_INTERESTS);
  return response.data;
}

async function createInterests(body: CreateConstantsBody): Promise<void> {
  const response = await axiosInstance.post(
    DESTINATIONS_URLS.ADD_INTERESTS,
    body
  );
  return response.data;
}

async function deleteInterests(body: DeleteConstantsBody): Promise<void> {
  const response = await axiosInstance.post(
    DESTINATIONS_URLS.DELETE_INTERESTS,
    body
  );
  return response.data;
}

export const PLACES = {
  GET_ALL: getAllPlaces,
  CREATE: createPlace,
  GET_CITIES: getCities,
  ADD_CITIES: createCities,
  DELETE_CITIES: deleteCities,
  GET_INTERESTS: getInterests,
  ADD_INTERESTS: createInterests,
  DELETE_INTERESTS: deleteInterests,
};
