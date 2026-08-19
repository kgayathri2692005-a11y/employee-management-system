import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminUsers.css";

function AdminUsers() {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const users = [
        {
            id: 1,
            name: "Ananya Sharma",
            email: "ananya@example.com",
            gender: "Female",
            age: 27,
            status: "Active",
            verification: "Verified"
        },
        {
            id: 2,
            name: "Rahul Verma",
            email: "rahul@example.com",
            gender: "Male",
            age: 30,
            status: "Active",
            verification: "Pending"
        },
        {
            id: 3,
            name: "Priya Nair",
            email: "priya@example.com",
            gender: "Female",
            age: 26,
            status: "Active",
            verification: "Verified"
        },
        {
            id: 4,
            name: "Siddharth Reddy",
            email: "siddharth@example.com",
            gender: "Male",
            age: 29,
            status: "Inactive",
            verification: "Verified"
        },
        {
            id: 5,
            name: "Kavya Rao",
            email: "kavya@example.com",
            gender: "Female",
            age: 28,
            status: "Active",
            verification: "Pending"
        },
        {
            id: 6,
            name: "Arjun Kumar",
            email: "arjun@example.com",
            gender: "Male",
            age: 31,
            status: "Active",
            verification: "Verified"
        }
    ];


    const filteredUsers = users.filter((user) => {

        const matchesSearch =
            user.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            user.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            user.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    return (
         <AdminLayout>

        <div className="admin-users-page">

            {/* ================= HEADER ================= */}

            <div className="admin-users-header">

                <div>
                    <h1>User Management</h1>

                    <p>
                        Manage and monitor Niyati Matrimony users.
                    </p>
                </div>

                <button className="admin-add-user-button">
                    + Add User
                </button>

            </div>


            {/* ================= STAT CARDS ================= */}

            <div className="admin-users-stats">

                <div className="admin-users-stat-card">

                    <span className="admin-users-stat-icon">
                        ♙
                    </span>

                    <div>
                        <strong>{users.length}</strong>
                        <span>Total Users</span>
                    </div>

                </div>


                <div className="admin-users-stat-card">

                    <span className="admin-users-stat-icon verified">
                        ✓
                    </span>

                    <div>
                        <strong>
                            {
                                users.filter(
                                    user =>
                                        user.verification === "Verified"
                                ).length
                            }
                        </strong>

                        <span>Verified</span>
                    </div>

                </div>


                <div className="admin-users-stat-card">

                    <span className="admin-users-stat-icon pending">
                        !
                    </span>

                    <div>
                        <strong>
                            {
                                users.filter(
                                    user =>
                                        user.verification === "Pending"
                                ).length
                            }
                        </strong>

                        <span>Pending Verification</span>
                    </div>

                </div>


                <div className="admin-users-stat-card">

                    <span className="admin-users-stat-icon active">
                        ●
                    </span>

                    <div>
                        <strong>
                            {
                                users.filter(
                                    user =>
                                        user.status === "Active"
                                ).length
                            }
                        </strong>

                        <span>Active Users</span>
                    </div>

                </div>

            </div>


            {/* ================= FILTER SECTION ================= */}

            <div className="admin-users-toolbar">

                <div className="admin-user-search">

                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>


                <select
                    className="admin-status-filter"
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                >

                    <option value="All">
                        All Status
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </div>


            {/* ================= USER TABLE ================= */}

            <div className="admin-users-table-card">

                <div className="admin-users-table-header">

                    <h2>
                        All Users
                    </h2>

                    <span>
                        {filteredUsers.length} users found
                    </span>

                </div>


                <div className="admin-users-table-wrapper">

                    <table className="admin-users-table">

                        <thead>

                            <tr>

                                <th>User</th>

                                <th>Gender</th>

                                <th>Age</th>

                                <th>Status</th>

                                <th>Verification</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredUsers.length > 0 ? (

                                filteredUsers.map((user) => (

                                    <tr key={user.id}>

                                        <td>

                                            <div className="admin-table-user">

                                                <div className="admin-table-avatar">
                                                    {user.name.charAt(0)}
                                                </div>

                                                <div>

                                                    <strong>
                                                        {user.name}
                                                    </strong>

                                                    <small>
                                                        {user.email}
                                                    </small>

                                                </div>

                                            </div>

                                        </td>


                                        <td>
                                            {user.gender}
                                        </td>


                                        <td>
                                            {user.age}
                                        </td>


                                        <td>

                                            <span
                                                className={`user-status ${user.status.toLowerCase()}`}
                                            >
                                                {user.status}
                                            </span>

                                        </td>


                                        <td>

                                            <span
                                                className={`verification-status ${user.verification.toLowerCase()}`}
                                            >
                                                {user.verification}
                                            </span>

                                        </td>


                                        <td>

                                            <button
                                                className="admin-view-user"
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="no-users"
                                    >
                                        No users found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
         </AdminLayout>
    );
}

export default AdminUsers;