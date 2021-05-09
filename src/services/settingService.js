import http from "./httpService";
import links from "../constants/links";

const settingUrl = links.setting;
const authUrl = links.subscriber;

function addBranch(branch) {
  return http.post(settingUrl.addBranch, branch);
}

function updateDefaultPolicy(policyId) {
  //object body = {"policyId" : 1}
  return http.put(settingUrl.putDefaultPolicy, { policyId });
}

function updateDefaultCustomer(customerId) {
  //object body = {"customerId" : 1}
  return http.put(settingUrl.putDefaultCustomer, { customerId });
}

function updateDefaultBranch(branchId) {
  //object body = {"branchId" : 1}
  return http.put(settingUrl.putDefaultBranch, { branchId });
}

function updateSettingVeriables(varsObject) {
  //object body = { "vatNumber" : "somenumber", "defaultPurchaseTax" : 0.15 , "defaultSalesTax" : 0.15 }
  return http.put(settingUrl.putSettingVariables, varsObject);
}

function refreshToken(token, refreshJwt) {
  return http.post(authUrl.postTokenRefresh, {
    token: token,
    refreshToken: refreshJwt,
  });
}

function addUser(user) {
  return http.post(settingUrl.addUser, user);
}

function verifyUser(code) {
  return http.put(settingUrl.verifyUser, code);
}

function getUsers() {
  return http.get(settingUrl.getUsers);
}

export default {
  addBranch,
  updateDefaultPolicy,
  updateDefaultCustomer,
  updateDefaultBranch,
  updateSettingVeriables,
  refreshToken,
  addUser,
  getUsers,
  verifyUser
};
