import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import "../styles/Dashboard.css";
import "../styles/ViewProfile.css";

function ViewProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
  if (location.state?.from === "my-profile") {
    navigate(-1);
    return;
  }

  navigate("/Users");
};
  /*
  =========================================================
  LOGGED-IN USER
  =========================================================
  */

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};
   
    const matchedUsers =
  JSON.parse(localStorage.getItem("matchedUsers")) || [];

  /*
  =========================================================
  ALL PROFILES
  =========================================================
  */

  const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};

  /*
  =========================================================
  SELECTED USER
  =========================================================

  When coming from Users.jsx:

  navigate("/view-profile", {
    state: employee
  });

  selectedUser will contain the selected person's email.
  */

  const selectedUser = location.state?.profile || null;

  /*
  =========================================================
  PROFILE EMAIL
  =========================================================
  */

  const profileEmail =
    selectedUser?.email || loggedInUser.email;

  /*
  =========================================================
  PROFILE DATA
  =========================================================

  If another user is selected:
      Show that user's profile.

  Otherwise:
      Show logged-in user's profile.
  */

const profileEntry =
  Object.entries(allProfiles).find(
    ([email]) =>
      email.trim().toLowerCase() ===
      profileEmail?.trim().toLowerCase()
  );

const profileData =
  profileEntry?.[1] ||
  selectedUser ||
  {};

  /*
  =========================================================
  CHECK IF OTHER USER
  =========================================================
  */

  const isOtherUser =
    profileEmail &&
    profileEmail !== loggedInUser.email;

    const isMatched = matchedUsers.some(
  (match) =>
    (match.user1 === loggedInUser.email &&
      match.user2 === profileEmail) ||
    (match.user2 === loggedInUser.email &&
      match.user1 === profileEmail)
);

  /*
  =========================================================
  WISHLIST KEY
  =========================================================
  */

  const wishlistKey =
    `wishlist_${loggedInUser.email}`;

  /*
  =========================================================
  STATES
  =========================================================
  */

  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const [interestSent, setInterestSent] =
    useState(false);

  /*
  =========================================================
  DISPLAY NAME
  =========================================================
  */

  const displayName =
    `${profileData.firstName || ""} ${
      profileData.lastName || ""
    }`.trim() ||

    profileData.userName ||

    profileData.fullName ||

    selectedUser?.name ||

    "User";

  /*
  =========================================================
  CALCULATE AGE
  =========================================================
  */

  const calculateAge = (dob) => {
    if (!dob) {
      return "N/A";
    }

    const birthDate =
      new Date(dob);

    const today =
      new Date();

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

  /*
  =========================================================
  LOCATION
  =========================================================
  */

  const city =
    profileData.currentCity ||
    profileData.city ||
    "";

  const state =
    profileData.currentState ||
    profileData.stateName ||
    profileData.state ||
    "";

  const country =
    profileData.currentCountry ||
    profileData.country ||
    "";

  const locationText = [
    city,
    state,
    country
  ]
    .filter(Boolean)
    .join(", ");

  /*
  =========================================================
  PROFILE IMAGE

  IMPORTANT:

  We DO NOT copy this image into wishlist.

  The image remains inside allProfiles.

  Wishlist stores only email and basic information.
  =========================================================
  */

const profileImage =
  profileData.profilePhoto ||
  profileData.profileImage ||
  selectedUser?.image ||
  "https://randomuser.me/api/portraits/lego/1.jpg";

  /*
  =========================================================
  LOAD WISHLIST AND INTEREST STATUS
  =========================================================
  */

  useEffect(() => {
    if (!isOtherUser) {
      return;
    }

    /*
    -----------------------------
    CHECK WISHLIST
    -----------------------------
    */

    const wishlist =
      JSON.parse(
        localStorage.getItem(wishlistKey)
      ) || [];

    const alreadyWishlisted =
      wishlist.some(
        (user) =>
          user.email === profileEmail
      );

    setIsWishlisted(
      alreadyWishlisted
    );

    /*
    -----------------------------
    CHECK INTEREST
    -----------------------------
    */

    const interests =
      JSON.parse(
        localStorage.getItem(
          "sentInterests"
        )
      ) || [];

    const alreadySent =
      interests.some(
        (interest) =>
          interest.from ===
            loggedInUser.email &&
          interest.to ===
            profileEmail
      );

    setInterestSent(
      alreadySent
    );

  }, [
    profileEmail,
    wishlistKey,
    isOtherUser,
    loggedInUser.email
  ]);

  /*
  =========================================================
  ADD / REMOVE WISHLIST
  =========================================================

  IMPORTANT:

  We only save lightweight information.

  We DO NOT save profileImage or profilePhoto.

  This prevents localStorage quota errors caused by
  large Base64 images.
  =========================================================
  */

  const handleWishlist = () => {
    if (!isOtherUser) {
      return;
    }

    const wishlist =
      JSON.parse(
        localStorage.getItem(
          wishlistKey
        )
      ) || [];

    /*
    -----------------------------
    REMOVE FROM WISHLIST
    -----------------------------
    */

    if (isWishlisted) {
      const updatedWishlist =
        wishlist.filter(
          (user) =>
            user.email !==
            profileEmail
        );

      try {
        localStorage.setItem(
          wishlistKey,
          JSON.stringify(
            updatedWishlist
          )
        );

        setIsWishlisted(false);

      } catch (error) {
        console.error(
          "Unable to update wishlist:",
          error
        );
      }

      return;
    }

    /*
    -----------------------------
    ADD TO WISHLIST
    -----------------------------

    ONLY SMALL DATA IS STORED.

    NO IMAGE IS STORED HERE.
    -----------------------------
    */

    const wishlistUser = {
      email: profileEmail,

      name: displayName,

      gender:
        profileData.gender ||
        "",

      occupation:
        profileData.occupation ||
        "",

      city:
        city,

      state:
        state
    };

    /*
    Prevent duplicate entries
    */

    const alreadyExists =
      wishlist.some(
        (user) =>
          user.email ===
          profileEmail
      );

    if (alreadyExists) {
      setIsWishlisted(true);
      return;
    }

    const updatedWishlist = [
      ...wishlist,
      wishlistUser
    ];

    try {
      localStorage.setItem(
        wishlistKey,
        JSON.stringify(
          updatedWishlist
        )
      );

      setIsWishlisted(true);

    } catch (error) {
      console.error(
        "Unable to save wishlist:",
        error
      );

      alert(
        "Unable to add this profile to wishlist. Please try again."
      );
    }
  };

  /*
  =========================================================
  SEND INTEREST
  =========================================================
  */

  const handleSendInterest = () => {
    if (!isOtherUser) {
      return;
    }

    if (interestSent) {
      return;
    }

    const interests =
      JSON.parse(
        localStorage.getItem(
          "sentInterests"
        )
      ) || [];

    /*
    Prevent duplicate interest
    */

    const alreadyExists =
      interests.some(
        (interest) =>
          interest.from ===
            loggedInUser.email &&
          interest.to ===
            profileEmail
      );

    if (alreadyExists) {
      setInterestSent(true);
      return;
    }

    const newInterest = {
      id: Date.now(),

      from:
        loggedInUser.email,

      to:
        profileEmail,

      fromName:
        loggedInUser.userName ||
        loggedInUser.fullName ||
        "User",

      toName:
        displayName,

      status:
        "Pending",

      date:
        new Date().toISOString()
    };

    const updatedInterests = [
      ...interests,
      newInterest
    ];

    localStorage.setItem(
      "sentInterests",
      JSON.stringify(
        updatedInterests
      )
    );

    setInterestSent(true);
  };

  /*
  =========================================================
  MESSAGE
  =========================================================
  */

  const handleMessage = () => {
    console.log("===== HANDLE MESSAGE CLICKED =====");
    alert("handleMessage called");

  if (!isOtherUser) {
    return;
  }

  const matchedUsers =
    JSON.parse(localStorage.getItem("matchedUsers")) || [];

  const isMatched = matchedUsers.some(
    (match) =>
      (match.user1 === loggedInUser.email &&
        match.user2 === profileEmail) ||
      (match.user2 === loggedInUser.email &&
        match.user1 === profileEmail)
  );
console.log("Logged In User:", loggedInUser.email);
console.log("Profile Email:", profileEmail);
console.log("Matched Users:", matchedUsers);
console.log("Is Matched:", isMatched);

  if (!isMatched) {

    toast.error(
      "🔒 You can chat only after your interest request is accepted."
    );

    return;
  }

  navigate("/inbox", {
    state: {
      selectedUser: {
        ...selectedUser,
        email: profileEmail,
        name: displayName,
        image: profileImage,
        occupation: profileData.occupation || "",
        city: city,
        stateName: state
      }
    }
  });

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

        <div className="view-profile-container">

          <div className="view-profile-card">

            {/* =================================================
                PROFILE HEADER
            ================================================= */}

            <div className="view-profile-header">

              <img
                src={profileImage}
                alt={displayName}
                className="view-profile-image"
              />

              <div className="view-profile-header-info">

                <h1>
                  {displayName}
                </h1>

                <p>
                  {calculateAge(
                    profileData.dob
                  )}

                  {" • "}

                  {profileData.gender ||
                    "Gender not added"}
                </p>

                <p>
                  {locationText ||
                    "Location not added"}
                </p>

              </div>

            </div>

            {/* =================================================
                ACTION BUTTONS

                Only shown when viewing another user.
            ================================================= */}

            {isOtherUser && (

              <div className="profile-action-buttons">

                {/* SEND INTEREST */}

               {isMatched ? (

  <button
    className="matched-btn"
    disabled
  >
    💞 Matched
  </button>

) : (

  <button
    className={
      interestSent
        ? "interest-btn sent"
        : "interest-btn"
    }
    onClick={handleSendInterest}
    disabled={interestSent}
  >

    {interestSent
      ? "❤️ Interest Sent"
      : "❤️ Send Interest"
    }

  </button>

)}

                {/* MESSAGE */}

                <button
                  className="message-btn"
                  onClick={
                    handleMessage
                  }
                >

                  💬 Message

                </button>

                {/* WISHLIST */}

                <button
                  className={
                    isWishlisted
                      ? "wishlist-btn active"
                      : "wishlist-btn"
                  }
                  onClick={
                    handleWishlist
                  }
                >

                  {isWishlisted
                    ? "⭐ Remove from Wishlist"
                    : "⭐ Add to Wishlist"
                  }

                </button>

              </div>

            )}

            {/* =================================================
    ABOUT ME
================================================= */}

{profileData.aboutMe && (
  <section className="about-me-view-section">

    <div className="about-me-view-title">
      <span className="about-me-icon">💗</span>

      <div>
        <h2>About Me</h2>
       <h3><p>A little about this person</p></h3>
      </div>
    </div>

    <div className="about-me-view-content">
      <p>
        {profileData.aboutMe}
      </p>
    </div>

  </section>
)}

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <section>

              <h2>
                Basic Information
              </h2>

              <div className="view-info-grid">

                <div>
                  <span>Age</span>
                  <strong>
                    {calculateAge(
                      profileData.dob
                    )}
                  </strong>
                </div>

                <div>
                  <span>Gender</span>
                  <strong>
                    {profileData.gender ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Marital Status</span>
                  <strong>
                    {profileData.maritalStatus ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Height</span>
                  <strong>
                    {profileData.height ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Religion</span>
                  <strong>
                    {profileData.religion ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {locationText ||
                      "N/A"}
                  </strong>
                </div>

              </div>

            </section>

            {/* =================================================
                EDUCATION & CAREER
            ================================================= */}

            <section>

              <h2>
                Education & Career
              </h2>

              <div className="view-info-grid">

                <div>
                  <span>
                    Qualification
                  </span>

                  <strong>
                    {profileData.qualification ||
                      profileData.education ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>
                    Occupation
                  </span>

                  <strong>
                    {profileData.occupation ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>
                    Work Location
                  </span>

                  <strong>
                    {profileData.workLocation ||
                      "N/A"}
                  </strong>
                </div>

              </div>

            </section>

            {/* =================================================
                FAMILY & LIFESTYLE
            ================================================= */}

            <section>

              <h2>
                Family & Lifestyle
              </h2>

              <div className="view-info-grid">

                <div>
                  <span>
                    Family Type
                  </span>

                  <strong>
                    {profileData.familyType ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>
                    Food Preference
                  </span>

                  <strong>
                    {profileData.foodPreference ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>
                    Smoking
                  </span>

                  <strong>
                    {profileData.smokingHabit ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>
                    Drinking
                  </span>

                  <strong>
                    {profileData.drinkingHabit ||
                      "N/A"}
                  </strong>
                </div>

              </div>

            </section>

            {/* =================================================
                PARTNER PREFERENCE
            ================================================= */}

            <section>

              <h2>
                Partner Preference
              </h2>

              <div className="view-info-grid">

                <div>
                  <span>
                    Preferred Age
                  </span>

                  <strong>
                    {profileData.partnerAgeFrom &&
                    profileData.partnerAgeTo
                      ? `${profileData.partnerAgeFrom} - ${profileData.partnerAgeTo}`
                      : "N/A"}
                  </strong>
                </div>

                <div>
                  <span>
                    Education
                  </span>

                  <strong>
                    {profileData.partnerEducation ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>
                    Occupation
                  </span>

                  <strong>
                    {profileData.partnerOccupation ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>
                    Preferred Location
                  </span>

                  <strong>
                    {profileData.partnerCountry ||
                      "N/A"}
                  </strong>
                </div>

              </div>

            </section>

            {/* =================================================
                BACK BUTTON
            ================================================= */}

            <div className="view-profile-actions">

              <button
                className="back-profile-btn"
                onClick={handleBack}>
                
                ← Back to Profiles
              </button>

            </div>

          </div>

        </div>

        <PageNavigation
  previous="/Users"
  next="/inbox"
/>

      </div>

    </div>
  );
}

export default ViewProfile;