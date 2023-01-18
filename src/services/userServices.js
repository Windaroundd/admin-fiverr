import { axiosInstance } from "./configUrl";

export const userServices = {
  postUserSingin: (userAccout) => {
    return axiosInstance.post("/api/auth/signin", userAccout);
  },
  postUserSignup: (userAccout) => {
    return axiosInstance.post("/api/auth/signup", userAccout);
  },
};
