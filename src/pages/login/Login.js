import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setUserInfo } from "../../redux-toolkit/userSlice";
import { userDataLocal } from "../../services/localService";
import { userServices } from "../../services/userServices";

export default function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("You must to fill this section"),
      password: Yup.string().required("You must to fill this section"),
    }),
    onSubmit: (userAccount) => {
      userServices
        .postUserSingin(userAccount)
        .then((res) => {
          dispatch(setUserInfo(res.data.content));
          userDataLocal.set(res.data.content);
          navigate("/user");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="login-page">
      <div className="login-form py-8 px-5 container mx-auto mt-20">
        <form action="" onSubmit={formik.handleSubmit}>
          <h1 className="uppercase text-center text-3xl pb-5">
            Sign In to Fiverr Admin
          </h1>
          <h3 className="text-xl">Welcome to Admin Page</h3>
          <h5 className="text-base mb-5">
            Please sign-in to your account and start the adventure
          </h5>
          <div>
            <label htmlFor="">
              Email:
              <input
                className="w-full px-2 py-3 mb-4"
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              Password:
              <input
                className="w-full px-2 py-3 mb-3"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="uppercase w-full px-2 py-3 text-white font-bold rounded-md bg-green-500 mt-5"
            >
              login
            </button>
          </div>
        </form>
        <div className="w-full border-t-2 mt-5 text-center">
          <h5 className="mt-3">
            Not a member yer?
            <NavLink to="/signup" className="text-green-500 ml-3">
              Join now
            </NavLink>
          </h5>
        </div>
      </div>
    </div>
  );
}
