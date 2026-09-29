import { Chip } from "@mui/material";
import { STATUS_LABEL } from "../../utils/constants";

const COLOR_MAP = {
  verified: { bg: "rgba(34,197,94,0.14)", fg: "#4ADE80" },
  approved: { bg: "rgba(34,197,94,0.14)", fg: "#4ADE80" },
  pending: { bg: "rgba(245,158,11,0.14)", fg: "#FBBF24" },
  unverified: { bg: "rgba(148,163,184,0.14)", fg: "#94A3B8" },
  rejected: { bg: "rgba(239,68,68,0.14)", fg: "#F87171" },
  healthy: { bg: "rgba(34,197,94,0.14)", fg: "#4ADE80" },
  degraded: { bg: "rgba(245,158,11,0.14)", fg: "#FBBF24" },
  down: { bg: "rgba(239,68,68,0.14)", fg: "#F87171" },
};

export default function StatusChip({ status, size = "small" }) {
  const style = COLOR_MAP[status] || COLOR_MAP.pending;
  return (
    <Chip
      label={STATUS_LABEL[status] || status}
      size={size}
      sx={{
        bgcolor: style.bg,
        color: style.fg,
        fontWeight: 600,
        fontSize: 12,
        height: 24,
      }}
    />
  );
}
