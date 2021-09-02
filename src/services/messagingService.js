import http from "./httpService";
import links from "../constants/links";

const messagingUrl = links.messaging;

function contactUs(message) {
  return http.post(messagingUrl.postContactUs, message);
}

export default {
  contactUs
};
