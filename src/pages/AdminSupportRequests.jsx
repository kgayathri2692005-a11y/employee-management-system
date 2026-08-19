import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminSupportRequests.css";

function AdminSupportRequests() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyTicket, setReplyTicket] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");

    const [tickets, setTickets] = useState([
        {
            id: "NIY-1048",
            user: "Shreya Nazre",
            email: "shreya.nazre@example.com",
            subject: "Unable to update profile photo",
            category: "Profile",
            priority: "High",
            status: "Open",
            assignedTo: "Super Admin",
            created: "18 Aug 2026",
            time: "10:42 AM",
            description:
                "The user is unable to upload a new profile photo after completing profile verification.",
            lastReply: "No reply yet",
        },
        {
            id: "NIY-1047",
            user: "Gayathri Krishnagiri",
            email: "gayathri.k@example.com",
            subject: "Membership payment not reflected",
            category: "Payments",
            priority: "High",
            status: "In Progress",
            assignedTo: "Rahul",
            created: "18 Aug 2026",
            time: "09:18 AM",
            description:
                "The user completed a membership payment but the upgraded membership is not showing on the account.",
            lastReply: "18 Aug 2026",
        },
        {
            id: "NIY-1046",
            user: "Surabhi Pessy",
            email: "surabhi.p@example.com",
            subject: "Cannot send interest request",
            category: "Matches",
            priority: "Medium",
            status: "Open",
            assignedTo: "Priya",
            created: "17 Aug 2026",
            time: "04:36 PM",
            description:
                "The user receives an error when attempting to send an interest request to another profile.",
            lastReply: "No reply yet",
        },
        {
            id: "NIY-1045",
            user: "Aditi Siddi",
            email: "aditi.s@example.com",
            subject: "Profile verification query",
            category: "Verification",
            priority: "Medium",
            status: "Resolved",
            assignedTo: "Rahul",
            created: "17 Aug 2026",
            time: "01:15 PM",
            description:
                "The user wanted clarification regarding the documents required for profile verification.",
            lastReply: "17 Aug 2026",
        },
        {
            id: "NIY-1044",
            user: "Anjali P",
            email: "anjali.p@example.com",
            subject: "Login issue after password reset",
            category: "Account",
            priority: "High",
            status: "In Progress",
            assignedTo: "Super Admin",
            created: "16 Aug 2026",
            time: "06:28 PM",
            description:
                "The user successfully reset the password but cannot log in with the new credentials.",
            lastReply: "17 Aug 2026",
        },
        {
            id: "NIY-1043",
            user: "Meera Sharma",
            email: "meera.sharma@example.com",
            subject: "Report suspicious profile",
            category: "Safety",
            priority: "Urgent",
            status: "Open",
            assignedTo: "Super Admin",
            created: "16 Aug 2026",
            time: "03:04 PM",
            description:
                "The user has reported a suspicious profile and requested an immediate review.",
            lastReply: "No reply yet",
        },
        {
            id: "NIY-1042",
            user: "Kavya R",
            email: "kavya.r@example.com",
            subject: "Notification preferences",
            category: "Notifications",
            priority: "Low",
            status: "Resolved",
            assignedTo: "Priya",
            created: "15 Aug 2026",
            time: "11:22 AM",
            description:
                "The user wanted to understand how notification preferences can be changed.",
            lastReply: "15 Aug 2026",
        },
    ]);

    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {
            const search = searchTerm.toLowerCase();

            const matchesSearch =
                ticket.id.toLowerCase().includes(search) ||
                ticket.user.toLowerCase().includes(search) ||
                ticket.subject.toLowerCase().includes(search) ||
                ticket.category.toLowerCase().includes(search);

            const matchesStatus =
                statusFilter === "All" || ticket.status === statusFilter;

            const matchesPriority =
                priorityFilter === "All" ||
                ticket.priority === priorityFilter;

            const matchesCategory =
                categoryFilter === "All" ||
                ticket.category === categoryFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesCategory
            );
        });
    }, [
        tickets,
        searchTerm,
        statusFilter,
        priorityFilter,
        categoryFilter,
    ]);

    const totalTickets = tickets.length;
    const openTickets = tickets.filter(
        (ticket) => ticket.status === "Open"
    ).length;
    const inProgressTickets = tickets.filter(
        (ticket) => ticket.status === "In Progress"
    ).length;
    const resolvedTickets = tickets.filter(
        (ticket) => ticket.status === "Resolved"
    ).length;

    const updateTicketStatus = (ticketId, newStatus) => {
        setTickets((currentTickets) =>
            currentTickets.map((ticket) =>
                ticket.id === ticketId
                    ? {
                          ...ticket,
                          status: newStatus,
                          lastReply:
                              newStatus === "Resolved"
                                  ? "Just now"
                                  : ticket.lastReply,
                      }
                    : ticket
            )
        );

        if (selectedTicket?.id === ticketId) {
            setSelectedTicket((current) => ({
                ...current,
                status: newStatus,
            }));
        }
    };

    const handleReply = () => {
        if (!replyMessage.trim()) return;

        setTickets((currentTickets) =>
            currentTickets.map((ticket) =>
                ticket.id === replyTicket.id
                    ? {
                          ...ticket,
                          status: "In Progress",
                          lastReply: "Just now",
                      }
                    : ticket
            )
        );

        setReplyMessage("");
        setReplyTicket(null);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("All");
        setPriorityFilter("All");
        setCategoryFilter("All");
    };

    return (
        <div className="admin-support-page">

            {/* ================= HEADER ================= */}

            <div className="support-page-header">

                <div>
                    <div className="support-breadcrumb">
                        Admin <span>/</span> Support Requests
                    </div>

                    <h1>Support Requests</h1>

                    <p>
                        Manage member questions, complaints and support
                        requests from one place.
                    </p>
                </div>

                <div className="support-header-actions">

                    <button
                        className="support-back-btn"
                        onClick={() => navigate("/admin")}
                    >
                        ← Dashboard
                    </button>

                    <button
                        className="support-new-btn"
                        onClick={() => {
                            setSelectedTicket({
                                id: "NEW",
                                user: "New Support Request",
                                email: "support@niyati.com",
                                subject: "Create a support request",
                                category: "General",
                                priority: "Medium",
                                status: "Open",
                                assignedTo: "Unassigned",
                                created: "18 Aug 2026",
                                time: "Now",
                                description:
                                    "Create a new internal support request.",
                                lastReply: "No reply yet",
                            });
                        }}
                    >
                        <span>＋</span>
                        New Request
                    </button>

                </div>

            </div>


            {/* ================= SUMMARY ================= */}

            <div className="support-summary-grid">

                <div className="support-summary-card">
                    <div className="support-summary-icon total">
                        ▤
                    </div>

                    <div>
                        <span>Total Requests</span>
                        <strong>{totalTickets}</strong>
                        <small>All support tickets</small>
                    </div>
                </div>


                <div className="support-summary-card">
                    <div className="support-summary-icon open">
                        !
                    </div>

                    <div>
                        <span>Open</span>
                        <strong>{openTickets}</strong>
                        <small>Need attention</small>
                    </div>
                </div>


                <div className="support-summary-card">
                    <div className="support-summary-icon progress">
                        ◷
                    </div>

                    <div>
                        <span>In Progress</span>
                        <strong>{inProgressTickets}</strong>
                        <small>Being handled</small>
                    </div>
                </div>


                <div className="support-summary-card">
                    <div className="support-summary-icon resolved">
                        ✓
                    </div>

                    <div>
                        <span>Resolved</span>
                        <strong>{resolvedTickets}</strong>
                        <small>Successfully closed</small>
                    </div>
                </div>

            </div>


            {/* ================= MAIN REQUEST SECTION ================= */}

            <section className="support-section">

                <div className="support-section-header">

                    <div>
                        <h2>All Support Requests</h2>
                        <p>
                            Review and manage requests submitted by Niyati
                            members.
                        </p>
                    </div>

                    <div className="support-request-count">
                        {filteredTickets.length} Requests
                    </div>

                </div>


                {/* ================= TOOLBAR ================= */}

                <div className="support-toolbar">

                    <div className="support-search-box">

                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search by ticket, member or subject..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="support-clear-search"
                            >
                                ×
                            </button>
                        )}

                    </div>


                    <div className="support-filters">

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <option value="All">All Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">
                                In Progress
                            </option>
                            <option value="Resolved">Resolved</option>
                        </select>


                        <select
                            value={priorityFilter}
                            onChange={(e) =>
                                setPriorityFilter(e.target.value)
                            }
                        >
                            <option value="All">All Priority</option>
                            <option value="Urgent">Urgent</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>


                        <select
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(e.target.value)
                            }
                        >
                            <option value="All">All Categories</option>
                            <option value="Profile">Profile</option>
                            <option value="Payments">Payments</option>
                            <option value="Matches">Matches</option>
                            <option value="Verification">
                                Verification
                            </option>
                            <option value="Account">Account</option>
                            <option value="Safety">Safety</option>
                            <option value="Notifications">
                                Notifications
                            </option>
                        </select>


                        <button
                            className="support-reset-btn"
                            onClick={clearFilters}
                        >
                            Reset
                        </button>

                    </div>

                </div>


                {/* ================= TABLE ================= */}

                <div className="support-table-wrapper">

                    <table className="support-table">

                        <thead>
                            <tr>
                                <th>REQUEST</th>
                                <th>MEMBER</th>
                                <th>CATEGORY</th>
                                <th>PRIORITY</th>
                                <th>ASSIGNED TO</th>
                                <th>STATUS</th>
                                <th>CREATED</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>


                        <tbody>

                            {filteredTickets.length > 0 ? (
                                filteredTickets.map((ticket) => (
                                    <tr key={ticket.id}>

                                        <td>
                                            <div className="support-request-info">

                                                <strong>
                                                    {ticket.subject}
                                                </strong>

                                                <span>
                                                    #{ticket.id}
                                                </span>

                                            </div>
                                        </td>


                                        <td>
                                            <div className="support-member">

                                                <div className="support-avatar">
                                                    {ticket.user
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {ticket.user}
                                                    </strong>

                                                    <span>
                                                        {ticket.email}
                                                    </span>
                                                </div>

                                            </div>
                                        </td>


                                        <td>
                                            <span className="support-category">
                                                {ticket.category}
                                            </span>
                                        </td>


                                        <td>
                                            <span
                                                className={`support-priority ${ticket.priority
                                                    .toLowerCase()
                                                    .replace(" ", "-")}`}
                                            >
                                                <i></i>
                                                {ticket.priority}
                                            </span>
                                        </td>


                                        <td>
                                            <span className="support-assigned">
                                                {ticket.assignedTo}
                                            </span>
                                        </td>


                                        <td>
                                            <span
                                                className={`support-status ${ticket.status
                                                    .toLowerCase()
                                                    .replace(" ", "-")}`}
                                            >
                                                <i></i>
                                                {ticket.status}
                                            </span>
                                        </td>


                                        <td>
                                            <div className="support-created">
                                                <strong>
                                                    {ticket.created}
                                                </strong>
                                                <span>
                                                    {ticket.time}
                                                </span>
                                            </div>
                                        </td>


                                        <td>

                                            <div className="support-actions">

                                                <button
                                                    title="View request"
                                                    onClick={() =>
                                                        setSelectedTicket(
                                                            ticket
                                                        )
                                                    }
                                                >
                                                    ◉
                                                </button>

                                                <button
                                                    title="Reply"
                                                    onClick={() =>
                                                        setReplyTicket(ticket)
                                                    }
                                                >
                                                    ↗
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">

                                        <div className="support-empty">

                                            <div>
                                                ⌕
                                            </div>

                                            <h3>
                                                No support requests found
                                            </h3>

                                            <p>
                                                Try changing your search or
                                                filters.
                                            </p>

                                        </div>

                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

            </section>


            {/* ================= LOWER INFORMATION ================= */}

            <div className="support-lower-grid">

                <section className="support-info-card">

                    <div className="support-card-heading">
                        <div>
                            <h2>Support Categories</h2>
                            <p>
                                Common areas where members need assistance.
                            </p>
                        </div>
                    </div>


                    <div className="support-category-list">

                        <div>
                            <span className="category-circle profile">
                                ◇
                            </span>
                            <div>
                                <strong>Profile & Verification</strong>
                                <span>
                                    Profile edits, photos and verification
                                </span>
                            </div>
                            <b>24</b>
                        </div>


                        <div>
                            <span className="category-circle payment">
                                ₹
                            </span>
                            <div>
                                <strong>Membership & Payments</strong>
                                <span>
                                    Plans, payments and subscriptions
                                </span>
                            </div>
                            <b>18</b>
                        </div>


                        <div>
                            <span className="category-circle safety">
                                !
                            </span>
                            <div>
                                <strong>Safety & Reports</strong>
                                <span>
                                    Suspicious profiles and complaints
                                </span>
                            </div>
                            <b>11</b>
                        </div>


                        <div>
                            <span className="category-circle account">
                                ♙
                            </span>
                            <div>
                                <strong>Account & Login</strong>
                                <span>
                                    Registration and account access
                                </span>
                            </div>
                            <b>9</b>
                        </div>

                    </div>

                </section>


                <section className="support-info-card">

                    <div className="support-card-heading">

                        <div>
                            <h2>Support Performance</h2>
                            <p>
                                Current support team overview.
                            </p>
                        </div>

                    </div>


                    <div className="support-performance">

                        <div className="performance-item">
                            <span>First Response Time</span>
                            <strong>2h 18m</strong>
                        </div>

                        <div className="performance-item">
                            <span>Resolution Rate</span>
                            <strong>86%</strong>
                        </div>

                        <div className="performance-item">
                            <span>Customer Satisfaction</span>
                            <strong>94%</strong>
                        </div>

                        <div className="performance-item">
                            <span>Requests This Month</span>
                            <strong>128</strong>
                        </div>

                    </div>

                </section>

            </div>


            {/* ================= VIEW MODAL ================= */}

            {selectedTicket && (
                <div
                    className="support-modal-overlay"
                    onClick={() => setSelectedTicket(null)}
                >

                    <div
                        className="support-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="support-modal-header">

                            <div>
                                <span>SUPPORT REQUEST</span>

                                <h2>
                                    {selectedTicket.subject}
                                </h2>

                                <p>
                                    #{selectedTicket.id}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedTicket(null)}
                            >
                                ×
                            </button>

                        </div>


                        <div className="support-modal-user">

                            <div className="support-modal-avatar">
                                {selectedTicket.user
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>
                                <strong>
                                    {selectedTicket.user}
                                </strong>

                                <span>
                                    {selectedTicket.email}
                                </span>
                            </div>

                        </div>


                        <div className="support-detail-grid">

                            <div>
                                <span>Category</span>
                                <strong>
                                    {selectedTicket.category}
                                </strong>
                            </div>

                            <div>
                                <span>Priority</span>
                                <strong>
                                    {selectedTicket.priority}
                                </strong>
                            </div>

                            <div>
                                <span>Assigned To</span>
                                <strong>
                                    {selectedTicket.assignedTo}
                                </strong>
                            </div>

                            <div>
                                <span>Created</span>
                                <strong>
                                    {selectedTicket.created}
                                </strong>
                            </div>

                        </div>


                        <div className="support-description">

                            <span>REQUEST DETAILS</span>

                            <p>
                                {selectedTicket.description}
                            </p>

                        </div>


                        <div className="support-status-control">

                            <label>
                                Update Status
                            </label>

                            <select
                                value={selectedTicket.status}
                                onChange={(e) =>
                                    updateTicketStatus(
                                        selectedTicket.id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">
                                    In Progress
                                </option>
                                <option value="Resolved">
                                    Resolved
                                </option>
                            </select>

                        </div>


                        <div className="support-modal-actions">

                            <button
                                className="modal-secondary-btn"
                                onClick={() => setSelectedTicket(null)}
                            >
                                Close
                            </button>

                            <button
                                className="modal-primary-btn"
                                onClick={() => {
                                    setReplyTicket(selectedTicket);
                                    setSelectedTicket(null);
                                }}
                            >
                                Reply to Member
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* ================= REPLY MODAL ================= */}

            {replyTicket && (
                <div
                    className="support-modal-overlay"
                    onClick={() => setReplyTicket(null)}
                >

                    <div
                        className="support-reply-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="support-modal-header">

                            <div>
                                <span>REPLY TO MEMBER</span>

                                <h2>
                                    {replyTicket.user}
                                </h2>

                                <p>
                                    {replyTicket.subject}
                                </p>
                            </div>

                            <button
                                onClick={() => setReplyTicket(null)}
                            >
                                ×
                            </button>

                        </div>


                        <div className="reply-recipient">
                            <span>To</span>
                            <strong>
                                {replyTicket.email}
                            </strong>
                        </div>


                        <textarea
                            value={replyMessage}
                            onChange={(e) =>
                                setReplyMessage(e.target.value)
                            }
                            placeholder="Write your response to the member..."
                        />


                        <div className="reply-note">
                            <span>i</span>
                            The request will automatically move to
                            <strong> In Progress </strong>
                            when you reply.
                        </div>


                        <div className="support-modal-actions">

                            <button
                                className="modal-secondary-btn"
                                onClick={() => setReplyTicket(null)}
                            >
                                Cancel
                            </button>

                            <button
                                className="modal-primary-btn"
                                onClick={handleReply}
                            >
                                Send Reply
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default AdminSupportRequests;