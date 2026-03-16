import { useState } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Container, 
  TextField,
  InputAdornment,
  IconButton 
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Close as CloseIcon,
  Check as CheckIcon 
} from '@mui/icons-material';

const MsaChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation states
  const [validations, setValidations] = useState({
    hasMinLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
  });

  // Handle new password change and validation
  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    // Update validations
    setValidations({
      hasMinLength: value.length >= 8,
      hasLowercase: /[a-z]/.test(value),
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
    });
  };

  // Check if passwords match
  const passwordsMatch = confirmPassword !== '' && newPassword === confirmPassword;

  // Check if form is valid
  const isFormValid = 
    currentPassword !== '' &&
    validations.hasMinLength &&
    validations.hasLowercase &&
    validations.hasUppercase &&
    validations.hasNumber &&
    passwordsMatch;

  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Password change submitted");
      // Add your password change logic here
    }
  };

  const ValidationItem = ({ isValid, text }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
      {isValid ? (
        <CheckIcon sx={{ color: '#00C853', fontSize: 18 }} />
      ) : (
        <CloseIcon sx={{ color: '#E53935', fontSize: 18 }} />
      )}
      <Typography
        variant="body2"
        sx={{
          color: isValid ? '#00C853' : '#E53935',
          fontSize: '0.9rem',
        }}
      >
        {text}
      </Typography>
    </Box>
  );

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
            Change Password
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
              Choose a password that you haven't already used with this account.
            </Typography>

            {/* Form Fields */}
            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              {/* Current Password */}
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
                  Current Password <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          edge="end"
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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

              {/* New Password */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: '#334155',
                    fontSize: '0.95rem',
                  }}
                >
                  New Password <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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

                {/* Validation Indicators */}
                {newPassword && (
                  <Box sx={{ mt: 2, ml: 1 }}>
                    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      <Box>
                        <ValidationItem 
                          isValid={validations.hasMinLength} 
                          text="8 Characters Long" 
                        />
                        <ValidationItem 
                          isValid={validations.hasUppercase} 
                          text="One Uppercase Letter" 
                        />
                      </Box>
                      <Box>
                        <ValidationItem 
                          isValid={validations.hasLowercase} 
                          text="One Lowercase Letter" 
                        />
                        <ValidationItem 
                          isValid={validations.hasNumber} 
                          text="One Number" 
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Confirm Password */}
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
                  Confirm Password <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Enter confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <Box sx={{ mt: 2, ml: 1 }}>
                    <ValidationItem 
                      isValid={passwordsMatch} 
                      text="Passwords Match" 
                    />
                  </Box>
                )}
              </Box>

              {/* Submit Button */}
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  sx={{
                    px: 8,
                    py: 1.5,
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    bgcolor: '#00C853',
                    color: 'white',
                    borderRadius: 2,
                    minWidth: 200,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
                    '&:hover': {
                      bgcolor: '#00A844',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(0,200,83,0.4)',
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
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default MsaChangePassword;