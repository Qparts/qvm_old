import axios from "axios";
// import { LoaderService } from "./common/utilService";
// import { toast } from "react-toastify";
// import links from "../constants/links";
// import authService from "./authService";
// import { createBrowserHistory } from "history";

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status <= 500;

//   if (expectedError) {
//     // showHttpError(error.response.status);
//   } else toast.error("unexpected error occurred", toastErrorProperties);
//   LoaderService.sendLoad(false);
//   return Promise.reject(error);
// });

// axios.interceptors.request.use(async (req) => {
//   loadToken();
//   LoaderService.sendLoad(true);
//   return req;
// });

// axios.interceptors.response.use(
//   (res) => {
//     LoaderService.sendLoad(false);
//     return res;
//   },
//   (error) => {
//     console.log("error", error);
//     if (
//       error.response &&
//       error.response.status !== 401 &&
//       !error.config.url.includes("refresh-token")
//     ) {
//       console.log(error);
//       return new Promise((resolve, reject) => {
//         reject(error);
//       });
//     }

//     if (error.config.url.includes("refresh-token")) {
//       console.log("fail to refresh token");
//       authService.logout();
//       createBrowserHistory().push("/login");
//       window.location.reload();
//       return new Promise((resolve, reject) => {
//         reject(error);
//       });
//     }

//     if (error.response&&error.response.status == 401) {
//       return authService
//         .getNewToken()
//         .then((token) => {
//           const loginObject = JSON.parse(localStorage.getItem("loginObject"));
//           delete loginObject["jwt"];
//           loginObject.jwt = token;
//           localStorage.setItem("loginObject", JSON.stringify(loginObject));

//           const config = error.config;
//           config.headers["Authorization"] = `Bearer ${token}`;
//           return new Promise((resolve, reject) => {
//             axios
//               .request(config)
//               .then((response) => {
//                 resolve(response);
//               })
//               .catch((error) => {
//                 reject(error);
//               });
//           });
//         })
//         .catch((error) => {
//           Promise.reject(error);
//         });
//     }
//   }
// );

// function loadToken() {
//   try {
//     const loginObject = JSON.parse(localStorage.getItem("loginObject"));
//     axios.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${loginObject.jwt}`;
//   } catch (error) {
//     console.log("error");
//     console.log(error);
//   }
// }

// function showHttpError(statusCode, objectName) {
//   const errorProperties = {
//     position: "top-center",
//     autoClose: false,
//     hideProgressBar: true,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   };
//   if (statusCode == 409)
//     toast.error(objectName + " Already Exist", errorProperties);
//   else if (statusCode >= 400 && statusCode < 500)
//     toast.error("Client errors", errorProperties);
//   else if (statusCode >= 500) toast.error("Server errors", errorProperties);
// }

// loadToken();

// const toastErrorProperties = {
//   position: "top-center",
//   autoClose: false,
//   hideProgressBar: true,
//   closeOnClick: false,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// };

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // showHttpError,
  // toastErrorProperties,
};
