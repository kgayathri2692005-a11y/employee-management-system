import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminProfileManagement.css";

function AdminProfileManagement() {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [selectedProfile, setSelectedProfile] = useState(null);

    const profiles = [
    {
        id: 1,
        name: "Ananya Sharma",
        email: "ananya@example.com",
        age: 27,
        gender: "Female",
        location: "Bengaluru",
        status: "Pending",
        verification: "Pending"
    },
    {
        id: 2,
        name: "Rahul Verma",
        email: "rahul@example.com",
        age: 30,
        gender: "Male",
        location: "Hyderabad",
        status: "Approved",
        verification: "Verified"
    },
    {
        id: 3,
        name: "Priya Nair",
        email: "priya@example.com",
        age: 26,
        gender: "Female",
        location: "Chennai",
        status: "Pending",
        verification: "Verified"
    },
    {
        id: 4,
        name: "Arjun Reddy",
        email: "arjun@example.com",
        age: 29,
        gender: "Male",
        location: "Bengaluru",
        status: "Rejected",
        verification: "Not Verified"
    },
    {
        id: 5,
        name: "Kavya Rao",
        email: "kavya@example.com",
        age: 28,
        gender: "Female",
        location: "Mysuru",
        status: "Approved",
        verification: "Verified"
    }
];

    const filteredProfiles = profiles.filter((profile) => {

        const matchesSearch =
            profile.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            profile.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All Status" ||
            profile.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <AdminLayout>

            <div className="admin-profile-management">

                {/* PAGE HEADER */}
                <div className="profile-management-header">

                    <div>
                        <h1>Profile Management</h1>
                        <p>
                            Review, verify and manage Niyati Matrimony profiles.
                        </p>
                    </div>

                </div>


                {/* FILTER SECTION */}
                <div className="profile-management-filters">

                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>

                </div>


                {/* PROFILE LIST */}
                <div className="profile-management-card">

                    <div className="profile-management-title">
                        <h2>Profiles</h2>
                        <span>0 profiles found</span>
                    </div>

                    <div className="admin-profile-list">

    {filteredProfiles.map((profile) => (

        <div
            className="admin-profile-item"
            key={profile.id}
        >

            {/* PROFILE AVATAR */}

            <div className="admin-profile-avatar">
                {profile.name.charAt(0)}
            </div>


            {/* PROFILE INFORMATION */}

            <div className="admin-profile-info">

                <h3>{profile.name}</h3>

                <p>
                    {profile.age} years • {profile.gender}
                </p>

                <span>
                    {profile.location}
                </span>

                <small>
                    {profile.email}
                </small>

            </div>


            {/* STATUS */}

            <div className="admin-profile-status">

                <span
                    className={`profile-status ${profile.status.toLowerCase()}`}
                >
                    {profile.status}
                </span>

                <span
                    className={`profile-verification ${
                        profile.verification
                            .toLowerCase()
                            .replace(" ", "-")
                    }`}
                >
                    {profile.verification}
                </span>

            </div>


            {/* ACTION */}

            <div className="admin-profile-action">

                <button
    onClick={() => setSelectedProfile(profile)}
>
    View
</button>

            </div>

        </div>

    ))}

</div>

                </div>

{/* ================= PROFILE DETAILS ================= */}

{selectedProfile && (

    <div className="admin-profile-details">

        <div className="profile-details-header">

            <div>
                <h2>Profile Details</h2>
                <p>Review this matrimonial profile</p>
            </div>

            <button
                className="profile-details-close"
                onClick={() => setSelectedProfile(null)}
            >
                ×
            </button>

        </div>


        <div className="profile-details-content">

            {/* PROFILE AVATAR */}

            <div className="profile-details-avatar">
                {selectedProfile.name.charAt(0)}
            </div>


            {/* PROFILE INFORMATION */}

            <div className="profile-details-info">

                <h2>{selectedProfile.name}</h2>

                <p>
                    {selectedProfile.age} years • {selectedProfile.gender}
                </p>

                <p>
                    📍 {selectedProfile.location}
                </p>

                <p>
                    ✉ {selectedProfile.email}
                </p>

            </div>


            {/* STATUS */}

            <div className="profile-details-status">

                <span
                    className={`profile-status ${selectedProfile.status.toLowerCase()}`}
                >
                    {selectedProfile.status}
                </span>

                <span
                    className={`profile-verification ${
                        selectedProfile.verification
                            .toLowerCase()
                            .replace(" ", "-")
                    }`}
                >
                    {selectedProfile.verification}
                </span>

            </div>

        </div>


        {/* ACTION BUTTONS */}

        <div className="profile-details-actions">

            <button className="profile-approve-button">
                ✓ Approve Profile
            </button>

            <button className="profile-reject-button">
                ✕ Reject Profile
            </button>

        </div>

    </div>

)}
            </div>

        </AdminLayout>
    );
}

export default AdminProfileManagement;