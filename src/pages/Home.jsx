import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import "../styles/Home.css";

function Home() {
const navigate = useNavigate();

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
                            navigate("/matches")
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
                            navigate("/matches")
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