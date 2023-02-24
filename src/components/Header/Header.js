import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import fiverr_logo from "../../assets/images/Font-Fiverr-Logo.jpg";

export default function Header() {
  let { name } = useSelector((state) => {
    return state.userSlice.user.user;
  });

  return (
    <header>
      <div className="container flex justify-between items-center py-5 border-b-2">
        <div
          className="header-left flex items-center font-semibold text-lg
        "
        >
          <div className="ml-3 mr-3">
            <NavLink to="/">
              <img className="w-28 " src={fiverr_logo} alt="" />
            </NavLink>
          </div>
          <div className="ml-3 mr-3">
            <NavLink to="/user">User</NavLink>
          </div>
          <div className="ml-3 mr-3">
            <NavLink to="/job">Job</NavLink>
          </div>
          <div className="ml-3 mr-3">
            <NavLink to="/job-type">Job Type</NavLink>
          </div>
          <div className="ml-3 mr-3">
            <NavLink to="/services">Services</NavLink>
          </div>
        </div>
        <div className="header-right flex items-center">
          <div className="mr-3">
            <i className="fa fa-cog"></i>
          </div>
          <div className="bg-gray-400 user-avatar p-1 text-center">
            {name?.slice(0, 2)}
          </div>
        </div>
      </div>
    </header>
  );
}
