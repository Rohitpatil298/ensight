import { useState } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Container, 
  TextField,
  CircularProgress,
} from '@mui/material';
import { Header } from '../layout/Header';
import { useNavigate } from 'react-router-dom';
import { OTP_MOBILE_STORAGE_KEY } from '../api';

const ParticipantsAccountDetails = () => {
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  
  const [formData, setFormData] = useState({
    doctorName: '',
    mobileNumber: '',
    email: '',
    address: '',
    panCardNumber: '',
  });

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAgree = async () => {
    setIsSending(true);
    try {
      window.localStorage.setItem(OTP_MOBILE_STORAGE_KEY, formData.mobileNumber);
      navigate('/users/survey/otp-validation');
    } catch (error) {
      console.error('Failed to store mobile number for OTP flow:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleDisagree = () => {
    console.log("Disagreed");
    // Go back or handle disagreement
    navigate(-1);
  };

  // Check if all required fields are filled
  const isFormValid = 
    formData.doctorName !== '' &&
    formData.mobileNumber !== '' &&
    formData.email !== '' &&
    formData.address !== '' &&
    formData.panCardNumber !== '';

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
      {/* Background Layer with Medical Image */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Medical photo */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px) saturate(0.7)',
            animation: 'slowDrift 28s ease-in-out infinite',
          }}
        />
        
        {/* Gradient overlays */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(248,250,252,0.7) 0%, rgba(240,242,247,0.85) 100%)',
          }}
        />

        {/* Decorative orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            right: '-8%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-12%',
            left: '-6%',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,83,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Header */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 5, py: 6 }}>
        <Box>
          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: '#64748b',
              mb: 4,
              letterSpacing: '0.02em',
            }}
          >
            Participant's Accounting Details
          </Typography>

          {/* Password Form Container */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 10px 60px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.9)',
              p: 5,
            }}
          >
            <Typography
              variant="body1"
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                fontSize: '1.1rem',
                color: '#475569'
              }}
            >
              I hereby confirm that the below-mentioned details are correct.
            </Typography>

            {/* Form Fields */}
            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              {/* Doctor Name */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: '#334155',
                    fontSize: '0.95rem',
                  }}
                >
                  Dr. Name (Name required in Cheque): <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter doctor name"
                  value={formData.doctorName}
                  onChange={handleInputChange('doctorName')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: '#f8fafc',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
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

              {/* Mobile Number */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: '#334155',
                    fontSize: '0.95rem',
                  }}
                >
                  Mobile Number <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter mobile number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange('mobileNumber')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: '#f8fafc',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
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

              {/* Email */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: '#334155',
                    fontSize: '0.95rem',
                  }}
                >
                  Email <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: '#f8fafc',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
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

              {/* Address/City */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: '#334155',
                    fontSize: '0.95rem',
                  }}
                >
                  Address/City <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter address/city"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: '#f8fafc',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
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

              {/* Pan Card Number */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: '#334155',
                    fontSize: '0.95rem',
                  }}
                >
                  Pan Card Number
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter PAN card number"
                  value={formData.panCardNumber}
                  onChange={handleInputChange('panCardNumber')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: '#f8fafc',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
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

              {/* PAN Agreement Notice */}
              <Box 
                sx={{ 
                  mb: 4, 
                  p: 2.5,
                  bgcolor: '#fef2f2',
                  borderRadius: 2,
                  border: '1px solid #fecaca',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#991b1b',
                    fontSize: '0.95rem',
                    textAlign: 'center',
                    lineHeight: 1.6,
                  }}
                >
                <input type="checkbox"
                    checked={''}
                    onChange={(e) => {
                      if(e.target.checked) {
                        setFormData({ ...formData, panCardNumber: '' });
                      }
                    }}
                    style={{ marginRight: 8 }}
                  />
                  <span style={{ fontWeight: 600 }}>I do not</span> want to submit my PAN details & hereby agree to allow{' '}
                  <span style={{ fontWeight: 700 }}>20% deductions</span> on the payment of honorarium
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Button
                  onClick={handleDisagree}
                  sx={{
                    px: 6,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'white',
                    bgcolor: '#E53935',
                    borderRadius: 2,
                    textTransform: 'none',
                    minWidth: 180,
                    boxShadow: '0 4px 12px rgba(229,57,53,0.3)',
                    '&:hover': {
                      bgcolor: '#C62828',
                      boxShadow: '0 6px 16px rgba(229,57,53,0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  I do not agree
                </Button>

                <Button
                  onClick={handleAgree}
                  disabled={!isFormValid || isSending}
                  sx={{
                    px: 6,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'white',
                    bgcolor: '#00C853',
                    borderRadius: 2,
                    textTransform: 'none',
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
                  {isSending ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'I agree'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ParticipantsAccountDetails;