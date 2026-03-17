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
    Container,
    Tooltip,
    IconButton,
    } from "@mui/material";
    import {
    Search as SearchIcon,
    Description as DescriptionIcon,
    Download as DownloadIcon,
    LocalHospital as HospitalIcon,
    Add,
    } from "@mui/icons-material";
    import { useNavigate } from "react-router-dom";
    import { Header } from "../layout/Header";
    import { Sidebar } from "../layout/Sidebar";
    import { TabNavigation } from "../components/TabNavigation";
    import { injectGlobalStyles } from "../../../shared/utils/injectGlobalStyles";

    /* ─── Inject Global Styles ─────────────────────────────────────── */
    injectGlobalStyles();

    /* ─── Main Component ─────────────────────────────────────────── */
    const EnrollHCP = () => {
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
        uin: "GP1400F",
        name: "AMARTYA SHANKAR",
        title: "Test Survey 6",
        agreement: "pending",
        },
        {
        uin: "GP1401G",
        name: "AMARTYA SHANKAR CHOWDHURY",
        title: "Test Survey 6",
        agreement: "pending",
        },
        {
        uin: "GP1400H",
        name: "AMRUTA",
        title: "Test Survey 6",
        agreement: "pending",
        }
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
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 2,
                }}
            >

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

                <TextField
                fullWidth
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
                        { label: "Uin", align: "center" },
                        { label: "Name", align: "center" },
                        { label: "Title", align: "center" },
                        { label: "Status", align: "center" },
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
                                {doc.uin}
                                </Typography>
                            </Box>
                            </Box>
                        </TableCell>

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
                                {doc.title}
                                </Typography>
                            </Box>
                            </Box>
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
        <Box sx={{ position: "fixed", zIndex: 5, bottom: 16, right: 16 }}>
            <Tooltip title="Add New HCP" arrow>
            <IconButton
                sx={{
                background: "linear-gradient(90deg, #E53935 0%, #C62828 100%)",
                color: "white",
                width: 56,
                height: 56,
                borderRadius: "50%",
                boxShadow: "0 4px 14px rgba(229,57,53,0.35)",
                "&:hover": { background: "linear-gradient(90deg, #C62828 0%, #E53935 100%)" },
                transition: "all 0.2s",
                }}
                onClick={()=>navigate('/users/add_user_doctor')}
            >
                <Add />
            </IconButton>
            </Tooltip>
        </Box>
        </Box>
    );
    };
  

    export default EnrollHCP;
