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
  Divider,
  alpha,
} from "@mui/material";


const drawerWidth = 280;

export function Sidebar({ mobileOpen, onDrawerToggle }) {
  console.log("Sidebar mounted with mobileOpen:", mobileOpen, "and onDrawerToggle:", onDrawerToggle);
  
  const location = useLocation();
  const year = new Date().getFullYear();

  // UserEnsight specific menu items
  const menuItems = [
    { path: "/users/survey", label: "Ensight Survey"},
    { path: "/fast-sample/user/dashboard", label: "Fast Sample"},
    { path: "/MSA/user/dashboard", label: "MSA"},
  ];

  const drawerContent = (
    <>
      {/* Logo Section */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <img
            src="/images/logo_wide.png"
            alt="Ensight Logo"
            style={{
              width: 160,
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>

      <Divider />

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
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? "primary.main" : "text.secondary",
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
        {" "}
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
            Physicians’ Perception Mapping Automation.
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ display: { xs: "block", sm: "none" } }}
    >
      {/* Mobile drawer - only visible on mobile devices */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: "block",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#FFFFFF",
            borderRight: "1px solid",
            borderColor: "divider",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.03)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
