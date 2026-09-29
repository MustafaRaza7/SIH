import { useState, useMemo } from "react";
import {
  Card,
  Box,
  Chip,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { USERS } from "../../services/dummyData";
import { ROLE_LABEL } from "../../components/layout/navConfig";
import { ROLES } from "../../theme/themeConstants";
import { initials } from "../../utils/formatters";

const ROLE_TABS = [
  { value: "all", label: "All" },
  { value: ROLES.CITIZEN, label: "Citizens" },
  { value: ROLES.ADMIN, label: "Admins" },
  {
    value: "officer",
    label: "Officers",
  },
];

const OFFICER_ROLES = [ROLES.INCOME_OFFICER, ROLES.EDUCATION_OFFICER, ROLES.IDENTITY_OFFICER, ROLES.SCHOLARSHIP_OFFICER];

export default function Users() {
  const [users, setUsers] = useState(USERS);
  const [tab, setTab] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: ROLES.CITIZEN });

  const filtered = useMemo(() => {
    if (tab === "all") return users;
    if (tab === "officer") return users.filter((u) => OFFICER_ROLES.includes(u.role));
    return users.filter((u) => u.role === tab);
  }, [users, tab]);

  const openAdd = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", role: ROLES.CITIZEN });
    setDialogOpen(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, role: user.role });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers((list) => list.map((u) => (u.id === editingUser.id ? { ...u, ...form } : u)));
    } else {
      setUsers((list) => [{ id: `u-${Date.now()}`, ...form }, ...list]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    setUsers((list) => list.filter((u) => u.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (u) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 32, height: 32, fontSize: 12, fontWeight: 700, background: "linear-gradient(135deg, #4F8CFF, #8B5CF6)" }}>
            {initials(u.name)}
          </Avatar>
          <Box sx={{ fontWeight: 500 }}>{u.name}</Box>
        </Stack>
      ),
    },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (u) => (
        <Chip
          label={ROLE_LABEL[u.role] || u.role}
          size="small"
          sx={{ fontWeight: 600, bgcolor: u.role === ROLES.ADMIN ? "rgba(139,92,246,0.14)" : "rgba(79,140,255,0.12)", color: u.role === ROLES.ADMIN ? "secondary.light" : "primary.light" }}
        />
      ),
    },
    { key: "id", label: "User ID" },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (u) => (
        <TableActions
          actions={[
            { label: "Edit", icon: EditOutlinedIcon, onClick: () => openEdit(u) },
            { label: "Delete", icon: DeleteOutlineIcon, color: "error", onClick: () => setPendingDelete(u) },
          ]}
        />
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Users"
        subtitle="Every account across every role — citizens, department officers and administrators."
        actions={
          <Button variant="contained" startIcon={<PersonAddAltOutlinedIcon />} onClick={openAdd}>
            Add user
          </Button>
        }
      />

      <Card sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 2.5, minHeight: 36, "& .MuiTab-root": { minHeight: 36, textTransform: "none" } }}
        >
          {ROLE_TABS.map((t) => (
            <Tab key={t.value} value={t.value} label={t.label} />
          ))}
        </Tabs>
        <DataTable columns={columns} rows={filtered} emptyMessage="No users in this category." />
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>{editingUser ? "Edit user" : "Add a new user"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2.25} sx={{ mt: 0.5 }}>
            <TextField label="Full name" fullWidth value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <TextField label="Email address" type="email" fullWidth value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <TextField select label="Role" fullWidth value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
              {Object.entries(ROLE_LABEL).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            {editingUser ? "Save changes" : "Add user"}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Remove this user?"
        description={pendingDelete ? `${pendingDelete.name} will lose access immediately. This can't be undone.` : ""}
        confirmLabel="Remove"
        confirmColor="error"
        onConfirm={handleDelete}
        onClose={() => setPendingDelete(null)}
      />
    </Box>
  );
}
