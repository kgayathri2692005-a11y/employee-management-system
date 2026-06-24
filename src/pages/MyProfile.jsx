import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import "../styles/MyProfile.css";
import { useNavigate } from "react-router-dom";

  function MyProfile() {
  const navigate = useNavigate();

  const loggedInUser =
  JSON.parse(localStorage.getItem("loggedInUser")) || {};

const allProfiles =
  JSON.parse(localStorage.getItem("allProfiles")) || {};

const profileData =
  allProfiles[loggedInUser.email] || {};
    const age =
  profileData.dob
    ? new Date().getFullYear() -
      new Date(profileData.dob).getFullYear()
    : null;
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="profile-container">
          <div className="profile-card">

            <div className="profile-header">
              <img
  src={
    profileData.profileImage ||
    "https://via.placeholder.com/150"
  }
  alt="Profile"
  className="profile-image"
/>

              <div>
                <h2>
  {loggedInUser.fullName || "N/A"}
</h2>
                <p>
  {profileData.occupation || "N/A"}
</p>
                <p>Employee ID: EMP001</p>
              </div>
            </div>

            <div className="profile-details">

              <div className="detail-box">
                <h4>Email</h4>
               <p>
  {loggedInUser.email || "Not Available"}
</p>
              </div>

              <div className="detail-box">
                <h4>Phone</h4>
                <p>9876543210</p>
              </div>

              <div className="detail-box">
                <h4>Department</h4>
                <p>Information Technology</p>
              </div>

              <div className="detail-box">
  <h4>Salary</h4>
  <p>
    {profileData.salary
      ? `₹ ${Number(
          profileData.salary
        ).toLocaleString("en-IN")}`
      : "N/A"}
  </p>
</div>
<div className="detail-box">
  <h4>Age</h4>
  <p>
    {age
      ? `${age} Years`
      : "N/A"}
  </p>
</div>

              <div className="detail-box">
                <h4>Location</h4>
                <p>
  {profileData.city || "N/A"}
</p>
              </div>

              <div className="detail-box">
                <h4>Experience</h4>
                <p>2 Years</p>
              </div>

              <div className="detail-box">
                <h4>Status</h4>
                <p>Active</p>
                <div className="status-badge">
  Active Employee
</div>
              </div>

            </div>

            <button
  className="edit-profile-btn"
  onClick={() =>
    navigate("/complete-profile")
  }
>
  ✏️ Edit Profile
</button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default MyProfile;