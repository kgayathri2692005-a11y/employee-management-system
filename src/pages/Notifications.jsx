import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";


import "../styles/Notifications.css";
function Notifications() {

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const [notifications, setNotifications] = useState([]);
  const [showIgnoreModal, setShowIgnoreModal] = useState(false);

const [selectedRequest, setSelectedRequest] = useState(null);

const [ignoreReason, setIgnoreReason] = useState("");

const [otherReason, setOtherReason] = useState("");


  useEffect(() => {

    const interestRequests =
      JSON.parse(localStorage.getItem("interestRequests")) || [];


    const pendingRequests = interestRequests.filter(
      (request) =>
        request.to === loggedInUser.email &&
        request.status === "Pending"
    );


    setNotifications(pendingRequests);
    localStorage.setItem("notificationsRead", "true");


  }, [loggedInUser.email]);



 

  const acceptInterest = (selectedRequest) => {

    console.log("Selected Request:", selectedRequest);

  // Get all interest requests
  const interestRequests =
    JSON.parse(localStorage.getItem("interestRequests")) || [];

  // Update the selected request
  const updatedRequests = interestRequests.map((request) => {

    if (
      request.from === selectedRequest.from &&
      request.to === selectedRequest.to &&
      request.status === "Pending"
    ) {
      return {
        ...request,
        status: "Accepted",
      };
    }

    return request;
  });

  // Save back to localStorage
  localStorage.setItem(
    "interestRequests",
    JSON.stringify(updatedRequests)
  );

  // Get existing matches
const matchedUsers =
  JSON.parse(localStorage.getItem("matchedUsers")) || [];

// Check if match already exists
const alreadyMatched = matchedUsers.some(
  (match) =>
    (match.user1 === selectedRequest.from &&
      match.user2 === selectedRequest.to) ||
    (match.user1 === selectedRequest.to &&
      match.user2 === selectedRequest.from)
);

// If not matched, create a new match
if (!alreadyMatched) {
  matchedUsers.push({
    user1: selectedRequest.from,
    user2: selectedRequest.to,
  });

  localStorage.setItem(
    "matchedUsers",
    JSON.stringify(matchedUsers)
  );
}

  toast.success(
    `${selectedRequest.fromName}'s request accepted ❤️`
  );

};


 const rejectInterest = () => {

    toast.error("Interest rejected ❌");

};


  return (

    <div className="dashboard">

      <Sidebar />


      <div className="main-content">

        <Navbar />


        <div className="notification-container">


          <h2>
            🔔 New Matches & Interests
          </h2>



          {
            notifications.length === 0 ? (

              <div className="empty-notification">

                No new interest requests 💔

              </div>


            ) : (


              notifications.map((request,index)=>(


                <div 
                  className="notification-card"
                  key={index}
                >


                  <div className="profile-circle">

                    👤

                  </div>


                  <div className="notification-details">


                    <h3>
                      {request.fromName}
                    </h3>


                    <p>
                      ❤️ Sent you an interest
                    </p>


                    <span>
                      📅 {request.sentOn}
                    </span>


                    <div className="notification-buttons">


                      <button
                        className="accept-btn"
                        onClick={() => acceptInterest(request)}
                      >

                        ❤️ Accept

                      </button>



                      <button
  className="reject-btn"
  onClick={() => {
    setSelectedRequest(request);
    setShowIgnoreModal(true);
  }}
>
  ❌ Ignore
</button>


                    </div>


                  </div>


                </div>


              ))

            )
          }



        </div>


      </div>
{showIgnoreModal && (
  <div className="ignore-modal-overlay">

    <div className="ignore-modal">

      <h2>Ignore Interest</h2>

      <p>Please tell us why you are ignoring this request.</p>

      <label>
        <input
          type="radio"
          name="reason"
          value="Not Interested"
          onChange={(e) => setIgnoreReason(e.target.value)}
        />
        Not Interested
      </label>

      <label>
        <input
          type="radio"
          name="reason"
          value="Age doesn't match"
          onChange={(e) => setIgnoreReason(e.target.value)}
        />
        Age doesn't match
      </label>

      <label>
        <input
          type="radio"
          name="reason"
          value="Education doesn't match"
          onChange={(e) => setIgnoreReason(e.target.value)}
        />
        Education doesn't match
      </label>

      <label>
        <input
          type="radio"
          name="reason"
          value="Occupation doesn't match"
          onChange={(e) => setIgnoreReason(e.target.value)}
        />
        Occupation doesn't match
      </label>

      <label>
        <input
          type="radio"
          name="reason"
          value="Religion/Caste doesn't match"
          onChange={(e) => setIgnoreReason(e.target.value)}
        />
        Religion/Caste doesn't match
      </label>

      <label>
        <input
          type="radio"
          name="reason"
          value="Other"
          onChange={(e) => setIgnoreReason(e.target.value)}
        />
        Other
      </label>

      {ignoreReason === "Other" && (
        <textarea
          placeholder="Enter your reason..."
          value={otherReason}
          onChange={(e) => setOtherReason(e.target.value)}
        />
      )}

      <div className="ignore-buttons">

        <button
          className="cancel-btn"
          onClick={() => {
            setShowIgnoreModal(false);
            setIgnoreReason("");
            setOtherReason("");
          }}
        >
          Cancel
        </button>

        <button
          className="submit-btn"
        >
          Submit
        </button>

      </div>

    </div>

  </div>
)}

    </div>

  );

}


export default Notifications;