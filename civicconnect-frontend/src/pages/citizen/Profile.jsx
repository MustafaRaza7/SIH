import { useState } from "react";
import { Card, Box, Typography, TextField, Button, Stack, Grid, Alert } from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import { useAuth } from "../../hooks/useAuth";
import { initials } from "../../utils/formatters";
import { ROLE_LABEL } from "../../components/layout/navConfig";

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Box>
      <PageHeader title="My profile" subtitle="Your account details as they appear across every department." />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: "center" }}>
            <Box
              sx={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                mx: "auto",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                background: "linear-gradient(135deg, #4F8CFF, #8B5CF6)",
              }}
            >
              {initials(user?.name)}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ROLE_LABEL[user?.role] || user?.role}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
              Citizen ID: {user?.citizenId || "—"}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Account details
            </Typography>
            {saved && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
                Profile updated.
              </Alert>
            )}
            <Box component="form" onSubmit={handleSave}>
              <Stack spacing={2.25}>
                <TextField label="Full name" fullWidth value={form.name} onChange={handleChange("name")} />
                <TextField label="Email address" type="email" fullWidth value={form.email} onChange={handleChange("email")} />
                <Box>
                  <Button type="submit" variant="contained">
                    Save changes
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
