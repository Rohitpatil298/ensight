import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Switch,
  FormControl,
  FormLabel,
  Paper,
  Typography,
  Stack,
} from '@mui/material';


export default function AddDivision() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    sector: '',
    name: '',
    claimsName: '',
    isActive: true,
    type: 'medical',
    userType: 'ensight',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    setLoading(true);
    try {
      // API call would go here
      console.log('Form data:', formData);
      // await adminApi.createUser(formData);
      // navigate('/admin/users');
      alert('Admin user added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to add admin user. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          OTP Platform change
    <span style={{ color: '#dc3545' }}> listing</span>
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>


          {/* Switch Platform */}
          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset">
              <FormLabel
                sx={{
                  mb: 1.5,
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '&.Mui-focused': {
                    color: 'text.primary',
                  },
                }}
              >
                Switch Platform
              </FormLabel>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: !formData.isActive ? 600 : 400,
                    color: !formData.isActive ? 'error.main' : 'text.secondary',
                  }}
                >
                  SMS
                </Typography>
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => handleChange({ target: { name: 'isActive', value: e.target.checked } })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: 'success.main',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: 'success.main',
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: formData.isActive ? 600 : 400,
                    color: formData.isActive ? 'success.main' : 'text.secondary',
                  }}
                >
                  WHATSAPP
                </Typography>
              </Stack>
            </FormControl>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}