import { Box, Typography, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { motion } from "framer-motion";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <Box
      className="node-grid-bg"
      sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: 3, textAlign: "center" }}
    >
      <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            bgcolor: "rgba(239,68,68,0.12)",
            color: "error.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <BlockOutlinedIcon sx={{ fontSize: 34 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          You don't have access to this page
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 380, mx: "auto" }}>
          Your account role doesn't include this section. If you think this is a mistake, contact your department administrator.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3.5 }}>
          <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button component={Link} to="/login" variant="contained">
            Switch account
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
