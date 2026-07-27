import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
       <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
             📊 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/users"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            👥 Profiles
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/inbox"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
           💬 Inbox
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/myprofile"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
           👤 My Profile
          </NavLink>
        </li>

                <li>
          <NavLink
            to="/tracking"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
           📈 Tracking
          </NavLink>
        </li>
        <li>
        <NavLink 
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            ⭐ Wishlist
          </NavLink>
        </li>
        
<li>
  <NavLink
    to="/ignored-profiles"
    className={({ isActive }) =>
      isActive ? "nav-item active" : "nav-item"
    }
  >
    🚫 Ignored Profiles
  </NavLink>
</li>
      </ul>
    </div>
  );
}

export default Sidebar;
