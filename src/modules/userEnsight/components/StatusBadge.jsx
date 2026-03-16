import { Box } from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
/* ─── Status Badge ───────────────────────────────────────────── */
export const StatusBadge = ({ status, onClick }) => {
  const isCompleted = status === "completed";
  const isPending = status === "pending";
  return (
    <Box
      onClick={isPending && onClick ? onClick : undefined}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "50%",
        bgcolor: isCompleted
          ? "rgba(0, 200, 83, 0.1)"
          : "rgba(255, 179, 0, 0.1)",
        border: `2px solid ${isCompleted ? "#00C853" : "#FFB300"}`,
        transition: "all 0.2s ease",
        cursor: isPending && onClick ? "pointer" : "default",
        "&:hover": {
          transform: "scale(1.15)",
          boxShadow: isCompleted
            ? "0 0 10px rgba(0,200,83,0.4)"
            : "0 0 10px rgba(255,179,0,0.4)",
        },
      }}
    >
      {isCompleted ? (
        <CheckCircleIcon sx={{ color: "#00C853", fontSize: 18 }} />
      ) : (
        <ScheduleIcon sx={{ color: "#FFB300", fontSize: 18 }} />
      )}
    </Box>
  );
};