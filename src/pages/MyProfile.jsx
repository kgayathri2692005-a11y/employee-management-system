import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import "../styles/Dashboard.css";
import "../styles/MyProfile.css";

function MyProfile() {
  const navigate = useNavigate();

  // =========================================================
  // LOGGED IN USER
  // =========================================================

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  // =========================================================
  // ALL PROFILES
  // =========================================================

  const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};

  // =========================================================
  // CURRENT USER PROFILE
  // =========================================================

  const profileData =
    allProfiles[loggedInUser.email] || {};

  // =========================================================
  // DISPLAY NAME
  // =========================================================

  const displayName =
    profileData.firstName ||
    profileData.lastName
      ? `${profileData.firstName || ""} ${
          profileData.lastName || ""
        }`.trim()
      : loggedInUser.userName ||
        loggedInUser.fullName ||
        "User";

  // =========================================================
  // CALCULATE AGE
  // =========================================================

  const calculateAge = (dob) => {
    if (!dob) return "N/A";

    const birthDate = new Date(dob);
    const today = new Date();

    let age =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDifference =
      today.getMonth() -
      birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (
        monthDifference === 0 &&
        today.getDate() <
          birthDate.getDate()
      )
    ) {
      age--;
    }

    return `${age} Years`;
  };

  // =========================================================
  // LOCATION
  // =========================================================

  const locationText = [
    profileData.currentCity,
    profileData.currentState,
    profileData.currentCountry
  ]
    .filter(Boolean)
    .join(", ");

  // =========================================================
  // EDIT PROFILE
  // =========================================================

const handleEditProfile = (step) => {
  navigate(`/complete-profile?edit=true&step=${step}`);
};

  return (
    <div className="dashboard">


      <div className="main-content">

        <Navbar />

        <div className="profile-container">

          <div className="profile-card">

            {/* =================================================
                PROFILE HEADER
            ================================================= */}

            <div className="profile-header">

              <img
                src={
                  profileData.profilePhoto ||
                  profileData.profileImage ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="profile-image"
              />

              <div className="profile-header-info">

                <h2>
                  {displayName}
                </h2>

                <p>
                  {profileData.occupation ||
                    "Occupation not added"}
                </p>

                <p>
                  {locationText ||
                    "Location not added"}
                </p>

              </div>

            </div>


            {/* =================================================
                7 PROFILE STAGE CARDS
            ================================================= */}

            <div className="profile-stage-grid">


              {/* =================================================
                  1. BASIC INFORMATION
              ================================================= */}

              <div className="profile-stage-card">

                <h3>
                  👤 Basic Information
                </h3>

                <div className="stage-info">

                  <p>
                    <span>Name:</span>
                    {displayName}
                  </p>

                  <p>
                    <span>Gender:</span>
                    {profileData.gender || "N/A"}
                  </p>

                  <p>
                    <span>Age:</span>
                    {calculateAge(profileData.dob)}
                  </p>

                  <p>
                    <span>Marital Status:</span>
                    {profileData.maritalStatus || "N/A"}
                  </p>

                </div>

                <button
  className="stage-edit-btn"
  onClick={() => handleEditProfile(1)}
>
  ✏️ Edit
</button>

              </div>


              {/* =================================================
                  2. RELIGION & LOCATION
              ================================================= */}

              <div className="profile-stage-card">

                <h3>
                  🌍 Religion & Location
                </h3>

                <div className="stage-info">

                  <p>
                    <span>Religion:</span>
                    {profileData.religion || "N/A"}
                  </p>

                  <p>
                    <span>Mother Tongue:</span>
                    {profileData.motherTongue || "N/A"}
                  </p>

                  <p>
                    <span>City:</span>
                    {profileData.currentCity || "N/A"}
                  </p>

                  <p>
                    <span>State:</span>
                    {profileData.currentState || "N/A"}
                  </p>

                </div>

                <button
                  className="stage-edit-btn"
                 onClick={() => handleEditProfile(2)}
                >
                  ✏️ Edit
                </button>

              </div>


              {/* =================================================
                  3. EDUCATION & CAREER
              ================================================= */}

              <div className="profile-stage-card">

                <h3>
                  🎓 Education & Career
                </h3>

                <div className="stage-info">

                  <p>
                    <span>Qualification:</span>
                    {profileData.qualification || "N/A"}
                  </p>

                  <p>
                    <span>College:</span>
                    {profileData.college || "N/A"}
                  </p>

                  <p>
                    <span>Occupation:</span>
                    {profileData.occupation || "N/A"}
                  </p>

                  <p>
                    <span>Income:</span>
                    {profileData.income
                      ? `₹${profileData.income}`
                      : "N/A"}
                  </p>

                </div>

                <button
                  className="stage-edit-btn"
                  onClick={() => handleEditProfile(3)}
                >
                  ✏️ Edit
                </button>

              </div>


              {/* =================================================
                  4. FAMILY & LIFESTYLE
              ================================================= */}

              <div className="profile-stage-card">

                <h3>
                  🏠 Family & Lifestyle
                </h3>

                <div className="stage-info">

                  <p>
                    <span>Father:</span>
                    {profileData.fatherName || "N/A"}
                  </p>

                  <p>
                    <span>Mother:</span>
                    {profileData.motherName || "N/A"}
                  </p>

                  <p>
                    <span>Family Type:</span>
                    {profileData.familyType || "N/A"}
                  </p>

                  <p>
                    <span>Food:</span>
                    {profileData.foodPreference || "N/A"}
                  </p>

                </div>

                <button
                  className="stage-edit-btn"
                  onClick={() => handleEditProfile(4)}
                >
                  ✏️ Edit
                </button>

              </div>


              {/* =================================================
                  5. PARTNER PREFERENCE
              ================================================= */}

              <div className="profile-stage-card">

                <h3>
                  💕 Partner Preference
                </h3>

                <div className="stage-info">

                  <p>
                    <span>Age:</span>

                    {profileData.partnerAgeFrom &&
                    profileData.partnerAgeTo
                      ? `${profileData.partnerAgeFrom} - ${profileData.partnerAgeTo}`
                      : "N/A"}
                  </p>

                  <p>
                    <span>Education:</span>
                    {profileData.partnerEducation || "N/A"}
                  </p>

                  <p>
                    <span>Occupation:</span>
                    {profileData.partnerOccupation || "N/A"}
                  </p>

                  <p>
                    <span>Location:</span>
                    {profileData.partnerCountry || "N/A"}
                  </p>

                </div>

                <button
                  className="stage-edit-btn"
                  onClick={() => handleEditProfile(5)}
                >
                  ✏️ Edit
                </button>

              </div>


              {/* =================================================
                  6. PHOTOS
              ================================================= */}

              <div className="profile-stage-card">

                <h3>
                  📸 Photos
                </h3>

                <div className="stage-info">

                  <p>
                    <span>Profile Photo:</span>

                    {profileData.profilePhoto ||
                    profileData.profileImage
                      ? "✓ Added"
                      : "Not Added"}
                  </p>

                  <p>
                    <span>Photo Status:</span>

                    {profileData.profilePhoto ||
                    profileData.profileImage
                      ? "Available"
                      : "Pending"}
                  </p>

                </div>

                <button
                  className="stage-edit-btn"
                  onClick={() => handleEditProfile(6)}
                >
                  ✏️ Edit
                </button>

              </div>


              {/* =================================================
                  7. VERIFICATION
              ================================================= */}

              <div className="profile-stage-card verification-card">

                <h3>
                  🛡️ Verification
                </h3>

                <div className="stage-info">

                  <p>
                    <span>Mobile:</span>

                    {profileData.mobileNumber
                      ? "✓ Added"
                      : "Pending"}
                  </p>

                  <p>
                    <span>Email:</span>

                    {profileData.email
                      ? "✓ Added"
                      : "Pending"}
                  </p>

                  <p>
                    <span>ID Verification:</span>
                    Pending
                  </p>

                </div>

                <button
                  className="stage-edit-btn"
                  onClick={() => handleEditProfile(7)}
                >
                  ✏️ Edit
                </button>

              </div>


            </div>


            {/* =================================================
                BOTTOM ACTION BUTTONS
            ================================================= */}

            <div className="profile-action-buttons">

              <button
  className="view-profile-btn"
  onClick={() =>
    navigate("/view-profile", {
      state: {
        from: "my-profile"
      }
    })
  }
>
  👁 View Full Profile
</button>

            </div>


          </div>

        </div>

              <PageNavigation
          previous="/inbox"
          next="/tracking"
        />

      </div>

    
    </div>
  );
}

export default MyProfile;