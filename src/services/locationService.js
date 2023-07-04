import http from "./httpService";
import links from "../constants/links";

const locationUrl = links.location;

function getCountries() {
  return http.get(locationUrl.getCountries);
}

function searchLocation(query) {
  return http.post(locationUrl.postSearchLocation, { query });
}
export default {
  getCountries,
  searchLocation
};
