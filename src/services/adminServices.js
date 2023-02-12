import { axiosInstance } from "./configUrl";

export const adminServices = {
  getUserList: () => {
    return axiosInstance.get("/api/users");
  },
  getJobList: () => {
    return axiosInstance.get("/api/cong-viec");
  },
  addNewJob: (jobInfo) => {
    return axiosInstance.post("/api/cong-viec", jobInfo);
  },
  getJobByID: (jobID) => {
    return axiosInstance.get(`/api/cong-viec/${jobID}`);
  },
  getJobTypeList: () => {
    return axiosInstance.get("/api/chi-tiet-loai-cong-viec");
  },

  putJobDetail: (jobID, jobDetail) => {
    return axiosInstance.put(`/api/cong-viec/${jobID}`, jobDetail);
  },
  deleteJob: (jobID) => {
    return axiosInstance.delete(`/api/cong-viec/${jobID}`);
  },

  getServiceList: () => {
    return axiosInstance.get("/api/thue-cong-viec");
  },
  getServiceByID: (serviceID) => {
    return axiosInstance.get(`/api/thue-cong-viec/${serviceID}`);
  },
  putServicebyID: (serviceID, serviceInfo) => {
    return axiosInstance.put(`/api/thue-cong-viec/${serviceID}`, serviceInfo);
  },
  postService: (serviceInfo) => {
    return axiosInstance.post("/api/thue-cong-viec", serviceInfo);
  },
  deleteService: (serviceID) => {
    return axiosInstance.delete(`/api/thue-cong-viec/${serviceID}`);
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
