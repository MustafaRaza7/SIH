import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import AppLayout from "../components/layout/AppLayout";
import PublicLayout from "../components/layout/PublicLayout";
import { ROLES } from "../theme/themeConstants";

// Public
import Landing from "../pages/public/Landing";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Unauthorized from "../pages/public/Unauthorized";

// Citizen
import CitizenDashboard from "../pages/citizen/Dashboard";
import CitizenProfile from "../pages/citizen/Profile";
import CitizenIdentity from "../pages/citizen/Identity";
import CitizenIncome from "../pages/citizen/Income";
import CitizenEducation from "../pages/citizen/Education";
import CitizenScholarships from "../pages/citizen/Scholarships";
import CitizenEligibility from "../pages/citizen/Eligibility";

// Officers
import IncomeOfficer from "../pages/officers/IncomeOfficer";
import EducationOfficer from "../pages/officers/EducationOfficer";
import IdentityOfficer from "../pages/officers/IdentityOfficer";
import ScholarshipOfficer from "../pages/officers/ScholarshipOfficer";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminDepartments from "../pages/admin/Departments";
import AdminActivityLogs from "../pages/admin/ActivityLogs";
import AdminSystemHealth from "../pages/admin/SystemHealth";

export default function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* Authenticated shell */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* Citizen */}
            <Route element={<RoleRoute allow={[ROLES.CITIZEN]} />}>
              <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
              <Route path="/citizen/profile" element={<CitizenProfile />} />
              <Route path="/citizen/identity" element={<CitizenIdentity />} />
              <Route path="/citizen/income" element={<CitizenIncome />} />
              <Route path="/citizen/education" element={<CitizenEducation />} />
              <Route path="/citizen/scholarships" element={<CitizenScholarships />} />
              <Route path="/citizen/eligibility" element={<CitizenEligibility />} />
            </Route>

            {/* Officers — each department only sees its own console */}
            <Route element={<RoleRoute allow={[ROLES.INCOME_OFFICER]} />}>
              <Route path="/officer/income" element={<IncomeOfficer />} />
            </Route>
            <Route element={<RoleRoute allow={[ROLES.EDUCATION_OFFICER]} />}>
              <Route path="/officer/education" element={<EducationOfficer />} />
            </Route>
            <Route element={<RoleRoute allow={[ROLES.IDENTITY_OFFICER]} />}>
              <Route path="/officer/identity" element={<IdentityOfficer />} />
            </Route>
            <Route element={<RoleRoute allow={[ROLES.SCHOLARSHIP_OFFICER]} />}>
              <Route path="/officer/scholarship" element={<ScholarshipOfficer />} />
            </Route>

            {/* Admin */}
            <Route element={<RoleRoute allow={[ROLES.ADMIN]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/departments" element={<AdminDepartments />} />
              <Route path="/admin/activity-logs" element={<AdminActivityLogs />} />
              <Route path="/admin/system-health" element={<AdminSystemHealth />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
