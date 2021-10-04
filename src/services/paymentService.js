import http from "./httpService";
import links from "../constants/links";

const planUrl = links.plan;
const invoiceUrl = links.invoice;



function getPlans() {
  return http.get(planUrl.getPlans);
}

const getPlansFeatures = () => {
  return http.get(planUrl.getPlansFeatures);
};

const getBancks = () => {
  return http.get(invoiceUrl.getBanks);
};

const activePromtion = (code, plan, duration) => {
  let serviceUrl = planUrl.getPromtion;
  serviceUrl = code != null ? serviceUrl + 'code=' + code + "&" : serviceUrl;
  serviceUrl = plan != null ? serviceUrl + 'plan=' + plan + '&' : serviceUrl;
  serviceUrl = duration != null ? serviceUrl + 'duration=' + duration : serviceUrl;
  return http.get(serviceUrl);
}

const paymentOrder = (data) => {
  return http.post(invoiceUrl.paymentOrder, data);
};

function wirePaymentOrder(data) {
  const config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    }
  }
  return http.post(invoiceUrl.wirepaymentOrder, data, config);
}

function fundRequestUpload(data) {
  const config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  };
  return http.post(invoiceUrl.postFundRequest, data, config);
}

const updatePaymentOrder = (data) => {
  return http.put(invoiceUrl.paymentOrder, data);
};

const getPendingSubscription = () => {
  return http.get(invoiceUrl.pendingSubscription);
};

export default {
  getPlans,
  getPlansFeatures,
  activePromtion,
  getBancks,
  paymentOrder,
  updatePaymentOrder,
  wirePaymentOrder,
  getPendingSubscription,
  fundRequestUpload
};
