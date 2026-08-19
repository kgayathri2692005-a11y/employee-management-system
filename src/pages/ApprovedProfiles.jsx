import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/ApprovedProfiles.css";

function ApprovedProfiles() {

    const [approvedProfiles, setApprovedProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);

    useEffect(() => {

        const savedProfiles =
            localStorage.getItem("approvedProfiles");

        if (savedProfiles) {
            setApprovedProfiles(JSON.parse(savedProfiles));
        }

    }, []);

    return (
        <AdminLayout>

            <div className="approved-profiles">

                {/* ================= HEADER ================= */}

                <div className="approved-profiles-header">

                    <div>

                        <h1>Approved Profiles</h1>

                        <p>
                            View and manage approved Niyati Matrimony profiles.
                        </p>

                    </div>

                </div>


                {/* ================= MAIN CARD ================= */}

                <div className="approved-profiles-card">

                    {/* ================= TITLE ================= */}

                    <div className="approved-profiles-title">

                        <h2>Approved Profiles</h2>

                        <span>
                            {approvedProfiles.length} profiles
                        </span>

                    </div>


                    {/* ================= PROFILE LIST ================= */}

                    <div className="approved-profile-list">

                        {approvedProfiles.length === 0 ? (

                            <div className="approved-profiles-empty">

                                No approved profiles found.

                            </div>

                        ) : (

                            approvedProfiles.map((profile) => (

                                <div
                                    className="approved-profile-item"
                                    key={profile.id}
                                >

                                    {/* ================= AVATAR ================= */}

                                    <div className="approved-profile-avatar">

                                        {profile.name.charAt(0)}

                                    </div>


                                    {/* ================= INFORMATION ================= */}

                                    <div className="approved-profile-info">

                                        <h3>
                                            {profile.name}
                                        </h3>

                                        <p>
                                            {profile.age} years •{" "}
                                            {profile.gender}
                                        </p>

                                        <span>
                                            📍 {profile.location}
                                        </span>

                                        <small>
                                            {profile.email}
                                        </small>

                                    </div>


                                    {/* ================= STATUS ================= */}

                                    <div className="approved-profile-status">

                                        <span className="approved-status">

                                            {profile.status}

                                        </span>

                                        <span className="verified-status">

                                            {profile.verification}

                                        </span>

                                    </div>


                                    {/* ================= VIEW BUTTON ================= */}

                                    <div className="approved-profile-action">

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

                            ))

                        )}

                    </div>

                </div>


                {/* =================================================
                    PROFILE DETAILS
                   ================================================= */}

                {selectedProfile && (

                    <div className="approved-profile-details">

                        {/* ================= DETAILS HEADER ================= */}

                        <div className="approved-details-header">

                            <div>

                                <h2>
                                    Profile Details
                                </h2>

                                <p>
                                    Approved matrimonial profile
                                </p>

                            </div>


                            <button
                                className="approved-details-close"
                                type="button"
                                onClick={() =>
                                    setSelectedProfile(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        {/* ================= DETAILS CONTENT ================= */}

                        <div className="approved-details-content">

                            {/* AVATAR */}

                            <div className="approved-details-avatar">

                                {selectedProfile.name.charAt(0)}

                            </div>


                            {/* INFORMATION */}

                            <div className="approved-details-info">

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

                            <div className="approved-details-status">

                                <span className="approved-status">

                                    {selectedProfile.status}

                                </span>

                                <span className="verified-status">

                                    {selectedProfile.verification}

                                </span>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </AdminLayout>
    );
}

export default ApprovedProfiles;