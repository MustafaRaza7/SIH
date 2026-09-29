import { Card, Box, Typography, Grid, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import PageHeader from "../../components/common/PageHeader";
import StatusChip from "../../components/common/StatusChip";
import { SYSTEM_HEALTH, INCOME_RECORDS, EDUCATION_RECORDS, IDENTITY_RECORDS, SCHOLARSHIP_APPLICATIONS } from "../../services/dummyData";
import { fadeUp } from "../../theme/themeConstants";

const SERVICES = [
  {
    key: "Gateway",
    label: "API Gateway",
    icon: LockOutlinedIcon,
    color: "#4F8CFF",
    description: "Issues and verifies JWTs, enforces role-based access, and routes requests to the right department service.",
    db: "No database — stateless routing layer",
    records: null,
  },
  {
    key: "Income Service",
    label: "Income",
    icon: PaidOutlinedIcon,
    color: "#22C55E",
    description: "Owns income records: create, read, update, delete and verify, in its own PostgreSQL database.",
    db: "income_db",
    records: INCOME_RECORDS.length,
  },
  {
    key: "Education Service",
    label: "Education",
    icon: SchoolOutlinedIcon,
    color: "#4F8CFF",
    description: "Owns education records for every citizen, verified independently of the other three departments.",
    db: "education_db",
    records: EDUCATION_RECORDS.length,
  },
  {
    key: "Identity Service",
    label: "Identity",
    icon: BadgeOutlinedIcon,
    color: "#8B5CF6",
    description: "Owns identity records. ID numbers are masked in every response outside this service.",
    db: "identity_db",
    records: IDENTITY_RECORDS.length,
  },
  {
    key: "Scholarship Service",
    label: "Scholarship",
    icon: WorkspacePremiumOutlinedIcon,
    color: "#F59E0B",
    description: "Calls Income, Education and Identity directly (peer-to-peer) to decide eligibility before approving an application.",
    db: "scholarship_db",
    records: SCHOLARSHIP_APPLICATIONS.length,
  },
];

export default function Departments() {
  return (
    <Box>
      <PageHeader
        title="Departments"
        subtitle="Five independent services, five independent databases — nothing here shares a central citizen record."
      />

      <Grid container spacing={2.5}>
        {SERVICES.map((service, i) => {
          const health = SYSTEM_HEALTH.find((h) => h.name === service.key);
          return (
            <Grid item xs={12} sm={6} lg={4} key={service.key}>
              <Card
                component={motion.div}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
                sx={{ p: 2.5, height: "100%" }}
              >
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Box sx={{ width: 42, height: 42, borderRadius: 2.5, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: `${service.color}1F`, color: service.color }}>
                    <service.icon fontSize="small" />
                  </Box>
                  {health && <StatusChip status={health.status} />}
                </Stack>

                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {service.label}
                </Typography>
                {health && (
                  <Typography variant="caption" color="text.secondary">
                    Port {health.port}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25, minHeight: 60 }}>
                  {service.description}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                  <StorageOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
                    {service.db}
                  </Typography>
                  {service.records !== null && (
                    <Chip label={`${service.records} records`} size="small" sx={{ height: 20, fontSize: 11 }} />
                  )}
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
