import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

// The mark: four nodes (the four departments) orbiting one connector (the
// Gateway) — the actual architecture, not a generic abstract glyph.
export default function Logo({ size = 34, showWordmark = true, sx = {} }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, ...sx }}>
      <Box
        component={motion.svg}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        width={size}
        height={size}
        viewBox="0 0 40 40"
        sx={{ flexShrink: 0 }}
      >
        <circle cx="20" cy="20" r="4.5" fill="#4F8CFF" />
        <circle cx="20" cy="6" r="3" fill="#8B5CF6" />
        <circle cx="34" cy="20" r="3" fill="#22C55E" />
        <circle cx="20" cy="34" r="3" fill="#F59E0B" />
        <circle cx="6" cy="20" r="3" fill="#4F8CFF" />
        <line x1="20" y1="20" x2="20" y2="9" stroke="#4F8CFF" strokeWidth="1.4" strokeOpacity="0.6" />
        <line x1="20" y1="20" x2="31" y2="20" stroke="#4F8CFF" strokeWidth="1.4" strokeOpacity="0.6" />
        <line x1="20" y1="20" x2="20" y2="31" stroke="#4F8CFF" strokeWidth="1.4" strokeOpacity="0.6" />
        <line x1="20" y1="20" x2="9" y2="20" stroke="#4F8CFF" strokeWidth="1.4" strokeOpacity="0.6" />
      </Box>
      {showWordmark && (
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1 }}>
          Civic<Box component="span" sx={{ color: "primary.main" }}>Connect</Box>
        </Typography>
      )}
    </Box>
  );
}
