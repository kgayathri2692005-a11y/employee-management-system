import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import "../styles/AdminReportsAnalytics.css";

function AdminReportsAnalytics() {
    const [dateRange, setDateRange] = useState("This Month");
    const [reportType, setReportType] = useState("All Reports");
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    /*
     * ============================================================
     * STATIC REPORT DATA
     * ------------------------------------------------------------
     * These values are intentionally kept in one place.
     * Later these can be replaced with localStorage/backend data.
     * ============================================================
     */

const overview = {
    totalMembers: 12856,
    newMembers: 486,
    activeMembers: 8921,
    verifiedProfiles: 8542,
    matchesCreated: 3248,
    interestsSent: 8765,
    successfulMatches: 1428,
    profileCompletion: 84,
    revenue: 485600,
    revenueGrowth: 12.5,
};

    const registrationData = [
        { month: "Jan", value: 520 },
        { month: "Feb", value: 680 },
        { month: "Mar", value: 610 },
        { month: "Apr", value: 790 },
        { month: "May", value: 860 },
        { month: "Jun", value: 940 },
        { month: "Jul", value: 1080 },
        { month: "Aug", value: 1180 },
    ];

    const engagementData = [
        { label: "Interests Sent", value: 8765 },
        { label: "Accepted", value: 4210 },
        { label: "Rejected", value: 2650 },
        { label: "Matches", value: 1428 },
    ];

    const subscriptionData = [
   {
        name: "Free",
        members: 8625,
        percentage: 67,
    },
    {
        name: "Silver",
        members: 832,
        percentage: 6,
    },
    {
        name: "Gold",
        members: 1243,
        percentage: 10,
    },
    {
        name: "Premium",
        members: 2156,
        percentage: 17,
    },
    ];

    const revenueData = [
        { month: "Jan", value: 31000 },
        { month: "Feb", value: 36000 },
        { month: "Mar", value: 34000 },
        { month: "Apr", value: 42000 },
        { month: "May", value: 46000 },
        { month: "Jun", value: 51000 },
        { month: "Jul", value: 58000 },
        { month: "Aug", value: 62000 },
    ];

    const abuseReports = [
        {
            id: "REP1024",
            member: "Member Profile",
            category: "Fake Profile",
            reportedBy: "Member",
            date: "18 Aug 2026",
            priority: "High",
            status: "Pending",
        },
        {
            id: "REP1023",
            member: "Member Profile",
            category: "Harassment / Abuse",
            reportedBy: "Member",
            date: "17 Aug 2026",
            priority: "Critical",
            status: "Under Review",
        },
        {
            id: "REP1022",
            member: "Member Profile",
            category: "Spam",
            reportedBy: "Member",
            date: "17 Aug 2026",
            priority: "Medium",
            status: "Resolved",
        },
        {
            id: "REP1021",
            member: "Member Profile",
            category: "Inappropriate Content",
            reportedBy: "Member",
            date: "16 Aug 2026",
            priority: "High",
            status: "Under Review",
        },
        {
            id: "REP1020",
            member: "Member Profile",
            category: "Fraud / Scam",
            reportedBy: "Member",
            date: "15 Aug 2026",
            priority: "Critical",
            status: "Resolved",
        },
    ];

    const abuseCategories = [
        { name: "Fake Profiles", count: 12 },
        { name: "Harassment / Abuse", count: 8 },
        { name: "Spam", count: 7 },
        { name: "Inappropriate Content", count: 6 },
        { name: "Fraud / Scam", count: 5 },
        { name: "Suspicious Activity", count: 3 },
        { name: "Other", count: 1 },
    ];

    const supportData = [
        { name: "Account Issues", count: 24 },
        { name: "Payment Issues", count: 18 },
        { name: "Profile Issues", count: 16 },
        { name: "Technical Issues", count: 14 },
        { name: "Safety Complaints", count: 8 },
        { name: "Other", count: 6 },
    ];

    const locationData = [
        { city: "Bengaluru", members: 2140 },
        { city: "Chennai", members: 1860 },
        { city: "Hyderabad", members: 1720 },
        { city: "Mumbai", members: 1490 },
        { city: "Pune", members: 1260 },
        { city: "Delhi", members: 1180 },
    ];

    const moderationData = [
        {
            label: "Profiles Verified",
            value: 10482,
            percentage: 84,
        },
        {
            label: "Photos Approved",
            value: 9240,
            percentage: 88,
        },
        {
            label: "Flagged Content",
            value: 126,
            percentage: 12,
        },
        {
            label: "Profiles Suspended",
            value: 48,
            percentage: 4,
        },
    ];

    const adminActivity = [
        {
            action: "Profile verification completed",
            count: 124,
            type: "Verification",
        },
        {
            action: "Abuse reports resolved",
            count: 31,
            type: "Safety",
        },
        {
            action: "Profiles suspended",
            count: 8,
            type: "Moderation",
        },
        {
            action: "Refunds processed",
            count: 6,
            type: "Payment",
        },
        {
            action: "Support requests resolved",
            count: 61,
            type: "Support",
        },
    ];

    /*
     * ============================================================
     * REPORT FILTERING
     * ============================================================
     */

    const filteredAbuseReports = useMemo(() => {
        if (reportType === "All Reports") {
            return abuseReports;
        }

        if (reportType === "Safety & Abuse") {
            return abuseReports;
        }

        return [];
    }, [reportType]);

    /*
     * ============================================================
     * EXPORT
     * ============================================================
     */

    const handleExport = (type) => {
        setShowExportMenu(false);

        const reportNames = {
            complete: "Complete Admin Report",
            members: "Member Report",
            engagement: "Match & Engagement Report",
            revenue: "Revenue Report",
            safety: "Safety & Abuse Report",
            support: "Support Report",
        };

        toast.success(
            `${reportNames[type]} export prepared successfully.`
        );
    };

    /*
     * ============================================================
     * VIEW REPORT
     * ============================================================
     */

    const handleViewReport = (report) => {
        setSelectedReport(report);
    };

    /*
     * ============================================================
     * HELPERS
     * ============================================================
     */

    const formatCurrency = (value) => {
        return `₹${value.toLocaleString("en-IN")}`;
    };

    const getPriorityClass = (priority) => {
        return `report-priority ${priority
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace("/", "-")}`;
    };

    const getReportStatusClass = (status) => {
        return `report-status ${status
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
    };

    const getMaxValue = (data) => {
        return Math.max(...data.map((item) => item.value));
    };

    return (
        <div className="admin-reports-page">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="reports-page-header">

                <div>
                    <div className="reports-breadcrumb">
                        Admin <span>/</span> Reports & Analytics
                    </div>

                    <h1>Reports & Analytics</h1>

                    <p>
                        Monitor Niyati's growth, engagement, revenue,
                        safety and overall platform performance.
                    </p>
                </div>

                <div className="reports-header-actions">

                    <div className="report-export-wrapper">

                        <button
                            className="reports-export-btn"
                            onClick={() =>
                                setShowExportMenu(!showExportMenu)
                            }
                        >
                            <span>↓</span>
                            Export Report
                            <span className="export-arrow">⌄</span>
                        </button>

                        {showExportMenu && (
                            <div className="report-export-menu">

                                <button
                                    onClick={() =>
                                        handleExport("complete")
                                    }
                                >
                                    <span>▤</span>
                                    Complete Admin Report
                                </button>

                                <button
                                    onClick={() =>
                                        handleExport("members")
                                    }
                                >
                                    <span>♙</span>
                                    Member Report
                                </button>

                                <button
                                    onClick={() =>
                                        handleExport("engagement")
                                    }
                                >
                                    <span>♡</span>
                                    Engagement Report
                                </button>

                                <button
                                    onClick={() =>
                                        handleExport("revenue")
                                    }
                                >
                                    <span>₹</span>
                                    Revenue Report
                                </button>

                                <button
                                    onClick={() =>
                                        handleExport("safety")
                                    }
                                >
                                    <span>!</span>
                                    Safety & Abuse Report
                                </button>

                                <button
                                    onClick={() =>
                                        handleExport("support")
                                    }
                                >
                                    <span>?</span>
                                    Support Report
                                </button>

                            </div>
                        )}

                    </div>

                </div>

            </div>


            {/* =====================================================
                FILTER BAR
            ===================================================== */}

            <div className="reports-filter-bar">

                <div className="report-filter-item">

                    <label>Date Range</label>

                    <select
                        value={dateRange}
                        onChange={(e) =>
                            setDateRange(e.target.value)
                        }
                    >
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>Last 3 Months</option>
                        <option>Last 6 Months</option>
                        <option>This Year</option>
                        <option>All Time</option>
                    </select>

                </div>

                <div className="report-filter-item">

                    <label>Report Category</label>

                    <select
                        value={reportType}
                        onChange={(e) =>
                            setReportType(e.target.value)
                        }
                    >
                        <option>All Reports</option>
                        <option>Members</option>
                        <option>Engagement</option>
                        <option>Revenue</option>
                        <option>Safety & Abuse</option>
                        <option>Support</option>
                        <option>Moderation</option>
                    </select>

                </div>

                <div className="report-filter-summary">
                    <span>Showing data for</span>
                    <strong>{dateRange}</strong>
                </div>

            </div>


            {/* =====================================================
                OVERVIEW KPI
            ===================================================== */}

            <section className="reports-section">

                <div className="reports-section-heading">

                    <div>
                        <span className="section-eyebrow">
                            PLATFORM OVERVIEW
                        </span>

                        <h2>Key Performance Indicators</h2>

                        <p>
                            A quick overview of Niyati's current
                            platform performance.
                        </p>
                    </div>

                </div>


                <div className="reports-kpi-grid">

                    <div className="report-kpi-card">

                        <div className="kpi-icon members-kpi">
                            ♙
                        </div>

                        <div>
                            <span>Total Members</span>
                            <strong>
                                {overview.totalMembers.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                            <small className="kpi-positive">
                                ↑ 8.4% this month
                            </small>
                        </div>

                    </div>


                    <div className="report-kpi-card">

                        <div className="kpi-icon active-kpi">
                            ●
                        </div>

                        <div>
                            <span>Active Members</span>
                            <strong>
                                {overview.activeMembers.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                            <small>
                                71.1% of members
                            </small>
                        </div>

                    </div>


                    <div className="report-kpi-card">

                        <div className="kpi-icon match-kpi">
                            ♡
                        </div>

                        <div>
                            <span>Successful Matches</span>
                            <strong>
                                {overview.successfulMatches.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                            <small className="kpi-positive">
                                ↑ 14.2% this month
                            </small>
                        </div>

                    </div>


                    <div className="report-kpi-card">

                        <div className="kpi-icon revenue-kpi">
                            ₹
                        </div>

                        <div>
                            <span>Total Revenue</span>
                            <strong>
                                {formatCurrency(overview.revenue)}
                            </strong>

                            <small className="kpi-positive">
                                ↑ {overview.revenueGrowth}% growth
                            </small>
                        </div>

                    </div>


                    <div className="report-kpi-card">

                        <div className="kpi-icon verification-kpi">
                            ✓
                        </div>

                        <div>
                            <span>Verified Profiles</span>
                            <strong>
                                {overview.verifiedProfiles.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                            <small>
                                83.6% of members
                            </small>
                        </div>

                    </div>


                    <div className="report-kpi-card">

                        <div className="kpi-icon registration-kpi">
                            +
                        </div>

                        <div>
                            <span>New Registrations</span>
                            <strong>
                                {overview.newMembers}
                            </strong>

                            <small className="kpi-positive">
                                ↑ 10.8% this month
                            </small>
                        </div>

                    </div>


                    <div className="report-kpi-card">

                        <div className="kpi-icon interest-kpi">
                            ♥
                        </div>

                        <div>
                            <span>Interests Sent</span>
                            <strong>
                                {overview.interestsSent.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                            <small>
                                This month
                            </small>
                        </div>

                    </div>


                    <div className="report-kpi-card">

                        <div className="kpi-icon completion-kpi">
                            %
                        </div>

                        <div>
                            <span>Profile Completion</span>
                            <strong>
                                {overview.profileCompletion}%
                            </strong>

                            <small>
                                Average completion
                            </small>
                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                MEMBER + ENGAGEMENT
            ===================================================== */}

            <div className="reports-two-column">


                {/* MEMBER ANALYTICS */}

                <section className="report-panel">

                    <div className="report-panel-header">

                        <div>
                            <span className="section-eyebrow">
                                MEMBER ANALYTICS
                            </span>

                            <h2>Registration Growth</h2>

                            <p>
                                New member registrations over time.
                            </p>
                        </div>

                        <span className="panel-value">
                            +18.6%
                        </span>

                    </div>


                    <div className="registration-chart">

                        <div className="registration-bars">

                            <div className="chart-horizontal-lines">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="bars-container">

                                {registrationData.map((item) => {

                                    const height =
                                        (item.value / 1200) * 100;

                                    return (
                                        <div
                                            className="registration-bar-group"
                                            key={item.month}
                                        >

                                            <div className="bar-value">
                                                {item.value}
                                            </div>

                                            <div
                                                className="registration-bar"
                                                style={{
                                                    height: `${height}%`,
                                                }}
                                            ></div>

                                            <span>
                                                {item.month}
                                            </span>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                </section>


                {/* ENGAGEMENT */}

                <section className="report-panel">

                    <div className="report-panel-header">

                        <div>
                            <span className="section-eyebrow">
                                ENGAGEMENT
                            </span>

                            <h2>Match Activity</h2>

                            <p>
                                Member interaction and matching activity.
                            </p>
                        </div>

                        <span className="panel-value">
                            {overview.matchesCreated.toLocaleString(
                                "en-IN"
                            )}
                        </span>

                    </div>


                    <div className="engagement-list">

                        {engagementData.map((item) => {

                            const percentage =
                                (item.value /
                                    engagementData[0].value) *
                                100;

                            return (
                                <div
                                    className="engagement-item"
                                    key={item.label}
                                >

                                    <div className="engagement-heading">

                                        <span>
                                            {item.label}
                                        </span>

                                        <strong>
                                            {item.value.toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>

                                    <div className="engagement-progress">

                                        <span
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        ></span>

                                    </div>

                                </div>
                            );
                        })}

                    </div>


                    <div className="engagement-summary">

                        <div>
                            <span>Match Rate</span>
                            <strong>16.3%</strong>
                        </div>

                        <div>
                            <span>Acceptance Rate</span>
                            <strong>48.0%</strong>
                        </div>

                        <div>
                            <span>Successful Matches</span>
                            <strong>
                                {overview.successfulMatches}
                            </strong>
                        </div>

                    </div>

                </section>

            </div>


            {/* =====================================================
                REVENUE
            ===================================================== */}

            <section className="report-panel revenue-panel">

                <div className="report-panel-header">

                    <div>
                        <span className="section-eyebrow">
                            REVENUE ANALYTICS
                        </span>

                        <h2>Revenue Performance</h2>

                        <p>
                            Membership revenue and subscription
                            performance.
                        </p>
                    </div>

                    <div className="revenue-total">

                        <span>Total Revenue</span>

                        <strong>
                            {formatCurrency(overview.revenue)}
                        </strong>

                        <small>
                            ↑ {overview.revenueGrowth}% compared with
                            previous period
                        </small>

                    </div>

                </div>


                <div className="revenue-chart-wrapper">

                    <div className="revenue-y-axis">

                        <span>₹70K</span>
                        <span>₹60K</span>
                        <span>₹50K</span>
                        <span>₹40K</span>
                        <span>₹30K</span>
                        <span>₹20K</span>
                        <span>₹10K</span>
                        <span>₹0</span>

                    </div>

                    <div className="revenue-chart-area">

                        <div className="revenue-grid-lines">

                            {Array.from(
                                { length: 8 },
                                (_, index) => (
                                    <span key={index}></span>
                                )
                            )}

                        </div>

                        <svg
                            viewBox="0 0 800 260"
                            preserveAspectRatio="none"
                            className="revenue-svg"
                        >

                            <defs>

                                <linearGradient
                                    id="niyatiRevenueFill"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="0%"
                                        stopColor="#f2a45d"
                                        stopOpacity="0.30"
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#f2a45d"
                                        stopOpacity="0"
                                    />

                                </linearGradient>

                            </defs>


                            <path
                                d="M0 145 L114 130 L228 138 L342 105 L456 88 L570 70 L684 48 L800 30 L800 260 L0 260 Z"
                                fill="url(#niyatiRevenueFill)"
                            />

                            <path
                                d="M0 145 L114 130 L228 138 L342 105 L456 88 L570 70 L684 48 L800 30"
                                fill="none"
                                stroke="#861b31"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {[
                                [0, 145],
                                [114, 130],
                                [228, 138],
                                [342, 105],
                                [456, 88],
                                [570, 70],
                                [684, 48],
                                [800, 30],
                            ].map(([cx, cy], index) => (
                                <circle
                                    key={index}
                                    cx={cx}
                                    cy={cy}
                                    r="5"
                                    fill="#ffffff"
                                    stroke="#861b31"
                                    strokeWidth="3"
                                />
                            ))}

                        </svg>


                        <div className="revenue-months">

                            {revenueData.map((item) => (
                                <span key={item.month}>
                                    {item.month}
                                </span>
                            ))}

                        </div>

                    </div>

                </div>


                <div className="subscription-summary">

                    {subscriptionData.map((plan) => (
                        <div
                            className="subscription-item"
                            key={plan.name}
                        >

                            <div className="subscription-top">

                                <span>{plan.name}</span>

                                <strong>
                                    {plan.members.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>

                            <div className="subscription-progress">

                                <span
                                    style={{
                                        width: `${plan.percentage}%`,
                                    }}
                                ></span>

                            </div>

                            <small>
                                {plan.percentage}% of members
                            </small>

                        </div>
                    ))}

                </div>

            </section>


            {/* =====================================================
                SAFETY + SUPPORT
            ===================================================== */}

            <div className="reports-two-column">


                {/* SAFETY */}

                <section className="report-panel safety-panel">

                    <div className="report-panel-header">

                        <div>
                            <span className="section-eyebrow safety-eyebrow">
                                TRUST & SAFETY
                            </span>

                            <h2>Safety & Abuse Reports</h2>

                            <p>
                                Monitor reports, suspicious activity
                                and member safety issues.
                            </p>
                        </div>

                        <button
                            className="panel-link-btn"
                            onClick={() =>
                                setReportType("Safety & Abuse")
                            }
                        >
                            View All →
                        </button>

                    </div>


                    <div className="safety-kpi-grid">

                        <div className="safety-kpi">
                            <span>Total Reports</span>
                            <strong>42</strong>
                        </div>

                        <div className="safety-kpi pending-safety">
                            <span>Pending</span>
                            <strong>11</strong>
                        </div>

                        <div className="safety-kpi review-safety">
                            <span>Under Review</span>
                            <strong>7</strong>
                        </div>

                        <div className="safety-kpi resolved-safety">
                            <span>Resolved</span>
                            <strong>20</strong>
                        </div>

                    </div>


                    <div className="abuse-category-list">

                        {abuseCategories.map((item) => {

                            const max =
                                Math.max(
                                    ...abuseCategories.map(
                                        (category) =>
                                            category.count
                                    )
                                );

                            return (
                                <div
                                    className="abuse-category-item"
                                    key={item.name}
                                >

                                    <div className="abuse-category-heading">

                                        <span>
                                            {item.name}
                                        </span>

                                        <strong>
                                            {item.count}
                                        </strong>

                                    </div>

                                    <div className="abuse-progress">

                                        <span
                                            style={{
                                                width: `${
                                                    (item.count /
                                                        max) *
                                                    100
                                                }%`,
                                            }}
                                        ></span>

                                    </div>

                                </div>
                            );
                        })}

                    </div>


                    <div className="safety-footer-stats">

                        <div>
                            <span>Resolution Rate</span>
                            <strong>76.2%</strong>
                        </div>

                        <div>
                            <span>Profiles Suspended</span>
                            <strong>48</strong>
                        </div>

                        <div>
                            <span>Avg. Resolution</span>
                            <strong>18h</strong>
                        </div>

                    </div>

                </section>


                {/* SUPPORT */}

                <section className="report-panel">

                    <div className="report-panel-header">

                        <div>
                            <span className="section-eyebrow">
                                SUPPORT ANALYTICS
                            </span>

                            <h2>Support Requests</h2>

                            <p>
                                Overview of member support activity.
                            </p>
                        </div>

                        <button
                            className="panel-link-btn"
                            onClick={() =>
                                toast.info(
                                    "Opening Support Requests."
                                )
                            }
                        >
                            View All →
                        </button>

                    </div>


                    <div className="support-overview">

                        <div className="support-stat">
                            <span>Total Requests</span>
                            <strong>86</strong>
                        </div>

                        <div className="support-stat">
                            <span>Open</span>
                            <strong>14</strong>
                        </div>

                        <div className="support-stat">
                            <span>In Progress</span>
                            <strong>11</strong>
                        </div>

                        <div className="support-stat">
                            <span>Resolved</span>
                            <strong>61</strong>
                        </div>

                    </div>


                    <div className="support-category-list">

                        {supportData.map((item) => {

                            const max =
                                Math.max(
                                    ...supportData.map(
                                        (support) =>
                                            support.count
                                    )
                                );

                            return (
                                <div
                                    className="support-category"
                                    key={item.name}
                                >

                                    <div>
                                        <span>
                                            {item.name}
                                        </span>

                                        <strong>
                                            {item.count}
                                        </strong>
                                    </div>

                                    <div className="support-progress">

                                        <span
                                            style={{
                                                width: `${
                                                    (item.count /
                                                        max) *
                                                    100
                                                }%`,
                                            }}
                                        ></span>

                                    </div>

                                </div>
                            );
                        })}

                    </div>


                    <div className="support-footer">

                        <span>
                            Average response time
                        </span>

                        <strong>
                            2h 18m
                        </strong>

                    </div>

                </section>

            </div>


            {/* =====================================================
                CONTENT MODERATION
            ===================================================== */}

            <section className="report-panel moderation-panel">

                <div className="report-panel-header">

                    <div>
                        <span className="section-eyebrow">
                            CONTENT & MODERATION
                        </span>

                        <h2>Profile & Content Moderation</h2>

                        <p>
                            Monitor profile verification and moderation
                            activity.
                        </p>
                    </div>

                </div>


                <div className="moderation-grid">

                    {moderationData.map((item) => (
                        <div
                            className="moderation-card"
                            key={item.label}
                        >

                            <div className="moderation-card-top">

                                <span>{item.label}</span>

                                <strong>
                                    {item.value.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>

                            <div className="moderation-progress">

                                <span
                                    style={{
                                        width: `${item.percentage}%`,
                                    }}
                                ></span>

                            </div>

                            <small>
                                {item.percentage}% activity level
                            </small>

                        </div>
                    ))}

                </div>


                <div className="moderation-alerts">

                    <div>
                        <span className="alert-dot warning"></span>
                        126 pieces of content flagged for review
                    </div>

                    <div>
                        <span className="alert-dot danger"></span>
                        48 profiles currently suspended
                    </div>

                    <div>
                        <span className="alert-dot success"></span>
                        88% photo approval rate
                    </div>

                </div>

            </section>


            {/* =====================================================
                LOCATION + SUBSCRIPTION
            ===================================================== */}

            <div className="reports-two-column">


                {/* LOCATION */}

                <section className="report-panel">

                    <div className="report-panel-header">

                        <div>
                            <span className="section-eyebrow">
                                LOCATION ANALYTICS
                            </span>

                            <h2>Top Member Locations</h2>

                            <p>
                                Cities with the highest number of
                                registered members.
                            </p>
                        </div>

                    </div>


                    <div className="location-list">

                        {locationData.map((item, index) => {

                            const max =
                                locationData[0].members;

                            return (
                                <div
                                    className="location-item"
                                    key={item.city}
                                >

                                    <div className="location-rank">
                                        {index + 1}
                                    </div>

                                    <div className="location-info">

                                        <div>
                                            <span>
                                                {item.city}
                                            </span>

                                            <strong>
                                                {item.members.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>
                                        </div>

                                        <div className="location-progress">

                                            <span
                                                style={{
                                                    width: `${
                                                        (item.members /
                                                            max) *
                                                        100
                                                    }%`,
                                                }}
                                            ></span>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </section>


                {/* SUBSCRIPTIONS */}

                <section className="report-panel">

                    <div className="report-panel-header">

                        <div>
                            <span className="section-eyebrow">
                                MEMBERSHIP ANALYTICS
                            </span>

                            <h2>Subscription Distribution</h2>

                            <p>
                                Current membership plan distribution.
                            </p>
                        </div>

                    </div>


                    <div className="subscription-large-list">

                        {subscriptionData.map((plan) => (
                            <div
                                className="subscription-large-item"
                                key={plan.name}
                            >

                                <div className="subscription-plan-icon">
                                    {plan.name === "Free"
                                        ? "F"
                                        : plan.name.charAt(0)}
                                </div>

                                <div className="subscription-large-info">

                                    <div>

                                        <span>
                                            {plan.name}
                                        </span>

                                        <strong>
                                            {plan.members.toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>

                                    <div className="subscription-large-progress">

                                        <span
                                            style={{
                                                width: `${plan.percentage}%`,
                                            }}
                                        ></span>

                                    </div>

                                </div>

                                <b>
                                    {plan.percentage}%
                                </b>

                            </div>
                        ))}

                    </div>


                    <div className="subscription-footer">

                        <div>
                            <span>Paid Members</span>
                            <strong>5,700</strong>
                        </div>

                        <div>
                            <span>Conversion Rate</span>
                            <strong>45.5%</strong>
                        </div>

                    </div>

                </section>

            </div>


            {/* =====================================================
                RECENT ABUSE REPORTS
            ===================================================== */}

            <section className="report-panel recent-reports-panel">

                <div className="report-panel-header">

                    <div>
                        <span className="section-eyebrow safety-eyebrow">
                            SAFETY CASE MANAGEMENT
                        </span>

                        <h2>Recent Abuse & Safety Reports</h2>

                        <p>
                            Latest member safety reports requiring
                            monitoring or action.
                        </p>
                    </div>

                    <span className="case-count">
                        {filteredAbuseReports.length} Recent Cases
                    </span>

                </div>


                <div className="reports-table-wrapper">

                    <table className="reports-table">

                        <thead>

                            <tr>
                                <th>REPORT ID</th>
                                <th>REPORTED MEMBER</th>
                                <th>REASON</th>
                                <th>REPORTED BY</th>
                                <th>DATE</th>
                                <th>PRIORITY</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredAbuseReports.map((report) => (
                                <tr key={report.id}>

                                    <td>
                                        <strong className="case-id">
                                            #{report.id}
                                        </strong>
                                    </td>

                                    <td>
                                        <span className="reported-member">
                                            {report.member}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="report-reason">
                                            {report.category}
                                        </span>
                                    </td>

                                    <td>
                                        {report.reportedBy}
                                    </td>

                                    <td>
                                        {report.date}
                                    </td>

                                    <td>
                                        <span
                                            className={getPriorityClass(
                                                report.priority
                                            )}
                                        >
                                            {report.priority}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={getReportStatusClass(
                                                report.status
                                            )}
                                        >
                                            {report.status}
                                        </span>
                                    </td>

                                    <td>

                                        <button
                                            className="view-case-btn"
                                            onClick={() =>
                                                handleViewReport(
                                                    report
                                                )
                                            }
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </section>


            {/* =====================================================
                ADMIN ACTIVITY + ALERTS
            ===================================================== */}

            <div className="reports-two-column">


                {/* ADMIN ACTIVITY */}

                <section className="report-panel">

                    <div className="report-panel-header">

                        <div>
                            <span className="section-eyebrow">
                                ADMIN ACTIVITY
                            </span>

                            <h2>Administrative Actions</h2>

                            <p>
                                Summary of recent admin operations.
                            </p>
                        </div>

                    </div>


                    <div className="admin-activity-list">

                        {adminActivity.map((item) => (
                            <div
                                className="admin-activity-item"
                                key={item.action}
                            >

                                <div className="activity-icon">
                                    ✓
                                </div>

                                <div className="activity-content">

                                    <strong>
                                        {item.action}
                                    </strong>

                                    <span>
                                        {item.type}
                                    </span>

                                </div>

                                <b>
                                    {item.count}
                                </b>

                            </div>
                        ))}

                    </div>

                </section>


                {/* ALERTS */}

                <section className="report-panel alerts-panel">

                    <div className="report-panel-header">

                        <div>
                            <span className="section-eyebrow">
                                ATTENTION REQUIRED
                            </span>

                            <h2>Important Alerts</h2>

                            <p>
                                Items that may require admin attention.
                            </p>
                        </div>

                    </div>


                    <div className="important-alert-list">

                        <div className="important-alert danger-alert">

                            <div className="important-alert-icon">
                                !
                            </div>

                            <div>
                                <strong>
                                    11 abuse reports pending
                                </strong>

                                <span>
                                    Safety cases are waiting for review.
                                </span>
                            </div>

                            <button
                                onClick={() =>
                                    setReportType(
                                        "Safety & Abuse"
                                    )
                                }
                            >
                                Review
                            </button>

                        </div>


                        <div className="important-alert warning-alert">

                            <div className="important-alert-icon">
                                !
                            </div>

                            <div>
                                <strong>
                                    7 profiles awaiting verification
                                </strong>

                                <span>
                                    Complete profile verification.
                                </span>
                            </div>

                            <button
                                onClick={() =>
                                    toast.info(
                                        "Profile verification section opened."
                                    )
                                }
                            >
                                Review
                            </button>

                        </div>


                        <div className="important-alert payment-alert">

                            <div className="important-alert-icon">
                                ₹
                            </div>

                            <div>
                                <strong>
                                    6 refund requests pending
                                </strong>

                                <span>
                                    Payment refunds require attention.
                                </span>
                            </div>

                            <button
                                onClick={() =>
                                    toast.info(
                                        "Payments section opened."
                                    )
                                }
                            >
                                Review
                            </button>

                        </div>


                        <div className="important-alert success-alert">

                            <div className="important-alert-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    61 support requests resolved
                                </strong>

                                <span>
                                    Support resolution performance is
                                    on track.
                                </span>
                            </div>

                        </div>

                    </div>

                </section>

            </div>


            {/* =====================================================
                REPORT DETAILS MODAL
            ===================================================== */}

            {selectedReport && (

                <div
                    className="report-modal-overlay"
                    onClick={() =>
                        setSelectedReport(null)
                    }
                >

                    <div
                        className="report-details-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="report-modal-header">

                            <div>
                                <span className="section-eyebrow safety-eyebrow">
                                    SAFETY REPORT
                                </span>

                                <h2>
                                    Report Details
                                </h2>

                                <p>
                                    Review the selected member safety
                                    report.
                                </p>
                            </div>

                            <button
                                className="report-modal-close"
                                onClick={() =>
                                    setSelectedReport(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="report-detail-summary">

                            <div className="report-case-icon">
                                !
                            </div>

                            <div>

                                <strong>
                                    #{selectedReport.id}
                                </strong>

                                <span>
                                    {selectedReport.category}
                                </span>

                            </div>

                        </div>


                        <div className="report-detail-grid">

                            <div>
                                <span>Reported Member</span>
                                <strong>
                                    {selectedReport.member}
                                </strong>
                            </div>

                            <div>
                                <span>Report Category</span>
                                <strong>
                                    {selectedReport.category}
                                </strong>
                            </div>

                            <div>
                                <span>Reported By</span>
                                <strong>
                                    {selectedReport.reportedBy}
                                </strong>
                            </div>

                            <div>
                                <span>Report Date</span>
                                <strong>
                                    {selectedReport.date}
                                </strong>
                            </div>

                            <div>
                                <span>Priority</span>
                                <strong>
                                    {selectedReport.priority}
                                </strong>
                            </div>

                            <div>
                                <span>Status</span>
                                <strong>
                                    {selectedReport.status}
                                </strong>
                            </div>

                        </div>


                        <div className="report-modal-note">

                            <strong>
                                Admin Note
                            </strong>

                            <p>
                                This is a static safety report for
                                demonstration. When connected to your
                                real Niyati data, the complete report
                                history, evidence and moderation
                                actions can be displayed here.
                            </p>

                        </div>


                        <div className="report-modal-actions">

                            <button
                                className="report-secondary-btn"
                                onClick={() =>
                                    setSelectedReport(null)
                                }
                            >
                                Close
                            </button>

                            <button
                                className="report-primary-btn"
                                onClick={() => {
                                    toast.success(
                                        "Report marked for review."
                                    );
                                    setSelectedReport(null);
                                }}
                            >
                                Mark for Review
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default AdminReportsAnalytics;