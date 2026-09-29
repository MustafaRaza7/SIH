import { Box, Typography, Button, Alert } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ErrorState({
  title = "Something didn't load",
  description = "That request failed. Check your connection and try again.",
  onRetry,
}) {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Alert
        severity="error"
        variant="outlined"
        sx={{ borderRadius: 2, alignItems: "center" }}
        action={
          onRetry && (
            <Button color="error" size="small" startIcon={<RefreshIcon />} onClick={onRetry}>
              Retry
            </Button>
          )
        }
      >
        <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Alert>
    </Box>
  );
}
