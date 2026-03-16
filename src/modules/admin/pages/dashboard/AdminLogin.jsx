import { Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import DivisionSection from "../sector/DivisionSection";
import { adminApi } from "../../api";
import { AllLoader } from "../../../../shared/components/SkeletonLoader";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [divisionCategories, setDivisionCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const TYPE_LABELS = {
      0: "Medical",
      1: "Marketing",
      2: "Admin",
      3: "Admin",
      4: "Admin",
    };

    const fetchDivisions = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await adminApi.getDivisions();
        const divisions = Array.isArray(data?.divisions) ? data.divisions : [];

        const grouped = {};

        divisions.forEach((division) => {
          const type = Number(division.type);
          const title = TYPE_LABELS[type] || "Other";

          if (!grouped[title]) {
            grouped[title] = [];
          }

          grouped[title].push({
            ...division,
            id: division.division_id,
            name: division.name,
          });
        });

        setDivisionCategories(grouped);
      } catch (err) {
        setError(err.message || "Failed to load divisions");
      } finally {
        setLoading(false);
      }
    };

    fetchDivisions();
  }, []);

  const handleDivisionSelect = (division) => {
    // Map numeric type to category key
    let category = "MEDICAL";

    switch (Number(division.type)) {
      case 1:
        category = "MARKETING";
        break;
      case 2:
        category = "FINANCE";
        break;
      case 3:
        category = "REVIEW";
        break;
      case 4:
        category = "SUPER_ADMIN";
        break;
      default:
        category = "MEDICAL";
    }

    const divisionData = {
      ...division,
      category,
    };

    localStorage.setItem("division", JSON.stringify(divisionData));
    // notify whole app (same tab)
    window.dispatchEvent(new Event("divisionChanged"));
    navigate("/admin/dashboard");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
        {error && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "50vh",
            }}
          >
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Header */}
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6 }, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            fontWeight={700}
            sx={{ 
              mb: 1.5,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              background: 'linear-gradient(135deg, #F4A300 0%, #D88F00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Select Your Division
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.125rem' } }}>
            Choose a division to access your personalized dashboard
          </Typography>
        </Box>

        {/* Division Sections */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "50vh",
            }}
          >
            <AllLoader />
          </Box>
        ) : (
          Object.entries(divisionCategories).map(([category, list]) => (
            <DivisionSection
              key={category}
              title={category}
              divisions={list}
              onSelect={handleDivisionSelect}
            />
          ))
        )}
      </Container>
    </Box>
  );
}
