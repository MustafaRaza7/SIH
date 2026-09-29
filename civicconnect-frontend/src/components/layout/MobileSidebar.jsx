import { Drawer } from "@mui/material";
import SidebarContent from "./SidebarContent";
import { SIDEBAR_WIDTH } from "./Sidebar";

export default function MobileSidebar({ open, onClose }) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, boxSizing: "border-box" },
      }}
    >
      <SidebarContent onNavigate={onClose} />
    </Drawer>
  );
}
