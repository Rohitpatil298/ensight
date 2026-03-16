import { Box, Typography, Button, Container } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Box
          sx={{
            mb: 4,
            fontSize: '10rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #F4A300 0%, #E53935 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
          }}
        >
          404
        </Box>
        
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
          The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate('/admin/dashboard')}
            sx={{ borderRadius: 2.5, px: 3, py: 1.25 }}
          >
            Go Home
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ borderRadius: 2.5, px: 3, py: 1.25 }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
