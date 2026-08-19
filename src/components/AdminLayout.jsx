import React from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminLayout({ children }) {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="admin-dashboard">

            {/* ================= SIDEBAR ================= */}

            <aside className="admin-sidebar">

                <div className="admin-logo">

                    <div className="admin-logo-icon">
                        ♡
                    </div>

                    <div>
                        <h2>Niyati</h2>
                        <span>Matrimony</span>
                    </div>

                </div>


                <nav className="admin-nav">

                    <button
                        className={`admin-nav-item ${location.pathname === "/admin" ? "active" : ""}`}
                        onClick={() => navigate("/admin")}
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>


                    <button
                        
                        className={`admin-nav-item ${location.pathname === "/admin/users" ? "active" : ""}`}
                        onClick={() => navigate("/admin/users")}
                    >
                        <span>♙</span>
                        User Management
                    </button>


                   <button
    className={`admin-nav-item ${
        location.pathname === "/admin/profiles"
            ? "active"
            : ""
    }`}
    onClick={() => navigate("/admin/profiles")}
>
    <span>▣</span>
    Profile Management
</button>

<button
    className={`admin-nav-item ${
        location.pathname === "/admin/approved-profiles"
            ? "active"
            : ""
    }`}
    onClick={() => navigate("/admin/approved-profiles")}
>
    <span>✓</span>
    Approved Profiles
</button>

                 <button
    className={`admin-nav-item ${
        location.pathname === "/admin/memberships" ? "active" : ""
    }`}
    onClick={() => navigate("/admin/memberships")}
>
    <span>♕</span>
    Memberships
</button>


<button
    className={`admin-nav-item ${
        location.pathname === "/admin/membership-plans" ? "active" : ""
    }`}
    onClick={() => navigate("/admin/membership-plans")}
>
    <span>▣</span>
    Membership Plans
</button>


                    <button
    className={`admin-nav-item ${
        location.pathname === "/admin/matches-interests"
            ? "active"
            : ""
    }`}
    onClick={() => navigate("/admin/matches-interests")}
>
    <span>♡</span>
    Matches & Interests
</button>


                    <button className="admin-nav-item">
                        <span>▥</span>
                        Reports & Analytics
                    </button>


                    <button className="admin-nav-item">
                        <span>▣</span>
                        Payments
                    </button>


                    <button className="admin-nav-item">
                        <span>♧</span>
                        Notifications
                    </button>


                    <button className="admin-nav-item">
                        <span>▤</span>
                        Content Management
                    </button>


                    <button className="admin-nav-item">
                        <span>?</span>
                        Support Requests
                    </button>


                    <button className="admin-nav-item">
                        <span>⚙</span>
                        Settings
                    </button>


                    <button className="admin-nav-item">
                        <span>♙</span>
                        Admin Management
                    </button>

                </nav>


                <button className="admin-logout">
                    <span>↪</span>
                    Logout
                </button>

            </aside>


            {/* ================= PAGE CONTENT ================= */}

            <main className="admin-main">

                {children}

            </main>

        </div>
    );
}

export default AdminLayout;