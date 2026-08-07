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
  GET USER STATUS
  =========================================================
  */

  const getUserStatus = (profile) => {

    if (profile?.isActive === true) {
      return "Active";
    }

    if (profile?.isActive === false) {
      return "Inactive";
    }

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

    return "Active";
  };


  /*
  =========================================================
  GET PROFILE IMAGE
  =========================================================
  */

  const getProfileImage = (profile) => {

    if (!profile) {
      return "";
    }

    /*
    1. Uploaded profile photo
    */

    if (
      typeof profile.profilePhoto === "string" &&
      profile.profilePhoto.trim() !== ""
    ) {

      return profile.profilePhoto;

    }


    /*
    2. Additional photo
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
    3. Profile image
    */

    if (
      typeof profile.profileImage === "string" &&
      profile.profileImage.trim() !== ""
    ) {

      return profile.profileImage;

    }


    /*
    4. Fallback
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
  GET CITY
  =========================================================
  */

  const getCity = (profile) => {

    return (
      profile?.currentCity ||
      profile?.city ||
      ""
    );

  };


  /*
  =========================================================
  GET STATE
  =========================================================
  */

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
        localStorage.getItem("allProfiles")
      ) || {};

    const matchedUsers =
      JSON.parse(
        localStorage.getItem("matchedUsers")
      ) || [];

    const profilesArray =
      Object.entries(allProfiles);


    /*
    =========================================================
    FILTER USERS
    =========================================================
    */

    let filteredUsers = profilesArray;

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
  PAGE INFORMATION
  =========================================================
  */

  const getPageInfo = () => {

    if (type === "activeUsers") {

      return {
        eyebrow: "LIVE COMMUNITY",
        title: "Active Members",
        description:
          "Members who are currently active on your matrimony platform.",
        icon: "🟢",
        count: users.length
      };

    }


    if (type === "inactiveUsers") {

      return {
        eyebrow: "MEMBER MANAGEMENT",
        title: "Inactive Members",
        description:
          "Profiles that are currently inactive and may need attention.",
        icon: "⚪",
        count: users.length
      };

    }


    if (type === "totalPairs") {

      return {
        eyebrow: "SUCCESSFUL CONNECTIONS",
        title: "Matched Pairs",
        description:
          "Couples who have successfully matched through the platform.",
        icon: "💕",
        count: pairs.length
      };

    }


    return {
      eyebrow: "MATRIMONY COMMUNITY",
      title: "All Members",
      description:
        "Browse all registered members and explore their profiles.",
      icon: "👥",
      count: users.length
    };

  };


  const pageInfo = getPageInfo();


  /*
  =========================================================
  OPEN PROFILE
  =========================================================
  */

  const openProfile = (email) => {

    const allProfiles =
      JSON.parse(
        localStorage.getItem("allProfiles")
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
  USER PROFILE BUTTON
  =========================================================
  */

  const ProfileButton = ({
    email,
    active = false
  }) => {

    return (

      <button
        type="button"
        className={
          active
            ? "dashboard-profile-btn active-btn"
            : "dashboard-profile-btn"
        }
        onClick={() =>
          openProfile(email)
        }
      >

        👁 View Profile

      </button>

    );

  };


  /*
  =========================================================
  TOTAL USERS DESIGN
  =========================================================
  */

  const renderTotalUsers = () => {

    if (users.length === 0) {

      return renderEmpty(
        "👥",
        "No members found",
        "There are currently no registered profiles."
      );

    }


    return (

      <div className="members-directory">

        {users.map(
          (user) => (

            <div
              className="member-directory-card"
              key={user.email}
            >

              <div className="member-photo-area">

                <img
                  src={
                    user.image ||
                    "https://randomuser.me/api/portraits/lego/1.jpg"
                  }
                  alt={user.name}
                  onError={(e) => {

                    e.currentTarget.onerror =
                      null;

                    e.currentTarget.src =
                      "https://randomuser.me/api/portraits/lego/1.jpg";

                  }}
                />

                <span className="member-status-dot">
                </span>

              </div>


              <div className="member-directory-info">

                <span className="member-category">
                  MEMBER
                </span>

                <h3>
                  {user.name}
                </h3>

                <p className="member-main-detail">
                  {user.occupation}
                </p>

                <p>
                  📍{" "}
                  {user.city ||
                    "Location not added"}

                  {user.state
                    ? `, ${user.state}`
                    : ""}
                </p>

                <div className="member-mini-details">

                  {user.age && (
                    <span>
                      🎂 {user.age}
                    </span>
                  )}

                  {user.gender && (
                    <span>
                      👤 {user.gender}
                    </span>
                  )}

                </div>

              </div>


              <div className="member-directory-action">

                <ProfileButton
                  email={user.email}
                />

              </div>

            </div>

          )
        )}

      </div>

    );

  };


  /*
  =========================================================
  ACTIVE USERS DESIGN
  =========================================================
  */

  const renderActiveUsers = () => {

    if (users.length === 0) {

      return renderEmpty(
        "🟢",
        "No active members",
        "There are currently no active members."
      );

    }


    return (

      <div className="active-members-list">

        {users.map(
          (user, index) => (

            <div
              className="active-member-row"
              key={user.email}
            >

              <div className="active-rank">
                {String(index + 1).padStart(2, "0")}
              </div>


              <div className="active-photo-wrapper">

                <img
                  src={
                    user.image ||
                    "https://randomuser.me/api/portraits/lego/1.jpg"
                  }
                  alt={user.name}
                  onError={(e) => {

                    e.currentTarget.onerror =
                      null;

                    e.currentTarget.src =
                      "https://randomuser.me/api/portraits/lego/1.jpg";

                  }}
                />

                <span className="online-indicator">
                </span>

              </div>


              <div className="active-member-info">

                <div className="active-name-row">

                  <h3>
                    {user.name}
                  </h3>

                  <span className="online-badge">
                    ● Active now
                  </span>

                </div>

                <p>
                  💼 {user.occupation}
                </p>

                <p>
                  📍{" "}
                  {user.city ||
                    "Location not added"}

                  {user.state
                    ? `, ${user.state}`
                    : ""}
                </p>

              </div>


              <div className="active-member-meta">

                {user.age && (
                  <span>
                    {user.age} yrs
                  </span>
                )}

                {user.gender && (
                  <span>
                    {user.gender}
                  </span>
                )}

              </div>


              <ProfileButton
                email={user.email}
                active={true}
              />

            </div>

          )
        )}

      </div>

    );

  };


  /*
  =========================================================
  INACTIVE USERS DESIGN
  =========================================================
  */

  const renderInactiveUsers = () => {

    if (users.length === 0) {

      return renderEmpty(
        "⚪",
        "No inactive members",
        "Great! There are currently no inactive profiles."
      );

    }


    return (

      <div className="inactive-members-grid">

        {users.map(
          (user) => (

            <div
              className="inactive-member-card"
              key={user.email}
            >

              <div className="inactive-card-header">

                <span>
                  INACTIVE
                </span>

                <span className="inactive-circle">
                  ○
                </span>

              </div>


              <div className="inactive-profile">

                <img
                  src={
                    user.image ||
                    "https://randomuser.me/api/portraits/lego/1.jpg"
                  }
                  alt={user.name}
                  onError={(e) => {

                    e.currentTarget.onerror =
                      null;

                    e.currentTarget.src =
                      "https://randomuser.me/api/portraits/lego/1.jpg";

                  }}
                />

                <h3>
                  {user.name}
                </h3>

                <p className="inactive-occupation">
                  {user.occupation}
                </p>

              </div>


              <div className="inactive-info">

                <div>
                  <span>
                    LOCATION
                  </span>

                  <strong>
                    {user.city ||
                      "Not added"}

                    {user.state
                      ? `, ${user.state}`
                      : ""}
                  </strong>
                </div>


                <div>
                  <span>
                    CONTACT
                  </span>

                  <strong>
                    {user.phone}
                  </strong>
                </div>

              </div>


              <div className="inactive-card-footer">

                <span>
                  Profile inactive
                </span>

                <ProfileButton
                  email={user.email}
                />

              </div>

            </div>

          )
        )}

      </div>

    );

  };


  /*
  =========================================================
  MATCHED PAIRS DESIGN
  =========================================================
  */

  const renderPairs = () => {

    if (pairs.length === 0) {

      return renderEmpty(
        "💕",
        "No matched pairs yet",
        "Successful matches will appear here."
      );

    }


    return (

      <div className="matches-showcase">

        {pairs.map(
          (pair, index) => (

            <div
              className="match-showcase-card"
              key={index}
            >

              <div className="match-number">
                MATCH #{String(index + 1).padStart(2, "0")}
              </div>


              <div className="match-users">

                {/* USER 1 */}

                <div
                  className="match-person"
                  onClick={() =>
                    openProfile(
                      pair.user1Email
                    )
                  }
                >

                  <div className="match-photo-ring">

                    <img
                      src={
                        pair.user1Image ||
                        "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      alt={pair.user1Name}
                      onError={(e) => {

                        e.currentTarget.onerror =
                          null;

                        e.currentTarget.src =
                          "https://randomuser.me/api/portraits/lego/1.jpg";

                      }}
                    />

                  </div>

                  <span>
                    MEMBER 01
                  </span>

                  <h3>
                    {pair.user1Name}
                  </h3>

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


                {/* CONNECTION */}

                <div className="match-connection">

                  <div className="connection-line">
                  </div>

                  <div className="match-heart">
                    ❤️
                  </div>

                  <span>
                    MATCHED
                  </span>

                </div>


                {/* USER 2 */}

                <div
                  className="match-person"
                  onClick={() =>
                    openProfile(
                      pair.user2Email
                    )
                  }
                >

                  <div className="match-photo-ring">

                    <img
                      src={
                        pair.user2Image ||
                        "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      alt={pair.user2Name}
                      onError={(e) => {

                        e.currentTarget.onerror =
                          null;

                        e.currentTarget.src =
                          "https://randomuser.me/api/portraits/lego/1.jpg";

                      }}
                    />

                  </div>

                  <span>
                    MEMBER 02
                  </span>

                  <h3>
                    {pair.user2Name}
                  </h3>

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

            </div>

          )
        )}

      </div>

    );

  };


  /*
  =========================================================
  EMPTY STATE
  =========================================================
  */

  const renderEmpty = (
    icon,
    title,
    description
  ) => {

    return (

      <div className="dashboard-special-empty">

        <div className="empty-icon">
          {icon}
        </div>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </div>

    );

  };


  /*
  =========================================================
  MAIN RENDER
  =========================================================
  */

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />


        <div
  className={`dashboard-details-page ${
    type === "activeUsers"
      ? "active-users-page"
      : ""
  }`}
>
          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="details-page-header">

            <div className="details-heading">

              <div className="details-eyebrow">
                {pageInfo.icon}{" "}
                {pageInfo.eyebrow}
              </div>

              <h1>
                {pageInfo.title}
              </h1>

              <p>
                {pageInfo.description}
              </p>

            </div>


            <div className="details-header-right">

              <div className="details-count">

                <strong>
                  {pageInfo.count}
                </strong>

                <span>
                  {type === "totalPairs"
                    ? "MATCHES"
                    : "PROFILES"}
                </span>

              </div>


              <button
                type="button"
                className="details-back-btn"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                ← Dashboard
              </button>

            </div>

          </div>


          {/* =================================================
              PAGE CONTENT
          ================================================= */}

          {type === "totalPairs"
            ? renderPairs()
            : type === "activeUsers"
            ? renderActiveUsers()
            : type === "inactiveUsers"
            ? renderInactiveUsers()
            : renderTotalUsers()}

        </div>

      </div>

    </div>

  );

}

export default DashboardUserDetails;