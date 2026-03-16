import { Box, Typography, IconButton, Paper, alpha } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export function Header({ onMenuClick }) {
  const divisionName =
    JSON.parse(localStorage.getItem("division") || "null")?.name || "Division";

  return (
    <Paper
      elevation={0}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        borderBottom: "1px solid",
        borderColor: "divider",
        borderRadius: 0,
        backdropFilter: "blur(8px)",
        bgcolor: alpha("#FFFFFF", 0.95),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4 },
          py: 2,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <img
            src="/images/MSA_logo.png"
            alt="MSA Logo"
            style={{ width: 90, height: "auto", objectFit: "contain" }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {divisionName}
        </Typography>
      </Box>
    </Paper>
  );
}
