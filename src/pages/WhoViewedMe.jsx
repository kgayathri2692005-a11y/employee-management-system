import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import {
    getWhoViewedMe
} from "../utils/profileViewUtils";

import "../styles/WhoViewedMe.css";


function WhoViewedMe() {

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
        viewers,
        setViewers
    ] = useState([]);


    /* =====================================================
       LOAD WHO VIEWED ME
    ===================================================== */

    useEffect(() => {

        if (!loggedInEmail) {
            return;
        }


        const views =
            getWhoViewedMe(
                loggedInEmail
            );


        const profiles =
            views
                .map((view) => {

                    const profileEntry =
                        Object.entries(
                            allProfiles
                        ).find(
                            ([email]) =>
                                email
                                    .trim()
                                    .toLowerCase() ===
                                view.viewerEmail
                        );


                    if (!profileEntry) {
                        return null;
                    }


                    return {

                        ...profileEntry[1],

                        email:
                            view.viewerEmail,

                        viewedAt:
                            view.viewedAt

                    };

                })
                .filter(Boolean);


        setViewers(
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
       VIEW TIME
    ===================================================== */

    const formatViewedTime = (
        viewedAt
    ) => {

        if (!viewedAt) {
            return "";
        }


        const viewedDate =
            new Date(viewedAt);


        const difference =
            new Date() -
            viewedDate;


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
       RENDER
    ===================================================== */

    return (

        <div className="dashboard">

            <div className="main-content">

                <Navbar />


                <main className="who-viewed-me-page">


                    {/* =================================================
                       HEADER
                    ================================================= */}

                    <div className="who-viewed-header">

                        <span className="who-viewed-kicker">
                            YOUR PROFILE ACTIVITY
                        </span>

                        <h1>
                            Who Viewed Me
                        </h1>

                        <p>
                            See the members who have
                            recently viewed your profile.
                        </p>

                    </div>


                    {/* =================================================
                       EMPTY STATE
                    ================================================= */}

                    {viewers.length === 0 ? (

                        <section className="who-viewed-empty-card">

                            <div className="who-viewed-empty-icon">
                                👁
                            </div>

                            <h2>
                                No One Has Viewed Your Profile Yet
                            </h2>

                            <p>
                                When someone views your
                                profile, they will appear here.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/users")
                                }
                            >
                                Explore Profiles
                            </button>

                        </section>

                    ) : (

                        /* =================================================
                           VIEWER GRID
                        ================================================= */

                        <section className="who-viewed-grid">

                            {viewers.map(
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
                                            className="who-viewed-card"
                                            key={
                                                profile.email
                                            }
                                        >

                                            <div className="who-viewed-photo-wrapper">

                                                <img
                                                    src={image}
                                                    alt={name}
                                                    className="who-viewed-profile-image"
                                                />

                                            </div>


                                            <div className="who-viewed-profile-info">

                                                <span className="who-viewed-member-label">
                                                    NIYATI MEMBER
                                                </span>


                                                <h2>
                                                    {name}
                                                </h2>


                                                <p className="who-viewed-basic-info">

                                                    {age &&
                                                        `${age} yrs`}

                                                    {age &&
                                                        city &&
                                                        " • "}

                                                    {city}

                                                </p>


                                                {occupation && (

                                                    <p className="who-viewed-occupation">
                                                        {occupation}
                                                    </p>

                                                )}


                                                <p className="who-viewed-time">

                                                    {formatViewedTime(
                                                        profile.viewedAt
                                                    )}

                                                </p>


                                                <button
                                                    type="button"
                                                    className="who-viewed-button"
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


                    <div className="who-viewed-navigation">

                        <PageNavigation
                            previous="/viewed-profiles"
                            next="/inbox"
                        />

                    </div>

                </main>

            </div>

        </div>

    );

}


export default WhoViewedMe;