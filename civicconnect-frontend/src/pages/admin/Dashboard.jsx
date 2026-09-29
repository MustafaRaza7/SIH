import { useMemo } from "react";
import { Grid, Card, Box, Typography, Stack } from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import StatCard from "../../components/charts/StatCard";
import PieChart from "../../components/charts/PieChart";
import BarChart from "../../components/charts/BarChart";
import StatusChip from "../../components/common/StatusChip";
import { useApi } from "../../hooks/useApi";
import { listApplications } from "../../services/scholarshipApi";
import { USERS, SYSTEM_HEALTH, ACTIVITY_LOGS } from "../../services/dummyData";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { DEPARTMENTS, ROLES } from "../../theme/themeConstants";
import { ROLE_LABEL } from "../../components/layout/navConfig";

export default function AdminDashboard() {
  const { data: applications, loading } = useApi(listApplications);

  const stats = useMemo(() => {
    const apps = applications || [];
    return {
      approved: apps.filter((a) => a.status === "approved").length,
      pending: apps.filter((a) => a.status === "pending").length,
      rejected: apps.filter((a) => a.status === "rejected").length,
      disbursed: apps.filter((a) => a.status === "approved").reduce((s, a) => s + a.amount, 0),
    };
  }, [applications]);

  const healthyServices = SYSTEM_HEALTH.filter((s) => s.status === "healthy").length;

  const roleCounts = useMemo(() => {
    const counts = {};
    USERS.forEach((u) => (counts[u.role] = (counts[u.role] || 0) + 1));
    return counts;
  }, []);

  if (loading) return <Loader label="Loading platform overview…" />;

  return (
    <Box>
      <PageHeader
        title="Platform overview"
        subtitle="A cross-department view — nothing here is pulled from a shared database, it's assembled live from each service."
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard label="Registered accounts" value={USERS.length} icon={<GroupOutlinedIcon />} accent="#4F8CFF" index={0} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard label="Scholarships approved" value={stats.approved} delta={`${stats.pending} pending`} icon={<WorkspacePremiumOutlinedIcon />} accent="#F59E0B" index={1} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard label="Total disbursed" value={formatCurrency(stats.disbursed)} icon={<PaidOutlinedIcon />} accent="#22C55E" index={2} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard label="Services healthy" value={`${healthyServices} / ${SYSTEM_HEALTH.length}`} icon={<MonitorHeartOutlinedIcon />} accent="#8B5CF6" index={3} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={5}>
          <Card sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5 }}>
              Applications by outcome
            </Typography>
            <PieChart
              data={[
                { label: "Approved", value: stats.approved, color: "#22C55E" },
                { label: "Pending", value: stats.pending, color: "#F59E0B" },
                { label: "Rejected", value: stats.rejected, color: "#EF4444" },
              ]}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5 }}>
              Accounts by role
            </Typography>
            <BarChart
              data={Object.entries(roleCounts).map(([role, value]) => ({
                label: ROLE_LABEL[role] || role,
                value,
                color: role === ROLES.CITIZEN ? DEPARTMENTS.education.color : role === ROLES.ADMIN ? "#8B5CF6" : DEPARTMENTS.income.color,
              }))}
            />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Recent activity across departments
            </Typography>
            <Stack spacing={1.25}>
              {ACTIVITY_LOGS.slice(0, 5).map((log) => (
                <Stack key={log.id} direction="row" justifyContent="space-between" spacing={2} sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                      {log.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {log.actor}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                    {log.time}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
