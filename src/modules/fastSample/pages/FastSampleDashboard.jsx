import {
  Box,
  Grid,
  Button,
  Paper,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Inventory,
  Add,
  LocalShipping,
  Pending,
  CheckCircle,
  Schedule,
  LocalShipping as ShippedIcon,
} from "@mui/icons-material";
import { PageHeader } from "../../../shared/components/PageHeader";
import StatsCard from "../../../shared/components/StatsCard";

/* ── Status chip helper ─────────────────────────────────────── */
const StatusChip = ({ status }) => {
  const map = {
    pending:   { label: "Pending",   color: "#FFB300", bg: "rgba(255,179,0,0.1)",    icon: <Schedule  sx={{ fontSize: 13 }} /> },
    shipped:   { label: "Shipped",   color: "#1E88E5", bg: "rgba(30,136,229,0.1)",   icon: <ShippedIcon sx={{ fontSize: 13 }} /> },
    delivered: { label: "Delivered", color: "#00C853", bg: "rgba(0,200,83,0.1)",     icon: <CheckCircle sx={{ fontSize: 13 }} /> },
  };
  const cfg = map[status] ?? map.pending;

  return (
    <Chip
      icon={cfg.icon}
      label={cfg.label}
      size="small"
      sx={{
        bgcolor: cfg.bg,
        color: cfg.color,
        fontWeight: 600,
        fontSize: "0.7rem",
        height: 24,
        border: `1px solid ${cfg.color}33`,
        "& .MuiChip-icon": { color: cfg.color },
      }}
    />
  );
};

/* ── Dashboard ──────────────────────────────────────────────── */
export default function FastSampleDashboard() {
  const navigate = useNavigate();

  const stats = {
    totalRequests: 245,
    pendingRequests: 32,
    shippedSamples: 156,
    deliveredSamples: 189,
  };

  const recentRequests = [
    { id: "FS001", productName: "Cardio Sample Pack",  doctorName: "Dr. Sarah Johnson", quantity: 50, status: "pending",   date: "Feb 18, 2026" },
    { id: "FS002", productName: "Diabetes Care Kit",   doctorName: "Dr. Michael Chen",  quantity: 30, status: "shipped",   date: "Feb 17, 2026" },
    { id: "FS003", productName: "Pain Relief Sample",  doctorName: "Dr. Emily Davis",   quantity: 25, status: "delivered", date: "Feb 16, 2026" },
  ];

  const avatarPalette = ["#E53935", "#8E24AA", "#1E88E5", "#00897B", "#F4511E"];
  const avatarColor = (i) => avatarPalette[i % avatarPalette.length];

  return (
    <Box sx={{ width: "100%", maxWidth: "1600px", mx: "auto" }}>

      {/* ── Page Header ── */}
      <PageHeader
        title="Fast Sample Dashboard"
        subtitle="Manage and track pharmaceutical sample distribution"
        actions={
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/fast-sample/new-request")}
            sx={{
              borderRadius: 2.5,
              px: { xs: 2, sm: 3 },
              py: 1.25,
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#10b981",
              fontSize: { xs: "0.82rem", sm: "0.875rem" },
              "&:hover": {
                bgcolor: "#059669",
                boxShadow: "0 6px 20px rgba(16,185,129,0.4)",
              },
            }}
          >
            New Sample Request
          </Button>
        }
      />

      {/* ── Stats Cards ── */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            icon={<Inventory sx={{ fontSize: 32, color: "#fff" }} />}
            count={stats.totalRequests}
            label="Registered Users"
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            iconBg="rgba(102,126,234,0.9)"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            icon={<Pending sx={{ fontSize: 32, color: "#fff" }} />}
            count={stats.pendingRequests}
            label="No of Products"
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            iconBg="rgba(245,87,108,0.9)"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            icon={<LocalShipping sx={{ fontSize: 32, color: "#fff" }} />}
            count={stats.shippedSamples}
            label="Doctor Requests"
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            iconBg="rgba(79,172,254,0.9)"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            icon={<CheckCircle sx={{ fontSize: 32, color: "#fff" }} />}
            count={stats.deliveredSamples}
            label="Delivered Samples"
            gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
            iconBg="rgba(67,233,123,0.9)"
          />
        </Grid>
      </Grid>

      {/* ── Recent Requests Table ── */}
      <Paper
        sx={{
          borderRadius: { xs: 2, sm: 3 },
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Table header bar */}
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", sm: "1.15rem" }, color: "#fff" }}>
              Recent Requests
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", mt: 0.2 }}>
              Latest sample distribution activity
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
              textTransform: "none",
              borderRadius: 2,
              fontSize: "0.78rem",
              "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
            }}
            onClick={() => navigate("/fast-sample/all-requests")}
          >
            View All
          </Button>
        </Box>

        {/* Scrollable table wrapper — KEY for mobile */}
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { height: 5 },
            "&::-webkit-scrollbar-track": { background: "#f1f5f9" },
            "&::-webkit-scrollbar-thumb": { background: "rgba(0,0,0,0.15)", borderRadius: 4 },
          }}
        >
          <Table sx={{ minWidth: 620 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                {["Request ID", "Product Name", "Doctor Name", "Qty", "Status", "Date"].map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#64748B",
                      whiteSpace: "nowrap",
                      py: 1.5,
                      borderBottom: "2px solid #e2e8f0",
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {recentRequests.map((req, idx) => (
                <TableRow
                  key={req.id}
                  sx={{
                    bgcolor: idx % 2 === 0 ? "#fff" : "#fafbfd",
                    borderBottom: "1px solid #f1f5f9",
                    transition: "background 0.2s",
                    "&:hover": { bgcolor: "rgba(16,185,129,0.03)" },
                    "&:last-child td": { border: 0 },
                  }}
                >
                  {/* ID */}
                  <TableCell sx={{ py: 2, whiteSpace: "nowrap" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.82rem", color: "#10b981" }}>
                      #{req.id}
                    </Typography>
                  </TableCell>

                  {/* Product */}
                  <TableCell sx={{ py: 2, whiteSpace: "nowrap" }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.83rem", color: "#1E293B" }}>
                      {req.productName}
                    </Typography>
                  </TableCell>

                  {/* Doctor */}
                  <TableCell sx={{ py: 2, whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          bgcolor: avatarColor(idx),
                        }}
                      >
                        {req.doctorName.charAt(3)}
                      </Avatar>
                      <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "#334155" }}>
                        {req.doctorName}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Qty */}
                  <TableCell sx={{ py: 2 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.82rem", color: "#475569" }}>
                      {req.quantity}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ py: 2 }}>
                    <StatusChip status={req.status} />
                  </TableCell>

                  {/* Date */}
                  <TableCell sx={{ py: 2, whiteSpace: "nowrap" }}>
                    <Typography sx={{ fontSize: "0.78rem", color: "#94A3B8" }}>
                      {req.date}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: 1.5,
            bgcolor: "#f8fafc",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", color: "#94A3B8" }}>
            Showing <strong style={{ color: "#475569" }}>{recentRequests.length}</strong> most recent requests
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {["pending", "shipped", "delivered"].map((s) => (
              <Box key={s} sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                <Box
                  sx={{
                    width: 7, height: 7, borderRadius: "50%",
                    bgcolor: s === "pending" ? "#FFB300" : s === "shipped" ? "#1E88E5" : "#00C853",
                  }}
                />
                <Typography sx={{ fontSize: "0.7rem", color: "#64748B", textTransform: "capitalize" }}>
                  {s}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}