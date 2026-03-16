import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Divider,
  alpha,
} from "@mui/material";

const drawerWidth = 280;

export function Sidebar({ mobileOpen, onDrawerToggle }) {
  const location = useLocation();
  const year = new Date().getFullYear();

  const menuItems = [
    { path: "/MSA/admin/welcome/dashboard", label: "Dashboard" },
    { path: "/MSA/admin/welcome/dashboard", label: "MSA" },
    { path: "/MSA/admin/welcome/dashboard", label: "SOW" },
    { path: "/admin/dashboard", label: "Ensight" },
    { path: "/MSA/admin/login", label: "Other Division" },
  ];

  const drawerContent = (
    <>
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/MSA_logo.png"
          alt="MSA Logo"
          style={{ width: 110, height: "auto", objectFit: "contain" }}
        />
      </Box>

      <Divider />

      <Box sx={{ mt: 2, px: 2, flex: 1 }}>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={`${item.path}-${item.label}`} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2.5,
                    position: "relative",
                    color: isActive ? "primary.main" : "text.secondary",
                    bgcolor: isActive ? alpha("#F4A300", 0.08) : "transparent",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: isActive ? alpha("#F4A300", 0.12) : "grey.50",
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
                          bgcolor: "primary.main",
                          borderRadius: "0 4px 4px 0",
                        }
                      : {},
                  }}
                >
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

      <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: alpha("#F4A300", 0.08),
            border: "1px solid",
            borderColor: alpha("#F4A300", 0.2),
          }}
        >
          <Typography
            variant="caption"
            fontWeight={600}
            color="primary.main"
            display="block"
            gutterBottom
          >
            {year} © Ensight
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            Physicians' Perception Mapping Automation.
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#FFFFFF",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#FFFFFF",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}