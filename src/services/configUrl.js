import axios from "axios";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNSIsIkhldEhhblN0cmluZyI6IjEwLzA2LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NjM1NTIwMDAwMCIsIm5iZiI6MTY1NzczMTYwMCwiZXhwIjoxNjg2NTAyODAwfQ.RfqXFAkX0NK9-sSoSak2_Ys49ENugB0G2-zkJO_cEjQ";

export const axiosInstance = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn",
  headers: {
    tokenCybersoft: TOKEN_CYBERSOFT,
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
