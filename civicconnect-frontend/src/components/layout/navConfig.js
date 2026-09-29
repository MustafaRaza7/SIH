import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import { ROLES } from "../../theme/themeConstants";

// Single source of truth for the sidebar + mobile drawer, keyed by role so
// each account only ever sees the departments it actually touches.
export const NAV_BY_ROLE = {
  [ROLES.CITIZEN]: [
    { label: "Dashboard", to: "/citizen/dashboard", icon: DashboardOutlinedIcon },
    { label: "My Profile", to: "/citizen/profile", icon: PersonOutlineIcon },
    { label: "Identity", to: "/citizen/identity", icon: BadgeOutlinedIcon },
    { label: "Income", to: "/citizen/income", icon: PaidOutlinedIcon },
    { label: "Education", to: "/citizen/education", icon: SchoolOutlinedIcon },
    { label: "Scholarships", to: "/citizen/scholarships", icon: WorkspacePremiumOutlinedIcon },
    { label: "Eligibility Check", to: "/citizen/eligibility", icon: FactCheckOutlinedIcon },
  ],
  [ROLES.INCOME_OFFICER]: [
    { label: "Income Records", to: "/officer/income", icon: PaidOutlinedIcon },
  ],
  [ROLES.EDUCATION_OFFICER]: [
    { label: "Education Records", to: "/officer/education", icon: SchoolOutlinedIcon },
  ],
  [ROLES.IDENTITY_OFFICER]: [
    { label: "Identity Records", to: "/officer/identity", icon: BadgeOutlinedIcon },
  ],
  [ROLES.SCHOLARSHIP_OFFICER]: [
    { label: "Applications", to: "/officer/scholarship", icon: WorkspacePremiumOutlinedIcon },
  ],
  [ROLES.ADMIN]: [
    { label: "Overview", to: "/admin/dashboard", icon: DashboardOutlinedIcon },
    { label: "Users", to: "/admin/users", icon: GroupOutlinedIcon },
    { label: "Departments", to: "/admin/departments", icon: AccountTreeOutlinedIcon },
    { label: "Activity Logs", to: "/admin/activity-logs", icon: HistoryOutlinedIcon },
    { label: "System Health", to: "/admin/system-health", icon: MonitorHeartOutlinedIcon },
  ],
};

export const ROLE_LABEL = {
  [ROLES.CITIZEN]: "Citizen",
  [ROLES.INCOME_OFFICER]: "Income Officer",
  [ROLES.EDUCATION_OFFICER]: "Education Officer",
  [ROLES.IDENTITY_OFFICER]: "Identity Officer",
  [ROLES.SCHOLARSHIP_OFFICER]: "Scholarship Officer",
  [ROLES.ADMIN]: "Administrator",
};
