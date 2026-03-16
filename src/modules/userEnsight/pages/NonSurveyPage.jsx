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
  Email as EmailIcon,
  Description as DescriptionIcon,
  Download as DownloadIcon,
  LocalHospital as HospitalIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Header } from "../layout/Header";
import { Sidebar } from "../layout/Sidebar";
import { StatusBadge } from "../components/StatusBadge";
import { TabNavigation } from "../components/TabNavigation";
import { injectGlobalStyles } from "../../../shared/utils/injectGlobalStyles";

/* ─── Inject Global Styles ─────────────────────────────────────── */
injectGlobalStyles();

/* ─── Main Component ─────────────────────────────────────────── */
const NonSurveyPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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
  const agreementActionSx = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(145deg, #f8fafc 0%, #eef1f5 40%, #f0f2f7 100%)",
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
            backgroundImage:
              "url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)",
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
            background:
              "linear-gradient(180deg, rgba(248,250,252,0.7) 0%, rgba(240,242,247,0.85) 100%)",
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
            background:
              "radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)",
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
            background:
              "radial-gradient(circle, rgba(244,163,0,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

      {/* Header */}
      <Box sx={{ position: "relative", zIndex: 10 }}>
        <Header onMenuClick={handleDrawerToggle} />
      </Box>

      {/* ── Hero Section ── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          pt: 5,
          pb: 2,
          px: { xs: 2, sm: 4 },
          animation: mounted ? "fadeInUp 0.5s ease forwards" : "none",
          opacity: mounted ? 1 : 0,
        }}
      >
        {/* ── Tab Navigation ── */}
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
                flexDirection: { xs: "column", sm: "row" }, 
                gap: 1.5,
                alignItems: { xs: "stretch", sm: "center" }, 
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
                    { label: "Activity", align: "center" },
                    { label: "Survey", align: "center" },
                    { label: "Document", align: "center" },
                    { label: "FMV", align: "center" },
                    { label: "Receiving", align: "center" },
                    { label: "Invite by Link", align: "center" },
                    { label: "Agreement", align: "center" },
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

                      {/* Receiving */}
                      <TableCell align="center" sx={{ py: 2.2 }}>
                        <StatusBadge status={doc.receiving} />
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
                                ...agreementActionSx,
                                bgcolor: "rgba(255,179,0,0.08)",
                                border: "1.5px solid rgba(255,179,0,0.25)",
                                "&:hover": {
                                  bgcolor: "rgba(255,179,0,0.18)",
                                  borderColor: "#FFB300",
                                },
                              }}
                            >
                              <svg
                                fill="none"
                                className="csp-svg"
                                height="18"
                                viewBox="0 0 24 25"
                                width="18"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                              >
                                <g
                                  width="100%"
                                  height="100%"
                                  transform="matrix(1,0,0,1,0,0)"
                                >
                                  <g
                                    clipRule="evenodd"
                                    fill="rgb(0,0,0)"
                                    fillRule="evenodd"
                                  >
                                    <path
                                      d="m11.4428 1.5271h.1144c2.1907-.00001 3.9114-.00002 5.2548.18065 1.3767.18515 2.469.57232 3.3272 1.43077.8581.85843 1.2451 1.95094 1.4302 3.32796.1806 1.34379.1806 3.06497.1806 5.25632v.0572c0 .2665-.0006.5174-.0012.7016l-.0011.3021c-.0021.4142-.3395.7487-.7537.7466-.4142-.002-.7483-.3395-.7463-.7537l.0011-.2997c.0006-.1832.0012-.4325.0012-.6969 0-2.26103-.0016-3.8814-.1672-5.11371-.1628-1.21077-.4714-1.93402-1.0045-2.46727-.533-.53322-1.2559-.84188-2.4662-1.00465-1.2319-.16568-2.8517-.16727-5.1121-.16727-2.26038 0-3.88019.00159-5.11207.16727-1.21029.16277-1.93322.47143-2.46628 1.00465-.53308.53325-.8417 1.2565-1.00443 2.46727-.16563 1.23231-.16722 2.85268-.16722 5.11371 0 2.2611.00159 3.8815.16722 5.1138.16273 1.2107.47135 1.934 1.00443 2.4672.44894.4491 1.03011.7367 1.91628.914.90694.1813 2.07809.2369 3.66925.2521.41419.004.74672.343.74282.7572-.004.4142-.34298.7467-.75718.7428-1.58817-.0152-2.88809-.0691-3.94905-.2813-1.08172-.2163-1.96526-.6064-2.68294-1.3243-.85816-.8584-1.24516-1.9509-1.43024-3.3279-.18061-1.3438-.1806-3.065-.18059-5.2564v-.1143c-.00001-2.19144-.00002-3.91262.18059-5.25642.18508-1.37702.57208-2.46953 1.43024-3.32796.85819-.85845 1.95046-1.24562 3.32716-1.43077 1.34344-.18067 3.06413-.18066 5.25481-.18065z"
                                      fill="#6d7300"
                                      fillOpacity="1"
                                      data-original-color="#000000ff"
                                      stroke="none"
                                      strokeOpacity="1"
                                    ></path>
                                    <path
                                      d="m21 8.0271h-19v-1.5h19z"
                                      fill="#6d7300"
                                      fillOpacity="1"
                                      data-original-color="#000000ff"
                                      stroke="none"
                                      strokeOpacity="1"
                                    ></path>
                                    <path
                                      d="m5.25 12.2771c0-.4142.33579-.75.75-.75h1c.41421 0 .75.3358.75.75s-.33579.75-.75.75h-1c-.41421 0-.75-.3358-.75-.75zm4 0c0-.4142.33579-.75.75-.75h5c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-5c-.41421 0-.75-.3358-.75-.75zm-4 4c0-.4142.33579-.75.75-.75h1c.41421 0 .75.3358.75.75s-.33579.75-.75.75h-1c-.41421 0-.75-.3358-.75-.75z"
                                      fill="#6d7300"
                                      fillOpacity="1"
                                      data-original-color="#000000ff"
                                      stroke="none"
                                      strokeOpacity="1"
                                    ></path>
                                    <path
                                      d="m16 18.7771c0-.5523.4477-1 1-1h.009c.5523 0 1 .4477 1 1s-.4477 1-1 1h-.009c-.5523 0-1-.4477-1-1z"
                                      fill="#6d7300"
                                      fillOpacity="1"
                                      data-original-color="#000000ff"
                                      stroke="none"
                                      strokeOpacity="1"
                                    ></path>
                                    <path
                                      d="m14.4524 17.0204c-.7364.5749-1.2951 1.2678-1.6138 1.7147-.0109.0153-.0208.0292-.0299.042.0091.0128.019.0267.03.042.3186.4469.8773 1.1398 1.6137 1.7147.738.5762 1.6012.9933 2.5476.9933s1.8096-.4171 2.5476-.9933c.7364-.5749 1.2951-1.2678 1.6138-1.7147.0109-.0153.0208-.0292.0299-.042-.0091-.0128-.019-.0267-.0299-.042-.3187-.4469-.8774-1.1398-1.6138-1.7147-.738-.5762-1.6012-.9933-2.5476-.9933s-1.8096.4171-2.5476.9933zm-.923-1.1824c.8911-.6957 2.0723-1.3109 3.4706-1.3109s2.5795.6152 3.4706 1.3109c.8926.6969 1.5477 1.5152 1.912 2.0261.009.0126.0189.0262.0295.0408.1218.167.3379.4636.3379.8722s-.2161.7052-.3379.8722c-.0106.0146-.0205.0282-.0295.0408-.3643.5109-1.0194 1.3292-1.912 2.0261-.8911.6957-2.0723 1.3109-3.4706 1.3109s-2.5795-.6152-3.4706-1.3109c-.8926-.6969-1.5477-1.5152-1.912-2.0261-.009-.0126-.0189-.0262-.0295-.0408-.1218-.167-.3379-.4636-.3379-.8722s.2161-.7052.3379-.8722c.0106-.0146.0205-.0282.0295-.0408.3643-.5109 1.0194-1.3292 1.912-2.0261z"
                                      fill="#6d7300"
                                      fillOpacity="1"
                                      data-original-color="#000000ff"
                                      stroke="none"
                                      strokeOpacity="1"
                                    ></path>
                                  </g>
                                </g>
                              </svg>
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

export default NonSurveyPage;
