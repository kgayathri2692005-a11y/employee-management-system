import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import "../styles/Settings.css";

function Settings() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState({
        interestRequests: true,
        newMatches: true,
        profileViews: true,
        messages: true,
        emailNotifications: false
    });

    const toggleNotification = (key) => {
        setNotifications((previous) => ({
            ...previous,
            [key]: !previous[key]
        }));
    };

    const goTo = (path) => {
        navigate(path);
    };

    return (
        <div className="settings-page">

            <Navbar />

            <main className="settings-container">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="settings-header">

                    <div className="settings-header-content">

                        <span className="settings-eyebrow">
                            ✦ NIYATI SETTINGS ✦
                        </span>

                        <h1>
                            Settings
                        </h1>

                        <p>
                            Manage your account, privacy and preferences.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    SETTINGS GRID
                ================================================= */}

                <div className="settings-grid">


                    {/* =================================================
                        ACCOUNT SETTINGS
                    ================================================= */}

                    <section className="settings-card">

                        <div className="settings-card-header">

                            <div className="settings-icon">
                                👤
                            </div>

                            <div>
                                <h2>
                                    Account Settings
                                </h2>

                                <p>
                                    Manage your personal account information
                                </p>
                            </div>

                        </div>


                        <div className="settings-options">

                            <button
                                onClick={() =>
                                    goTo("/complete-profile")
                                }
                            >
                                <span className="option-icon">
                                    ♙
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Edit Profile
                                    </strong>

                                    <small>
                                        Update your personal information
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/change-password")
                                }
                            >
                                <span className="option-icon">
                                    🔒
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Change Password
                                    </strong>

                                    <small>
                                        Update your account password
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/change-email")
                                }
                            >
                                <span className="option-icon">
                                    ✉
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Email Address
                                    </strong>

                                    <small>
                                        Update your email address
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/change-mobile")
                                }
                            >
                                <span className="option-icon">
                                    ☎
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Mobile Number
                                    </strong>

                                    <small>
                                        Update your mobile number
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/privacy-settings")
                                }
                            >
                                <span className="option-icon">
                                    ◉
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Profile Visibility
                                    </strong>

                                    <small>
                                        Choose who can view your profile
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>

                        </div>

                    </section>


                    {/* =================================================
                        NOTIFICATION SETTINGS
                    ================================================= */}

                    <section className="settings-card">

                        <div className="settings-card-header">

                            <div className="settings-icon">
                                🔔
                            </div>

                            <div>
                                <h2>
                                    Notification Settings
                                </h2>

                                <p>
                                    Control how Niyati keeps you updated
                                </p>
                            </div>

                        </div>


                        <div className="settings-options">

                            <div className="notification-option">

                                <span className="option-icon">
                                    ♡
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Interest Requests
                                    </strong>

                                    <small>
                                        Get notified when someone shows interest
                                    </small>
                                </span>

                                <button
                                    className={
                                        notifications.interestRequests
                                            ? "settings-toggle active"
                                            : "settings-toggle"
                                    }
                                    onClick={() =>
                                        toggleNotification(
                                            "interestRequests"
                                        )
                                    }
                                >
                                    <span></span>
                                </button>

                            </div>


                            <div className="notification-option">

                                <span className="option-icon">
                                    ♥
                                </span>

                                <span className="option-content">
                                    <strong>
                                        New Matches
                                    </strong>

                                    <small>
                                        Get notified about new matches
                                    </small>
                                </span>

                                <button
                                    className={
                                        notifications.newMatches
                                            ? "settings-toggle active"
                                            : "settings-toggle"
                                    }
                                    onClick={() =>
                                        toggleNotification(
                                            "newMatches"
                                        )
                                    }
                                >
                                    <span></span>
                                </button>

                            </div>


                            <div className="notification-option">

                                <span className="option-icon">
                                    ◉
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Profile Views
                                    </strong>

                                    <small>
                                        Get notified when someone views you
                                    </small>
                                </span>

                                <button
                                    className={
                                        notifications.profileViews
                                            ? "settings-toggle active"
                                            : "settings-toggle"
                                    }
                                    onClick={() =>
                                        toggleNotification(
                                            "profileViews"
                                        )
                                    }
                                >
                                    <span></span>
                                </button>

                            </div>


                            <div className="notification-option">

                                <span className="option-icon">
                                    ✉
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Messages
                                    </strong>

                                    <small>
                                        Get notified about new messages
                                    </small>
                                </span>

                                <button
                                    className={
                                        notifications.messages
                                            ? "settings-toggle active"
                                            : "settings-toggle"
                                    }
                                    onClick={() =>
                                        toggleNotification(
                                            "messages"
                                        )
                                    }
                                >
                                    <span></span>
                                </button>

                            </div>


                            <div className="notification-option">

                                <span className="option-icon">
                                    ✉
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Email Notifications
                                    </strong>

                                    <small>
                                        Receive important updates by email
                                    </small>
                                </span>

                                <button
                                    className={
                                        notifications.emailNotifications
                                            ? "settings-toggle active"
                                            : "settings-toggle"
                                    }
                                    onClick={() =>
                                        toggleNotification(
                                            "emailNotifications"
                                        )
                                    }
                                >
                                    <span></span>
                                </button>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        PRIVACY & SECURITY
                    ================================================= */}

                    <section className="settings-card">

                        <div className="settings-card-header">

                            <div className="settings-icon">
                                🛡
                            </div>

                            <div>
                                <h2>
                                    Privacy & Security
                                </h2>

                                <p>
                                    Keep your profile and account protected
                                </p>
                            </div>

                        </div>


                        <div className="settings-options">

                            <button
                                onClick={() =>
                                    goTo("/privacy-settings")
                                }
                            >
                                <span className="option-icon">
                                    ◉
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Profile Visibility
                                    </strong>

                                    <small>
                                        Control who can view your profile
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/privacy-settings")
                                }
                            >
                                <span className="option-icon">
                                    ♡
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Who Can Send Interest?
                                    </strong>

                                    <small>
                                        Choose who can send you interest
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/privacy-settings")
                                }
                            >
                                <span className="option-icon">
                                    ◉
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Who Can View Photos?
                                    </strong>

                                    <small>
                                        Control access to your photos
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/ignored-profiles")
                                }
                            >
                                <span className="option-icon">
                                    ⊘
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Ignored Profiles
                                    </strong>

                                    <small>
                                        Manage profiles you have ignored
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/login-security")
                                }
                            >
                                <span className="option-icon">
                                    🔐
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Login Security
                                    </strong>

                                    <small>
                                        Manage your login and security options
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>

                        </div>

                    </section>


                    {/* =================================================
                        PREFERENCES
                    ================================================= */}

                    <section className="settings-card">

                        <div className="settings-card-header">

                            <div className="settings-icon">
                                ⚙
                            </div>

                            <div>
                                <h2>
                                    Preferences
                                </h2>

                                <p>
                                    Personalize your Niyati experience
                                </p>
                            </div>

                        </div>


                        <div className="settings-options">

                            <button
                                onClick={() =>
                                    goTo("/language")
                                }
                            >
                                <span className="option-icon">
                                    ◎
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Language
                                    </strong>

                                    <small>
                                        Choose your preferred language
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/email-preferences")
                                }
                            >
                                <span className="option-icon">
                                    ✉
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Email Preferences
                                    </strong>

                                    <small>
                                        Manage your email communication
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    →
                                </span>
                            </button>


                            <button
                                onClick={() =>
                                    goTo("/appearance")
                                }
                            >
                                <span className="option-icon">
                                    ☼
                                </span>

                                <span className="option-content">
                                    <strong>
                                        Appearance
                                    </strong>

                                    <small>
                                        Choose how Niyati looks for you
                                    </small>
                                </span>

                                <span className="settings-value">
                                    Light
                                </span>

                            </button>

                        </div>

                    </section>

                </div>


                {/* =================================================
                    ACCOUNT ACTIONS
                ================================================= */}

                <section className="account-actions-card">

                    <div className="account-actions-header">

                        <div className="danger-icon">
                            !
                        </div>

                        <div>
                            <h2>
                                Account Actions
                            </h2>

                            <p>
                                Manage the status of your Niyati account
                            </p>
                        </div>

                    </div>


                    <div className="account-actions-grid">

                        <button
                            className="account-action"
                            onClick={() =>
                                goTo("/deactivate-account")
                            }
                        >

                            <span className="action-icon">
                                ◉
                            </span>

                            <span>
                                <strong>
                                    Deactivate Account
                                </strong>

                                <small>
                                    Temporarily deactivate your account
                                </small>
                            </span>

                            <b>
                                →
                            </b>

                        </button>


                        <button
                            className="account-action delete-action"
                            onClick={() =>
                                goTo("/delete-account")
                            }
                        >

                            <span className="action-icon">
                                ♙
                            </span>

                            <span>
                                <strong>
                                    Delete Account
                                </strong>

                                <small>
                                    Permanently delete your account
                                </small>
                            </span>

                            <b>
                                →
                            </b>

                        </button>

                    </div>

                </section>


                {/* =================================================
                    NIYATI FOOTER MESSAGE
                ================================================= */}

                <div className="settings-footer-message">

                    <span>
                        ♥
                    </span>

                    <p>
                        Your privacy and security matter to us.
                    </p>

                    <span>
                        ♥
                    </span>

                </div>

            </main>


            <PageNavigation
                previous="/myprofile"
                next="/dashboard"
            />

        </div>
    );
}

export default Settings;