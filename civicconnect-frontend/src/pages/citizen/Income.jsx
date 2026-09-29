import { useState, useEffect } from "react";
import { Card, Box, Typography, TextField, Button, Stack, Grid, Alert, MenuItem } from "@mui/material";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import StatusChip from "../../components/common/StatusChip";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import { getIncomeByCitizen, createIncomeRecord } from "../../services/incomeApi";
import { formatCurrency, formatDate } from "../../utils/formatters";

const SOURCES = ["Salaried", "Self-employed", "Agriculture", "Pension", "Other"];

export default function CitizenIncome() {
  const { user } = useAuth();
  const { data: record, loading, run } = useApi(() => getIncomeByCitizen(user?.citizenId), [user?.citizenId]);
  const [form, setForm] = useState({ annualIncome: "", source: "Salaried", financialYear: "2025-26" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (record) setForm({ annualIncome: record.annualIncome, source: record.source, financialYear: record.financialYear });
  }, [record]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createIncomeRecord({
        citizenId: user.citizenId,
        citizenName: user.name,
        ...form,
        annualIncome: Number(form.annualIncome),
      });
      await run();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader label="Loading your income record…" />;

  return (
    <Box>
      <PageHeader
        title="Income"
        subtitle="Declared and verified by the Income department for the current financial year."
        actions={record && <StatusChip status={record.status} />}
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 38, height: 38, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(34,197,94,0.12)", color: "#4ADE80" }}>
                <PaidOutlinedIcon fontSize="small" />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Current record
              </Typography>
            </Stack>

            {!record ? (
              <Typography variant="body2" color="text.secondary">
                No income record on file yet. Declare your income to get verified.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                <Row label="Annual income" value={formatCurrency(record.annualIncome)} />
                <Row label="Source" value={record.source} />
                <Row label="Financial year" value={record.financialYear} />
                <Row label="Last updated" value={formatDate(record.updatedAt)} />
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              {record ? "Update declaration" : "Declare your income"}
            </Typography>
            {submitted && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
                Submitted. Status set to pending review by the Income department.
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.25}>
                <TextField
                  label="Annual income (₹)"
                  type="number"
                  fullWidth
                  required
                  value={form.annualIncome}
                  onChange={handleChange("annualIncome")}
                />
                <TextField select label="Source of income" fullWidth value={form.source} onChange={handleChange("source")}>
                  {SOURCES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField label="Financial year" fullWidth value={form.financialYear} onChange={handleChange("financialYear")} />
                <Box>
                  <Button type="submit" variant="contained" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit for verification"}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function Row({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "right" }}>
        {value}
      </Typography>
    </Stack>
  );
}
