import { useMemo, useState } from "react";
import { Card, Box, Stack, TextField, InputAdornment, Typography, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/tables/DataTable";
import { ACTIVITY_LOGS } from "../../services/dummyData";
import { initials } from "../../utils/formatters";

export default function ActivityLogs() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ACTIVITY_LOGS;
    return ACTIVITY_LOGS.filter((l) => l.actor.toLowerCase().includes(q) || l.action.toLowerCase().includes(q));
  }, [query]);

  const columns = [
    {
      key: "actor",
      label: "Who",
      render: (l) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 30, height: 30, fontSize: 11, fontWeight: 700, background: "linear-gradient(135deg, #4F8CFF, #8B5CF6)" }}>
            {initials(l.actor)}
          </Avatar>
          <Box sx={{ fontWeight: 500 }}>{l.actor}</Box>
        </Stack>
      ),
    },
    { key: "action", label: "What happened", render: (l) => <Box sx={{ whiteSpace: "normal", minWidth: 240 }}>{l.action}</Box> },
    { key: "time", label: "When" },
  ];

  return (
    <Box>
      <PageHeader
        title="Activity logs"
        subtitle="A running record of what officers and services did across all five departments."
      />
      <Card sx={{ p: { xs: 2, sm: 2.5 } }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search by person or action"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 2.5, maxWidth: { sm: 360 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <DataTable columns={columns} rows={rows} emptyMessage="No activity matches your search." />
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
          Showing {rows.length} of {ACTIVITY_LOGS.length} entries
        </Typography>
      </Card>
    </Box>
  );
}
