import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminProfileManagement.css";

function AdminProfileManagement() {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [confirmationAction, setConfirmationAction] = useState(null);

    const [profiles, setProfiles] = useState([
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
    ]);

    // FILTER PROFILES
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

    // APPROVE PROFILE
    const handleApprove = () => {

        if (!selectedProfile) return;

        const updatedProfile = {
            ...selectedProfile,
            status: "Approved",
            verification: "Verified"
        };

        setProfiles((currentProfiles) =>
            currentProfiles.map((profile) =>
                profile.id === updatedProfile.id
                    ? updatedProfile
                    : profile
            )
        );

        const approvedProfiles = profiles.filter(
    (profile) =>
        profile.status === "Approved" &&
        profile.id !== updatedProfile.id
);

localStorage.setItem(
    "approvedProfiles",
    JSON.stringify([
        ...approvedProfiles,
        updatedProfile
    ])
);

        setSelectedProfile(updatedProfile);
        setConfirmationAction(null);
    };

    const handleReject = () => {
    if (!selectedProfile) return;

    const updatedProfile = {
        ...selectedProfile,
        status: "Rejected",
        verification: "Not Verified"
    };

    setProfiles((currentProfiles) =>
        currentProfiles.map((profile) =>
            profile.id === updatedProfile.id
                ? updatedProfile
                : profile
        )
    );

    // Remove rejected profile from Approved Profiles
    const savedApprovedProfiles =
        JSON.parse(localStorage.getItem("approvedProfiles")) || [];

    const updatedApprovedProfiles =
        savedApprovedProfiles.filter(
            (profile) => profile.id !== updatedProfile.id
        );

    localStorage.setItem(
        "approvedProfiles",
        JSON.stringify(updatedApprovedProfiles)
    );

    setSelectedProfile(updatedProfile);
};

    return (
        <AdminLayout>

            <div className="admin-profile-management">

                {/* ================= PAGE HEADER ================= */}

                <div className="profile-management-header">

                    <div>

                        <h1>Profile Management</h1>

                        <p>
                            Review, verify and manage Niyati Matrimony profiles.
                        </p>

                    </div>

                </div>


                {/* ================= FILTER SECTION ================= */}

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


                {/* ================= PROFILE LIST ================= */}

                <div className="profile-management-card">

                    <div className="profile-management-title">

                        <h2>Profiles</h2>

                        <span>
                            {filteredProfiles.length} profiles found
                        </span>

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

                                    <h3>
                                        {profile.name}
                                    </h3>

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


                                {/* VIEW BUTTON */}

                                <div className="admin-profile-action">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedProfile(profile)
                                        }
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

                        {/* HEADER */}

                        <div className="profile-details-header">

                            <div>

                                <h2>
                                    Profile Details
                                </h2>

                                <p>
                                    Review this matrimonial profile
                                </p>

                            </div>


                            <button
                                className="profile-details-close"
                                onClick={() =>
                                    setSelectedProfile(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        {/* PROFILE INFORMATION */}

                        <div className="profile-details-content">

                            {/* AVATAR */}

                            <div className="profile-details-avatar">

                                {selectedProfile.name.charAt(0)}

                            </div>


                            {/* INFORMATION */}

                            <div className="profile-details-info">

                                <h2>
                                    {selectedProfile.name}
                                </h2>

                                <p>
                                    {selectedProfile.age} years •{" "}
                                    {selectedProfile.gender}
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

                            <button
                                className="profile-approve-button"
                                onClick={() =>
                                    setConfirmationAction("approve")
                                }
                            >
                                ✓ Approve Profile
                            </button>


                            <button
                                className="profile-reject-button"
                                onClick={() =>
                                    setConfirmationAction("reject")
                                }
                            >
                                ✕ Reject Profile
                            </button>

                        </div>

                    </div>

                )}


                {/* ================= CONFIRMATION POPUP ================= */}

                {confirmationAction && (

                    <div className="confirmation-overlay">

                        <div className="confirmation-popup">

                            <h3>

                                {confirmationAction === "approve"
                                    ? "Approve Profile?"
                                    : "Reject Profile?"}

                            </h3>


                            <p>

                                Are you sure you want to{" "}

                                {confirmationAction === "approve"
                                    ? "approve"
                                    : "reject"}

                                {" "}this profile?

                            </p>


                            {/* POPUP BUTTONS */}

                            <div className="confirmation-actions">

                                <button
                                    className="confirmation-cancel"
                                    onClick={() =>
                                        setConfirmationAction(null)
                                    }
                                >
                                    Cancel
                                </button>


                                <button
                                    className={
                                        confirmationAction === "approve"
                                            ? "confirmation-confirm approve"
                                            : "confirmation-confirm reject"
                                    }
                                    onClick={() => {

                                        if (
                                            confirmationAction ===
                                            "approve"
                                        ) {

                                            handleApprove();

                                        } else {

                                            handleReject();

                                        }

                                    }}
                                >

                                    {confirmationAction === "approve"
                                        ? "Approve"
                                        : "Reject"}

                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </AdminLayout>
    );
}

export default AdminProfileManagement;