import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";
import { toast } from "react-toastify";

import "../styles/Users.css";

function Users() {
    const navigate = useNavigate();

    /* =====================================================
       LOGGED IN USER
    ===================================================== */

    const loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser")) || {};

    const loggedInEmail =
        (loggedInUser.email || "")
            .trim()
            .toLowerCase();

    /* =====================================================
       STATES
    ===================================================== */

    const [employees, setEmployees] = useState([]);

    const [matchedUsers, setMatchedUsers] = useState(() => {
        return (
            JSON.parse(
                localStorage.getItem("matchedUsers")
            ) || []
        );
    });

    const wishlistKey = `wishlist_${loggedInEmail}`;

    const [wishlist, setWishlist] = useState(() => {
        const user =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            ) || {};

        const email =
            (user.email || "").trim();

        return (
            JSON.parse(
                localStorage.getItem(
                    `wishlist_${email}`
                )
            ) || []
        );
    });

    const [ignoredProfiles, setIgnoredProfiles] =
        useState([]);

    const [sentInterests, setSentInterests] =
        useState({});

    /*
     * Custom wishlist ribbon
     *
     * type:
     * "added"    = orange
     * "removed"  = maroon
     */

    const [wishlistPopup, setWishlistPopup] =
        useState(null);

    /* =====================================================
       GET CURRENT USER'S IGNORED EMAILS
    ===================================================== */

    const getIgnoredEmails = (currentEmail) => {
        const ignoredData =
            JSON.parse(
                localStorage.getItem(
                    "ignoredProfiles"
                )
            ) || {};

        const currentKey =
            Object.keys(ignoredData).find(
                (key) =>
                    key
                        .trim()
                        .toLowerCase() ===
                    currentEmail
                        .trim()
                        .toLowerCase()
            );

        if (!currentKey) {
            return [];
        }

        const ignoredList =
            ignoredData[currentKey];

        if (!Array.isArray(ignoredList)) {
            return [];
        }

        return ignoredList
            .map((item) => {
                if (
                    typeof item ===
                    "string"
                ) {
                    return item
                        .trim()
                        .toLowerCase();
                }

                return (
                    item?.email || ""
                )
                    .trim()
                    .toLowerCase();
            })
            .filter(Boolean);
    };

    /* =====================================================
       LOAD USERS
    ===================================================== */

    useEffect(() => {
        const loadUsers = () => {
            const currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "loggedInUser"
                    )
                ) || {};

            const currentEmail =
                (
                    currentUser.email ||
                    ""
                )
                    .trim()
                    .toLowerCase();

            const allProfiles =
                JSON.parse(
                    localStorage.getItem(
                        "allProfiles"
                    )
                ) || {};

            if (!currentEmail) {
                return;
            }

            /* =================================================
               CURRENT USER PROFILE
            ================================================= */

            const currentUserEntry =
                Object.entries(
                    allProfiles
                ).find(
                    ([email]) =>
                        email
                            .trim()
                            .toLowerCase() ===
                        currentEmail
                );

            const currentUserProfile =
                currentUserEntry
                    ? currentUserEntry[1]
                    : {};

            const currentUserGender =
                currentUserProfile.gender;

            /* =================================================
               IGNORED USERS
            ================================================= */

            const currentIgnoredEmails =
                getIgnoredEmails(
                    currentEmail
                );

            setIgnoredProfiles(
                currentIgnoredEmails
            );

            /* =================================================
               LOAD USERS
            ================================================= */

            const users =
                Object.entries(
                    allProfiles
                )
                    .filter(
                        ([email, profile]) => {
                            const normalizedEmail =
                                email
                                    .trim()
                                    .toLowerCase();

                            /* Do not show logged in user */

                            if (
                                normalizedEmail ===
                                currentEmail
                            ) {
                                return false;
                            }

                            /* Do not show ignored users */

                            if (
                                currentIgnoredEmails.includes(
                                    normalizedEmail
                                )
                            ) {
                                return false;
                            }

                            /* Male sees Female */

                            if (
                                currentUserGender ===
                                "Male"
                            ) {
                                return (
                                    profile.gender ===
                                    "Female"
                                );
                            }

                            /* Female sees Male */

                            if (
                                currentUserGender ===
                                "Female"
                            ) {
                                return (
                                    profile.gender ===
                                    "Male"
                                );
                            }

                            return false;
                        }
                    )
                    .map(
                        ([email, profile]) => {
                            return {
                                id: email,

                                email: email,

                                profileEmail:
                                    email,

                                name:
                                    `${profile.firstName || ""} ${
                                        profile.lastName || ""
                                    }`.trim() ||
                                    profile.userName ||
                                    profile.fullName ||
                                    "User",

                                designation:
                                    profile.occupation ||
                                    "Occupation not added",

                                image:
                                    profile.profilePhoto ||
                                    profile.profileImage ||
                                    (
                                        Array.isArray(
                                            profile.additionalPhotos
                                        ) &&
                                        profile
                                            .additionalPhotos
                                            .length
                                            ? profile
                                                .additionalPhotos[0]
                                            : ""
                                    ) ||
                                    "https://randomuser.me/api/portraits/lego/1.jpg",

                                gender:
                                    profile.gender ||
                                    "",

                                dob:
                                    profile.dob ||
                                    "",

                                maritalStatus:
                                    profile.maritalStatus ||
                                    "",

                                height:
                                    profile.height ||
                                    "",

                                weight:
                                    profile.weight ||
                                    "",

                                religion:
                                    profile.religion ||
                                    "",

                                caste:
                                    profile.caste ||
                                    "",

                                motherTongue:
                                    profile.motherTongue ||
                                    "",

                                nationality:
                                    profile.nationality ||
                                    "",

                                qualification:
                                    profile.qualification ||
                                    profile.education ||
                                    "",

                                college:
                                    profile.college ||
                                    "",

                                occupation:
                                    profile.occupation ||
                                    "",

                                company:
                                    profile.company ||
                                    "",

                                income:
                                    profile.income ||
                                    profile.salary ||
                                    "",

                                workLocation:
                                    profile.workLocation ||
                                    "",

                                city:
                                    profile.currentCity ||
                                    profile.city ||
                                    "",

                                stateName:
                                    profile.currentState ||
                                    profile.stateName ||
                                    profile.state ||
                                    "",

                                country:
                                    profile.currentCountry ||
                                    profile.country ||
                                    "",

                                address:
                                    profile.currentAddress ||
                                    profile.address ||
                                    "",

                                familyType:
                                    profile.familyType ||
                                    "",

                                foodPreference:
                                    profile.foodPreference ||
                                    "",

                                smokingHabit:
                                    profile.smokingHabit ||
                                    "",

                                drinkingHabit:
                                    profile.drinkingHabit ||
                                    "",

                                hobbies:
                                    profile.hobbies ||
                                    "",

                                partnerAgeFrom:
                                    profile.partnerAgeFrom ||
                                    "",

                                partnerAgeTo:
                                    profile.partnerAgeTo ||
                                    "",

                                partnerEducation:
                                    profile.partnerEducation ||
                                    "",

                                partnerOccupation:
                                    profile.partnerOccupation ||
                                    "",

                                partnerReligion:
                                    profile.partnerReligion ||
                                    "",

                                partnerCountry:
                                    profile.partnerCountry ||
                                    "",

                                fatherName:
                                    profile.fatherName ||
                                    "",

                                motherName:
                                    profile.motherName ||
                                    "",

                                siblings:
                                    profile.siblings ||
                                    "",

                                aboutMe:
                                    profile.aboutMe ||
                                    ""
                            };
                        }
                    );

            setEmployees(users);

            /* =================================================
               LOAD INTEREST REQUESTS
            ================================================= */

            const requests =
                JSON.parse(
                    localStorage.getItem(
                        "interestRequests"
                    )
                ) || [];

            const statuses =
                requests
                    .filter(
                        (request) =>
                            (
                                request.from ||
                                ""
                            )
                                .trim()
                                .toLowerCase() ===
                            currentEmail
                    )
                    .reduce(
                        (
                            acc,
                            request
                        ) => {
                            const target =
                                (
                                    request.to ||
                                    ""
                                )
                                    .trim()
                                    .toLowerCase();

                            acc[target] =
                                request.status;

                            return acc;
                        },
                        {}
                    );

            setSentInterests(
                statuses
            );

            /* =================================================
               LOAD MATCHES
            ================================================= */

            setMatchedUsers(
                JSON.parse(
                    localStorage.getItem(
                        "matchedUsers"
                    )
                ) || []
            );

            /* =================================================
               LOAD WISHLIST
            ================================================= */

            const currentWishlist =
                JSON.parse(
                    localStorage.getItem(
                        `wishlist_${currentEmail}`
                    )
                ) || [];

            setWishlist(
                currentWishlist
            );
        };

        loadUsers();

        window.addEventListener(
            "profileUpdated",
            loadUsers
        );

        window.addEventListener(
            "notificationsUpdated",
            loadUsers
        );

        window.addEventListener(
            "ignoredProfilesUpdated",
            loadUsers
        );

        return () => {
            window.removeEventListener(
                "profileUpdated",
                loadUsers
            );

            window.removeEventListener(
                "notificationsUpdated",
                loadUsers
            );

            window.removeEventListener(
                "ignoredProfilesUpdated",
                loadUsers
            );
        };
    }, [loggedInEmail]);

    /* =====================================================
       VIEW PROFILE
    ===================================================== */

    const viewProfile = (employee) => {
        navigate(
            "/view-profile",
            {
                state: {
                    profile: employee,
                    from: "/Users"
                }
            }
        );
    };

    /* =====================================================
       CHECK WISHLIST
    ===================================================== */

    const isWishlisted = (employee) => {
        const employeeEmail =
            (
                employee.email ||
                ""
            )
                .trim()
                .toLowerCase();

        return wishlist.some(
            (item) =>
                (
                    item.email ||
                    ""
                )
                    .trim()
                    .toLowerCase() ===
                employeeEmail
        );
    };

    /* =====================================================
       WISHLIST TOGGLE
    ===================================================== */

    const toggleWishlist = (
        employee
    ) => {
        const employeeEmail =
            (
                employee.email ||
                ""
            )
                .trim()
                .toLowerCase();

        const alreadyAdded =
            wishlist.some(
                (item) =>
                    (
                        item.email ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                    employeeEmail
            );

        let updatedWishlist;

        if (alreadyAdded) {
            /* REMOVE */

            updatedWishlist =
                wishlist.filter(
                    (item) =>
                        (
                            item.email ||
                            ""
                        )
                            .trim()
                            .toLowerCase() !==
                        employeeEmail
                );

            setWishlist(
                updatedWishlist
            );

            localStorage.setItem(
                wishlistKey,
                JSON.stringify(
                    updatedWishlist
                )
            );

            showWishlistPopup(
                "removed",
                `${employee.name} removed from Wishlist`
            );
        } else {
            /* ADD */

            updatedWishlist = [
                ...wishlist,
                employee
            ];

            setWishlist(
                updatedWishlist
            );

            localStorage.setItem(
                wishlistKey,
                JSON.stringify(
                    updatedWishlist
                )
            );

            showWishlistPopup(
                "added",
                `${employee.name} added to Wishlist`
            );
        }
    };

    /* =====================================================
       WISHLIST POPUP
    ===================================================== */

    const showWishlistPopup = (
        type,
        message
    ) => {
        setWishlistPopup({
            type,
            message
        });

        setTimeout(() => {
            setWishlistPopup(null);
        }, 2600);
    };

    /* =====================================================
       SEND INTEREST
    ===================================================== */

    const sendInterest = (
        employee
    ) => {
        const interestRequests =
            JSON.parse(
                localStorage.getItem(
                    "interestRequests"
                )
            ) || [];

        const currentEmail =
            loggedInEmail;

        const employeeEmail =
            (
                employee.email ||
                ""
            )
                .trim()
                .toLowerCase();

        const currentIgnored =
            getIgnoredEmails(
                currentEmail
            );

        if (
            currentIgnored.includes(
                employeeEmail
            )
        ) {
            toast.info(
                "This profile is currently ignored. Restore it first."
            );

            return;
        }

        const existingRequest =
            interestRequests.find(
                (request) => {
                    const from =
                        (
                            request.from ||
                            ""
                        )
                            .trim()
                            .toLowerCase();

                    const to =
                        (
                            request.to ||
                            ""
                        )
                            .trim()
                            .toLowerCase();

                    return (
                        (
                            from ===
                                currentEmail &&
                            to ===
                                employeeEmail
                        ) ||
                        (
                            from ===
                                employeeEmail &&
                            to ===
                                currentEmail
                        )
                    );
                }
            );

        if (existingRequest) {
            if (
                (
                    existingRequest.from ||
                    ""
                )
                    .trim()
                    .toLowerCase() ===
                currentEmail
            ) {
                if (
                    existingRequest.status ===
                    "Pending"
                ) {
                    toast.info(
                        "📨 Interest request already sent!"
                    );
                } else if (
                    existingRequest.status ===
                    "Accepted"
                ) {
                    toast.info(
                        "💞 You are already matched!"
                    );
                } else if (
                    existingRequest.status ===
                    "Rejected"
                ) {
                    toast.info(
                        "This previous interest request was rejected. You can view the profile again."
                    );
                }
            } else {
                toast.info(
                    "This person has already sent you an interest request."
                );
            }

            return;
        }

        /* =================================================
           ADD TO WISHLIST
        ================================================= */

        const alreadyExists =
            wishlist.some(
                (item) =>
                    (
                        item.email ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                    employeeEmail
            );

        if (!alreadyExists) {
            const updatedWishlist = [
                ...wishlist,
                employee
            ];

            setWishlist(
                updatedWishlist
            );

            localStorage.setItem(
                wishlistKey,
                JSON.stringify(
                    updatedWishlist
                )
            );
        }

        /* =================================================
           GET SENDER NAME
        ================================================= */

        const allProfiles =
            JSON.parse(
                localStorage.getItem(
                    "allProfiles"
                )
            ) || {};

        const senderEntry =
            Object.entries(
                allProfiles
            ).find(
                ([email]) =>
                    email
                        .trim()
                        .toLowerCase() ===
                    currentEmail
            );

        const senderProfile =
            senderEntry
                ? senderEntry[1]
                : {};

        const senderName =
            [
                senderProfile.firstName,
                senderProfile.lastName
            ]
                .filter(Boolean)
                .join(" ")
                .trim() ||
            loggedInUser.userName ||
            loggedInUser.name ||
            "User";

        /* =================================================
           CREATE REQUEST
        ================================================= */

        const newRequest = {
            id: Date.now(),

            from:
                loggedInUser.email,

            fromName:
                senderName,

            to:
                employee.email,

            toName:
                employee.name,

            status:
                "Pending",

            sentOn:
                new Date()
                    .toLocaleString(),

            rejectionReason:
                "",

            rejectedOn:
                ""
        };

        interestRequests.push(
            newRequest
        );

        localStorage.setItem(
            "interestRequests",
            JSON.stringify(
                interestRequests
            )
        );

        setSentInterests(
            (previous) => ({
                ...previous,

                [employeeEmail]:
                    "Pending"
            })
        );

        window.dispatchEvent(
            new Event(
                "notificationsUpdated"
            )
        );

        toast.success(
            `❤️ Interest request sent to ${employee.name}`
        );
    };

    /* =====================================================
       IGNORE PROFILE
    ===================================================== */

    const ignoreProfile = (
        employee
    ) => {
        const currentEmail =
            loggedInEmail;

        const employeeEmail =
            (
                employee.email ||
                ""
            )
                .trim()
                .toLowerCase();

        const ignoredData =
            JSON.parse(
                localStorage.getItem(
                    "ignoredProfiles"
                )
            ) || {};

        const currentKey =
            Object.keys(
                ignoredData
            ).find(
                (key) =>
                    key
                        .trim()
                        .toLowerCase() ===
                    currentEmail
            ) ||
            loggedInUser.email;

        const currentList =
            Array.isArray(
                ignoredData[
                    currentKey
                ]
            )
                ? ignoredData[
                      currentKey
                  ]
                : [];

        const alreadyIgnored =
            currentList.some(
                (item) => {
                    const email =
                        typeof item ===
                        "string"
                            ? item
                            : item?.email;

                    return (
                        email ||
                        ""
                    )
                        .trim()
                        .toLowerCase() ===
                        employeeEmail;
                }
            );

        if (
            alreadyIgnored
        ) {
            toast.info(
                "Profile is already ignored."
            );

            return;
        }

        const ignoredObject = {
            email:
                employee.email,

            name:
                employee.name,

            ignoredBy:
                loggedInUser.email,

            ignoredOn:
                new Date()
                    .toLocaleString(),

            occupation:
                employee.occupation ||
                "",

            city:
                employee.city ||
                "",

            state:
                employee.stateName ||
                ""
        };

        const updatedList = [
            ...currentList,
            ignoredObject
        ];

        ignoredData[
            currentKey
        ] =
            updatedList;

        localStorage.setItem(
            "ignoredProfiles",
            JSON.stringify(
                ignoredData
            )
        );

        setIgnoredProfiles(
            (previous) => [
                ...previous,
                employeeEmail
            ]
        );

        setEmployees(
            (previous) =>
                previous.filter(
                    (user) =>
                        (
                            user.email ||
                            ""
                        )
                            .trim()
                            .toLowerCase() !==
                        employeeEmail
                )
        );

        window.dispatchEvent(
            new Event(
                "ignoredProfilesUpdated"
            )
        );

        window.dispatchEvent(
            new Event(
                "notificationsUpdated"
            )
        );

        toast.info(
            `${employee.name} moved to Ignored Profiles`
        );
    };

    /* =====================================================
       MATCH CHECK
    ===================================================== */

    const isMatched = (
        employee
    ) => {
        const employeeEmail =
            (
                employee.email ||
                ""
            )
                .trim()
                .toLowerCase();

        return matchedUsers.some(
            (match) => {
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
                    (
                        user1 ===
                            loggedInEmail &&
                        user2 ===
                            employeeEmail
                    ) ||
                    (
                        user2 ===
                            loggedInEmail &&
                        user1 ===
                            employeeEmail
                    )
                );
            }
        );
    };

    /* =====================================================
   ACTUAL PROFILE MATCH CALCULATION
   Based on Partner Preferences
===================================================== */

const calculateMatchPercentage = (employee) => {

    const currentProfile =
        JSON.parse(
            localStorage.getItem("allProfiles")
        ) || {};

    const currentUser =
        currentProfile[loggedInEmail] || {};

    let matchedCriteria = 0;
    let totalCriteria = 0;

    /* =================================================
       1. AGE
    ================================================= */

    const ageFrom =
        Number(currentUser.partnerAgeFrom);

    const ageTo =
        Number(currentUser.partnerAgeTo);

    if (
        ageFrom &&
        ageTo &&
        employee.dob
    ) {
        const birthDate =
            new Date(employee.dob);

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

        totalCriteria++;

        if (
            age >= ageFrom &&
            age <= ageTo
        ) {
            matchedCriteria++;
        }
    }

    /* =================================================
       2. RELIGION
    ================================================= */

    const preferredReligion =
        (
            currentUser.partnerReligion ||
            ""
        )
            .trim()
            .toLowerCase();

    if (preferredReligion) {

        totalCriteria++;

        if (
            preferredReligion ===
                "any religion" ||
            preferredReligion ===
                (
                    employee.religion ||
                    ""
                )
                    .trim()
                    .toLowerCase()
        ) {
            matchedCriteria++;
        }
    }

    /* =================================================
       3. EDUCATION
    ================================================= */

    const preferredEducation =
        (
            currentUser.partnerEducation ||
            ""
        )
            .trim()
            .toLowerCase();

    if (preferredEducation) {

        totalCriteria++;

        if (
            preferredEducation ===
                "any education" ||
            preferredEducation ===
                (
                    employee.qualification ||
                    ""
                )
                    .trim()
                    .toLowerCase()
        ) {
            matchedCriteria++;
        }
    }

    /* =================================================
       4. OCCUPATION
    ================================================= */

    const preferredOccupation =
        (
            currentUser.partnerOccupation ||
            ""
        )
            .trim()
            .toLowerCase();

    if (preferredOccupation) {

        totalCriteria++;

        const employeeOccupation =
            (
                employee.occupation ||
                ""
            )
                .trim()
                .toLowerCase();

        if (
            preferredOccupation ===
                "any occupation" ||
            preferredOccupation ===
                employeeOccupation
        ) {
            matchedCriteria++;
        }
    }

    /* =================================================
       5. LOCATION
    ================================================= */

    const preferredLocation =
        (
            currentUser.partnerCountry ||
            ""
        )
            .trim()
            .toLowerCase();

    if (preferredLocation) {

        totalCriteria++;

        const employeeCity =
            (
                employee.city ||
                ""
            )
                .trim()
                .toLowerCase();

        const employeeState =
            (
                employee.stateName ||
                ""
            )
                .trim()
                .toLowerCase();

        const employeeCountry =
            (
                employee.country ||
                ""
            )
                .trim()
                .toLowerCase();

        if (
            employeeCity.includes(
                preferredLocation
            ) ||
            employeeState.includes(
                preferredLocation
            ) ||
            employeeCountry.includes(
                preferredLocation
            ) ||
            preferredLocation.includes(
                employeeCity
            ) ||
            preferredLocation.includes(
                employeeState
            ) ||
            preferredLocation.includes(
                employeeCountry
            )
        ) {
            matchedCriteria++;
        }
    }

    /* =================================================
       CALCULATE FINAL PERCENTAGE
    ================================================= */

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
    

    /* =====================================================
       RECOMMENDED PROFILES
       First 4 profiles are displayed as recommendations.
    ===================================================== */

const recommendedProfiles =
    [...employees]
        .map((employee) => ({
            employee,
            matchPercent:
                calculateMatchPercentage(
                    employee
                )
        }))
        .sort(
            (a, b) =>
                b.matchPercent -
                a.matchPercent
        )
        .slice(0, 4)
        .map(
            (item) =>
                item.employee
        );

    /* =====================================================
       ALL PROFILES
    ===================================================== */

    const allProfiles =
        employees;

    /* =====================================================
       PROFILE CARD
    ===================================================== */

    const renderProfileCard = (
        employee,
        index
    ) => {
        const employeeEmail =
            (
                employee.email ||
                ""
            )
                .trim()
                .toLowerCase();

        const wishlisted =
            isWishlisted(
                employee
            );

        const matched =
            isMatched(
                employee
            );

        /*
         * Simple visual match percentage.
         * This does not change any functionality.
         */

const matchPercent =
    calculateMatchPercentage(
        employee
    );

        return (
            <div
                className="profile-card"
                key={
                    employee.id ||
                    employeeEmail
                }
            >
                {/* MATCH BADGE */}

                <div className="match-badge">
                    {matchPercent}% Match
                </div>

                {/* =================================================
                    PROFILE IMAGE
                    Clicking image opens profile
                ================================================= */}

                <div
                    className="profile-image-wrapper"
                    onClick={() =>
                        viewProfile(
                            employee
                        )
                    }
                >
                    <img
                        src={
                            employee.image
                        }
                        alt={
                            employee.name
                        }
                    />
                </div>

                {/* =================================================
                    PROFILE INFORMATION
                    Clicking name opens profile
                ================================================= */}

                <div className="profile-card-info">
                    <h3
                        onClick={() =>
                            viewProfile(
                                employee
                            )
                        }
                    >
                        {
                            employee.name
                        }
                    </h3>

                    <p className="profile-basic">
                        {employee.dob
                            ? employee.dob
                            : "Profile"}

                        {employee.maritalStatus
                            ? ` • ${employee.maritalStatus}`
                            : ""}
                    </p>

                    <p className="profile-job">
                        {
                            employee.designation
                        }
                    </p>

                    <p className="profile-location">
                        {employee.city ||
                            "Location not added"}

                        {employee.stateName
                            ? `, ${employee.stateName}`
                            : ""}
                    </p>
                </div>

                {/* =================================================
                    WISHLIST HEART
                    Below image + information
                ================================================= */}

                <button
                    className={
                        wishlisted
                            ? "profile-heart wishlist-active"
                            : "profile-heart"
                    }
                    onClick={() =>
                        toggleWishlist(
                            employee
                        )
                    }
                    title={
                        wishlisted
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"
                    }
                >
                    {wishlisted
                        ? "♥"
                        : "♡"}
                </button>

                {/* =================================================
                    SMALL STATUS
                    No View Profile / Interest buttons
                ================================================= */}

                {matched && (
                    <div className="profile-status matched-status">
                        ♥ Matched
                    </div>
                )}

                {sentInterests[
                    employeeEmail
                ] === "Pending" &&
                    !matched && (
                        <div className="profile-status pending-status">
                            Interest Sent
                        </div>
                    )}
            </div>
        );
    };

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div className="dashboard">
            <div className="main-content">

                <Navbar />

                {/* =================================================
                    WISHLIST RIBBON POPUP
                ================================================= */}

                {wishlistPopup && (
                    <div
                        className={
                            wishlistPopup.type ===
                            "added"
                                ? "wishlist-ribbon wishlist-ribbon-added"
                                : "wishlist-ribbon wishlist-ribbon-removed"
                        }
                    >
                        <span className="wishlist-ribbon-icon">
                            {wishlistPopup.type ===
                            "added"
                                ? "♥"
                                : "♡"}
                        </span>

                        <span>
                            {
                                wishlistPopup.message
                            }
                        </span>
                    </div>
                )}

                <div className="users-container">

                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}
<div className="users-header">
    <div className="users-title-block">
        <h1>Matches</h1>

        <p>
            Discover meaningful connections made for you.
        </p>
    </div>

    <button
        className="view-all-btn"
        onClick={() =>
            document
                .getElementById("all-profiles-section")
                ?.scrollIntoView({
                    behavior: "smooth"
                })
        }
    >
        View All
    </button>
</div>

                    {/* =================================================
                        RECOMMENDED
                    ================================================= */}

                    <section className="recommended-section">

<div className="section-heading">
    <div>
        <h2>Profiles You May Like</h2>

        <p>
           Recommended based on your partner preferences.
        </p>
    </div>

    <span>
        {recommendedProfiles.length} Profiles
    </span>
</div>

                        {recommendedProfiles.length >
                        0 ? (
                            <div className="profiles-grid">
                                {recommendedProfiles.map(
                                    (
                                        employee,
                                        index
                                    ) =>
                                        renderProfileCard(
                                            employee,
                                            index
                                        )
                                )}
                            </div>
                        ) : (
                            <div className="no-profiles">
                                <div className="no-profile-icon">
                                    ♡
                                </div>

                                <h3>
                                    No Profiles Found
                                </h3>

                                <p>
                                    New compatible profiles will appear here.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* =================================================
                        ALL PROFILES
                    ================================================= */}

                    {allProfiles.length >
                        recommendedProfiles.length && (
                        <section
                            id="all-profiles-section"
                            className="all-profiles-section"
                        >
                            <div className="section-heading">
                                <div>
                                    <h2>
                                        Find Your Connection
                                    </h2>

                                    <p>
                                        Explore more profiles that may be right for you.
                                    </p>
                                </div>

                                <span>
                                    {
                                        allProfiles.length
                                    } Profiles
                                </span>
                            </div>

                            <div className="profiles-grid">
{allProfiles
    .filter(
        (employee) =>
            !recommendedProfiles.some(
                (recommended) =>
                    recommended.email ===
                    employee.email
            )
    )
    .map(
        (
            employee,
            index
        ) =>
            renderProfileCard(
                employee,
                index
            )
    )}
                            </div>
                        </section>
                    )}

                    {/* =================================================
                        NO PROFILES
                    ================================================= */}

                    {employees.length ===
                        0 && (
                        <div className="no-profiles">
                            <div className="no-profile-icon">
                                ♡
                            </div>

                            <h3>
                                No Profiles Found
                            </h3>

                            <p>
                                New compatible profiles will appear here.
                            </p>
                        </div>
                    )}

                    <PageNavigation
                        previous="/dashboard"
                        next="/inbox"
                    />

                </div>
            </div>
        </div>
    );
}

export default Users;