import { useFormik } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setUserInfo } from "../../redux-toolkit/userSlice";
import { userDataLocal } from "../../services/localService";
import { userServices } from "../../services/userServices";
import "react-datepicker/dist/react-datepicker.css";

export default function Login() {
  let dispatch = useDispatch();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      phone: "",
      birthday: new Date(),
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
          console.log("res: ", res);

          dispatch(setUserInfo(res.data.content));
          userDataLocal.set(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="login-page">
      <div className="login-form py-8 px-5 container mx-auto mt-20">
        <form onSubmit={formik.han}>
          <h1 className="uppercase text-center text-3xl pb-5">
            Sign Up to Fiverr Admin
          </h1>
          <h3 className="text-xl">Welcome to Admin Page</h3>
          <h5 className="text-base mb-5">
            Please sign-up to your account and start the adventure
          </h5>
          <div>
            <label htmlFor="">
              Name:
              <input
                className="w-full px-2 py-3 mb-4"
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </label>
          </div>
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
            <label htmlFor="">
              Confirm password:
              <input
                className="w-full px-2 py-3 mb-3"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              Phone number:
              <input
                className="w-full px-2 py-3 mb-3"
                type="text"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </label>
            <div>
              <label htmlFor="">
                Date of birth:
                <DatePicker
                  className="w-full px-2 py-3"
                  // name="birthday"
                  selected={formik.values.birthday}
                  value={formik.values.birthday}
                />
              </label>
            </div>
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
      </div>
    </div>
  );
}
