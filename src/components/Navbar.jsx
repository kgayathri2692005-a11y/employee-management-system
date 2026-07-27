import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const notificationsRead =
    localStorage.getItem("notificationsRead");
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

    // Get all interest requests
const interestRequests =
  JSON.parse(localStorage.getItem("interestRequests")) || [];

// Count only pending requests received by the logged-in user
const pendingRequests = interestRequests.filter(
  (request) =>
    request.to === loggedInUser.email &&
    request.status === "Pending"
);

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

<span
  className="navbar-notification"
  onClick={() => navigate("/notifications")}
  style={{ cursor: "pointer" }}
>
  🔔 Notifications
  {pendingRequests.length > 0 &&
 notificationsRead !== "true" && (
  <span className="notification-badge">
    {pendingRequests.length}
  </span>
)}
  
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