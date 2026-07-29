import { useNavigate } from "react-router-dom";

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
    /*
    Explicit isActive has highest priority
    */

    if (profile?.isActive === true) {
      return "Active";
    }

    if (profile?.isActive === false) {
      return "Inactive";
    }

    /*
    Explicit status
    */

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

    /*
    Existing profile without an explicit inactive
    status is treated as Active.

    This MUST match DashboardUserDetails.jsx.
    */

    return "Active";
  };

  /*
  =========================================================
  GET NAME
  =========================================================
  */

  const getName = (profile, email) => {
    const name =
      `${profile?.firstName || ""} ${
        profile?.lastName || ""
      }`.trim();

    return (
      name ||
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
  PROFILE ARRAY
  =========================================================
  */

  const profilesArray = Object.entries(allProfiles);

  /*
  =========================================================
  ACTIVE USERS
  =========================================================
  */

  const activeUsers = profilesArray.filter(
    ([, profile]) =>
      getUserStatus(profile) === "Active"
  );

  /*
  =========================================================
  INACTIVE USERS
  =========================================================
  */

  const inactiveUsers = profilesArray.filter(
    ([, profile]) =>
      getUserStatus(profile) === "Inactive"
  );

  /*
  =========================================================
  TOTAL USERS
  =========================================================
  */

  const totalUsers = profilesArray.length;

  /*
  =========================================================
  TOTAL PAIRS
  =========================================================
  */

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
        className="card"
        onClick={() =>
          handleCardClick("totalUsers")
        }
        style={{
          cursor: "pointer",
        }}
      >
        <h3>Total Users</h3>

        <p>{totalUsers}</p>
      </div>

      {/* =================================================
          ACTIVE USERS
      ================================================= */}

      <div
        className="card"
        onClick={() =>
          handleCardClick("activeUsers")
        }
        style={{
          cursor: "pointer",
        }}
      >
        <h3>Active Users</h3>

        <p>{activeUsers.length}</p>
      </div>

      {/* =================================================
          INACTIVE USERS
      ================================================= */}

      <div
        className="card"
        onClick={() =>
          handleCardClick("inactiveUsers")
        }
        style={{
          cursor: "pointer",
        }}
      >
        <h3>Inactive Users</h3>

        <p>{inactiveUsers.length}</p>
      </div>

      {/* =================================================
          TOTAL PAIRS
      ================================================= */}

      <div
        className="card"
        onClick={() =>
          handleCardClick("totalPairs")
        }
        style={{
          cursor: "pointer",
        }}
      >
        <h3>Total Pairs</h3>

        <p>{totalPairs}</p>
      </div>

    </div>
  );
}

export default DashboardCards;