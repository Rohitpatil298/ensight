import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Container,
  Fade,
  alpha,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../layout/Header';

const CertifiedSelfEmployedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorData = location.state?.doctor;
  const [certified, setCertified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    // Proceed to survey
    navigate('/users/survey/participants-account-details', { state: { doctor: doctorData } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #f8fafc 0%, #eef1f5 40%, #f0f2f7 100%)',
      }}
    >
      {/* Background Layer */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px) saturate(0.7)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(248,250,252,0.75) 0%, rgba(240,242,247,0.9) 100%)',
          }}
        />
      </Box>

      {/* Header */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 5, py: 8 }}>
        <Fade in={mounted} timeout={600}>
          <Box>
            {/* Title */}
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                fontWeight: 600,
                color: '#64748b',
                mb: 5,
                letterSpacing: '0.02em',
              }}
            >
              Certified self employed
            </Typography>

            {/* Main Card */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 60px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.9)',
                p: 8,
                mb: 4,
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Certification Section */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 8,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    border: '3px solid',
                    borderColor: certified ? '#00C853' : '#e2e8f0',
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    bgcolor: certified ? alpha('#00C853', 0.05) : 'white',
                    maxWidth: 550,
                    width: '100%',
                    '&:hover': {
                      borderColor: certified ? '#00C853' : '#cbd5e1',
                      transform: 'scale(1.02)',
                      boxShadow: certified
                        ? '0 8px 24px rgba(0,200,83,0.2)'
                        : '0 4px 12px rgba(0,0,0,0.08)',
                    },
                  }}
                  onClick={() => setCertified(!certified)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: certified ? '#00C853' : '#e2e8f0',
                        color: 'white',
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {certified ? (
                        <CheckCircleIcon sx={{ fontSize: 36 }} />
                      ) : (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0.5,
                            border: '3px solid #94a3b8',
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: certified ? 600 : 500,
                        color: '#1E293B',
                        fontSize: '1.05rem',
                      }}
                    >
                      I certify I am exclusively self-employed
                    </Typography>
                  </Box>
                </Paper>
              </Box>

              {/* Info Box */}
              {certified && (
                <Fade in={certified} timeout={500}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 6,
                      bgcolor: alpha('#00C853', 0.08),
                      border: '2px solid',
                      borderColor: alpha('#00C853', 0.3),
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <VerifiedUserIcon sx={{ color: '#00C853', fontSize: 32 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#1E293B',
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    >
                      By certifying, you confirm that you are exclusively self-employed and not
                      affiliated with any healthcare institution.
                    </Typography>
                  </Paper>
                </Fade>
              )}

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <Button
                  onClick={handleBack}
                  sx={{
                    px: 6,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'white',
                    bgcolor: '#E53935',
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    minWidth: 160,
                    boxShadow: '0 4px 12px rgba(229,57,53,0.3)',
                    '&:hover': {
                      bgcolor: '#C62828',
                      boxShadow: '0 6px 16px rgba(229,57,53,0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Back
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={!certified}
                  sx={{
                    px: 6,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'white',
                    bgcolor: '#00C853',
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    minWidth: 160,
                    boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
                    '&:hover': {
                      bgcolor: '#00A844',
                      boxShadow: '0 6px 16px rgba(0,200,83,0.4)',
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                      bgcolor: '#cbd5e1',
                      color: '#94a3b8',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default CertifiedSelfEmployedPage;
