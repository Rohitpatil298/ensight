import { Link, useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
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
import {
  Dashboard,
  Business,
  Assignment,
  Description,
  Home,
  Group,
  LocalHospital,
  PersonAddAlt,
  Handshake,
  AdminPanelSettings,
  RemoveRedEye,
  Key,
  Inventory,
} from "@mui/icons-material";

const drawerWidth = 280;

export function Sidebar({ mobileOpen, onDrawerToggle }) {
  const location = useLocation();
  const year = new Date().getFullYear();
  const [divisionCategory, setDivisionCategory] = useState(null);
  const [divisionName, setDivisionName] = useState("");

useEffect(() => {
  const loadDivision = () => {
    const storedDivision = localStorage.getItem("division");

    if (!storedDivision) {
      setDivisionCategory(null);
      setDivisionName("");
      return;
    }

    try {
      const division = JSON.parse(storedDivision);
      const category = division.category || getDivisionCategory(division.name);

      setDivisionCategory(category);
      setDivisionName(division.name);
    } catch (err) {
      console.error("Invalid division in storage");
    }
  };

  // initial load
  loadDivision();

  // listen custom event (same tab)
  window.addEventListener("divisionChanged", loadDivision);

  // optional: still listen cross-tab
  window.addEventListener("storage", loadDivision);

  return () => {
    window.removeEventListener("divisionChanged", loadDivision);
    window.removeEventListener("storage", loadDivision);
  };
}, []);

  // Determine division category based on division name
  const getDivisionCategory = (divisionName) => {
    const name = divisionName.toUpperCase();
    
    if (name === "FINANCE") return "FINANCE";
    if (name === "REVIEW") return "REVIEW";
    if (name === "SUPER ADMIN") return "SUPER_ADMIN";
    if (name.startsWith("MKT") || name.includes("MARKETING")) return "MARKETING";
    
    // Default to Medical for all other divisions
    return "MEDICAL";
  };

  // All possible menu items with their categories
  const allMenuItems = {
    dashboard: { path: "/admin/dashboard", label: "Dashboard", icon: <Home /> },
    salesTeam: { path: "/admin/user/view", label: "Sales Team", icon: <Group /> },
    survey: { path: "/admin/survey", label: "Survey", icon: <Assignment /> },
    nonSurvey: { path: "/admin/nonsurvey", label: "Non-Survey", icon: <Description /> },
    MSA: { path: "/MSA/admin/login", label: "MSA", icon: <Dashboard /> },
    adminUser: { path: "/admin/division/view", label: "Admin Users", icon: <AdminPanelSettings /> },
    cv: { path: "/admin/cv/view", label: "CV", icon: <Business /> },
    division: { path: "/admin/sector/view", label: "Division", icon: <RemoveRedEye /> },
    doctor: { path: "/admin/doctor/view", label: "Doctor", icon: <LocalHospital /> },
    addDoctor: { path: "/admin/dr/view", label: "Add Doctor", icon: <PersonAddAlt /> },
    agreements: { path: "/admin/cron/view", label: "Agreements", icon: <Handshake /> },
    otherDivision: { path: "/admin/login", label: "Other Division", icon: <Assignment /> },
    otpPlatform: { path: "/admin/otp", label: "OTP Platform", icon: <Key /> },
    fastSample: { path: "/fast-sample/admin/dashboard", label: "Fast Sample", icon: <Inventory /> },
  };

  // Menu configuration for each division category
  const menuConfig = {
    MEDICAL: [
      "dashboard",
      "survey",
      "nonSurvey",
      "MSA",
      "cv",
      "otherDivision",
    ],
    MARKETING: [
      "dashboard",
      "salesTeam",
      "survey",
      "nonSurvey",
      "cv",
      "fastSample",
      "otherDivision",
    ],
    FINANCE: [
      "dashboard",
      "survey",
      "nonSurvey",
      "doctor",
      "agreements",
      "cv",
      "otherDivision",
    ],
    REVIEW: [
      "dashboard",
      "division",
      "adminUser",
      "salesTeam",
      "survey",
      "nonSurvey",
      "doctor",
      "cv",
      "addDoctor",
      "agreements",
      "otherDivision",
    ],
    SUPER_ADMIN: [
      "dashboard",
      "division",
      "adminUser",
      "salesTeam",
      "survey",
      "nonSurvey",
      "doctor",
      "cv",
      "addDoctor",
      "agreements",
      "otherDivision",
      "otpPlatform",
    ],
  };

  // Get filtered menu items based on division category
  const menuItems = useMemo(() => {
    if (!divisionCategory) {
      // Default menu items if no division is selected
      return Object.values(allMenuItems);
    }

    const itemKeys = [...(menuConfig[divisionCategory] || [])];
    const normalizedDivisionName = (divisionName || "").trim().toUpperCase();
    const isMedicalInstitution =
      normalizedDivisionName === "MEDICAL INSTITUTION" ||
      normalizedDivisionName === "MEDICAL INSTITUTION BUSINESS";

    if (divisionCategory === "MEDICAL" && !isMedicalInstitution) {
      return itemKeys
        .filter((key) => key !== "MSA")
        .map((key) => allMenuItems[key])
        .filter(Boolean);
    }

    return itemKeys.map(key => allMenuItems[key]).filter(Boolean);
  }, [divisionCategory, divisionName]);

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
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            borderRight: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.03)',
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
            borderColor: 'divider',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.03)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
