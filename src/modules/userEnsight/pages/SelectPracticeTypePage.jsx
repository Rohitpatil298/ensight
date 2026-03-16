import React, { useState, useEffect } from 'react';
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
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../layout/Header';

const SelectPracticeTypePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorData = location.state?.doctor;
  
  const [selectedType, setSelectedType] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (selectedType === 'self-employed') {
      navigate('/users/survey/certified-self-employed', { state: { doctor: doctorData } });
    } else {
      navigate('/users/survey/take', { state: { doctor: doctorData } });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const practiceTypes = [
    {
      value: 'institute',
      label: 'An employee of an institute',
      icon: BusinessIcon,
    },
    {
      value: 'self-employed',
      label: 'Exclusively self-employed',
      icon: PersonIcon,
    },
  ];

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
            backgroundImage:
              'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)',
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
              Select your practice type
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
                p: 6,
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  fontWeight: 600,
                  color: '#1E293B',
                  mb: 6,
                }}
              >
                I am,
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
                {practiceTypes.map((type) => {
                  const isSelected = selectedType === type.value;
                  const Icon = type.icon;
                  
                  return (
                    <Paper
                      key={type.value}
                      elevation={0}
                      sx={{
                        border: '3px solid',
                        borderColor: isSelected ? '#00C853' : '#e2e8f0',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        bgcolor: isSelected ? alpha('#00C853', 0.05) : 'white',
                        '&:hover': {
                          borderColor: isSelected ? '#00C853' : '#cbd5e1',
                          transform: 'translateY(-2px)',
                          boxShadow: isSelected
                            ? '0 8px 24px rgba(0,200,83,0.15)'
                            : '0 4px 12px rgba(0,0,0,0.08)',
                        },
                      }}
                      onClick={() => setSelectedType(type.value)}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          width: '100%',
                          py: 2.5,
                          px: 3,
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: isSelected ? '#00C853' : '#e2e8f0',
                            color: isSelected ? 'white' : '#64748b',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {isSelected ? (
                            <CheckCircleIcon sx={{ fontSize: 32 }} />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 32 }} />
                          )}
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: isSelected ? 600 : 500,
                            color: '#1E293B',
                            fontSize: '1.05rem',
                            flex: 1,
                          }}
                        >
                          {type.label}
                        </Typography>
                      </Box>
                    </Paper>
                  );
                })}
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 3,
                  mt: 4,
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
                  onClick={handleNext}
                  disabled={!selectedType}
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
                  Next
                </Button>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default SelectPracticeTypePage;
