import { Card, Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function StatCard({ label, value, delta, deltaDirection = "up", icon, accent = "#4F8CFF", index = 0 }) {
  const isUp = deltaDirection === "up";
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      sx={{ p: { xs: 2, sm: 2.5 }, height: "100%" }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            {value}
          </Typography>
        </Box>
        {icon && (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: `${accent}1F`,
              color: accent,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        )}
      </Stack>
      {delta && (
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1.5 }}>
          {isUp ? (
            <TrendingUpIcon sx={{ fontSize: 16, color: "success.main" }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 16, color: "error.main" }} />
          )}
          <Typography variant="caption" sx={{ color: isUp ? "success.main" : "error.main", fontWeight: 600 }}>
            {delta}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            vs last month
          </Typography>
        </Stack>
      )}
    </Card>
  );
}
