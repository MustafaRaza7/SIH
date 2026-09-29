import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar, { SIDEBAR_WIDTH } from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        }}
      >
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <Toolbar sx={{ minHeight: { xs: 60, sm: 64 } }} />

        <Box
          component="main"
          sx={{
            flex: 1,
            px: { xs: 2, sm: 3, lg: 4 },
            py: { xs: 2.5, sm: 3.5 },
            maxWidth: 1400,
            width: "100%",
            mx: "auto",
          }}
        >
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
