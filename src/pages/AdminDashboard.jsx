import React from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
    
    return (
         <AdminLayout>


            {/* ================= MAIN CONTENT ================= */}

            <main className="admin-main">

                {/* TOP HEADER */}

                <header className="admin-header">

                    <div className="admin-header-title">

                        <h1>
                            Welcome back, Admin! 👋
                        </h1>

                        <p>
                            Here's what's happening with Niyati Matrimony today.
                        </p>

                    </div>


                    <div className="admin-header-right">

                        <button className="admin-notification">
                            ♧
                            <span>5</span>
                        </button>

                        <div className="admin-profile">

                            <div className="admin-avatar">
                                A
                            </div>

                            <div>
                                <strong>Admin</strong>
                                <small>Super Admin</small>
                            </div>

                            <span>⌄</span>

                        </div>

                    </div>

                </header>


                {/* ================= STATISTICS ================= */}

                <section className="admin-stat-grid">

                    <div className="admin-stat-card">

                        <div className="stat-icon users">
                            ♙
                        </div>

                        <div>
                            <h3>12,856</h3>
                            <p>Total Users</p>
                            <small className="positive">
                                ↑ 8.5% this month
                            </small>
                        </div>

                    </div>


                    <div className="admin-stat-card">

                        <div className="stat-icon verified">
                            ✓
                        </div>

                        <div>
                            <h3>8,542</h3>
                            <p>Verified Profiles</p>
                            <small className="positive">
                                ↑ 7.2% this month
                            </small>
                        </div>

                    </div>


                    <div className="admin-stat-card">

                        <div className="stat-icon matches">
                            ♡
                        </div>

                        <div>
                            <h3>3,248</h3>
                            <p>Active Matches</p>
                            <small className="positive">
                                ↑ 12.4% this month
                            </small>
                        </div>

                    </div>


                    <div className="admin-stat-card">

                        <div className="stat-icon premium">
                            ♕
                        </div>

                        <div>
                            <h3>2,156</h3>
                            <p>Premium Members</p>
                            <small className="positive">
                                ↑ 9.1% this month
                            </small>
                        </div>

                    </div>


                    <div className="admin-stat-card">

                        <div className="stat-icon pending">
                            !
                        </div>

                        <div>
                            <h3>24</h3>
                            <p>Pending Approvals</p>
                            <small className="pending-text">
                                View all
                            </small>
                        </div>

                    </div>

                </section>


                {/* ================= OVERVIEW ================= */}

                <section className="admin-content-grid">

                    {/* USER OVERVIEW */}

                    <div className="admin-card user-overview">

                        <div className="admin-card-header">

                            <h2>User Overview</h2>

                            <select>
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>This Year</option>
                            </select>

                        </div>


                        <div className="chart-placeholder">

                            <div className="chart-line"></div>

                            <div className="chart-labels">
                                <span>1 May</span>
                                <span>5 May</span>
                                <span>9 May</span>
                                <span>13 May</span>
                                <span>17 May</span>
                            </div>

                        </div>

                    </div>


                    {/* GENDER OVERVIEW */}

                    <div className="admin-card gender-overview">

                        <div className="admin-card-header">
                            <h2>Users by Gender</h2>
                        </div>


                        <div className="gender-content">

                            <div className="gender-circle">
                                <div>
                                    12.8K
                                    <small>Users</small>
                                </div>
                            </div>


                            <div className="gender-list">

                                <p>
                                    <span className="gender-dot male"></span>
                                    Male
                                    <strong>54%</strong>
                                </p>

                                <p>
                                    <span className="gender-dot female"></span>
                                    Female
                                    <strong>43%</strong>
                                </p>

                                <p>
                                    <span className="gender-dot other"></span>
                                    Others
                                    <strong>3%</strong>
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* QUICK ACTIONS */}

                    <div className="admin-card quick-actions">

                        <div className="admin-card-header">
                            <h2>Quick Actions</h2>
                        </div>


                        <div className="quick-action-grid">

                            <button>
                                <span>♙</span>
                                Add Admin
                            </button>

                            <button>
                                <span>♕</span>
                                Add Membership
                            </button>

                            <button>
                                <span>➤</span>
                                Send Notification
                            </button>

                            <button>
                                <span>✓</span>
                                Approve Profiles
                            </button>

                            <button>
                                <span>▥</span>
                                View Reports
                            </button>

                            <button>
                                <span>?</span>
                                Support Requests
                            </button>

                        </div>

                    </div>

                </section>


                {/* ================= BOTTOM SECTION ================= */}

                <section className="admin-bottom-grid">


                    {/* RECENT REGISTRATIONS */}

                    <div className="admin-card">

                        <div className="admin-card-header">

                            <h2>Recent Registrations</h2>

                            <button className="view-all">
                                View All
                            </button>

                        </div>


                        <div className="registration-list">

                            <div className="registration-item">
                                <div className="mini-avatar">A</div>

                                <div>
                                    <strong>Ananya Sharma</strong>
                                    <small>ananya@example.com</small>
                                </div>

                                <time>10:30 AM</time>
                            </div>


                            <div className="registration-item">
                                <div className="mini-avatar">R</div>

                                <div>
                                    <strong>Rahul Verma</strong>
                                    <small>rahul@example.com</small>
                                </div>

                                <time>09:45 AM</time>
                            </div>


                            <div className="registration-item">
                                <div className="mini-avatar">P</div>

                                <div>
                                    <strong>Priya Nair</strong>
                                    <small>priya@example.com</small>
                                </div>

                                <time>09:10 AM</time>
                            </div>


                            <div className="registration-item">
                                <div className="mini-avatar">S</div>

                                <div>
                                    <strong>Siddharth Reddy</strong>
                                    <small>siddharth@example.com</small>
                                </div>

                                <time>08:50 AM</time>
                            </div>

                        </div>

                    </div>


                    {/* MEMBERSHIP OVERVIEW */}

                    <div className="admin-card">

                        <div className="admin-card-header">

                            <h2>Membership Overview</h2>

                            <select>
                                <option>This Month</option>
                            </select>

                        </div>


                        <div className="membership-list">

                            <p>
                                <span>♕ Premium</span>
                                <strong>2,156</strong>
                            </p>

                            <p>
                                <span>♕ Gold</span>
                                <strong>1,243</strong>
                            </p>

                            <p>
                                <span>♕ Silver</span>
                                <strong>832</strong>
                            </p>

                            <p>
                                <span>● Free</span>
                                <strong>8,625</strong>
                            </p>

                        </div>

                    </div>


                    {/* RECENT ACTIVITY */}

                    <div className="admin-card">

                        <div className="admin-card-header">

                            <h2>Recent Activity</h2>

                            <button className="view-all">
                                View All
                            </button>

                        </div>


                        <div className="activity-list">

                            <p>
                                <span>✓</span>
                                Profile approved
                                <small>10 minutes ago</small>
                            </p>

                            <p>
                                <span>♕</span>
                                New premium membership
                                <small>25 minutes ago</small>
                            </p>

                            <p>
                                <span>♡</span>
                                New match created
                                <small>42 minutes ago</small>
                            </p>

                            <p>
                                <span>?</span>
                                New support request
                                <small>1 hour ago</small>
                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </AdminLayout>
    );
}

export default AdminDashboard;