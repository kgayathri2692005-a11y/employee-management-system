import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/EditUser.css";

function EditUser() {

  const employees = [
    {
      id: "EMP101",
      name: "John Doe",
      designation: "Software Engineer",
      department: "Information Technology",
      email: "john@gmail.com",
      phone: "9876543210",
      salary: "50000",
      location: "Bangalore",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: "EMP102",
      name: "Rahul Sharma",
      designation: "Frontend Developer",
      department: "Information Technology",
      email: "rahul@gmail.com",
      phone: "9876543211",
      salary: "45000",
      location: "Hyderabad",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: "EMP103",
      name: "Priya Singh",
      designation: "UI/UX Designer",
      department: "Design",
      email: "priya@gmail.com",
      phone: "9876543212",
      salary: "48000",
      location: "Chennai",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  
  const handleSearch = () => {
    const employee = employees.find(
      (emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.id.toLowerCase().includes(search.toLowerCase())
    );

    if (employee) {
      setSelectedEmployee(employee);
          } else {
      alert("Employee not found");
    }
  };

const handleCancel = () => {
  setSearch("");
  setSelectedEmployee(employees[0]);
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="edit-user-container">

          <h2>Edit Employee</h2>

          {/* Search Section */}

          <div className="search-box">
            <input
              type="text"
              placeholder="Search Employee by Name or Employee ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Employee Preview */}

          <div className="employee-card-preview">

            <img
              src={selectedEmployee.image}
              alt={selectedEmployee.name}
            />

            <div className="employee-details">

              <h3>{selectedEmployee.name}</h3>

              <p>
                <strong>ID:</strong> {selectedEmployee.id}
              </p>

              <p>
                <strong>Designation:</strong>{" "}
                {selectedEmployee.designation}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {selectedEmployee.department}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedEmployee.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedEmployee.phone}
              </p>

            </div>

          </div>

          {/* Edit Form */}

          <form
  className="edit-user-form"
  onSubmit={(e) => e.preventDefault()}
>

            <div className="form-section">
              <h3>Employee Information</h3>

              <div className="form-grid">

                <input
                  type="text"
                  value={selectedEmployee.id}
                  readOnly
                />

                <input
                  type="text"
                  value={selectedEmployee.name}
                  readOnly
                />

                <input
                  type="email"
                  value={selectedEmployee.email}
                  readOnly
                />

                <input
                  type="text"
                  value={selectedEmployee.phone}
                  readOnly
                />

              </div>
            </div>

            <div className="form-section">
              <h3>Organization Details</h3>

              <div className="form-grid">

                <input
                  type="text"
                  value={selectedEmployee.department}
                  readOnly
                />

                <input
                  type="text"
                  value={selectedEmployee.designation}
                  readOnly
                />

                <input
                  type="date"
                />

                <input
                  type="text"
                  value={selectedEmployee.location}
                  readOnly
                />

              </div>
            </div>

            <div className="form-section">
              <h3>Employment Details</h3>

              <div className="form-grid">

                <input
                  type="number"
                  value={selectedEmployee.salary}
                  readOnly
                />

                <select>
                  <option>Permanent</option>
                  <option>Contract</option>
                  <option>Intern</option>
                </select>

                <select>
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>

              </div>
            </div>

            <div className="form-buttons">

              <div className="form-buttons">

  <div className="form-buttons">

  <button
    type="button"
    className="cancel-btn"
    onClick={() => {
      setSearch("");
      setSelectedEmployee(employees[0]);
    }}
  >
    Cancel
  </button>

  <button
    type="button"
    className="update-btn"
    onClick={() => alert("Employee Updated Successfully")}
  >
    Update Employee
  </button>

</div>

</div>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default EditUser;
