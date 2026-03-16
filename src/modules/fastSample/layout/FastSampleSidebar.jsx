import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  alpha,
} from "@mui/material";

import {
  Dashboard,
  Inventory,
  LocalShipping,
  PersonAdd,
  Assessment
} from "@mui/icons-material";

const drawerWidth = 280;

export function FastSampleSidebar({ mobileOpen, onDrawerToggle }) {
  const location = useLocation();
  const year = new Date().getFullYear();
  const menuItems = [
    { path: "/fast-sample/admin/dashboard", label: "Dashboard", icon: <Dashboard /> },
    { path: "/fast-sample/admin/requests", label: "Doctor Request", icon: <LocalShipping /> },
    { path: "/fast-sample/admin/user", label: "User", icon: <PersonAdd /> },
    { path: "/fast-sample/admin/products", label: "Products", icon: <Inventory /> },
    { path: "/fast-sample/admin/doctors", label: "Doctors", icon: <PersonAdd /> },
    { path: "/fast-sample/admin/reports", label: "Reports", icon: <Assessment /> },
  ];

  const drawerContent = (
    <>
      {/* Logo Section */}
      <Box
        sx={{
          px: 3,
          py: 4.1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid",
          borderColor: alpha("#10b981", 0.1),
        }}
      >
        <img src="/images/logo_fast_sample.png" alt="Fast Sample Logo" style={{ width: '220px', height: "auto", objectFit: "contain" }} />

      </Box>

      {/* Navigation Section */}
      <Box sx={{ mt: 2, px: 2, flex: 1 }}>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2.5,
                    position: "relative",
                    color: isActive ? "#10b981" : "text.secondary",
                    bgcolor: isActive ? alpha("#10b981", 0.08) : "transparent",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: isActive ? alpha("#10b981", 0.12) : alpha("#10b981", 0.04),
                      transform: "translateX(4px)",
                    },
                    "&::before": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 4,
                          height: "60%",
                          bgcolor: "#10b981",
                          borderRadius: "0 4px 4px 0",
                        }
                      : {},
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? "#10b981" : "text.secondary",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.9375rem",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer Section */}
      <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: alpha("#10b981", 0.08),
            border: "1px solid",
            borderColor: alpha("#10b981", 0.2),
          }}
        >
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{ color: "#10b981" }}
            display="block"
            gutterBottom
          >
            {year} © Fast Sample
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            Pharmaceutical Sample Distribution System.
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            borderRight: '1px solid',
            borderColor: alpha('#10b981', 0.1),
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.08)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            borderRight: '1px solid',
            borderColor: alpha('#10b981', 0.1),
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.08)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
