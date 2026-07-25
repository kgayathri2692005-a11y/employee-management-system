import { Routes, Route } from "react-router-dom";

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
import Wishlist from "../pages/Wishlist";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/otp" element={<OtpVerification />} />
      <Route path="/tracking" element={<Tracking />} />
      
      <Route
  path="/view-profile"
  element={<ViewProfile />}
/>
<Route
  path="/wishlist"
  element={<Wishlist />}
/>
<Route
    path="/complete-profile"
    element={<CompleteProfile />}
/>    </Routes>
  );
}

export default AppRoutes;