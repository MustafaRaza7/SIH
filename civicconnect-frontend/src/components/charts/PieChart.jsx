import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

// data: [{ label, value, color }]
export default function PieChart({ data = [], size = 160, thickness = 22 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  let offsetAcc = 0;

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
      <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(148,163,184,0.10)"
            strokeWidth={thickness}
          />
          {data.map((d, i) => {
            const dash = (d.value / total) * circumference;
            const gap = circumference - dash;
            const circle = (
              <motion.circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offsetAcc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                strokeLinecap="butt"
              />
            );
            offsetAcc += dash;
            return circle;
          })}
        </svg>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {total}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total
          </Typography>
        </Box>
      </Box>

      <Stack spacing={1} sx={{ minWidth: 140 }}>
        {data.map((d) => (
          <Stack key={d.label} direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 10, height: 10, borderRadius: "3px", bgcolor: d.color, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ flex: 1 }} color="text.secondary">
              {d.label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {d.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
