import React from "react";
import { useSelector } from "react-redux";
import { userDataLocal } from "../services/localService";

export default function AuthenProtected({ children }) {
  let { token } = userDataLocal.get();
  console.log("token: ", token);
  return <div>{children}</div>;
}
