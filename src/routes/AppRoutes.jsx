import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Register from "../pages/Register";
import CompleteProfile from "../pages/CompleteProfile";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Inbox from "../pages/Inbox";
import MyProfile from "../pages/MyProfile";
import OtpVerification from "../pages/OtpVerification";
import Tracking from "../pages/Tracking";
import ViewProfile from "../pages/ViewProfile";
import ViewedProfiles from "../pages/ViewedProfiles";
import WhoViewedMe from "../pages/WhoViewedMe";
import Wishlist from "../pages/Wishlist";
import Search from "../pages/Search";
import Notifications from "../pages/Notifications";
import IgnoredProfiles from "../pages/IgnoredProfiles";
import AboutUs from "../pages/AboutUs";
import Home from "../pages/Home";
import DashboardUserDetails from "../pages/DashboardUserDetails";
import AdminLayout from "../components/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminUsers from "../pages/AdminUsers";
import AdminProfileManagement from "../pages/AdminProfileManagement";
import AdminManagement from "../pages/AdminManagement";
import AdminSettings from "../pages/AdminSettings";
import AdminSupportRequests from "../pages/AdminSupportRequests";
import AdminContentManagement from "../pages/AdminContentManagement"; 
import AdminNotifications from "../pages/AdminNotifications";
import AdminPayments from "../pages/AdminPayments";
import AdminReportsAnalytics from "../pages/AdminReportsAnalytics";
import HelpSupport from "../pages/HelpSupport";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-management" element={<AdminManagement />} />
<Route
    path="/admin/settings"
    element={<AdminSettings />}
/>
<Route
    path="/admin/support"
    element={
        <AdminLayout>
            <AdminSupportRequests />
        </AdminLayout>
    }
/>
        <Route path="/admin/users" element={<AdminUsers />} />
<Route
    path="/admin/management"
    element={
        <AdminLayout>
            <AdminManagement />
        </AdminLayout>
    }
/>
<Route
    path="/admin/content"
    element={
        <AdminLayout>
            <AdminContentManagement />
        </AdminLayout>
    }
/>
<Route
    path="/admin/notifications"
    element={
        <AdminLayout>
            <AdminNotifications />
        </AdminLayout>
    }
/>

<Route
    path="/admin/payments"
    element={
        <AdminLayout>
            <AdminPayments />
        </AdminLayout>
    }
/>
<Route
    path="/admin/reports-analytics"
    element={
        <AdminLayout>
            <AdminReportsAnalytics />
        </AdminLayout>
    }
/>
        <Route path="/users" element={<Users />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route
    path="/viewed-profiles"
    element={<ViewedProfiles />}
/>
<Route
    path="/who-viewed-me"
    element={<WhoViewedMe />}
/>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/ignored-profiles" element={<IgnoredProfiles />} />
        <Route
    path="/about-us"
    element={<AboutUs />}
/>
<Route
    path="/help-support"
    element={<HelpSupport />}
/>
 <Route path="/home"  element={<Home/>}/>
        <Route path="/dashboard-users"  element={<DashboardUserDetails />}/>
        <Route path="/settings" element={<Settings/>} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </>
  );
}

export default AppRoutes;