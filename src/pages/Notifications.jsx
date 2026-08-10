import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

import "../styles/Notifications.css";


function Notifications() {

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


  /*
  =========================================================
  NORMALIZE EMAIL
  =========================================================
  */

  const normalizeEmail = (email) => {

    return (
      email || ""
    )
      .trim()
      .toLowerCase();

  };


  const loggedInEmail =
    normalizeEmail(
      loggedInUser.email
    );


  /*
  =========================================================
  STATES
  =========================================================
  */

  const [
    notifications,
    setNotifications
  ] = useState([]);


  const [
    showIgnoreModal,
    setShowIgnoreModal
  ] = useState(false);


  const [
    showIgnoreWarning,
    setShowIgnoreWarning
  ] = useState(false);


  const [
    selectedRequest,
    setSelectedRequest
  ] = useState(null);


  const [
    ignoreReason,
    setIgnoreReason
  ] = useState("");


  const [
    otherReason,
    setOtherReason
  ] = useState("");


  /*
  =========================================================
  GET PROFILE IMAGE
  =========================================================
  */

  const getProfileImage = (profile) => {

    if (
      profile?.profilePhoto &&
      typeof profile.profilePhoto === "string" &&
      profile.profilePhoto.trim() !== ""
    ) {

      return profile.profilePhoto;

    }


    if (
      profile?.profileImage &&
      typeof profile.profileImage === "string" &&
      profile.profileImage.trim() !== ""
    ) {

      return profile.profileImage;

    }


    if (
      Array.isArray(profile?.additionalPhotos) &&
      profile.additionalPhotos.length > 0 &&
      typeof profile.additionalPhotos[0] === "string"
    ) {

      return profile.additionalPhotos[0];

    }


    return "https://randomuser.me/api/portraits/lego/1.jpg";

  };


  /*
  =========================================================
  GET SENDER PROFILE
  =========================================================

  Supports:

  1. allProfiles as object
  2. allProfiles as array
  =========================================================
  */

  const getSenderProfile = (email) => {

    const normalizedEmail =
      normalizeEmail(email);


    if (!normalizedEmail) {
      return {};
    }


    const allProfiles =
      JSON.parse(
        localStorage.getItem("allProfiles")
      ) || {};


    /*
    ---------------------------------------------------------
    ARRAY FORMAT
    ---------------------------------------------------------
    */

    if (Array.isArray(allProfiles)) {

      return (
        allProfiles.find(
          (profile) =>
            normalizeEmail(
              profile?.email
            ) === normalizedEmail
        ) || {}
      );

    }


    /*
    ---------------------------------------------------------
    OBJECT FORMAT
    ---------------------------------------------------------
    */

    const profileEntry =
      Object.entries(
        allProfiles
      ).find(
        ([profileEmail, profile]) => {

          const normalizedKey =
            normalizeEmail(
              profileEmail
            );


          const profileEmailInside =
            normalizeEmail(
              profile?.email
            );


          return (
            normalizedKey === normalizedEmail ||
            profileEmailInside === normalizedEmail
          );

        }
      );


    return profileEntry
      ? profileEntry[1] || {}
      : {};

  };


  /*
  =========================================================
  LOAD NOTIFICATIONS
  =========================================================
  */

  const loadNotifications = () => {

    /*
    ---------------------------------------------------------
    GET INTEREST REQUESTS
    ---------------------------------------------------------
    */

    const interestRequests =
      JSON.parse(
        localStorage.getItem(
          "interestRequests"
        )
      ) || [];


    /*
    ---------------------------------------------------------
    GET USER NOTIFICATIONS
    ---------------------------------------------------------
    */

    const userNotifications =
      JSON.parse(
        localStorage.getItem(
          "userNotifications"
        )
      ) || [];


    /*
    ---------------------------------------------------------
    PENDING INTEREST REQUESTS
    ---------------------------------------------------------
    */

    const pendingRequests =
      interestRequests.filter(
        (request) => {

          const requestTo =
            normalizeEmail(
              request?.to
            );


          return (
            requestTo === loggedInEmail &&
            request?.status === "Pending"
          );

        }
      );


    /*
    ---------------------------------------------------------
    IGNORE / REJECTION NOTIFICATIONS
    ---------------------------------------------------------

    Current system:
      type = "rejection"

    Older system:
      type = "ignore"

    Support both.
    ---------------------------------------------------------
    */

    const rejectionNotifications =
      userNotifications.filter(
        (notification) => {

          const notificationTo =
            normalizeEmail(
              notification?.to
            );


          const isRejection =
            notification?.type === "rejection";


          const isOldIgnore =
            notification?.type === "ignore";


          return (
            notificationTo === loggedInEmail &&
            (isRejection || isOldIgnore)
          );

        }
      );


    /*
    ---------------------------------------------------------
    COMBINE ALL NOTIFICATIONS
    ---------------------------------------------------------
    */

    const combinedNotifications = [

      ...pendingRequests.map(
        (request) => ({

          ...request,

          notificationType:
            "interest"

        })
      ),


      ...rejectionNotifications.map(
        (notification) => ({

          ...notification,

          notificationType:
            "ignore"

        })
      )

    ];


    setNotifications(
      combinedNotifications
    );

  };


  /*
  =========================================================
  MARK NOTIFICATIONS AS READ
  =========================================================
  */

  const markNotificationsAsRead = () => {

    const userNotifications =
      JSON.parse(
        localStorage.getItem(
          "userNotifications"
        )
      ) || [];


    let changed = false;


    const updatedNotifications =
      userNotifications.map(
        (notification) => {

          const notificationTo =
            normalizeEmail(
              notification?.to
            );


          const isRejection =
            notification?.type === "rejection";


          const isOldIgnore =
            notification?.type === "ignore";


          if (
            notificationTo === loggedInEmail &&
            (isRejection || isOldIgnore) &&
            notification?.read !== true
          ) {

            changed = true;


            return {

              ...notification,

              read: true

            };

          }


          return notification;

        }
      );


    if (!changed) {
      return;
    }


    localStorage.setItem(
      "userNotifications",
      JSON.stringify(
        updatedNotifications
      )
    );


    /*
    Tell Navbar to immediately
    update its notification badge.
    */

    window.dispatchEvent(
      new Event(
        "notificationsUpdated"
      )
    );

  };


  /*
  =========================================================
  INITIAL LOAD
  =========================================================
  */

  useEffect(() => {

    loadNotifications();

    markNotificationsAsRead();

  }, [loggedInEmail]);


  /*
  =========================================================
  LISTEN FOR NOTIFICATION UPDATES
  =========================================================
  */

  useEffect(() => {

    window.addEventListener(
      "notificationsUpdated",
      loadNotifications
    );


    window.addEventListener(
      "ignoredProfilesUpdated",
      loadNotifications
    );


    return () => {

      window.removeEventListener(
        "notificationsUpdated",
        loadNotifications
      );


      window.removeEventListener(
        "ignoredProfilesUpdated",
        loadNotifications
      );

    };

  }, [loggedInEmail]);


  /*
  =========================================================
  ACCEPT INTEREST
  =========================================================
  */

  const acceptInterest = (
    selectedRequest
  ) => {

    if (!selectedRequest) {
      return;
    }


    const selectedFrom =
      normalizeEmail(
        selectedRequest.from
      );


    const selectedTo =
      normalizeEmail(
        selectedRequest.to
      );


    if (
      !selectedFrom ||
      !selectedTo
    ) {

      toast.error(
        "Unable to accept this request."
      );

      return;

    }


    /*
    ---------------------------------------------------------
    GET INTEREST REQUESTS
    ---------------------------------------------------------
    */

    const interestRequests =
      JSON.parse(
        localStorage.getItem(
          "interestRequests"
        )
      ) || [];


    /*
    ---------------------------------------------------------
    UPDATE REQUEST
    ---------------------------------------------------------
    */

    let requestFound = false;


    const updatedRequests =
      interestRequests.map(
        (request) => {

          const requestFrom =
            normalizeEmail(
              request?.from
            );


          const requestTo =
            normalizeEmail(
              request?.to
            );


          if (
            requestFrom === selectedFrom &&
            requestTo === selectedTo &&
            request?.status === "Pending"
          ) {

            requestFound = true;


            return {

              ...request,

              status:
                "Accepted"

            };

          }


          return request;

        }
      );


    /*
    If another component already processed
    this request, don't create another match.
    */

    if (!requestFound) {

      toast.info(
        "This interest request has already been processed."
      );


      setNotifications(
        (previous) =>
          previous.filter(
            (notification) =>
              !(
                notification?.notificationType === "interest" &&

                normalizeEmail(
                  notification?.from
                ) === selectedFrom &&

                normalizeEmail(
                  notification?.to
                ) === selectedTo
              )
          )
      );


      return;

    }


    localStorage.setItem(
      "interestRequests",
      JSON.stringify(
        updatedRequests
      )
    );


    /*
    =======================================================
    CREATE MATCH
    =======================================================
    */

    const matchedUsers =
      JSON.parse(
        localStorage.getItem(
          "matchedUsers"
        )
      ) || [];


    const alreadyMatched =
      matchedUsers.some(
        (match) => {

          const user1 =
            normalizeEmail(
              match?.user1
            );


          const user2 =
            normalizeEmail(
              match?.user2
            );


          return (

            (
              user1 === selectedFrom &&
              user2 === selectedTo
            ) ||

            (
              user1 === selectedTo &&
              user2 === selectedFrom
            )

          );

        }
      );


    if (!alreadyMatched) {

      matchedUsers.push({

        user1:
          selectedRequest.from,

        user2:
          selectedRequest.to

      });


      localStorage.setItem(
        "matchedUsers",
        JSON.stringify(
          matchedUsers
        )
      );

    }

    /*
=======================================================
ADD ACCEPTED USER TO CURRENT USER'S WISHLIST
=======================================================
*/

const wishlistKey =
  `wishlist_${loggedInUser.email}`;


/*
GET CURRENT WISHLIST
*/

const currentWishlist =
  JSON.parse(
    localStorage.getItem(
      wishlistKey
    )
  ) || [];


/*
GET ACCEPTED USER'S FULL PROFILE
*/

const acceptedUserProfile =
  getSenderProfile(
    selectedRequest.from
  );


/*
CHECK IF USER IS ALREADY IN WISHLIST
*/

const alreadyInWishlist =
  currentWishlist.some(
    (wishlistUser) =>
      normalizeEmail(
        wishlistUser?.email
      ) === selectedFrom
  );


/*
ADD ACCEPTED USER ONLY ONCE
*/

if (!alreadyInWishlist) {

  const acceptedUserName =
    `${acceptedUserProfile?.firstName || ""} ${
      acceptedUserProfile?.lastName || ""
    }`.trim();


  currentWishlist.push({

    email:
      selectedRequest.from,

    name:
      selectedRequest.fromName ||
      acceptedUserName ||
      "User",

    gender:
      acceptedUserProfile?.gender ||
      "",

    occupation:
      acceptedUserProfile?.occupation ||
      "",

    city:
      acceptedUserProfile?.currentCity ||
      acceptedUserProfile?.city ||
      "",

    state:
      acceptedUserProfile?.currentState ||
      acceptedUserProfile?.stateName ||
      acceptedUserProfile?.state ||
      ""

  });


  /*
  SAVE LIGHTWEIGHT WISHLIST DATA
  */

  localStorage.setItem(
    wishlistKey,
    JSON.stringify(
      currentWishlist
    )
  );

}


    /*
    =======================================================
    REMOVE CURRENT NOTIFICATION
    =======================================================
    */

    setNotifications(
      (previous) =>
        previous.filter(
          (notification) =>
            !(
              notification?.notificationType === "interest" &&

              normalizeEmail(
                notification?.from
              ) === selectedFrom &&

              normalizeEmail(
                notification?.to
              ) === selectedTo
            )
        )
    );


    /*
    =======================================================
    RESET
    =======================================================
    */

    setSelectedRequest(null);

    setIgnoreReason("");

    setOtherReason("");


    /*
    =======================================================
    NOTIFY OTHER COMPONENTS
    =======================================================
    */

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


    /*
    =======================================================
    SUCCESS
    =======================================================
    */

    toast.success(
      `${
        selectedRequest.fromName ||
        "User"
      }'s request accepted ❤️`
    );

  };


  /*
  =========================================================
  OPEN IGNORE WARNING
  =========================================================
  */

  const openIgnoreWarning = (
    request
  ) => {

    setSelectedRequest(
      request
    );


    setShowIgnoreWarning(
      true
    );

  };


  /*
  =========================================================
  CONFIRM IGNORE WARNING
  =========================================================
  */

  const confirmIgnore = () => {

    setShowIgnoreWarning(
      false
    );


    setShowIgnoreModal(
      true
    );

  };


  /*
  =========================================================
  IGNORE INTEREST
  =========================================================
  */

  const ignoreInterest = () => {

    if (!selectedRequest) {
      return;
    }


    /*
    =======================================================
    VALIDATE REASON
    =======================================================
    */

    if (!ignoreReason) {

      toast.warning(
        "Please select a reason"
      );

      return;

    }


    if (
      ignoreReason === "Other" &&
      !otherReason.trim()
    ) {

      toast.warning(
        "Please enter your reason"
      );

      return;

    }


    const finalReason =
      ignoreReason === "Other"
        ? otherReason.trim()
        : ignoreReason;


    /*
    =======================================================
    EMAILS
    =======================================================
    */

    const selectedFrom =
      normalizeEmail(
        selectedRequest.from
      );


    const selectedTo =
      normalizeEmail(
        selectedRequest.to
      );


    const ignoringEmail =
      loggedInEmail;


    const ignoredEmail =
      selectedFrom;


    if (
      !selectedFrom ||
      !selectedTo ||
      !ignoringEmail
    ) {

      toast.error(
        "Unable to ignore this request."
      );

      return;

    }


    /*
    =======================================================
    1. SAVE TO ignoredProfiles
    =======================================================
    */

    const ignoredProfilesData =
      JSON.parse(
        localStorage.getItem(
          "ignoredProfiles"
        )
      ) || {};


    const existingKey =
      Object.keys(
        ignoredProfilesData
      ).find(
        (key) =>
          normalizeEmail(key) ===
          ignoringEmail
      );


    const currentKey =
      existingKey ||
      loggedInUser.email ||
      ignoringEmail;


    const currentIgnoredList =
      Array.isArray(
        ignoredProfilesData[currentKey]
      )
        ? ignoredProfilesData[currentKey]
        : [];


    const alreadyIgnored =
      currentIgnoredList.some(
        (item) => {

          const itemEmail =
            typeof item === "string"
              ? item
              : item?.email;


          return (
            normalizeEmail(
              itemEmail
            ) === ignoredEmail
          );

        }
      );


    const ignoredDate =
      new Date()
        .toLocaleString();


    if (!alreadyIgnored) {

      currentIgnoredList.push({

        email:
          selectedRequest.from,

        name:
          selectedRequest.fromName ||
          "User",

        ignoredBy:
          loggedInUser.email ||
          ignoringEmail,

        reason:
          finalReason,

        ignoredOn:
          ignoredDate

      });

    }


    ignoredProfilesData[currentKey] =
      currentIgnoredList;


    localStorage.setItem(
      "ignoredProfiles",
      JSON.stringify(
        ignoredProfilesData
      )
    );


    /*
    =======================================================
    2. SAVE TO ignored_<email>
    =======================================================
    */

    const ignoredKey =
      `ignored_${ignoringEmail}`;


    const existingIndividualIgnored =
      JSON.parse(
        localStorage.getItem(
          ignoredKey
        )
      ) || [];


    const alreadyInIndividualList =
      existingIndividualIgnored.some(
        (item) => {

          const itemEmail =
            typeof item === "string"
              ? item
              : item?.email;


          return (
            normalizeEmail(
              itemEmail
            ) === ignoredEmail
          );

        }
      );


    if (!alreadyInIndividualList) {

      existingIndividualIgnored.push({

        email:
          selectedRequest.from,

        name:
          selectedRequest.fromName ||
          "User",

        ignoredBy:
          loggedInUser.email ||
          ignoringEmail,

        reason:
          finalReason,

        ignoredOn:
          ignoredDate

      });

    }


    localStorage.setItem(
      ignoredKey,
      JSON.stringify(
        existingIndividualIgnored
      )
    );


    /*
    =======================================================
    3. UPDATE INTEREST REQUEST
    =======================================================
    */

    const interestRequests =
      JSON.parse(
        localStorage.getItem(
          "interestRequests"
        )
      ) || [];


    const updatedRequests =
      interestRequests.map(
        (request) => {

          const requestFrom =
            normalizeEmail(
              request?.from
            );


          const requestTo =
            normalizeEmail(
              request?.to
            );


          if (
            requestFrom === selectedFrom &&
            requestTo === selectedTo &&
            request?.status === "Pending"
          ) {

            return {

              ...request,

              status:
                "Ignored",

              ignoreReason:
                finalReason,

              ignoredOn:
                ignoredDate,

              /*
              Backward compatibility
              */

              rejectionReason:
                finalReason,

              rejectedOn:
                ignoredDate

            };

          }


          return request;

        }
      );


    localStorage.setItem(
      "interestRequests",
      JSON.stringify(
        updatedRequests
      )
    );


    /*
    =======================================================
    4. SAVE REJECTION HISTORY
    =======================================================
    */

    const rejectedProfiles =
      JSON.parse(
        localStorage.getItem(
          "rejectedProfiles"
        )
      ) || [];


    const alreadyRejected =
      rejectedProfiles.some(
        (item) => {

          const user1 =
            normalizeEmail(
              item?.user1
            );


          const user2 =
            normalizeEmail(
              item?.user2
            );


          return (

            (
              user1 === selectedFrom &&
              user2 === selectedTo
            ) ||

            (
              user1 === selectedTo &&
              user2 === selectedFrom
            )

          );

        }
      );


    if (!alreadyRejected) {

      rejectedProfiles.push({

        user1:
          selectedRequest.from,

        user2:
          selectedRequest.to,

        rejectedBy:
          ignoringEmail,

        rejectedUser:
          ignoredEmail,

        reason:
          finalReason,

        rejectedOn:
          ignoredDate

      });


      localStorage.setItem(
        "rejectedProfiles",
        JSON.stringify(
          rejectedProfiles
        )
      );

    }


    /*
    =======================================================
    5. GET CURRENT USER PROFILE
    =======================================================
    */

    const currentProfile =
      getSenderProfile(
        ignoringEmail
      );


    /*
    =======================================================
    6. CURRENT USER NAME
    =======================================================
    */

    const ignoringUserName = [

      currentProfile?.firstName,

      currentProfile?.lastName

    ]
      .filter(Boolean)
      .join(" ")
      .trim()

      ||

      currentProfile?.userName

      ||

      loggedInUser.userName

      ||

      loggedInUser.name

      ||

      loggedInUser.fullName

      ||

      "User";


    /*
    =======================================================
    7. CREATE REJECTION NOTIFICATION
    =======================================================

    IMPORTANT:

    Navbar.jsx currently counts:

      type === "rejection"

    Therefore use "rejection" here.
    =======================================================
    */

    const userNotifications =
      JSON.parse(
        localStorage.getItem(
          "userNotifications"
        )
      ) || [];


    const duplicateNotification =
      userNotifications.some(
        (notification) => {

          const notificationFrom =
            normalizeEmail(
              notification?.from
            );


          const notificationTo =
            normalizeEmail(
              notification?.to
            );


          return (

            (
              notification?.type === "rejection" ||
              notification?.type === "ignore"
            ) &&

            notificationFrom === ignoringEmail &&

            notificationTo === ignoredEmail

          );

        }
      );


    if (!duplicateNotification) {

      userNotifications.push({

        id:
          Date.now(),

        type:
          "rejection",

        from:
          ignoringEmail,

        fromName:
          ignoringUserName,

        to:
          selectedRequest.from,

        message:
          `${ignoringUserName} ignored your interest request.`,

        reason:
          finalReason,

        read:
          false,

        createdAt:
          ignoredDate

      });


      localStorage.setItem(
        "userNotifications",
        JSON.stringify(
          userNotifications
        )
      );

    }


    /*
    =======================================================
    8. REMOVE CURRENT INTEREST NOTIFICATION
    =======================================================
    */

    setNotifications(
      (previous) =>
        previous.filter(
          (notification) =>
            !(
              notification?.notificationType === "interest" &&

              normalizeEmail(
                notification?.from
              ) === selectedFrom &&

              normalizeEmail(
                notification?.to
              ) === selectedTo
            )
        )
    );


    /*
    =======================================================
    9. CLOSE MODALS
    =======================================================
    */

    setShowIgnoreModal(false);

    setShowIgnoreWarning(false);

    setSelectedRequest(null);

    setIgnoreReason("");

    setOtherReason("");


    /*
    =======================================================
    10. NOTIFY OTHER COMPONENTS
    =======================================================
    */

    window.dispatchEvent(
      new Event(
        "notificationsUpdated"
      )
    );


    window.dispatchEvent(
      new Event(
        "ignoredProfilesUpdated"
      )
    );


    window.dispatchEvent(
      new Event(
        "profileUpdated"
      )
    );


    /*
    =======================================================
    SUCCESS
    =======================================================
    */

    toast.success(
      "Profile moved to Ignored Profiles."
    );

  };


  /*
  =========================================================
  VIEW PROFILE
  =========================================================
  */

  const openSenderProfile = (
    notification
  ) => {

    if (!notification?.from) {

      toast.error(
        "Profile information is unavailable."
      );

      return;

    }


    const senderProfile =
      getSenderProfile(
        notification.from
      );


    navigate(
      "/view-profile",
      {
        state: {

          profile: {

            ...senderProfile,

            email:
              notification.from

          },

          from:
            "/notifications"

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

      <div className="main-content">

        <Navbar />


        <div className="notification-container">

          <h2>
            🔔 New Matches & Interests
          </h2>


          {notifications.length === 0 ? (

            <div className="empty-notification">

              No new notifications 💔

            </div>

          ) : (

            notifications.map(
              (
                notification,
                index
              ) => {

                /*
                =================================================
                IGNORE / REJECTION NOTIFICATION
                =================================================
                */

                if (
                  notification?.notificationType ===
                  "ignore"
                ) {

                  const ignoringProfile =
                    getSenderProfile(
                      notification.from
                    );


                  return (

                    <div
                      className="notification-card"
                      key={
                        notification.id ||
                        `${notification.from}-${notification.createdAt}-${index}`
                      }
                    >

                      <div className="profile-circle">

                        <img
                          src={getProfileImage(
                            ignoringProfile
                          )}
                          alt={
                            notification.fromName ||
                            "User"
                          }
                          onError={(e) => {

                            e.currentTarget.onerror =
                              null;

                            e.currentTarget.src =
                              "https://randomuser.me/api/portraits/lego/1.jpg";

                          }}
                        />

                      </div>


                      <div className="notification-details">

                        <h3>

                          {
                            notification.fromName ||
                            "User"
                          }

                        </h3>


                        <p>

                          🚫{" "}

                          {
                            notification.message ||
                            "This user ignored your interest request."
                          }

                        </p>


                        <p>

                          <strong>
                            Reason:
                          </strong>{" "}

                          {
                            notification.reason ||
                            "No reason provided"
                          }

                        </p>


                        <span>

                          📅{" "}

                          {
                            notification.createdAt ||
                            "Date not available"
                          }

                        </span>

                      </div>

                    </div>

                  );

                }


                /*
                =================================================
                INTEREST REQUEST
                =================================================
                */

                const senderProfile =
                  getSenderProfile(
                    notification.from
                  );


                return (

                  <div
                    className="notification-card"
                    key={
                      notification.id ||
                      `${notification.from}-${notification.sentOn}-${index}`
                    }
                  >

                    <div
                      className="profile-circle"
                      onClick={() =>
                        openSenderProfile(
                          notification
                        )
                      }
                      style={{
                        cursor:
                          "pointer"
                      }}
                    >

                      <img
                        src={getProfileImage(
                          senderProfile
                        )}
                        alt={
                          notification.fromName ||
                          "User"
                        }
                        onError={(e) => {

                          e.currentTarget.onerror =
                            null;

                          e.currentTarget.src =
                            "https://randomuser.me/api/portraits/lego/1.jpg";

                        }}
                      />

                    </div>


                    <div className="notification-details">

                      <h3
                        onClick={() =>
                          openSenderProfile(
                            notification
                          )
                        }
                        style={{
                          cursor:
                            "pointer"
                        }}
                      >

                        {
                          notification.fromName ||
                          "User"
                        }

                      </h3>


                      <p>

                        ❤️ Sent you an interest

                      </p>


                      <span>

                        📅{" "}

                        {
                          notification.sentOn ||
                          notification.createdAt ||
                          "Date not available"
                        }

                      </span>


                      <div className="notification-buttons">

                        {/* VIEW PROFILE */}

                        <button
                          className="view-profile-btn"
                          onClick={() =>
                            openSenderProfile(
                              notification
                            )
                          }
                        >

                          👁 View Profile

                        </button>


                        {/* ACCEPT */}

                        <button
                          className="accept-btn"
                          onClick={() =>
                            acceptInterest(
                              notification
                            )
                          }
                        >

                          ❤️ Accept

                        </button>


                        {/* IGNORE */}

                        <button
                          className="reject-btn"
                          onClick={() =>
                            openIgnoreWarning(
                              notification
                            )
                          }
                        >

                          🚫 Ignore

                        </button>

                      </div>

                    </div>

                  </div>

                );

              }
            )

          )}

        </div>

      </div>


      {/* =========================================================
          IGNORE WARNING MODAL
      =========================================================
      */}

      {showIgnoreWarning && (

        <div className="ignore-modal-overlay">

          <div className="ignore-modal">

            <h2>
              ⚠️ Are you sure?
            </h2>


            <p>

              Are you sure you want to
              ignore this person?

            </p>


            <p>

              This person will be moved to
              your Ignored Profiles.
              You can restore them anytime
              later.

            </p>


            <div className="ignore-buttons">

              <button
                className="cancel-btn"
                onClick={() => {

                  setShowIgnoreWarning(
                    false
                  );

                  setSelectedRequest(
                    null
                  );

                }}
              >

                Cancel

              </button>


              <button
                className="submit-btn"
                onClick={
                  confirmIgnore
                }
              >

                Yes, Ignore

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =========================================================
          IGNORE REASON MODAL
      =========================================================
      */}

      {showIgnoreModal && (

        <div className="ignore-modal-overlay">

          <div className="ignore-modal">

            <h2>
              Ignore Interest
            </h2>


            <p>

              Please tell us why you
              are ignoring this request.

            </p>


            {/* NOT INTERESTED */}

            <label>

              <input
                type="radio"
                name="reason"
                value="Not Interested"
                checked={
                  ignoreReason ===
                  "Not Interested"
                }
                onChange={(e) =>
                  setIgnoreReason(
                    e.target.value
                  )
                }
              />

              Not Interested

            </label>


            {/* AGE */}

            <label>

              <input
                type="radio"
                name="reason"
                value="Age doesn't match"
                checked={
                  ignoreReason ===
                  "Age doesn't match"
                }
                onChange={(e) =>
                  setIgnoreReason(
                    e.target.value
                  )
                }
              />

              Age doesn't match

            </label>


            {/* EDUCATION */}

            <label>

              <input
                type="radio"
                name="reason"
                value="Education doesn't match"
                checked={
                  ignoreReason ===
                  "Education doesn't match"
                }
                onChange={(e) =>
                  setIgnoreReason(
                    e.target.value
                  )
                }
              />

              Education doesn't match

            </label>


            {/* OCCUPATION */}

            <label>

              <input
                type="radio"
                name="reason"
                value="Occupation doesn't match"
                checked={
                  ignoreReason ===
                  "Occupation doesn't match"
                }
                onChange={(e) =>
                  setIgnoreReason(
                    e.target.value
                  )
                }
              />

              Occupation doesn't match

            </label>


            {/* RELIGION / CASTE */}

            <label>

              <input
                type="radio"
                name="reason"
                value="Religion/Caste doesn't match"
                checked={
                  ignoreReason ===
                  "Religion/Caste doesn't match"
                }
                onChange={(e) =>
                  setIgnoreReason(
                    e.target.value
                  )
                }
              />

              Religion/Caste doesn't match

            </label>


            {/* OTHER */}

            <label>

              <input
                type="radio"
                name="reason"
                value="Other"
                checked={
                  ignoreReason ===
                  "Other"
                }
                onChange={(e) =>
                  setIgnoreReason(
                    e.target.value
                  )
                }
              />

              Other

            </label>


            {ignoreReason === "Other" && (

              <textarea
                placeholder="Enter your reason..."
                value={otherReason}
                onChange={(e) =>
                  setOtherReason(
                    e.target.value
                  )
                }
              />

            )}


            {/* BUTTONS */}

            <div className="ignore-buttons">

              <button
                className="cancel-btn"
                onClick={() => {

                  setShowIgnoreModal(
                    false
                  );

                  setSelectedRequest(
                    null
                  );

                  setIgnoreReason("");

                  setOtherReason("");

                }}
              >

                Cancel

              </button>


              <button
                className="submit-btn"
                onClick={
                  ignoreInterest
                }
              >

                Submit

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


export default Notifications;
