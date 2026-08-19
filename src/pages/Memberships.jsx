import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/Memberships.css";

function Memberships() {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [planFilter, setPlanFilter] = useState("All Plans");
    const [selectedMembership, setSelectedMembership] = useState(null);

    const [memberships] = useState([
        {
            id: 1,
            name: "Rahul Verma",
            email: "rahul@example.com",
            plan: "Premium",
            status: "Active",
            startDate: "01 Aug 2026",
            expiryDate: "01 Feb 2027",
            amount: "₹2,999"
        },
        {
            id: 2,
            name: "Kavya Rao",
            email: "kavya@example.com",
            plan: "Gold",
            status: "Active",
            startDate: "15 Jul 2026",
            expiryDate: "15 Jan 2027",
            amount: "₹1,999"
        },
        {
            id: 3,
            name: "Priya Nair",
            email: "priya@example.com",
            plan: "Basic",
            status: "Expired",
            startDate: "10 Jan 2026",
            expiryDate: "10 Jul 2026",
            amount: "₹999"
        },
        {
            id: 4,
            name: "Arjun Reddy",
            email: "arjun@example.com",
            plan: "Premium",
            status: "Pending",
            startDate: "18 Aug 2026",
            expiryDate: "18 Feb 2027",
            amount: "₹2,999"
        },
        {
            id: 5,
            name: "Ananya Sharma",
            email: "ananya@example.com",
            plan: "Gold",
            status: "Active",
            startDate: "05 Aug 2026",
            expiryDate: "05 Feb 2027",
            amount: "₹1,999"
        }
    ]);

    const filteredMemberships = memberships.filter((membership) => {

        const matchesSearch =
            membership.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            membership.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All Status" ||
            membership.status === statusFilter;

        const matchesPlan =
            planFilter === "All Plans" ||
            membership.plan === planFilter;

        return matchesSearch && matchesStatus && matchesPlan;
    });

    const activeCount = memberships.filter(
        (membership) => membership.status === "Active"
    ).length;

    const expiredCount = memberships.filter(
        (membership) => membership.status === "Expired"
    ).length;

    const pendingCount = memberships.filter(
        (membership) => membership.status === "Pending"
    ).length;

    return (
        <AdminLayout>

            <div className="memberships-page">

                {/* ================= HEADER ================= */}

                <div className="memberships-header">

                    <div>
                        <h1>Memberships</h1>

                        <p>
                            Manage Niyati Matrimony membership plans and subscriptions.
                        </p>
                    </div>

                </div>


                {/* ================= SUMMARY CARDS ================= */}

                <div className="membership-summary">

                    <div className="membership-summary-card">

                        <span className="membership-summary-label">
                            Total Memberships
                        </span>

                        <strong>
                            {memberships.length}
                        </strong>

                    </div>


                    <div className="membership-summary-card">

                        <span className="membership-summary-label">
                            Active
                        </span>

                        <strong>
                            {activeCount}
                        </strong>

                    </div>


                    <div className="membership-summary-card">

                        <span className="membership-summary-label">
                            Pending
                        </span>

                        <strong>
                            {pendingCount}
                        </strong>

                    </div>


                    <div className="membership-summary-card">

                        <span className="membership-summary-label">
                            Expired
                        </span>

                        <strong>
                            {expiredCount}
                        </strong>

                    </div>

                </div>


                {/* ================= FILTERS ================= */}

                <div className="membership-filters">

                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />


                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Expired</option>
                    </select>


                    <select
                        value={planFilter}
                        onChange={(e) =>
                            setPlanFilter(e.target.value)
                        }
                    >
                        <option>All Plans</option>
                        <option>Basic</option>
                        <option>Gold</option>
                        <option>Premium</option>
                    </select>

                </div>


                {/* ================= MEMBERSHIP CARD ================= */}

                <div className="memberships-card">

                    <div className="memberships-title">

                        <h2>
                            Memberships
                        </h2>

                        <span>
                            {filteredMemberships.length} memberships found
                        </span>

                    </div>


                    {/* ================= LIST ================= */}

                    <div className="membership-list">

                        {filteredMemberships.length === 0 ? (

                            <div className="membership-empty">
                                No memberships found.
                            </div>

                        ) : (

                            filteredMemberships.map((membership) => (

                                <div
                                    className="membership-item"
                                    key={membership.id}
                                >

                                    {/* AVATAR */}

                                    <div className="membership-avatar">

                                        {membership.name.charAt(0)}

                                    </div>


                                    {/* INFORMATION */}

                                    <div className="membership-info">

                                        <h3>
                                            {membership.name}
                                        </h3>

                                        <p>
                                            {membership.email}
                                        </p>

                                        <span>
                                            {membership.plan} Plan
                                        </span>

                                    </div>


                                    {/* DATES */}

                                    <div className="membership-dates">

                                        <small>
                                            Started
                                        </small>

                                        <span>
                                            {membership.startDate}
                                        </span>

                                        <small>
                                            Expires
                                        </small>

                                        <span>
                                            {membership.expiryDate}
                                        </span>

                                    </div>


                                    {/* STATUS */}

                                    <div className="membership-status">

                                        <span
                                            className={`membership-status-badge ${membership.status.toLowerCase()}`}
                                        >
                                            {membership.status}
                                        </span>

                                    </div>


                                    {/* VIEW */}

                                    <div className="membership-action">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedMembership(membership)
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


                {/* ================= DETAILS ================= */}

                {selectedMembership && (

                    <div className="membership-details">

                        <div className="membership-details-header">

                            <div>

                                <h2>
                                    Membership Details
                                </h2>

                                <p>
                                    Review membership information
                                </p>

                            </div>


                            <button
                                className="membership-details-close"
                                type="button"
                                onClick={() =>
                                    setSelectedMembership(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="membership-details-content">

                            <div className="membership-details-avatar">

                                {selectedMembership.name.charAt(0)}

                            </div>


                            <div className="membership-details-info">

                                <h2>
                                    {selectedMembership.name}
                                </h2>

                                <p>
                                    ✉ {selectedMembership.email}
                                </p>

                                <p>
                                    Plan: {selectedMembership.plan}
                                </p>

                                <p>
                                    Started: {selectedMembership.startDate}
                                </p>

                                <p>
                                    Expires: {selectedMembership.expiryDate}
                                </p>

                                <p>
                                    Amount: {selectedMembership.amount}
                                </p>

                            </div>


                            <div className="membership-details-status">

                                <span
                                    className={`membership-status-badge ${selectedMembership.status.toLowerCase()}`}
                                >
                                    {selectedMembership.status}
                                </span>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </AdminLayout>
    );
}

export default Memberships;