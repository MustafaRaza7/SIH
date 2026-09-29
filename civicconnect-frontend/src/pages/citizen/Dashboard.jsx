import { useMemo } from "react";
import { Grid, Card, Box, Typography, Stack, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import StatCard from "../../components/charts/StatCard";
import StatusChip from "../../components/common/StatusChip";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import { getIncomeByCitizen } from "../../services/incomeApi";
import { getEducationByCitizen } from "../../services/educationApi";
import { getIdentityByCitizen } from "../../services/identityApi";
import { getApplicationsByCitizen } from "../../services/scholarshipApi";
import { formatDate, formatCurrency } from "../../utils/formatters";
import { fadeUp } from "../../theme/themeConstants";

export default function CitizenDashboard() {
  const { user } = useAuth();
  const citizenId = user?.citizenId;

  const income = useApi(() => getIncomeByCitizen(citizenId), [citizenId]);
  const education = useApi(() => getEducationByCitizen(citizenId), [citizenId]);
  const identity = useApi(() => getIdentityByCitizen(citizenId), [citizenId]);
  const applications = useApi(() => getApplicationsByCitizen(citizenId), [citizenId]);

  const loading = income.loading || education.loading || identity.loading || applications.loading;

  const summary = useMemo(() => {
    const apps = applications.data || [];
    return {
      approved: apps.filter((a) => a.status === "approved").length,
      pending: apps.filter((a) => a.status === "pending").length,
      totalAwarded: apps.filter((a) => a.status === "approved").reduce((s, a) => s + a.amount, 0),
    };
  }, [applications.data]);

  if (loading) return <Loader fullScreen={false} label="Loading your dashboard…" />;

  return (
    <Box>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "there"}`}
        subtitle="Here's the current status of your records across every department."
        actions={
          <Button component={Link} to="/citizen/eligibility" variant="contained" endIcon={<ArrowForwardIcon />}>
            Check eligibility
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="Income status"
            value={income.data?.status ? income.data.status[0].toUpperCase() + income.data.status.slice(1) : "Not filed"}
            icon={<PaidOutlinedIcon />}
            accent="#22C55E"
            index={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="Education status"
            value={education.data?.status ? education.data.status[0].toUpperCase() + education.data.status.slice(1) : "Not filed"}
            icon={<SchoolOutlinedIcon />}
            accent="#4F8CFF"
            index={1}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="Identity status"
            value={identity.data?.status ? identity.data.status[0].toUpperCase() + identity.data.status.slice(1) : "Not filed"}
            icon={<BadgeOutlinedIcon />}
            accent="#8B5CF6"
            index={2}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="Scholarships awarded"
            value={formatCurrency(summary.totalAwarded)}
            delta={`${summary.approved} approved`}
            icon={<WorkspacePremiumOutlinedIcon />}
            accent="#F59E0B"
            index={3}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={7}>
          <Card
            component={motion.div}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Your scholarship applications
            </Typography>
            <Stack spacing={1.5}>
              {(applications.data || []).length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  You haven't applied for any scholarships yet.
                </Typography>
              )}
              {(applications.data || []).map((app) => (
                <Stack
                  key={app.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ p: 1.5, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                      {app.scheme}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Applied {formatDate(app.appliedOn)} · {formatCurrency(app.amount)}
                    </Typography>
                  </Box>
                  <StatusChip status={app.status} />
                </Stack>
              ))}
            </Stack>
            <Button component={Link} to="/citizen/scholarships" size="small" sx={{ mt: 2 }} endIcon={<ArrowForwardIcon fontSize="small" />}>
              View all applications
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card
            component={motion.div}
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Quick actions
            </Typography>
            <Stack spacing={1.5}>
              {[
                { to: "/citizen/identity", label: "Update identity details", icon: BadgeOutlinedIcon },
                { to: "/citizen/income", label: "Update income record", icon: PaidOutlinedIcon },
                { to: "/citizen/education", label: "Update education record", icon: SchoolOutlinedIcon },
                { to: "/citizen/scholarships", label: "Apply for a scholarship", icon: WorkspacePremiumOutlinedIcon },
              ].map((item) => (
                <Stack
                  key={item.to}
                  component={Link}
                  to={item.to}
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    textDecoration: "none",
                    color: "text.primary",
                    transition: "border-color 0.15s, background-color 0.15s",
                    "&:hover": { borderColor: "primary.main", bgcolor: "rgba(79,140,255,0.06)" },
                  }}
                >
                  <item.icon fontSize="small" sx={{ color: "primary.light" }} />
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {item.label}
                  </Typography>
                  <ArrowForwardIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                </Stack>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
