import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/Dashboard.css";
import "../styles/DashboardUserDetails.css";

function DashboardUserDetails() {

  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [pairs, setPairs] = useState([]);

  const type =
    location.state?.type || "totalUsers";

  /*
  =========================================================
  GET CURRENT USER STATUS
  =========================================================
  */

  const getUserStatus = (profile) => {

    // Explicit isActive has highest priority

    if (profile?.isActive === true) {
      return "Active";
    }

    if (profile?.isActive === false) {
      return "Inactive";
    }

    // Explicit status comes next

    if (
      typeof profile?.status === "string" &&
      profile.status.trim() !== ""
    ) {

      const status =
        profile.status
          .trim()
          .toLowerCase();

      if (status === "active") {
        return "Active";
      }

      if (status === "inactive") {
        return "Inactive";
      }
    }

    /*
    If no explicit active/inactive information
    exists, the profile currently exists in
    allProfiles, so consider it Active.
    */

    return "Active";
  };

  /*
  =========================================================
  GET PROFILE IMAGE
  =========================================================

  IMPORTANT:

  profilePhoto = actual uploaded photo

  profileImage = may contain default/demo image

  Therefore profilePhoto MUST come first.
  =========================================================
  */

  const getProfileImage = (profile) => {

    if (!profile) {
      return "";
    }

    /*
    1. ACTUAL UPLOADED PROFILE PHOTO
    */

    if (
      typeof profile.profilePhoto === "string" &&
      profile.profilePhoto.trim() !== ""
    ) {

      return profile.profilePhoto;

    }

    /*
    2. ACTUAL ADDITIONAL PHOTO
    */

    if (
      Array.isArray(profile.additionalPhotos) &&
      profile.additionalPhotos.length > 0
    ) {

      const photo =
        profile.additionalPhotos.find(
          (item) =>
            typeof item === "string" &&
            item.trim() !== ""
        );

      if (photo) {
        return photo;
      }

    }

    /*
    3. PROFILE IMAGE

    Only use this when there is no uploaded
    profilePhoto or additional photo.
    */

    if (
      typeof profile.profileImage === "string" &&
      profile.profileImage.trim() !== ""
    ) {

      return profile.profileImage;

    }

    /*
    4. FINAL FALLBACK
    */

    return "https://randomuser.me/api/portraits/lego/1.jpg";

  };

  /*
  =========================================================
  GET PROFILE NAME
  =========================================================
  */

  const getProfileName = (
    profile,
    email
  ) => {

    const fullName =
      `${profile?.firstName || ""} ${
        profile?.lastName || ""
      }`.trim();

    return (
      fullName ||
      profile?.userName ||
      profile?.fullName ||
      email ||
      "Unknown User"
    );

  };

  /*
  =========================================================
  GET PHONE
  =========================================================
  */

  const getPhone = (profile) => {

    return (
      profile?.phone ||
      profile?.phoneNumber ||
      profile?.mobile ||
      profile?.mobileNumber ||
      "Phone number not added"
    );

  };

  /*
  =========================================================
  GET OCCUPATION
  =========================================================
  */

  const getOccupation = (profile) => {

    return (
      profile?.occupation ||
      "Occupation not added"
    );

  };

  /*
  =========================================================
  GET LOCATION
  =========================================================
  */

  const getCity = (profile) => {

    return (
      profile?.currentCity ||
      profile?.city ||
      ""
    );

  };

  const getState = (profile) => {

    return (
      profile?.currentState ||
      profile?.stateName ||
      profile?.state ||
      ""
    );

  };

  /*
  =========================================================
  LOAD DATA
  =========================================================
  */

  useEffect(() => {

    const allProfiles =
      JSON.parse(
        localStorage.getItem(
          "allProfiles"
        )
      ) || {};

    const matchedUsers =
      JSON.parse(
        localStorage.getItem(
          "matchedUsers"
        )
      ) || [];

    const profilesArray =
      Object.entries(allProfiles);

    /*
    =========================================================
    FILTER USERS
    =========================================================
    */

    let filteredUsers =
      profilesArray;

    if (type === "activeUsers") {

      filteredUsers =
        profilesArray.filter(
          ([, profile]) =>
            getUserStatus(profile) === "Active"
        );

    }

    if (type === "inactiveUsers") {

      filteredUsers =
        profilesArray.filter(
          ([, profile]) =>
            getUserStatus(profile) === "Inactive"
        );

    }

    /*
    =========================================================
    FORMAT USERS
    =========================================================
    */

    const formattedUsers =
      filteredUsers.map(
        ([email, profile]) => {

          return {

            email,

            name:
              getProfileName(
                profile,
                email
              ),

            /*
            IMPORTANT:

            This now prioritizes profilePhoto.
            */

            image:
              getProfileImage(
                profile
              ),

            phone:
              getPhone(
                profile
              ),

            occupation:
              getOccupation(
                profile
              ),

            city:
              getCity(
                profile
              ),

            state:
              getState(
                profile
              ),

            gender:
              profile?.gender ||
              "",

            age:
              profile?.age ||
              "",

            status:
              getUserStatus(
                profile
              )

          };

        }
      );

    setUsers(
      formattedUsers
    );

    /*
    =========================================================
    FORMAT MATCHED PAIRS
    =========================================================
    */

    const formattedPairs =
      Array.isArray(matchedUsers)
        ? matchedUsers.map(
            (match) => {

              const user1 =
                allProfiles[
                  match.user1
                ] || {};

              const user2 =
                allProfiles[
                  match.user2
                ] || {};

              return {

                user1Email:
                  match.user1,

                user2Email:
                  match.user2,

                user1Name:
                  getProfileName(
                    user1,
                    match.user1
                  ),

                user2Name:
                  getProfileName(
                    user2,
                    match.user2
                  ),

                /*
                IMPORTANT:

                Same image logic is used
                for matched users.
                */

                user1Image:
                  getProfileImage(
                    user1
                  ),

                user2Image:
                  getProfileImage(
                    user2
                  )

              };

            }
          )
        : [];

    setPairs(
      formattedPairs
    );

  }, [type]);

  /*
  =========================================================
  PAGE TITLE
  =========================================================
  */

  const getTitle = () => {

    if (type === "activeUsers") {
      return "🟢 Active Users";
    }

    if (type === "inactiveUsers") {
      return "⚪ Inactive Users";
    }

    if (type === "totalPairs") {
      return "💞 Total Matched Pairs";
    }

    return "👥 All Users";

  };

  /*
  =========================================================
  OPEN PROFILE
  =========================================================
  */

  const openProfile = (email) => {

    const allProfiles =
      JSON.parse(
        localStorage.getItem(
          "allProfiles"
        )
      ) || {};

    const profile =
      allProfiles[email];

    if (!profile) {

      console.error(
        "Profile not found:",
        email
      );

      return;

    }

    navigate(
      "/view-profile",
      {
        state: {

          profile: {
            ...profile,
            email
          },

          from:
            "/dashboard"

        }
      }
    );

  };

  /*
  =========================================================
  RENDER USERS
  =========================================================
  */

  const renderUsers = () => {

    if (users.length === 0) {

      return (

        <div className="dashboard-details-empty">

          <div>
            👤
          </div>

          <h3>
            No users found
          </h3>

          <p>
            There are no users available
            in this category.
          </p>

        </div>

      );

    }

    return (

      <div className="dashboard-user-grid">

        {users.map(
          (user) => (

            <div
              className="dashboard-user-card"
              key={user.email}
            >

              {/* =================================================
                  PROFILE IMAGE
              ================================================= */}

              <img
                src={
                  user.image ||
                  "https://randomuser.me/api/portraits/lego/1.jpg"
                }
                alt={user.name}
                className="dashboard-user-image"
              />

              <div className="dashboard-user-info">

                {/* NAME */}

                <h3>
                  {user.name}
                </h3>

                {/* EMAIL */}

                <p>
                  📧 {user.email}
                </p>

                {/* PHONE */}

                <p>
                  📱 {user.phone}
                </p>

                {/* OCCUPATION */}

                <p>
                  💼 {user.occupation}
                </p>

                {/* LOCATION */}

                <p>
                  📍{" "}

                  {user.city ||
                    "Location not added"}

                  {user.state
                    ? `, ${user.state}`
                    : ""}
                </p>

                {/* AGE */}

                {user.age && (

                  <p>
                    🎂 {user.age} years
                  </p>

                )}

                {/* GENDER */}

                {user.gender && (

                  <p>
                    👤 {user.gender}
                  </p>

                )}

                {/* CURRENT STATUS */}

                <span
                  className={
                    user.status === "Active"
                      ? "dashboard-status active"
                      : "dashboard-status inactive"
                  }
                >

                  {user.status === "Active"
                    ? "🟢 Active"
                    : "⚪ Inactive"}

                </span>

                {/* VIEW PROFILE */}

                <button
                  type="button"
                  className="dashboard-view-profile-btn"
                  onClick={() =>
                    openProfile(
                      user.email
                    )
                  }
                >

                  👁 View Full Profile

                </button>

              </div>

            </div>

          )
        )}

      </div>

    );

  };

  /*
  =========================================================
  RENDER MATCHED PAIRS
  =========================================================
  */

  const renderPairs = () => {

    if (pairs.length === 0) {

      return (

        <div className="dashboard-details-empty">

          <div>
            💔
          </div>

          <h3>
            No matched pairs found
          </h3>

          <p>
            There are currently no matched
            users.
          </p>

        </div>

      );

    }

    return (

      <div className="dashboard-pairs-grid">

        {pairs.map(
          (pair, index) => (

            <div
              className="dashboard-pair-card"
              key={index}
            >

              {/* =================================================
                  USER 1
              ================================================= */}

              <div
                className="dashboard-pair-user"
                onClick={() =>
                  openProfile(
                    pair.user1Email
                  )
                }
              >

                <img
                  src={
                    pair.user1Image ||
                    "https://randomuser.me/api/portraits/lego/1.jpg"
                  }
                  alt={
                    pair.user1Name
                  }
                />

                <h3>
                  {pair.user1Name}
                </h3>

                <p>
                  {pair.user1Email}
                </p>

                <button
                  type="button"
                  onClick={(e) => {

                    e.stopPropagation();

                    openProfile(
                      pair.user1Email
                    );

                  }}
                >
                  View Profile
                </button>

              </div>

              {/* HEART */}

              <div className="pair-heart">
                ❤️
              </div>

              {/* =================================================
                  USER 2
              ================================================= */}

              <div
                className="dashboard-pair-user"
                onClick={() =>
                  openProfile(
                    pair.user2Email
                  )
                }
              >

                <img
                  src={
                    pair.user2Image ||
                    "https://randomuser.me/api/portraits/lego/1.jpg"
                  }
                  alt={
                    pair.user2Name
                  }
                />

                <h3>
                  {pair.user2Name}
                </h3>

                <p>
                  {pair.user2Email}
                </p>

                <button
                  type="button"
                  onClick={(e) => {

                    e.stopPropagation();

                    openProfile(
                      pair.user2Email
                    );

                  }}
                >
                  View Profile
                </button>

              </div>

            </div>

          )
        )}

      </div>

    );

  };

  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="dashboard-details-page">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="dashboard-details-header">

            <div>

              <h1>
                {getTitle()}
              </h1>

              <p>
                View and manage the
                details below.
              </p>

            </div>

            <button
              type="button"
              className="dashboard-back-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              ← Back to Dashboard
            </button>

          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          {type === "totalPairs"
            ? renderPairs()
            : renderUsers()}

        </div>

      </div>

    </div>

  );

}

export default DashboardUserDetails;