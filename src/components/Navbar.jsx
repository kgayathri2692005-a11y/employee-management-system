import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const loggedInUser =
  JSON.parse(localStorage.getItem("loggedInUser")) || {};

const allProfiles =
  JSON.parse(localStorage.getItem("allProfiles")) || {};

const profileData =
  allProfiles[loggedInUser.email] || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="navbar">

      {/* Left Side - Logo + Title */}
      <div className="navbar-left">

       <img
  src="/logo.jpeg"
  alt="EMS Logo"
  className="navbar-logo"
/>
        <h2>EMS Portal</h2>

      </div>

      {/* Right Side */}
      <div className="navbar-right">

        <span className="navbar-notification">
          🔔 Notifications
        </span>

        <div className="navbar-profile-container">

          <img
  src={profileData?.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"}
  alt="Profile"
  className="navbar-profile-img"
/>
          <span className="navbar-profile-name">
            {loggedInUser?.userName || "User"}
          </span>

        </div>

        <button
          className="navbar-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;