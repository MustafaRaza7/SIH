import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useId } from "react";

// data: [{ label, value }] — a single-series responsive sparkline/line chart
export default function LineChart({ data = [], height = 200, color }) {
  const theme = useTheme();
  const strokeColor = color || theme.palette.primary.main;
  const gradientId = useId();

  const width = 600; // viewBox width; scales responsively via CSS
  const padding = 24;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padding + (i / Math.max(data.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0} ${height - padding} L ${points[0]?.x || 0} ${height - padding} Z`;

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={padding}
            x2={width - padding}
            y1={padding + f * (height - padding * 2)}
            y2={padding + f * (height - padding * 2)}
            stroke="rgba(148,163,184,0.10)"
            strokeWidth="1"
          />
        ))}

        <motion.path
          d={areaPath}
          fill={`url(#${gradientId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r={3.5} fill={theme.palette.background.paper} stroke={strokeColor} strokeWidth={2} />
        ))}
      </svg>
    </Box>
  );
}
