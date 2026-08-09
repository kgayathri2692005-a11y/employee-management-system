import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import "../styles/Dashboard.css";
import "../styles/ViewProfile.css";

function ViewProfile() {

  const navigate = useNavigate();
  const location = useLocation();

 const handleBack = () => {
  if (location.state?.from) {
    navigate(location.state.from);
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
    JSON.parse(
      localStorage.getItem("loggedInUser")
    ) || {};

  const matchedUsers =
    JSON.parse(
      localStorage.getItem("matchedUsers")
    ) || [];

  /*
  =========================================================
  ALL PROFILES
  =========================================================
  */

  const allProfiles =
    JSON.parse(
      localStorage.getItem("allProfiles")
    ) || {};

  /*
  =========================================================
  SELECTED USER
  =========================================================
  */

  const selectedUser =
    location.state?.profile || null;

  /*
  =========================================================
  PROFILE EMAIL
  =========================================================
  */

  const profileEmail =
    selectedUser?.email ||
    loggedInUser.email;

  /*
  =========================================================
  PROFILE DATA
  =========================================================
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
  CHECK OTHER USER
  =========================================================
  */

  const isOtherUser =
    profileEmail &&
    profileEmail !== loggedInUser.email;

  /*
  =========================================================
  CHECK MATCH
  =========================================================
  */

  const isMatched =
    matchedUsers.some(
      (match) =>
        (
          match.user1 === loggedInUser.email &&
          match.user2 === profileEmail
        ) ||
        (
          match.user2 === loggedInUser.email &&
          match.user1 === profileEmail
        )
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
  AGE
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

  const locationText =
    [
      city,
      state,
      country
    ]
      .filter(Boolean)
      .join(", ");

  /*
  =========================================================
  PROFILE IMAGE
  =========================================================
  */

  const profileImage =
    profileData.profilePhoto ||
    profileData.profileImage ||
    selectedUser?.image ||
    "https://randomuser.me/api/portraits/lego/1.jpg";

  /*
  =========================================================
  LOAD WISHLIST + INTEREST
  =========================================================
  */

  useEffect(() => {

    if (!isOtherUser) {
      return;
    }

    const wishlist =
      JSON.parse(
        localStorage.getItem(
          wishlistKey
        )
      ) || [];

    const alreadyWishlisted =
      wishlist.some(
        (user) =>
          user.email === profileEmail
      );

    setIsWishlisted(
      alreadyWishlisted
    );

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
  WISHLIST
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

        toast.success(
          "Removed from wishlist."
        );

      } catch (error) {

        console.error(
          "Unable to update wishlist:",
          error
        );

      }

      return;

    }

    const wishlistUser = {

      email:
        profileEmail,

      name:
        displayName,

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

      toast.success(
        "Added to your wishlist."
      );

    } catch (error) {

      console.error(
        "Unable to save wishlist:",
        error
      );

      toast.error(
        "Unable to add this profile to wishlist."
      );

    }

  };

  /*
  =========================================================
  SEND INTEREST
  =========================================================
  */

  const handleSendInterest = () => {

    if (!isOtherUser || interestSent) {
      return;
    }

    const interests =
      JSON.parse(
        localStorage.getItem(
          "sentInterests"
        )
      ) || [];

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

      id:
        Date.now(),

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

    localStorage.setItem(
      "sentInterests",
      JSON.stringify([
        ...interests,
        newInterest
      ])
    );

    setInterestSent(true);

    toast.success(
      "Interest sent successfully!"
    );

  };

  /*
  =========================================================
  MESSAGE
  =========================================================
  */

  const handleMessage = () => {

    if (!isOtherUser) {
      return;
    }

    const matched =
      matchedUsers.some(
        (match) =>
          (
            match.user1 ===
            loggedInUser.email &&
            match.user2 ===
            profileEmail
          ) ||
          (
            match.user2 ===
            loggedInUser.email &&
            match.user1 ===
            profileEmail
          )
      );

    if (!matched) {

      toast.error(
        "🔒 You can chat only after your interest request is accepted."
      );

      return;

    }

    navigate(
      "/inbox",
      {
        state: {
          selectedUser: {

            ...selectedUser,

            email:
              profileEmail,

            name:
              displayName,

            image:
              profileImage,

            occupation:
              profileData.occupation ||
              "",

            city:
              city,

            stateName:
              state

          }
        }
      }
    );

  };

  /*
  =========================================================
  HELPER
  =========================================================
  */

  const displayValue = (value) => {

    if (
      value === undefined ||
      value === null ||
      String(value).trim() === ""
    ) {

      return "Not provided";

    }

    return value;

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

        <div className="view-profile-container">

          <div className="view-profile-card">

            {/* =================================================
                PROFILE HERO
            ================================================= */}

            <div className="profile-hero">

              <div className="profile-hero-image-wrapper">

                <img
                  src={profileImage}
                  alt={displayName}
                  className="view-profile-image"
                />

                <span className="profile-online-dot"></span>

              </div>

              <div className="view-profile-header-info">

                <span className="profile-label">
                  MATRIMONY PROFILE
                </span>

                <h1>
                  {displayName}
                </h1>

                <div className="profile-short-details">

                  <span>
                    🎂 {calculateAge(profileData.dob)}
                  </span>

                  <span className="detail-divider">
                    •
                  </span>

                  <span>
                    👤 {displayValue(profileData.gender)}
                  </span>

                </div>

                <div className="profile-location">

                  📍 {locationText || "Location not added"}

                </div>

                {profileData.occupation && (

                  <div className="profile-occupation">

                    💼 {profileData.occupation}

                  </div>

                )}

              </div>

            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            {isOtherUser && (

              <div className="profile-action-buttons">

                {isMatched ? (

                  <button
                    className="profile-action-btn matched-btn"
                    disabled
                  >
                    💞 Matched
                  </button>

                ) : (

                  <button
                    className={
                      interestSent
                        ? "profile-action-btn interest-btn sent"
                        : "profile-action-btn interest-btn"
                    }
                    onClick={handleSendInterest}
                    disabled={interestSent}
                  >

                    {interestSent
                      ? "✓ Interest Sent"
                      : "❤️ Send Interest"
                    }

                  </button>

                )}

                <button
                  className="profile-action-btn message-btn"
                  onClick={handleMessage}
                >
                  💬 Message
                </button>

                <button
                  className={
                    isWishlisted
                      ? "profile-action-btn wishlist-btn active"
                      : "profile-action-btn wishlist-btn"
                  }
                  onClick={handleWishlist}
                >

                  {isWishlisted
                    ? "★ Saved"
                    : "☆ Add to Wishlist"
                  }

                </button>

              </div>

            )}

            {/* =================================================
                ABOUT ME
            ================================================= */}

            {profileData.aboutMe && (

              <section className="about-me-view-section">

                <div className="section-heading">

                  <div className="section-icon about-icon">
                    ♡
                  </div>

                  <div>
                    <h2>
                      About Me
                    </h2>

                    <p>
                      A little more about this person
                    </p>
                  </div>

                </div>

                <div className="about-me-view-content">

                  <div className="quote-mark">
                    
                  </div>

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

              <div className="section-heading">

                <div className="section-icon blue-icon">
                  ♢
                </div>

                <div>
                  <h2>
                    Basic Information
                  </h2>

                  <p>
                    Personal details and background
                  </p>
                </div>

              </div>

              <div className="view-info-grid">

                <div>
                  <span>Age</span>
                  <strong>
                    {calculateAge(profileData.dob)}
                  </strong>
                </div>

                <div>
                  <span>Gender</span>
                  <strong>
                    {displayValue(profileData.gender)}
                  </strong>
                </div>

                <div>
                  <span>Marital Status</span>
                  <strong>
                    {displayValue(profileData.maritalStatus)}
                  </strong>
                </div>

                <div>
                  <span>Height</span>
                  <strong>
                    {displayValue(profileData.height)}
                  </strong>
                </div>

                <div>
                  <span>Religion</span>
                  <strong>
                    {displayValue(profileData.religion)}
                  </strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {locationText || "Not provided"}
                  </strong>
                </div>

              </div>

            </section>

            {/* =================================================
                EDUCATION & CAREER
            ================================================= */}

            <section>

              <div className="section-heading">

                <div className="section-icon purple-icon">
                  🎓
                </div>

                <div>
                  <h2>
                    Education & Career
                  </h2>

                  <p>
                    Education, profession and work details
                  </p>
                </div>

              </div>

              <div className="view-info-grid">

                <div>
                  <span>
                    Qualification
                  </span>

                  <strong>
                    {displayValue(
                      profileData.qualification ||
                      profileData.education
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Occupation
                  </span>

                  <strong>
                    {displayValue(
                      profileData.occupation
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Work Location
                  </span>

                  <strong>
                    {displayValue(
                      profileData.workLocation
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Annual Income
                  </span>

                  <strong>
                    {displayValue(
                      profileData.income
                    )}
                  </strong>
                </div>

              </div>

            </section>

            {/* =================================================
                FAMILY & LIFESTYLE
            ================================================= */}

            <section>

              <div className="section-heading">

                <div className="section-icon green-icon">
                  ♧
                </div>

                <div>
                  <h2>
                    Family & Lifestyle
                  </h2>

                  <p>
                    Family background and lifestyle choices
                  </p>

                </div>

              </div>

              <div className="view-info-grid">

                <div>
                  <span>
                    Family Type
                  </span>

                  <strong>
                    {displayValue(
                      profileData.familyType
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Food Preference
                  </span>

                  <strong>
                    {displayValue(
                      profileData.foodPreference
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Smoking
                  </span>

                  <strong>
                    {displayValue(
                      profileData.smokingHabit
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Drinking
                  </span>

                  <strong>
                    {displayValue(
                      profileData.drinkingHabit
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Father
                  </span>

                  <strong>
                    {displayValue(
                      profileData.fatherName
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Mother
                  </span>

                  <strong>
                    {displayValue(
                      profileData.motherName
                    )}
                  </strong>
                </div>

              </div>

            </section>

            {/* =================================================
                PARTNER PREFERENCE
            ================================================= */}

            <section>

              <div className="section-heading">

                <div className="section-icon rose-icon">
                  ♡
                </div>

                <div>
                  <h2>
                    Partner Preference
                  </h2>

                  <p>
                    What this person is looking for
                  </p>

                </div>

              </div>

              <div className="view-info-grid">

                <div>
                  <span>
                    Preferred Age
                  </span>

                  <strong>

                    {profileData.partnerAgeFrom &&
                    profileData.partnerAgeTo

                      ? `${profileData.partnerAgeFrom} - ${profileData.partnerAgeTo}`

                      : "Not specified"}

                  </strong>

                </div>

                <div>
                  <span>
                    Education
                  </span>

                  <strong>
                    {displayValue(
                      profileData.partnerEducation
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Occupation
                  </span>

                  <strong>
                    {displayValue(
                      profileData.partnerOccupation
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Preferred Religion
                  </span>

                  <strong>
                    {displayValue(
                      profileData.partnerReligion
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Preferred Location
                  </span>

                  <strong>
                    {displayValue(
                      profileData.partnerCountry
                    )}
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
                onClick={handleBack}
              >
                ← Back to Profiles
              </button>

            </div>

          </div>

        </div>

       <PageNavigation
  previous={location.state?.from || "/Users"}
  next="/inbox"
/>

      </div>

    </div>

  );

}

export default ViewProfile;