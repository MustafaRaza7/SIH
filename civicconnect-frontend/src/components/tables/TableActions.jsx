import { Stack, IconButton, Tooltip } from "@mui/material";

// actions: [{ label, icon, onClick, color? }]
export default function TableActions({ actions = [] }) {
  return (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      {actions.map(({ label, icon: Icon, onClick, color = "default" }) => (
        <Tooltip key={label} title={label}>
          <IconButton size="small" color={color} onClick={onClick}>
            <Icon fontSize="small" />
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}
