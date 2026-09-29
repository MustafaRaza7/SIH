import { useState, useEffect } from "react";
import { Card, Box, Typography, TextField, Button, Stack, Grid, Alert } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import StatusChip from "../../components/common/StatusChip";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import { getEducationByCitizen, createEducationRecord } from "../../services/educationApi";
import { formatDate } from "../../utils/formatters";

export default function CitizenEducation() {
  const { user } = useAuth();
  const { data: record, loading, run } = useApi(() => getEducationByCitizen(user?.citizenId), [user?.citizenId]);
  const [form, setForm] = useState({ institution: "", course: "", year: "", percentage: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (record) setForm({ institution: record.institution, course: record.course, year: record.year, percentage: record.percentage });
  }, [record]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createEducationRecord({
        citizenId: user.citizenId,
        citizenName: user.name,
        ...form,
        percentage: Number(form.percentage),
      });
      await run();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader label="Loading your education record…" />;

  return (
    <Box>
      <PageHeader
        title="Education"
        subtitle="Verified by the Education department against your institution's records."
        actions={record && <StatusChip status={record.status} />}
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ width: 38, height: 38, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(79,140,255,0.12)", color: "primary.light" }}>
                <SchoolOutlinedIcon fontSize="small" />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Current record
              </Typography>
            </Stack>

            {!record ? (
              <Typography variant="body2" color="text.secondary">
                No education record on file yet. Add your details to get verified.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                <Row label="Institution" value={record.institution} />
                <Row label="Course" value={record.course} />
                <Row label="Year" value={record.year} />
                <Row label="Percentage" value={`${record.percentage}%`} />
                <Row label="Last updated" value={formatDate(record.updatedAt)} />
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              {record ? "Update details" : "Add your education record"}
            </Typography>
            {submitted && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
                Submitted. Status set to pending review by the Education department.
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.25}>
                <TextField label="Institution" fullWidth required value={form.institution} onChange={handleChange("institution")} />
                <TextField label="Course" fullWidth required value={form.course} onChange={handleChange("course")} />
                <TextField label="Year / stage" fullWidth required value={form.year} onChange={handleChange("year")} />
                <TextField label="Percentage / CGPA" type="number" fullWidth required value={form.percentage} onChange={handleChange("percentage")} />
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
