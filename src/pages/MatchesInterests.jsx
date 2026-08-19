import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/MatchesInterests.css";

function MatchesInterests() {

    const [activeTab, setActiveTab] = useState("matches");

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedItem, setSelectedItem] = useState(null);


    /* =====================================================
       MATCHES DATA
    ===================================================== */

    const [matches] = useState([
        {
            id: 1,
            user1: "Anjali Sharma",
            user1Email: "anjali@gmail.com",
            user2: "Rahul Kumar",
            user2Email: "rahul@gmail.com",
            date: "18 Aug 2026",
            status: "Mutual"
        },
        {
            id: 2,
            user1: "Priya Reddy",
            user1Email: "priya@gmail.com",
            user2: "Arjun Patel",
            user2Email: "arjun@gmail.com",
            date: "17 Aug 2026",
            status: "Mutual"
        },
        {
            id: 3,
            user1: "Sneha Rao",
            user1Email: "sneha@gmail.com",
            user2: "Vikram Singh",
            user2Email: "vikram@gmail.com",
            date: "16 Aug 2026",
            status: "Pending"
        },
        {
            id: 4,
            user1: "Kavya Nair",
            user1Email: "kavya@gmail.com",
            user2: "Karthik Reddy",
            user2Email: "karthik@gmail.com",
            date: "15 Aug 2026",
            status: "Mutual"
        }
    ]);


    /* =====================================================
       INTERESTS DATA
    ===================================================== */

    const [interests] = useState([
        {
            id: 1,
            from: "Rahul Kumar",
            fromEmail: "rahul@gmail.com",
            to: "Anjali Sharma",
            toEmail: "anjali@gmail.com",
            date: "18 Aug 2026",
            status: "Accepted"
        },
        {
            id: 2,
            from: "Arjun Patel",
            fromEmail: "arjun@gmail.com",
            to: "Priya Reddy",
            toEmail: "priya@gmail.com",
            date: "17 Aug 2026",
            status: "Pending"
        },
        {
            id: 3,
            from: "Vikram Singh",
            fromEmail: "vikram@gmail.com",
            to: "Sneha Rao",
            toEmail: "sneha@gmail.com",
            date: "16 Aug 2026",
            status: "Rejected"
        },
        {
            id: 4,
            from: "Karthik Reddy",
            fromEmail: "karthik@gmail.com",
            to: "Kavya Nair",
            toEmail: "kavya@gmail.com",
            date: "15 Aug 2026",
            status: "Accepted"
        },
        {
            id: 5,
            from: "Suresh Kumar",
            fromEmail: "suresh@gmail.com",
            to: "Divya Patil",
            toEmail: "divya@gmail.com",
            date: "14 Aug 2026",
            status: "Pending"
        }
    ]);


    /* =====================================================
       FILTER MATCHES
    ===================================================== */

    const filteredMatches = matches.filter((match) => {

        const search = searchTerm.toLowerCase();

        const searchMatch =
            match.user1.toLowerCase().includes(search) ||
            match.user2.toLowerCase().includes(search) ||
            match.user1Email.toLowerCase().includes(search) ||
            match.user2Email.toLowerCase().includes(search);

        const statusMatch =
            statusFilter === "All" ||
            match.status === statusFilter;

        return searchMatch && statusMatch;
    });


    /* =====================================================
       FILTER INTERESTS
    ===================================================== */

    const filteredInterests = interests.filter((interest) => {

        const search = searchTerm.toLowerCase();

        const searchMatch =
            interest.from.toLowerCase().includes(search) ||
            interest.to.toLowerCase().includes(search) ||
            interest.fromEmail.toLowerCase().includes(search) ||
            interest.toEmail.toLowerCase().includes(search);

        const statusMatch =
            statusFilter === "All" ||
            interest.status === statusFilter;

        return searchMatch && statusMatch;
    });


    /* =====================================================
       COUNTS
    ===================================================== */

    const totalMatches = matches.length;

    const mutualMatches = matches.filter(
        (match) => match.status === "Mutual"
    ).length;

    const totalInterests = interests.length;

    const pendingInterests = interests.filter(
        (interest) => interest.status === "Pending"
    ).length;


    /* =====================================================
       TAB CHANGE
    ===================================================== */

    const changeTab = (tab) => {

        setActiveTab(tab);

        setSearchTerm("");
        setStatusFilter("All");
        setSelectedItem(null);
    };


    return (
        <AdminLayout>

            <div className="matches-interests-page">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="matches-interests-header">

                    <div>

                        <h1>
                            Matches & Interests
                        </h1>

                        <p>
                            Manage user matches and interest requests.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                <div className="mi-summary-grid">


                    <div className="mi-summary-card">

                        <div className="mi-summary-icon">
                            💕
                        </div>

                        <div>

                            <span>
                                Total Matches
                            </span>

                            <strong>
                                {totalMatches}
                            </strong>

                        </div>

                    </div>


                    <div className="mi-summary-card">

                        <div className="mi-summary-icon">
                            ❤️
                        </div>

                        <div>

                            <span>
                                Mutual Matches
                            </span>

                            <strong>
                                {mutualMatches}
                            </strong>

                        </div>

                    </div>


                    <div className="mi-summary-card">

                        <div className="mi-summary-icon">
                            💌
                        </div>

                        <div>

                            <span>
                                Total Interests
                            </span>

                            <strong>
                                {totalInterests}
                            </strong>

                        </div>

                    </div>


                    <div className="mi-summary-card">

                        <div className="mi-summary-icon">
                            ⏳
                        </div>

                        <div>

                            <span>
                                Pending Interests
                            </span>

                            <strong>
                                {pendingInterests}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    TABS
                ================================================= */}

                <div className="mi-tabs">

                    <button
                        className={
                            activeTab === "matches"
                                ? "mi-tab active"
                                : "mi-tab"
                        }
                        onClick={() => changeTab("matches")}
                    >
                        💕 Matches
                    </button>


                    <button
                        className={
                            activeTab === "interests"
                                ? "mi-tab active"
                                : "mi-tab"
                        }
                        onClick={() => changeTab("interests")}
                    >
                        💌 Interests
                    </button>

                </div>


                {/* =================================================
                    FILTER
                ================================================= */}

                <div className="mi-filter-section">


                    <div className="mi-search">

                        <input
                            type="text"
                            placeholder={
                                activeTab === "matches"
                                    ? "Search users or email..."
                                    : "Search sender or receiver..."
                            }
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>


                    <div className="mi-status-filter">

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >

                            <option value="All">
                                All Status
                            </option>

                            {activeTab === "matches" ? (
                                <>
                                    <option value="Mutual">
                                        Mutual
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>
                                </>
                            ) : (
                                <>
                                    <option value="Accepted">
                                        Accepted
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Rejected">
                                        Rejected
                                    </option>
                                </>
                            )}

                        </select>

                    </div>

                </div>


                {/* =================================================
                    MATCHES TABLE
                ================================================= */}

                {activeTab === "matches" && (

                    <div className="mi-table-container">

                        <div className="mi-table-heading">

                            <div>

                                <h2>
                                    Match Records
                                </h2>

                                <p>
                                    View and monitor user matches.
                                </p>

                            </div>

                            <span>
                                {filteredMatches.length} records
                            </span>

                        </div>


                        {filteredMatches.length === 0 ? (

                            <div className="mi-empty">

                                <div>
                                    💕
                                </div>

                                <h3>
                                    No matches found
                                </h3>

                                <p>
                                    Try changing your search or filter.
                                </p>

                            </div>

                        ) : (

                            <div className="mi-table-wrapper">

                                <table className="mi-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                #
                                            </th>

                                            <th>
                                                User 1
                                            </th>

                                            <th>
                                                User 2
                                            </th>

                                            <th>
                                                Match Date
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredMatches.map(
                                            (match, index) => (

                                                <tr key={match.id}>

                                                    <td>
                                                        {index + 1}
                                                    </td>


                                                    <td>

                                                        <div className="mi-user">

                                                            <div className="mi-avatar">
                                                                {match.user1.charAt(0)}
                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {match.user1}
                                                                </strong>

                                                                <span>
                                                                    {match.user1Email}
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <div className="mi-user">

                                                            <div className="mi-avatar">
                                                                {match.user2.charAt(0)}
                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {match.user2}
                                                                </strong>

                                                                <span>
                                                                    {match.user2Email}
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td>
                                                        {match.date}
                                                    </td>


                                                    <td>

                                                        <span
                                                            className={`mi-status ${
                                                                match.status === "Mutual"
                                                                    ? "mutual"
                                                                    : "pending"
                                                            }`}
                                                        >
                                                            {match.status}
                                                        </span>

                                                    </td>


                                                    <td>

                                                        <button
                                                            className="mi-view-btn"
                                                            onClick={() =>
                                                                setSelectedItem({
                                                                    type: "match",
                                                                    data: match
                                                                })
                                                            }
                                                        >
                                                            View
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                )}


                {/* =================================================
                    INTERESTS TABLE
                ================================================= */}

                {activeTab === "interests" && (

                    <div className="mi-table-container">

                        <div className="mi-table-heading">

                            <div>

                                <h2>
                                    Interest Requests
                                </h2>

                                <p>
                                    View and monitor interest requests.
                                </p>

                            </div>

                            <span>
                                {filteredInterests.length} records
                            </span>

                        </div>


                        {filteredInterests.length === 0 ? (

                            <div className="mi-empty">

                                <div>
                                    💌
                                </div>

                                <h3>
                                    No interests found
                                </h3>

                                <p>
                                    Try changing your search or filter.
                                </p>

                            </div>

                        ) : (

                            <div className="mi-table-wrapper">

                                <table className="mi-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                #
                                            </th>

                                            <th>
                                                Sent By
                                            </th>

                                            <th>
                                                Sent To
                                            </th>

                                            <th>
                                                Date
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredInterests.map(
                                            (interest, index) => (

                                                <tr key={interest.id}>

                                                    <td>
                                                        {index + 1}
                                                    </td>


                                                    <td>

                                                        <div className="mi-user">

                                                            <div className="mi-avatar">
                                                                {interest.from.charAt(0)}
                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {interest.from}
                                                                </strong>

                                                                <span>
                                                                    {interest.fromEmail}
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <div className="mi-user">

                                                            <div className="mi-avatar">
                                                                {interest.to.charAt(0)}
                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {interest.to}
                                                                </strong>

                                                                <span>
                                                                    {interest.toEmail}
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td>
                                                        {interest.date}
                                                    </td>


                                                    <td>

                                                        <span
                                                            className={`mi-status ${
                                                                interest.status === "Accepted"
                                                                    ? "accepted"
                                                                    : interest.status === "Rejected"
                                                                        ? "rejected"
                                                                        : "pending"
                                                            }`}
                                                        >
                                                            {interest.status}
                                                        </span>

                                                    </td>


                                                    <td>

                                                        <button
                                                            className="mi-view-btn"
                                                            onClick={() =>
                                                                setSelectedItem({
                                                                    type: "interest",
                                                                    data: interest
                                                                })
                                                            }
                                                        >
                                                            View
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                )}


                {/* =================================================
                    VIEW MODAL
                ================================================= */}

                {selectedItem && (

                    <div className="mi-modal-overlay">

                        <div className="mi-modal">

                            <div className="mi-modal-header">

                                <div>

                                    <h2>
                                        {selectedItem.type === "match"
                                            ? "Match Details"
                                            : "Interest Details"}
                                    </h2>

                                    <p>
                                        Review the details below.
                                    </p>

                                </div>


                                <button
                                    className="mi-close-btn"
                                    onClick={() =>
                                        setSelectedItem(null)
                                    }
                                >
                                    ×
                                </button>

                            </div>


                            {selectedItem.type === "match" ? (

                                <div className="mi-modal-body">

                                    <div className="mi-profile">

                                        <div className="mi-large-avatar">
                                            {selectedItem.data.user1.charAt(0)}
                                        </div>

                                        <h3>
                                            {selectedItem.data.user1}
                                        </h3>

                                        <p>
                                            {selectedItem.data.user1Email}
                                        </p>

                                    </div>


                                    <div className="mi-love-icon">
                                        ❤️
                                    </div>


                                    <div className="mi-profile">

                                        <div className="mi-large-avatar">
                                            {selectedItem.data.user2.charAt(0)}
                                        </div>

                                        <h3>
                                            {selectedItem.data.user2}
                                        </h3>

                                        <p>
                                            {selectedItem.data.user2Email}
                                        </p>

                                    </div>

                                </div>

                            ) : (

                                <div className="mi-interest-details">

                                    <div className="mi-interest-person">

                                        <div className="mi-large-avatar">
                                            {selectedItem.data.from.charAt(0)}
                                        </div>

                                        <div>

                                            <span>
                                                Interest Sent By
                                            </span>

                                            <h3>
                                                {selectedItem.data.from}
                                            </h3>

                                            <p>
                                                {selectedItem.data.fromEmail}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="mi-interest-arrow">
                                        ↓
                                    </div>


                                    <div className="mi-interest-person">

                                        <div className="mi-large-avatar">
                                            {selectedItem.data.to.charAt(0)}
                                        </div>

                                        <div>

                                            <span>
                                                Interest Sent To
                                            </span>

                                            <h3>
                                                {selectedItem.data.to}
                                            </h3>

                                            <p>
                                                {selectedItem.data.toEmail}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )}


                            <div className="mi-modal-info">

                                <div>

                                    <span>
                                        Date
                                    </span>

                                    <strong>
                                        {selectedItem.data.date}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Status
                                    </span>

                                    <strong>
                                        {selectedItem.data.status}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </AdminLayout>
    );
}

export default MatchesInterests;