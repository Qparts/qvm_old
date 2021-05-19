import axios from "axios";
import authService from "./authService";
import { createBrowserHistory } from "history";


axios.interceptors.response.use(
  (res) => {
    // LoaderService.sendLoad(false);
    return res;
  },
  (error) => {
    console.log("error", error);
    if (
      error.response &&
      error.response.status !== 401 &&
      !error.config.url.includes("refresh-token")
    ) {
      console.log(error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.config.url.includes("refresh-token")) {
      console.log("fail to refresh token");
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common.Authorization;
      createBrowserHistory().push("/login");
      window.location.reload();
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response && error.response.status == 401) {
      return authService
        .getNewToken()
        .then((token) => {
          const loginObject = JSON.parse(localStorage.getItem("loginObject"));
          delete loginObject["jwt"];
          loginObject.jwt = token;
          localStorage.setItem("loginObject", JSON.stringify(loginObject));
          const config = error.config;
          localStorage.setItem('accessToken', token);
          config.headers["Authorization"] = `Bearer ${token}`;
          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((error) => {
          Promise.reject(error);
        });
    }
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
