import React, {
    useEffect,
    useRef,
    useState
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import "../styles/Navbar.css";


function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const profileMenuRef = useRef(null);


    /*
    =====================================================
    NOTIFICATION COUNT
    =====================================================
    */

    const [
        notificationCount,
        setNotificationCount
    ] = useState(0);


    /*
    =====================================================
    PROFILE DATA
    =====================================================
    */

    const [
        profileData,
        setProfileData
    ] = useState({});


    const [
        showProfileMenu,
        setShowProfileMenu
    ] = useState(false);


    /*
    =====================================================
    LOAD USER PROFILE
    =====================================================
    */

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


            const currentProfile =
                allProfiles[currentUser.email] ||
                allProfiles[currentUser.email?.trim()] ||
                {};


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


    /*
    =====================================================
    UPDATE NOTIFICATION COUNT
    =====================================================
    */

    useEffect(() => {

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
                        request.to === currentUser.email &&
                        request.status === "Pending"
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
                        notification.to === currentUser.email &&
                        notification.type === "rejection" &&
                        notification.read === false
                );


            const totalCount =
                pendingRequests.length +
                unreadRejectionNotifications.length;


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

    }, []);


    /*
    =====================================================
    LOGGED USER
    =====================================================
    */

    const loggedInUser =
        JSON.parse(
            localStorage.getItem(
                "loggedInUser"
            )
        ) || {};


    const fullName = [

        profileData?.firstName,

        profileData?.lastName

    ]
        .filter(Boolean)
        .join(" ")
        .trim();


    /*
    =====================================================
    PROFILE DISPLAY NAME
    =====================================================
    */

    const displayName =
        fullName ||
        profileData?.userName ||
        loggedInUser?.userName ||
        loggedInUser?.name ||
        loggedInUser?.fullName ||
        "User";


    /*
    =====================================================
    NAVIGATION
    =====================================================
    */

    const navigationItems = [

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
            label: "Matches",
            path: "/users",
            icon: "♡"
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


    /*
    =====================================================
    CHECK ACTIVE ROUTE
    =====================================================
    */

    const isActive = (path) => {

        if (path === "/dashboard") {
            return location.pathname === "/dashboard";
        }

        return (
            location.pathname === path ||
            location.pathname.startsWith(
                `${path}/`
            )
        );

    };


    /*
    =====================================================
    NAVIGATION HANDLER
    =====================================================
    */

    const handleNavigation = (path) => {

        setShowProfileMenu(false);

        navigate(path);

    };


    /*
    =====================================================
    LOGOUT
    =====================================================
    */

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "loggedInUser"
        );


        setShowProfileMenu(false);


        navigate(
            "/login"
        );

    };


    /*
    =====================================================
    CLOSE DROPDOWN OUTSIDE CLICK
    =====================================================
    */

    useEffect(() => {

        function handleClickOutside(event) {

            if (

                profileMenuRef.current &&

                !profileMenuRef.current.contains(
                    event.target
                )

            ) {

                setShowProfileMenu(false);

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


    /*
    =====================================================
    NAVBAR
    =====================================================
    */

    return (

        <header className="navbar">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="navbar-left">

                <button
                    type="button"
                    className="navbar-brand-button"
                    onClick={() =>
                        handleNavigation("/dashboard")
                    }
                    aria-label="Go to Dashboard"
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
                                    isActive(item.path)
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
                    NOTIFICATIONS
                ================================================= */}

                <button
                    type="button"
                    className={
                        `navbar-notification ${
                            isActive("/notifications")
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
                        ♡
                    </span>


                    {notificationCount > 0 && (

                        <span className="notification-badge">

                            {notificationCount > 99
                                ? "99+"
                                : notificationCount
                            }

                        </span>

                    )}

                </button>


                {/* =================================================
                    PROFILE
                ================================================= */}

                <div
                    className="navbar-profile-container"
                    ref={profileMenuRef}
                >

                    <button
                        type="button"
                        className="navbar-profile-button"
                        onClick={() =>
                            setShowProfileMenu(
                                (prev) => !prev
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
                            aria-hidden="true"
                        >
                           ⌄
                        </span>

                    </button>


                    {/* =================================================
                        PROFILE DROPDOWN
                    ================================================= */}

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


                            {/* My Profile */}

                            <button
                                type="button"
                                className="dropdown-item"
                                onClick={() =>
                                    handleNavigation(
                                        "/view-profile"
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


                            {/* Wishlist */}

                            <button
                                type="button"
                                className={
                                    `dropdown-item ${
                                        isActive("/wishlist")
                                            ? "selected"
                                            : ""
                                    }`
                                }
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


                            {/* Ignored Profiles */}

                            <button
                                type="button"
                                className={
                                    `dropdown-item ${
                                        isActive(
                                            "/ignored-profiles"
                                        )
                                            ? "selected"
                                            : ""
                                    }`
                                }
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


                            {/* Settings */}

                            <button
                                type="button"
                                className="dropdown-item"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    alert(
                                        "Settings page coming soon."
                                    );

                                    setShowProfileMenu(
                                        false
                                    );

                                }}
                            >

                                <span className="dropdown-item-icon">
                                    ⚙
                                </span>

                                <span>
                                    Settings
                                </span>

                            </button>


                            {/* Help */}

                            <button
                                type="button"
                                className="dropdown-item"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    alert(
                                        "Help & Support coming soon."
                                    );

                                    setShowProfileMenu(
                                        false
                                    );

                                }}
                            >

                                <span className="dropdown-item-icon">
                                    ?
                                </span>

                                <span>
                                    Help &amp; Support
                                </span>

                            </button>


                            {/* About Us */}

                            <button
                                type="button"
                                className="dropdown-item"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    alert(
                                        "About Niyati page coming soon."
                                    );

                                    setShowProfileMenu(
                                        false
                                    );

                                }}
                            >

                                <span className="dropdown-item-icon">
                                    i
                                </span>

                                <span>
                                    About Niyati
                                </span>

                            </button>


                            <div className="dropdown-divider" />


                            {/* Logout */}

                            <button
                                type="button"
                                className="dropdown-logout"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    handleLogout();

                                }}
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

            </div>

        </header>

    );

}


export default Navbar;