import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  Paper,
  Menu,
  MenuItem,
  Divider,
  alpha,
} from "@mui/material";
import {
  ExitToApp,
  ExpandMore,
  Menu as MenuIcon,
  FileDownload,
} from "@mui/icons-material";
import { useState } from "react";
import { authService } from "../../../core/auth/authService";
import { useLocation, useNavigate } from "react-router-dom";

export function FastSampleUserHeader({ onMenuClick }) {
  const user = authService.getCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/admin/login";
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const showNavLinks =
    location.pathname !== "/users/add_user_doctor" &&
    location.pathname !== "/users/rsm_doctor_list";

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1300,
        bgcolor: alpha("#FFFFFF", 0.97),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
        flexShrink: 0, // never collapse
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 1.5, sm: 4 },
          py: { xs: 0.75, sm: 1.75 },
          minHeight: { xs: 52, sm: 68 },
        }}
      >
        {/* ══ LEFT: hamburger + logo ══════════════════════════ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
            flexShrink: 0,
          }}
        >
          {/* Hamburger — mobile only */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            size="small"
            sx={{
              display: { xs: "flex", sm: "none" },
              p: 0.75,
              color: "text.primary",
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          {/* Logo — always visible, responsive height */}
          <Box
            component="img"
            src="/images/logo_fast_sample.png"
            alt="Fast Sample"
            sx={{
              height: { xs: 28, sm: 40 },
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>

        {/* ══ RIGHT: desktop nav + profile ═══════════════════ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
            flexShrink: 0,
          }}
        >
          {/* Desktop nav links */}
          {showNavLinks && (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "baseline",
                gap: 2,
              }}
            >
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{
                  fontSize: "1rem",
                  lineHeight: 1.2,
                  borderBottom: "3px solid #e53935",
                  pb: 0.5,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/fast-sample/user/dashboard")}
              >
                Fast Sample
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ fontSize: "1rem", lineHeight: 1.2, cursor: "pointer" }}
                onClick={() => navigate("/user/dashboard")}
              >
                Fast Book
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ fontSize: "1rem", lineHeight: 1.2, cursor: "pointer" }}
                onClick={() => navigate("/users/survey")}
              >
                Ensight
              </Typography>
            </Box>
          )}

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 0.5, display: { xs: "none", sm: "flex" } }}
          />

          {/* Profile button */}
          <Button
            onClick={handleMenuOpen}
            endIcon={
              <ExpandMore
                fontSize="small"
                sx={{ display: { xs: "none", sm: "inline" } }}
              />
            }
            sx={{
              borderRadius: 3,
              py: { xs: 0.4, sm: 0.9 },
              px: { xs: 0.5, sm: 1.5 },
              bgcolor: "grey.50",
              color: "text.primary",
              textTransform: "none",
              minWidth: "auto",
              "&:hover": { bgcolor: "grey.100" },
              transition: "all 0.2s",
            }}
          >
            <Avatar
              sx={{
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                mr: { xs: 0, sm: 1.5 },
                bgcolor: "#F4A300",
                fontSize: "0.8rem",
                fontWeight: 700,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <Box sx={{ textAlign: "left", display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                {user?.name || "User"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                {user?.role || "Administrator"}
              </Typography>
            </Box>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 4,
              sx: {
                mt: 1.5,
                minWidth: 210,
                borderRadius: 2,
                "& .MuiMenuItem-root": { borderRadius: 1, mx: 1, my: 0.5 },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <FileDownload sx={{ mr: 1.5, fontSize: 20 }} />
              Download Excel Report
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <ExitToApp sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}