import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    FaSearch,
    FaPaperPlane,
    FaCheckCircle,
    FaPhone,
    FaVideo,
    FaEllipsisV
} from "react-icons/fa";

import "../styles/Dashboard.css";
import "../styles/Inbox.css";

function Inbox() {

    const navigate = useNavigate();
    const location = useLocation();

    const routeUser =
        location.state?.selectedUser;

    const [showMenu, setShowMenu] =
        useState(false);

    const [employees, setEmployees] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const [showToast, setShowToast] =
        useState(false);

    const [toastMessage, setToastMessage] =
        useState("");

    const [chatHistory, setChatHistory] =
        useState([]);

    const [lastMessages, setLastMessages] =
        useState({});

    const [unreadCounts, setUnreadCounts] =
        useState({});


    /* =====================================================
       LOGGED-IN USER
    ===================================================== */

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    const currentUserId =
        loggedInUser?.userId;


    /* =====================================================
       ALL PROFILES
    ===================================================== */

    const allProfiles =
        JSON.parse(
            localStorage.getItem("allProfiles")
        ) || {};


    const currentUserGender =
        allProfiles[
            loggedInUser?.email
        ]?.gender;


    /* =====================================================
       NORMALIZE EMAIL
    ===================================================== */

    const normalizeEmail = (email) => {

        return (
            email ||
            ""
        )
            .trim()
            .toLowerCase();

    };


    /* =====================================================
       GET PROFILE BY EMAIL
    ===================================================== */

    const getProfileByEmail = (email) => {

        const normalizedEmail =
            normalizeEmail(email);

        const profileKey =
            Object.keys(allProfiles).find(
                (key) =>
                    normalizeEmail(key) ===
                    normalizedEmail
            );

        return profileKey
            ? allProfiles[profileKey]
            : null;

    };


    /* =====================================================
       GET MATCHED EMAILS
    ===================================================== */

    const getMatchedEmails = () => {

        const storedMatches =
            JSON.parse(
                localStorage.getItem(
                    "matchedUsers"
                )
            ) || [];

        const currentEmail =
            normalizeEmail(
                loggedInUser?.email
            );

        const matchedEmails = [];


        storedMatches.forEach((match) => {

            if (
                typeof match ===
                "string"
            ) {

                const email =
                    normalizeEmail(match);

                if (
                    email &&
                    email !== currentEmail
                ) {

                    matchedEmails.push(
                        email
                    );

                }

                return;
            }


            const user1 =
                normalizeEmail(
                    match?.user1 ||
                    match?.email1 ||
                    match?.user1Email ||
                    match?.senderEmail
                );


            const user2 =
                normalizeEmail(
                    match?.user2 ||
                    match?.email2 ||
                    match?.user2Email ||
                    match?.receiverEmail
                );


            if (
                user1 === currentEmail &&
                user2
            ) {

                matchedEmails.push(
                    user2
                );

            }


            if (
                user2 === currentEmail &&
                user1
            ) {

                matchedEmails.push(
                    user1
                );

            }

        });


        return [
            ...new Set(
                matchedEmails
            )
        ];

    };


    /* =====================================================
       TOAST
    ===================================================== */

    const showMessageToast = (text) => {

        setToastMessage(text);
        setShowToast(true);

        setTimeout(() => {

            setShowToast(false);

        }, 2500);

    };


    /* =====================================================
       LOAD USERS
    ===================================================== */

    useEffect(() => {

        if (!loggedInUser?.email) {

            console.log(
                "No logged-in user found."
            );

            return;

        }


        const loadUsers = async () => {

            try {

                const matchedEmails =
                    getMatchedEmails();


                console.log(
                    "Matched Emails:",
                    matchedEmails
                );


                const response =
                    await axios.get(
                        "https://localhost:7064/api/User"
                    );


                const users =
                    response.data
                        .filter((user) => {

                            if (
                                user.userId ===
                                currentUserId
                            ) {

                                return false;

                            }


                            const userEmail =
                                normalizeEmail(
                                    user.email
                                );


                            if (
                                !matchedEmails.includes(
                                    userEmail
                                )
                            ) {

                                return false;

                            }


                            const profile =
                                getProfileByEmail(
                                    user.email
                                );


                            const gender =
                                profile?.gender;


                            if (
                                !gender ||
                                !currentUserGender
                            ) {

                                return false;

                            }


                            if (
                                currentUserGender ===
                                "Male"
                            ) {

                                return (
                                    gender ===
                                    "Female"
                                );

                            }


                            if (
                                currentUserGender ===
                                "Female"
                            ) {

                                return (
                                    gender ===
                                    "Male"
                                );

                            }


                            return false;

                        })
                        .map((user) => {

                            const profileData =
                                getProfileByEmail(
                                    user.email
                                );


                            const fullName =
                                `${profileData?.firstName || ""} ${
                                    profileData?.lastName || ""
                                }`.trim();


                            return {

                                id:
                                    user.userId,

                                name:
                                    user.userName ||
                                    fullName ||
                                    "User",

                                email:
                                    user.email,

                                role:
                                    "Matched Member",

                                status:
                                    "online",

                                image:
                                    profileData?.profilePhoto ||
                                    profileData?.profileImage ||
                                    profileData?.photo ||
                                    profileData?.image ||
                                    "/logo.jpeg"

                            };

                        });


                console.log(
                    "Inbox Users:",
                    users
                );


                setEmployees(users);


                users.forEach((user) => {

                    loadMessages(
                        user.id
                    );

                });


                if (
                    users.length > 0
                ) {

                    if (routeUser) {

                        const matchedUser =
                            users.find(
                                (u) =>
                                    normalizeEmail(
                                        u.email
                                    ) ===
                                    normalizeEmail(
                                        routeUser.email
                                    )
                            );


                        if (matchedUser) {

                            setSelectedUser(
                                matchedUser
                            );

                            loadMessages(
                                matchedUser.id
                            );

                        } else {

                            setSelectedUser(
                                users[0]
                            );

                            loadMessages(
                                users[0].id
                            );

                        }

                    } else {

                        setSelectedUser(
                            users[0]
                        );

                        loadMessages(
                            users[0].id
                        );

                    }

                } else {

                    setSelectedUser(
                        null
                    );

                }

            } catch (error) {

                console.log(
                    "Error loading Inbox users:",
                    error
                );

            }

        };


        loadUsers();

    }, []);


    /* =====================================================
       REFRESH CURRENT CHAT
    ===================================================== */

    useEffect(() => {

        const interval =
            setInterval(() => {

                if (
                    selectedUser
                ) {

                    loadMessages(
                        selectedUser.id
                    );

                }

            }, 2000);


        return () => {

            clearInterval(
                interval
            );

        };

    }, [selectedUser]);


    /* =====================================================
       LOAD MESSAGES
    ===================================================== */

    const loadMessages = (
        receiverId
    ) => {

        if (
            !currentUserId ||
            !receiverId
        ) {

            return;

        }


        axios
            .get(
                "https://localhost:7064/api/Message"
            )
            .then((response) => {

                const messages =
                    response.data.filter(
                        (msg) => (

                            (
                                msg.senderId ===
                                currentUserId &&

                                msg.receiverId ===
                                receiverId
                            )

                            ||

                            (
                                msg.senderId ===
                                receiverId &&

                                msg.receiverId ===
                                currentUserId
                            )

                        )
                    );


                setChatHistory(
                    messages
                );


                if (
                    messages.length > 0
                ) {

                    const latestMessage =
                        messages[
                            messages.length - 1
                        ];


                    setLastMessages(
                        (prev) => ({

                            ...prev,

                            [receiverId]:
                                latestMessage.messageText

                        })
                    );

                }


                const unreadMessages =
                    response.data.filter(
                        (msg) => (

                            msg.senderId ===
                            receiverId &&

                            msg.receiverId ===
                            currentUserId &&

                            msg.isRead ===
                            false

                        )
                    );


                setUnreadCounts(
                    (prev) => ({

                        ...prev,

                        [receiverId]:
                            unreadMessages.length

                    })
                );

            })
            .catch((error) => {

                console.log(
                    "Error loading messages:",
                    error
                );

            });

    };


    /* =====================================================
       SEND MESSAGE
    ===================================================== */

    const sendMessage = () => {

        if (
            !message.trim() ||
            !selectedUser
        ) {

            return;

        }


        axios
            .post(
                "https://localhost:7064/api/Message",
                {
                    senderId:
                        currentUserId,

                    receiverId:
                        selectedUser.id,

                    messageText:
                        message,

                    sentDate:
                        new Date()
                }
            )
            .then(() => {

                loadMessages(
                    selectedUser.id
                );

                setMessage("");

                showMessageToast(
                    "Message sent successfully"
                );

            })
            .catch((error) => {

                console.log(
                    "Error sending message:",
                    error
                );

            });

    };


    /* =====================================================
       PHONE CALL
    ===================================================== */

    const handleCall = () => {

        if (
            !selectedUser
        ) {

            return;

        }


        const phone =
            getProfileByEmail(
                selectedUser.email
            )?.phone ||
            getProfileByEmail(
                selectedUser.email
            )?.mobile;


        if (phone) {

            window.location.href =
                `tel:${phone}`;

            return;

        }


        showMessageToast(
            "Phone number is not available"
        );

    };


    /* =====================================================
       VIDEO CALL
    ===================================================== */

    const handleVideoCall = () => {

        if (
            !selectedUser
        ) {

            return;

        }


        showMessageToast(
            "Video call feature will be available soon"
        );

    };


    /* =====================================================
       MARK AS READ
    ===================================================== */

    const selectUser = (user) => {

        setSelectedUser(
            user
        );

        setShowMenu(
            false
        );


        axios
            .put(
                `https://localhost:7064/api/Message/mark-read/${user.id}/${currentUserId}`
            )
            .then(() => {

                setUnreadCounts(
                    (prev) => ({

                        ...prev,

                        [user.id]:
                            0

                    })
                );


                loadMessages(
                    user.id
                );

            })
            .catch((error) => {

                console.log(
                    error
                );

                loadMessages(
                    user.id
                );

            });

    };


    /* =====================================================
       SEARCH
    ===================================================== */

    const filteredUsers =
        employees.filter((emp) =>
            (emp.name || "")
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );


    /* =====================================================
       VIEW PROFILE
    ===================================================== */

    const viewProfile = () => {

        if (
            !selectedUser
        ) {

            return;

        }


        const selectedProfile =
            getProfileByEmail(
                selectedUser.email
            );


        if (
            !selectedProfile
        ) {

            showMessageToast(
                "Profile not found"
            );

            return;

        }


        navigate(
            "/view-profile",
            {
                state: {

                    profile: {
                        ...selectedProfile,

                        email:
                            selectedUser.email
                    },

                    from:
                        "/inbox"

                }
            }
        );


        setShowMenu(
            false
        );

    };


    return (

        <div className="inbox-page">

            <Navbar />


            {showToast && (

                <div className="inbox-toast">

                    <FaCheckCircle />

                    <span>
                        {toastMessage}
                    </span>

                </div>

            )}


            <div className="inbox-wrapper">


                {/* =================================================
                    LEFT USER PANEL
                ================================================= */}

                <aside className="inbox-sidebar">

                    <div className="inbox-sidebar-header">

                        <h2>
                            Messages
                        </h2>

                        <p>
                            Your conversations
                        </p>

                    </div>


                    <div className="inbox-search">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="inbox-user-list">

                        {filteredUsers.length ===
                        0 ? (

                            <div className="no-users">

                                <div className="no-users-icon">
                                    ♡
                                </div>

                                <h4>
                                    No conversations
                                </h4>

                                <p>
                                    Your matched profiles
                                    will appear here.
                                </p>

                            </div>

                        ) : (

                            filteredUsers.map(
                                (user) => (

                                    <div
                                        key={user.id}
                                        className={`inbox-user ${
                                            selectedUser?.id ===
                                            user.id
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            selectUser(
                                                user
                                            )
                                        }
                                    >

                                        <div className="user-photo-wrapper">

                                            <img
                                                src={
                                                    user.image
                                                }
                                                alt={
                                                    user.name
                                                }
                                            />

                                            <span
                                                className={`user-status ${user.status}`}
                                            ></span>

                                        </div>


                                        <div className="inbox-user-details">

                                            <h4>
                                                {user.name}
                                            </h4>

                                            <p>

                                                {lastMessages[
                                                    user.id
                                                ] ||
                                                    "Start a conversation"}

                                            </p>

                                        </div>


                                        {unreadCounts[
                                            user.id
                                        ] > 0 && (

                                            <span className="unread-badge">

                                                {
                                                    unreadCounts[
                                                        user.id
                                                    ]
                                                }

                                            </span>

                                        )}

                                    </div>

                                )
                            )

                        )}

                    </div>

                </aside>


                {/* =================================================
                    CHAT AREA
                ================================================= */}

                <main className="inbox-chat">


                    {selectedUser ? (

                        <>


                            {/* CHAT HEADER */}

                            <div className="inbox-chat-header">


                                <div className="chat-user-info">

                                    <div className="chat-profile-photo">

                                        <img
                                            src={
                                                selectedUser.image
                                            }
                                            alt={
                                                selectedUser.name
                                            }
                                        />

                                        <span className="chat-online-dot"></span>

                                    </div>


                                    <div>

                                        <h2>
                                            {
                                                selectedUser.name
                                            }
                                        </h2>

                                        <p>
                                            <span>
                                                ●
                                            </span>

                                            Online
                                        </p>

                                    </div>

                                </div>


                                <div className="chat-actions">


                                    {/* CALL */}

                                    <button
                                        type="button"
                                        className="chat-action-btn"
                                        title="Audio Call"
                                        onClick={
                                            handleCall
                                        }
                                    >

                                        <FaPhone />

                                    </button>


                                    {/* VIDEO CALL */}

                                    <button
                                        type="button"
                                        className="chat-action-btn"
                                        title="Video Call"
                                        onClick={
                                            handleVideoCall
                                        }
                                    >

                                        <FaVideo />

                                    </button>


                                    {/* MENU */}

                                    <div className="chat-menu-container">

                                        <button
                                            type="button"
                                            className="chat-action-btn"
                                            title="More"
                                            onClick={() =>
                                                setShowMenu(
                                                    !showMenu
                                                )
                                            }
                                        >

                                            <FaEllipsisV />

                                        </button>


                                        {showMenu && (

                                            <div className="chat-menu">

                                                <button
                                                    type="button"
                                                    onClick={
                                                        viewProfile
                                                    }
                                                >
                                                    👤 View Profile
                                                </button>


                                                <button
                                                    type="button"
                                                    onClick={() => {

                                                        showMessageToast(
                                                            "Mute chat feature coming soon"
                                                        );

                                                        setShowMenu(
                                                            false
                                                        );

                                                    }}
                                                >
                                                    🔕 Mute Chat
                                                </button>


                                                <button
                                                    type="button"
                                                    onClick={() => {

                                                        if (
                                                            window.confirm(
                                                                `Clear conversation with ${selectedUser.name}?`
                                                            )
                                                        ) {

                                                            setChatHistory(
                                                                []
                                                            );

                                                        }

                                                        setShowMenu(
                                                            false
                                                        );

                                                    }}
                                                >
                                                    🗑 Clear Conversation
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>


                            {/* MESSAGES */}

                            <div className="inbox-messages">

                                {chatHistory.length ===
                                0 ? (

                                    <div className="empty-chat">

                                        <div className="empty-chat-icon">
                                            ♡
                                        </div>

                                        <h3>
                                            Start a conversation
                                        </h3>

                                        <p>
                                            Send a message to{" "}
                                            {
                                                selectedUser.name
                                            }
                                            .
                                        </p>

                                    </div>

                                ) : (

                                    chatHistory.map(
                                        (msg, index) => (

                                            <div
                                                key={
                                                    index
                                                }
                                                className={`chat-message ${
                                                    msg.senderId ===
                                                    currentUserId
                                                        ? "sent"
                                                        : "received"
                                                }`}
                                            >

                                                <div className="message-bubble">

                                                    <p>
                                                        {
                                                            msg.messageText
                                                        }
                                                    </p>

                                                    <span>

                                                        {new Date(
                                                            msg.sentDate
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour:
                                                                    "2-digit",
                                                                minute:
                                                                    "2-digit"
                                                            }
                                                        )}

                                                    </span>

                                                </div>

                                            </div>

                                        )
                                    )

                                )}

                            </div>


                            {/* MESSAGE INPUT */}

                            <div className="inbox-message-input">

                                <input
                                    type="text"
                                    placeholder={`Message ${selectedUser.name}...`}
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={(e) => {

                                        if (
                                            e.key ===
                                            "Enter"
                                        ) {

                                            sendMessage();

                                        }

                                    }}
                                />


                                <button
                                    type="button"
                                    onClick={
                                        sendMessage
                                    }
                                    title="Send Message"
                                >

                                    <FaPaperPlane />

                                </button>

                            </div>

                        </>

                    ) : (

                        <div className="no-selected-user">

                            <div className="no-selected-icon">
                                ♡
                            </div>

                            <h2>
                                Welcome to Messages
                            </h2>

                            <p>
                                Select a matched profile
                                to start chatting.
                            </p>

                        </div>

                    )}

                </main>

            </div>


            <PageNavigation
                previous="/users"
                next="/myprofile"
            />

        </div>

    );

}

export default Inbox;