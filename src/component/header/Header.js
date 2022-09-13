import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import {
  MdRecommend,
  MdOutlineRecommend,
  MdDashboardCustomize,
} from "react-icons/md";

const Header = () => {
  return (
    <div className="header-bar-area">
      <div className="header-bar-sec ">
        <div className="header-row-1 row">
          <div className="col-4">
            <div className="header-icons-container ">
              <NavLink
                className={(obj) => {
                  return `${
                    obj.isActive ? "header-nav-active" : "header-nav-inactive"
                  }`;
                }}
                to="/home"
              >
                <AiFillHome size="30px" />
              </NavLink>
              <NavLink
                className={(obj) => {
                  return `${
                    obj.isActive ? "header-nav-active" : "header-nav-inactive"
                  }`;
                }}
                to="/recommend"
              >
                <MdOutlineRecommend size="30px" />
              </NavLink>
              <NavLink
                className={(obj) => {
                  return `${
                    obj.isActive ? "header-nav-active" : "header-nav-inactive"
                  }`;
                }}
                to="/customize"
              >
                <MdDashboardCustomize size="30px" />
              </NavLink>
            </div>
          </div>
          <div className="col-4">
            <input
              placeholder="Search..."
              type="text"
              className="form-control header-search-bar mt-1"
            />
          </div>

          <div className="col-4 header-auth-btn-container-1  ">
            <div className="header-auth-btn-container-2">
              {/* <button className="header-signup-btn">Signup</button>
              <button className="header-login-btn">Login</button> */}
              <NavLink
                to="/signup"
                className={(obj) => {
                  return `header-signup-btn ${
                    obj.isActive ? "auth-btn-active" : "auth-btn-inactive"
                  }`;
                }}
              >
                Signup
              </NavLink>
              <NavLink
                to="/login"
                className={(obj) => {
                  return `header-login-btn ${
                    obj.isActive ? "auth-btn-active" : "auth-btn-inactive"
                  }`;
                }}
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
