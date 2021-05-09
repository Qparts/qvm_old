import http from "./httpService";
import links from "../constants/links";

const locationUrl = links.location;

function getCountries() {
  return http.get(locationUrl.getCountries);
}

export default {
  getCountries,
};
