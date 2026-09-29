import { useState } from "react";
import { Card, Box, Grid, Chip, Stack, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import StatusChip from "../../components/common/StatusChip";
import StatCard from "../../components/charts/StatCard";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import { useApi } from "../../hooks/useApi";
import { listApplications, approveApplication, rejectApplication } from "../../services/scholarshipApi";
import { formatCurrency, formatDate } from "../../utils/formatters";

function EligibilityDots({ eligibility }) {
  const items = [
    { key: "identity", label: "Identity" },
    { key: "income", label: "Income" },
    { key: "education", label: "Education" },
  ];
  return (
    <Stack direction="row" spacing={0.75}>
      {items.map((it) => (
        <Tooltip key={it.key} title={`${it.label}: ${eligibility?.[it.key] ? "Verified" : "Not verified"}`}>
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: eligibility?.[it.key] ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
              color: eligibility?.[it.key] ? "success.main" : "error.main",
            }}
          >
            {eligibility?.[it.key] ? <CheckCircleOutlineIcon sx={{ fontSize: 14 }} /> : <HighlightOffIcon sx={{ fontSize: 14 }} />}
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
}

export default function ScholarshipOfficer() {
  const { data: applications, loading, run } = useApi(listApplications);
  const [busyId, setBusyId] = useState(null);

  const approvedCount = (applications || []).filter((a) => a.status === "approved").length;
  const pendingCount = (applications || []).filter((a) => a.status === "pending").length;
  const totalDisbursed = (applications || []).filter((a) => a.status === "approved").reduce((s, a) => s + a.amount, 0);

  const handleApprove = async (id) => {
    setBusyId(id);
    try {
      await approveApplication(id);
      await run();
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (id) => {
    setBusyId(id);
    try {
      await rejectApplication(id);
      await run();
    } finally {
      setBusyId(null);
    }
  };

  const columns = [
    { key: "citizenName", label: "Citizen" },
    { key: "scheme", label: "Scheme" },
    { key: "amount", label: "Amount", render: (r) => formatCurrency(r.amount) },
    { key: "eligibility", label: "Eligibility", render: (r) => <EligibilityDots eligibility={r.eligibility} /> },
    { key: "status", label: "Status", render: (r) => <StatusChip status={r.status} /> },
    { key: "appliedOn", label: "Applied", render: (r) => formatDate(r.appliedOn) },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (r) =>
        r.status === "pending" && (
          <TableActions
            actions={[
              { label: "Approve", icon: CheckCircleOutlineIcon, color: "success", onClick: () => handleApprove(r.id) },
              { label: "Reject", icon: HighlightOffIcon, color: "error", onClick: () => handleReject(r.id) },
            ]}
          />
        ),
    },
  ];

  if (loading) return <Loader label="Loading applications…" />;

  return (
    <Box>
      <PageHeader
        title="Scholarship applications"
        subtitle="Approve or reject applications. Eligibility dots show what Income, Education and Identity already confirmed."
      />

      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} sm={4}>
          <StatCard label="Total applications" value={applications?.length || 0} icon={<WorkspacePremiumOutlinedIcon />} accent="#F59E0B" index={0} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard label="Pending review" value={pendingCount} icon={<PendingActionsOutlinedIcon />} accent="#4F8CFF" index={1} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard label="Total disbursed" value={formatCurrency(totalDisbursed)} icon={<PaidOutlinedIcon />} accent="#22C55E" index={2} />
        </Grid>
      </Grid>

      <Card sx={{ p: { xs: 2, sm: 2.5 } }}>
        <DataTable columns={columns} rows={applications || []} />
      </Card>
    </Box>
  );
}
