import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { useAuth } from "../../hooks/useAuth";
import { initials } from "../../utils/formatters";
import { SIDEBAR_WIDTH } from "./Sidebar";

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { md: `${SIDEBAR_WIDTH}px` },
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: { xs: 60, sm: 64 } }}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Breadcrumbs />
        </Box>

        <Tooltip title="Notifications">
          <IconButton>
            <Badge color="error" variant="dot">
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: 13,
              fontWeight: 700,
              background: "linear-gradient(135deg, #4F8CFF, #8B5CF6)",
            }}
          >
            {initials(user?.name) || "?"}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              navigate(user?.role === "citizen" ? "/citizen/profile" : "/");
            }}
          >
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
