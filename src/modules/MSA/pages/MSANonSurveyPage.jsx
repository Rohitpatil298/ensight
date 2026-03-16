import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  Container,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
  Download as DownloadIcon,
  FilterList as FilterListIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { injectGlobalStyles } from "../../../shared/utils/injectGlobalStyles";
import { TabNavigation } from "../components/TabNavigation";

/* ─── Inject Global Styles ─────────────────────────────────────── */
injectGlobalStyles();

/* ─── Status Badge ───────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const isCompleted = status === "completed";
  return (
    <Box
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

/* ─── Main Component ─────────────────────────────────────────── */
const MSANonSurveyPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const doctorsData = [
    {
      id: 1,
      name: "AMARTYA SHANKAR",
      initials: "AS",
      title: "Test Survey 6",
      survey: "completed",
      document: "completed",
      receiving: "pending",
      agreement: "pending",
    },
    {
      id: 2,
      name: "AMARTYA SHANKAR CHOWDHURY",
      initials: "AC",
      title: "Test Survey 6",
      survey: "completed",
      document: "completed",
      receiving: "pending",
      agreement: "pending",
    },
    {
      id: 3,
      name: "AMRUTA",
      initials: "AM",
      title: "Test Survey 6",
      survey: "pending",
      document: "pending",
      receiving: "pending",
      agreement: "pending",
    },
    {
      id: 4,
      name: "Test1",
      initials: "T1",
      title: "Test Survey 6",
      survey: "completed",
      document: "completed",
      receiving: "pending",
      agreement: "pending",
    },
    {
      id: 5,
      name: "Test2",
      initials: "T2",
      title: "Test Survey 6",
      survey: "pending",
      document: "pending",
      receiving: "pending",
      agreement: "pending",
    },
    {
      id: 6,
      name: "Test3",
      initials: "T3",
      title: "Test Survey 6",
      survey: "pending",
      document: "pending",
      receiving: "pending",
      agreement: "pending",
    },
    {
      id: 7,
      name: "Vishal Gupta Test",
      initials: "VG",
      title: "ENLITE Survey",
      survey: "pending",
      document: "pending",
      receiving: "pending",
      agreement: "pending",
    },
  ];

  const filtered = doctorsData.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );



  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(145deg, #f8fafc 0%, #eef1f5 40%, #f0f2f7 100%)",
      }}
    >
      {/* Background Layer with Medical Image */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* Medical photo */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1px) saturate(0.7)",
            animation: "slowDrift 28s ease-in-out infinite",
          }}
        />
        
        {/* Gradient overlays */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(248,250,252,0.7) 0%, rgba(240,242,247,0.85) 100%)",
          }}
        />

        {/* Decorative orbs */}
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            right: "-8%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-12%",
            left: "-6%",
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244,163,0,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </Box>


      {/* ── Hero Section ── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          pt: 5,
          pb: 2,
          px: 4,
          animation: mounted ? "fadeInUp 0.5s ease forwards" : "none",
          opacity: mounted ? 1 : 0,
        }}
      >
        {/* ── Tab Buttons ── */}
        <TabNavigation />
      </Box>

      {/* ── Main Content ── */}
      <Container maxWidth="xl" sx={{ pb: 8, position: "relative", zIndex: 5 }}>
        {/* ── Header Card ── */}
        <Paper
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.7)",
          }}
        >
          {/* Card Top Bar */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
              px: 4,
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "1.45rem",
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-0.01em",
                }}
              >
                Select Doctor
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                  mt: 0.3,
                }}
              >
                Manage non survey status and documents
              </Typography>
            </Box>

            {/* Search + Filter Row */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // 👈 responsive
                gap: 1.5,
                alignItems: { xs: "stretch", sm: "center" }, // 👈 important
                width: "100%",
                maxWidth: 640,
              }}
            >
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <Select
                  displayEmpty
                  value={selectedActivity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    borderRadius: 2,
                    fontSize: "0.85rem",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.6)" },
                    "& .MuiSelect-select": { py: 1.1 },
                  }}
                >
                  <MenuItem value="">Select Activity</MenuItem>
                  <MenuItem value="mc2025">Medical Conference 2025</MenuItem>
                  <MenuItem value="hws">Health Workshop Series</MenuItem>
                  <MenuItem value="cme">CME Program 2025</MenuItem>
                </Select>
              </FormControl>

              <TextField
                size="small"
                placeholder="Search for names..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    color: "white",
                    fontSize: "0.85rem",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#00C853" },
                  },
                  "& input::placeholder": {
                    color: "rgba(255,255,255,0.4)",
                    opacity: 1,
                  },
                }}
              />

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#00C853",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  px: 3,
                  py: 1.1,
                  borderRadius: 2,
                  textTransform: "none",
                  flexShrink: 0,
                  boxShadow: "0 4px 14px rgba(0,200,83,0.35)",
                  "&:hover": {
                    bgcolor: "#00A844",
                    boxShadow: "0 6px 20px rgba(0,200,83,0.45)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Search
              </Button>
            </Box>
          </Box>

          {/* ── Table ── */}
          <TableContainer sx={{ bgcolor: "white" }}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background:
                      "linear-gradient(90deg, #E53935 0%, #C62828 100%)",
                  }}
                >
                  {[
                    { label: "Doctor Name", align: "center" },
                    { label: "Activity Name", align: "center" },
                    { label: "Agreement", align: "center" },
                    { label: "FMV", align: "center" },
                    { label: "Receiving", align: "center" },
                    { label: "Invite by Link", align: "center" },
                    { label: "Approval Status", align: "center" },
                  ].map((col) => (
                    <TableCell
                      key={col.label}
                      align={col.align}
                      sx={{
                        color: "rgba(255,255,255,0.95)",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        py: 2,
                        whiteSpace: "nowrap",
                        borderBottom: "none",
                      }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((doc, idx) => (
                    <TableRow
                      key={doc.id}
                      className="survey-row"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                      sx={{
                        bgcolor: idx % 2 === 0 ? "#ffffff" : "#fafbfd",
                        borderBottom: "1px solid #f1f5f9",
                        transition:
                          "background 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          bgcolor: "rgba(229,57,53,0.03)",
                          boxShadow: "inset 3px 0 0 #E53935",
                        },
                        "&:last-child td": { border: 0 },
                      }}
                    >
                      {/* Doctor Name */}
                      <TableCell sx={{ py: 2.2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.8,
                            justifyContent: "center",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.88rem",
                                color: "#1E293B",
                                lineHeight: 1.2,
                              }}
                            >
                              {doc.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Activity */}
                      <TableCell align="center" sx={{ py: 2.2 }}>
                        <Chip
                          label={doc.title}
                          size="small"
                          sx={{
                            bgcolor: "rgba(229,57,53,0.08)",
                            color: "#C62828",
                            fontWeight: 600,
                            fontSize: "0.72rem",
                            border: "1px solid rgba(229,57,53,0.2)",
                            borderRadius: "6px",
                            height: 24,
                          }}
                        />
                      </TableCell>

                      {/* Survey */}
                      <TableCell align="center" sx={{ py: 2.2 }}>
                        <StatusBadge status={doc.survey} />
                      </TableCell>

                      {/* Document */}
                      <TableCell align="center" sx={{ py: 2.2 }}>
                        <StatusBadge status={doc.document} />
                      </TableCell>

                      {/* FMV */}
                      <TableCell align="center" sx={{ py: 2.2 }}>
                        <StatusBadge status="pending" />
                      </TableCell>

                      {/* Invite by Link */}
                      <TableCell align="center" sx={{ py: 2.2 }}>
                        <Tooltip title="Send Invite Link" arrow>
                          <Box
                            className="icon-btn-hover"
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              bgcolor: "rgba(229,57,53,0.08)",
                              border: "1.5px solid rgba(229,57,53,0.2)",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: "rgba(229,57,53,0.15)",
                                borderColor: "#E53935",
                              },
                            }}
                          >
                            <EmailIcon
                              sx={{ color: "#E53935", fontSize: 17 }}
                            />
                          </Box>
                        </Tooltip>
                      </TableCell>

                      {/* Agreement */}
                      <TableCell align="center" sx={{ py: 2.2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                          }}
                        >
                          <Tooltip title="View Agreement" arrow>
                            <Box
                              className="icon-btn-hover"
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                bgcolor: "rgba(229,57,53,0.08)",
                                border: "1.5px solid rgba(229,57,53,0.2)",
                                cursor: "pointer",
                                "&:hover": {
                                  bgcolor: "rgba(229,57,53,0.15)",
                                  borderColor: "#E53935",
                                },
                              }}
                            >
                              <DescriptionIcon
                                sx={{ color: "#E53935", fontSize: 17 }}
                              />
                            </Box>
                          </Tooltip>
                          <Tooltip title="Download Agreement" arrow>
                            <Box
                              className="icon-btn-hover"
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                bgcolor: "rgba(255,179,0,0.08)",
                                border: "1.5px solid rgba(255,179,0,0.25)",
                                cursor: "pointer",
                                "&:hover": {
                                  bgcolor: "rgba(255,179,0,0.18)",
                                  borderColor: "#FFB300",
                                },
                              }}
                            >
                              <DownloadIcon
                                sx={{ color: "#FFB300", fontSize: 17 }}
                              />
                            </Box>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                      <HospitalIcon
                        sx={{ fontSize: 48, color: "#E2E8F0", mb: 2 }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ color: "#94A3B8", fontWeight: 600 }}
                      >
                        No doctors found
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#CBD5E1", mt: 0.5 }}
                      >
                        Try adjusting your search or filter criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ── Footer ── */}
          <Box
            sx={{
              px: 4,
              py: 2,
              bgcolor: "#f8fafc",
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 500 }}
            >
              Showing{" "}
              <strong style={{ color: "#475569" }}>{filtered.length}</strong> of{" "}
              <strong style={{ color: "#475569" }}>{doctorsData.length}</strong>{" "}
              HCPs
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#00C853",
                  }}
                />
                <Typography sx={{ fontSize: "0.72rem", color: "#64748B" }}>
                  Completed
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#FFB300",
                  }}
                />
                <Typography sx={{ fontSize: "0.72rem", color: "#64748B" }}>
                  Pending
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MSANonSurveyPage;
