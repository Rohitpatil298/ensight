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
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '../../../../shared/components/LoadingButton';

export default function AddAgreement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    referenceName: '',
    survey: '',
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
    status: 'start',
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
    
    if (!formData.referenceName.trim()) {
      newErrors.referenceName = 'Reference Name is required';
    }
    
    if (!formData.survey) {
      newErrors.survey = 'Survey is required';
    }
    
    if (!formData.fromDate) {
      newErrors.fromDate = 'From Date is required';
    }
    
    if (!formData.toDate) {
      newErrors.toDate = 'To Date is required';
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
      // await agreementApi.createRequest(formData);
      // navigate('/admin/agreements');
      alert('Agreement request added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to add request. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 2,
            color: 'text.secondary',
            backgroundColor: 'grey.200',
          }}
        >
          Back
        </Button>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Add Request
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
          {/* Reference Name */}
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
              Reference Name
            </FormLabel>
            <TextField
              fullWidth
              name="referenceName"
              placeholder="Enter name(Do not enter special characters i.e ./,\,#,$,*,% etc.)"
              value={formData.referenceName}
              onChange={handleChange}
              error={!!errors.referenceName}
              helperText={errors.referenceName}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Survey */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth error={!!errors.survey}>
              <FormLabel
                required
                sx={{
                  mb: 1,
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                Survey
              </FormLabel>
              <Select
                name="survey"
                value={formData.survey}
                onChange={handleChange}
                displayEmpty
                sx={{
                  borderRadius: 2,
                }}
              >
                <MenuItem value="" disabled>
                  Select Survey
                </MenuItem>
                <MenuItem value="HO Test 1">HO Test 1</MenuItem>
                <MenuItem value="Test Yogi One to One">Test Yogi One to One</MenuItem>
                <MenuItem value="Cardio Connect 1">Cardio Connect 1</MenuItem>
              </Select>
              {errors.survey && (
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, ml: 1.75, color: 'error.main' }}
                >
                  {errors.survey}
                </Typography>
              )}
            </FormControl>
          </Box>

          {/* From Date */}
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
              From Date
            </FormLabel>
            <TextField
              fullWidth
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              error={!!errors.fromDate}
              helperText={errors.fromDate}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* To Date */}
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
              To Date
            </FormLabel>
            <TextField
              fullWidth
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              error={!!errors.toDate}
              helperText={errors.toDate}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Status */}
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
                Status
              </FormLabel>
              <RadioGroup
                row
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="start"
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
                  label="Start"
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