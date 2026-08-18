import React, { useMemo, useState } from "react";
import "../styles/AdminContentManagement.css";

function AdminContentManagement() {
    const [activeTab, setActiveTab] = useState("All Content");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [typeFilter, setTypeFilter] = useState("All Types");

    const [showModal, setShowModal] = useState(false);
    const [editingContent, setEditingContent] = useState(null);

    const [contentItems, setContentItems] = useState([
        {
            id: 1,
            title: "About Niyati",
            type: "Page",
            category: "Website",
            status: "Published",
            updated: "Today",
            author: "Admin",
            featured: true,
            description:
                "Learn about Niyati Matrimony, our values and our vision for meaningful relationships.",
        },
        {
            id: 2,
            title: "Frequently Asked Questions",
            type: "FAQ",
            category: "Help",
            status: "Published",
            updated: "Yesterday",
            author: "Admin",
            featured: false,
            description:
                "Common questions about profiles, interests, privacy and membership.",
        },
        {
            id: 3,
            title: "How to Create a Better Matrimony Profile",
            type: "Blog",
            category: "Profile Tips",
            status: "Published",
            updated: "2 days ago",
            author: "Content Team",
            featured: true,
            description:
                "Practical tips to create a trustworthy and attractive matrimonial profile.",
        },
        {
            id: 4,
            title: "Priya & Arjun - A Story Written by Destiny",
            type: "Success Story",
            category: "Stories",
            status: "Pending",
            updated: "3 days ago",
            author: "Priya",
            featured: false,
            description:
                "A submitted success story waiting for admin approval.",
        },
        {
            id: 5,
            title: "Safety Guidelines",
            type: "Page",
            category: "Safety",
            status: "Published",
            updated: "4 days ago",
            author: "Admin",
            featured: false,
            description:
                "Important safety practices for Niyati members.",
        },
        {
            id: 6,
            title: "Marriage Compatibility: What Really Matters?",
            type: "Blog",
            category: "Relationship Advice",
            status: "Draft",
            updated: "5 days ago",
            author: "Content Team",
            featured: false,
            description:
                "An upcoming article about compatibility and meaningful connections.",
        },
        {
            id: 7,
            title: "Privacy Policy",
            type: "Policy",
            category: "Legal",
            status: "Published",
            updated: "1 week ago",
            author: "Admin",
            featured: false,
            description:
                "Niyati Matrimony privacy and data protection policy.",
        },
        {
            id: 8,
            title: "Premium Membership Benefits",
            type: "Page",
            category: "Membership",
            status: "Published",
            updated: "1 week ago",
            author: "Admin",
            featured: true,
            description:
                "Information about premium membership benefits and features.",
        },
        {
            id: 9,
            title: "Relationship Advice for Families",
            type: "Blog",
            category: "Family",
            status: "Draft",
            updated: "2 weeks ago",
            author: "Content Team",
            featured: false,
            description:
                "Helpful guidance for families navigating matrimonial decisions.",
        },
        {
            id: 10,
            title: "Contact Niyati",
            type: "Page",
            category: "Website",
            status: "Published",
            updated: "2 weeks ago",
            author: "Admin",
            featured: false,
            description:
                "Contact information and support options for Niyati members.",
        },
    ]);

    const [homepageSections, setHomepageSections] = useState([
        {
            id: 1,
            title: "Hero Section",
            description: "Main homepage introduction and primary call-to-action.",
            status: "Published",
        },
        {
            id: 2,
            title: "Trust Features",
            description: "Safety, privacy and verified profile highlights.",
            status: "Published",
        },
        {
            id: 3,
            title: "How Niyati Works",
            description: "Steps explaining the Niyati matchmaking journey.",
            status: "Published",
        },
        {
            id: 4,
            title: "Why Choose Niyati?",
            description: "Key reasons members should choose Niyati Matrimony.",
            status: "Published",
        },
        {
            id: 5,
            title: "Success Stories",
            description: "Featured couples and successful Niyati journeys.",
            status: "Published",
        },
        {
            id: 6,
            title: "Final Call To Action",
            description: "Closing registration and matchmaking call-to-action.",
            status: "Published",
        },
    ]);

    const [announcement, setAnnouncement] = useState({
        title: "Welcome to Niyati Matrimony",
        message:
            "Your journey toward a meaningful connection starts with Niyati.",
        status: "Active",
    });

    const [formData, setFormData] = useState({
        title: "",
        type: "Page",
        category: "Website",
        status: "Draft",
        description: "",
        author: "Admin",
        featured: false,
    });

    const tabs = [
        "All Content",
        "Pages",
        "Blogs",
        "FAQs",
        "Success Stories",
        "Policies",
    ];

    const typeMapping = {
        Pages: "Page",
        Blogs: "Blog",
        FAQs: "FAQ",
        "Success Stories": "Success Story",
        Policies: "Policy",
    };

    const filteredContent = useMemo(() => {
        return contentItems.filter((item) => {
            const matchesSearch =
                item.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                item.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "All Status" ||
                item.status === statusFilter;

            const matchesType =
                typeFilter === "All Types" ||
                item.type === typeFilter;

            const matchesTab =
                activeTab === "All Content" ||
                item.type === typeMapping[activeTab];

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesTab
            );
        });
    }, [
        contentItems,
        searchTerm,
        statusFilter,
        typeFilter,
        activeTab,
    ]);

    const totalPages = contentItems.filter(
        (item) => item.type === "Page"
    ).length;

    const publishedCount = contentItems.filter(
        (item) => item.status === "Published"
    ).length;

    const draftCount = contentItems.filter(
        (item) => item.status === "Draft"
    ).length;

    const pendingCount = contentItems.filter(
        (item) => item.status === "Pending"
    ).length;

    const faqCount = contentItems.filter(
        (item) => item.type === "FAQ"
    ).length;

    const successStoryCount = contentItems.filter(
        (item) => item.type === "Success Story"
    ).length;

    const blogCount = contentItems.filter(
        (item) => item.type === "Blog"
    ).length;

    const openCreateModal = () => {
        setEditingContent(null);
        setFormData({
            title: "",
            type: "Page",
            category: "Website",
            status: "Draft",
            description: "",
            author: "Admin",
            featured: false,
        });
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setEditingContent(item);
        setFormData({
            title: item.title,
            type: item.type,
            category: item.category,
            status: item.status,
            description: item.description,
            author: item.author,
            featured: item.featured,
        });
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSaveContent = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            return;
        }

        if (editingContent) {
            setContentItems((prev) =>
                prev.map((item) =>
                    item.id === editingContent.id
                        ? {
                              ...item,
                              ...formData,
                              updated: "Just now",
                          }
                        : item
                )
            );
        } else {
            const newContent = {
                id: Date.now(),
                ...formData,
                updated: "Just now",
            };

            setContentItems((prev) => [newContent, ...prev]);
        }

        setShowModal(false);
    };

    const deleteContent = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this content?"
        );

        if (!confirmDelete) return;

        setContentItems((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const toggleFeatured = (id) => {
        setContentItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          featured: !item.featured,
                      }
                    : item
            )
        );
    };

    const changeStatus = (id, newStatus) => {
        setContentItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status: newStatus,
                          updated: "Just now",
                      }
                    : item
            )
        );
    };

    const toggleHomepageSection = (id) => {
        setHomepageSections((prev) =>
            prev.map((section) =>
                section.id === id
                    ? {
                          ...section,
                          status:
                              section.status === "Published"
                                  ? "Hidden"
                                  : "Published",
                      }
                    : section
            )
        );
    };

    const getStatusClass = (status) => {
        if (status === "Published") return "content-status published";
        if (status === "Pending") return "content-status pending";
        if (status === "Draft") return "content-status draft";
        return "content-status hidden";
    };

    const getTypeClass = (type) => {
        if (type === "Page") return "content-type page-type";
        if (type === "Blog") return "content-type blog-type";
        if (type === "FAQ") return "content-type faq-type";
        if (type === "Success Story")
            return "content-type story-type";
        if (type === "Policy")
            return "content-type policy-type";

        return "content-type";
    };

    return (
        <div className="admin-content-page">

            {/* ================= HEADER ================= */}

            <div className="content-page-header">

                <div>
                    <div className="content-breadcrumb">
                        Admin <span>/</span> Content Management
                    </div>

                    <h1>Content Management</h1>

                    <p>
                        Manage the stories, pages, communication and
                        information displayed across Niyati Matrimony.
                    </p>
                </div>

                <button
                    className="add-content-btn"
                    onClick={openCreateModal}
                >
                    <span>+</span>
                    Add Content
                </button>

            </div>

            {/* ================= SUMMARY ================= */}

            <div className="content-summary-grid">

                <div className="content-summary-card">
                    <div className="summary-content-icon page-summary">
                        ◈
                    </div>

                    <div>
                        <span>Total Pages</span>
                        <strong>{totalPages}</strong>
                        <small>Website content</small>
                    </div>
                </div>

                <div className="content-summary-card">
                    <div className="summary-content-icon published-summary">
                        ✓
                    </div>

                    <div>
                        <span>Published</span>
                        <strong>{publishedCount}</strong>
                        <small>Currently visible</small>
                    </div>
                </div>

                <div className="content-summary-card">
                    <div className="summary-content-icon draft-summary">
                        ◷
                    </div>

                    <div>
                        <span>Drafts</span>
                        <strong>{draftCount}</strong>
                        <small>Waiting to publish</small>
                    </div>
                </div>

                <div className="content-summary-card">
                    <div className="summary-content-icon story-summary">
                        ♥
                    </div>

                    <div>
                        <span>Success Stories</span>
                        <strong>{successStoryCount}</strong>
                        <small>{pendingCount} pending review</small>
                    </div>
                </div>

            </div>

            {/* ================= CONTENT LIBRARY ================= */}

            <section className="content-section content-library-section">

                <div className="content-section-heading">

                    <div>
                        <h2>Content Library</h2>
                        <p>
                            Search, review and manage all website content
                            from one place.
                        </p>
                    </div>

                    <div className="content-library-stats">
                        <span>{blogCount} Blogs</span>
                        <span>{faqCount} FAQs</span>
                    </div>

                </div>

                {/* TABS */}

                <div className="content-tabs">

                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={
                                activeTab === tab
                                    ? "content-tab active"
                                    : "content-tab"
                            }
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}

                </div>

                {/* TOOLBAR */}

                <div className="content-toolbar">

                    <div className="content-search">

                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search content..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="clear-content-search"
                            >
                                ×
                            </button>
                        )}

                    </div>

                    <div className="content-filters">

                        <select
                            value={typeFilter}
                            onChange={(e) =>
                                setTypeFilter(e.target.value)
                            }
                        >
                            <option>All Types</option>
                            <option>Page</option>
                            <option>Blog</option>
                            <option>FAQ</option>
                            <option>Success Story</option>
                            <option>Policy</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <option>All Status</option>
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Pending</option>
                            <option>Hidden</option>
                        </select>

                    </div>

                </div>

                {/* TABLE */}

                <div className="content-table-wrapper">

                    <table className="content-table">

                        <thead>
                            <tr>
                                <th>CONTENT</th>
                                <th>TYPE</th>
                                <th>STATUS</th>
                                <th>UPDATED</th>
                                <th>AUTHOR</th>
                                <th>FEATURED</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredContent.length > 0 ? (
                                filteredContent.map((item) => (
                                    <tr key={item.id}>

                                        <td>
                                            <div className="content-title-cell">

                                                <div
                                                    className={getTypeClass(
                                                        item.type
                                                    )}
                                                >
                                                    {item.type === "Page" &&
                                                        "▣"}

                                                    {item.type === "Blog" &&
                                                        "✎"}

                                                    {item.type === "FAQ" &&
                                                        "?"}

                                                    {item.type ===
                                                        "Success Story" &&
                                                        "♥"}

                                                    {item.type === "Policy" &&
                                                        "◈"}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {item.title}
                                                    </strong>

                                                    <span>
                                                        {item.description}
                                                    </span>
                                                </div>

                                            </div>
                                        </td>

                                        <td>
                                            <span className="content-category">
                                                {item.category}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={getStatusClass(
                                                    item.status
                                                )}
                                            >
                                                <i></i>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="updated-text">
                                                {item.updated}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="author-text">
                                                {item.author}
                                            </span>
                                        </td>

                                        <td>

                                            <button
                                                className={
                                                    item.featured
                                                        ? "featured-toggle active"
                                                        : "featured-toggle"
                                                }
                                                onClick={() =>
                                                    toggleFeatured(
                                                        item.id
                                                    )
                                                }
                                                title={
                                                    item.featured
                                                        ? "Remove featured"
                                                        : "Mark as featured"
                                                }
                                            >
                                                {item.featured
                                                    ? "★"
                                                    : "☆"}
                                            </button>

                                        </td>

                                        <td className="content-action-cell">

                                            <button
                                                className="content-edit-btn"
                                                onClick={() =>
                                                    openEditModal(item)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="content-more-btn"
                                                onClick={() =>
                                                    changeStatus(
                                                        item.id,
                                                        item.status ===
                                                            "Published"
                                                            ? "Draft"
                                                            : "Published"
                                                    )
                                                }
                                                title={
                                                    item.status ===
                                                    "Published"
                                                        ? "Move to draft"
                                                        : "Publish"
                                                }
                                            >
                                                ⋮
                                            </button>

                                            <div className="content-action-dropdown">

                                                <button
                                                    onClick={() =>
                                                        openEditModal(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Edit Content
                                                </button>

                                                {item.status !==
                                                    "Published" && (
                                                    <button
                                                        onClick={() =>
                                                            changeStatus(
                                                                item.id,
                                                                "Published"
                                                            )
                                                        }
                                                    >
                                                        Publish
                                                    </button>
                                                )}

                                                {item.status ===
                                                    "Published" && (
                                                    <button
                                                        onClick={() =>
                                                            changeStatus(
                                                                item.id,
                                                                "Draft"
                                                            )
                                                        }
                                                    >
                                                        Move to Draft
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() =>
                                                        toggleFeatured(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    {item.featured
                                                        ? "Remove Featured"
                                                        : "Mark Featured"}
                                                </button>

                                                <button
                                                    className="delete-content-action"
                                                    onClick={() =>
                                                        deleteContent(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="no-content-found"
                                    >
                                        <div>
                                            <span>⌕</span>
                                            <h3>No content found</h3>
                                            <p>
                                                Try changing your search or
                                                filter.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

                <div className="content-table-footer">

                    Showing{" "}
                    <strong>{filteredContent.length}</strong>{" "}
                    of{" "}
                    <strong>{contentItems.length}</strong>{" "}
                    content items

                </div>

            </section>

            {/* ================= QUICK TOOLS ================= */}

            <section className="content-section quick-tools-section">

                <div className="content-section-heading">

                    <div>
                        <h2>Quick Content Tools</h2>
                        <p>
                            Quickly access the most important content areas.
                        </p>
                    </div>

                </div>

                <div className="quick-tools-grid">

                    <button
                        className="quick-tool-card"
                        onClick={() => {
                            setActiveTab("Pages");
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <div className="quick-tool-icon page-tool">
                            ▣
                        </div>

                        <div>
                            <strong>Website Pages</strong>
                            <span>
                                Manage About, Contact and other pages
                            </span>
                        </div>

                        <b>→</b>
                    </button>

                    <button
                        className="quick-tool-card"
                        onClick={() => {
                            setActiveTab("FAQs");
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <div className="quick-tool-icon faq-tool">
                            ?
                        </div>

                        <div>
                            <strong>FAQ Manager</strong>
                            <span>
                                Manage frequently asked questions
                            </span>
                        </div>

                        <b>→</b>
                    </button>

                    <button
                        className="quick-tool-card"
                        onClick={() => {
                            setActiveTab("Success Stories");
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <div className="quick-tool-icon story-tool">
                            ♥
                        </div>

                        <div>
                            <strong>Success Stories</strong>
                            <span>
                                Review and feature couple stories
                            </span>
                        </div>

                        <b>→</b>
                    </button>

                    <button
                        className="quick-tool-card"
                        onClick={() => {
                            setActiveTab("Blogs");
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <div className="quick-tool-icon blog-tool">
                            ✎
                        </div>

                        <div>
                            <strong>Blog & Articles</strong>
                            <span>
                                Manage relationship and profile content
                            </span>
                        </div>

                        <b>→</b>
                    </button>

                </div>

            </section>

            {/* ================= HOMEPAGE CONTENT ================= */}

            <section className="content-section homepage-content-section">

                <div className="content-section-heading">

                    <div>
                        <h2>Homepage Content</h2>
                        <p>
                            Control the major sections displayed on the
                            Niyati homepage.
                        </p>
                    </div>

                    <span className="homepage-live-badge">
                        ● Live Preview Structure
                    </span>

                </div>

                <div className="homepage-content-list">

                    {homepageSections.map((section) => (
                        <div
                            className="homepage-content-item"
                            key={section.id}
                        >

                            <div className="homepage-content-number">
                                {String(section.id).padStart(2, "0")}
                            </div>

                            <div className="homepage-content-info">

                                <strong>{section.title}</strong>

                                <span>
                                    {section.description}
                                </span>

                            </div>

                            <span
                                className={
                                    section.status === "Published"
                                        ? "homepage-status visible"
                                        : "homepage-status hidden-status"
                                }
                            >
                                {section.status}
                            </span>

                            <button
                                className="homepage-edit-btn"
                                onClick={() =>
                                    toggleHomepageSection(
                                        section.id
                                    )
                                }
                            >
                                {section.status === "Published"
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>
                    ))}

                </div>

            </section>

            {/* ================= LOWER GRID ================= */}

            <div className="content-lower-grid">

                {/* ANNOUNCEMENT */}

                <section className="content-section announcement-section">

                    <div className="content-section-heading">

                        <div>
                            <h2>Site Announcement</h2>
                            <p>
                                Display an important message across the
                                website.
                            </p>
                        </div>

                        <span
                            className={
                                announcement.status === "Active"
                                    ? "announcement-status active"
                                    : "announcement-status"
                            }
                        >
                            {announcement.status}
                        </span>

                    </div>

                    <div className="announcement-preview">

                        <div className="announcement-preview-icon">
                            !
                        </div>

                        <div>

                            <strong>{announcement.title}</strong>

                            <p>{announcement.message}</p>

                        </div>

                    </div>

                    <div className="announcement-controls">

                        <input
                            type="text"
                            value={announcement.title}
                            onChange={(e) =>
                                setAnnouncement((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                        />

                        <textarea
                            value={announcement.message}
                            onChange={(e) =>
                                setAnnouncement((prev) => ({
                                    ...prev,
                                    message: e.target.value,
                                }))
                            }
                        />

                        <div className="announcement-actions">

                            <button
                                className="announcement-toggle"
                                onClick={() =>
                                    setAnnouncement((prev) => ({
                                        ...prev,
                                        status:
                                            prev.status === "Active"
                                                ? "Inactive"
                                                : "Active",
                                    }))
                                }
                            >
                                {announcement.status === "Active"
                                    ? "Disable"
                                    : "Activate"}
                            </button>

                            <button className="announcement-save">
                                Save Announcement
                            </button>

                        </div>

                    </div>

                </section>

                {/* SEO */}

                <section className="content-section seo-section">

                    <div className="content-section-heading">

                        <div>
                            <h2>SEO Overview</h2>
                            <p>
                                Keep important website pages search-ready.
                            </p>
                        </div>

                        <span className="seo-score">
                            86%
                        </span>

                    </div>

                    <div className="seo-progress">

                        <div>
                            <span>
                                Overall SEO readiness
                            </span>

                            <strong>
                                Good
                            </strong>
                        </div>

                        <div className="seo-progress-bar">
                            <span></span>
                        </div>

                    </div>

                    <div className="seo-check-list">

                        <div>
                            <span className="seo-check">✓</span>
                            <span>Meta titles configured</span>
                        </div>

                        <div>
                            <span className="seo-check">✓</span>
                            <span>Meta descriptions configured</span>
                        </div>

                        <div>
                            <span className="seo-check">✓</span>
                            <span>SEO-friendly page URLs</span>
                        </div>

                        <div>
                            <span className="seo-warning">!</span>
                            <span>3 pages need review</span>
                        </div>

                    </div>

                    <button className="seo-manage-btn">
                        Manage SEO Settings →
                    </button>

                </section>

            </div>

            {/* ================= MEDIA & PROMOTIONS ================= */}

            <section className="content-section media-section">

                <div className="content-section-heading">

                    <div>
                        <h2>Media & Promotions</h2>
                        <p>
                            Manage visual content and promotional areas.
                        </p>
                    </div>

                </div>

                <div className="media-grid">

                    <div className="media-card">

                        <div className="media-card-icon">
                            ▣
                        </div>

                        <div>
                            <strong>Banner Management</strong>
                            <span>
                                Homepage, promotional and campaign banners
                            </span>
                        </div>

                        <button>
                            Manage →
                        </button>

                    </div>

                    <div className="media-card">

                        <div className="media-card-icon">
                            ◉
                        </div>

                        <div>
                            <strong>Media Library</strong>
                            <span>
                                Images and visual assets used by Niyati
                            </span>
                        </div>

                        <button>
                            Manage →
                        </button>

                    </div>

                    <div className="media-card">

                        <div className="media-card-icon">
                            ★
                        </div>

                        <div>
                            <strong>Featured Content</strong>
                            <span>
                                Content highlighted across the platform
                            </span>
                        </div>

                        <button>
                            Manage →
                        </button>

                    </div>

                </div>

            </section>

            {/* ================= MODAL ================= */}

            {showModal && (
                <div
                    className="content-modal-overlay"
                    onMouseDown={(e) => {
                        if (
                            e.target.className ===
                            "content-modal-overlay"
                        ) {
                            setShowModal(false);
                        }
                    }}
                >

                    <div className="content-modal">

                        <div className="content-modal-header">

                            <div>
                                <span>CONTENT EDITOR</span>

                                <h2>
                                    {editingContent
                                        ? "Edit Content"
                                        : "Add New Content"}
                                </h2>

                                <p>
                                    Create or update content for Niyati
                                    Matrimony.
                                </p>
                            </div>

                            <button
                                className="content-modal-close"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleSaveContent}>

                            <div className="content-form-group">

                                <label>
                                    Content Title
                                </label>

                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    placeholder="Enter content title"
                                    required
                                />

                            </div>

                            <div className="content-form-row">

                                <div className="content-form-group">

                                    <label>
                                        Content Type
                                    </label>

                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleFormChange}
                                    >
                                        <option>
                                            Page
                                        </option>

                                        <option>
                                            Blog
                                        </option>

                                        <option>
                                            FAQ
                                        </option>

                                        <option>
                                            Success Story
                                        </option>

                                        <option>
                                            Policy
                                        </option>
                                    </select>

                                </div>

                                <div className="content-form-group">

                                    <label>
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleFormChange}
                                    >
                                        <option>
                                            Website
                                        </option>

                                        <option>
                                            Help
                                        </option>

                                        <option>
                                            Profile Tips
                                        </option>

                                        <option>
                                            Relationship Advice
                                        </option>

                                        <option>
                                            Stories
                                        </option>

                                        <option>
                                            Safety
                                        </option>

                                        <option>
                                            Membership
                                        </option>

                                        <option>
                                            Legal
                                        </option>

                                        <option>
                                            Family
                                        </option>
                                    </select>

                                </div>

                            </div>

                            <div className="content-form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    placeholder="Enter a short description..."
                                    rows="4"
                                />

                            </div>

                            <div className="content-form-row">

                                <div className="content-form-group">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleFormChange}
                                    >
                                        <option>
                                            Draft
                                        </option>

                                        <option>
                                            Published
                                        </option>

                                        <option>
                                            Pending
                                        </option>

                                        <option>
                                            Hidden
                                        </option>
                                    </select>

                                </div>

                                <div className="content-form-group">

                                    <label>
                                        Author
                                    </label>

                                    <input
                                        name="author"
                                        value={formData.author}
                                        onChange={handleFormChange}
                                    />

                                </div>

                            </div>

                            <label className="featured-checkbox">

                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleFormChange}
                                />

                                <span>
                                    Feature this content
                                </span>

                            </label>

                            <div className="content-modal-actions">

                                <button
                                    type="button"
                                    className="content-cancel-btn"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="content-save-btn"
                                >
                                    {editingContent
                                        ? "Save Changes"
                                        : "Create Content"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default AdminContentManagement;