/* eslint-disable no-restricted-globals */
import axios from "axios";
import nProgress from "nprogress";

axios.defaults.baseURL = "https://api.morethanblog.tk";
axios.defaults.headers.common.Accept = "application/json";

axios.interceptors.request.use(config => {
  nProgress.start();
  return config;
});

axios.interceptors.response.use(
  response => {
    nProgress.done();
    return checkStatus(response);
  },
  error => Promise.reject(checkStatus(error.response))
);

export const callApi = (
  endpoint,
  method = "GET",
  body,
  headers = { "Content-Type": "application/json" }
) => {
  return axios({
    method,
    url: `${endpoint}`,
    headers: { ...headers },
    data: body,
  });
};

export const callAuthorizationApi = (
  endpoint,
  method = "GET",
  body,
  headers = { "Content-Type": "application/json" }
) => {
  const token = localStorage.getItem("token");
  return callApi(endpoint, method, body, {
    ...headers,
    Authorization: `Bearer ${token}`,
  });
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401 || response.status === 403) {
    logout();
    window.location.reload();
  }
  return response.data;
}

export function uploadImage(file) {
  const formData = new FormData();
  formData.append("File", file);
  formData.append("Folder", "cover");

  return callAuthorizationApi("/files", "POST", formData, {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  });
}

function logout() {
  // remove user from local storage to log user out
  console.log("logging out");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}
