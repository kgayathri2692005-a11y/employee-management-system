import React, {
    useEffect,
    useRef,
    useState
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import { toast } from "react-toastify";

import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const profileMenuRef = useRef(null);

    // =========================================================
    // CHECK LOGIN
    // =========================================================

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    const isLoggedIn = !!loggedInUser;

    // =========================================================
    // NOTIFICATION COUNT
    // =========================================================

    const [
        notificationCount,
        setNotificationCount
    ] = useState(0);

    // =========================================================
    // PROFILE DATA
    // =========================================================

    const [
        profileData,
        setProfileData
    ] = useState({});

    const [
        showProfileMenu,
        setShowProfileMenu
    ] = useState(false);

    // =========================================================
    // LOAD USER PROFILE
    // =========================================================

    useEffect(() => {

        const loadProfile = () => {

            const currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "loggedInUser"
                    )
                ) || {};

            const allProfiles =
                JSON.parse(
                    localStorage.getItem(
                        "allProfiles"
                    )
                ) || {};

            const currentEmail =
                (
                    currentUser.email ||
                    ""
                )
                    .trim()
                    .toLowerCase();

            const profileKey =
                Object.keys(allProfiles).find(
                    (email) =>
                        email
                            .trim()
                            .toLowerCase() ===
                        currentEmail
                );

            const currentProfile =
                profileKey
                    ? allProfiles[profileKey]
                    : {};

            setProfileData(
                currentProfile
            );
        };

        loadProfile();

        window.addEventListener(
            "profileUpdated",
            loadProfile
        );

        return () => {

            window.removeEventListener(
                "profileUpdated",
                loadProfile
            );

        };

    }, []);

    // =========================================================
    // NOTIFICATION COUNT
    // =========================================================

    useEffect(() => {

        if (!isLoggedIn) {
            setNotificationCount(0);
            return;
        }

        const updateNotificationCount = () => {

            const currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "loggedInUser"
                    )
                ) || {};

            const interestRequests =
                JSON.parse(
                    localStorage.getItem(
                        "interestRequests"
                    )
                ) || [];

            const pendingRequests =
                interestRequests.filter(
                    (request) =>
                        request.to ===
                            currentUser.email &&
                        request.status ===
                            "Pending"
                );

            const userNotifications =
                JSON.parse(
                    localStorage.getItem(
                        "userNotifications"
                    )
                ) || [];

            const unreadRejectionNotifications =
                userNotifications.filter(
                    (notification) =>
                        notification.to ===
                            currentUser.email &&
                        notification.type ===
                            "rejection" &&
                        notification.read === false
                );

                const profileViewNotifications =
    JSON.parse(
        localStorage.getItem(
            "profileViewNotifications"
        )
    ) || [];

const unreadProfileViewNotifications =
    profileViewNotifications.filter(
        (notification) =>
            notification.receiverEmail ===
                currentUser.email.toLowerCase() &&
            notification.type ===
                "profile_view" &&
            notification.isRead === false
    );

           const totalCount =
    pendingRequests.length +
    unreadRejectionNotifications.length +
    unreadProfileViewNotifications.length;
            setNotificationCount(
                totalCount
            );
        };

        updateNotificationCount();

        window.addEventListener(
            "notificationsUpdated",
            updateNotificationCount
        );

        return () => {

            window.removeEventListener(
                "notificationsUpdated",
                updateNotificationCount
            );

        };

    }, [isLoggedIn]);

    // =========================================================
    // DISPLAY NAME
    // =========================================================

    const fullName = [

        profileData?.firstName,

        profileData?.lastName

    ]
        .filter(Boolean)
        .join(" ")
        .trim();

    const displayName =
        fullName ||
        profileData?.userName ||
        loggedInUser?.userName ||
        loggedInUser?.name ||
        loggedInUser?.fullName ||
        "User";

    // =========================================================
    // NAVIGATION
    // =========================================================

    const handleNavigation = (path) => {

        setShowProfileMenu(false);

        // =====================================================
        // HOME BUTTON
        // If already on the same Home page, stay there.
        // =====================================================

        if (
            path === location.pathname
        ) {
            return;
        }

        // =====================================================
        // PROTECTED PAGES
        // =====================================================

       const protectedPaths = [
    "/search",
    "/users",
    "/inbox",
    "/notifications",
    "/wishlist",
    "/ignored-profiles",
    "/viewed-profiles",
    "/who-viewed-me",
    "/myprofile"
];

        // =====================================================
        // PUBLIC USER TRYING TO ACCESS PROTECTED PAGE
        // =====================================================

        if (
            protectedPaths.includes(path) &&
            !isLoggedIn
        ) {

            const message =
                path === "/search"
                    ? "Please login or register to search and explore profiles."
                    : "Please login or register to access this feature.";

            // =================================================
            // SHOW NIYATI TOAST
            // =================================================

            toast.info(message);

            // =================================================
            // OPEN LOGIN AFTER SHORT DELAY
            // =================================================

            setTimeout(() => {

                navigate("/login", {
                    state: {
                        message: message
                    }
                });

            }, 3200);

            return;
        }

        // =====================================================
        // NORMAL NAVIGATION
        // =====================================================

        navigate(path);
    };

    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "loggedInUser"
        );

        setShowProfileMenu(false);

        navigate(
            "/dashboard"
        );
    };

    // =========================================================
    // ACTIVE ROUTE
    // =========================================================

    const isActive = (path) => {

        if (path === "/dashboard") {

            return (
                location.pathname ===
                "/dashboard"
            );

        }

        return (
            location.pathname === path ||
            location.pathname.startsWith(
                `${path}/`
            )
        );

    };

    // =========================================================
    // CLOSE PROFILE DROPDOWN
    // =========================================================

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(
                    event.target
                )
            ) {

                setShowProfileMenu(
                    false
                );

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    // =========================================================
    // PUBLIC NAVIGATION
    // =========================================================

    const publicNavigationItems = [

        {
            label: "Home",
            path: "/dashboard",
            icon: "⌂"
        },

         {
            label: "Search",
            path: "/search",
            icon: "⌕"
        },


        {
            label: "About Niyati",
            path: "/about-us",
            icon: "i"
        },

        {
            label: "Success Stories",
            path: "/dashboard-users",
            icon: "✦"
        },

    ];

    // =========================================================
    // LOGGED-IN NAVIGATION
    // =========================================================

    /*
     * IMPORTANT:
     *
     * Home dynamically points to whichever Home page
     * the user is currently on.
     *
     * /dashboard -> Home points to /dashboard
     * /home      -> Home points to /home
     *
     * If the user is somewhere else, Home points to /home.
     */

    const homePath =
        location.pathname === "/dashboard"
            ? "/dashboard"
            : "/home";

    const loggedInNavigationItems = [

        {
            label: "Home",
            path: homePath,
            icon: "⌂"
        },

        {
            label: "Matches",
            path: "/users",
            icon: "♡"
        },

        {
            label: "Search",
            path: "/search",
            icon: "⌕"
        },

        {
            label: "Messages",
            path: "/inbox",
            icon: "✉"
        },

        {
            label: "Success Stories",
            path: "/dashboard-users",
            icon: "✦"
        }

    ];

    // =========================================================
    // SELECT NAVIGATION
    // =========================================================

    const navigationItems =
        isLoggedIn
            ? loggedInNavigationItems
            : publicNavigationItems;

    // =========================================================
    // NAVBAR
    // =========================================================

    return (

        <header className="navbar">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="navbar-left">

                <button
                    type="button"
                    className="navbar-brand-button"
                    onClick={() => {

                        if (
                            location.pathname ===
                            "/dashboard"
                        ) {
                            handleNavigation(
                                "/dashboard"
                            );
                            return;
                        }

                        if (
                            location.pathname ===
                            "/home"
                        ) {
                            handleNavigation(
                                "/home"
                            );
                            return;
                        }

                        handleNavigation(
                            isLoggedIn
                                ? "/home"
                                : "/dashboard"
                        );

                    }}
                    aria-label="Go to Home"
                >

                    <img
                        src="/logo.jpeg"
                        alt="Niyati Matrimony"
                        className="navbar-logo"
                    />

                    <div className="navbar-brand">

                        <h2>
                            Niyati Matrimony
                        </h2>

                        <span>
                            Find Your Perfect Match
                        </span>

                    </div>

                </button>

            </div>

            {/* =================================================
                MAIN NAVIGATION
            ================================================= */}

            <nav
                className="navbar-navigation"
                aria-label="Main navigation"
            >

                {navigationItems.map(
                    (item) => (

                        <button
                            key={item.path}
                            type="button"
                            className={
                                `navbar-nav-item ${
                                    isActive(
                                        item.path
                                    )
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() =>
                                handleNavigation(
                                    item.path
                                )
                            }
                        >

                            <span
                                className="nav-item-icon"
                                aria-hidden="true"
                            >
                                {item.icon}
                            </span>

                            <span className="nav-item-label">
                                {item.label}
                            </span>

                        </button>

                    )
                )}

            </nav>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="navbar-right">

                {/* =================================================
                    BEFORE LOGIN
                ================================================= */}

                {!isLoggedIn && (
<>
                        <button
                            type="button"
                            className="navbar-login-btn"
                            onClick={() =>
                                handleNavigation(
                                    "/login"
                                )
                            }
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            className="navbar-register-btn"
                            onClick={() =>
                                handleNavigation(
                                    "/register"
                                )
                            }
                        >
                            Register
                        </button>

                    </>

                )}

                {/* =================================================
                    AFTER LOGIN
                ================================================= */}

                {isLoggedIn && (

                    <>

                        {/* NOTIFICATIONS */}

                        <button
                            type="button"
                            className={
                                `navbar-notification ${
                                    isActive(
                                        "/notifications"
                                    )
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() =>
                                handleNavigation(
                                    "/notifications"
                                )
                            }
                            aria-label="Notifications"
                        >

                            <span
                                className="notification-icon"
                                aria-hidden="true"
                            >
                                🔔
                            </span>

                            {notificationCount > 0 && (

                                <span className="notification-badge">

                                    {notificationCount > 99
                                        ? "99+"
                                        : notificationCount}

                                </span>

                            )}

                        </button>

                        {/* PROFILE */}

                        <div
                            className="navbar-profile-container"
                            ref={profileMenuRef}
                        >

                            <button
                                type="button"
                                className="navbar-profile-button"
                                onClick={() =>
                                    setShowProfileMenu(
                                        (prev) =>
                                            !prev
                                    )
                                }
                                aria-expanded={
                                    showProfileMenu
                                }
                                aria-haspopup="true"
                            >

                                <img
                                    src={
                                        profileData?.profilePhoto ||
                                        profileData?.profileImage ||
                                        "/logo.jpeg"
                                    }
                                    alt="Profile"
                                    className="navbar-profile-img"
                                />

                                <span className="navbar-profile-text">

                                    <span className="profile-welcome">
                                        Welcome
                                    </span>

                                    <span className="navbar-profile-name">
                                        {displayName}
                                    </span>

                                </span>

                                <span
                                    className={
                                        `profile-dropdown-icon ${
                                            showProfileMenu
                                                ? "open"
                                                : ""
                                        }`
                                    }
                                >
                                    ⌄
                                </span>

                            </button>

                            {/* PROFILE DROPDOWN */}

                            {showProfileMenu && (

                                <div
                                    className="profile-dropdown"
                                    onClick={(e) =>
                                        e.stopPropagation()
                                    }
                                >

                                    <div className="profile-dropdown-header">

                                        <img
                                            src={
                                                profileData?.profilePhoto ||
                                                profileData?.profileImage ||
                                                "/logo.jpeg"
                                            }
                                            alt=""
                                            className="dropdown-profile-img"
                                        />

                                        <div>

                                            <strong>
                                                {displayName}
                                            </strong>

                                            <span>
                                                My Niyati Account
                                            </span>

                                        </div>

                                    </div>

                                    <div className="dropdown-divider" />

                                    {/* MY PROFILE */}

                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleNavigation(
                                                "/myprofile"
                                            )
                                        }
                                    >

                                        <span className="dropdown-item-icon">
                                            ♙
                                        </span>

                                        <span>
                                            My Profile
                                        </span>

                                    </button>

                                      {/* Settings */}

                                     <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleNavigation(
                                                "/settings"
                                            )
                                        }
                                    >

                                        <span className="dropdown-item-icon">
                                            ⚙
                                        </span>

                                        <span>
                                            Settings
                                        </span>

                                    </button>

                                    {/* WISHLIST */}

                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleNavigation(
                                                "/wishlist"
                                            )
                                        }
                                    >

                                        <span className="dropdown-item-icon">
                                            ♡
                                        </span>

                                        <span>
                                            My Wishlist
                                        </span>

                                    </button>

                                    {/* IGNORED */}

                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleNavigation(
                                                "/ignored-profiles"
                                            )
                                        }
                                    >

                                        <span className="dropdown-item-icon">
                                            ⊘
                                        </span>

                                        <span>
                                            Ignored Profiles
                                        </span>

                                    </button>
                                    {/* VIEWED PROFILES */}

<button
    type="button"
    className="dropdown-item"
    onClick={() =>
        handleNavigation(
            "/viewed-profiles"
        )
    }
>

    <span className="dropdown-item-icon">
        ◉
    </span>

    <span>
        Viewed Profiles
    </span>

</button>

{/* WHO VIEWED ME */}

<button
    type="button"
    className="dropdown-item"
    onClick={() =>
        handleNavigation(
            "/who-viewed-me"
        )
    }
>

    <span className="dropdown-item-icon">
        👁
    </span>

    <span>
        Who Viewed Me
    </span>

</button>

                                   {/* ABOUT */}

<button
    type="button"
    className="dropdown-item"
    onClick={() =>
        handleNavigation(
            "/about-us"
        )
    }
>

    <span className="dropdown-item-icon">
        i
    </span>

    <span>
        About Niyati
    </span>

</button>

{/* HELP & SUPPORT */}

<button
    type="button"
    className="dropdown-item"
    onClick={() =>
        handleNavigation(
            "/help-support"
        )
    }
>

    <span className="dropdown-item-icon">
        ?
    </span>

    <span>
        Help & Support
    </span>

</button>

<div className="dropdown-divider" />
                                    {/* LOGOUT */}

                                    <button
                                        type="button"
                                        className="dropdown-logout"
                                        onClick={handleLogout}
                                    >

                                        <span className="logout-icon">
                                            ↪
                                        </span>

                                        <span>
                                            Logout
                                        </span>

                                    </button>

                                </div>

                            )}

                        </div>

                    </>

                )}

            </div>

        </header>

    );
}

export default Navbar;