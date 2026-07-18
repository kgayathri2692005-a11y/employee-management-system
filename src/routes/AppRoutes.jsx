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
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import Tracking from "../pages/Tracking";
import ViewProfile from "../pages/ViewProfile";
import ReligionIdentity from "../pages/ReligionIdentity";
import EducationCareer from "../pages/EducationCareer";
import FamilyLifestyle from "../pages/FamilyLifestyle";
import PartnerPreference from "../pages/PartnerPreference";
import Verification from "../pages/Verification";

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
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user" element={<EditUser />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route
  path="/view-profile"
  element={<ViewProfile />}
/>
<Route
  path="/complete-profile/religion"
  element={<ReligionIdentity />}
/>
<Route
    path="/complete-profile/education"
    element={<EducationCareer />}
/>
<Route
    path="/complete-profile/family"
    element={<FamilyLifestyle />}
/>
<Route
    path="/complete-profile/partner"
    element={<PartnerPreference />}
/>
<Route
    path="/complete-profile/verification"
    element={<Verification />}
/>
    </Routes>
  );
}

export default AppRoutes;