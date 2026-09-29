import { useState } from "react";
import { Card, Box, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import StatusChip from "../../components/common/StatusChip";
import StatCard from "../../components/charts/StatCard";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useApi } from "../../hooks/useApi";
import { listIdentityRecords, verifyIdentityRecord, deleteIdentityRecord } from "../../services/identityApi";
import { maskId, formatDate } from "../../utils/formatters";

export default function IdentityOfficer() {
  const { data: records, loading, run } = useApi(listIdentityRecords);
  const [confirmId, setConfirmId] = useState(null);
  const [busy, setBusy] = useState(false);

  const verifiedCount = (records || []).filter((r) => r.status === "verified").length;
  const pendingCount = (records || []).filter((r) => r.status === "unverified").length;

  const handleVerify = async (id) => {
    setBusy(true);
    try {
      await verifyIdentityRecord(id);
      await run();
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await deleteIdentityRecord(confirmId);
      await run();
      setConfirmId(null);
    } finally {
      setBusy(false);
    }
  };

  const columns = [
    { key: "citizenName", label: "Citizen" },
    { key: "idNumber", label: "ID number", render: (r) => maskId(r.idNumber) },
    { key: "address", label: "Address" },
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

  if (loading) return <Loader label="Loading identity records…" />;

  return (
    <Box>
      <PageHeader title="Identity records" subtitle="Verify citizen identity. Every other department relies on this being correct." />

      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} sm={4}>
          <StatCard label="Total records" value={records?.length || 0} icon={<BadgeOutlinedIcon />} accent="#8B5CF6" index={0} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard label="Verified" value={verifiedCount} icon={<VerifiedOutlinedIcon />} accent="#22C55E" index={1} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard label="Unverified" value={pendingCount} icon={<PendingActionsOutlinedIcon />} accent="#F59E0B" index={2} />
        </Grid>
      </Grid>

      <Card sx={{ p: { xs: 2, sm: 2.5 } }}>
        <DataTable columns={columns} rows={records || []} />
      </Card>

      <ConfirmDialog
        open={Boolean(confirmId)}
        title="Delete this record?"
        description="This removes the identity record permanently. This can't be undone."
        confirmLabel="Delete"
        confirmColor="error"
        loading={busy}
        onConfirm={handleDelete}
        onClose={() => setConfirmId(null)}
      />
    </Box>
  );
}
