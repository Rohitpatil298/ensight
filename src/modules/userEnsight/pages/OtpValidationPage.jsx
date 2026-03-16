import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Container, 
  TextField,
  Fade,
  CircularProgress,
} from '@mui/material';
import { AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { Header } from '../layout/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { OTP_MOBILE_STORAGE_KEY, surveyApi } from '../api';

const OtpValidationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationMobileNumber = location.state?.mobileNumber || '';
  const [mobileNumber, setMobileNumber] = useState(
    () => locationMobileNumber || window.localStorage.getItem(OTP_MOBILE_STORAGE_KEY) || ''
  );
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!locationMobileNumber) {
      return;
    }

    window.localStorage.setItem(OTP_MOBILE_STORAGE_KEY, locationMobileNumber);
    setMobileNumber(locationMobileNumber);
  }, [locationMobileNumber]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  const handleResendOtp = async () => {
    if (!mobileNumber) {
      setError('Mobile number not found. Please restart the flow.');
      return;
    }

    setTimeLeft(30);
    setIsResendDisabled(true);
    setOtp('');
    setError('');
    try {
      await surveyApi.sendOtp(mobileNumber);
    } catch (err) {
      console.error('Failed to resend OTP:', err);
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 4) return;
    if (!mobileNumber) {
      setError('Mobile number not found. Please restart the flow.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      await surveyApi.verifyOtp(mobileNumber, otp);
      window.localStorage.removeItem(OTP_MOBILE_STORAGE_KEY);
      navigate('/users/survey/upload-documents');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      setOtp('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isSubmitDisabled = otp.length !== 4 || isSubmitting;

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
              Perception Study Survey Respondent Validation
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
              {/* OTP Input */}
              <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                {mobileNumber && (
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: '#475569', textAlign: 'center' }}
                  >
                    OTP sent to{' '}
                    <span style={{ fontWeight: 700, color: '#334155' }}>
                      +91-XXXXXX{mobileNumber.slice(-4)}
                    </span>
                  </Typography>
                )}
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1.5,
                    fontWeight: 600,
                    color: '#334155',
                    fontSize: '1rem',
                  }}
                >
                  Enter 4 Digit OTP <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter 4 digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  error={!!error}
                  helperText={error}
                  inputProps={{
                    maxLength: 4,
                    style: { 
                      textAlign: 'center', 
                      fontSize: '1.5rem',
                      letterSpacing: '0.5em',
                      fontWeight: 600,
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: '#f8fafc',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#cbd5e1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00C853',
                      },
                    },
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 3,
                  mb: 3,
                }}
              >
                <Button
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                  sx={{
                    px: 5,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'white',
                    bgcolor: '#6B7280',
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    minWidth: 180,
                    boxShadow: '0 4px 12px rgba(107,114,128,0.3)',
                    '&:hover': {
                      bgcolor: '#4B5563',
                      boxShadow: '0 6px 16px rgba(107,114,128,0.4)',
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                      bgcolor: '#cbd5e1',
                      color: '#94a3b8',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Resend OTP
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                  sx={{
                    px: 5,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'white',
                    bgcolor: '#00C853',
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    minWidth: 180,
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
                  {isSubmitting ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'Submit'}
                </Button>
              </Box>

              {/* Timer */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <AccessTimeIcon 
                  sx={{ 
                    color: timeLeft <= 10 ? '#E53935' : '#6B7280',
                    fontSize: 20,
                  }} 
                />
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: timeLeft <= 10 ? '#E53935' : '#6B7280',
                  }}
                >
                  {formatTime(timeLeft)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default OtpValidationPage;