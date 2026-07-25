import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // Get currently logged-in user
  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  // Get all profiles
  const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};

  // Get profile of currently logged-in user only
  const profileData =
    allProfiles[loggedInUser.email] || {};

  // Create full name from CompleteProfile data
  const fullName = [
    profileData.firstName,
    profileData.lastName
  ]
    .filter(Boolean)
    .join(" ");

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

          {/* Profile Image */}
          <img
            src={
              profileData?.profileImage ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
            }
            alt="Profile"
            className="navbar-profile-img"
          />

          {/* User Name */}
          <span className="navbar-profile-name">
            {fullName || loggedInUser?.userName || "User"}
          </span>

        </div>

        {/* Logout */}
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