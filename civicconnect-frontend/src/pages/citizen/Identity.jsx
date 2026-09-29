import { useState, useEffect } from "react";
import { Card, Box, Typography, TextField, Button, Stack, Grid, Alert } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import StatusChip from "../../components/common/StatusChip";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import { getIdentityByCitizen, createIdentityRecord } from "../../services/identityApi";
import { maskId, formatDate } from "../../utils/formatters";

export default function CitizenIdentity() {
  const { user } = useAuth();
  const { data: record, loading, run } = useApi(() => getIdentityByCitizen(user?.citizenId), [user?.citizenId]);
  const [form, setForm] = useState({ idNumber: "", dob: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (record) setForm({ idNumber: record.idNumber, dob: record.dob, address: record.address });
  }, [record]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createIdentityRecord({ citizenId: user.citizenId, citizenName: user.name, ...form });
      await run();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader label="Loading your identity record…" />;

  return (
    <Box>
      <PageHeader
        title="Identity"
        subtitle="Verified by the Identity department. This record backs every eligibility check."
        actions={record && <StatusChip status={record.status} />}
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 38, height: 38, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(139,92,246,0.12)", color: "#A78BFA" }}>
                <BadgeOutlinedIcon fontSize="small" />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Current record
              </Typography>
            </Stack>

            {!record ? (
              <Typography variant="body2" color="text.secondary">
                No identity record on file yet. Submit your details to get verified.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                <Row label="ID number" value={maskId(record.idNumber)} />
                <Row label="Date of birth" value={formatDate(record.dob)} />
                <Row label="Address" value={record.address} />
                <Row label="Last updated" value={formatDate(record.updatedAt)} />
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              {record ? "Update details" : "Submit your details"}
            </Typography>
            {submitted && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
                Submitted. Status set to pending review by the Identity department.
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.25}>
                <TextField label="ID number" fullWidth required value={form.idNumber} onChange={handleChange("idNumber")} />
                <TextField label="Date of birth" type="date" fullWidth required InputLabelProps={{ shrink: true }} value={form.dob} onChange={handleChange("dob")} />
                <TextField label="Address" fullWidth required multiline minRows={2} value={form.address} onChange={handleChange("address")} />
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
