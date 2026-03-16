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
  ChangeCircle,
  FileDownload,
  Draw,
} from "@mui/icons-material";
import { useState } from "react";
import { authService } from "../../../core/auth/authService";
import { useLocation, useNavigate } from "react-router-dom";

export function Header({ onMenuClick }) {
  console.log("Header mounted with onMenuClick:", onMenuClick);
  
  const user = authService.getCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/admin/login";
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Welcome Section */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <img
            src="/images/MSA_logo.png"
            alt="Ensight Logo"
            style={{ width: "auto", height: 48, objectFit: "cover" }}
          />
        </Box>

        {/* Actions Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          {location.pathname !== "/MSA/user/add-doctor" &&
          location.pathname !== "/MSA/user/change-password" ? (
            <Box
              sx={{
                gap: { xs: 1.5, sm: 2 },
                display: { xs: "none", sm: "flex" },
                alignItems: "baseline",
              }}
            >
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{
                  lineHeight: 1.2,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  cursor: "pointer",
                }}
                onClick={() => navigate("/users/survey")}
              >
                Ensight
              </Typography>

              <Typography
                variant="body1"
                fontWeight={600}
                sx={{
                  lineHeight: 1.2,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  cursor: "pointer",
                }}
                onClick={() => navigate("/fast-sample/user/dashboard")}
              >
                Fast Sample
              </Typography>

              <Typography
                variant="body1"
                fontWeight={600}
                sx={{
                  lineHeight: 1.2,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  borderBottom: "3px solid #e53935",
                  pb: 0.5,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/MSA/user/dashboard")}
              >
                MSA
              </Typography>
            </Box>
          ) : null}

          <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: "none", sm: "flex" } }} />

          {/* Profile Menu */}
          <Button
            onClick={handleMenuOpen}
            endIcon={
              <ExpandMore sx={{ display: { xs: "none", sm: "inline" } }} />
            }
            sx={{
              borderRadius: 3,
              py: 1,
              px: { xs: 1, sm: 2 },
              bgcolor: "grey.50",
              color: "text.primary",
              textTransform: "none",
              minWidth: { xs: "auto", sm: "auto" },
              "&:hover": {
                bgcolor: "grey.100",
              },
              transition: "all 0.2s",
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mr: { xs: 0, sm: 1.5 },
                bgcolor: "primary.main",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              {user?.name?.charAt(0) || "U"}
            </Avatar>
            <Box
              sx={{ textAlign: "left", display: { xs: "none", sm: "block" } }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ lineHeight: 1.2 }}
              >
                {user?.name || "User"}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                {user?.role || "Administrator"}
              </Typography>
            </Box>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                "& .MuiMenuItem-root": {
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                navigate("/MSA/user/change-password");
                handleMenuClose();
              }}
            >
              <ChangeCircle sx={{ mr: 1.5, fontSize: 20 }} />
              Change Password
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/MSA/user/change-signature");
                handleMenuClose();
              }}
            >
              <Draw sx={{ mr: 1.5, fontSize: 20 }} />
              Change Signature
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <FileDownload sx={{ mr: 1.5, fontSize: 20 }} />
              MSA Download Excel Report
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <FileDownload sx={{ mr: 1.5, fontSize: 20 }} />
              SOW Download Excel Report
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <ExitToApp sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Paper>
  );
}
