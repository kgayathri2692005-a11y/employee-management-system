import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import "../styles/Dashboard.css";

function IgnoredProfiles() {

  const navigate = useNavigate();

  /*
  =========================================================
  CURRENT LOGGED-IN USER
  =========================================================
  */

  const loggedInUser =
    JSON.parse(
      localStorage.getItem("loggedInUser")
    ) || {};

  const loggedInEmail =
    (
      loggedInUser.email || ""
    )
      .trim()
      .toLowerCase();


  const [
    ignoredProfiles,
    setIgnoredProfiles
  ] = useState([]);


  /*
  =========================================================
  GET PROFILE IMAGE
  =========================================================
  */

  const getProfileImage = (profile) => {

    if (profile?.profilePhoto) {
      return profile.profilePhoto;
    }

    if (profile?.profileImage) {
      return profile.profileImage;
    }

    if (
      Array.isArray(profile?.additionalPhotos) &&
      profile.additionalPhotos.length > 0
    ) {
      return profile.additionalPhotos[0];
    }

    return "https://randomuser.me/api/portraits/lego/1.jpg";
  };


  /*
  =========================================================
  GET PROFILE NAME
  =========================================================
  */

  const getProfileName = (
    profile,
    fallbackName = "User"
  ) => {

    const name =
      `${profile?.firstName || ""} ${
        profile?.lastName || ""
      }`.trim();

    return (
      name ||
      profile?.userName ||
      profile?.fullName ||
      fallbackName
    );
  };


  /*
  =========================================================
  LOAD IGNORED PROFILES
  =========================================================
  */

  const loadIgnoredProfiles = () => {

    /*
    IMPORTANT:

    ignoredProfiles is the MAIN localStorage key.

    Structure:

    {
      "surapishe@gmail.com": [
        {
          email: "ushagujjar6367@gmail.com",
          name: "Akhil Kumar",
          ignoredBy: "surapishe@gmail.com"
        }
      ]
    }
    */

    const ignoredProfilesData =
      JSON.parse(
        localStorage.getItem(
          "ignoredProfiles"
        )
      ) || {};


    /*
    Get current user's ignored list
    */

    const currentIgnored =
      Object.entries(
        ignoredProfilesData
      ).find(
        ([email]) =>
          email
            .trim()
            .toLowerCase() ===
          loggedInEmail
      );


    const ignoredList =
      currentIgnored
        ? currentIgnored[1]
        : [];


    /*
    =========================================================
    GET ALL PROFILES
    =========================================================
    */

    const allProfiles =
      JSON.parse(
        localStorage.getItem(
          "allProfiles"
        )
      ) || {};


    /*
    =========================================================
    CREATE COMPLETE PROFILE DATA
    =========================================================
    */

    const profiles =
      Array.isArray(ignoredList)
        ? ignoredList.map(
            (ignoredUser) => {

              const ignoredEmail =
                (
                  ignoredUser.email ||
                  ""
                )
                  .trim()
                  .toLowerCase();


              /*
              Find latest profile
              */

              const profileEntry =
                Object.entries(
                  allProfiles
                ).find(
                  ([email]) =>
                    email
                      .trim()
                      .toLowerCase() ===
                    ignoredEmail
                );


              const profile =
                profileEntry
                  ? profileEntry[1]
                  : {};


              return {

                ...profile,

                ...ignoredUser,

                email:
                  ignoredUser.email,

                name:
                  getProfileName(
                    profile,
                    ignoredUser.name
                  ),

                image:
                  getProfileImage(
                    profile
                  ),

                occupation:
                  profile?.occupation ||
                  ignoredUser.occupation ||
                  "Occupation not added",

                city:
                  profile?.currentCity ||
                  profile?.city ||
                  ignoredUser.city ||
                  "",

                state:
                  profile?.currentState ||
                  profile?.stateName ||
                  profile?.state ||
                  ignoredUser.state ||
                  "",

                age:
                  profile?.age ||
                  ignoredUser.age ||
                  "",

                gender:
                  profile?.gender ||
                  ignoredUser.gender ||
                  ""

              };

            }
          )
        : [];


    setIgnoredProfiles(
      profiles
    );

  };


  /*
  =========================================================
  LOAD PAGE
  =========================================================
  */

  useEffect(() => {

    loadIgnoredProfiles();

  }, [loggedInEmail]);


  /*
  =========================================================
  LISTEN FOR CHANGES
  =========================================================
  */

  useEffect(() => {

    const handleUpdate = () => {

      loadIgnoredProfiles();

    };

    window.addEventListener(
      "ignoredProfilesUpdated",
      handleUpdate
    );

    window.addEventListener(
      "notificationsUpdated",
      handleUpdate
    );

    return () => {

      window.removeEventListener(
        "ignoredProfilesUpdated",
        handleUpdate
      );

      window.removeEventListener(
        "notificationsUpdated",
        handleUpdate
      );

    };

  }, [loggedInEmail]);


  /*
  =========================================================
  RESTORE PROFILE
  =========================================================
  */

  const restoreProfile = (
    email
  ) => {

    const ignoredProfilesData =
      JSON.parse(
        localStorage.getItem(
          "ignoredProfiles"
        )
      ) || {};


    /*
    Find current user's list
    */

    const currentKey =
      Object.keys(
        ignoredProfilesData
      ).find(
        (key) =>
          key
            .trim()
            .toLowerCase() ===
          loggedInEmail
      );


    if (!currentKey) {
      return;
    }


    /*
    Remove selected person
    */

    const updatedList =
      (
        ignoredProfilesData[
          currentKey
        ] || []
      ).filter(
        (user) =>
          (
            user.email ||
            ""
          )
            .trim()
            .toLowerCase() !==
          email
            .trim()
            .toLowerCase()
      );


    /*
    Save updated list
    */

    ignoredProfilesData[
      currentKey
    ] = updatedList;


    localStorage.setItem(
      "ignoredProfiles",
      JSON.stringify(
        ignoredProfilesData
      )
    );

    /*
=========================================================
REMOVE FROM OLD REJECTED PROFILES DATA
=========================================================
*/

const rejectedProfiles =
  JSON.parse(
    localStorage.getItem(
      "rejectedProfiles"
    )
  ) || [];

const updatedRejectedProfiles =
  rejectedProfiles.filter(
    (item) => {

      const user1 =
        (item.user1 || "")
          .trim()
          .toLowerCase();

      const user2 =
        (item.user2 || "")
          .trim()
          .toLowerCase();

      const restoredEmail =
        email
          .trim()
          .toLowerCase();

      return !(
        (
          user1 === loggedInEmail &&
          user2 === restoredEmail
        ) ||
        (
          user2 === loggedInEmail &&
          user1 === restoredEmail
        )
      );

    }
  );

localStorage.setItem(
  "rejectedProfiles",
  JSON.stringify(
    updatedRejectedProfiles
  )
);

    /*
    Update UI immediately
    */

    setIgnoredProfiles(
      (previous) =>
        previous.filter(
          (user) =>
            user.email
              .trim()
              .toLowerCase() !==
            email
              .trim()
              .toLowerCase()
        )
    );


    /*
    Tell other components
    */

    window.dispatchEvent(
      new Event(
        "ignoredProfilesUpdated"
      )
    );

   window.dispatchEvent(
  new Event(
    "notificationsUpdated"
  )
);

window.dispatchEvent(
  new Event(
    "profileUpdated"
  )
);

  };


  /*
  =========================================================
  VIEW PROFILE
  =========================================================
  */

  const viewProfile = (
    user
  ) => {

    const allProfiles =
      JSON.parse(
        localStorage.getItem(
          "allProfiles"
        )
      ) || {};


    const profileEntry =
      Object.entries(
        allProfiles
      ).find(
        ([email]) =>
          email
            .trim()
            .toLowerCase() ===
          user.email
            .trim()
            .toLowerCase()
      );


    const profile =
      profileEntry
        ? profileEntry[1]
        : user;


    navigate(
      "/view-profile",
      {
        state: {

          profile: {
            ...profile,
            email: user.email
          },

          from:
            "/ignored-profiles"

        }
      }
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

        <div
          className="ignored-profiles-page"
          style={{
            padding: "30px"
          }}
        >

          {/* HEADER */}

          <div
            style={{
              marginBottom: "25px"
            }}
          >

            <h2
              style={{
                margin: 0,
                color: "#172b52"
              }}
            >
              🚫 Ignored Profiles
            </h2>

            <p
              style={{
                marginTop: "7px",
                color: "#777"
              }}
            >
              Profiles you have chosen to ignore.
              You can restore them anytime.
            </p>

          </div>


          {/* EMPTY */}

          {ignoredProfiles.length === 0 ? (

            <div
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "14px",
                padding: "45px 20px",
                textAlign: "center"
              }}
            >

              <div
                style={{
                  fontSize: "42px"
                }}
              >
                💔
              </div>

              <h3
                style={{
                  color: "#172b52"
                }}
              >
                No ignored profiles
              </h3>

              <p
                style={{
                  color: "#777"
                }}
              >
                Profiles you ignore will
                appear here.
              </p>

            </div>

          ) : (

            <div>

              {ignoredProfiles.map(
                (user) => (

                  <div
                    key={user.email}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "space-between",
                      gap: "20px",
                      background: "#fff",
                      border:
                        "1px solid #e8e8e8",
                      borderRadius: "14px",
                      padding: "18px",
                      marginBottom: "15px",
                      boxShadow:
                        "0 4px 15px rgba(0,0,0,0.05)"
                    }}
                  >

                    {/* PROFILE */}

                    <div
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: "15px",
                        minWidth: 0
                      }}
                    >

                      <img
                        src={user.image}
                        alt={user.name}
                        onError={(e) => {

                          e.currentTarget.onerror =
                            null;

                          e.currentTarget.src =
                            "https://randomuser.me/api/portraits/lego/1.jpg";

                        }}
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          flexShrink: 0
                        }}
                      />

                      <div>

                        <h3
                          style={{
                            margin:
                              "0 0 6px",
                            color:
                              "#172b52"
                          }}
                        >
                          {user.name}
                        </h3>

                        <p
                          style={{
                            margin:
                              "4px 0",
                            color:
                              "#666"
                          }}
                        >
                          💼{" "}
                          {user.occupation}
                        </p>

                        <p
                          style={{
                            margin:
                              "4px 0",
                            color:
                              "#666"
                          }}
                        >
                          📍{" "}
                          {user.city}

                          {user.state
                            ? `, ${user.state}`
                            : ""}
                        </p>

                      </div>

                    </div>


                    {/* BUTTONS */}

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexShrink: 0
                      }}
                    >

                      <button
                        className=
                          "ignored-view-btn"
                        onClick={() =>
                          viewProfile(
                            user
                          )
                        }
                      >
                        👁 View Profile
                      </button>

                      <button
                        className=
                          "ignored-restore-btn"
                        onClick={() =>
                          restoreProfile(
                            user.email
                          )
                        }
                      >
                        🔄 Restore
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

              <PageNavigation
          previous="/notifications"
        />

      </div>

    </div>

  );

}

export default IgnoredProfiles; 