import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "../styles/Navbar.css";


function Navbar() {

  const navigate = useNavigate();


  /*
  =========================================================
  NOTIFICATION COUNT
  =========================================================
  */

  const [
    notificationCount,
    setNotificationCount
  ] = useState(0);


  /*
  =========================================================
  PROFILE DATA
  =========================================================
  */

  const [
    profileData,
    setProfileData
  ] = useState({});


  /*
  =========================================================
  LOAD USER PROFILE
  =========================================================
  */

  useEffect(() => {

    const loadProfile = () => {

      /*
      =====================================================
      GET CURRENT LOGGED-IN USER
      =====================================================
      */

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "loggedInUser"
          )
        ) || {};


      /*
      =====================================================
      GET ALL PROFILES
      =====================================================
      */

      const allProfiles =
        JSON.parse(
          localStorage.getItem(
            "allProfiles"
          )
        ) || {};


      /*
      =====================================================
      GET CURRENT USER PROFILE
      =====================================================
      */

      const currentProfile =
        allProfiles[currentUser.email] ||
        allProfiles[currentUser.email?.trim()] ||
        {};


      /*
      =====================================================
      DEBUG LOGS
      =====================================================
      */

      console.log(
        "Navbar Current Email:",
        currentUser.email
      );

      console.log(
        "Navbar Found Profile:",
        allProfiles[currentUser.email]
      );

      console.log(
        "Navbar Profile Image:",
        currentProfile.profileImage
      );

      console.log(
        "Navbar Profile Photo:",
        currentProfile.profilePhoto
      );

      console.log(
        "Navbar Logged In User:",
        currentUser
      );

      console.log(
        "Navbar Profile:",
        currentProfile
      );


      /*
      =====================================================
      SAVE PROFILE TO STATE
      =====================================================
      */

      setProfileData(
        currentProfile
      );

    };


    /*
    =========================================================
    LOAD PROFILE WHEN NAVBAR LOADS
    =========================================================
    */

    loadProfile();


    /*
    =========================================================
    LISTEN FOR PROFILE UPDATES
    =========================================================
    */

    window.addEventListener(
      "profileUpdated",
      loadProfile
    );


    /*
    =========================================================
    CLEANUP
    =========================================================
    */

    return () => {

      window.removeEventListener(
        "profileUpdated",
        loadProfile
      );

    };

  }, []);


  /*
  =========================================================
  UPDATE NOTIFICATION COUNT
  =========================================================
  */

  useEffect(() => {

    const updateNotificationCount = () => {

      /*
      =====================================================
      GET CURRENT LOGGED-IN USER
      =====================================================
      */

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "loggedInUser"
          )
        ) || {};


      /*
      =====================================================
      GET INTEREST REQUESTS
      =====================================================
      */

      const interestRequests =
        JSON.parse(
          localStorage.getItem(
            "interestRequests"
          )
        ) || [];


      /*
      =====================================================
      COUNT PENDING INTEREST REQUESTS
      =====================================================
      */

      const pendingRequests =
        interestRequests.filter(
          (request) =>

            request.to ===
              currentUser.email &&

            request.status ===
              "Pending"
        );


      /*
      =====================================================
      GET USER NOTIFICATIONS
      =====================================================
      */

      const userNotifications =
        JSON.parse(
          localStorage.getItem(
            "userNotifications"
          )
        ) || [];


      /*
      =====================================================
      COUNT UNREAD REJECTION NOTIFICATIONS
      =====================================================
      */

      const unreadRejectionNotifications =
        userNotifications.filter(
          (notification) =>

            notification.to ===
              currentUser.email &&

            notification.type ===
              "rejection" &&

            notification.read ===
              false
        );


      /*
      =====================================================
      TOTAL NOTIFICATION COUNT
      =====================================================
      */

      const totalCount =

        pendingRequests.length +

        unreadRejectionNotifications.length;


      /*
      =====================================================
      UPDATE BADGE
      =====================================================
      */

      setNotificationCount(
        totalCount
      );

    };


    /*
    =========================================================
    RUN WHEN NAVBAR LOADS
    =========================================================
    */

    updateNotificationCount();


    /*
    =========================================================
    LISTEN FOR NOTIFICATION UPDATES
    =========================================================
    */

    window.addEventListener(
      "notificationsUpdated",
      updateNotificationCount
    );


    /*
    =========================================================
    CLEANUP
    =========================================================
    */

    return () => {

      window.removeEventListener(
        "notificationsUpdated",
        updateNotificationCount
      );

    };

  }, []);


  /*
  =========================================================
  GET LOGGED-IN USER FOR DISPLAY
  =========================================================
  */

  const loggedInUser =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    ) || {};


  /*
  =========================================================
  CREATE FULL NAME
  =========================================================
  */

  const fullName = [

    profileData?.firstName,

    profileData?.lastName

  ]
    .filter(Boolean)
    .join(" ")
    .trim();


  /*
  =========================================================
  LOGOUT
  =========================================================
  */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "loggedInUser"
    );

    navigate(
      "/login"
    );

  };


  /*
  =========================================================
  NAVBAR
  =========================================================
  */

  return (

    <div className="navbar">


      {/* =================================================
          LEFT SIDE
      ================================================= */}

      <div className="navbar-left">

        <img
          src="/logo.jpeg"
          alt="EMS Logo"
          className="navbar-logo"
        />

        <h2>
          EMS Portal
        </h2>

      </div>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="navbar-right">


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <span
          className="navbar-notification"
          onClick={() =>
            navigate(
              "/notifications"
            )
          }
          style={{
            cursor: "pointer",
            position: "relative"
          }}
        >

          🔔 Notifications


          {/* =================================================
              RED NOTIFICATION BADGE
          ================================================= */}

          {notificationCount > 0 && (

            <span
              className="notification-badge"
            >

              {notificationCount}

            </span>

          )}

        </span>


        {/* =================================================
            PROFILE
        ================================================= */}

        <div
          className="navbar-profile-container"
        >


          {/* =================================================
              PROFILE IMAGE
          ================================================= */}

          <img
            src={

              profileData?.profilePhoto ||

              profileData?.profileImage ||

              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"

            }
            alt="Profile"
            className="navbar-profile-img"
          />


          {/* =================================================
              USER NAME
          ================================================= */}

          <span
            className="navbar-profile-name"
          >

            {

              fullName ||

              profileData?.userName ||

              loggedInUser?.userName ||

              loggedInUser?.name ||

              loggedInUser?.fullName ||

              "User"

            }

          </span>


        </div>


        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          className="navbar-logout-btn"
          onClick={
            handleLogout
          }
        >

          Logout

        </button>


      </div>

    </div>

  );

}


export default Navbar;