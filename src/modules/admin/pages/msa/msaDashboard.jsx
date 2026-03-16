import {
  Box,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  alpha,
} from "@mui/material";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PaymentIcon from "@mui/icons-material/Payment";
import { Add, FilterList, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../shared/components/PageHeader";
import StatsCard from "../../../../shared/components/StatsCard";
import { adminApi } from "../../api";

/* ---------------- Dashboard Component ---------------- */
export default function MsaDashboard() {
  const [financialYear, setFinancialYear] = useState(""); // year id
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalDoctorsSurveyCompleted: 0,
    totalDoctorsPaymentReceived: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await adminApi.getDashboardResponse();

        if (!response?.status) {
          throw new Error(response?.message || "Failed to load dashboard");
        }

        const data = response.data || {};

        const apiYears = Array.isArray(data.years) ? data.years : [];
        setYears(apiYears);

        const selectedYearId = data.selected_year ?? "";
        setFinancialYear(selectedYearId);

        setStats({
          totalDoctors: data.total_doctors ?? 0,
          totalDoctorsSurveyCompleted: data.total_doctors_survey_completed ?? 0,
          totalDoctorsPaymentReceived: data.total_doctors_payment_received ?? 0,
        });
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <Box sx={{ width: "100%", maxWidth: "1600px", mx: "auto" }}>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        subtitle="dashboard & statistics"
        actions={
          <>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Add sx={{ display: { xs: "none", sm: "inline" } }} />}
              sx={{
                borderRadius: 2.5,
                px: { xs: 2, sm: 3 },
                py: 1.25,
                fontWeight: 600,
                fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                boxShadow: "0 4px 14px rgba(229,57,53,0.3)",
                "&:hover": { boxShadow: "0 6px 20px rgba(229,57,53,0.4)" },
              }}
              onClick={() => navigate("/MSA/admin/welcome/dashboard")}
            >
              Ongoing MSA
            </Button>
          </>
        }
      />

      {/* Filter Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <FormControl sx={{ minWidth: { xs: "100%", sm: 320 }, flex: 1 }}>
            <InputLabel>Financial Year</InputLabel>
            <Select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              label="Financial Year"
            >
              <MenuItem value="">Select Financial Year</MenuItem>
              {years.map((y) => (
                <MenuItem key={y.id} value={y.id}>
                  {y.years}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<FilterList />}
            sx={{
              borderRadius: 2.5,
              px: { xs: 3, sm: 4 },
              py: 1.75,
              fontWeight: 600,
              flex: { xs: 1, sm: "initial" },
            }}
          >
            Search
          </Button>

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            sx={{
              borderRadius: 2.5,
              px: { xs: 3, sm: 4 },
              py: 1.75,
              fontWeight: 600,
              flex: { xs: 1, sm: "initial" },
            }}
          >
            Reset
          </Button>
        </Box>
      </Paper>

      {/* Stats Cards Grid */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {/* Doctors */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <StatsCard
            icon={<PersonIcon sx={{ fontSize: 32, color: "#fff" }} />}
            count={stats.totalDoctors}
            label="# Total MSA Doctors"
            gradient="linear-gradient(135deg, #FFF4E5 0%, #FFE0B2 100%)"
            iconBg="linear-gradient(135deg, #F4A300 0%, #D88F00 100%)"
          />
        </Box>

        {/* Survey Completed */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <StatsCard
            icon={
              <AssignmentTurnedInIcon sx={{ fontSize: 32, color: "#fff" }} />
            }
            count={stats.totalDoctorsSurveyCompleted}
            label="# No of MSA Signed"
            gradient="linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)"
            iconBg="linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)"
          />
        </Box>

        {/* Remuneration */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <StatsCard
            icon={<PaymentIcon sx={{ fontSize: 32, color: "#fff" }} />}
            count={stats.totalDoctorsPaymentReceived}
            label="# no of Doctors' Remuneration Received"
            gradient="linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)"
            iconBg="linear-gradient(135deg, #2196F3 0%, #1976D2 100%)"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          width: "100%",
          marginTop: 3,
          alignItems: "stretch",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <StatsCard
            icon={<PersonIcon sx={{ fontSize: 32, color: "#fff" }} />}
            count={stats.totalDoctors}
            label="# Total SOW Doctors"
            gradient="linear-gradient(135deg, #FFF4E5 0%, #FFE0B2 100%)"
            iconBg="linear-gradient(135deg, #F4A300 0%, #D88F00 100%)"
          />
        </Box>
        {/* Survey Completed */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <StatsCard
            icon={
              <AssignmentTurnedInIcon sx={{ fontSize: 32, color: "#fff" }} />
            }
            count={stats.totalDoctorsSurveyCompleted}
            label="# No of SOW Signed"
            gradient="linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)"
            iconBg="linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)"
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}></Box>
      </Box>
    </Box>
  );
}
