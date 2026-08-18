import React, { useMemo, useState } from "react";
import "../styles/AdminManagement.css";

function AdminManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [activeMenu, setActiveMenu] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Gayathri Krishnagiri",
      email: "gayathri@niyati.com",
      role: "Super Admin",
      department: "Administration",
      status: "Active",
      lastActive: "Today, 10:32 AM",
      joined: "12 Jan 2026",
      initials: "GK",
    },
    {
      id: 2,
      name: "Ethan P",
      email: "ethan@niyati.com",
      role: "Moderator",
      department: "User Safety",
      status: "Active",
      lastActive: "Today, 09:48 AM",
      joined: "28 Feb 2026",
      initials: "EP",
    },
    {
      id: 3,
      name: "Priya S",
      email: "priya@niyati.com",
      role: "Support",
      department: "Support Team",
      status: "Active",
      lastActive: "Yesterday, 06:20 PM",
      joined: "15 Mar 2026",
      initials: "PS",
    },
    {
      id: 4,
      name: "Rahul K",
      email: "rahul@niyati.com",
      role: "Moderator",
      department: "Profile Review",
      status: "Inactive",
      lastActive: "5 days ago",
      joined: "04 Apr 2026",
      initials: "RK",
    },
  ]);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Moderator",
    department: "User Safety",
  });

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const matchesSearch =
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "All Roles" || admin.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Status" || admin.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [admins, searchTerm, roleFilter, statusFilter]);

  const handleAddAdmin = (e) => {
    e.preventDefault();

    if (!newAdmin.name.trim() || !newAdmin.email.trim()) {
      return;
    }

    const initials = newAdmin.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const admin = {
      id: Date.now(),
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      department: newAdmin.department,
      status: "Active",
      lastActive: "Just now",
      joined: "18 Aug 2026",
      initials,
    };

    setAdmins((prev) => [admin, ...prev]);

    setNewAdmin({
      name: "",
      email: "",
      role: "Moderator",
      department: "User Safety",
    });

    setShowAddModal(false);
  };

  const handleViewAdmin = (admin) => {
    setSelectedAdmin(admin);
    setShowViewModal(true);
    setActiveMenu(null);
  };

  const handleToggleStatus = (id) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === "Active" ? "Inactive" : "Active",
            }
          : admin
      )
    );

    setActiveMenu(null);
  };

  const handleDeleteAdmin = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this administrator?"
    );

    if (!confirmed) return;

    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
    setActiveMenu(null);
  };

  return (
    <div className="admin-management-page">
      {/* PAGE HEADER */}
      <div className="admin-management-header">
        <div>
          <div className="admin-breadcrumb">
            Administration <span>/</span> Admin Management
          </div>

          <h1>Admin Management</h1>

          <p>
            Manage administrators, roles and access permissions for Niyati.
          </p>
        </div>

        <button
          className="add-admin-btn"
          onClick={() => setShowAddModal(true)}
        >
          <span className="add-admin-icon">+</span>
          Add Administrator
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="admin-summary-grid">
        <div className="admin-summary-card">
          <div className="summary-card-icon">
            <span>♙</span>
          </div>

          <div className="summary-card-content">
            <span>Total Administrators</span>
            <strong>{admins.length.toString().padStart(2, "0")}</strong>
            <small>All registered admins</small>
          </div>
        </div>

        <div className="admin-summary-card">
          <div className="summary-card-icon active-icon">
            <span>✓</span>
          </div>

          <div className="summary-card-content">
            <span>Active Administrators</span>
            <strong>
              {admins.filter((admin) => admin.status === "Active").length
                .toString()
                .padStart(2, "0")}
            </strong>
            <small>Currently active</small>
          </div>
        </div>

        <div className="admin-summary-card">
          <div className="summary-card-icon inactive-icon">
            <span>−</span>
          </div>

          <div className="summary-card-content">
            <span>Inactive</span>
            <strong>
              {admins.filter((admin) => admin.status === "Inactive").length
                .toString()
                .padStart(2, "0")}
            </strong>
            <small>Access currently disabled</small>
          </div>
        </div>

        <div className="admin-summary-card">
          <div className="summary-card-icon role-icon">
            <span>♛</span>
          </div>

          <div className="summary-card-content">
            <span>Access Roles</span>
            <strong>03</strong>
            <small>Configured roles</small>
          </div>
        </div>
      </div>

      {/* ADMINISTRATORS TABLE */}
      <section className="admin-section administrators-section">
        <div className="section-top">
          <div>
            <h2>Administrators</h2>
            <p>View and manage all Niyati administrators.</p>
          </div>

          <div className="admin-count">
            {filteredAdmins.length}{" "}
            {filteredAdmins.length === 1 ? "Administrator" : "Administrators"}
          </div>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="admin-toolbar">
          <div className="admin-search">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search administrators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                ×
              </button>
            )}
          </div>

          <div className="admin-filters">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option>All Roles</option>
              <option>Super Admin</option>
              <option>Moderator</option>
              <option>Support</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ADMINISTRATOR</th>
                <th>ROLE</th>
                <th>DEPARTMENT</th>
                <th>STATUS</th>
                <th>LAST ACTIVE</th>
                <th>JOINED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td>
                      <div className="admin-person">
                        <div className="admin-avatar">{admin.initials}</div>

                        <div className="admin-person-info">
                          <strong>{admin.name}</strong>
                          <span>{admin.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`role-badge ${admin.role
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {admin.role}
                      </span>
                    </td>

                    <td>
                      <span className="department-text">
                        {admin.department}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          admin.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        <span className="status-dot"></span>
                        {admin.status}
                      </span>
                    </td>

                    <td>
                      <span className="last-active">
                        {admin.lastActive}
                      </span>
                    </td>

                    <td>
                      <span className="joined-date">{admin.joined}</span>
                    </td>

                    <td className="action-cell">
                      <button
                        className="admin-more-btn"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === admin.id ? null : admin.id
                          )
                        }
                      >
                        ⋮
                      </button>

                      {activeMenu === admin.id && (
                        <div className="admin-action-menu">
                          <button onClick={() => handleViewAdmin(admin)}>
                            <span>◉</span>
                            View Profile
                          </button>

                          <button
                            onClick={() => {
                              setSelectedAdmin(admin);
                              setShowViewModal(true);
                              setActiveMenu(null);
                            }}
                          >
                            <span>✎</span>
                            Edit Admin
                          </button>

                          <button
                            onClick={() => handleToggleStatus(admin.id)}
                          >
                            <span>
                              {admin.status === "Active" ? "−" : "✓"}
                            </span>
                            {admin.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>

                          <button
                            className="danger-action"
                            onClick={() => handleDeleteAdmin(admin.id)}
                          >
                            <span>×</span>
                            Remove Admin
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="empty-admin-state">
                      <div className="empty-admin-icon">⌕</div>
                      <h3>No administrators found</h3>
                      <p>
                        Try changing your search or filter options.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="admin-pagination">
          <span>
            Showing <strong>{filteredAdmins.length}</strong> of{" "}
            <strong>{admins.length}</strong> administrators
          </span>

          <div className="pagination-buttons">
            <button disabled>‹</button>
            <button className="pagination-active">1</button>
            <button disabled>›</button>
          </div>
        </div>
      </section>

      {/* LOWER GRID */}
      <div className="admin-lower-grid">
        {/* RECENT ACTIVITY */}
        <section className="admin-section activity-section">
          <div className="section-heading-row">
            <div>
              <h2>Recent Admin Activity</h2>
              <p>Latest actions performed by administrators.</p>
            </div>

            <button className="view-all-btn">View All</button>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">✓</div>

              <div className="activity-content">
                <strong>Profile approved</strong>
                <p>Gayathri approved a new member profile.</p>
                <span>Today, 10:32 AM</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon report-icon">!</div>

              <div className="activity-content">
                <strong>Report resolved</strong>
                <p>Ethan resolved a reported member account.</p>
                <span>Today, 09:48 AM</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon support-icon">?</div>

              <div className="activity-content">
                <strong>Support request handled</strong>
                <p>Priya responded to a member support request.</p>
                <span>Yesterday, 06:20 PM</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon admin-icon">+</div>

              <div className="activity-content">
                <strong>Administrator added</strong>
                <p>Gayathri added a new administrator.</p>
                <span>Yesterday, 04:15 PM</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="admin-section security-section">
          <div className="section-heading-row">
            <div>
              <h2>Security Overview</h2>
              <p>Current administrator security status.</p>
            </div>
          </div>

          <div className="security-list">
            <div className="security-item">
              <div className="security-item-left">
                <div className="security-icon">✓</div>

                <div>
                  <strong>Two-Factor Authentication</strong>
                  <span>Admin accounts protected</span>
                </div>
              </div>

              <strong className="security-value">3 / 4</strong>
            </div>

            <div className="security-item">
              <div className="security-item-left">
                <div className="security-icon warning-security">!</div>

                <div>
                  <strong>Failed Login Attempts</strong>
                  <span>Last 24 hours</span>
                </div>
              </div>

              <strong className="security-value">02</strong>
            </div>

            <div className="security-item">
              <div className="security-item-left">
                <div className="security-icon">✓</div>

                <div>
                  <strong>Password Policy</strong>
                  <span>Minimum security requirements</span>
                </div>
              </div>

              <span className="strong-status">Strong</span>
            </div>

            <div className="security-item">
              <div className="security-item-left">
                <div className="security-icon">◷</div>

                <div>
                  <strong>Last Security Review</strong>
                  <span>System-wide review</span>
                </div>
              </div>

              <strong className="security-date">18 Aug 2026</strong>
            </div>
          </div>
        </section>
      </div>

      {/* ROLE & PERMISSION */}
      <section className="admin-section permissions-section">
        <div className="section-heading-row">
          <div>
            <h2>Role & Permissions</h2>
            <p>
              Overview of access levels assigned to Niyati administrators.
            </p>
          </div>

          <button className="manage-roles-btn">Manage Roles</button>
        </div>

        <div className="permissions-table-wrapper">
          <table className="permissions-table">
            <thead>
              <tr>
                <th>ROLE</th>
                <th>USERS</th>
                <th>PROFILE REVIEW</th>
                <th>REPORTS</th>
                <th>PAYMENTS</th>
                <th>SETTINGS</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div className="permission-role">
                    <span className="permission-role-icon crown-icon">
                      ♛
                    </span>
                    <div>
                      <strong>Super Admin</strong>
                      <span>Full system access</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="permission-check">✓</span>
                </td>

                <td>
                  <span className="permission-check">✓</span>
                </td>

                <td>
                  <span className="permission-check">✓</span>
                </td>

                <td>
                  <span className="permission-check">✓</span>
                </td>

                <td>
                  <span className="permission-check">✓</span>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="permission-role">
                    <span className="permission-role-icon moderator-icon">
                      ◇
                    </span>
                    <div>
                      <strong>Moderator</strong>
                      <span>Moderation access</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="permission-check">✓</span>
                </td>

                <td>
                  <span className="permission-check">✓</span>
                </td>

                <td>
                  <span className="permission-check">✓</span>
                </td>

                <td>
                  <span className="permission-dash">—</span>
                </td>

                <td>
                  <span className="permission-dash">—</span>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="permission-role">
                    <span className="permission-role-icon support-role-icon">
                      ?
                    </span>
                    <div>
                      <strong>Support</strong>
                      <span>Member support access</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="permission-check">✓</span>
                </td>

                <td>
                  <span className="permission-dash">—</span>
                </td>

                <td>
                  <span className="permission-check">View</span>
                </td>

                <td>
                  <span className="permission-dash">—</span>
                </td>

                <td>
                  <span className="permission-dash">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ADD ADMIN MODAL */}
      {showAddModal && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">NIYATI ADMINISTRATION</span>
                <h2>Add Administrator</h2>
                <p>Create a new administrator account.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddAdmin}>
              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter administrator name"
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter email address"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>

                  <select
                    value={newAdmin.role}
                    onChange={(e) =>
                      setNewAdmin({
                        ...newAdmin,
                        role: e.target.value,
                      })
                    }
                  >
                    <option>Super Admin</option>
                    <option>Moderator</option>
                    <option>Support</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Department</label>

                  <select
                    value={newAdmin.department}
                    onChange={(e) =>
                      setNewAdmin({
                        ...newAdmin,
                        department: e.target.value,
                      })
                    }
                  >
                    <option>Administration</option>
                    <option>User Safety</option>
                    <option>Profile Review</option>
                    <option>Support Team</option>
                    <option>Finance</option>
                  </select>
                </div>
              </div>

              <div className="modal-info-box">
                <span>i</span>
                <p>
                  The new administrator will be created with an active
                  status. Permissions can be adjusted based on their
                  assigned role.
                </p>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="modal-submit-btn">
                  Create Administrator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW ADMIN MODAL */}
      {showViewModal && selectedAdmin && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowViewModal(false)}
        >
          <div
            className="admin-modal admin-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">ADMINISTRATOR PROFILE</span>
                <h2>Administrator Details</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowViewModal(false)}
              >
                ×
              </button>
            </div>

            <div className="profile-modal-top">
              <div className="profile-modal-avatar">
                {selectedAdmin.initials}
              </div>

              <div>
                <h3>{selectedAdmin.name}</h3>
                <p>{selectedAdmin.email}</p>

                <span
                  className={`status-badge ${
                    selectedAdmin.status === "Active"
                      ? "status-active"
                      : "status-inactive"
                  }`}
                >
                  <span className="status-dot"></span>
                  {selectedAdmin.status}
                </span>
              </div>
            </div>

            <div className="profile-detail-grid">
              <div>
                <span>Role</span>
                <strong>{selectedAdmin.role}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{selectedAdmin.department}</strong>
              </div>

              <div>
                <span>Last Active</span>
                <strong>{selectedAdmin.lastActive}</strong>
              </div>

              <div>
                <span>Joined</span>
                <strong>{selectedAdmin.joined}</strong>
              </div>
            </div>

            <div className="modal-actions single-action">
              <button
                className="modal-submit-btn"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminManagement;