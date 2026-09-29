import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

// Lightweight, dependency-free bar chart. data: [{ label, value, color? }]
export default function BarChart({ data = [], height = 200, unit = "" }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        alignItems="flex-end"
        spacing={{ xs: 1.5, sm: 2.5 }}
        sx={{ height, px: 0.5 }}
      >
        {data.map((d, i) => (
          <Box
            key={d.label}
            sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}
          >
            <Typography variant="caption" sx={{ mb: 0.5, color: "text.secondary", fontWeight: 600 }}>
              {d.value}{unit}
            </Typography>
            <Box
              component={motion.div}
              initial={{ height: 0 }}
              animate={{ height: `${(d.value / max) * 100}%` }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                width: "100%",
                maxWidth: 40,
                borderRadius: "8px 8px 4px 4px",
                bgcolor: d.color || "primary.main",
                minHeight: 4,
              }}
            />
            <Typography
              variant="caption"
              sx={{ mt: 1, color: "text.secondary", textAlign: "center", fontSize: 11 }}
              noWrap
            >
              {d.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
