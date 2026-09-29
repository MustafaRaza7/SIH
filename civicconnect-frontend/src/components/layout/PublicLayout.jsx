import { Outlet, Link } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import Logo from "../common/Logo";
import Footer from "./Footer";

// Shared shell for Login / Register / Unauthorized: slim header on top,
// page content fills the middle, footer sticks to the bottom on any screen height.
export default function PublicLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        component="header"
        sx={{
          px: { xs: 2, sm: 4 },
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(8,11,20,0.85)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Link to="/" aria-label="CivicConnect home">
          <Logo />
        </Link>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/login" color="inherit" size="small">
            Sign in
          </Button>
          <Button component={Link} to="/register" variant="contained" size="small">
            Create account
          </Button>
        </Stack>
      </Box>

      <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
