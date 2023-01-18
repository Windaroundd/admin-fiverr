import { axiosInstance } from "./configUrl";

export const adminServices = {
  getUserList: () => {
    return axiosInstance.get("/api/users");
  },
  getJobList: () => {
    return axiosInstance.get("/api/cong-viec");
  },
};
