import { useNavigate } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
function DashboardCards() {
  const navigate = useNavigate();

  /*
  =========================================================
  GET ALL PROFILES
  =========================================================
  */

  const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};

  /*
  =========================================================
  GET MATCHED USERS
  =========================================================
  */

  const matchedUsers =
    JSON.parse(localStorage.getItem("matchedUsers")) || [];

  /*
  =========================================================
  GET CURRENT USER STATUS
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
      const status = profile.status.trim().toLowerCase();

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
  PROFILE ARRAY
  =========================================================
  */

  const profilesArray = Object.entries(allProfiles);

  /*
  =========================================================
  USER COUNTS
  =========================================================
  */

  const activeUsers = profilesArray.filter(
    ([, profile]) =>
      getUserStatus(profile) === "Active"
  );

  const inactiveUsers = profilesArray.filter(
    ([, profile]) =>
      getUserStatus(profile) === "Inactive"
  );

  const totalUsers = profilesArray.length;

  const totalPairs = Array.isArray(matchedUsers)
    ? matchedUsers.length
    : 0;

  /*
  =========================================================
  CARD CLICK
  =========================================================
  */

  const handleCardClick = (type) => {
    navigate("/dashboard-users", {
      state: {
        type,
      },
    });
  };

  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (
    <div className="cards">

      {/* =================================================
          TOTAL USERS
      ================================================= */}

      <div
        className="dashboard-stat-card total-users-card"
        onClick={() =>
          handleCardClick("totalUsers")
        }
      >
        <div className="stat-card-top">
          <div className="stat-icon">
            👥
          </div>

          <span className="stat-card-label">
            COMMUNITY
          </span>
        </div>

        <div className="stat-card-content">
          <h3>Total Users</h3>

          <p>{totalUsers}</p>

          <span className="stat-description">
            All registered profiles
          </span>
        </div>

        <div className="stat-card-decoration">
          👤
        </div>
      </div>


      {/* =================================================
          ACTIVE USERS
      ================================================= */}

      <div
        className="dashboard-stat-card active-users-card"
        onClick={() =>
          handleCardClick("activeUsers")
        }
      >
        <div className="stat-card-top">
          <div className="stat-icon">
            🟢
          </div>

          <span className="stat-card-label">
            ACTIVE NOW
          </span>
        </div>

        <div className="stat-card-content">
          <h3>Active Users</h3>

          <p>{activeUsers.length}</p>

          <span className="stat-description">
            Currently active profiles
          </span>
        </div>

        <div className="active-pulse"></div>
      </div>


      {/* =================================================
          INACTIVE USERS
      ================================================= */}

      <div
        className="dashboard-stat-card inactive-users-card"
        onClick={() =>
          handleCardClick("inactiveUsers")
        }
      >
        <div className="stat-card-top">
          <div className="stat-icon">
            ⚪
          </div>

          <span className="stat-card-label">
            INACTIVE
          </span>
        </div>

        <div className="stat-card-content">
          <h3>Inactive Users</h3>

          <p>{inactiveUsers.length}</p>

          <span className="stat-description">
            Profiles currently inactive
          </span>
        </div>

        <div className="inactive-line"></div>
      </div>


      {/* =================================================
          TOTAL PAIRS
      ================================================= */}

      <div
        className="dashboard-stat-card total-pairs-card"
        onClick={() =>
          handleCardClick("totalPairs")
        }
      >
        <div className="stat-card-top">
          <div className="stat-icon">
            💕
          </div>

          <span className="stat-card-label">
            MATCHES
          </span>
        </div>

        <div className="stat-card-content">
          <h3>Total Pairs</h3>

          <p>{totalPairs}</p>

          <span className="stat-description">
            Successful matched profiles
          </span>
        </div>

        <div className="heart-decoration">
          ♥
        </div>
      </div>
      <PageNavigation />

    </div>
  );
}

export default DashboardCards;