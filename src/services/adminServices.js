import { axiosInstance } from "./configUrl";

export const adminServices = {
  getUserList: () => {
    return axiosInstance.get("/api/users");
  },
  deleteUser: (userID) => {
    return axiosInstance.delete(`api/users?id=${userID}`);
  },
  getJobList: () => {
    return axiosInstance.get("/api/cong-viec");
  },
  getJobTypeList: () => {
    return axiosInstance.get("/api/chi-tiet-loai-cong-viec");
  },
  getServiceList: () => {
    return axiosInstance.get("/api/thue-cong-viec");
  },
  addNewUser: (userInfo) => {
    return axiosInstance.post("/api/users", userInfo);
  },
};
