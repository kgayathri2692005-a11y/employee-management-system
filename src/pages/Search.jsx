import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageNavigation from "../components/PageNavigation";
import Navbar from "../components/Navbar";

import "../styles/Search.css";

function Search() {

    const navigate = useNavigate();

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    const isLoggedIn = !!loggedInUser;

    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    // =========================================================
// GET PROFILE NAME
// =========================================================

const getProfileName = (profile) => {
    const fullName =
        `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();

    return (
        fullName ||
        profile?.fullName ||
        profile?.userName ||
        "Niyati Member"
    );
};

    // =========================================================
    // FILTER STATES
    // =========================================================

    const [searchName, setSearchName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedOccupation, setSelectedOccupation] = useState("");
    const [selectedReligion, setSelectedReligion] = useState("");
    const [selectedEducation, setSelectedEducation] = useState("");

    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");

    // =========================================================
    // GET PROFILE NAME
    // =========================================================

const getProfileImage = (profile) => {

    // Prefer uploaded profile photo
    if (
        typeof profile?.profilePhoto === "string" &&
        profile.profilePhoto.trim() !== ""
    ) {
        return profile.profilePhoto.trim();
    }

    // Use profileImage only if profilePhoto is unavailable
    if (
        typeof profile?.profileImage === "string" &&
        profile.profileImage.trim() !== ""
    ) {
        return profile.profileImage.trim();
    }

    // Other possible image fields
    const possibleImages = [
        profile?.profilePicture,
        profile?.photo,
        profile?.image,
        profile?.imageUrl
    ];

    for (const image of possibleImages) {

        if (
            typeof image === "string" &&
            image.trim() !== ""
        ) {
            return image.trim();
        }
    }

    // Additional photos
    if (Array.isArray(profile?.additionalPhotos)) {

        for (const photo of profile.additionalPhotos) {

            if (
                typeof photo === "string" &&
                photo.trim() !== ""
            ) {
                return photo.trim();
            }

            if (
                photo &&
                typeof photo === "object"
            ) {

                const objectPhoto =
                    photo.url ||
                    photo.image ||
                    photo.imageUrl ||
                    photo.photo;

                if (
                    typeof objectPhoto === "string" &&
                    objectPhoto.trim() !== ""
                ) {
                    return objectPhoto.trim();
                }
            }
        }
    }

    // Final fallback
    return "https://randomuser.me/api/portraits/lego/1.jpg";
};

    // =========================================================
    // GET AGE
    // =========================================================

    const getAge = (profile) => {

        if (profile?.age) {
            return Number(profile.age);
        }

        if (profile?.dob) {

            const birthDate =
                new Date(profile.dob);

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
        }

        return "";
    };

    // =========================================================
    // GET CITY
    // =========================================================

    const getCity = (profile) => {

        return (
            profile?.currentCity ||
            profile?.city ||
            profile?.location ||
            "Location not added"
        );
    };

    // =========================================================
    // GET OCCUPATION
    // =========================================================

    const getOccupation = (profile) => {

        return (
            profile?.occupation ||
            profile?.job ||
            profile?.profession ||
            "Professional"
        );
    };

    // =========================================================
    // GET RELIGION
    // =========================================================

    const getReligion = (profile) => {

        return (
            profile?.religion ||
            profile?.religiousPreference ||
            profile?.religionName ||
            ""
        );
    };

    // =========================================================
    // GET EDUCATION
    // =========================================================

    const getEducation = (profile) => {

        return (
            profile?.education ||
            profile?.highestEducation ||
            profile?.qualification ||
            ""
        );
    };

    // =========================================================
    // LOAD PROFILES
    // =========================================================

    const loadProfiles = () => {

        const allProfiles =
            JSON.parse(
                localStorage.getItem("allProfiles")
            ) || {};

        const currentLoggedInUser =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            );

        if (!currentLoggedInUser) {

            setProfiles([]);
            setFilteredProfiles([]);

            return;
        }

        const currentEmail =
            (
                currentLoggedInUser.email ||
                currentLoggedInUser.userEmail ||
                ""
            )
                .trim()
                .toLowerCase();

        // =====================================================
        // ALL USERS
        // =====================================================

        const allUsers =
            Object.entries(allProfiles).map(
                ([email, profile]) => ({
                    ...profile,
                    email
                })
            );

        // =====================================================
        // FIND CURRENT USER
        // =====================================================

        const currentProfile =
            allUsers.find(
                (profile) =>
                    (profile.email || "")
                        .trim()
                        .toLowerCase() ===
                    currentEmail
            );

        // =====================================================
        // CURRENT USER GENDER
        // =====================================================

        const currentGender =
            (
                currentProfile?.gender ||
                currentLoggedInUser.gender ||
                ""
            )
                .trim()
                .toLowerCase();

        // =====================================================
        // OPPOSITE GENDER
        // =====================================================

        let oppositeGender = "";

        if (
            currentGender === "male" ||
            currentGender === "m"
        ) {

            oppositeGender = "female";

        } else if (
            currentGender === "female" ||
            currentGender === "f"
        ) {

            oppositeGender = "male";
        }

        // =====================================================
        // FILTER PROFILES
        // =====================================================

        const otherProfiles =
            allUsers.filter(
                (profile) => {

                    const profileEmail =
                        (
                            profile.email ||
                            ""
                        )
                            .trim()
                            .toLowerCase();

                    // Never show logged-in user

                    if (
                        profileEmail ===
                        currentEmail
                    ) {
                        return false;
                    }

                    const profileGender =
                        (
                            profile.gender ||
                            ""
                        )
                            .trim()
                            .toLowerCase();

                    // Show opposite gender

                    if (oppositeGender) {

                        return (
                            profileGender ===
                            oppositeGender
                        );
                    }

                    // If gender is missing for
                    // current user, show other profiles

                    return true;
                }
            );

        setProfiles(
            otherProfiles
        );

        setFilteredProfiles(
            otherProfiles
        );
    };

    // =========================================================
    // LOAD PROFILES WHEN LOGGED IN
    // =========================================================

    useEffect(() => {

        if (!isLoggedIn) {

            setProfiles([]);
            setFilteredProfiles([]);

            return;
        }

        loadProfiles();

        window.addEventListener(
            "profileUpdated",
            loadProfiles
        );

        return () => {

            window.removeEventListener(
                "profileUpdated",
                loadProfiles
            );

        };

    }, [isLoggedIn]);

    // =========================================================
    // APPLY FILTERS
    // =========================================================

    useEffect(() => {

        applyFilters();

    }, [
        searchName,
        selectedCity,
        selectedOccupation,
        selectedReligion,
        selectedEducation,
        minAge,
        maxAge,
        profiles
    ]);

    // =========================================================
    // LOAD WISHLIST
    // =========================================================

    useEffect(() => {

        const savedWishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        setWishlist(
            savedWishlist
        );

    }, []);

    // =========================================================
    // APPLY FILTERS
    // =========================================================

    const applyFilters = () => {

        let result = [
            ...profiles
        ];

        // =====================================================
        // NAME
        // =====================================================

        if (
            searchName.trim() !== ""
        ) {

            const search =
                searchName
                    .trim()
                    .toLowerCase();

            result =
                result.filter(
                    (profile) =>
                        getProfileName(
                            profile
                        )
                            .toLowerCase()
                            .includes(search)
                );
        }

        // =====================================================
        // CITY
        // =====================================================

        if (
            selectedCity !== ""
        ) {

            result =
                result.filter(
                    (profile) =>
                        getCity(
                            profile
                        )
                            .toLowerCase() ===
                        selectedCity.toLowerCase()
                );
        }

        // =====================================================
        // OCCUPATION
        // =====================================================

        if (
            selectedOccupation !== ""
        ) {

            result =
                result.filter(
                    (profile) =>
                        getOccupation(
                            profile
                        )
                            .toLowerCase() ===
                        selectedOccupation.toLowerCase()
                );
        }

        // =====================================================
        // RELIGION
        // =====================================================

        if (
            selectedReligion !== ""
        ) {

            result =
                result.filter(
                    (profile) =>
                        getReligion(
                            profile
                        )
                            .toLowerCase() ===
                        selectedReligion.toLowerCase()
                );
        }

        // =====================================================
        // EDUCATION
        // =====================================================

        if (
            selectedEducation !== ""
        ) {

            result =
                result.filter(
                    (profile) =>
                        getEducation(
                            profile
                        )
                            .toLowerCase() ===
                        selectedEducation.toLowerCase()
                );
        }

        // =====================================================
        // MIN AGE
        // =====================================================

        if (
            minAge !== ""
        ) {

            result =
                result.filter(
                    (profile) => {

                        const age =
                            getAge(profile);

                        return (
                            age !== "" &&
                            age >=
                            Number(minAge)
                        );
                    }
                );
        }

        // =====================================================
        // MAX AGE
        // =====================================================

        if (
            maxAge !== ""
        ) {

            result =
                result.filter(
                    (profile) => {

                        const age =
                            getAge(profile);

                        return (
                            age !== "" &&
                            age <=
                            Number(maxAge)
                        );
                    }
                );
        }

        setFilteredProfiles(
            result
        );
    };

    // =========================================================
    // FILTER OPTIONS
    // =========================================================

    const cities = [
        ...new Set(
            profiles
                .map(
                    (profile) =>
                        getCity(profile)
                )
                .filter(
                    (city) =>
                        city &&
                        city !==
                        "Location not added"
                )
        )
    ].sort();

    const occupations = [
        ...new Set(
            profiles
                .map(
                    (profile) =>
                        getOccupation(profile)
                )
                .filter(
                    (occupation) =>
                        occupation &&
                        occupation !==
                        "Professional"
                )
        )
    ].sort();

    const religions = [
        ...new Set(
            profiles
                .map(
                    (profile) =>
                        getReligion(profile)
                )
                .filter(Boolean)
        )
    ].sort();

    const educations = [
        ...new Set(
            profiles
                .map(
                    (profile) =>
                        getEducation(profile)
                )
                .filter(Boolean)
        )
    ].sort();

    // =========================================================
    // CLEAR FILTERS
    // =========================================================

    const clearFilters = () => {

        setSearchName("");
        setSelectedCity("");
        setSelectedOccupation("");
        setSelectedReligion("");
        setSelectedEducation("");
        setMinAge("");
        setMaxAge("");
    };

    // =========================================================
    // VIEW PROFILE
    // =========================================================

    const viewProfile = (profile) => {

        navigate(
            "/view-profile",
            {
                state: {
                    profile: {
                        ...profile,
                        email: profile.email
                    },
                    from: "/search"
                }
            }
        );
    };

    // =========================================================
    // TOGGLE WISHLIST
    // =========================================================

    const toggleWishlist = (profile) => {

        const profileEmail =
            profile.email;

        const alreadyAdded =
            wishlist.some(
                (item) =>
                    item.email ===
                    profileEmail
            );

        let updatedWishlist;

        if (alreadyAdded) {

            // Remove from wishlist

            updatedWishlist =
                wishlist.filter(
                    (item) =>
                        item.email !==
                        profileEmail
                );

        } else {

            // Add to wishlist

            updatedWishlist = [
                ...wishlist,
                profile
            ];
        }

        setWishlist(
            updatedWishlist
        );

        localStorage.setItem(
            "wishlist",
            JSON.stringify(
                updatedWishlist
            )
        );

        window.dispatchEvent(
            new Event("wishlistUpdated")
        );
    };

    // =========================================================
    // PROFILE CARD
    // =========================================================

    const ProfileCard = ({
        profile
    }) => {

        const age =
            getAge(profile);

        const religion =
            getReligion(profile);

        const education =
            getEducation(profile);

        const isInWishlist =
            wishlist.some(
                (item) =>
                    item.email ===
                    profile.email
            );

        return (

            <article className="search-profile-card">

                {/* IMAGE */}

                <div className="search-profile-photo">

                    <img
                        src={getProfileImage(profile)}
                        alt={getProfileName(profile)}
                        onError={(e) => {

                            e.currentTarget.onerror =
                                null;

                            e.currentTarget.src =
                                "https://randomuser.me/api/portraits/lego/1.jpg";
                        }}
                    />

                    {/* IMAGE OVERLAY */}

                    <div className="search-photo-overlay">

                        <span>
                            ✦ NIYATI MEMBER
                        </span>

                    </div>

                    {/* HEART */}

                    <button
                        type="button"
                        className={
                            `search-heart ${
                                isInWishlist
                                    ? "wishlist-active"
                                    : ""
                            }`
                        }
                        onClick={() =>
                            toggleWishlist(
                                profile
                            )
                        }
                        aria-label={
                            isInWishlist
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                    >

                        {isInWishlist
                            ? "♥"
                            : "♡"}

                    </button>

                    {/* AGE OVER IMAGE */}

                    {age && (

                        <div className="search-photo-age">
                            {age} yrs
                        </div>

                    )}

                </div>

                {/* CONTENT */}

                <div className="search-profile-content">

                    <span className="search-profile-label">
                        NIYATI MEMBER
                    </span>

                    <h3>
                        {getProfileName(profile)}
                    </h3>

                    <p className="search-occupation">
                        {getOccupation(profile)}
                    </p>

                    <p className="search-location">

                        <span className="location-icon">
                            ●
                        </span>

                        {getCity(profile)}

                    </p>

                    {/* BASIC DETAILS */}

                    <div className="search-profile-meta">

                        {age && (

                            <span>
                                {age} yrs
                            </span>

                        )}

                        {profile.gender && (

                            <span>
                                {profile.gender}
                            </span>

                        )}

                        {profile.maritalStatus && (

                            <span>
                                {profile.maritalStatus}
                            </span>

                        )}

                    </div>

                    {/* EXTRA DETAILS */}

                    {(religion || education) && (

                        <div className="search-extra-details">

                            {religion && (

                                <div>

                                    <small>
                                        Religion
                                    </small>

                                    <strong>
                                        {religion}
                                    </strong>

                                </div>

                            )}

                            {education && (

                                <div>

                                    <small>
                                        Education
                                    </small>

                                    <strong>
                                        {education}
                                    </strong>

                                </div>

                            )}

                        </div>

                    )}

                    {/* BOTTOM */}

                    <div className="search-card-bottom">

                        <span className="search-match">
                            ● Profile available
                        </span>

                        {/* VIEW PROFILE */}

                        <button
                            type="button"
                            className="search-view-btn"
                            onClick={() =>
                                viewProfile(
                                    profile
                                )
                            }
                        >

                            View Profile

                            <span>
                                →
                            </span>

                        </button>

                    </div>

                </div>

            </article>
        );
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="search-page">

            <Navbar />

            {/* =================================================
                INTRO
            ================================================= */}

            <section className="search-intro">

                <div className="search-intro-content">

                    <span className="search-eyebrow">
                        ✦ FIND YOUR DESTINED PARTNER ✦
                    </span>

                    <h1>
                        Discover Your
                        <span>
                            {" "}Perfect Match
                        </span>
                    </h1>

                    <p>
                        Explore meaningful profiles
                        and discover a connection that
                        feels right for you.
                    </p>

                </div>

                <div className="search-intro-decoration">

                    <div className="intro-person maroon">
                        ●
                    </div>

                    <div className="intro-heart">
                        ♥
                    </div>

                    <div className="intro-person orange">
                        ●
                    </div>

                </div>

            </section>

            {/* =================================================
                MAIN
            ================================================= */}

            <main className="search-main">

                {/* =================================================
                    FILTER PANEL
                ================================================= */}

                <aside className="search-filter-panel">

                    <div className="filter-panel-heading">

                        <div className="filter-icon">
                            ⚙
                        </div>

                        <div>

                            <span>
                                REFINE SEARCH
                            </span>

                            <h2>
                                Find Your Match
                            </h2>

                        </div>

                    </div>

                    <div className="filter-divider"></div>

                    {/* NAME */}

                    <div className="search-field">

                        <label>
                            Search by Name
                        </label>

                        <div className="input-wrapper">

                            <span>
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Enter name..."
                                value={searchName}
                                onChange={(e) =>
                                    setSearchName(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* AGE */}

                    <div className="search-field">

                        <label>
                            Age
                        </label>

                        <div className="age-filter-row">

                            <select
                                value={minAge}
                                onChange={(e) =>
                                    setMinAge(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Min
                                </option>

                                {Array.from(
                                    {
                                        length: 33
                                    },
                                    (_, i) =>
                                        i + 18
                                ).map(
                                    (age) => (

                                        <option
                                            key={age}
                                            value={age}
                                        >
                                            {age}
                                        </option>

                                    )
                                )}

                            </select>

                            <span>
                                to
                            </span>

                            <select
                                value={maxAge}
                                onChange={(e) =>
                                    setMaxAge(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Max
                                </option>

                                {Array.from(
                                    {
                                        length: 33
                                    },
                                    (_, i) =>
                                        i + 18
                                ).map(
                                    (age) => (

                                        <option
                                            key={age}
                                            value={age}
                                        >
                                            {age}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>

                    {/* LOCATION */}

                    <div className="search-field">

                        <label>
                            Location
                        </label>

                        <select
                            value={selectedCity}
                            onChange={(e) =>
                                setSelectedCity(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Locations
                            </option>

                            {cities.map(
                                (city) => (

                                    <option
                                        key={city}
                                        value={city}
                                    >
                                        {city}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    {/* RELIGION */}

                    <div className="search-field">

                        <label>
                            Religion
                        </label>

                        <select
                            value={selectedReligion}
                            onChange={(e) =>
                                setSelectedReligion(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Religions
                            </option>

                            {religions.map(
                                (religion) => (

                                    <option
                                        key={religion}
                                        value={religion}
                                    >
                                        {religion}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    {/* EDUCATION */}

                    <div className="search-field">

                        <label>
                            Education
                        </label>

                        <select
                            value={selectedEducation}
                            onChange={(e) =>
                                setSelectedEducation(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Education
                            </option>

                            {educations.map(
                                (education) => (

                                    <option
                                        key={education}
                                        value={education}
                                    >
                                        {education}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    {/* PROFESSION */}

                    <div className="search-field">

                        <label>
                            Profession
                        </label>

                        <select
                            value={selectedOccupation}
                            onChange={(e) =>
                                setSelectedOccupation(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Professions
                            </option>

                            {occupations.map(
                                (occupation) => (

                                    <option
                                        key={occupation}
                                        value={occupation}
                                    >
                                        {occupation}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    {/* SEARCH */}

                    <button
                        type="button"
                        className="search-apply-btn"
                        onClick={applyFilters}
                    >

                        Search Profiles

                        <span>
                            →
                        </span>

                    </button>

                    {/* RESET */}

                    <button
                        type="button"
                        className="search-reset-btn"
                        onClick={clearFilters}
                    >
                        Reset Filters
                    </button>

                    <div className="filter-note">

                        <span>
                            ♥
                        </span>

                        <p>
                            Every connection begins
                            with understanding.
                        </p>

                    </div>

                </aside>

                {/* =================================================
                    RESULTS
                ================================================= */}

                <section className="search-results">

                    <div className="search-results-top">

                        <div>

                            <span className="results-eyebrow">
                                NIYATI MATRIMONY
                            </span>

                            <h2>
                                Profiles You May Like
                            </h2>

                            <p>
                                Discover profiles based
                                on your preferences.
                            </p>

                        </div>

                        <div className="results-count">

                            <strong>
                                {filteredProfiles.length}
                            </strong>

                            <span>
                                PROFILES
                            </span>

                        </div>

                    </div>

                    {/* =================================================
                        PROFILE GRID
                    ================================================= */}

                    {!isLoggedIn ? (

                        <div className="search-empty">

                            <div className="search-empty-heart">
                                ♡
                            </div>

                            <span>
                                NIYATI MATRIMONY
                            </span>

                            <h3>
                                Login to Explore Profiles
                            </h3>

                            <p>
                                Please login or register
                                to explore profiles and
                                discover meaningful
                                connections.
                            </p>

                            <div className="search-login-actions">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/login",
                                            {
                                                state: {
                                                    message:
                                                        "Please login or register to explore profiles and discover meaningful connections."
                                                }
                                            }
                                        )
                                    }
                                >
                                    Login
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/register"
                                        )
                                    }
                                >
                                    Register Free
                                </button>

                            </div>

                        </div>

                    ) : filteredProfiles.length > 0 ? (

                        <div className="search-profile-grid">

                            {filteredProfiles.map(
                                (profile) => (

                                    <ProfileCard
                                        key={
                                            profile.email
                                        }
                                        profile={
                                            profile
                                        }
                                    />

                                )
                            )}

                        </div>

                    ) : (

                        <div className="search-empty">

                            <div className="search-empty-heart">
                                ♡
                            </div>

                            <span>
                                NIYATI MATRIMONY
                            </span>

                            <h3>
                                No profiles found
                            </h3>

                            <p>
                                We couldn't find
                                profiles matching
                                your current
                                preferences.
                            </p>

                            <button
                                type="button"
                                onClick={
                                    clearFilters
                                }
                            >
                                Clear Filters
                            </button>

                        </div>

                    )}

                </section>

            </main>

            <PageNavigation />

        </div>
    );
}

export default Search;