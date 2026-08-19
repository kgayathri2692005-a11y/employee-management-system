import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import "../styles/AdminNotifications.css";

function AdminNotifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New Match Available",
            message:
                "You have a new profile that matches your partner preferences.",
            type: "Match Updates",
            audience: "All Users",
            date: "18 Aug 2026",
            time: "10:30 AM",
            status: "Sent",
            priority: "Normal",
            delivered: 1248,
            read: 892,
        },
        {
            id: 2,
            title: "New Interest Request",
            message:
                "You have received a new interest request from another member.",
            type: "Interest",
            audience: "Female Users",
            date: "18 Aug 2026",
            time: "09:45 AM",
            status: "Sent",
            priority: "High",
            delivered: 486,
            read: 341,
        },
        {
            id: 3,
            title: "Scheduled Maintenance",
            message:
                "Niyati services will undergo scheduled maintenance this weekend.",
            type: "System",
            audience: "All Users",
            date: "20 Aug 2026",
            time: "11:00 PM",
            status: "Scheduled",
            priority: "High",
            delivered: 0,
            read: 0,
        },
        {
            id: 4,
            title: "Premium Membership Offer",
            message:
                "Enjoy exclusive benefits with our premium membership plans.",
            type: "Membership",
            audience: "Premium Members",
            date: "17 Aug 2026",
            time: "04:00 PM",
            status: "Draft",
            priority: "Normal",
            delivered: 0,
            read: 0,
        },
        {
            id: 5,
            title: "Complete Your Profile",
            message:
                "Complete your profile to improve your chances of finding a meaningful match.",
            type: "Profile Updates",
            audience: "New Users",
            date: "17 Aug 2026",
            time: "01:20 PM",
            status: "Sent",
            priority: "Normal",
            delivered: 318,
            read: 244,
        },
        {
            id: 6,
            title: "Important Security Alert",
            message:
                "Please review your account security settings and keep your information safe.",
            type: "Security",
            audience: "All Users",
            date: "16 Aug 2026",
            time: "08:15 AM",
            status: "Sent",
            priority: "High",
            delivered: 1248,
            read: 1117,
        },
        {
            id: 7,
            title: "Niyati Success Story",
            message:
                "Read the inspiring story of another Niyati couple who found their partner.",
            type: "Success Stories",
            audience: "All Users",
            date: "15 Aug 2026",
            time: "06:30 PM",
            status: "Sent",
            priority: "Normal",
            delivered: 1189,
            read: 764,
        },
        {
            id: 8,
            title: "Welcome to Niyati",
            message:
                "Welcome to Niyati Matrimony. Start discovering meaningful connections today.",
            type: "System",
            audience: "New Users",
            date: "14 Aug 2026",
            time: "10:00 AM",
            status: "Failed",
            priority: "Normal",
            delivered: 82,
            read: 51,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [audienceFilter, setAudienceFilter] = useState("All Audiences");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const [editingId, setEditingId] = useState(null);

    const [openActionId, setOpenActionId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 5;

    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: "System",
        audience: "All Users",
        priority: "Normal",
        delivery: "Send Now",
        scheduleDate: "",
        scheduleTime: "",
    });

    const filteredNotifications = useMemo(() => {
        return notifications.filter((notification) => {
            const search = searchTerm.toLowerCase();

            const matchesSearch =
                notification.title.toLowerCase().includes(search) ||
                notification.message.toLowerCase().includes(search) ||
                notification.type.toLowerCase().includes(search);

            const matchesType =
                typeFilter === "All Types" ||
                notification.type === typeFilter;

            const matchesStatus =
                statusFilter === "All Status" ||
                notification.status === statusFilter;

            const matchesAudience =
                audienceFilter === "All Audiences" ||
                notification.audience === audienceFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesStatus &&
                matchesAudience
            );
        });
    }, [
        notifications,
        searchTerm,
        typeFilter,
        statusFilter,
        audienceFilter,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredNotifications.length / notificationsPerPage)
    );

    const startIndex = (currentPage - 1) * notificationsPerPage;

    const currentNotifications = filteredNotifications.slice(
        startIndex,
        startIndex + notificationsPerPage
    );

    const totalSent = notifications.filter(
        (item) => item.status === "Sent"
    ).length;

    const scheduledCount = notifications.filter(
        (item) => item.status === "Scheduled"
    ).length;

    const draftCount = notifications.filter(
        (item) => item.status === "Draft"
    ).length;

    const failedCount = notifications.filter(
        (item) => item.status === "Failed"
    ).length;

    const deliveredCount = notifications.reduce(
        (total, item) => total + item.delivered,
        0
    );

    const readCount = notifications.reduce(
        (total, item) => total + item.read,
        0
    );

    const handleFilterChange = (setter, value) => {
        setter(value);
        setCurrentPage(1);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            message: "",
            type: "System",
            audience: "All Users",
            priority: "Normal",
            delivery: "Send Now",
            scheduleDate: "",
            scheduleTime: "",
        });

        setEditingId(null);
    };

    const openCreateModal = () => {
        resetForm();
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
        resetForm();
    };

    const handleSubmitNotification = (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.message.trim()) {
            toast.error("Please enter notification title and message.");
            return;
        }

        if (
            formData.delivery === "Schedule" &&
            (!formData.scheduleDate || !formData.scheduleTime)
        ) {
            toast.error("Please select schedule date and time.");
            return;
        }

        if (editingId) {
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === editingId
                        ? {
                              ...notification,
                              title: formData.title,
                              message: formData.message,
                              type: formData.type,
                              audience: formData.audience,
                              priority: formData.priority,
                              status:
                                  formData.delivery === "Schedule"
                                      ? "Scheduled"
                                      : "Sent",
                              date:
                                  formData.delivery === "Schedule"
                                      ? formData.scheduleDate
                                      : "18 Aug 2026",
                              time:
                                  formData.delivery === "Schedule"
                                      ? formData.scheduleTime
                                      : "Just now",
                          }
                        : notification
                )
            );

            toast.success("Notification updated successfully.");
        } else {
            const newNotification = {
                id: Date.now(),
                title: formData.title,
                message: formData.message,
                type: formData.type,
                audience: formData.audience,
                priority: formData.priority,
                status:
                    formData.delivery === "Schedule"
                        ? "Scheduled"
                        : "Sent",
                date:
                    formData.delivery === "Schedule"
                        ? formData.scheduleDate
                        : "18 Aug 2026",
                time:
                    formData.delivery === "Schedule"
                        ? formData.scheduleTime
                        : "Just now",
                delivered:
                    formData.delivery === "Schedule"
                        ? 0
                        : 1248,
                read:
                    formData.delivery === "Schedule"
                        ? 0
                        : 0,
            };

            setNotifications((prev) => [
                newNotification,
                ...prev,
            ]);

            toast.success(
                formData.delivery === "Schedule"
                    ? "Notification scheduled successfully."
                    : "Notification sent successfully."
            );
        }

        closeCreateModal();
    };

    const handleView = (notification) => {
        setSelectedNotification(notification);
        setShowViewModal(true);
        setOpenActionId(null);
    };

    const handleEdit = (notification) => {
        setEditingId(notification.id);

        setFormData({
            title: notification.title,
            message: notification.message,
            type: notification.type,
            audience: notification.audience,
            priority: notification.priority,
            delivery:
                notification.status === "Scheduled"
                    ? "Schedule"
                    : "Send Now",
            scheduleDate:
                notification.status === "Scheduled"
                    ? notification.date
                    : "",
            scheduleTime:
                notification.status === "Scheduled"
                    ? notification.time
                    : "",
        });

        setShowCreateModal(true);
        setOpenActionId(null);
    };

    const handleDuplicate = (notification) => {
        const duplicate = {
            ...notification,
            id: Date.now(),
            title: `${notification.title} - Copy`,
            status: "Draft",
            date: "18 Aug 2026",
            time: "Not sent",
            delivered: 0,
            read: 0,
        };

        setNotifications((prev) => [
            duplicate,
            ...prev,
        ]);

        toast.success("Notification duplicated as draft.");
        setOpenActionId(null);
    };

    const handleResend = (notification) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === notification.id
                    ? {
                          ...item,
                          status: "Sent",
                          date: "18 Aug 2026",
                          time: "Just now",
                          delivered: 1248,
                      }
                    : item
            )
        );

        toast.success("Notification sent again.");
        setOpenActionId(null);
    };

    const handleDelete = (notification) => {
        const confirmed = window.confirm(
            `Delete "${notification.title}"?`
        );

        if (!confirmed) return;

        setNotifications((prev) =>
            prev.filter((item) => item.id !== notification.id)
        );

        toast.success("Notification deleted.");
        setOpenActionId(null);

        if (
            currentPage > 1 &&
            currentNotifications.length === 1
        ) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setTypeFilter("All Types");
        setStatusFilter("All Status");
        setAudienceFilter("All Audiences");
        setCurrentPage(1);
    };

    return (
        <div className="admin-notifications-page">

            {/* ================= HEADER ================= */}

            <div className="notifications-header">

                <div>
                    <div className="notifications-breadcrumb">
                        Admin
                        <span>/</span>
                        Notifications
                    </div>

                    <h1>Notification Management</h1>

                    <p>
                        Create, manage and monitor notifications sent
                        to Niyati members.
                    </p>
                </div>

                <button
                    className="create-notification-btn"
                    onClick={openCreateModal}
                >
                    <span>＋</span>
                    Create Notification
                </button>

            </div>


            {/* ================= SUMMARY CARDS ================= */}

            <div className="notification-summary-grid">

                <div className="notification-summary-card">

                    <div className="notification-summary-icon sent-icon">
                        ✓
                    </div>

                    <div>
                        <span>Total Sent</span>
                        <strong>{totalSent}</strong>
                        <small>Successful campaigns</small>
                    </div>

                </div>


                <div className="notification-summary-card">

                    <div className="notification-summary-icon scheduled-icon">
                        ◷
                    </div>

                    <div>
                        <span>Scheduled</span>
                        <strong>{scheduledCount}</strong>
                        <small>Upcoming notifications</small>
                    </div>

                </div>


                <div className="notification-summary-card">

                    <div className="notification-summary-icon draft-icon">
                        ✎
                    </div>

                    <div>
                        <span>Drafts</span>
                        <strong>{draftCount}</strong>
                        <small>Waiting to be sent</small>
                    </div>

                </div>


                <div className="notification-summary-card">

                    <div className="notification-summary-icon failed-icon">
                        !
                    </div>

                    <div>
                        <span>Failed</span>
                        <strong>{failedCount}</strong>
                        <small>Need attention</small>
                    </div>

                </div>

            </div>


            {/* ================= MAIN MANAGEMENT SECTION ================= */}

            <section className="notification-section">

                <div className="notification-section-header">

                    <div>
                        <h2>Notifications</h2>

                        <p>
                            View and manage all system notifications.
                        </p>
                    </div>

                    <div className="notification-count">
                        {filteredNotifications.length} Notifications
                    </div>

                </div>


                {/* ================= TOOLBAR ================= */}

                <div className="notification-toolbar">

                    <div className="notification-search">

                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                        {searchTerm && (
                            <button
                                className="clear-notification-search"
                                onClick={() => {
                                    setSearchTerm("");
                                    setCurrentPage(1);
                                }}
                            >
                                ×
                            </button>
                        )}

                    </div>


                    <div className="notification-filters">

                        <select
                            value={typeFilter}
                            onChange={(e) =>
                                handleFilterChange(
                                    setTypeFilter,
                                    e.target.value
                                )
                            }
                        >
                            <option>All Types</option>
                            <option>Match Updates</option>
                            <option>Interest</option>
                            <option>Profile Updates</option>
                            <option>Membership</option>
                            <option>Success Stories</option>
                            <option>System</option>
                            <option>Security</option>
                        </select>


                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                handleFilterChange(
                                    setStatusFilter,
                                    e.target.value
                                )
                            }
                        >
                            <option>All Status</option>
                            <option>Sent</option>
                            <option>Scheduled</option>
                            <option>Draft</option>
                            <option>Failed</option>
                        </select>


                        <select
                            value={audienceFilter}
                            onChange={(e) =>
                                handleFilterChange(
                                    setAudienceFilter,
                                    e.target.value
                                )
                            }
                        >
                            <option>All Audiences</option>
                            <option>All Users</option>
                            <option>Female Users</option>
                            <option>Male Users</option>
                            <option>Premium Members</option>
                            <option>New Users</option>
                        </select>


                        {(searchTerm ||
                            typeFilter !== "All Types" ||
                            statusFilter !== "All Status" ||
                            audienceFilter !== "All Audiences") && (
                            <button
                                className="clear-filters-btn"
                                onClick={clearFilters}
                            >
                                Clear
                            </button>
                        )}

                    </div>

                </div>


                {/* ================= TABLE ================= */}

                <div className="notification-table-wrapper">

                    <table className="notification-table">

                        <thead>
                            <tr>
                                <th>NOTIFICATION</th>
                                <th>TYPE</th>
                                <th>AUDIENCE</th>
                                <th>DATE & TIME</th>
                                <th>STATUS</th>
                                <th>PRIORITY</th>
                                <th></th>
                            </tr>
                        </thead>


                        <tbody>

                            {currentNotifications.length > 0 ? (
                                currentNotifications.map(
                                    (notification) => (
                                        <tr key={notification.id}>

                                            <td>
                                                <div className="notification-person">

                                                    <div
                                                        className={`notification-type-icon ${notification.type
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )}`}
                                                    >
                                                        {notification.type ===
                                                            "Match Updates"
                                                            ? "♡"
                                                            : notification.type ===
                                                              "Interest"
                                                            ? "♥"
                                                            : notification.type ===
                                                              "Membership"
                                                            ? "★"
                                                            : notification.type ===
                                                              "Security"
                                                            ? "!"
                                                            : notification.type ===
                                                              "Success Stories"
                                                            ? "✦"
                                                            : notification.type ===
                                                              "Profile Updates"
                                                            ? "♙"
                                                            : "◆"}
                                                    </div>


                                                    <div className="notification-person-info">

                                                        <strong>
                                                            {notification.title}
                                                        </strong>

                                                        <span>
                                                            {notification.message}
                                                        </span>

                                                    </div>

                                                </div>
                                            </td>


                                            <td>
                                                <span className="notification-type-text">
                                                    {notification.type}
                                                </span>
                                            </td>


                                            <td>
                                                <span className="notification-audience">
                                                    {notification.audience}
                                                </span>
                                            </td>


                                            <td>
                                                <div className="notification-date">

                                                    <strong>
                                                        {notification.date}
                                                    </strong>

                                                    <span>
                                                        {notification.time}
                                                    </span>

                                                </div>
                                            </td>


                                            <td>

                                                <span
                                                    className={`notification-status status-${notification.status.toLowerCase()}`}
                                                >
                                                    <span className="notification-status-dot"></span>
                                                    {notification.status}
                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={`notification-priority priority-${notification.priority.toLowerCase()}`}
                                                >
                                                    {notification.priority}
                                                </span>

                                            </td>


                                            <td className="notification-action-cell">

                                                <button
                                                    className="notification-more-btn"
                                                    onClick={() =>
                                                        setOpenActionId(
                                                            openActionId ===
                                                                notification.id
                                                                ? null
                                                                : notification.id
                                                        )
                                                    }
                                                >
                                                    ⋮
                                                </button>


                                                {openActionId ===
                                                    notification.id && (
                                                    <div className="notification-action-menu">

                                                        <button
                                                            onClick={() =>
                                                                handleView(
                                                                    notification
                                                                )
                                                            }
                                                        >
                                                            <span>◉</span>
                                                            View
                                                        </button>


                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    notification
                                                                )
                                                            }
                                                        >
                                                            <span>✎</span>
                                                            Edit
                                                        </button>


                                                        <button
                                                            onClick={() =>
                                                                handleDuplicate(
                                                                    notification
                                                                )
                                                            }
                                                        >
                                                            <span>⧉</span>
                                                            Duplicate
                                                        </button>


                                                        {notification.status !==
                                                            "Draft" && (
                                                            <button
                                                                onClick={() =>
                                                                    handleResend(
                                                                        notification
                                                                    )
                                                                }
                                                            >
                                                                <span>↻</span>
                                                                Resend
                                                            </button>
                                                        )}


                                                        <button
                                                            className="danger-notification-action"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    notification
                                                                )
                                                            }
                                                        >
                                                            <span>⌫</span>
                                                            Delete
                                                        </button>

                                                    </div>
                                                )}

                                            </td>

                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="notification-empty-cell"
                                    >
                                        <div className="notification-empty-state">
                                            <div>♢</div>
                                            <h3>No notifications found</h3>
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


                {/* ================= PAGINATION ================= */}

                {filteredNotifications.length > 0 && (
                    <div className="notification-pagination">

                        <span>
                            Showing{" "}
                            <strong>
                                {startIndex + 1}
                            </strong>{" "}
                            to{" "}
                            <strong>
                                {Math.min(
                                    startIndex +
                                        notificationsPerPage,
                                    filteredNotifications.length
                                )}
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {filteredNotifications.length}
                            </strong>
                        </span>


                        <div className="notification-pagination-buttons">

                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(
                                        (prev) => prev - 1
                                    )
                                }
                            >
                                ‹
                            </button>


                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    className={
                                        currentPage === page
                                            ? "pagination-active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setCurrentPage(page)
                                    }
                                >
                                    {page}
                                </button>
                            ))}


                            <button
                                disabled={
                                    currentPage === totalPages
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        (prev) => prev + 1
                                    )
                                }
                            >
                                ›
                            </button>

                        </div>

                    </div>
                )}

            </section>


            {/* ================= LOWER GRID ================= */}

            <div className="notification-lower-grid">

                {/* Recent Activity */}

                <section className="notification-section activity-notification-section">

                    <div className="notification-section-header">

                        <div>
                            <h2>Recent Activity</h2>

                            <p>
                                Latest notification activity.
                            </p>
                        </div>

                        <button className="notification-text-btn">
                            View All
                        </button>

                    </div>


                    <div className="notification-activity-list">

                        <div className="notification-activity-item">

                            <div className="notification-activity-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Notification sent successfully
                                </strong>

                                <p>
                                    New Match Available was sent to all
                                    users.
                                </p>

                                <span>
                                    15 minutes ago
                                </span>
                            </div>

                        </div>


                        <div className="notification-activity-item">

                            <div className="notification-activity-icon orange">
                                ◷
                            </div>

                            <div>
                                <strong>
                                    Notification scheduled
                                </strong>

                                <p>
                                    Scheduled Maintenance is planned for
                                    20 Aug.
                                </p>

                                <span>
                                    1 hour ago
                                </span>
                            </div>

                        </div>


                        <div className="notification-activity-item">

                            <div className="notification-activity-icon maroon">
                                ✎
                            </div>

                            <div>
                                <strong>
                                    Draft notification created
                                </strong>

                                <p>
                                    Premium Membership Offer is waiting
                                    for approval.
                                </p>

                                <span>
                                    2 hours ago
                                </span>
                            </div>

                        </div>

                    </div>

                </section>


                {/* Statistics */}

                <section className="notification-section notification-statistics-section">

                    <div className="notification-section-header">

                        <div>
                            <h2>Notification Statistics</h2>

                            <p>
                                Overall delivery performance.
                            </p>
                        </div>

                    </div>


                    <div className="notification-statistics-list">

                        <div className="notification-stat-row">

                            <div className="notification-stat-left">
                                <span className="stat-small-icon">
                                    ✓
                                </span>

                                <div>
                                    <strong>Delivered</strong>
                                    <span>Successfully delivered</span>
                                </div>
                            </div>

                            <strong className="notification-stat-value">
                                {deliveredCount.toLocaleString()}
                            </strong>

                        </div>


                        <div className="notification-stat-row">

                            <div className="notification-stat-left">
                                <span className="stat-small-icon read-stat">
                                    ◉
                                </span>

                                <div>
                                    <strong>Read</strong>
                                    <span>Users opened notification</span>
                                </div>
                            </div>

                            <strong className="notification-stat-value">
                                {readCount.toLocaleString()}
                            </strong>

                        </div>


                        <div className="notification-stat-row">

                            <div className="notification-stat-left">
                                <span className="stat-small-icon failed-stat">
                                    !
                                </span>

                                <div>
                                    <strong>Failed</strong>
                                    <span>Delivery needs attention</span>
                                </div>
                            </div>

                            <strong className="notification-stat-value">
                                {failedCount}
                            </strong>

                        </div>

                    </div>

                </section>

            </div>


            {/* ================= CREATE / EDIT MODAL ================= */}

            {showCreateModal && (
                <div
                    className="notification-modal-overlay"
                    onClick={(e) => {
                        if (
                            e.target.className ===
                            "notification-modal-overlay"
                        ) {
                            closeCreateModal();
                        }
                    }}
                >

                    <div className="notification-modal">

                        <div className="notification-modal-header">

                            <div>

                                <span className="notification-modal-eyebrow">
                                    NIYATI ADMINISTRATION
                                </span>

                                <h2>
                                    {editingId
                                        ? "Edit Notification"
                                        : "Create Notification"}
                                </h2>

                                <p>
                                    Send an important message to Niyati
                                    members.
                                </p>

                            </div>


                            <button
                                className="notification-modal-close"
                                onClick={closeCreateModal}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmitNotification}
                        >

                            <div className="notification-form-group">

                                <label>
                                    Notification Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    placeholder="Enter notification title"
                                />

                            </div>


                            <div className="notification-form-group">

                                <label>
                                    Message
                                </label>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleFormChange}
                                    placeholder="Write your notification message..."
                                    rows="4"
                                ></textarea>

                            </div>


                            <div className="notification-form-row">

                                <div className="notification-form-group">

                                    <label>
                                        Notification Type
                                    </label>

                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleFormChange}
                                    >
                                        <option>System</option>
                                        <option>
                                            Match Updates
                                        </option>
                                        <option>Interest</option>
                                        <option>
                                            Profile Updates
                                        </option>
                                        <option>
                                            Membership
                                        </option>
                                        <option>
                                            Success Stories
                                        </option>
                                        <option>Security</option>
                                    </select>

                                </div>


                                <div className="notification-form-group">

                                    <label>
                                        Target Audience
                                    </label>

                                    <select
                                        name="audience"
                                        value={formData.audience}
                                        onChange={handleFormChange}
                                    >
                                        <option>
                                            All Users
                                        </option>
                                        <option>
                                            Male Users
                                        </option>
                                        <option>
                                            Female Users
                                        </option>
                                        <option>
                                            Premium Members
                                        </option>
                                        <option>
                                            New Users
                                        </option>
                                    </select>

                                </div>

                            </div>


                            <div className="notification-form-row">

                                <div className="notification-form-group">

                                    <label>
                                        Priority
                                    </label>

                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleFormChange}
                                    >
                                        <option>
                                            Normal
                                        </option>
                                        <option>
                                            High
                                        </option>
                                    </select>

                                </div>


                                <div className="notification-form-group">

                                    <label>
                                        Delivery
                                    </label>

                                    <select
                                        name="delivery"
                                        value={formData.delivery}
                                        onChange={handleFormChange}
                                    >
                                        <option>
                                            Send Now
                                        </option>
                                        <option>
                                            Schedule
                                        </option>
                                    </select>

                                </div>

                            </div>


                            {formData.delivery ===
                                "Schedule" && (
                                <div className="notification-form-row">

                                    <div className="notification-form-group">

                                        <label>
                                            Schedule Date
                                        </label>

                                        <input
                                            type="date"
                                            name="scheduleDate"
                                            value={
                                                formData.scheduleDate
                                            }
                                            onChange={
                                                handleFormChange
                                            }
                                        />

                                    </div>


                                    <div className="notification-form-group">

                                        <label>
                                            Schedule Time
                                        </label>

                                        <input
                                            type="time"
                                            name="scheduleTime"
                                            value={
                                                formData.scheduleTime
                                            }
                                            onChange={
                                                handleFormChange
                                            }
                                        />

                                    </div>

                                </div>
                            )}


                            <div className="notification-modal-info">

                                <span>i</span>

                                <p>
                                    Notifications should contain clear,
                                    helpful information and avoid
                                    unnecessary promotional messages.
                                </p>

                            </div>


                            <div className="notification-modal-actions">

                                <button
                                    type="button"
                                    className="notification-cancel-btn"
                                    onClick={closeCreateModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="notification-submit-btn"
                                >
                                    {editingId
                                        ? "Save Changes"
                                        : formData.delivery ===
                                          "Schedule"
                                        ? "Schedule Notification"
                                        : "Send Notification"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}


            {/* ================= VIEW MODAL ================= */}

            {showViewModal &&
                selectedNotification && (
                    <div
                        className="notification-modal-overlay"
                        onClick={(e) => {
                            if (
                                e.target.className ===
                                "notification-modal-overlay"
                            ) {
                                setShowViewModal(false);
                            }
                        }}
                    >

                        <div className="notification-modal view-notification-modal">

                            <div className="notification-modal-header">

                                <div>

                                    <span className="notification-modal-eyebrow">
                                        NOTIFICATION DETAILS
                                    </span>

                                    <h2>
                                        {selectedNotification.title}
                                    </h2>

                                    <p>
                                        Notification information and
                                        delivery details.
                                    </p>

                                </div>


                                <button
                                    className="notification-modal-close"
                                    onClick={() =>
                                        setShowViewModal(false)
                                    }
                                >
                                    ×
                                </button>

                            </div>


                            <div className="view-notification-message">

                                <div className="view-notification-icon">
                                    ♡
                                </div>

                                <div>
                                    <span>Message</span>

                                    <p>
                                        {
                                            selectedNotification.message
                                        }
                                    </p>
                                </div>

                            </div>


                            <div className="view-notification-grid">

                                <div>
                                    <span>Type</span>
                                    <strong>
                                        {
                                            selectedNotification.type
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <span>Audience</span>
                                    <strong>
                                        {
                                            selectedNotification.audience
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <span>Status</span>
                                    <strong>
                                        {
                                            selectedNotification.status
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <span>Priority</span>
                                    <strong>
                                        {
                                            selectedNotification.priority
                                        }
                                    </strong>
                                </div>

                                <div>
                                    <span>Delivered</span>
                                    <strong>
                                        {selectedNotification.delivered.toLocaleString()}
                                    </strong>
                                </div>

                                <div>
                                    <span>Read</span>
                                    <strong>
                                        {selectedNotification.read.toLocaleString()}
                                    </strong>
                                </div>

                            </div>


                            <div className="notification-modal-actions">

                                <button
                                    className="notification-cancel-btn"
                                    onClick={() =>
                                        setShowViewModal(false)
                                    }
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

export default AdminNotifications;