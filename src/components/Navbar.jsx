import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "../styles/Navbar.css";
import { useRef } from "react";


function Navbar() {

    const navigate = useNavigate();

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



            console.log(
                "Navbar Current Email:",
                currentUser.email
            );


            console.log(
                "Navbar Found Profile:",
                currentProfile
            );



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


        <div className="navbar">



            {/* LEFT SIDE */}


            <div className="navbar-left">


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


            </div>







            {/* RIGHT SIDE */}



            <div className="navbar-right">





                {/* Notification */}



                <div

                    className="navbar-notification"

                    onClick={() => navigate("/notifications")}

                >


                    <span className="notification-icon">

                        🔔

                    </span>



                    {
                        notificationCount > 0 && (

                            <span className="notification-badge">

                                {notificationCount}

                            </span>

                        )
                    }


                </div>








                {/* PROFILE */}



                <div


                    className="navbar-profile-container"


                    ref={profileMenuRef}


                    onClick={() =>
                        setShowProfileMenu(
                            prev => !prev
                        )
                    }


                >




                    <img


                        src={

                            profileData?.profilePhoto ||

                            profileData?.profileImage ||

                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"

                        }


                        alt="Profile"


                        className="navbar-profile-img"


                    />





                    <span className="navbar-profile-name">


                        {

                            fullName ||

                            profileData?.userName ||

                            loggedInUser?.userName ||

                            loggedInUser?.name ||

                            loggedInUser?.fullName ||

                            "User"

                        }


                    </span>





                    <span className="profile-dropdown-icon">

                        ▼

                    </span>









                    {
                        showProfileMenu && (


                            <div


                                className="profile-dropdown"


                                onClick={(e)=>e.stopPropagation()}


                            >





                                <button


                                    onClick={(e)=>{


                                        e.stopPropagation();


                                        navigate("/view-profile");


                                        setShowProfileMenu(false);


                                    }}


                                >

                                    👤 My Profile


                                </button>







                                <button


                                    onClick={(e)=>{


                                        e.stopPropagation();


                                        alert(
                                            "Settings page coming soon."
                                        );


                                        setShowProfileMenu(false);


                                    }}


                                >

                                    ⚙ Settings


                                </button>







                                <button


                                    onClick={(e)=>{


                                        e.stopPropagation();


                                        alert(
                                            "Help & Support coming soon."
                                        );


                                        setShowProfileMenu(false);


                                    }}


                                >

                                    ❓ Help


                                </button>






                                <div className="dropdown-divider"></div>







                                <button


                                    className="logout-item"


                                    onClick={(e)=>{


                                        e.stopPropagation();


                                        handleLogout();


                                    }}


                                >

                                    🚪 Logout


                                </button>





                            </div>


                        )
                    }





                </div>





            </div>




        </div>


    );


}



export default Navbar;