import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: { xs: 2.5, sm: 3.5 } }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 560 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>{actions}</Box>}
    </Stack>
  );
}
