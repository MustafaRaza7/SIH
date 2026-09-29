import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Box,
  useMediaQuery,
  Stack,
  Typography,
  Card,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmptyState from "../common/EmptyState";

// columns: [{ key, label, render?(row), align? }]
// On mobile, rows collapse into stacked cards instead of a horizontal-scroll
// table, so nothing gets clipped on a small screen.
export default function DataTable({ columns, rows, keyField = "id", emptyMessage = "No records found." }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!rows || rows.length === 0) {
    return <EmptyState title="No records" description={emptyMessage} />;
  }

  if (isMobile) {
    return (
      <Stack spacing={1.5}>
        {rows.map((row) => (
          <Card key={row[keyField]} sx={{ p: 2 }}>
            <Stack spacing={1}>
              {columns.map((col) => (
                <Stack key={col.key} direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="caption" color="text.secondary">
                    {col.label}
                  </Typography>
                  <Box sx={{ textAlign: "right" }}>
                    {col.render ? col.render(row) : row[col.key]}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer sx={{ overflowX: "auto", borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
      <Table sx={{ minWidth: 560 }}>
        <TableHead>
          <TableRow sx={{ "& th": { bgcolor: "background.paper", fontWeight: 600, color: "text.secondary", fontSize: 12.5, whiteSpace: "nowrap" } }}>
            {columns.map((col) => (
              <TableCell key={col.key} align={col.align || "left"}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[keyField]} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || "left"} sx={{ whiteSpace: "nowrap" }}>
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
