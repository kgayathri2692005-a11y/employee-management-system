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


                    <button className="admin-nav-item">
                        <span>▣</span>
                        Profile Management
                    </button>


                    <button className="admin-nav-item">
                        <span>✓</span>
                        Approved Profiles
                    </button>


                    <button className="admin-nav-item">
                        <span>♕</span>
                        Memberships
                    </button>


                    <button className="admin-nav-item">
                        <span>♡</span>
                        Matches & Interests
                    </button>


<button
    className={`admin-nav-item ${
        location.pathname === "/admin/reports-analytics" ? "active" : ""
    }`}
    onClick={() => navigate("/admin/reports-analytics")}
>
    <span>▥</span>
    Reports and Analytics
</button>


<button
    className={`admin-nav-item ${
        location.pathname === "/admin/payments" ? "active" : ""
    }`}
    onClick={() => navigate("/admin/payments")}
>
    <span>▣</span>
    Payments
</button>


<button
    className={`admin-nav-item ${
        location.pathname === "/admin/notifications"
            ? "active"
            : ""
    }`}
    onClick={() => navigate("/admin/notifications")}
>
    <span>♧</span>
    Notifications
</button>


<button
    className={`admin-nav-item ${
        location.pathname === "/admin/content" ? "active" : ""
    }`}
    onClick={() => navigate("/admin/content")}
>
    <span>▤</span>
    Content Management
</button>


<button
    className={`admin-nav-item ${
        location.pathname === "/admin/support" ? "active" : ""
    }`}
    onClick={() => navigate("/admin/support")}
>
    <span>?</span>
    Support Requests
</button>


<button
    className="admin-nav-item"
    onClick={() => navigate("/admin/settings")}
>
    <span>⚙</span>
    Settings
</button>

<button
    className={`admin-nav-item ${
        location.pathname === "/admin/management" ? "active" : ""
    }`}
    onClick={() => navigate("/admin/management")}
>
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