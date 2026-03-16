import { Button, alpha } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function DivisionChip({ label, onClick }) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={<Add />}
      sx={{
        textTransform: "none",
        borderRadius: 2.5,
        px: 3,
        py: 1.25,
        color: "text.primary",
        borderColor: "divider",
        backgroundColor: "background.paper",
        fontWeight: 600,
        fontSize: "0.9375rem",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: alpha("#F4A300", 0.08),
          borderColor: "primary.main",
          color: "primary.main",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 16px rgba(244,163,0,0.2)",
        },
      }}
    >
      {label === "Medical Institution Business" ? "Medical Institution" : label}
      {/* {label} */}
    </Button>
  );
}
