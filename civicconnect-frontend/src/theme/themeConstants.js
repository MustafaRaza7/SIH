// Shared design tokens used outside the MUI theme object (Tailwind classes,
// inline SVG charts, framer-motion variants, etc). Keep these in sync with
// theme.js so the app reads as one system.

export const COLORS = {
  bg: "#080B14",
  surface: "#101522",
  surfaceAlt: "#0B0F1A",
  border: "rgba(148, 163, 184, 0.10)",
  borderStrong: "rgba(148, 163, 184, 0.18)",

  primary: "#4F8CFF",
  primaryLight: "#79A8FF",
  primaryDark: "#2563EB",

  secondary: "#8B5CF6",
  secondaryLight: "#A78BFA",

  textPrimary: "#F8FAFC",
  textSecondary: "#94A3B8",
  textMuted: "#5B6B8C",

  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
};

// Per-department accent — used across cards, chips and charts so a citizen
// can recognise a department by colour at a glance, everywhere in the app.
export const DEPARTMENTS = {
  income: {
    key: "income",
    label: "Income",
    color: "#22C55E",
    soft: "rgba(34, 197, 94, 0.12)",
    port: 8001,
  },
  education: {
    key: "education",
    label: "Education",
    color: "#4F8CFF",
    soft: "rgba(79, 140, 255, 0.12)",
    port: 8002,
  },
  identity: {
    key: "identity",
    label: "Identity",
    color: "#8B5CF6",
    soft: "rgba(139, 92, 246, 0.12)",
    port: 8003,
  },
  scholarship: {
    key: "scholarship",
    label: "Scholarship",
    color: "#F59E0B",
    soft: "rgba(245, 158, 11, 0.12)",
    port: 8004,
  },
};

export const ROLES = {
  CITIZEN: "citizen",
  INCOME_OFFICER: "income_officer",
  EDUCATION_OFFICER: "education_officer",
  IDENTITY_OFFICER: "identity_officer",
  SCHOLARSHIP_OFFICER: "scholarship_officer",
  ADMIN: "admin",
};

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};
