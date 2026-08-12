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
       MATCHED USERS
    ===================================================== */

    const matchedUsers =
        JSON.parse(
            localStorage.getItem("matchedUsers")
        ) || [];


    /* =====================================================
       ALL PROFILES
    ===================================================== */

    const allProfiles =
        JSON.parse(
            localStorage.getItem("allProfiles")
        ) || {};


    /* =====================================================
       SELECTED PROFILE
    ===================================================== */

    const selectedUser =
        location.state?.profile || null;


    /* =====================================================
       PROFILE EMAIL
    ===================================================== */

    const profileEmail =
        selectedUser?.email ||
        loggedInUser.email ||
        "";


    const normalizedProfileEmail =
        profileEmail
            .trim()
            .toLowerCase();


    /* =====================================================
       FIND FULL PROFILE
    ===================================================== */

    const profileEntry =
        Object.entries(
            allProfiles
        ).find(
            ([email]) =>
                email
                    .trim()
                    .toLowerCase() ===
                normalizedProfileEmail
        );


    const profileData =
        profileEntry?.[1] ||
        selectedUser ||
        {};


    /* =====================================================
       OTHER USER CHECK
    ===================================================== */

    const isOtherUser =
        normalizedProfileEmail &&
        normalizedProfileEmail !==
            loggedInEmail;


    /* =====================================================
       MATCH CHECK
    ===================================================== */

    const isMatched =
        Array.isArray(matchedUsers) &&
        matchedUsers.some(
            (match) => {

                if (!match) {
                    return false;
                }

                const user1 =
                    (
                        match.user1 ||
                        ""
                    )
                        .trim()
                        .toLowerCase();

                const user2 =
                    (
                        match.user2 ||
                        ""
                    )
                        .trim()
                        .toLowerCase();

                return (
                    user1 === loggedInEmail &&
                    user2 === normalizedProfileEmail
                ) ||
                (
                    user2 === loggedInEmail &&
                    user1 === normalizedProfileEmail
                );
            }
        );


    /* =====================================================
       WISHLIST KEY
    ===================================================== */

    const wishlistKey =
        `wishlist_${loggedInUser.email}`;


    /* =====================================================
       STATES
    ===================================================== */

    const [
        isWishlisted,
        setIsWishlisted
    ] = useState(false);

    const [
        interestSent,
        setInterestSent
    ] = useState(false);

    const [
    isIgnored,
    setIsIgnored
] = useState(false);


    /* =====================================================
       DISPLAY NAME
    ===================================================== */

    const displayName =
        `${profileData.firstName || ""} ${
            profileData.lastName || ""
        }`
            .trim() ||

        profileData.userName ||

        profileData.fullName ||

        profileData.name ||

        selectedUser?.name ||

        "Niyati Member";


    /* =====================================================
       AGE
    ===================================================== */

    const calculateAge = (dob) => {

        if (!dob) {
            return "N/A";
        }

        const birthDate =
            new Date(dob);

        if (
            Number.isNaN(
                birthDate.getTime()
            )
        ) {
            return "N/A";
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


    const age =
        calculateAge(
            profileData.dob
        );


    /* =====================================================
       LOCATION
    ===================================================== */

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


    /* =====================================================
       PROFILE IMAGE
    ===================================================== */

    const profileImage =
        profileData.profilePhoto ||
        profileData.profileImage ||
        profileData.photo ||
        profileData.image ||
        selectedUser?.image ||
        "/logo.jpeg";


    /* =====================================================
       PROFILE DETAILS
    ===================================================== */

    const occupation =
        profileData.occupation ||
        "";

    const qualification =
        profileData.qualification ||
        profileData.education ||
        "";

    const income =
        profileData.income ||
        "";

    const religion =
        profileData.religion ||
        "";

    const community =
        profileData.community ||
        profileData.caste ||
        "";

    const maritalStatus =
        profileData.maritalStatus ||
        "";

    const height =
        profileData.height ||
        "";

    const gender =
        profileData.gender ||
        "";

    const aboutMe =
        profileData.aboutMe ||
        "";


    /* =====================================================
       MATCH PERCENTAGE
    ===================================================== */

    const matchPercentage =
        profileData.matchPercentage ||
        selectedUser?.matchPercentage ||
        "95";


    /* =====================================================
       LOAD WISHLIST + INTEREST
    ===================================================== */

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
                    (
                        user.email ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                    normalizedProfileEmail
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
                    (
                        interest.from ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                        loggedInEmail &&

                    (
                        interest.to ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                        normalizedProfileEmail
            );


        setInterestSent(
            alreadySent
        );
        const ignoredProfilesData =
    JSON.parse(
        localStorage.getItem("ignoredProfiles")
    ) || {};

const ignoredList =
    ignoredProfilesData[loggedInEmail] || [];

const alreadyIgnored =
    ignoredList.some(
        (user) =>
            (user.email || "")
                .trim()
                .toLowerCase() ===
            normalizedProfileEmail
    );

setIsIgnored(alreadyIgnored);

    }, [
        wishlistKey,
        isOtherUser,
        normalizedProfileEmail,
        loggedInEmail
    ]);


    /* =====================================================
       BROWSER HISTORY BACK
    ===================================================== */

    const handleBack = () => {

        navigate(-1);

    };


    /* =====================================================
       WISHLIST
    ===================================================== */

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


        /* REMOVE */

        if (isWishlisted) {

            const updatedWishlist =
                wishlist.filter(
                    (user) =>
                        (
                            user.email ||
                            ""
                        )
                            .trim()
                            .toLowerCase() !==
                        normalizedProfileEmail
                );


            try {

                localStorage.setItem(
                    wishlistKey,
                    JSON.stringify(
                        updatedWishlist
                    )
                );

                setIsWishlisted(
                    false
                );

                toast.success(
                    "Removed from wishlist."
                );

            } catch (error) {

                console.error(
                    "Unable to update wishlist:",
                    error
                );

                toast.error(
                    "Unable to update wishlist."
                );
            }

            return;
        }


        /* ADD */

        const wishlistUser = {

            email:
                profileEmail,

            name:
                displayName,

            gender:
                profileData.gender ||
                "",

            occupation:
                occupation,

            city:
                city,

            state:
                state
        };


        const alreadyExists =
            wishlist.some(
                (user) =>
                    (
                        user.email ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                    normalizedProfileEmail
            );


        if (alreadyExists) {

            setIsWishlisted(
                true
            );

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

            setIsWishlisted(
                true
            );

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

    /* =====================================================
   IGNORE PROFILE
===================================================== */

const handleIgnore = () => {

    if (!isOtherUser) {
        return;
    }

   const ignoredProfilesData =
    JSON.parse(
        localStorage.getItem("ignoredProfiles")
    ) || {};

const currentKey =
    loggedInEmail;

const ignoredProfiles =
    ignoredProfilesData[currentKey] || [];

    const alreadyIgnored =
        ignoredProfiles.some(
            (user) =>
                (
                    user.email ||
                    ""
                )
                    .trim()
                    .toLowerCase() ===
                normalizedProfileEmail
        );

    if (alreadyIgnored) {

        setIsIgnored(true);

        toast.info(
            "This profile is already ignored."
        );

        return;
    }

    const ignoredUser = {

        email:
            profileEmail,

        name:
            displayName,

        gender:
            profileData.gender || "",

        occupation:
            occupation,

        city:
            city,

        state:
            state,

        image:
            profileImage,

        aboutMe:
            aboutMe,

        age:
            age
    };

    const updatedIgnoredProfiles = [
        ...ignoredProfiles,
        ignoredUser
    ];

    try {

       ignoredProfilesData[currentKey] =
    updatedIgnoredProfiles;

localStorage.setItem(
    "ignoredProfiles",
    JSON.stringify(
        ignoredProfilesData
    )
);

        setIsIgnored(true);

        toast.success(
            "Profile moved to ignored profiles."
        );

        // Go to Ignored Profiles page
        navigate("/ignored-profiles");

    } catch (error) {

        console.error(
            "Unable to save ignored profile:",
            error
        );

        toast.error(
            "Unable to ignore this profile."
        );
    }
};


    /* =====================================================
       SEND INTEREST
    ===================================================== */

    const handleSendInterest = () => {

        if (
            !isOtherUser ||
            interestSent
        ) {
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
                    (
                        interest.from ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                        loggedInEmail &&

                    (
                        interest.to ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                        normalizedProfileEmail
            );


        if (alreadyExists) {

            setInterestSent(
                true
            );

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


        setInterestSent(
            true
        );


        toast.success(
            "Interest sent successfully!"
        );
    };


    /* =====================================================
       MESSAGE
    ===================================================== */

    const handleMessage = () => {

        if (!isOtherUser) {
            return;
        }


        if (!isMatched) {

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
                            occupation,

                        city:
                            city,

                        stateName:
                            state
                    }
                }
            }
        );
    };


    /* =====================================================
       DISPLAY VALUE
    ===================================================== */

    const displayValue = (
        value
    ) => {

        if (
            value === undefined ||
            value === null ||
            String(value).trim() === ""
        ) {
            return "Not provided";
        }

        return value;
    };


    /* =====================================================
       NO PROFILE
    ===================================================== */

    if (
        !profileData ||
        Object.keys(profileData).length === 0
    ) {

        return (

            <div className="dashboard">

                <div className="main-content">

                    <Navbar />

                    <div className="view-profile-empty">

                        <div>

                            <span>
                                ♡
                            </span>

                            <h2>
                                Profile Not Found
                            </h2>

                            <p>
                                This profile could not
                                be loaded.
                            </p>

                            <button
                                onClick={
                                    handleBack
                                }
                            >
                                ← Go Back
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        );
    }


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div className="dashboard">

            <div className="main-content">

                <Navbar />


                <main className="view-profile-page">


                    {/* =================================================
                        TOP BACK
                    ================================================= */}

                    <div className="view-profile-top">

                        <button
                            type="button"
                            className="profile-back-link"
                            onClick={
                                handleBack
                            }
                        >

                            <span>
                                ←
                            </span>

                            Back to Results

                        </button>

                    </div>


                    {/* =================================================
                        MAIN PROFILE CARD
                    ================================================= */}

                    <section className="profile-main-card">


                        {/* =================================================
                            IMAGE SIDE
                        ================================================= */}

                        <div className="profile-photo-section">

                            <div className="profile-photo-box">

                                <img
                                    src={profileImage}
                                    alt={displayName}
                                    className="view-profile-image"
                                />


                                {/* MATCH BADGE */}

                                <div className="match-badge">

                                    <strong>
                                        {matchPercentage}%
                                    </strong>

                                    <span>
                                        Match
                                    </span>

                                </div>


                                {/* PHOTO COUNT */}

                                <div className="photo-count">

                                    ▣

                                    <span>
                                        {profileData.photoCount ||
                                            "1"} Photos
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            PROFILE DETAILS
                        ================================================= */}

                        <div className="profile-details-section">


                            <div className="profile-name-area">

                                <span className="profile-kicker">
                                    NIYATI MEMBER
                                </span>

                                <h1>

                                    {displayName}

                                    <span className="verified-mark">
                                        ✓
                                    </span>

                                </h1>


                                <p className="profile-basic-line">

                                    {age !== "N/A" &&
                                        `${age} yrs`}

                                    {age !== "N/A" &&
                                        height &&
                                        " • "}

                                    {height}

                                    {(age !== "N/A" ||
                                        height) &&
                                        locationText &&
                                        " • "}

                                    {locationText}

                                </p>


                                {occupation && (

                                    <p className="profile-job">

                                        {occupation}

                                        {profileData.company &&
                                            ` at ${profileData.company}`}

                                    </p>

                                )}

                            </div>


                            {/* =================================================
                                DETAIL LIST
                            ================================================= */}

                            <div className="profile-detail-list">


                                <div className="profile-detail-row">

                                    <span className="detail-icon">
                                        ♙
                                    </span>

                                    <span className="detail-label">
                                        Religion
                                    </span>

                                    <strong>
                                        {displayValue(
                                            religion
                                        )}
                                    </strong>

                                </div>


                                <div className="profile-detail-row">

                                    <span className="detail-icon">
                                        ♡
                                    </span>

                                    <span className="detail-label">
                                        Community
                                    </span>

                                    <strong>
                                        {displayValue(
                                            community
                                        )}
                                    </strong>

                                </div>


                                <div className="profile-detail-row">

                                    <span className="detail-icon">
                                        🎓
                                    </span>

                                    <span className="detail-label">
                                        Education
                                    </span>

                                    <strong>
                                        {displayValue(
                                            qualification
                                        )}
                                    </strong>

                                </div>


                                <div className="profile-detail-row">

                                    <span className="detail-icon">
                                        ₹
                                    </span>

                                    <span className="detail-label">
                                        Income
                                    </span>

                                    <strong>
                                        {displayValue(
                                            income
                                        )}
                                    </strong>

                                </div>


                                <div className="profile-detail-row">

                                    <span className="detail-icon">
                                        ♙
                                    </span>

                                    <span className="detail-label">
                                        Marital Status
                                    </span>

                                    <strong>
                                        {displayValue(
                                            maritalStatus
                                        )}
                                    </strong>

                                </div>


                                <div className="profile-detail-row">

                                    <span className="detail-icon">
                                        ◉
                                    </span>

                                    <span className="detail-label">
                                        Gender
                                    </span>

                                    <strong>
                                        {displayValue(
                                            gender
                                        )}
                                    </strong>

                                </div>


                            </div>


                            {/* =================================================
                                ACTION BUTTONS
                            ================================================= */}

                            {isOtherUser && (

                                <div className="profile-main-actions">


                                    {isMatched ? (

                                        <button
                                            type="button"
                                            className="send-interest-btn matched-btn"
                                            disabled
                                        >
                                            ♥ Matched
                                        </button>

                                    ) : (

                                        <button
                                            type="button"
                                            className={
                                                interestSent
                                                    ? "send-interest-btn sent"
                                                    : "send-interest-btn"
                                            }
                                            onClick={
                                                handleSendInterest
                                            }
                                            disabled={
                                                interestSent
                                            }
                                        >

                                            <span>

                                                {interestSent
                                                    ? "✓"
                                                    : "➤"}

                                            </span>

                                            {interestSent
                                                ? "Interest Sent"
                                                : "Send Interest"}

                                        </button>

                                    )}


                                    <button
                                        type="button"
                                        className={
                                            isWishlisted
                                                ? "wishlist-profile-btn saved"
                                                : "wishlist-profile-btn"
                                        }
                                        onClick={
                                            handleWishlist
                                        }
                                    >

                                        <span>

                                            {isWishlisted
                                                ? "♥"
                                                : "♡"}

                                        </span>

                                        {isWishlisted
                                            ? "Saved"
                                            : "Add to Wishlist"}

                                    </button>

                                    <button
    type="button"
    className={
        isIgnored
            ? "ignore-profile-btn ignored"
            : "ignore-profile-btn"
    }
    onClick={handleIgnore}
    disabled={isIgnored}
>
    <span>
        {isIgnored ? "✓" : "⊘"}
    </span>

    {isIgnored
        ? "Ignored"
        : "Ignore"}
</button>


                                    {isMatched && (

                                        <button
                                            type="button"
                                            className="message-profile-btn"
                                            onClick={
                                                handleMessage
                                            }
                                        >
                                            💬 Message
                                        </button>

                                    )}

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        ABOUT ME ONLY
                    ================================================= */}

                    <section className="profile-content-card">

                        <div className="content-card-heading">

                            <div className="heading-icon">
                                ♡
                            </div>

                            <div>

                                <span>
                                    GET TO KNOW THEM
                                </span>

                                <h2>
                                    About{" "}
                                    {displayName.split(" ")[0]}
                                </h2>

                            </div>

                        </div>


                        <div className="about-profile-content">
                            <p>

                                {aboutMe ||
                                    "This member has not added an introduction yet."}

                            </p>

                        </div>

                    </section>


                    {/* =================================================
                        PAGE NAVIGATION
                    ================================================= */}

                    <div className="profile-page-navigation">

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

export default ViewProfile;