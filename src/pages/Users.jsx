import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Users.css";
import "../styles/Dashboard.css";

function Users() {
const navigate = useNavigate();
const [search, setSearch] = useState("");
const [employees, setEmployees] = useState([]);


  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};

  const currentUserGender =
    allProfiles[loggedInUser.email]?.gender;
  console.log("All Profiles:", allProfiles);
  const users = Object.entries(allProfiles)
    .filter(([email, profile]) => {

      if (email === loggedInUser.email) {
        return false;
      }

      if (currentUserGender === "Male") {
        return profile.gender === "Female";
      }

      if (currentUserGender === "Female") {
        return profile.gender === "Male";
      }

      return false;
    })
    .map(([email, profile], index) => {
  console.log("Profile:", profile);

  return {
    id: index + 1,
    name: `${profile.firstName} ${profile.lastName}`,
    designation: profile.occupation,
    email: email,
    image:
      profile.profileImage ||
      "https://randomuser.me/api/portraits/lego/1.jpg",

    gender: profile.gender,
    dob: profile.dob,
    education: profile.education,
    occupation: profile.occupation,
    salary: profile.salary,
    city: profile.city,
    stateName: profile.stateName,
    address: profile.address,
    fatherName: profile.fatherName,
    motherName: profile.motherName
  };
});
  setEmployees(users);

}, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="users-container">

          <div className="search-section">
            <input
              type="text"
              placeholder="Search Employee"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div className="employee-card" key={employee.id}>

                <img
                  src={employee.image}
                  alt={employee.name}
                />

                <div>
                  <h3>{employee.name}</h3>
                  <p>{employee.designation}</p>
                  <p>{employee.email}</p>
                </div>

                <div className="buttons">
                 <div className="buttons">

  <button
    onClick={() => {
      navigate("/view-profile", {
        state: employee
      });
    }}
  >
    View Profile
  </button>

  <button
    onClick={() => {
      navigate("/inbox", {
        state: { selectedUser: employee }
      });
    }}
  >
    Message
  </button>

</div>
                </div>

              </div>
            ))
          ) : (
            <h3 style={{ textAlign: "center", marginTop: "30px" }}>
              No Employees Found
            </h3>
          )}

        </div>
      </div>
    </div>
  );
}

export default Users;

