import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

function IgnoredProfiles() {
    const navigate = useNavigate();

const loggedInUser =
  JSON.parse(localStorage.getItem("loggedInUser")) || {};

const ignoredKey = `ignored_${loggedInUser.email}`;

const [ignoredProfiles, setIgnoredProfiles] = useState([]);

useEffect(() => {

  const ignoredEmails =
    JSON.parse(localStorage.getItem(ignoredKey)) || [];

  const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};

  const profiles = ignoredEmails.map((email) => {

    const profile = allProfiles[email] || {};

    return {
      email,
      name:
        `${profile.firstName || ""} ${profile.lastName || ""}`.trim() ||
        "User",
      image:
        profile.profileImage ||
        "https://randomuser.me/api/portraits/lego/1.jpg",
      occupation:
        profile.occupation || "",
      city:
        profile.currentCity || profile.city || "",
      state:
        profile.currentState || profile.stateName || ""
    };

  });

  setIgnoredProfiles(profiles);

}, [ignoredKey]);
const restoreProfile = (email) => {

  const updatedIgnored = ignoredProfiles.filter(
    (user) => user.email !== email
  );

  setIgnoredProfiles(updatedIgnored);

  const updatedIgnoredEmails = updatedIgnored.map(
    (user) => user.email
  );

  localStorage.setItem(
    ignoredKey,
    JSON.stringify(updatedIgnoredEmails)
  );

};
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div style={{ padding: "30px" }}>

          <h2>🚫 Ignored Profiles</h2>

          {ignoredProfiles.length === 0 ? (

  <p>No ignored profiles.</p>

) : (

  ignoredProfiles.map((user) => (

    <div
      key={user.email}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px"
      }}
    >

      <div style={{ display: "flex", alignItems: "center" }}>

        <img
          src={user.image}
          alt={user.name}
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "15px"
          }}
        />

        <div>

          <h3>{user.name}</h3>

          <p>{user.occupation || "Occupation not added"}</p>

          <p>
            📍 {user.city}
            {user.state ? `, ${user.state}` : ""}
          </p>

        </div>

      </div>

      <button
  onClick={() => restoreProfile(user.email)}
>
  🔄 Restore
</button>
    </div>

  ))

)}

        </div>

      </div>

      <PageNavigation
        previous="/notifications"
      />

    </div>
  );
}

export default IgnoredProfiles;