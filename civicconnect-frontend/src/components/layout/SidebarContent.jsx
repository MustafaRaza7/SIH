import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Chip } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../common/Logo";
import { NAV_BY_ROLE, ROLE_LABEL } from "./navConfig";
import { useAuth } from "../../hooks/useAuth";
import { initials } from "../../utils/formatters";

export default function SidebarContent({ onNavigate }) {
  const { user } = useAuth();
  const location = useLocation();
  const items = NAV_BY_ROLE[user?.role] || [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ px: 2.5, py: 2.75 }}>
        <Logo />
      </Box>

      <Divider sx={{ opacity: 0.6 }} />

      <Box sx={{ px: 2.5, py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(135deg, #4F8CFF, #8B5CF6)",
              flexShrink: 0,
            }}
          >
            {initials(user?.name) || "?"}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
              {user?.name}
            </Typography>
            <Chip
              label={ROLE_LABEL[user?.role] || user?.role}
              size="small"
              sx={{
                height: 20,
                fontSize: 11,
                mt: 0.25,
                bgcolor: "rgba(79,140,255,0.12)",
                color: "primary.light",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ opacity: 0.6 }} />

      <List sx={{ flex: 1, px: 1.5, py: 1.5, overflowY: "auto" }}>
        {items.map(({ label, to, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <ListItemButton
              key={to}
              component={NavLink}
              to={to}
              onClick={onNavigate}
              selected={active}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: active ? "primary.light" : "text.secondary",
                bgcolor: active ? "rgba(79,140,255,0.10)" : "transparent",
                "&:hover": { bgcolor: "rgba(79,140,255,0.08)", color: "text.primary" },
                "&.Mui-selected": { bgcolor: "rgba(79,140,255,0.10)" },
                "&.Mui-selected:hover": { bgcolor: "rgba(79,140,255,0.14)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 500 }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ opacity: 0.6 }} />
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          CivicConnect · Federated Services
        </Typography>
      </Box>
    </Box>
  );
}
