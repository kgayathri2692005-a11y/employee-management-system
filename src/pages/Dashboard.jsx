import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import PageNavigation from "../components/PageNavigation";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <DashboardCards />

        <div className="summary">
  <h2>Employee Summary</h2>

  <div className="summary-content">
    <div className="summary-box">
      <h3>New Employees</h3>
      <p>15 Joined This Month</p>
    </div>

    <div className="summary-box">
      <h3>Departments</h3>
      <p>12 Active Departments</p>
    </div>

    <div className="summary-box">
      <h3>Pending Requests</h3>
      <p>8 Requests Waiting</p>
    </div>

    <div className="summary-box">
      <h3>Attendance</h3>
      <p>92% Present Today</p>
    </div>
  </div>
</div>
<PageNavigation
  next="/Users"
/>
      </div>
      
    </div>
    
  );
}

export default Dashboard;
