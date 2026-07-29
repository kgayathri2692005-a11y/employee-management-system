import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";


import "../styles/Notifications.css";
function Notifications() {

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const [notifications, setNotifications] = useState([]);
  const [showIgnoreModal, setShowIgnoreModal] = useState(false);

const [selectedRequest, setSelectedRequest] = useState(null);

const [ignoreReason, setIgnoreReason] = useState("");

const [otherReason, setOtherReason] = useState("");

const loadNotifications = async () => {
  try {
    const response = await axios.get(
      `https://localhost:7064/api/Interest/received/${loggedInUser.email}`
    );

    const pending = response.data.filter(
      (request) => request.status === "Pending"
    );

    setNotifications(pending);
  } catch (error) {
    console.log(error);
  } 
};

useEffect(() => {
  loadNotifications();
}, [loggedInUser.email]);

const acceptInterest = async (request) => {
  try {
    await axios.put(
      `https://localhost:7064/api/Interest/accept/${request.id}`
    );

    toast.success("Interest accepted ❤️");

    loadNotifications();

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};


 const rejectInterest = async () => {
  try {
    await axios.put(
      `https://localhost:7064/api/Interest/reject/${selectedRequest.id}`
    );

    toast.error("Interest rejected ❌");

    setShowIgnoreModal(false);
    setIgnoreReason("");
    setOtherReason("");

    loadNotifications();

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
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
  onClick={rejectInterest}
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