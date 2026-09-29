import { Drawer } from "@mui/material";
import SidebarContent from "./SidebarContent";

export const SIDEBAR_WIDTH = 264;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          position: "fixed",
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );
}
