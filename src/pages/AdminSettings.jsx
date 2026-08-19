import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminSettings.css";

function AdminSettings() {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("general");
    const [saved, setSaved] = useState(false);

    const [settings, setSettings] = useState({
        platformName: "Niyati Matrimony",
        tagline: "Destined Together",
        supportEmail: "support@niyati.com",
        supportPhone: "+91 98765 43210",
        website: "www.niyati.com",

        maintenanceMode: false,

        twoFactor: true,
        loginNotifications: true,
        rememberDevice: false,
        sessionTimeout: "30",

        newRegistration: true,
        emailVerification: true,
        mobileVerification: false,
        profileApproval: true,

        photoModeration: true,
        autoApproveVerified: false,
        duplicateProfiles: false,

        membershipEnabled: true,
        freeRegistration: true,
        autoRenewal: true,
        gracePeriod: "3",

        profileVisibility: "Public",
        photoVisibility: "Members Only",
        contactVisibility: "Hidden by Default",
        onlineStatus: "Visible",

        emailNotifications: true,
        smsNotifications: false,

        matchRecommendations: true,
        mutualPreferences: true,
        activeProfiles: true,

        profileReporting: true,
        messageReporting: true,
        suspiciousAlerts: true,
        multipleReports: true,

        showSuccessStories: true,
        showTestimonials: true,
        showBlog: true,
        showFAQ: true,
        showFeaturedProfiles: true
    });

    const settingsMenu = [
        {
            id: "general",
            icon: "⚙",
            title: "General",
            description: "Platform information"
        },
        {
            id: "admin",
            icon: "♙",
            title: "Admin Account",
            description: "Account & password"
        },
        {
            id: "security",
            icon: "🔐",
            title: "Security",
            description: "Login protection"
        },
        {
            id: "notifications",
            icon: "♧",
            title: "Notifications",
            description: "Admin alerts"
        },
        {
            id: "users",
            icon: "♙",
            title: "Users",
            description: "Registration rules"
        },
        {
            id: "moderation",
            icon: "✓",
            title: "Moderation",
            description: "Profile approval"
        },
        {
            id: "memberships",
            icon: "♕",
            title: "Memberships",
            description: "Membership controls"
        },
        {
            id: "payments",
            icon: "₹",
            title: "Payments",
            description: "Payment configuration"
        },
        {
            id: "privacy",
            icon: "♢",
            title: "Privacy",
            description: "Privacy controls"
        },
        {
            id: "email",
            icon: "✉",
            title: "Email & SMS",
            description: "Communication"
        },
        {
            id: "content",
            icon: "▤",
            title: "Content",
            description: "Website content"
        },
        {
            id: "matching",
            icon: "♡",
            title: "Matching",
            description: "Match preferences"
        },
        {
            id: "safety",
            icon: "🛡",
            title: "Safety",
            description: "Reports & alerts"
        },
        {
            id: "system",
            icon: "▣",
            title: "System",
            description: "System information"
        },
        {
            id: "audit",
            icon: "▥",
            title: "Audit Logs",
            description: "Admin activity"
        }
    ];

    const updateSetting = (key, value) => {
        setSettings((previous) => ({
            ...previous,
            [key]: value
        }));

        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    const renderToggle = (key) => (
        <button
            type="button"
            className={`settings-toggle ${
                settings[key] ? "toggle-on" : ""
            }`}
            onClick={() => updateSetting(key, !settings[key])}
            aria-label={`Toggle ${key}`}
        >
            <span className="toggle-circle"></span>
        </button>
    );

    const renderStatus = (status = "Operational") => (
        <span className="settings-status">
            <i></i>
            {status}
        </span>
    );

    const renderGeneral = () => (
        <>
            <SettingsSection
                title="Platform Information"
                description="Manage the basic information displayed across your Niyati platform."
            >
                <div className="settings-form-grid">
                    <SettingsInput
                        label="Platform Name"
                        value={settings.platformName}
                        onChange={(value) =>
                            updateSetting("platformName", value)
                        }
                    />

                    <SettingsInput
                        label="Tagline"
                        value={settings.tagline}
                        onChange={(value) =>
                            updateSetting("tagline", value)
                        }
                    />

                    <SettingsInput
                        label="Support Email"
                        value={settings.supportEmail}
                        onChange={(value) =>
                            updateSetting("supportEmail", value)
                        }
                    />

                    <SettingsInput
                        label="Support Phone"
                        value={settings.supportPhone}
                        onChange={(value) =>
                            updateSetting("supportPhone", value)
                        }
                    />

                    <SettingsInput
                        label="Website"
                        value={settings.website}
                        onChange={(value) =>
                            updateSetting("website", value)
                        }
                    />
                </div>
            </SettingsSection>

            <SettingsSection
                title="Platform Status"
                description="Control the availability of the Niyati platform."
            >
                <SettingRow
                    icon="◉"
                    title="Platform Status"
                    description="Your Niyati platform is currently available to users."
                    right={renderStatus("Online")}
                />

                <SettingRow
                    icon="⚙"
                    title="Maintenance Mode"
                    description="Temporarily restrict user access while maintenance is being performed."
                    right={renderToggle("maintenanceMode")}
                />
            </SettingsSection>
        </>
    );

    const renderAdmin = () => (
        <>
            <SettingsSection
                title="Administrator Profile"
                description="Manage the account information for the current administrator."
            >
                <div className="admin-account-card">
                    <div className="admin-account-avatar">
                        SA
                    </div>

                    <div className="admin-account-details">
                        <span className="account-label">
                            CURRENT ADMINISTRATOR
                        </span>

                        <h3>Super Administrator</h3>

                        <p>admin@niyati.com</p>

                        <span className="admin-role-label">
                            Super Administrator
                        </span>
                    </div>

                    <button className="outline-settings-btn">
                        Edit Profile
                    </button>
                </div>
            </SettingsSection>

            <SettingsSection
                title="Change Password"
                description="Keep your administrator account protected with a strong password."
            >
                <div className="settings-form-grid">
                    <SettingsPassword label="Current Password" />
                    <SettingsPassword label="New Password" />
                    <SettingsPassword label="Confirm Password" />
                </div>

                <div className="password-strength">
                    <div className="strength-header">
                        <span>Password Strength</span>
                        <strong>Strong</strong>
                    </div>

                    <div className="strength-bar">
                        <span></span>
                    </div>
                </div>

                <div className="settings-actions">
                    <button className="primary-small-btn">
                        Update Password
                    </button>
                </div>
            </SettingsSection>
        </>
    );

    const renderSecurity = () => (
        <>
            <SettingsSection
                title="Login Security"
                description="Protect administrator accounts and monitor access to your dashboard."
            >
                <SettingRow
                    icon="2FA"
                    title="Two-Factor Authentication"
                    description="Require an additional verification step when administrators sign in."
                    right={renderToggle("twoFactor")}
                />

                <SettingRow
                    icon="!"
                    title="Login Notifications"
                    description="Receive an alert whenever an administrator account is accessed."
                    right={renderToggle("loginNotifications")}
                />

                <SettingRow
                    icon="✓"
                    title="Remember Admin Device"
                    description="Allow trusted devices to remain signed in for a longer period."
                    right={renderToggle("rememberDevice")}
                />

                <div className="inline-setting">
                    <div>
                        <strong>Session Timeout</strong>
                        <span>Automatically sign out inactive administrator sessions.</span>
                    </div>

                    <select
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                            updateSetting("sessionTimeout", e.target.value)
                        }
                    >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                    </select>
                </div>
            </SettingsSection>

            <SettingsSection
                title="Current Session"
                description="Review the current administrator login session."
            >
                <div className="session-card">
                    <div className="session-device-icon">
                        ▣
                    </div>

                    <div className="session-details">
                        <strong>Chrome • Windows</strong>
                        <span>Current device · Active now</span>
                        <small>Last login: 18 Aug 2026 · 09:42 AM</small>
                    </div>

                    <span className="current-session">
                        Current
                    </span>
                </div>

                <button className="danger-outline-btn">
                    Logout From All Other Devices
                </button>
            </SettingsSection>
        </>
    );

    const renderNotifications = () => (
        <SettingsSection
            title="Admin Notifications"
            description="Choose which platform events should notify administrators."
        >
            <NotificationRow
                title="New User Registration"
                description="Notify when a new member creates an account."
                email
                inApp
            />

            <NotificationRow
                title="Profile Pending Approval"
                description="Notify when a profile requires moderation."
                email
                inApp
            />

            <NotificationRow
                title="New Report"
                description="Receive alerts when a user or profile is reported."
                email
                inApp
            />

            <NotificationRow
                title="New Support Request"
                description="Notify administrators about new support conversations."
                email
                inApp
            />

            <NotificationRow
                title="Payment Received"
                description="Receive alerts when a membership payment is completed."
                email
                inApp
            />

            <NotificationRow
                title="Membership Expiring"
                description="Notify administrators about memberships nearing expiry."
                email={false}
                inApp
            />

            <NotificationRow
                title="Security Alert"
                description="Receive immediate notifications for important security events."
                email
                inApp
            />
        </SettingsSection>
    );

    const renderUsers = () => (
        <SettingsSection
            title="Registration Controls"
            description="Configure how new members enter and verify the Niyati platform."
        >
            <SettingRow
                icon="+"
                title="Allow New Registrations"
                description="Allow new users to create matrimonial profiles."
                right={renderToggle("newRegistration")}
            />

            <SettingRow
                icon="✉"
                title="Email Verification Required"
                description="Require users to verify their email address before continuing."
                right={renderToggle("emailVerification")}
            />

            <SettingRow
                icon="☎"
                title="Mobile Verification Required"
                description="Require mobile verification during registration."
                right={renderToggle("mobileVerification")}
            />

            <SettingRow
                icon="✓"
                title="Profile Approval Required"
                description="Send newly created profiles to administrators for approval."
                right={renderToggle("profileApproval")}
            />
        </SettingsSection>
    );

    const renderModeration = () => (
        <>
            <SettingsSection
                title="Profile Moderation"
                description="Control how profiles and photos are reviewed before becoming visible."
            >
                <SettingRow
                    icon="✓"
                    title="Photo Moderation Required"
                    description="Require photos to be reviewed before they become publicly visible."
                    right={renderToggle("photoModeration")}
                />

                <SettingRow
                    icon="★"
                    title="Auto Approve Verified Users"
                    description="Automatically approve profiles belonging to verified users."
                    right={renderToggle("autoApproveVerified")}
                />

                <SettingRow
                    icon="!"
                    title="Prevent Duplicate Profiles"
                    description="Flag accounts that appear to contain duplicate profile information."
                    right={renderToggle("duplicateProfiles")}
                />
            </SettingsSection>

            <SettingsSection
                title="Moderation Actions"
                description="Actions available to administrators when reviewing profiles."
            >
                <div className="moderation-action-grid">
                    <div>⚠ <span>Warning</span></div>
                    <div>⏸ <span>Suspend</span></div>
                    <div>× <span>Reject</span></div>
                    <div>⊘ <span>Block</span></div>
                    <div>⌫ <span>Delete</span></div>
                </div>
            </SettingsSection>
        </>
    );

    const renderMemberships = () => (
        <SettingsSection
            title="Membership Settings"
            description="Configure the basic behavior of Niyati membership plans."
        >
            <SettingRow
                icon="♕"
                title="Premium Memberships"
                description="Enable premium membership features on the platform."
                right={renderToggle("membershipEnabled")}
            />

            <SettingRow
                icon="○"
                title="Free Registration"
                description="Allow users to create profiles without purchasing a membership."
                right={renderToggle("freeRegistration")}
            />

            <SettingRow
                icon="↻"
                title="Auto Renewal"
                description="Allow eligible memberships to renew automatically."
                right={renderToggle("autoRenewal")}
            />

            <div className="inline-setting">
                <div>
                    <strong>Grace Period</strong>
                    <span>Additional days provided after membership expiry.</span>
                </div>

                <select
                    value={settings.gracePeriod}
                    onChange={(e) =>
                        updateSetting("gracePeriod", e.target.value)
                    }
                >
                    <option value="0">No grace period</option>
                    <option value="3">3 days</option>
                    <option value="5">5 days</option>
                    <option value="7">7 days</option>
                </select>
            </div>
        </SettingsSection>
    );

    const renderPayments = () => (
        <>
            <SettingsSection
                title="Payment Gateway"
                description="Configure the payment service used for membership transactions."
            >
                <div className="payment-provider-card">
                    <div className="payment-logo">
                        ₹
                    </div>

                    <div>
                        <span className="account-label">
                            PAYMENT PROVIDER
                        </span>

                        <h3>Razorpay</h3>

                        <p>Primary payment gateway</p>
                    </div>

                    {renderStatus("Connected")}
                </div>

                <div className="settings-form-grid payment-grid">
                    <div className="static-field">
                        <label>Currency</label>
                        <div>INR (₹)</div>
                    </div>

                    <div className="static-field">
                        <label>Tax / GST</label>
                        <div>18%</div>
                    </div>
                </div>

                <button className="outline-settings-btn payment-manage-btn">
                    Manage Payment Settings
                </button>
            </SettingsSection>
        </>
    );

    const renderPrivacy = () => (
        <SettingsSection
            title="Default Privacy"
            description="Set the default visibility options for newly created profiles."
        >
            <SelectSetting
                label="Profile Visibility"
                description="Control who can discover a member profile."
                value={settings.profileVisibility}
                options={["Public", "Members Only", "Private"]}
                onChange={(value) =>
                    updateSetting("profileVisibility", value)
                }
            />

            <SelectSetting
                label="Photo Visibility"
                description="Control who can view member profile photos."
                value={settings.photoVisibility}
                options={["Public", "Members Only", "Premium Members"]}
                onChange={(value) =>
                    updateSetting("photoVisibility", value)
                }
            />

            <SelectSetting
                label="Contact Information"
                description="Choose the default visibility of contact information."
                value={settings.contactVisibility}
                options={[
                    "Hidden by Default",
                    "Members Only",
                    "Visible"
                ]}
                onChange={(value) =>
                    updateSetting("contactVisibility", value)
                }
            />

            <SelectSetting
                label="Online Status"
                description="Choose whether member online status is visible."
                value={settings.onlineStatus}
                options={["Visible", "Hidden"]}
                onChange={(value) =>
                    updateSetting("onlineStatus", value)
                }
            />
        </SettingsSection>
    );

    const renderEmail = () => (
        <>
            <SettingsSection
                title="Email & SMS"
                description="Configure how Niyati communicates important information to members."
            >
                <div className="settings-form-grid">
                    <SettingsInput
                        label="Sender Name"
                        value="Niyati Matrimony"
                        readOnly
                    />

                    <SettingsInput
                        label="Sender Email"
                        value="support@niyati.com"
                        readOnly
                    />

                    <SettingsInput
                        label="Email Provider"
                        value="SMTP"
                        readOnly
                    />

                    <SettingsInput
                        label="SMS Provider"
                        value="Not Connected"
                        readOnly
                    />
                </div>

                <SettingRow
                    icon="✉"
                    title="Email Notifications"
                    description="Allow the platform to send automated email notifications."
                    right={renderToggle("emailNotifications")}
                />

                <SettingRow
                    icon="☎"
                    title="SMS Notifications"
                    description="Allow the platform to send automated SMS notifications."
                    right={renderToggle("smsNotifications")}
                />

                <div className="settings-actions">
                    <button className="outline-settings-btn">
                        Send Test Email
                    </button>

                    <button className="outline-settings-btn">
                        Send Test SMS
                    </button>
                </div>
            </SettingsSection>
        </>
    );

    const renderContent = () => (
        <SettingsSection
            title="Website Content"
            description="Control which content sections are displayed on the public Niyati website."
        >
            <SettingRow
                icon="♡"
                title="Success Stories"
                description="Display the success stories section on the public website."
                right={renderToggle("showSuccessStories")}
            />

            <SettingRow
                icon="★"
                title="Testimonials"
                description="Display member testimonials and reviews."
                right={renderToggle("showTestimonials")}
            />

            <SettingRow
                icon="▤"
                title="Blog Section"
                description="Display the Niyati blog and articles section."
                right={renderToggle("showBlog")}
            />

            <SettingRow
                icon="?"
                title="FAQ Section"
                description="Display frequently asked questions on the website."
                right={renderToggle("showFAQ")}
            />

            <SettingRow
                icon="♕"
                title="Featured Profiles"
                description="Display selected featured profiles on the public website."
                right={renderToggle("showFeaturedProfiles")}
            />
        </SettingsSection>
    );

    const renderMatching = () => (
        <SettingsSection
            title="Matching Preferences"
            description="Configure the general behavior of Niyati's recommendation system."
        >
            <SettingRow
                icon="♡"
                title="Match Recommendations"
                description="Show recommended profiles to members based on their preferences."
                right={renderToggle("matchRecommendations")}
            />

            <SettingRow
                icon="✓"
                title="Mutual Preferences"
                description="Consider preferences from both members when recommending matches."
                right={renderToggle("mutualPreferences")}
            />

            <SettingRow
                icon="●"
                title="Recently Active Profiles"
                description="Give preference to members who have recently used the platform."
                right={renderToggle("activeProfiles")}
            />

            <div className="match-score-card">
                <div>
                    <span>RECOMMENDATION THRESHOLD</span>
                    <strong>60%</strong>
                    <p>Minimum compatibility score for recommended profiles.</p>
                </div>

                <div className="score-bar">
                    <span></span>
                </div>
            </div>
        </SettingsSection>
    );

    const renderSafety = () => (
        <SettingsSection
            title="Safety & Reports"
            description="Protect members and help administrators respond to suspicious activity."
        >
            <SettingRow
                icon="⚑"
                title="Profile Reporting"
                description="Allow members to report profiles that violate community guidelines."
                right={renderToggle("profileReporting")}
            />

            <SettingRow
                icon="✉"
                title="Message Reporting"
                description="Allow members to report inappropriate messages."
                right={renderToggle("messageReporting")}
            />

            <SettingRow
                icon="!"
                title="Suspicious Activity Alerts"
                description="Notify administrators about potentially suspicious activity."
                right={renderToggle("suspiciousAlerts")}
            />

            <SettingRow
                icon="⚠"
                title="Multiple Report Detection"
                description="Automatically flag profiles receiving repeated reports."
                right={renderToggle("multipleReports")}
            />

            <div className="safety-status-card">
                <div className="safety-status-icon">
                    ✓
                </div>

                <div>
                    <strong>Safety Monitoring Active</strong>
                    <p>
                        Niyati safety and reporting controls are currently
                        operational.
                    </p>
                </div>

                {renderStatus("Active")}
            </div>
        </SettingsSection>
    );

    const renderSystem = () => (
        <>
            <SettingsSection
                title="System Information"
                description="View the current status of your Niyati platform."
            >
                <div className="system-grid">
                    <SystemInfo
                        label="Application Version"
                        value="v1.0.0"
                    />

                    <SystemInfo
                        label="Environment"
                        value="Development"
                    />

                    <SystemInfo
                        label="Database"
                        value="Connected"
                        status
                    />

                    <SystemInfo
                        label="Storage"
                        value="Connected"
                        status
                    />

                    <SystemInfo
                        label="Last Backup"
                        value="18 Aug 2026 · 08:30 AM"
                    />

                    <SystemInfo
                        label="System Status"
                        value="Operational"
                        status
                    />
                </div>
            </SettingsSection>

            <SettingsSection
                title="System Maintenance"
                description="Administrative maintenance tools for the platform."
            >
                <div className="maintenance-action">
                    <div>
                        <strong>Clear System Cache</strong>
                        <span>
                            Refresh temporary application data.
                        </span>
                    </div>

                    <button className="outline-settings-btn">
                        Clear Cache
                    </button>
                </div>

                <div className="maintenance-action">
                    <div>
                        <strong>System Backup</strong>
                        <span>
                            Create a backup of the current system data.
                        </span>
                    </div>

                    <button className="outline-settings-btn">
                        Backup Now
                    </button>
                </div>
            </SettingsSection>
        </>
    );

    const renderAudit = () => (
        <SettingsSection
            title="Admin Activity Log"
            description="Review important actions performed by administrators."
        >
            <div className="audit-table-wrapper">
                <table className="audit-table">
                    <thead>
                        <tr>
                            <th>Administrator</th>
                            <th>Action</th>
                            <th>Module</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <strong>Super Administrator</strong>
                            </td>
                            <td>Updated settings</td>
                            <td>Settings</td>
                            <td>18 Aug 2026 · 10:42 AM</td>
                            <td>
                                <span className="audit-success">
                                    Completed
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <strong>Moderator</strong>
                            </td>
                            <td>Approved profile</td>
                            <td>Profile Management</td>
                            <td>18 Aug 2026 · 10:18 AM</td>
                            <td>
                                <span className="audit-success">
                                    Completed
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <strong>Super Administrator</strong>
                            </td>
                            <td>Changed password</td>
                            <td>Security</td>
                            <td>17 Aug 2026 · 06:32 PM</td>
                            <td>
                                <span className="audit-success">
                                    Completed
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <strong>Support Admin</strong>
                            </td>
                            <td>Suspended user</td>
                            <td>User Management</td>
                            <td>17 Aug 2026 · 04:15 PM</td>
                            <td>
                                <span className="audit-success">
                                    Completed
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </SettingsSection>
    );

    const renderSectionContent = () => {
        switch (activeSection) {
            case "general":
                return renderGeneral();
            case "admin":
                return renderAdmin();
            case "security":
                return renderSecurity();
            case "notifications":
                return renderNotifications();
            case "users":
                return renderUsers();
            case "moderation":
                return renderModeration();
            case "memberships":
                return renderMemberships();
            case "payments":
                return renderPayments();
            case "privacy":
                return renderPrivacy();
            case "email":
                return renderEmail();
            case "content":
                return renderContent();
            case "matching":
                return renderMatching();
            case "safety":
                return renderSafety();
            case "system":
                return renderSystem();
            case "audit":
                return renderAudit();
            default:
                return renderGeneral();
        }
    };

    const activeMenu = settingsMenu.find(
        (item) => item.id === activeSection
    );

    return (
        <div className="admin-settings-page">

            {/* =====================================================
                PAGE HEADER
            ====================================================== */}

            <div className="settings-page-header">

                <div>
                    <div className="settings-breadcrumb">
                        Admin <span>/</span> Settings
                    </div>

                    <h1>Settings</h1>

                    <p>
                        Manage your Niyati Matrimony platform,
                        security and system preferences.
                    </p>
                </div>

                <div className="settings-header-actions">

                    {saved && (
                        <span className="changes-saved">
                            ✓ Changes saved
                        </span>
                    )}

                    <button
                        className="save-settings-btn"
                        onClick={handleSave}
                    >
                        <span>✓</span>
                        Save Changes
                    </button>

                </div>

            </div>


            {/* =====================================================
                SETTINGS LAYOUT
            ====================================================== */}

            <div className="settings-layout">

                {/* ================= SETTINGS SIDEBAR ================= */}

                <aside className="settings-navigation">

                    <div className="settings-nav-title">
                        SETTINGS
                    </div>

                    <div className="settings-nav-list">

                        {settingsMenu.map((item) => (
                            <button
                                key={item.id}
                                className={`settings-nav-item ${
                                    activeSection === item.id
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setActiveSection(item.id)
                                }
                            >
                                <span className="settings-nav-icon">
                                    {item.icon}
                                </span>

                                <span className="settings-nav-text">
                                    <strong>{item.title}</strong>
                                    <small>{item.description}</small>
                                </span>

                                <span className="settings-nav-arrow">
                                    ›
                                </span>
                            </button>
                        ))}

                    </div>

                </aside>


                {/* ================= CONTENT ================= */}

                <main className="settings-content">

                    <div className="settings-content-header">

                        <div className="settings-content-icon">
                            {activeMenu?.icon}
                        </div>

                        <div>
                            <span className="settings-content-label">
                                PLATFORM SETTINGS
                            </span>

                            <h2>
                                {activeMenu?.title}
                            </h2>

                            <p>
                                {activeMenu?.description}
                            </p>
                        </div>

                    </div>

                    {renderSectionContent()}


                    {/* ================= DANGER ZONE ================= */}

                    {(activeSection === "system" ||
                        activeSection === "general") && (
                        <div className="danger-zone">

                            <div className="danger-zone-header">

                                <div className="danger-icon">
                                    !
                                </div>

                                <div>
                                    <h3>Advanced Settings</h3>

                                    <p>
                                        These actions can affect the
                                        entire Niyati platform.
                                    </p>
                                </div>

                            </div>

                            <div className="danger-actions">

                                <div>
                                    <strong>
                                        Reset Configuration
                                    </strong>

                                    <span>
                                        Restore settings to their
                                        default values.
                                    </span>
                                </div>

                                <button className="danger-outline-btn">
                                    Reset Settings
                                </button>

                            </div>

                            <div className="danger-actions">

                                <div>
                                    <strong>
                                        Disable Platform
                                    </strong>

                                    <span>
                                        Temporarily disable the
                                        Niyati platform.
                                    </span>
                                </div>

                                <button className="danger-btn">
                                    Disable Platform
                                </button>

                            </div>

                        </div>
                    )}

                </main>

            </div>

        </div>
    );
}


/* ================================================================
   REUSABLE SETTINGS COMPONENTS
================================================================ */

function SettingsSection({
    title,
    description,
    children
}) {
    return (
        <section className="settings-section">

            <div className="settings-section-header">

                <div>
                    <h3>{title}</h3>

                    <p>{description}</p>
                </div>

            </div>

            <div className="settings-section-body">
                {children}
            </div>

        </section>
    );
}


function SettingRow({
    icon,
    title,
    description,
    right
}) {
    return (
        <div className="setting-row">

            <div className="setting-row-left">

                <div className="setting-row-icon">
                    {icon}
                </div>

                <div>
                    <strong>{title}</strong>
                    <span>{description}</span>
                </div>

            </div>

            <div className="setting-row-right">
                {right}
            </div>

        </div>
    );
}


function SettingsInput({
    label,
    value,
    onChange,
    readOnly = false
}) {
    return (
        <div className="settings-input-group">

            <label>{label}</label>

            <input
                type="text"
                value={value}
                readOnly={readOnly}
                onChange={(e) =>
                    onChange && onChange(e.target.value)
                }
            />

        </div>
    );
}


function SettingsPassword({ label }) {
    return (
        <div className="settings-input-group">

            <label>{label}</label>

            <input
                type="password"
                placeholder="••••••••"
            />

        </div>
    );
}


function SelectSetting({
    label,
    description,
    value,
    options,
    onChange
}) {
    return (
        <div className="select-setting-row">

            <div>
                <strong>{label}</strong>
                <span>{description}</span>
            </div>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

        </div>
    );
}


function NotificationRow({
    title,
    description,
    email,
    inApp
}) {
    const [emailEnabled, setEmailEnabled] =
        useState(email);

    const [inAppEnabled, setInAppEnabled] =
        useState(inApp);

    return (
        <div className="notification-row">

            <div className="notification-info">

                <strong>{title}</strong>

                <span>{description}</span>

            </div>

            <div className="notification-controls">

                <div className="notification-option">

                    <span>Email</span>

                    <button
                        type="button"
                        className={`settings-toggle ${
                            emailEnabled
                                ? "toggle-on"
                                : ""
                        }`}
                        onClick={() =>
                            setEmailEnabled(!emailEnabled)
                        }
                    >
                        <span className="toggle-circle"></span>
                    </button>

                </div>

                <div className="notification-option">

                    <span>In-App</span>

                    <button
                        type="button"
                        className={`settings-toggle ${
                            inAppEnabled
                                ? "toggle-on"
                                : ""
                        }`}
                        onClick={() =>
                            setInAppEnabled(!inAppEnabled)
                        }
                    >
                        <span className="toggle-circle"></span>
                    </button>

                </div>

            </div>

        </div>
    );
}


function SystemInfo({
    label,
    value,
    status = false
}) {
    return (
        <div className="system-info-card">

            <span>{label}</span>

            {status ? (
                <div className="system-value-status">
                    <i></i>
                    {value}
                </div>
            ) : (
                <strong>{value}</strong>
            )}

        </div>
    );
}


export default AdminSettings;