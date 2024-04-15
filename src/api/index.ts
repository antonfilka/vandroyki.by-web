import { API_AUTH } from "./auth";
import { PLACES } from "./places";
import { PROFILE } from "./profile";
import { S3 } from "./s3";

const API = {
  AUTH: API_AUTH,
  PLACES: PLACES,
  S3: S3,
  PROFILE: PROFILE,
};

export default API;

export const QUERY_KEYS = {
  PROFILE: "profile",
  CITIES: "cities",
  INTERESTS: "interests",
  PLACES: "places",
  SUGGESTED_PLACE: "suggested-place",
};
