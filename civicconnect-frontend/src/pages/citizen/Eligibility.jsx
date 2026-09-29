import { useState, useEffect, useCallback } from "react";
import { Card, Box, Typography, Stack, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../hooks/useAuth";
import { checkEligibility } from "../../services/scholarshipApi";

const CHECKS = [
  { key: "identity", label: "Identity", icon: BadgeOutlinedIcon, color: "#8B5CF6" },
  { key: "income", label: "Income", icon: PaidOutlinedIcon, color: "#22C55E" },
  { key: "education", label: "Education", icon: SchoolOutlinedIcon, color: "#4F8CFF" },
];

export default function Eligibility() {
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const run = useCallback(async () => {
    setLoading(true);
    const res = await checkEligibility(user?.citizenId);
    setResult(res);
    setLoading(false);
  }, [user?.citizenId]);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <Box>
      <PageHeader
        title="Scholarship eligibility"
        subtitle="The Scholarship service checks your Income, Education and Identity records live — the same check it runs the moment you apply."
        actions={
          <Button variant="outlined" color="inherit" onClick={run} disabled={loading}>
            {loading ? "Checking…" : "Re-check"}
          </Button>
        }
      />

      {loading ? (
        <Loader label="Contacting Income, Education and Identity services…" />
      ) : (
        <>
          <Grid container spacing={2.5}>
            {CHECKS.map((c, i) => {
              const check = result?.[c.key];
              const ok = check?.ok;
              return (
                <Grid item xs={12} sm={4} key={c.key}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    sx={{ p: 2.5, height: "100%", borderColor: ok ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                      <Box sx={{ width: 38, height: 38, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: `${c.color}1F`, color: c.color }}>
                        <c.icon fontSize="small" />
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {c.label}
                      </Typography>
                      <Box sx={{ ml: "auto" }}>
                        {ok ? (
                          <CheckCircleOutlineIcon sx={{ color: "success.main" }} />
                        ) : (
                          <HighlightOffIcon sx={{ color: "error.main" }} />
                        )}
                      </Box>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {check?.detail}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Card sx={{ p: { xs: 2.5, sm: 3 }, mt: 2.5, textAlign: "center" }}>
            {result?.eligible ? (
              <>
                <WorkspacePremiumOutlinedIcon sx={{ fontSize: 34, color: "success.main", mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  You're eligible to apply
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2.5 }}>
                  All three departments verified your records. You can go ahead and apply for a scholarship.
                </Typography>
                <Button component={Link} to="/citizen/scholarships" variant="contained">
                  Apply for a scholarship
                </Button>
              </>
            ) : (
              <>
                <HighlightOffIcon sx={{ fontSize: 34, color: "error.main", mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Not eligible yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Fix the records marked above, then re-check. Applications are auto-rejected until every department verifies.
                </Typography>
              </>
            )}
          </Card>
        </>
      )}
    </Box>
  );
}
