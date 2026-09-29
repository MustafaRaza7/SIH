import { useState } from "react";
import { Box, Typography, TextField, Button, Alert, Link as MuiLink, Stack, InputAdornment, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Logo from "../../components/common/Logo";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (values) => {
    setServerError("");
    try {
      await registerUser(values);
      navigate("/citizen/dashboard", { replace: true });
    } catch (err) {
      setServerError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Box
      className="node-grid-bg"
      sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
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
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
          Registers you as a citizen. Officer and admin accounts are provisioned separately.
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.25}>
            <TextField
              label="Full name"
              fullWidth
              autoComplete="name"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name", { required: "Name is required" })}
            />
            <TextField
              label="Email address"
              type="email"
              fullWidth
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              autoComplete="new-password"
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
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
            />
            <TextField
              label="Confirm password"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (v) => v === password || "Passwords do not match",
              })}
            />
            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
          Already have an account?{" "}
          <MuiLink component={Link} to="/login" sx={{ fontWeight: 600 }}>
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
