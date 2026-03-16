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
  Grid,
  InputLabel,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '../../../../shared/components/LoadingButton';

const financialYears = [
  '2023-2024',
  '2024-2025',
  '2025-2026',
  '2026-2027',
  '2027-2028',
];

export function AddNewSurvey() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shortTitle: '',
    objective: '',
    honorariumAmount1: 0,
    honorariumAmount2: 0,
    honorariumAmount3: 0,
    honorariumAmount4: 0,
    honorariumAmount5: 0,
    status: 'Medical',
    financialYear: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseInt(value, 10);
    
    if (numValue >= 0 && numValue <= 5000) {
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
      
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.shortTitle.trim()) {
      newErrors.shortTitle = 'Short Title is required';
    }
    
    if (!formData.objective.trim()) {
      newErrors.objective = 'Objective is required';
    }
    
    if (!formData.financialYear) {
      newErrors.financialYear = 'Financial Year is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      // API call to create survey
    //   await surveyApi.createSurvey(formData);
      navigate('/admin/survey');
    } catch (error) {
      console.error('Failed to create survey:', error);
      setErrors({ submit: 'Failed to create survey. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box >
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            color: 'text.secondary',
            mb: 2,
            backgroundColor: 'grey.200',
          }}
        >
          Back
        </Button>
        
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: 'text.primary', mb: 1 }}
        >
          New Survey
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

      <Grid>
        {/* Form Section */}
        <Grid>
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
              {/* Short Title */}
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
                  Short Title
                </FormLabel>
                <TextField
                  fullWidth
                  name="shortTitle"
                  placeholder="Enter name"
                  value={formData.shortTitle}
                  onChange={handleChange}
                  error={!!errors.shortTitle}
                  helperText={errors.shortTitle}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}
                >
                  Ex : Cardio Connect 1
                </Typography>
              </Box>

              {/* Objective */}
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
                  Objective
                </FormLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  name="objective"
                  placeholder="Enter title"
                  value={formData.objective}
                  onChange={handleChange}
                  error={!!errors.objective}
                  helperText={
                    errors.objective ||
                    'Ex : to understand the usage and preference of Statins among Diabetologists'
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              {/* Honorarium Amounts */}
              {[1, 2, 3, 4, 5].map((num) => (
                <Box key={num} sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: 'block',
                      mb: 1,
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  >
                    Honorarium Amount {num}
                  </FormLabel>
                  <TextField
                    fullWidth
                    type="number"
                    name={`honorariumAmount${num}`}
                    value={formData[`honorariumAmount${num}`]}
                    onChange={handleNumberChange}
                    InputProps={{
                      inputProps: { min: 0, max: 5000 },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}
                  >
                    Ex : 5000
                  </Typography>
                </Box>
              ))}

              {/* Status */}
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
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Medical"
                      control={
                        <Radio
                          sx={{
                            color: 'primary.main',
                            '&.Mui-checked': {
                              color: 'primary.main',
                            },
                          }}
                        />
                      }
                      label="Medical"
                    />
                    <FormControlLabel
                      value="Marketing"
                      control={
                        <Radio
                          sx={{
                            color: 'primary.main',
                            '&.Mui-checked': {
                              color: 'primary.main',
                            },
                          }}
                        />
                      }
                      label="Marketing"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* Financial Year */}
              <Box sx={{ mb: 4 }}>
                <FormControl fullWidth error={!!errors.financialYear}>
                  <FormLabel
                    required
                    sx={{
                      mb: 1,
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  >
                    Financial Year
                  </FormLabel>
                  <Select
                    name="financialYear"
                    value={formData.financialYear}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select Financial Year
                    </MenuItem>
                    {financialYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.financialYear && (
                    <Typography
                      variant="caption"
                      sx={{ mt: 0.5, color: 'error.main' }}
                    >
                      {errors.financialYear}
                    </Typography>
                  )}
                </FormControl>
              </Box>

              {/* Submit Error */}
              {errors.submit && (
                <Typography
                  variant="body2"
                  sx={{ mb: 2, color: 'error.main' }}
                >
                  {errors.submit}
                </Typography>
              )}

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                loadingText="Submitting..."
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: 'secondary.main',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textTransform: 'none',
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
        </Grid>

        {/* Illustration Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: 400,
            }}
          >
            <Box
              component="img"
              src="/images/survey-illustration.svg"
              alt="Survey Illustration"
              sx={{
                maxWidth: '100%',
                height: 'auto',
              }}
              onError={(e) => {
                // Hide image if it doesn't exist
                e.target.style.display = 'none';
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
