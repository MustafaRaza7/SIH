import { useState } from "react";
import { Box, Typography, TextField, Button, Alert, Link as MuiLink, Stack, InputAdornment, IconButton, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Logo from "../../components/common/Logo";
import { useAuth } from "../../hooks/useAuth";

const DEMO_ACCOUNTS = [
  { role: "Citizen", email: "aditi.sharma@example.com", password: "citizen123" },
  { role: "Scholarship Officer", email: "scholarship.officer@example.com", password: "officer123" },
  { role: "Admin", email: "admin@example.com", password: "admin123" },
];

const ROLE_HOME = {
  citizen: "/citizen/dashboard",
  income_officer: "/officer/income",
  education_officer: "/officer/education",
  identity_officer: "/officer/identity",
  scholarship_officer: "/officer/scholarship",
  admin: "/admin/dashboard",
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setServerError("");
    try {
      const user = await login(values);
      const redirectTo = location.state?.from?.pathname || ROLE_HOME[user.role] || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
    }
  };

  const fillDemo = (acc) => {
    setValue("email", acc.email);
    setValue("password", acc.password);
  };

  return (
    <Box
      className="node-grid-bg"
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        sx={{
          width: "100%",
          maxWidth: 420,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Logo />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
          Sign in to access your department services.
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.25}>
            <TextField
              label="Email address"
              type="email"
              fullWidth
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" size="small">
                      {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", { required: "Password is required" })}
            />
            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
          New to CivicConnect?{" "}
          <MuiLink component={Link} to="/register" sx={{ fontWeight: 600 }}>
            Create an account
          </MuiLink>
        </Typography>

        {/* <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">
            DEMO ACCOUNTS
          </Typography>
        </Divider>

        <Stack spacing={1}>
          {DEMO_ACCOUNTS.map((acc) => (
            <Button
              key={acc.email}
              onClick={() => fillDemo(acc)}
              variant="outlined"
              color="inherit"
              size="small"
              sx={{ justifyContent: "space-between", px: 1.5 }}
              endIcon={null}
            >
              <Box component="span" sx={{ fontWeight: 600 }}>{acc.role}</Box>
              <Box component="span" sx={{ color: "text.secondary", fontSize: 12, ml: "auto" }}>{acc.email}</Box>
            </Button>
          ))}
        </Stack> */}
      </Box>
    </Box>
  );
}
