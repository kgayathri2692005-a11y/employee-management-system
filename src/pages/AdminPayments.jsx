import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import "../styles/AdminPayments.css";

function AdminPayments() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [planFilter, setPlanFilter] = useState("All");
    const [methodFilter, setMethodFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [refundPayment, setRefundPayment] = useState(null);
const [refundReason, setRefundReason] = useState("");
const [refundAmount, setRefundAmount] = useState("");

    const paymentsPerPage = 5;
    
        const initialPayments  = [
        {
            id: "NYT10245",
            member: "Ananya Rao",
            email: "ananya.rao@example.com",
            plan: "Premium",
            duration: "6 Months",
            method: "UPI",
            amount: 999,
            date: "18 Aug 2026",
            status: "Paid",
            startDate: "18 Aug 2026",
            expiryDate: "18 Feb 2027",
        },
        {
            id: "NYT10244",
            member: "Rahul Kumar",
            email: "rahul.kumar@example.com",
            plan: "Gold",
            duration: "12 Months",
            method: "Card",
            amount: 1499,
            date: "17 Aug 2026",
            status: "Paid",
            startDate: "17 Aug 2026",
            expiryDate: "17 Aug 2027",
        },
        {
            id: "NYT10243",
            member: "Priya Sharma",
            email: "priya.sharma@example.com",
            plan: "Premium",
            duration: "6 Months",
            method: "UPI",
            amount: 999,
            date: "17 Aug 2026",
            status: "Pending",
            startDate: "-",
            expiryDate: "-",
        },
        {
            id: "NYT10242",
            member: "Arjun Menon",
            email: "arjun.menon@example.com",
            plan: "Basic",
            duration: "3 Months",
            method: "Card",
            amount: 499,
            date: "16 Aug 2026",
            status: "Failed",
            startDate: "-",
            expiryDate: "-",
        },
        {
            id: "NYT10241",
            member: "Meera Nair",
            email: "meera.nair@example.com",
            plan: "Premium",
            duration: "6 Months",
            method: "Net Banking",
            amount: 999,
            date: "16 Aug 2026",
            status: "Paid",
            startDate: "16 Aug 2026",
            expiryDate: "16 Feb 2027",
        },
        {
            id: "NYT10240",
            member: "Vikram Singh",
            email: "vikram.singh@example.com",
            plan: "Gold",
            duration: "12 Months",
            method: "UPI",
            amount: 1499,
            date: "15 Aug 2026",
            status: "Refunded",
            startDate: "15 Aug 2026",
            expiryDate: "15 Aug 2027",
        },
        {
            id: "NYT10239",
            member: "Sneha Patel",
            email: "sneha.patel@example.com",
            plan: "Basic",
            duration: "3 Months",
            method: "UPI",
            amount: 499,
            date: "14 Aug 2026",
            status: "Paid",
            startDate: "14 Aug 2026",
            expiryDate: "14 Nov 2026",
        },
        {
            id: "NYT10238",
            member: "Karan Shah",
            email: "karan.shah@example.com",
            plan: "Premium",
            duration: "6 Months",
            method: "Card",
            amount: 999,
            date: "13 Aug 2026",
            status: "Paid",
            startDate: "13 Aug 2026",
            expiryDate: "13 Feb 2027",
        },
        {
            id: "NYT10237",
            member: "Divya Iyer",
            email: "divya.iyer@example.com",
            plan: "Gold",
            duration: "12 Months",
            method: "UPI",
            amount: 1499,
            date: "12 Aug 2026",
            status: "Pending",
            startDate: "-",
            expiryDate: "-",
        },
        {
            id: "NYT10236",
            member: "Aditya Verma",
            email: "aditya.verma@example.com",
            plan: "Premium",
            duration: "6 Months",
            method: "Net Banking",
            amount: 999,
            date: "11 Aug 2026",
            status: "Paid",
            startDate: "11 Aug 2026",
            expiryDate: "11 Feb 2027",
        },
    ];

    const [payments, setPayments] = useState(() => {
    const storedPayments = localStorage.getItem("niyatiPayments");

    if (storedPayments) {
        return JSON.parse(storedPayments);
    }

    localStorage.setItem(
        "niyatiPayments",
        JSON.stringify(initialPayments)
    );

    return initialPayments;
});

    /*
     * ============================================================
     * STATIC PAYMENT DATA
     * Replace this array with real payment/backend data later.
     * ============================================================
     */

    /*
     * ============================================================
     * FILTER PAYMENTS
     * ============================================================
     */

    const filteredPayments = useMemo(() => {
        return payments.filter((payment) => {
            const search = searchTerm.toLowerCase();

            const matchesSearch =
                payment.id.toLowerCase().includes(search) ||
                payment.member.toLowerCase().includes(search) ||
                payment.email.toLowerCase().includes(search);

            const matchesStatus =
                statusFilter === "All" ||
                payment.status === statusFilter;

            const matchesPlan =
                planFilter === "All" ||
                payment.plan === planFilter;

            const matchesMethod =
                methodFilter === "All" ||
                payment.method === methodFilter;

            const matchesDate =
                dateFilter === "All" ||
                (dateFilter === "Recent" &&
                    ["18 Aug 2026", "17 Aug 2026", "16 Aug 2026"].includes(
                        payment.date
                    ));

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPlan &&
                matchesMethod &&
                matchesDate
            );
        });
    }, [
        searchTerm,
        statusFilter,
        planFilter,
        methodFilter,
        dateFilter,
    ]);

    /*
     * ============================================================
     * PAGINATION
     * ============================================================
     */

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPayments.length / paymentsPerPage)
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const startIndex = (safeCurrentPage - 1) * paymentsPerPage;

    const currentPayments = filteredPayments.slice(
        startIndex,
        startIndex + paymentsPerPage
    );

    const changePage = (page) => {
        setCurrentPage(page);
        setOpenMenu(null);
    };

    /*
     * ============================================================
     * FILTER HANDLER
     * ============================================================
     */

    const handleFilterChange = (setter, value) => {
        setter(value);
        setCurrentPage(1);
        setOpenMenu(null);
    };

    /*
     * ============================================================
     * CLEAR FILTERS
     * ============================================================
     */

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("All");
        setPlanFilter("All");
        setMethodFilter("All");
        setDateFilter("All");
        setCurrentPage(1);
    };

    /*
     * ============================================================
     * PAYMENT ACTIONS
     * ============================================================
     */

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setOpenMenu(null);
    };

    const handleViewMember = (payment) => {
        setOpenMenu(null);

        toast.info(`Opening member profile for ${payment.member}`);
    };

    const handleDownloadReceipt = (payment) => {
        setOpenMenu(null);

        toast.success(`Receipt ${payment.id} is ready to download.`);
    };

const handleRefund = (payment) => {
    setOpenMenu(null);

    if (payment.status !== "Paid") {
        toast.warning("Only successful payments can be refunded.");
        return;
    }

    setRefundPayment(payment);
    setRefundAmount(payment.amount);
    setRefundReason("");
};

const processRefund = () => {
    if (!refundPayment) {
        return;
    }

    if (!refundReason.trim()) {
        toast.warning("Please enter a refund reason.");
        return;
    }

    const amount = Number(refundAmount);

    if (!amount || amount <= 0) {
        toast.warning("Enter a valid refund amount.");
        return;
    }

    if (amount > refundPayment.amount) {
        toast.warning("Refund amount cannot exceed the payment amount.");
        return;
    }

    const refundRecord = {
        refundId: `REF${Date.now()}`,
        transactionId: refundPayment.id,
        amount: amount,
        reason: refundReason.trim(),
        date: new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        status: "Completed",
    };

    const updatedPayments = payments.map((payment) => {
        if (payment.id !== refundPayment.id) {
            return payment;
        }

        return {
            ...payment,
            status: "Refunded",
            refundAmount: amount,
            refundReason: refundReason.trim(),
            refundDate: refundRecord.date,
            refundId: refundRecord.refundId,
            refundStatus: "Completed",
            membershipStatus: "Cancelled",
        };
    });

    setPayments(updatedPayments);

    localStorage.setItem(
        "niyatiPayments",
        JSON.stringify(updatedPayments)
    );

    const existingRefunds = JSON.parse(
        localStorage.getItem("niyatiRefunds") || "[]"
    );

    localStorage.setItem(
        "niyatiRefunds",
        JSON.stringify([
            ...existingRefunds,
            refundRecord,
        ])
    );

    setRefundPayment(null);
    setRefundReason("");
    setRefundAmount("");

    toast.success(
        `Refund of ₹${amount.toLocaleString("en-IN")} completed successfully.`
    );
};

    const handleExport = () => {
        toast.success("Payment report export started.");
    };

    /*
     * ============================================================
     * FORMAT CURRENCY
     * ============================================================
     */

    const formatAmount = (amount) => {
        return `₹${amount.toLocaleString("en-IN")}`;
    };

    /*
     * ============================================================
     * STATUS CLASS
     * ============================================================
     */

    const getStatusClass = (status) => {
        switch (status) {
            case "Paid":
                return "payment-status paid";

            case "Pending":
                return "payment-status pending";

            case "Failed":
                return "payment-status failed";

            case "Refunded":
                return "payment-status refunded";

            default:
                return "payment-status";
        }
    };

    /*
     * ============================================================
     * INITIALS
     * ============================================================
     */

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <div className="admin-payments-page">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="payments-page-header">

                <div>
                    <div className="payments-breadcrumb">
                        Admin <span>/</span> Payments
                    </div>

                    <h1>Payments</h1>

                    <p>
                        Manage membership payments, transactions and payment
                        activity.
                    </p>
                </div>

                <button
                    className="export-report-btn"
                    onClick={handleExport}
                >
                    <span>↓</span>
                    Export Report
                </button>

            </div>


            {/* =====================================================
                SUMMARY CARDS
            ===================================================== */}

            <div className="payment-summary-grid">

                <div className="payment-summary-card">

                    <div className="payment-summary-icon revenue-icon">
                        ₹
                    </div>

                    <div className="payment-summary-content">

                        <span>Total Revenue</span>

                        <strong>₹1,24,500</strong>

                        <small className="positive-change">
                            ↑ 12.5% from last month
                        </small>

                    </div>

                </div>


                <div className="payment-summary-card">

                    <div className="payment-summary-icon transaction-icon">
                        #
                    </div>

                    <div className="payment-summary-content">

                        <span>Total Transactions</span>

                        <strong>248</strong>

                        <small>
                            This month
                        </small>

                    </div>

                </div>


                <div className="payment-summary-card">

                    <div className="payment-summary-icon success-icon">
                        ✓
                    </div>

                    <div className="payment-summary-content">

                        <span>Successful Payments</span>

                        <strong>231</strong>

                        <small className="success-text">
                            93.1% success rate
                        </small>

                    </div>

                </div>


                <div className="payment-summary-card">

                    <div className="payment-summary-icon pending-icon">
                        ◷
                    </div>

                    <div className="payment-summary-content">

                        <span>Pending Payments</span>

                        <strong>9</strong>

                        <small className="pending-text">
                            Needs review
                        </small>

                    </div>

                </div>
                {refundPayment && (
    <div
        className="payment-modal-overlay"
        onClick={() => setRefundPayment(null)}
    >
        <div
            className="payment-details-modal refund-modal"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="payment-modal-header">

                <div>
                    <span className="payment-modal-eyebrow">
                        PROCESS REFUND
                    </span>

                    <h2>Refund Payment</h2>

                    <p>
                        Review the payment information before processing
                        the refund.
                    </p>
                </div>

                <button
                    className="payment-modal-close"
                    onClick={() => setRefundPayment(null)}
                >
                    ×
                </button>

            </div>

            <div className="refund-member-summary">

                <div className="payment-avatar">
                    {getInitials(refundPayment.member)}
                </div>

                <div>
                    <strong>{refundPayment.member}</strong>

                    <span>
                        Transaction #{refundPayment.id}
                    </span>
                </div>

            </div>

            <div className="payment-detail-grid">

                <div>
                    <span>Original Amount</span>

                    <strong>
                        {formatAmount(refundPayment.amount)}
                    </strong>
                </div>

                <div>
                    <span>Payment Method</span>

                    <strong>
                        {refundPayment.method}
                    </strong>
                </div>

                <div>
                    <span>Membership Plan</span>

                    <strong>
                        {refundPayment.plan}
                    </strong>
                </div>

                <div>
                    <span>Payment Date</span>

                    <strong>
                        {refundPayment.date}
                    </strong>
                </div>

            </div>

            <div className="refund-form">

                <div className="refund-form-group">

                    <label>
                        Refund Amount
                    </label>

                    <div className="refund-amount-input">

                        <span>₹</span>

                        <input
                            type="number"
                            min="1"
                            max={refundPayment.amount}
                            value={refundAmount}
                            onChange={(e) =>
                                setRefundAmount(e.target.value)
                            }
                        />

                    </div>

                    <small>
                        Maximum refundable amount:{" "}
                        {formatAmount(refundPayment.amount)}
                    </small>

                </div>

                <div className="refund-form-group">

                    <label>
                        Refund Reason
                    </label>

                    <textarea
                        value={refundReason}
                        onChange={(e) =>
                            setRefundReason(e.target.value)
                        }
                        placeholder="Enter the reason for this refund..."
                        rows="4"
                    />

                </div>

            </div>

            <div className="refund-warning">

                <span>!</span>

                <p>
                    Once the refund is confirmed, this transaction
                    will be marked as <strong>Refunded</strong>.
                </p>

            </div>

            <div className="payment-modal-actions">

                <button
                    className="modal-secondary-btn"
                    onClick={() => setRefundPayment(null)}
                >
                    Cancel
                </button>

                <button
                    className="refund-confirm-btn"
                    onClick={processRefund}
                >
                    ↩ Confirm Refund
                </button>

            </div>

        </div>
    </div>
)}

            </div>


            {/* =====================================================
                TRANSACTIONS SECTION
            ===================================================== */}

            <section className="payments-section transactions-section">

                <div className="payments-section-header">

                    <div>
                        <h2>Recent Transactions</h2>

                        <p>
                            Review and manage member payment activity.
                        </p>
                    </div>

                    <span className="transaction-count">
                        {filteredPayments.length} Transactions
                    </span>

                </div>


                {/* FILTER TOOLBAR */}

                <div className="payment-filter-toolbar">

                    <div className="payment-search">

                        <span className="payment-search-icon">
                            ⌕
                        </span>

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search member or transaction ID"
                        />

                        {searchTerm && (
                            <button
                                className="clear-payment-search"
                                onClick={() => {
                                    setSearchTerm("");
                                    setCurrentPage(1);
                                }}
                            >
                                ×
                            </button>
                        )}

                    </div>


                    <div className="payment-filters">

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                handleFilterChange(
                                    setStatusFilter,
                                    e.target.value
                                )
                            }
                        >
                            <option value="All">All Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                            <option value="Refunded">Refunded</option>
                        </select>


                        <select
                            value={planFilter}
                            onChange={(e) =>
                                handleFilterChange(
                                    setPlanFilter,
                                    e.target.value
                                )
                            }
                        >
                            <option value="All">All Plans</option>
                            <option value="Basic">Basic</option>
                            <option value="Premium">Premium</option>
                            <option value="Gold">Gold</option>
                        </select>


                        <select
                            value={methodFilter}
                            onChange={(e) =>
                                handleFilterChange(
                                    setMethodFilter,
                                    e.target.value
                                )
                            }
                        >
                            <option value="All">All Methods</option>
                            <option value="UPI">UPI</option>
                            <option value="Card">Card</option>
                            <option value="Net Banking">
                                Net Banking
                            </option>
                        </select>


                        <select
                            value={dateFilter}
                            onChange={(e) =>
                                handleFilterChange(
                                    setDateFilter,
                                    e.target.value
                                )
                            }
                        >
                            <option value="All">All Dates</option>
                            <option value="Recent">Recent</option>
                        </select>


                        {(searchTerm ||
                            statusFilter !== "All" ||
                            planFilter !== "All" ||
                            methodFilter !== "All" ||
                            dateFilter !== "All") && (
                                <button
                                    className="clear-all-filters"
                                    onClick={clearFilters}
                                >
                                    Clear
                                </button>
                            )}

                    </div>

                </div>


                {/* TABLE */}

                <div className="payments-table-wrapper">

                    <table className="payments-table">

                        <thead>

                            <tr>
                                <th>TRANSACTION</th>
                                <th>MEMBER</th>
                                <th>PLAN</th>
                                <th>METHOD</th>
                                <th>AMOUNT</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>

                        </thead>

                        <tbody>

                            {currentPayments.length > 0 ? (

                                currentPayments.map((payment) => (

                                    <tr key={payment.id}>

                                        <td>
                                            <span className="transaction-id">
                                                #{payment.id}
                                            </span>
                                        </td>


                                        <td>

                                            <div className="payment-member">

                                                <div className="payment-avatar">
                                                    {getInitials(
                                                        payment.member
                                                    )}
                                                </div>

                                                <div className="payment-member-info">

                                                    <strong>
                                                        {payment.member}
                                                    </strong>

                                                    <span>
                                                        {payment.email}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        <td>

                                            <div className="payment-plan">

                                                <strong>
                                                    {payment.plan}
                                                </strong>

                                                <span>
                                                    {payment.duration}
                                                </span>

                                            </div>

                                        </td>


                                        <td>
                                            <span className="payment-method">
                                                {payment.method}
                                            </span>
                                        </td>


                                        <td>
                                            <strong className="payment-amount">
                                                {formatAmount(payment.amount)}
                                            </strong>
                                        </td>


                                        <td>
                                            <span className="payment-date">
                                                {payment.date}
                                            </span>
                                        </td>


                                        <td>

                                            <span
                                                className={getStatusClass(
                                                    payment.status
                                                )}
                                            >
                                                <span className="payment-status-dot"></span>

                                                {payment.status}
                                            </span>

                                        </td>


                                        <td className="payment-action-cell">

                                            <button
                                                className="payment-more-btn"
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu === payment.id
                                                            ? null
                                                            : payment.id
                                                    )
                                                }
                                            >
                                                ⋮
                                            </button>


                                            {openMenu === payment.id && (

                                                <div className="payment-action-menu">

                                                    <button
                                                        onClick={() =>
                                                            handleViewDetails(
                                                                payment
                                                            )
                                                        }
                                                    >
                                                        <span>◉</span>
                                                        View Details
                                                    </button>


                                                    <button
                                                        onClick={() =>
                                                            handleViewMember(
                                                                payment
                                                            )
                                                        }
                                                    >
                                                        <span>♙</span>
                                                        View Member
                                                    </button>


                                                    <button
                                                        onClick={() =>
                                                            handleDownloadReceipt(
                                                                payment
                                                            )
                                                        }
                                                    >
                                                        <span>▤</span>
                                                        Download Receipt
                                                    </button>


                                                    <button
                                                        className="refund-action"
                                                        onClick={() =>
                                                            handleRefund(
                                                                payment
                                                            )
                                                        }
                                                    >
                                                        <span>↩</span>
                                                        Process Refund
                                                    </button>

                                                </div>

                                            )}

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="empty-payment-row"
                                    >

                                        <div className="empty-payment-state">

                                            <div className="empty-payment-icon">
                                                ₹
                                            </div>

                                            <h3>
                                                No payments found
                                            </h3>

                                            <p>
                                                Try changing your search or
                                                filter options.
                                            </p>

                                            <button
                                                onClick={clearFilters}
                                            >
                                                Clear Filters
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* PAGINATION */}

                <div className="payments-pagination">

                    <span>
                        Showing{" "}
                        <strong>
                            {filteredPayments.length === 0
                                ? 0
                                : startIndex + 1}
                        </strong>{" "}
                        to{" "}
                        <strong>
                            {Math.min(
                                startIndex + paymentsPerPage,
                                filteredPayments.length
                            )}
                        </strong>{" "}
                        of{" "}
                        <strong>
                            {filteredPayments.length}
                        </strong>{" "}
                        transactions
                    </span>


                    <div className="payment-pagination-buttons">

                        <button
                            disabled={safeCurrentPage === 1}
                            onClick={() =>
                                changePage(safeCurrentPage - 1)
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
                                    safeCurrentPage === page
                                        ? "payment-pagination-active"
                                        : ""
                                }
                                onClick={() => changePage(page)}
                            >
                                {page}
                            </button>

                        ))}


                        <button
                            disabled={safeCurrentPage === totalPages}
                            onClick={() =>
                                changePage(safeCurrentPage + 1)
                            }
                        >
                            ›
                        </button>

                    </div>

                </div>

            </section>


            {/* =====================================================
                ANALYTICS
            ===================================================== */}

            <div className="payments-analytics-grid">

                {/* REVENUE OVERVIEW */}

                <section className="payments-section revenue-overview-section">

                    <div className="payments-section-header">

                        <div>
                            <h2>Revenue Overview</h2>

                            <p>
                                Monthly membership revenue performance.
                            </p>
                        </div>

                        <span className="revenue-period">
                            2026
                        </span>

                    </div>


                    <div className="revenue-chart">

                        <div className="chart-y-axis">

                            <span>₹50K</span>
                            <span>₹40K</span>
                            <span>₹30K</span>
                            <span>₹20K</span>
                            <span>₹10K</span>
                            <span>₹0</span>

                        </div>


                        <div className="chart-area">

                            <div className="chart-grid-lines">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>


                            <svg
                                className="revenue-line-chart"
                                viewBox="0 0 600 220"
                                preserveAspectRatio="none"
                            >

                                <defs>

                                    <linearGradient
                                        id="revenueFill"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#f5b27c"
                                            stopOpacity="0.28"
                                        />

                                        <stop
                                            offset="100%"
                                            stopColor="#f5b27c"
                                            stopOpacity="0"
                                        />
                                    </linearGradient>

                                </defs>


                                <path
                                    d="M0 175 L100 142 L200 158 L300 95 L400 115 L500 63 L600 45 L600 220 L0 220 Z"
                                    fill="url(#revenueFill)"
                                />


                                <path
                                    d="M0 175 L100 142 L200 158 L300 95 L400 115 L500 63 L600 45"
                                    fill="none"
                                    stroke="#861b31"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />


                                <circle
                                    cx="0"
                                    cy="175"
                                    r="5"
                                    fill="#ffffff"
                                    stroke="#861b31"
                                    strokeWidth="3"
                                />

                                <circle
                                    cx="100"
                                    cy="142"
                                    r="5"
                                    fill="#ffffff"
                                    stroke="#861b31"
                                    strokeWidth="3"
                                />

                                <circle
                                    cx="200"
                                    cy="158"
                                    r="5"
                                    fill="#ffffff"
                                    stroke="#861b31"
                                    strokeWidth="3"
                                />

                                <circle
                                    cx="300"
                                    cy="95"
                                    r="5"
                                    fill="#ffffff"
                                    stroke="#861b31"
                                    strokeWidth="3"
                                />

                                <circle
                                    cx="400"
                                    cy="115"
                                    r="5"
                                    fill="#ffffff"
                                    stroke="#861b31"
                                    strokeWidth="3"
                                />

                                <circle
                                    cx="500"
                                    cy="63"
                                    r="5"
                                    fill="#ffffff"
                                    stroke="#861b31"
                                    strokeWidth="3"
                                />

                                <circle
                                    cx="600"
                                    cy="45"
                                    r="5"
                                    fill="#ffffff"
                                    stroke="#861b31"
                                    strokeWidth="3"
                                />

                            </svg>


                            <div className="chart-months">

                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>May</span>
                                <span>Jun</span>
                                <span>Jul</span>

                            </div>

                        </div>

                    </div>

                </section>


                {/* PAYMENT METHODS */}

                <section className="payments-section payment-methods-section">

                    <div className="payments-section-header">

                        <div>
                            <h2>Payment Methods</h2>

                            <p>
                                Distribution of successful payments.
                            </p>
                        </div>

                    </div>


                    <div className="payment-method-list">

                        <div className="payment-method-item">

                            <div className="payment-method-heading">

                                <span className="method-name">
                                    UPI
                                </span>

                                <strong>58%</strong>

                            </div>

                            <div className="method-progress">
                                <span
                                    style={{ width: "58%" }}
                                ></span>
                            </div>

                            <small>
                                142 successful transactions
                            </small>

                        </div>


                        <div className="payment-method-item">

                            <div className="payment-method-heading">

                                <span className="method-name">
                                    Cards
                                </span>

                                <strong>27%</strong>

                            </div>

                            <div className="method-progress cards-progress">
                                <span
                                    style={{ width: "27%" }}
                                ></span>
                            </div>

                            <small>
                                66 successful transactions
                            </small>

                        </div>


                        <div className="payment-method-item">

                            <div className="payment-method-heading">

                                <span className="method-name">
                                    Net Banking
                                </span>

                                <strong>10%</strong>

                            </div>

                            <div className="method-progress banking-progress">
                                <span
                                    style={{ width: "10%" }}
                                ></span>
                            </div>

                            <small>
                                25 successful transactions
                            </small>

                        </div>


                        <div className="payment-method-item">

                            <div className="payment-method-heading">

                                <span className="method-name">
                                    Other
                                </span>

                                <strong>5%</strong>

                            </div>

                            <div className="method-progress other-progress">
                                <span
                                    style={{ width: "5%" }}
                                ></span>
                            </div>

                            <small>
                                12 successful transactions
                            </small>

                        </div>

                    </div>

                </section>

            </div>


            {/* =====================================================
                PAYMENT ISSUES
            ===================================================== */}

            <section className="payments-section payment-issues-section">

                <div className="payments-section-header">

                    <div>
                        <h2>Payment Issues</h2>

                        <p>
                            Review refunds, failed transactions and disputes.
                        </p>
                    </div>

                </div>


                <div className="payment-issues-grid">

                    <div className="payment-issue-card">

                        <div className="issue-icon refund-issue-icon">
                            ↩
                        </div>

                        <div className="issue-content">

                            <span>Refund Requests</span>

                            <strong>6</strong>

                            <small>
                                Requests waiting for review
                            </small>

                        </div>

                        <button
                            onClick={() =>
                                toast.info(
                                    "Refund requests section opened."
                                )
                            }
                        >
                            Review →
                        </button>

                    </div>


                    <div className="payment-issue-card">

                        <div className="issue-icon failed-issue-icon">
                            !
                        </div>

                        <div className="issue-content">

                            <span>Failed Payments</span>

                            <strong>11</strong>

                            <small>
                                Transactions that need attention
                            </small>

                        </div>

                        <button
                            onClick={() =>
                                handleFilterChange(
                                    setStatusFilter,
                                    "Failed"
                                )
                            }
                        >
                            View →
                        </button>

                    </div>


                    <div className="payment-issue-card">

                        <div className="issue-icon dispute-issue-icon">
                            ?
                        </div>

                        <div className="issue-content">

                            <span>Payment Disputes</span>

                            <strong>2</strong>

                            <small>
                                Active payment disputes
                            </small>

                        </div>

                        <button
                            onClick={() =>
                                toast.info(
                                    "Payment disputes section opened."
                                )
                            }
                        >
                            Manage →
                        </button>

                    </div>

                </div>

            </section>


            {/* =====================================================
                PAYMENT DETAILS MODAL
            ===================================================== */}

            {selectedPayment && (

                <div
                    className="payment-modal-overlay"
                    onClick={() => setSelectedPayment(null)}
                >

                    <div
                        className="payment-details-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="payment-modal-header">

                            <div>

                                <span className="payment-modal-eyebrow">
                                    PAYMENT DETAILS
                                </span>

                                <h2>
                                    Transaction Details
                                </h2>

                                <p>
                                    Complete information about this payment.
                                </p>

                            </div>


                            <button
                                className="payment-modal-close"
                                onClick={() =>
                                    setSelectedPayment(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="payment-modal-summary">

                            <div className="modal-payment-icon">
                                ₹
                            </div>

                            <div>

                                <strong>
                                    {formatAmount(
                                        selectedPayment.amount
                                    )}
                                </strong>

                                <span
                                    className={getStatusClass(
                                        selectedPayment.status
                                    )}
                                >
                                    <span className="payment-status-dot"></span>
                                    {selectedPayment.status}
                                </span>

                            </div>

                        </div>


                        <div className="payment-detail-grid">

                            <div>
                                <span>Transaction ID</span>
                                <strong>
                                    #{selectedPayment.id}
                                </strong>
                            </div>


                            <div>
                                <span>Member</span>
                                <strong>
                                    {selectedPayment.member}
                                </strong>
                            </div>


                            <div>
                                <span>Membership Plan</span>
                                <strong>
                                    {selectedPayment.plan}
                                </strong>
                            </div>


                            <div>
                                <span>Duration</span>
                                <strong>
                                    {selectedPayment.duration}
                                </strong>
                            </div>


                            <div>
                                <span>Payment Method</span>
                                <strong>
                                    {selectedPayment.method}
                                </strong>
                            </div>


                            <div>
                                <span>Payment Date</span>
                                <strong>
                                    {selectedPayment.date}
                                </strong>
                            </div>


                            <div>
                                <span>Membership Start</span>
                                <strong>
                                    {selectedPayment.startDate}
                                </strong>
                            </div>


                            <div>
                                <span>Membership Expiry</span>
                                <strong>
                                    {selectedPayment.expiryDate}
                                </strong>
                            </div>

                        </div>


                        <div className="payment-modal-actions">

                            <button
                                className="modal-secondary-btn"
                                onClick={() =>
                                    handleDownloadReceipt(
                                        selectedPayment
                                    )
                                }
                            >
                                ↓ Download Receipt
                            </button>

                            <button
                                className="modal-primary-btn"
                                onClick={() =>
                                    setSelectedPayment(null)
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

export default AdminPayments;