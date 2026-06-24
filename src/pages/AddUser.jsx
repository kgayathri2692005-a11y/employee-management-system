import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/AddUser.css";

function AddUser() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
const [designation, setDesignation] = useState("");
const [joiningDate, setJoiningDate] = useState("");
const [location, setLocation] = useState("");
const [salary, setSalary] = useState("");
const [employmentType, setEmploymentType] = useState("");
const [status, setStatus] = useState("");
const handleCancel = () => {
  setEmployeeId("");
  setName("");
  setEmail("");
  setPhone("");

  setDepartment("");
  setDesignation("");
  setJoiningDate("");
  setLocation("");

  setSalary("");
  setEmploymentType("");
  setStatus("");
};

  
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="add-user-container">
          {successMessage && (
  <div className="success-toast">
    ✅ Employee Added Successfully
  </div>
)}
          <h2>Add New Employee</h2>

          <form className="add-user-form">

            {/* Employee Information */}

            <div className="form-section">
              <h3>Employee Information</h3>

              <div className="form-grid">

                <input
                  type="text"
                  placeholder="Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

              </div>
            </div>

            {/* Organization Details */}

            <div className="form-section">
              <h3>Organization Details</h3>

              <div className="form-grid">

              <select
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
>
  <option value="">Select Department</option>
  <option value="Information Technology">Information Technology</option>
  <option value="Human Resources">Human Resources</option>
  <option value="Finance">Finance</option>
  <option value="Marketing">Marketing</option>
  <option value="Operations">Operations</option>
</select>

               <input
  list="designations"
  placeholder="Designation"
  value={designation}
  onChange={(e) => setDesignation(e.target.value)}
/>

                <datalist id="designations">
                  <option value="Software Engineer" />
                  <option value="Frontend Developer" />
                  <option value="Backend Developer" />
                  <option value="UI/UX Designer" />
                  <option value="QA Engineer" />
                  <option value="Team Lead" />
                  <option value="Project Manager" />
                </datalist>

                <input
  type="date"
  value={joiningDate}
  onChange={(e) => setJoiningDate(e.target.value)}
/>

               <input
  list="locations"
  placeholder="Work Location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>

                <datalist id="locations">
                  <option value="Bangalore" />
                  <option value="Hyderabad" />
                  <option value="Chennai" />
                  <option value="Mumbai" />
                  <option value="Pune" />
                  <option value="Remote" />
                </datalist>

              </div>
            </div>

            {/* Employment Details */}

            <div className="form-section">
              <h3>Employment Details</h3>

              <div className="form-grid">

              <input
  type="number"
  placeholder="Salary"
  value={salary}
  onChange={(e) => setSalary(e.target.value)}
/>

         <select
  value={employmentType}
  onChange={(e) => setEmploymentType(e.target.value)}
>
  <option value="">Employment Type</option>
  <option value="Permanent">Permanent</option>
  <option value="Contract">Contract</option>
  <option value="Intern">Intern</option>
</select>

                <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="">Status</option>
  <option value="Active">Active</option>
  <option value="On Leave">On Leave</option>
  <option value="Inactive">Inactive</option>
</select>

              </div>
            </div>

            {/* Buttons */}

            <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

  <button
  type="button"
  className="save-btn"
  onClick={() => {
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  }}
>
  Save Employee
</button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
