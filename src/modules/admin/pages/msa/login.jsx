import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import DivisionSection from "../sector/DivisionSection";

const STATIC_DIVISIONS = {
  Medical:   [{ id: 0, division_id: 0, name: "Diabities Care",   type: 0 }],
  Marketing: [{ id: 1, division_id: 1, name: "Diabities Care", type: 1 }],
  Admin:     [{ id: 4, division_id: 4, name: "Super Admin", type: 4 }],
};

const login = () => {
  const navigate = useNavigate();

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
    navigate("/MSA/admin/welcome/dashboard");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
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
        {Object.entries(STATIC_DIVISIONS).map(([category, list]) => (
          <DivisionSection
            key={category}
            title={category}
            divisions={list}
            onSelect={handleDivisionSelect}
          />
        ))}
      </Container>
    </Box>
  );
}

export default login