import { useState } from "react";
import {
  Card, Box, Typography, Stack, Button, Grid, Dialog, DialogTitle, DialogContent,
  DialogActions, MenuItem, TextField, Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import StatusChip from "../../components/common/StatusChip";
import DataTable from "../../components/tables/DataTable";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import { getApplicationsByCitizen, applyForScholarship } from "../../services/scholarshipApi";
import { formatCurrency, formatDate } from "../../utils/formatters";

const SCHEMES = [
  { name: "Post-Matric Scholarship", amount: 24000 },
  { name: "Merit-cum-Means Scholarship", amount: 18000 },
  { name: "Pre-Matric Scholarship", amount: 12000 },
];

export default function Scholarships() {
  const { user } = useAuth();
  const { data: applications, loading, run } = useApi(() => getApplicationsByCitizen(user?.citizenId), [user?.citizenId]);
  const [open, setOpen] = useState(false);
  const [scheme, setScheme] = useState(SCHEMES[0].name);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleApply = async () => {
    setSubmitting(true);
    setResult(null);
    const chosen = SCHEMES.find((s) => s.name === scheme);
    try {
      const app = await applyForScholarship({
        citizenId: user.citizenId,
        citizenName: user.name,
        scheme: chosen.name,
        amount: chosen.amount,
      });
      await run();
      setResult(app);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: "scheme", label: "Scheme" },
    { key: "amount", label: "Amount", render: (r) => formatCurrency(r.amount) },
    { key: "appliedOn", label: "Applied on", render: (r) => formatDate(r.appliedOn) },
    { key: "status", label: "Status", render: (r) => <StatusChip status={r.status} /> },
  ];

  if (loading) return <Loader label="Loading your applications…" />;

  return (
    <Box>
      <PageHeader
        title="Scholarships"
        subtitle="Apply for a scholarship — eligibility is checked automatically against your Income, Education and Identity records."
        actions={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setOpen(true); setResult(null); }}>
            Apply
          </Button>
        }
      />

      <Card sx={{ p: { xs: 2, sm: 2.5 } }}>
        <DataTable columns={columns} rows={applications || []} emptyMessage="You haven't applied for any scholarships yet." />
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Apply for a scholarship</DialogTitle>
        <DialogContent>
          {!result ? (
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField select label="Scheme" value={scheme} onChange={(e) => setScheme(e.target.value)} fullWidth>
                {SCHEMES.map((s) => (
                  <MenuItem key={s.name} value={s.name}>
                    {s.name} — {formatCurrency(s.amount)}
                  </MenuItem>
                ))}
              </TextField>
              <Typography variant="caption" color="text.secondary">
                Submitting will run a live eligibility check against your Income, Education and Identity records.
              </Typography>
            </Stack>
          ) : (
            <Box sx={{ textAlign: "center", py: 2 }}>
              <WorkspacePremiumOutlinedIcon sx={{ fontSize: 34, mb: 1, color: result.status === "rejected" ? "error.main" : "success.main" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {result.status === "rejected" ? "Application auto-rejected" : "Application submitted"}
              </Typography>
              <Alert severity={result.status === "rejected" ? "error" : "success"} sx={{ borderRadius: 2, textAlign: "left" }}>
                {result.status === "rejected"
                  ? "One or more departments couldn't verify your records. Check the Eligibility page for details."
                  : "Your application is now pending review by the Scholarship department."}
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            {result ? "Close" : "Cancel"}
          </Button>
          {!result && (
            <Button onClick={handleApply} variant="contained" disabled={submitting}>
              {submitting ? "Checking eligibility…" : "Submit application"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
