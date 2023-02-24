import axios from "axios";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNSIsIkhldEhhblN0cmluZyI6IjEwLzA2LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NjM1NTIwMDAwMCIsIm5iZiI6MTY1NzczMTYwMCwiZXhwIjoxNjg2NTAyODAwfQ.RfqXFAkX0NK9-sSoSak2_Ys49ENugB0G2-zkJO_cEjQ";

export const setAuthorization = (token) => {
  axiosInstance.defaults.headers.common["TOKEN"] = token;
};

export const axiosInstance = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn",
  headers: {
    tokenCybersoft: TOKEN_CYBERSOFT,
  },
});
