import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import {
  Add,
  DescriptionOutlined,
  DownloadRounded,
  EditOutlined,
  ExpandLess,
  ExpandMore,
  FilterList,
  InsightsOutlined,
} from "@mui/icons-material";

const FINANCIAL_YEARS = ["2023-2024", "2024-2025", "2025-2026"];

const INITIAL_ACTIVITIES = [
  {
    id: 95,
    shortTitle: "Test Master Activity 25-26",
    description: "Test",
    status: "Sales",
    totalDoctors: 0,
    done: 0,
    pending: 0,
    honorariumLimit: 300000,
    honorariumAmount1: 200000,
    honorariumAmount2: 150000,
    honorariumAmount3: 100000,
    honorariumAmount4: 0,
    honorariumAmount5: 0,
    createdDate: "21 Feb, 2026 5:48 PM",
    financialYear: "2025-2026",
    agreementType: "Master Service Agreement",
  },
  {
    id: 93,
    shortTitle: "Metraize MSA 2025-26",
    description: "Master Service Agreement Metraize Division",
    status: "Sales",
    totalDoctors: 3,
    done: 3,
    pending: 0,
    honorariumLimit: 300000,
    honorariumAmount1: 200000,
    honorariumAmount2: 150000,
    honorariumAmount3: 100000,
    honorariumAmount4: 75000,
    honorariumAmount5: 50000,
    createdDate: "19 Feb, 2026 11:12 AM",
    financialYear: "2025-2026",
    agreementType: "Master Service Agreement",
  },
  {
    id: 88,
    shortTitle: "Dummy",
    description: "Test",
    status: "Sales",
    totalDoctors: 3,
    done: 2,
    pending: 1,
    honorariumLimit: 300000,
    honorariumAmount1: 0,
    honorariumAmount2: 0,
    honorariumAmount3: 0,
    honorariumAmount4: 0,
    honorariumAmount5: 0,
    createdDate: "16 Feb, 2026 2:04 PM",
    financialYear: "2025-2026",
    agreementType: "Master Service Agreement",
  },
  {
    id: 87,
    shortTitle: "DiaCare Master 25-26",
    description: "MSA Non Editable",
    status: "Completed-Archived",
    totalDoctors: 4,
    done: 3,
    pending: 1,
    honorariumLimit: 300000,
    honorariumAmount1: 200000,
    honorariumAmount2: 150000,
    honorariumAmount3: 100000,
    honorariumAmount4: 50000,
    honorariumAmount5: 25000,
    createdDate: "11 Feb, 2026 9:40 AM",
    financialYear: "2025-2026",
    agreementType: "Master Service Agreement",
  },
  {
    id: 85,
    shortTitle: "MSA 2025-26",
    description: "New Agreement",
    status: "Completed-Archived",
    totalDoctors: 0,
    done: 0,
    pending: 0,
    honorariumLimit: 300000,
    honorariumAmount1: 200000,
    honorariumAmount2: 150000,
    honorariumAmount3: 0,
    honorariumAmount4: 0,
    honorariumAmount5: 0,
    createdDate: "04 Feb, 2026 12:10 PM",
    financialYear: "2025-2026",
    agreementType: "Master Service Agreement",
  },
  {
    id: 83,
    shortTitle: "Test MSA 2025-26",
    description: "Test",
    status: "Sales",
    totalDoctors: 3,
    done: 2,
    pending: 1,
    honorariumLimit: 300000,
    honorariumAmount1: 0,
    honorariumAmount2: 150000,
    honorariumAmount3: 0,
    honorariumAmount4: 0,
    honorariumAmount5: 0,
    createdDate: "02 Feb, 2026 7:35 PM",
    financialYear: "2025-2026",
    agreementType: "Master Service Agreement",
  },
];

const STATUS_OPTIONS = ["", "Sales", "Completed-Archived"];

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-IN");
}

function getStatusStyles(status) {
  if (status === "Completed-Archived") {
    return {
      color: "#FFFFFF",
      bgcolor: "secondary.main",
    };
  }

  if (status === "Sales") {
    return {
      color: "#7A5800",
      bgcolor: alpha("#F4A300", 0.16),
    };
  }

  return {
    color: "text.secondary",
    bgcolor: "grey.100",
  };
}

function ActionChipButton({ children, icon, color = "primary", onClick }) {
  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={icon}
      onClick={onClick}
      color={color}
      sx={{
        justifyContent: "flex-start",
        borderRadius: 2,
        px: 1.25,
        py: 0.5,
        minWidth: 168,
        fontSize: "0.72rem",
        fontWeight: 700,
        textTransform: "none",
        borderWidth: 1,
        boxShadow: "none",
        "&:hover": {
          borderWidth: 1,
          transform: "translateY(-1px)",
        },
      }}
    >
      {children}
    </Button>
  );
}

function MsaActivityRow({ activity, isOpen, onToggle }) {
  return (
    <>
      <TableRow
        hover
        className="survey-row"
        sx={{
          "& td": {
            borderBottom: isOpen ? "none" : "1px solid",
            borderColor: "divider",
            verticalAlign: "top",
          },
          "&:hover": {
            bgcolor: alpha("#F4A300", 0.025),
          },
        }}
      >
        <TableCell sx={{ width: 58, py: 1.5 }}>
          <IconButton
            size="small"
            onClick={onToggle}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              bgcolor: isOpen ? alpha("#F4A300", 0.08) : "transparent",
            }}
          >
            {isOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </IconButton>
        </TableCell>

        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
          {activity.id}
        </TableCell>

        <TableCell sx={{ minWidth: 190 }}>
          <Stack spacing={1}>
            <ActionChipButton icon={<EditOutlined sx={{ fontSize: 14 }} />}>
              Edit Status
            </ActionChipButton>
            <ActionChipButton
              icon={<InsightsOutlined sx={{ fontSize: 14 }} />}
              color="success"
            >
              Activity Responses
            </ActionChipButton>
            <ActionChipButton
              icon={<DescriptionOutlined sx={{ fontSize: 14 }} />}
              color="warning"
            >
              Agreement Download
            </ActionChipButton>
          </Stack>
        </TableCell>

        <TableCell sx={{ minWidth: 150, fontWeight: 700 }}>
          {activity.shortTitle}
        </TableCell>
        <TableCell sx={{ minWidth: 190, color: "text.secondary" }}>
          {activity.description}
        </TableCell>
        <TableCell>
          <Chip
            label={activity.status}
            size="small"
            sx={{
              fontWeight: 700,
              borderRadius: 2,
              ...getStatusStyles(activity.status),
            }}
          />
        </TableCell>
        <TableCell align="center">{activity.totalDoctors}</TableCell>
        <TableCell align="center">{activity.done}</TableCell>
        <TableCell align="center">{activity.pending}</TableCell>
        <TableCell align="right" sx={{ fontFamily: "monospace" }}>
          {formatNumber(activity.honorariumLimit)}
        </TableCell>
        <TableCell align="right" sx={{ fontFamily: "monospace" }}>
          {formatNumber(activity.honorariumAmount1)}
        </TableCell>
        <TableCell align="right" sx={{ fontFamily: "monospace" }}>
          {formatNumber(activity.honorariumAmount2)}
        </TableCell>
        <TableCell align="right" sx={{ fontFamily: "monospace" }}>
          {formatNumber(activity.honorariumAmount3)}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ p: 0, border: "none" }} colSpan={13}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box
              sx={{
                px: { xs: 2, md: 3 },
                py: 2.5,
                borderTop: "1px dashed",
                borderColor: alpha("#F4A300", 0.32),
                bgcolor: alpha("#F4A300", 0.035),
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2.5}
                justifyContent="space-between"
              >
                <Stack spacing={0.75}>
                  <Typography variant="caption" fontWeight={800} color="text.secondary">
                    Honorarium Amount 4
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {formatNumber(activity.honorariumAmount4)}
                  </Typography>
                  <Typography variant="caption" fontWeight={800} color="text.secondary">
                    Honorarium Amount 5
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {formatNumber(activity.honorariumAmount5)}
                  </Typography>
                </Stack>

                <Stack spacing={0.75} sx={{ minWidth: { md: 280 } }}>
                  <Typography variant="caption" fontWeight={800} color="text.secondary">
                    Agreement Type
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {activity.agreementType}
                  </Typography>
                  <Typography variant="caption" fontWeight={800} color="text.secondary">
                    Created Date
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.createdDate}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const MSAView = () => {
  const [selectedYear, setSelectedYear] = useState("2025-2026");
  const [shortTitleFilter, setShortTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [openRowId, setOpenRowId] = useState(95);

  const filteredActivities = INITIAL_ACTIVITIES.filter((activity) => {
    const matchesYear = selectedYear ? activity.financialYear === selectedYear : true;
    const matchesShortTitle = shortTitleFilter
      ? activity.shortTitle.toLowerCase().includes(shortTitleFilter.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? activity.status === statusFilter : true;

    return matchesYear && matchesShortTitle && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages - 1);
  const paginatedActivities = filteredActivities.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );
  const startEntry = filteredActivities.length === 0 ? 0 : currentPage * rowsPerPage + 1;
  const endEntry = Math.min(filteredActivities.length, (currentPage + 1) * rowsPerPage);

  const handleResetFilters = () => {
    setSelectedYear("2025-2026");
    setShortTitleFilter("");
    setStatusFilter("");
    setPage(0);
  };

  const handleExportCsv = () => {
    const headers = [
      "MSA Activity ID",
      "Activity Short Title",
      "Description",
      "Status",
      "Total Doctors",
      "Done",
      "Pending",
      "Honorarium Limit",
      "Honorarium Amount 1",
      "Honorarium Amount 2",
      "Honorarium Amount 3",
      "Honorarium Amount 4",
      "Honorarium Amount 5",
      "Created Date",
    ];

    const rows = filteredActivities.map((activity) => [
      activity.id,
      activity.shortTitle,
      activity.description,
      activity.status,
      activity.totalDoctors,
      activity.done,
      activity.pending,
      activity.honorariumLimit,
      activity.honorariumAmount1,
      activity.honorariumAmount2,
      activity.honorariumAmount3,
      activity.honorariumAmount4,
      activity.honorariumAmount5,
      activity.createdDate,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "msa-activities.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1680px", mx: "auto" }}>
      <Box sx={{ mb: 3.5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "baseline",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          MSA Activity
          <Typography
            component="span"
            sx={{
              fontSize: "0.875rem",
              color: "secondary.main",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "lowercase",
            }}
          >
            listing
          </Typography>
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.96) 100%)",
        }}
      >
        <Stack spacing={2.5}>
          <FormControl sx={{ width: { xs: "100%", sm: 320 } }}>
            <InputLabel>Financial Year</InputLabel>
            <Select
              value={selectedYear}
              label="Financial Year"
              onChange={(event) => {
                setSelectedYear(event.target.value);
                setPage(0);
              }}
            >
              <MenuItem value="">Select Financial Year</MenuItem>
              {FINANCIAL_YEARS.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="contained"
              startIcon={<DownloadRounded />}
              onClick={handleExportCsv}
              sx={{
                alignSelf: { xs: "stretch", sm: "flex-start" },
                px: 2.5,
                py: 1.2,
                borderRadius: 2.5,
                fontWeight: 700,
                boxShadow: "0 10px 24px rgba(244,163,0,0.22)",
              }}
            >
              All MSA CSV
            </Button>

            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={handleResetFilters}
              sx={{
                alignSelf: { xs: "stretch", sm: "flex-start" },
                px: 2.5,
                py: 1.2,
                borderRadius: 2.5,
                fontWeight: 700,
              }}
            >
              Reset Filters
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            borderBottom: "1px solid",
            borderColor: "divider",
            background:
              "linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(255,255,255,1) 100%)",
          }}
        >
          <Stack spacing={2.5}>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Add />}
                sx={{
                  borderRadius: 2.5,
                  px: 2.5,
                  py: 1.1,
                  fontWeight: 700,
                  boxShadow: "0 10px 24px rgba(229,57,53,0.24)",
                }}
              >
                New Activity
              </Button>
            </Box>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Activity Short Title"
                value={shortTitleFilter}
                onChange={(event) => {
                  setShortTitleFilter(event.target.value);
                  setPage(0);
                }}
                fullWidth
              />

              <FormControl sx={{ minWidth: { md: 240 } }} fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setPage(0);
                  }}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status || "all"} value={status}>
                      {status || "Select..."}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Select
                size="small"
                value={rowsPerPage}
                onChange={(event) => {
                  setRowsPerPage(Number(event.target.value));
                  setPage(0);
                }}
                sx={{ minWidth: 84 }}
              >
                {[10, 25, 50].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="body2" color="text.secondary">
                entries per page
              </Typography>
            </Box>
          </Stack>
        </Box>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 1400 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha("#F4A300", 0.06) }}>
                <TableCell sx={{ width: 58 }} />
                {[
                  "MSA Activity ID",
                  "Actions",
                  "MSA Activity Short Title",
                  "MSA Description",
                  "Status",
                  "Total Doctors",
                  "Done",
                  "Pending",
                  "Honorarium Limit",
                  "Honorarium Amount 1",
                  "Honorarium Amount 2",
                  "Honorarium Amount 3",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.76rem",
                      color: "text.primary",
                      py: 1.75,
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedActivities.length > 0 ? (
                paginatedActivities.map((activity) => (
                  <MsaActivityRow
                    key={activity.id}
                    activity={activity}
                    isOpen={openRowId === activity.id}
                    onToggle={() =>
                      setOpenRowId((currentRowId) =>
                        currentRowId === activity.id ? null : activity.id,
                      )
                    }
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={13} sx={{ py: 10, textAlign: "center" }}>
                    <Typography variant="body1" color="text.secondary" fontWeight={600}>
                      No MSA activities match the current filters.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "grey.50",
          }}
        >
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Showing {startEntry} to {endEntry} of {filteredActivities.length} entries
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === 0}
              onClick={() => setPage((previousPage) => Math.max(previousPage - 1, 0))}
              sx={{ minWidth: 88, borderRadius: 2 }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              size="small"
              disableElevation
              sx={{ minWidth: 44, borderRadius: 2, px: 1.5 }}
            >
              {currentPage + 1}
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage >= totalPages - 1}
              onClick={() =>
                setPage((previousPage) => Math.min(previousPage + 1, totalPages - 1))
              }
              sx={{ minWidth: 72, borderRadius: 2 }}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default MSAView;