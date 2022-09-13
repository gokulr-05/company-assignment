import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-area">
      <div className="header-sec">
        <Link to="/home" className="header-nav-link">
          Home
        </Link>
        <Link to="/recommendation" className="header-nav-link">
          Recommendation
        </Link>
        <Link to="/customrecommendation" className="header-nav-link">
          Customization
        </Link>
        <input
          type="text"
          className="header-searchbar"
          placeholder="Search..."
        />

        <div className="header-auth">
          <button className="header-auth-btn">SignUp</button>
          <button className="header-auth-btn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
