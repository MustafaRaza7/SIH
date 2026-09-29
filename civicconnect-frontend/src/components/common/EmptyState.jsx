import { Box, Typography, Button } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

export default function EmptyState({
  icon,
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
}) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 5, sm: 7 },
        px: 2,
        color: "text.secondary",
      }}
    >
      <Box sx={{ color: "text.secondary", opacity: 0.5, mb: 1.5 }}>
        {icon || <InboxOutlinedIcon sx={{ fontSize: 44 }} />}
      </Box>
      <Typography variant="subtitle1" sx={{ color: "text.primary", fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ mt: 0.5, maxWidth: 420, mx: "auto" }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outlined" size="small" sx={{ mt: 2.5 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
