import "../styles/ViewProfile.css";
import { useLocation, useNavigate } from "react-router-dom";

function ViewProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const employee = location.state;

  // Safety check
  if (!employee) {
    return (
      <div className="view-profile-container">
        <h2>No employee data found</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/users")}
        >
          ← Back to Employees
        </button>
      </div>
    );
  }

  // Get full profile from localStorage
  const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};

  const fullProfile =
    allProfiles[employee.email] || {};

  const {
    image,
    name,
    designation,
    email,
    id
  } = employee;

  return (
    <div className="view-profile-container">
      <div className="profile-card">

        <button
          className="back-btn"
          onClick={() => navigate("/users")}
        >
          ← Back to Employees
        </button>

        <div className="profile-header"></div>

        <img
          src={image || "https://via.placeholder.com/150"}
          alt={name}
          className="profile-image"
        />

        <div className="profile-info">
          <h1>{name}</h1>
          <p>{designation}</p>
        </div>

        <div className="profile-stats">

          <div className="stat-card">
            <h4>Email</h4>
            <p>{email}</p>
          </div>

          <div className="stat-card">
            <h4>Employee ID</h4>
            <p>EMP-{id}</p>
          </div>

          <div className="stat-card">
            <h4>Status</h4>
            <p className="active-status">Active</p>
          </div>

        </div>

        {/* Personal Information */}
        <div className="info-section">
          <h3>Personal Information</h3>

          <div className="info-grid">
            <div className="label">Gender</div>
            <div>{fullProfile.gender || "Not Available"}</div>

            <div className="label">Date Of Birth</div>
            <div>{fullProfile.dob || "Not Available"}</div>

            <div className="label">Education</div>
            <div>{fullProfile.education || "Not Available"}</div>

            <div className="label">Father Name</div>
            <div>{fullProfile.fatherName || "Not Available"}</div>

            <div className="label">Mother Name</div>
            <div>{fullProfile.motherName || "Not Available"}</div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="info-section">
          <h3>Professional Information</h3>

          <div className="info-grid">
            <div className="label">Occupation</div>
            <div>{fullProfile.occupation || "Not Available"}</div>

            <div className="label">Salary</div>
            <div>{fullProfile.salary || "Not Available"}</div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="info-section">
          <h3>Contact Information</h3>

          <div className="info-grid">
            <div className="label">City</div>
            <div>{fullProfile.city || "Not Available"}</div>

            <div className="label">State</div>
            <div>{fullProfile.stateName || "Not Available"}</div>

            <div className="label">Address</div>
            <div>{fullProfile.address || "Not Available"}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewProfile;