import http from "./httpService";
import links from "../constants/links";
import axios from "axios";

const authUrl = links.subscriber;

function login(email, password) {
  return http.post(authUrl.postLogin, { email, password });
}

function logout() {
  localStorage.removeItem("loginObject");
}

function isLogged() {
  const lo = localStorage.getItem("loginObject");
  return lo !== null;
}

function signup(user) {
  return http.post(authUrl.signup, user);
}

function signupVerify(data) {
  return http.post(authUrl.signupVerify, data);
}

function forgetPassword(data) {
  return http.post(authUrl.postResetPassword, data);
}

function resetPassword(data) {
  return http.put(authUrl.putResetPassword, data);
}

function validatePasswordResetToken(token) {
  return http.get(authUrl.getResetPassword(token));
}


function updateInvoiceTemplate(data) {
  return http.put(authUrl.putInvoiceTemplate, data);
}


function getNewToken() {
  return new Promise((resolve, reject) => {
    const loginObject = JSON.parse(localStorage.getItem("loginObject"));
    const refreshJwt = loginObject.refreshJwt;
    const token = loginObject.jwt;
    axios
      .post(authUrl.postTokenRefresh, {
        token: token,
        refreshToken: refreshJwt,
      })
      .then((response) => {
        resolve(response.data.jwt);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default {
  login,
  logout,
  isLogged,
  getNewToken,
  signup,
  signupVerify,
  forgetPassword,
  resetPassword,
  validatePasswordResetToken,
  updateInvoiceTemplate
};
