import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { LoadingButton } from '../../../../shared/components/LoadingButton';


export default function AddAdminUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    sector: '',
    name: '',
    claimsName: '',
    isActive: 'enabled',
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

  const validate = () => {
    const newErrors = {};
    
    if (!formData.sector) {
      newErrors.sector = 'Sector is required';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.claimsName.trim()) {
      newErrors.claimsName = 'Claims Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

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
          Add Admin User
       <Typography
            component="span"
            sx={{
              ml: 1,
              px: 1.5,
              py: 0.5,
              bgcolor: 'secondary.main',
              color: 'white',
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            form
          </Typography>
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
          {/* Sector */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth error={!!errors.sector}>
              <FormLabel
                required
                sx={{
                  mb: 1,
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                Sector
              </FormLabel>
              <Select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                displayEmpty
                sx={{
                  borderRadius: 2,
                }}
              >
                <MenuItem value="" disabled>
                  Select Sector
                </MenuItem>
                <MenuItem value="diabetes-care">Diabetes Care</MenuItem>
                <MenuItem value="cvn">CVN</MenuItem>
                <MenuItem value="respiratory">Respiratory</MenuItem>
              </Select>
              {errors.sector && (
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, ml: 1.75, color: 'error.main' }}
                >
                  {errors.sector}
                </Typography>
              )}
            </FormControl>
          </Box>

          {/* Name */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              required
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Name
            </FormLabel>
            <TextField
              fullWidth
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Claims Name */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              required
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Claims Name
            </FormLabel>
            <TextField
              fullWidth
              name="claimsName"
              placeholder="Enter Claims Name"
              value={formData.claimsName}
              onChange={handleChange}
              error={!!errors.claimsName}
              helperText={errors.claimsName}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Is Active */}
          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset">
              <FormLabel
                required
                sx={{
                  mb: 1,
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '&.Mui-focused': {
                    color: 'text.primary',
                  },
                }}
              >
                Is Active?
              </FormLabel>
              <RadioGroup
                row
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="enabled"
                  control={
                    <Radio
                      sx={{
                        color: 'success.main',
                        '&.Mui-checked': {
                          color: 'success.main',
                        },
                      }}
                    />
                  }
                  label="Enabled"
                />
                <FormControlLabel
                  value="disabled"
                  control={
                    <Radio
                      sx={{
                        color: 'error.main',
                        '&.Mui-checked': {
                          color: 'error.main',
                        },
                      }}
                    />
                  }
                  label="Disabled"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Type */}
          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset">
              <FormLabel
                required
                sx={{
                  mb: 1,
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '&.Mui-focused': {
                    color: 'text.primary',
                  },
                }}
              >
                Type
              </FormLabel>
              <RadioGroup
                row
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="medical"
                  control={
                    <Radio
                      sx={{
                        color: 'info.main',
                        '&.Mui-checked': {
                          color: 'info.main',
                        },
                      }}
                    />
                  }
                  label="Medical"
                />
                <FormControlLabel
                  value="marketing"
                  control={
                    <Radio
                      sx={{
                        color: 'error.main',
                        '&.Mui-checked': {
                          color: 'error.main',
                        },
                      }}
                    />
                  }
                  label="Marketing"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* User Type */}
          <Box sx={{ mb: 4 }}>
            <FormControl component="fieldset">
              <FormLabel
                required
                sx={{
                  mb: 1,
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '&.Mui-focused': {
                    color: 'text.primary',
                  },
                }}
              >
                User Type
              </FormLabel>
              <RadioGroup
                row
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="ensight"
                  control={
                    <Radio
                      sx={{
                        color: 'info.main',
                        '&.Mui-checked': {
                          color: 'info.main',
                        },
                      }}
                    />
                  }
                  label="Ensight"
                />
                <FormControlLabel
                  value="fast-sample"
                  control={
                    <Radio
                      sx={{
                        color: 'error.main',
                        '&.Mui-checked': {
                          color: 'error.main',
                        },
                      }}
                    />
                  }
                  label="Fast Sample"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Submit Error */}
          {errors.submit && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Typography>
          )}

          {/* Submit Button */}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingText="Submitting..."
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              px: 5,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'secondary.dark',
                boxShadow: 'none',
              },
            }}
          >
            Submit
          </LoadingButton>
        </Box>
      </Paper>
    </Box>
  );
}