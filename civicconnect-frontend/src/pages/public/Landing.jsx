import { Box, Container, Typography, Button, Stack, Grid, Card } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import Logo from "../../components/common/Logo";
import { fadeUp } from "../../theme/themeConstants";

const DEPARTMENTS = [
  { label: "Income", icon: PaidOutlinedIcon, color: "#22C55E", angle: 0 },
  { label: "Education", icon: SchoolOutlinedIcon, color: "#4F8CFF", angle: 90 },
  { label: "Identity", icon: BadgeOutlinedIcon, color: "#8B5CF6", angle: 180 },
  { label: "Scholarship", icon: WorkspacePremiumOutlinedIcon, color: "#F59E0B", angle: 270 },
];

function FederationDiagram() {
  const radius = 130;
  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: 280, sm: 340, md: 380 },
        height: { xs: 280, sm: 340, md: 380 },
        mx: "auto",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 380 380" style={{ position: "absolute", inset: 0 }}>
        {DEPARTMENTS.map((d) => {
          const rad = (d.angle * Math.PI) / 180;
          const x = 190 + radius * Math.cos(rad);
          const y = 190 + radius * Math.sin(rad);
          return (
            <motion.line
              key={d.label}
              x1="190"
              y1="190"
              x2={x}
              y2={y}
              stroke={d.color}
              strokeWidth="1.5"
              strokeOpacity="0.45"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          );
        })}
      </svg>

      {/* Gateway node, center */}
      <Box
        component={motion.div}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 92,
          height: 92,
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4F8CFF, #8B5CF6)",
          boxShadow: "0 0 0 8px rgba(79,140,255,0.08), 0 20px 40px rgba(79,140,255,0.25)",
        }}
      >
        <LockOutlinedIcon sx={{ color: "#fff", fontSize: 26 }} />
        <Typography variant="caption" sx={{ color: "#fff", fontWeight: 700, mt: 0.25 }}>
          Gateway
        </Typography>
      </Box>

      {DEPARTMENTS.map((d, i) => {
        const rad = (d.angle * Math.PI) / 180;
        const x = 190 + radius * Math.cos(rad);
        const y = 190 + radius * Math.sin(rad);
        const Icon = d.icon;
        return (
          <Box
            key={d.label}
            component={motion.div}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
            sx={{
              position: "absolute",
              top: `${(y / 380) * 100}%`,
              left: `${(x / 380) * 100}%`,
              transform: "translate(-50%,-50%)",
              width: 74,
              height: 74,
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Icon sx={{ color: d.color, fontSize: 22 }} />
            <Typography variant="caption" sx={{ fontSize: 10.5, fontWeight: 600, mt: 0.25 }}>
              {d.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

const FEATURES = [
  {
    icon: LockOutlinedIcon,
    title: "Every department keeps its own data",
    description: "Income, Education, Identity and Scholarship each run their own service and database. Nothing sits in one central citizen record for a breach to expose.",
  },
  {
    icon: BoltOutlinedIcon,
    title: "Eligibility checked in real time",
    description: "When you apply for a scholarship, the Scholarship service asks the other three departments directly and decides in seconds — no paperwork shuttled between offices.",
  },
  {
    icon: WorkspacePremiumOutlinedIcon,
    title: "One login, every service",
    description: "Sign in once. Role-based access means citizens, department officers and administrators each see exactly what their work requires.",
  },
];

export default function Landing() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        component="header"
        sx={{ py: 2.5, px: { xs: 2, sm: 4 }, display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Logo />
        <Stack direction="row" spacing={1.5}>
          <Button component={Link} to="/login" color="inherit">
            Sign in
          </Button>
          <Button component={Link} to="/register" variant="contained">
            Get started
          </Button>
        </Stack>
      </Box>

      <Box className="node-grid-bg" sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={{ xs: 6, md: 4 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component={motion.h1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                variant="h2"
                sx={{ fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" }, lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                Four departments.
                <br />
                One citizen record you never have to repeat.
              </Typography>
              <Typography
                component={motion.p}
                variants={fadeUp}
                custom={1}
                initial="hidden"
                animate="visible"
                variant="body1"
                color="text.secondary"
                sx={{ mt: 2.5, maxWidth: 460, fontSize: 16 }}
              >
                CivicConnect links Income, Education, Identity and Scholarship into one
                federated portal — so a scholarship application gets verified against
                real records automatically, instead of a folder of photocopies.
              </Typography>
              <Stack
                component={motion.div}
                variants={fadeUp}
                custom={2}
                initial="hidden"
                animate="visible"
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Button component={Link} to="/register" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
                  Apply as a citizen
                </Button>
                <Button component={Link} to="/login" variant="outlined" size="large" color="inherit">
                  Officer / Admin sign in
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <FederationDiagram />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: { xs: 4, md: 8 } }}>
            {FEATURES.map((f, i) => (
              <Grid item xs={12} sm={6} md={4} key={f.title}>
                <Card
                  component={motion.div}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  sx={{ p: 3, height: "100%" }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(79,140,255,0.12)",
                      color: "primary.light",
                      mb: 2,
                    }}
                  >
                    <f.icon fontSize="small" />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {f.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="footer" sx={{ py: 3, textAlign: "center", borderTop: "1px solid", borderColor: "divider" }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} CivicConnect. Built on a 5-service federated architecture.
        </Typography>
      </Box>
    </Box>
  );
}
