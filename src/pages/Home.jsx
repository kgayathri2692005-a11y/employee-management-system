import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import "../styles/Home.css";

function Home() {
const navigate = useNavigate();
const [showAllRecommendations, setShowAllRecommendations] = useState(false);

// =====================================================
// LOGGED IN USER
// =====================================================

const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

// =====================================================
// ALL PROFILES
// =====================================================

const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};
    

// =====================================================
// CURRENT PROFILE
// =====================================================

const profile =
    allProfiles[loggedInUser.email] || {};

// =====================================================
// DAILY RECOMMENDATIONS
// =====================================================

const preferredGender =
    String(profile.gender || "")
        .trim()
        .toLowerCase() === "male"
        ? "female"
        : String(profile.gender || "")
              .trim()
              .toLowerCase() === "female"
        ? "male"
        : "";

const calculateRecommendationAge = (dob) => {
    if (!dob) return null;

    const birthDate = new Date(dob);

    if (Number.isNaN(birthDate.getTime())) {
        return null;
    }

    const today = new Date();

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

    return age;
};

const calculateMatchPercentage = (user) => {

    let matchedCriteria = 0;
    let totalCriteria = 0;

    // =====================================================
    // 1. AGE
    // =====================================================

    const ageFrom =
        Number(profile.partnerAgeFrom);

    const ageTo =
        Number(profile.partnerAgeTo);

    if (
        ageFrom &&
        ageTo &&
        user.dob
    ) {
        const userAge =
            calculateRecommendationAge(
                user.dob
            );

        if (userAge !== null) {

            totalCriteria++;

            if (
                userAge >= ageFrom &&
                userAge <= ageTo
            ) {
                matchedCriteria++;
            }
        }
    }


    // =====================================================
    // 2. RELIGION
    // =====================================================

    const preferredReligion =
        (
            profile.partnerReligion ||
            ""
        )
            .trim()
            .toLowerCase();

    if (preferredReligion) {

        totalCriteria++;

        const userReligion =
            (
                user.religion ||
                ""
            )
                .trim()
                .toLowerCase();

        if (
            preferredReligion ===
                "any religion" ||
            preferredReligion ===
                userReligion
        ) {
            matchedCriteria++;
        }
    }


    // =====================================================
    // 3. EDUCATION
    // =====================================================

    const preferredEducation =
        (
            profile.partnerEducation ||
            ""
        )
            .trim()
            .toLowerCase();

    if (preferredEducation) {

        totalCriteria++;

        const userEducation =
            (
                user.qualification ||
                user.education ||
                ""
            )
                .trim()
                .toLowerCase();

        if (
            preferredEducation ===
                "any education" ||
            preferredEducation ===
                userEducation
        ) {
            matchedCriteria++;
        }
    }


    // =====================================================
    // 4. OCCUPATION
    // =====================================================

    const preferredOccupation =
        (
            profile.partnerOccupation ||
            ""
        )
            .trim()
            .toLowerCase();

    if (preferredOccupation) {

        totalCriteria++;

        const userOccupation =
            (
                user.occupation ||
                ""
            )
                .trim()
                .toLowerCase();

        if (
            preferredOccupation ===
                "any occupation" ||
            preferredOccupation ===
                userOccupation
        ) {
            matchedCriteria++;
        }
    }


    // =====================================================
    // 5. LOCATION
    // Same logic as Users.jsx
    // =====================================================

    const preferredLocation =
        (
            profile.partnerCountry ||
            ""
        )
            .trim()
            .toLowerCase();

    if (preferredLocation) {

        totalCriteria++;

        const userCity =
            (
                user.currentCity ||
                user.city ||
                ""
            )
                .trim()
                .toLowerCase();

        const userState =
            (
                user.currentState ||
                user.stateName ||
                user.state ||
                ""
            )
                .trim()
                .toLowerCase();

        const userCountry =
            (
                user.currentCountry ||
                user.country ||
                ""
            )
                .trim()
                .toLowerCase();

        if (
            userCity.includes(
                preferredLocation
            ) ||
            userState.includes(
                preferredLocation
            ) ||
            userCountry.includes(
                preferredLocation
            ) ||
            preferredLocation.includes(
                userCity
            ) ||
            preferredLocation.includes(
                userState
            ) ||
            preferredLocation.includes(
                userCountry
            )
        ) {
            matchedCriteria++;
        }
    }


    // =====================================================
    // FINAL MATCH PERCENTAGE
    // =====================================================

    if (totalCriteria === 0) {
        return 0;
    }

    return Math.round(
        (
            matchedCriteria /
            totalCriteria
        ) * 100
    );
};

const dailyRecommendations = Object.entries(allProfiles)

    .filter(([email, user]) => {

        // =====================================================
        // NEVER SHOW LOGGED-IN USER
        // =====================================================

        if (
            email.trim().toLowerCase() ===
            (loggedInUser.email || "")
                .trim()
                .toLowerCase()
        ) {
            return false;
        }


        // =====================================================
        // GENDER FILTER
        // =====================================================

        const userGender =
            String(user.gender || "")
                .trim()
                .toLowerCase();

        // Only recommend the opposite gender
        if (
            preferredGender &&
            userGender !== preferredGender
        ) {
            return false;
        }


        return true;
    })

.map(([email, user]) => {

    const matchPercent =
        calculateMatchPercentage(user);

    return {
        ...user,
        email,
        recommendationScore: matchPercent
    };
})

    .sort(
        (a, b) =>
            b.recommendationScore -
            a.recommendationScore
    );
  

// =====================================================
// DISPLAY NAME
// =====================================================

const displayName =
    profile.firstName ||
    loggedInUser.userName ||
    loggedInUser.fullName ||
    "Niyati Member";

// =====================================================
// PROFILE COMPLETION
// =====================================================

const profileFields = [
    profile.firstName,
    profile.lastName,
    profile.gender,
    profile.dob,
    profile.maritalStatus,
    profile.religion,
    profile.motherTongue,
    profile.currentCity,
    profile.currentState,
    profile.qualification,
    profile.occupation,
    profile.fatherName,
    profile.motherName,
    profile.familyType,
    profile.profilePhoto ||
        profile.profileImage,
    profile.partnerAgeFrom,
    profile.partnerAgeTo
];

const completedFields =
    profileFields.filter(Boolean).length;

const profilePercentage =
    Math.round(
        (completedFields /
            profileFields.length) *
            100
    );

// =====================================================
// RENDER
// =====================================================

return (
    <div className="home-page">

        <Navbar />

        <main className="home-container">

            {/* =================================================
                WELCOME
            ================================================= */}

            <section className="home-welcome">

                <div className="home-welcome-content">

                    <span className="home-eyebrow">
                        ✦ WELCOME TO NIYATI ✦
                    </span>

                    <h1>
                        Welcome back,{" "}
                        <span>{displayName}</span> ♥
                    </h1>

                    <p>
                        Your journey towards a
                        meaningful connection
                        continues here.
                    </p>

                </div>

                <div className="hero-logo-area">

    <div className="hero-logo-glow"></div>

    <img
        src="/borderlogo.png"
        alt="Niyati Destined Together"
        className="hero-logo"
    />

</div>

            </section>


            {/* =================================================
                TOP CARDS
            ================================================= */}

            <section className="home-top-grid">

                {/* PROFILE COMPLETION */}

                <div className="home-card profile-completion-card">

                    <div className="home-card-heading">

                        <div className="home-card-icon">
                            👤
                        </div>

                        <div>
                            <span>
                                YOUR PROFILE
                            </span>

                            <h2>
                                Profile Completion
                            </h2>
                        </div>

                    </div>

                    <div className="completion-content">

                        <div className="completion-circle">

                            <strong>
                                {profilePercentage}%
                            </strong>

                        </div>

                        <div className="completion-text">

                            <h3>
                                {profilePercentage >= 80
                                    ? "Looking Great!"
                                    : "Complete Your Profile"}
                            </h3>

                            <p>
                                A complete profile
                                helps others understand
                                you better.
                            </p>

                        </div>

                    </div>

                    <div className="completion-bar">

                        <div
                            style={{
                                width:
                                    `${profilePercentage}%`
                            }}
                        ></div>

                    </div>

                    <button
                        className="home-primary-btn"
                        onClick={() =>
                            navigate(
                                "/complete-profile"
                            )
                        }
                    >
                        Complete Profile
                        <span>→</span>
                    </button>

                </div>


                {/* NIYATI JOURNEY */}

                <div className="home-card journey-card">

                    <div className="home-card-heading">

                        <div className="home-card-icon">
                            ♥
                        </div>

                        <div>
                            <span>
                                YOUR JOURNEY
                            </span>

                            <h2>
                                Your Niyati Journey
                            </h2>
                        </div>

                    </div>

                    <div className="journey-list">

                        <div className="journey-item completed">

                            <span className="journey-dot">
                                ✓
                            </span>

                            <div>
                                <strong>
                                    Profile Created
                                </strong>

                                <small>
                                    Welcome to Niyati
                                </small>
                            </div>

                        </div>

                        <div className="journey-line"></div>

                        <div
                            className={
                                profilePercentage >= 70
                                    ? "journey-item completed"
                                    : "journey-item"
                            }
                        >

                            <span className="journey-dot">
                                {profilePercentage >= 70
                                    ? "✓"
                                    : "2"}
                            </span>

                            <div>
                                <strong>
                                    Profile Completed
                                </strong>

                                <small>
                                    Tell your story
                                </small>
                            </div>

                        </div>

                        <div className="journey-line"></div>

                        <div className="journey-item">

                            <span className="journey-dot">
                                3
                            </span>

                            <div>
                                <strong>
                                    Discover Connections
                                </strong>

                                <small>
                                    Find meaningful people
                                </small>
                            </div>

                        </div>

                        <div className="journey-line"></div>

                        <div className="journey-item">

                            <span className="journey-dot">
                                4
                            </span>

                            <div>
                                <strong>
                                    Start a Conversation
                                </strong>

                                <small>
                                    Say hello to someone special
                                </small>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =================================================
    DAILY RECOMMENDATIONS
================================================= */}

<section className="home-section daily-recommendations-section">

    <div className="home-section-heading">

        <div>

            <span>
                DAILY RECOMMENDATIONS
            </span>

            <h2>
                People You May Like
            </h2>

            <p>
                Handpicked profiles based on your
                partner preferences.
            </p>

        </div>

       <button
    type="button"
    className="daily-view-all-btn"
    onClick={() =>
        setShowAllRecommendations(
            !showAllRecommendations
        )
    }
>
    {showAllRecommendations
        ? "Show Less "
        : "View All "}
</button>

    </div>


    <div className="daily-recommendations-grid">

        {dailyRecommendations.length > 0 ? (

            (showAllRecommendations
    ? dailyRecommendations
    : dailyRecommendations.slice(0, 4)
).map((user) => {

                const name =
                    `${user.firstName || ""} ${
                        user.lastName || ""
                    }`
                        .trim() ||
                    user.userName ||
                    user.fullName ||
                    user.name ||
                    "Niyati Member";

                const image =
                    user.profilePhoto ||
                    user.profileImage ||
                    user.photo ||
                    user.image ||
                    "/logo.jpeg";

                const userCity =
                    user.currentCity ||
                    user.city ||
                    "";

                const userState =
                    user.currentState ||
                    user.stateName ||
                    user.state ||
                    "";

                const userLocation =
                    [userCity, userState]
                        .filter(Boolean)
                        .join(", ");

                const userAge =
                    (() => {

                        if (!user.dob) {
                            return "";
                        }

                        const birthDate =
                            new Date(user.dob);

                        if (
                            Number.isNaN(
                                birthDate.getTime()
                            )
                        ) {
                            return "";
                        }

                        const today =
                            new Date();

                        let calculatedAge =
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
                            calculatedAge--;
                        }

                        return calculatedAge;
                    })();

                return (

                    <button
                        type="button"
                        className="daily-recommendation-card"
                        key={user.email}
                        onClick={() =>
                            navigate(
                                "/view-profile",
                                {
                                    state: {
                                        profile: {
                                            ...user,
                                            email:
                                                user.email,
                                            name,
                                            image
                                        }
                                    }
                                }
                            )
                        }
                    >

                        <div className="daily-recommendation-image">

                            <img
                                src={image}
                                alt={name}
                            />

                        </div>


                        <div className="daily-recommendation-info">

                            <h3>
                                {name}
                            </h3>

                            <p className="daily-recommendation-basic">

                                {userAge
                                    ? `${userAge} yrs`
                                    : ""}

                                {userAge &&
                                    user.gender &&
                                    " • "}

                                {user.gender || ""}

                            </p>

                            {user.occupation && (

                                <p className="daily-recommendation-job">
                                    {user.occupation}
                                </p>

                            )}

                            {userLocation && (

                                <p className="daily-recommendation-location">
                                    {userLocation}
                                </p>

                            )}

                        </div>


                        <div className="daily-match-score">

                            {Math.max(
                                user.recommendationScore,
                                0
                            )}%

                            <span>
                                Match
                            </span>

                        </div>


                        <div className="daily-recommendation-arrow">
                            →
                        </div>

                    </button>

                );

            })

        ) : (

            <div className="daily-recommendations-empty">

                <span>
                    ♡
                </span>

                <h3>
                    No Recommendations Yet
                </h3>

                <p>
                    Complete your partner preferences
                    to discover better recommendations.
                </p>

            </div>

        )}

    </div>

</section>


            {/* =================================================
                ACTIVITY
            ================================================= */}

            <section className="home-section">

                <div className="home-section-heading">

                    <div>
                        <span>
                            NIYATI ACTIVITY
                        </span>

                        <h2>
                            Your Activity
                        </h2>

                        <p>
                            Stay updated with what's
                            happening around your profile.
                        </p>
                    </div>

                </div>


                <div className="activity-grid">

                    <button
                        className="activity-card"
                        onClick={() =>
                            navigate("/notifications")
                        }
                    >

                        <div className="activity-icon">
                            🔔
                        </div>

                        <strong>
                            Notifications
                        </strong>

                        <span>
                            View your latest updates
                        </span>

                        <b>
                            View →
                        </b>

                    </button>


                    <button
                        className="activity-card"
                        onClick={() =>
                            navigate("/inbox")
                        }
                    >

                        <div className="activity-icon">
                            💬
                        </div>

                        <strong>
                            Messages
                        </strong>

                        <span>
                            Continue your conversations
                        </span>

                        <b>
                            Open →
                        </b>

                    </button>


                    <button
                        className="activity-card"
                        onClick={() =>
                            navigate("/users")
                        }
                    >

                        <div className="activity-icon">
                            ♥
                        </div>

                        <strong>
                            Matches
                        </strong>

                        <span>
                            Explore your compatible matches
                        </span>

                        <b>
                            Explore →
                        </b>

                    </button>


                    <button
                        className="activity-card"
                        onClick={() =>
                            navigate("/myprofile")
                        }
                    >

                        <div className="activity-icon">
                            👤
                        </div>

                        <strong>
                            My Profile
                        </strong>

                        <span>
                            Review your information
                        </span>

                        <b>
                            View →
                        </b>

                    </button>

                </div>

            </section>


            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <section className="home-section">

                <div className="home-section-heading">

                    <div>
                        <span>
                            QUICK ACTIONS
                        </span>

                        <h2>
                            Continue Your Journey
                        </h2>
                    </div>

                </div>


                <div className="quick-action-grid">

                    <button
                        onClick={() =>
                            navigate("/users")
                        }
                    >
                        <span>♥</span>

                        <div>
                            <strong>
                                My Matches
                            </strong>

                            <small>
                                See people who match
                                your preferences
                            </small>
                        </div>

                        <b>→</b>

                    </button>


                    <button
                        onClick={() =>
                            navigate("/search")
                        }
                    >
                        <span>⌕</span>

                        <div>
                            <strong>
                                Search Profiles
                            </strong>

                            <small>
                                Find someone based
                                on your preferences
                            </small>
                        </div>

                        <b>→</b>

                    </button>


                    <button
                        onClick={() =>
                            navigate("/inbox")
                        }
                    >
                        <span>✉</span>

                        <div>
                            <strong>
                                Messages
                            </strong>

                            <small>
                                Continue your conversations
                            </small>
                        </div>

                        <b>→</b>

                    </button>

                </div>

            </section>


            {/* =================================================
                NIYATI TIP
            ================================================= */}

            <section className="home-tip">

                <div className="tip-heart">
                    ♥
                </div>

                <div>

                    <span>
                        A LITTLE NIYATI TIP
                    </span>

                    <h2>
                        Every meaningful relationship
                        begins with a genuine connection.
                    </h2>

                    <p>
                        Be yourself, keep your profile
                        authentic and take the time to
                        understand the people you meet.
                    </p>

                </div>

            </section>

        </main>


        <PageNavigation
            previous="/notifications"
            next="/matches"
        />

    </div>
);

}

export default Home;