import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#4F8CFF",
      light: "#79A8FF",
      dark: "#2563EB",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#8B5CF6",
      light: "#A78BFA",
      dark: "#6D28D9",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#080B14",
      paper: "#101522",
    },

    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    divider: "rgba(148, 163, 184, 0.12)",
  },

  typography: {
    fontFamily: '"Poppins", sans-serif',

    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },

    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#101522",
          border: "1px solid rgba(148, 163, 184, 0.10)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.20)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "& fieldset": {
            borderColor: "rgba(148, 163, 184, 0.18)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(79, 140, 255, 0.5)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4F8CFF",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "rgba(148, 163, 184, 0.10)",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0B0F1A",
          backgroundImage: "none",
          borderRight: "1px solid rgba(148, 163, 184, 0.10)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(8, 11, 20, 0.85)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});

export default theme;
