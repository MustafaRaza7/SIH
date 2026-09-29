import { Breadcrumbs as MuiBreadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { titleCase } from "../../utils/formatters";

export default function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  if (parts.length === 0) return null;

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon sx={{ fontSize: 16, color: "text.secondary" }} />}
      sx={{ display: { xs: "none", sm: "flex" }, "& .MuiBreadcrumbs-ol": { flexWrap: "nowrap" } }}
    >
      {parts.map((part, i) => {
        const to = "/" + parts.slice(0, i + 1).join("/");
        const isLast = i === parts.length - 1;
        const label = titleCase(part);
        return isLast ? (
          <Typography key={to} variant="body2" sx={{ color: "text.primary", fontWeight: 500, whiteSpace: "nowrap" }}>
            {label}
          </Typography>
        ) : (
          <MuiLink
            key={to}
            component={Link}
            to={to}
            underline="hover"
            variant="body2"
            sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
          >
            {label}
          </MuiLink>
        );
      })}
    </MuiBreadcrumbs>
  );
}
