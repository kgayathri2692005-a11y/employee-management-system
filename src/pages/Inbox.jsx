import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";
import {
  useLocation,
  useNavigate
} from "react-router-dom";


import {
  FaSearch,
  FaPaperPlane,
  FaCheckCircle
} from "react-icons/fa";

import "../styles/Dashboard.css";
import "../styles/Inbox.css";

function Inbox() {

  const navigate = useNavigate();

  const location = useLocation();

  const routeUser =
    location.state?.selectedUser;

  const [showMenu, setShowMenu] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] =
  useState(null);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [chatHistory, setChatHistory] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});

  const loggedInUser = JSON.parse(
  localStorage.getItem("loggedInUser")
);

const currentUserId = loggedInUser?.userId;
const [matchedEmails, setMatchedEmails] = useState([]);
const allProfiles =
  JSON.parse(localStorage.getItem("allProfiles")) || {};

 

const currentUserGender =
  allProfiles[loggedInUser?.email]?.gender;

console.log("Current Gender:", currentUserGender);

useEffect(() => {
  const allProfiles =
  JSON.parse(localStorage.getItem("allProfiles")) || {};
axios
  .get(
    `https://localhost:7064/api/Message/matched-users/${loggedInUser.email}`
  )
  .then((res) => {
    setMatchedEmails(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
  axios
    .get("https://localhost:7064/api/User")
    .then((response) => {
  console.table(response.data);
  console.log(currentUserId)

 const users = response.data
  .filter(user => {

  if (user.userId === currentUserId) return false;
const isMatched = matchedEmails.includes(user.email);

if (!isMatched) return false;

  const profile = allProfiles[user.email];
  console.log("API Email:", user.email);
console.log("All Profile Keys:", Object.keys(allProfiles));
console.log("Profile Found:", allProfiles[user.email]);
  const gender = profile?.gender;

  if (!gender || !currentUserGender) return false;

  if (currentUserGender === "Male") {
    return gender === "Female";
  }

  if (currentUserGender === "Female") {
    return gender === "Male";
  }

  return false;
})
  .map((user) => {
    const profileData =
  allProfiles[user.email];

    

    return {
      id: user.userId,
      name:
  user.userName ||
  `${profileData?.firstName || ""} ${profileData?.lastName || ""}`.trim() ||
  "User",
      email: user.email,
      role: "Employee",
      status: "online",
      image:
  profileData?.profilePhoto ||
  profileData?.profileImage ||
  "https://randomuser.me/api/portraits/lego/1.jpg"
    };
  });

  console.log("Current User ID:", currentUserId);
  console.log("Filtered Users:", users);

  setEmployees(users);
      console.log(users);
      console.log("Users Array:", users);

users.forEach((user) => {
  console.log("FOR EACH USER:", user.id, user.name);
  loadMessages(user.id);
});

if (users.length > 0) {

  if (routeUser) {
    const matchedUser = users.find(
      (u) => u.email === routeUser.email
    );

    if (matchedUser) {
      setSelectedUser(matchedUser);
      loadMessages(matchedUser.id);
    }
  } else {
    setSelectedUser(users[0]);
    loadMessages(users[0].id);
  }
}
    })
    .catch((error) => {
      console.log(error);
    });

}, []);
useEffect(() => {
  const interval = setInterval(() => {
    if (selectedUser) {
      loadMessages(selectedUser.id);
    }
  }, 2000);

  return () => clearInterval(interval);
}, [selectedUser]);

const loadMessages = (receiverId) => {

  axios
    .get("https://localhost:7064/api/Message")
    .then((response) => {
      console.log("USER API DATA");
console.log(response.data);

      const messages = response.data.filter(
        (msg) =>
          (msg.senderId === currentUserId &&
 msg.receiverId === receiverId)
||
(msg.senderId === receiverId &&
 msg.receiverId === currentUserId)
      );

      setChatHistory(messages);
      if (messages.length > 0) {
  const latestMessage =
    messages[messages.length - 1];

  setLastMessages((prev) => ({
    ...prev,
    [receiverId]: latestMessage.messageText
  }));
}
console.log(response.data[0]);

console.log("Checking User:", receiverId);
console.table(response.data);

const unreadMessages = response.data.filter(
  (msg) =>
    msg.senderId === receiverId &&
    msg.receiverId === currentUserId &&
    msg.isRead === false
);
console.log(
  "User:",
  receiverId,
  "Unread:",
  unreadMessages.length
);


setUnreadCounts((prev) => ({
  ...prev,
  [receiverId]: unreadMessages.length
}));

    })
    .catch((error) => {
      console.log(error);
    });

};

const sendMessage = () => {

  if (!message.trim()) return;

  axios.post(
    "https://localhost:7064/api/Message",
    {
      senderId: currentUserId, // Admin Id
      receiverId: selectedUser.id,
      messageText: message,
      sentDate: new Date()
    }
  )
  .then(() => {

    loadMessages(selectedUser.id);

    setMessage("");

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);

  })
  .catch((error) => {
    console.log(error);
  });

};

  const filteredUsers = employees.filter((emp) =>
  (emp.name || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        {showToast && (
          <div className="toast">
            <FaCheckCircle />
            Message Sent Successfully
          </div>
        )}

        <div className="chat-container">

          {/* LEFT PANEL */}

          <div className="users-list">

            <h3>Messages</h3>

            <div className="search-box">

              <FaSearch className="search-icon" />

              <input
                type="text"
                placeholder=       "Search by name..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            {filteredUsers.map((user) => (
              <div
  key={user.id}
  className={`user ${
    selectedUser?.id === user.id
      ? "active-user"
      : ""
  }`}
  onClick={() => {

  setSelectedUser(user);

 axios.put(
  `https://localhost:7064/api/Message/mark-read/${user.id}/${currentUserId}`
)
.then(() => {

  setUnreadCounts((prev) => ({
    ...prev,
    [user.id]: 0
  }));

  loadMessages(user.id);

})
  .catch((error) => {
    console.log(error);
  });

}}
>
                <img
                  src={user.image}
                  alt={user.name}
                />

                <div className="user-info">

  <h4>
  {user.name}

  {unreadCounts[user.id] > 0 && (
    <span className="unread-badge">
      {unreadCounts[user.id]}
    </span>
  )}
</h4>

  <p>
    {lastMessages[user.id]
      ? lastMessages[user.id]
      : user.role}
  </p>

</div>

                <span
                  className={`status ${user.status}`}
                ></span>

              </div>
            ))}

          </div>

          {/* RIGHT PANEL */}

          {selectedUser && (
<div className="chat-box">

            <div className="chat-header">

  <div className="header-left">

    <img
      src={selectedUser.image}
      alt={selectedUser.name}
    />

    <div>
      <h3>{selectedUser.name}</h3>
      <p>{selectedUser.role}</p>
    </div>

  </div>

  <div className="header-menu">

    <button
      className="menu-btn"
      onClick={() => setShowMenu(!showMenu)}
    >
      ⋮
    </button>

    {showMenu && (
      <div className="menu-dropdown">

       ```javascript
<button
  onClick={() => {

    const selectedProfile =
      allProfiles[selectedUser.email];

    console.log(
      "Selected Inbox User Email:",
      selectedUser.email
    );

    console.log(
      "Selected Inbox Profile:",
      selectedProfile
    );

    if (!selectedProfile) {

      console.log(
        "❌ Profile not found:",
        selectedUser.email
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

    setShowMenu(false);

  }}
>
  👤 View Profile
</button>
```

        <button
          onClick={() => {
            alert("Mute Chat feature coming soon");
            setShowMenu(false);
          }}
        >
          🔕 Mute Chat
        </button>

        <button
          onClick={() => {
            if (
              window.confirm(
                `Clear conversation with ${selectedUser.name}?`
              )
            ) {

              setChatHistory([]);
            }

            setShowMenu(false);
          }}
        >
          🗑 Clear Conversation
        </button>

      </div>
    )}

  </div>

</div>

            <div className="messages-area">

              {chatHistory.map(
                (msg, index) => (
                  <div
                    key={index}
                    className={`message ${
  msg.senderId === currentUserId
    ? "sent"
    : "received"
}`}
                  >
                 <p>{msg.messageText}</p>

<span>
  {new Date(msg.sentDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })}
</span>

                  </div>
                )
              )}

            </div>

            <div className="message-input">

              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter"
                    ? sendMessage()
                    : null
                }
              />

              <button onClick={sendMessage}>
                <FaPaperPlane />
              </button>

            </div>

          </div>
          )}

        </div>

      
        <PageNavigation
          previous="/users"
          next="/myprofile"
        />

      </div>

    </div>
  );
}

export default Inbox;