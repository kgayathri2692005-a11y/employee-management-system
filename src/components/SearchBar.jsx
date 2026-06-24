import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>EMS</h2>

      <ul>

        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/users">Employees</Link>
        </li>

        <li>
          <Link to="/messages">Messages</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        <li>
          <Link to="/logout">Logout</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;