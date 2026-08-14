import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import {
    getMyViewedProfiles
} from "../utils/profileViewUtils";

import "../styles/ViewedProfiles.css";


function ViewedProfiles() {

    const navigate = useNavigate();


    /* =====================================================
       LOGGED-IN USER
    ===================================================== */

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        ) || {};


    const loggedInEmail =
        (
            loggedInUser.email ||
            ""
        )
            .trim()
            .toLowerCase();


    /* =====================================================
       ALL PROFILES
    ===================================================== */

    const allProfiles =
        JSON.parse(
            localStorage.getItem("allProfiles")
        ) || {};


    /* =====================================================
       STATE
    ===================================================== */

    const [
        viewedProfiles,
        setViewedProfiles
    ] = useState([]);


    /* =====================================================
       LOAD VIEWED PROFILES
    ===================================================== */

    useEffect(() => {

        if (!loggedInEmail) {
            return;
        }


        const views =
            getMyViewedProfiles(
                loggedInEmail
            );


        const profiles = views
            .map((view) => {

                const profileEntry =
                    Object.entries(
                        allProfiles
                    ).find(
                        ([email]) =>
                            email
                                .trim()
                                .toLowerCase() ===
                            view.viewedEmail
                    );


                if (!profileEntry) {
                    return null;
                }


                return {

                    ...profileEntry[1],

                    email:
                        view.viewedEmail,

                    viewedAt:
                        view.viewedAt

                };

            })
            .filter(Boolean);


        setViewedProfiles(
            profiles
        );

    }, [
        loggedInEmail
    ]);


    /* =====================================================
       VIEW PROFILE
    ===================================================== */

    const handleViewProfile = (
        profile
    ) => {

        navigate(
            "/view-profile",
            {
                state: {
                    profile: profile
                }
            }
        );

    };


    /* =====================================================
       FORMAT VIEW TIME
    ===================================================== */

    const formatViewedTime = (
        viewedAt
    ) => {

        if (!viewedAt) {
            return "";
        }


        const viewedDate =
            new Date(viewedAt);


        const now =
            new Date();


        const difference =
            now - viewedDate;


        const minutes =
            Math.floor(
                difference /
                (1000 * 60)
            );


        if (minutes < 1) {
            return "Viewed just now";
        }


        if (minutes < 60) {
            return `Viewed ${minutes} min ago`;
        }


        const hours =
            Math.floor(
                minutes / 60
            );


        if (hours < 24) {
            return `Viewed ${hours} hr ago`;
        }


        const days =
            Math.floor(
                hours / 24
            );


        if (days === 1) {
            return "Viewed yesterday";
        }


        return `Viewed ${days} days ago`;

    };


    /* =====================================================
       DISPLAY NAME
    ===================================================== */

    const getDisplayName = (
        profile
    ) => {

        return (

            `${profile.firstName || ""} ${
                profile.lastName || ""
            }`
                .trim()

            ||

            profile.userName

            ||

            profile.fullName

            ||

            profile.name

            ||

            "Niyati Member"

        );

    };


    /* =====================================================
       AGE
    ===================================================== */

    const calculateAge = (
        dob
    ) => {

        if (!dob) {
            return "";
        }


        const birthDate =
            new Date(dob);


        if (
            Number.isNaN(
                birthDate.getTime()
            )
        ) {
            return "";
        }


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


        return age;

    };


    /* =====================================================
       PROFILE IMAGE
    ===================================================== */

    const getProfileImage = (
        profile
    ) => {

        return (

            profile.profilePhoto

            ||

            profile.profileImage

            ||

            profile.photo

            ||

            profile.image

            ||

            "/logo.jpeg"

        );

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div className="dashboard">

            <div className="main-content">

                <Navbar />


                <main className="viewed-profiles-page">


                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}

                    <div className="viewed-profiles-header">

                        <span className="viewed-kicker">
                            YOUR ACTIVITY
                        </span>

                        <h1>
                            Viewed Profiles
                        </h1>

                        <p>
                            Profiles you have recently
                            viewed on Niyati Matrimony.
                        </p>

                    </div>


                    {/* =================================================
                        EMPTY STATE
                    ================================================= */}

                    {viewedProfiles.length === 0 ? (

                        <section className="viewed-empty-card">

                            <div className="viewed-empty-icon">
                                ♡
                            </div>

                            <h2>
                                No Viewed Profiles Yet
                            </h2>

                            <p>
                                Profiles you view will
                                appear here.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/Users")
                                }
                            >
                                Explore Profiles
                            </button>

                        </section>

                    ) : (

                        /* =================================================
                           PROFILE GRID
                        ================================================= */

                        <section className="viewed-profile-grid">

                            {viewedProfiles.map(
                                (profile) => {

                                    const name =
                                        getDisplayName(
                                            profile
                                        );


                                    const age =
                                        calculateAge(
                                            profile.dob
                                        );


                                    const image =
                                        getProfileImage(
                                            profile
                                        );


                                    const city =
                                        profile.currentCity ||
                                        profile.city ||
                                        "";


                                    const occupation =
                                        profile.occupation ||
                                        "";


                                    return (

                                        <article
                                            className="viewed-profile-card"
                                            key={
                                                profile.email
                                            }
                                        >

                                            <div className="viewed-photo-wrapper">

                                                <img
                                                    src={image}
                                                    alt={name}
                                                    className="viewed-profile-image"
                                                />

                                            </div>


                                            <div className="viewed-profile-info">

                                                <span className="viewed-member-label">
                                                    NIYATI MEMBER
                                                </span>


                                                <h2>
                                                    {name}
                                                </h2>


                                                <p className="viewed-basic-info">

                                                    {age &&
                                                        `${age} yrs`}

                                                    {age &&
                                                        city &&
                                                        " • "}

                                                    {city}

                                                </p>


                                                {occupation && (

                                                    <p className="viewed-occupation">

                                                        {occupation}

                                                    </p>

                                                )}


                                                <p className="viewed-time">

                                                    {formatViewedTime(
                                                        profile.viewedAt
                                                    )}

                                                </p>


                                                <button
                                                    type="button"
                                                    className="viewed-view-button"
                                                    onClick={() =>
                                                        handleViewProfile(
                                                            profile
                                                        )
                                                    }
                                                >

                                                    View Profile

                                                </button>

                                            </div>

                                        </article>

                                    );

                                }
                            )}

                        </section>

                    )}


                    {/* =================================================
                        PAGE NAVIGATION
                    ================================================= */}

                    <div className="viewed-page-navigation">

                        <PageNavigation
                            previous="/Users"
                            next="/inbox"
                        />

                    </div>


                </main>

            </div>

        </div>

    );

}


export default ViewedProfiles;