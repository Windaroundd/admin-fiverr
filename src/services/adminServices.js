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
  getUserDetail: (userID) => {
    return axiosInstance.get(`/api/users/${userID}`);
  },
  putUserInfo: (userID, userInfo) => {
    return axiosInstance.put(`/api/users/${userID}`, userInfo);
  },
  deleteUser: (userID) => {
    return axiosInstance.delete(`api/users?id=${userID}`);
  },
  searchUser: (userName) => {
    return axiosInstance.get(`/api/users/search/${userName}`);
  },
};
