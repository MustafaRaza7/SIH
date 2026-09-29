import { useState } from "react";
import { Card, Box, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import StatusChip from "../../components/common/StatusChip";
import StatCard from "../../components/charts/StatCard";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useApi } from "../../hooks/useApi";
import { listIncomeRecords, verifyIncomeRecord, deleteIncomeRecord } from "../../services/incomeApi";
import { formatCurrency, formatDate } from "../../utils/formatters";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

export default function IncomeOfficer() {
  const { data: records, loading, run } = useApi(listIncomeRecords);
  const [confirmId, setConfirmId] = useState(null);
  const [busy, setBusy] = useState(false);

  const verifiedCount = (records || []).filter((r) => r.status === "verified").length;
  const pendingCount = (records || []).filter((r) => r.status === "pending").length;

  const handleVerify = async (id) => {
    setBusy(true);
    try {
      await verifyIncomeRecord(id);
      await run();
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await deleteIncomeRecord(confirmId);
      await run();
      setConfirmId(null);
    } finally {
      setBusy(false);
    }
  };

  const columns = [
    { key: "citizenName", label: "Citizen" },
    { key: "annualIncome", label: "Annual income", render: (r) => formatCurrency(r.annualIncome) },
    { key: "source", label: "Source" },
    { key: "financialYear", label: "FY" },
    { key: "status", label: "Status", render: (r) => <StatusChip status={r.status} /> },
    { key: "updatedAt", label: "Updated", render: (r) => formatDate(r.updatedAt) },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (r) => (
        <TableActions
          actions={[
            ...(r.status !== "verified"
              ? [{ label: "Verify", icon: CheckCircleOutlineIcon, color: "success", onClick: () => handleVerify(r.id) }]
              : []),
            { label: "Delete", icon: DeleteOutlineIcon, color: "error", onClick: () => setConfirmId(r.id) },
          ]}
        />
      ),
    },
  ];

  if (loading) return <Loader label="Loading income records…" />;

  return (
    <Box>
      <PageHeader title="Income records" subtitle="Verify citizen income declarations. Verified records are what the Scholarship service checks against." />

      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} sm={4}>
          <StatCard label="Total records" value={records?.length || 0} icon={<PaidOutlinedIcon />} accent="#22C55E" index={0} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard label="Verified" value={verifiedCount} icon={<VerifiedOutlinedIcon />} accent="#4F8CFF" index={1} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard label="Pending review" value={pendingCount} icon={<PendingActionsOutlinedIcon />} accent="#F59E0B" index={2} />
        </Grid>
      </Grid>

      <Card sx={{ p: { xs: 2, sm: 2.5 } }}>
        <DataTable columns={columns} rows={records || []} />
      </Card>

      <ConfirmDialog
        open={Boolean(confirmId)}
        title="Delete this record?"
        description="This removes the income record permanently. This can't be undone."
        confirmLabel="Delete"
        confirmColor="error"
        loading={busy}
        onConfirm={handleDelete}
        onClose={() => setConfirmId(null)}
      />
    </Box>
  );
}
