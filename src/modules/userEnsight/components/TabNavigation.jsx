import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Responsive Tab Navigation Component for userEnsight module
 * Automatically adapts to mobile, tablet, and desktop screens
 */
export function TabNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Survey", path: "/users/survey" },
    { label: "Non-Survey", path: "/users/nonsurvey" },
    { label: "Enroll HCP", path: "/users/rsm_doctor_list" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
          width: { xs: "100%", sm: "auto" }, // Full width on mobile
          maxWidth: { xs: "400px", sm: "none" }, // Limit width on mobile
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
          border: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        {tabs.map((tab) => (
          <Button
            key={tab.label}
            className="tab-btn"
            onClick={() => navigate(tab.path)}
            sx={{
              px: { xs: 3, sm: 5 }, // Less padding on mobile
              py: 1.6,
              fontSize: { xs: "0.85rem", sm: "0.95rem" }, // Smaller font on mobile
              fontWeight: 700,
              letterSpacing: "0.01em",
              borderRadius: 0,
              textTransform: "none",
              color: "white",
              background: isActive(tab.path)
                ? "linear-gradient(135deg, #00C853 0%, #00A844 100%)"
                : "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
              minWidth: { xs: "100%", sm: 148 }, // Full width on mobile
              borderBottom: {
                xs: "1px solid rgba(255,255,255,0.1)",
                sm: "none",
              }, // Separator on mobile
              "&:last-child": {
                borderBottom: "none",
              },
              "&:hover": {
                background: isActive(tab.path)
                  ? "linear-gradient(135deg, #00A844 0%, #008A37 100%)"
                  : "linear-gradient(135deg, #C62828 0%, #B71C1C 100%)",
              },
            }}
          >
            {tab.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
