import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";
import "../styles/Tracking.css";

function Tracking() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="tracking-container">

          <h2>Employee Tracking</h2>

          <div className="tracking-filters">

            <input
              type="text"
              placeholder="Search Employee"
            />

            <input
              type="date"
            />

          </div>

          <table className="tracking-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Login Time</th>
                <th>Logout Time</th>
                <th>Working Hours</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>John Doe</td>
                <td className="online">Online</td>
                <td>09:00 AM</td>
                <td>---</td>
                <td>5h 20m</td>
              </tr>

              <tr>
                <td>Priya</td>
                <td className="offline">Offline</td>
                <td>09:15 AM</td>
                <td>06:00 PM</td>
                <td>8h 45m</td>
              </tr>

              <tr>
                <td>David</td>
                <td className="offline">Offline</td>
                <td>10:00 AM</td>
                <td>07:00 PM</td>
                <td>9h 00m</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
<PageNavigation
    previous="/myprofile"
    next="/wishlist"
/>
    </div>
  );
}

export default Tracking;