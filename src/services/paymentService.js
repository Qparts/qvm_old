import http from "./httpService";
import links from "../constants/links";

const planUrl = links.plan;
const invoiceUrl = links.invoice;

function getPlans() {
  return http.get(planUrl.getPlans);
}

const activePromtion = (code, plan, duration) => {
  let serviceUrl = planUrl.getPromtion;
  serviceUrl = code != null ? serviceUrl + 'code=' + code + "&" : serviceUrl;
  serviceUrl = plan != null ? serviceUrl + 'plan=' + plan + '&' : serviceUrl;
  serviceUrl = duration != null ? serviceUrl + 'duration=' + duration : serviceUrl;
  return http.get(serviceUrl);
}

const getBancks = () => {
  return http.get(invoiceUrl.getBanks);
};

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


const updatePaymentOrder = (data) => {
  return http.put(invoiceUrl.paymentOrder, data);
};

const getPendingSubscription = () => {
  return http.get(invoiceUrl.pendingSubscription);
};

const getfundRequests = () => {
  return http.get(invoiceUrl.getFundRequests);
};

function fundRequestUpload(data) {
  const config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  };
  return http.post(invoiceUrl.postFundRequest, data, config);
}

export default {
  getPlans,
  activePromtion,
  getBancks,
  paymentOrder,
  updatePaymentOrder,
  wirePaymentOrder,
  getPendingSubscription,
  fundRequestUpload,
  getfundRequests,
};
