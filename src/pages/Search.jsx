import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/Search.css";

function Search() {
    const navigate = useNavigate();

    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);

    const [searchName, setSearchName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedOccupation, setSelectedOccupation] = useState("");

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
    // GET PROFILE IMAGE
    // =========================================================

    const getProfileImage = (profile) => {
        if (
            typeof profile?.profilePhoto === "string" &&
            profile.profilePhoto.trim() !== ""
        ) {
            return profile.profilePhoto;
        }

        if (
            Array.isArray(profile?.additionalPhotos) &&
            profile.additionalPhotos.length > 0
        ) {
            const photo = profile.additionalPhotos.find(
                (item) =>
                    typeof item === "string" &&
                    item.trim() !== ""
            );

            if (photo) {
                return photo;
            }
        }

        if (
            typeof profile?.profileImage === "string" &&
            profile.profileImage.trim() !== ""
        ) {
            return profile.profileImage;
        }

        return "https://randomuser.me/api/portraits/lego/1.jpg";
    };

    // =========================================================
    // GET AGE
    // =========================================================

    const getAge = (profile) => {
        if (profile?.age) {
            return profile.age;
        }

        if (profile?.dob) {
            const birthDate = new Date(profile.dob);
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
                    today.getDate() < birthDate.getDate()
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
    // LOAD PROFILES
    // =========================================================

    useEffect(() => {
        loadProfiles();
    }, []);

    const loadProfiles = () => {
        const allProfiles =
            JSON.parse(
                localStorage.getItem("allProfiles")
            ) || {};

        const loggedInUser =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            );

        if (!loggedInUser) {
            setProfiles([]);
            setFilteredProfiles([]);
            return;
        }

        const currentEmail =
            (
                loggedInUser.email ||
                loggedInUser.userEmail ||
                ""
            )
                .trim()
                .toLowerCase();

        // ---------------------------------------------------------
        // FIND CURRENT USER PROFILE
        // ---------------------------------------------------------

        let currentProfile =
            allProfiles[currentEmail];

        if (!currentProfile) {
            const matchingKey =
                Object.keys(allProfiles).find(
                    (email) =>
                        email.trim().toLowerCase() ===
                        currentEmail
                );

            if (matchingKey) {
                currentProfile =
                    allProfiles[matchingKey];
            }
        }

        if (!currentProfile) {
            setProfiles([]);
            setFilteredProfiles([]);
            return;
        }

        // ---------------------------------------------------------
        // CURRENT USER GENDER
        // ---------------------------------------------------------

        const currentGender =
            (
                currentProfile.gender ||
                loggedInUser.gender ||
                ""
            )
                .trim()
                .toLowerCase();

        // ---------------------------------------------------------
        // OPPOSITE GENDER
        // ---------------------------------------------------------

        let oppositeGender = "";

        if (
            currentGender === "male" ||
            currentGender === "m"
        ) {
            oppositeGender = "female";
        }

        if (
            currentGender === "female" ||
            currentGender === "f"
        ) {
            oppositeGender = "male";
        }

        // ---------------------------------------------------------
        // GET ALL PROFILES
        // ---------------------------------------------------------

        const allUsers =
            Object.entries(allProfiles)
                .map(([email, profile]) => ({
                    ...profile,
                    email
                }));

        // ---------------------------------------------------------
        // SHOW OPPOSITE GENDER
        // ---------------------------------------------------------

        const oppositeGenderProfiles =
            allUsers.filter((profile) => {

                const profileEmail =
                    (profile.email || "")
                        .trim()
                        .toLowerCase();

                const profileGender =
                    (profile.gender || "")
                        .trim()
                        .toLowerCase();

                // Don't show yourself
                if (
                    profileEmail === currentEmail
                ) {
                    return false;
                }

                // If gender is available,
                // show opposite gender only.
                if (oppositeGender) {
                    return (
                        profileGender ===
                        oppositeGender
                    );
                }

                return false;
            });

        setProfiles(oppositeGenderProfiles);
        setFilteredProfiles(oppositeGenderProfiles);
    };

    // =========================================================
    // FILTER PROFILES
    // =========================================================

    useEffect(() => {

        let result = [...profiles];

        // NAME SEARCH
        if (searchName.trim() !== "") {

            const search =
                searchName
                    .trim()
                    .toLowerCase();

            result = result.filter((profile) => {

                const name =
                    getProfileName(profile)
                        .toLowerCase();

                return name.includes(search);
            });
        }

        // CITY FILTER
        if (selectedCity !== "") {

            result = result.filter((profile) => {

                const city =
                    getCity(profile)
                        .toLowerCase();

                return (
                    city ===
                    selectedCity.toLowerCase()
                );
            });
        }

        // OCCUPATION FILTER
        if (selectedOccupation !== "") {

            result = result.filter((profile) => {

                const occupation =
                    getOccupation(profile)
                        .toLowerCase();

                return (
                    occupation ===
                    selectedOccupation.toLowerCase()
                );
            });
        }

        setFilteredProfiles(result);

    }, [
        searchName,
        selectedCity,
        selectedOccupation,
        profiles
    ]);

    // =========================================================
    // GET FILTER OPTIONS
    // =========================================================

    const cities = [
        ...new Set(
            profiles
                .map((profile) => getCity(profile))
                .filter(
                    (city) =>
                        city &&
                        city !== "Location not added"
                )
        )
    ];

    const occupations = [
        ...new Set(
            profiles
                .map((profile) =>
                    getOccupation(profile)
                )
                .filter(
                    (occupation) =>
                        occupation &&
                        occupation !== "Professional"
                )
        )
    ];

    // =========================================================
    // CLEAR FILTERS
    // =========================================================

    const clearFilters = () => {
        setSearchName("");
        setSelectedCity("");
        setSelectedOccupation("");
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
    // PROFILE CARD
    // =========================================================

    const ProfileCard = ({ profile }) => {

        return (
            <div className="search-profile-card">

                {/* PHOTO */}

                <div className="search-profile-photo">

                    <img
                        src={getProfileImage(profile)}
                        alt={getProfileName(profile)}
                        onError={(e) => {
                            e.currentTarget.onerror = null;

                            e.currentTarget.src =
                                "https://randomuser.me/api/portraits/lego/1.jpg";
                        }}
                    />

                    <span className="search-verified">
                        ✓ Verified
                    </span>

                </div>

                {/* INFORMATION */}

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
                        📍 {getCity(profile)}
                    </p>

                    <div className="search-profile-meta">

                        {getAge(profile) && (
                            <span>
                                {getAge(profile)} yrs
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

                    <button
                        className="search-view-btn"
                        onClick={() =>
                            viewProfile(profile)
                        }
                    >
                        View Profile
                    </button>

                </div>

            </div>
        );
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="search-page">

            <Navbar />

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="search-header">

                <div>

                    <span className="search-small-title">
                        FIND YOUR DESTINED PARTNER
                    </span>

                    <h1>
                        Browse Profiles
                    </h1>

                    <p>
                        Discover meaningful connections
                        from the Niyati community.
                    </p>

                </div>

            </section>

            {/* =================================================
                FILTER BAR
            ================================================= */}

            <section className="search-filter-section">

                <div className="search-filter-box">

                    {/* NAME */}

                    <div className="search-field">

                        <label>
                            Search
                        </label>

                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchName}
                            onChange={(e) =>
                                setSearchName(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* CITY */}

                    <div className="search-field">

                        <label>
                            City
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
                                All Cities
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

                    {/* OCCUPATION */}

                    <div className="search-field">

                        <label>
                            Occupation
                        </label>

                        <select
                            value={
                                selectedOccupation
                            }
                            onChange={(e) =>
                                setSelectedOccupation(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Occupations
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

                    {/* CLEAR */}

                    <button
                        className="search-clear-btn"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>

                </div>

            </section>

            {/* =================================================
                RESULTS
            ================================================= */}

            <section className="search-results-section">

                <div className="search-results-heading">

                    <div>

                        <span>
                            NIYATI MATRIMONY
                        </span>

                        <h2>
                            Profiles You May Like
                        </h2>

                    </div>

                    <strong>
                        {filteredProfiles.length} Profiles
                    </strong>

                </div>

                {filteredProfiles.length > 0 ? (

                    <div className="search-profile-grid">

                        {filteredProfiles.map(
                            (profile) => (

                                <ProfileCard
                                    key={profile.email}
                                    profile={profile}
                                />

                            )
                        )}

                    </div>

                ) : (

                    <div className="search-empty">

                        <div className="search-empty-icon">
                            ♡
                        </div>

                        <h3>
                            No profiles found
                        </h3>

                        <p>
                            Try changing your search
                            or filters.
                        </p>

                        <button
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>

                    </div>

                )}

            </section>

        </div>
    );
}

export default Search;