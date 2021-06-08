import http from "./httpService";
import links from "../constants/links";

const planUrl = links.plan;



function getPlans() {
  return http.get(planUrl.getPlans);
}

const getPlansFeatures = () => {
  return http.get(planUrl.getPlansFeatures);
};


const activePromtion = (code, plan, duration) => {
  let serviceUrl = planUrl.getPromtion;
  serviceUrl = code != null ? serviceUrl + 'code=' + code + "&" : serviceUrl;
  serviceUrl = plan != null ? serviceUrl + 'plan=' + plan + '&' : serviceUrl;
  serviceUrl = duration != null ? serviceUrl + 'duration=' + duration : serviceUrl;
  return http.get(serviceUrl);
}

export default {
  getPlans,
  getPlansFeatures,
  activePromtion
};
