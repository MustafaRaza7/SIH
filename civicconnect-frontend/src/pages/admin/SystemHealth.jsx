import { Card, Box, Typography, Grid, Stack, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import PageHeader from "../../components/common/PageHeader";
import StatusChip from "../../components/common/StatusChip";
import { SYSTEM_HEALTH } from "../../services/dummyData";

const latencyColor = (ms) => (ms < 100 ? "success" : ms < 200 ? "warning" : "error");

export default function SystemHealth() {
  const degraded = SYSTEM_HEALTH.filter((s) => s.status !== "healthy");

  return (
    <Box>
      <PageHeader
        title="System health"
        subtitle={
          degraded.length
            ? `${degraded.length} of ${SYSTEM_HEALTH.length} services need attention.`
            : "All services are responding normally."
        }
      />
      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {SYSTEM_HEALTH.map((s, i) => (
          <Grid item xs={12} sm={6} lg={4} key={s.name}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              sx={{ p: 2.5, height: "100%" }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ width: 38, height: 38, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: "rgba(79,140,255,0.12)", color: "primary.light" }}>
                    <DnsOutlinedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{s.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Port {s.port}
                    </Typography>
                  </Box>
                </Stack>
                <StatusChip status={s.status} />
              </Stack>

              <Stack spacing={1.75}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                    <Typography variant="caption" color="text.secondary">
                      Response time
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {s.latencyMs} ms
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((s.latencyMs / 300) * 100, 100)}
                    color={latencyColor(s.latencyMs)}
                    sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(148,163,184,0.12)" }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                    <Typography variant="caption" color="text.secondary">
                      Uptime
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {s.uptime}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={s.uptime}
                    color={s.uptime > 99 ? "success" : "warning"}
                    sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(148,163,184,0.12)" }}
                  />
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
