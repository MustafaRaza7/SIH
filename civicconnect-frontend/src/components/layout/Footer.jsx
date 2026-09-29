import { Box, Typography, Stack, Link as MuiLink } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2.5,
        px: { xs: 2, sm: 3 },
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
      >
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} CivicConnect. A federated citizen-services platform.
        </Typography>
        <Stack direction="row" spacing={2.5}>
          <MuiLink href="#" variant="caption" color="text.secondary" underline="hover">
            Privacy
          </MuiLink>
          <MuiLink href="#" variant="caption" color="text.secondary" underline="hover">
            Terms
          </MuiLink>
          <MuiLink href="#" variant="caption" color="text.secondary" underline="hover">
            Support
          </MuiLink>
        </Stack>
      </Stack>
    </Box>
  );
}
