import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader({ label = "Loading…", fullScreen = false, size = 34 }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        width: "100%",
        height: fullScreen ? "100vh" : "auto",
        py: fullScreen ? 0 : 6,
      }}
    >
      <CircularProgress size={size} thickness={4} />
      {label && (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      )}
    </Box>
  );
}
