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
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '../../../../shared/components/LoadingButton';

const experienceYears = Array.from({ length: 41 }, (_, i) => i.toString());

export default function AddNewDoctor() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    uin: '',
    speciality: '',
    qualification: '',
    mobile: '',
    email: '',
    hqRegistration: '',
    city: '',
    zillaProvida: '',
    state: '',
    panNumber: '',
    address: '',
    yearOfExperience: '',
    hcp: 'Confirmed',
    additionalQualification: '',
    academicInstitute: '',
    journalPublications: '',
    selectPublication: 'No',
    advisoryBoardName: '',
    medicolegalHistory: '',
    cmeTrialYear: '',
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
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.uin.trim()) newErrors.uin = 'UIN is required';
    if (!formData.speciality.trim()) newErrors.speciality = 'Speciality is required';
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be 10 digits';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.hqRegistration.trim()) newErrors.hqRegistration = 'HQ/Registration is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.panNumber.trim()) newErrors.panNumber = 'Pan Number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.yearOfExperience) newErrors.yearOfExperience = 'Year of Experience is required';

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
      // await adminApi.createDoctor(formData);
      // navigate('/admin/doctors');
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to add doctor. Please try again.' });
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
          Add Doctor
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Sync
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

          {/* UIN */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              UIN*
            </FormLabel>
            <TextField
              fullWidth
              name="uin"
              placeholder="Enter uin"
              value={formData.uin}
              error={!!errors.uin}
              helperText={errors.uin}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Speciality */}
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
              Speciality
            </FormLabel>
            <TextField
              fullWidth
              name="speciality"
              placeholder="Enter Speciality"
              value={formData.speciality}
              onChange={handleChange}
              error={!!errors.speciality}
              helperText={errors.speciality}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Qualification */}
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
              Qualification
            </FormLabel>
            <TextField
              fullWidth
              name="qualification"
              placeholder="Enter Qualification"
              value={formData.qualification}
              onChange={handleChange}
              error={!!errors.qualification}
              helperText={errors.qualification}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Mobile */}
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
              Mobile
            </FormLabel>
            <TextField
              fullWidth
              name="mobile"
              placeholder="Enter Mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Email */}
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
              Email
            </FormLabel>
            <TextField
              fullWidth
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* HQ/Registration */}
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
              HQ/Registration
            </FormLabel>
            <TextField
              fullWidth
              name="hqRegistration"
              placeholder="Enter HQ/Registration"
              value={formData.hqRegistration}
              onChange={handleChange}
              error={!!errors.hqRegistration}
              helperText={errors.hqRegistration}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* City */}
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
              City
            </FormLabel>
            <TextField
              fullWidth
              name="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Zilla Provida */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Zilla Provida
            </FormLabel>
            <TextField
              fullWidth
              name="zillaProvida"
              placeholder="Enter Clinic Pincode"
              value={formData.zillaProvida}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* State */}
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
              State
            </FormLabel>
            <TextField
              fullWidth
              name="state"
              placeholder="Enter State"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Pan Number */}
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
              Pan Number
            </FormLabel>
            <TextField
              fullWidth
              name="panNumber"
              placeholder="Enter Pan Number"
              value={formData.panNumber}
              onChange={handleChange}
              error={!!errors.panNumber}
              helperText={errors.panNumber}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Address */}
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
              Address
            </FormLabel>
            <TextField
              fullWidth
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Year of Experience */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth error={!!errors.yearOfExperience}>
              <FormLabel
                required
                sx={{
                  mb: 1,
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                Year of Experience
              </FormLabel>
              <Select
                name="yearOfExperience"
                value={formData.yearOfExperience}
                onChange={handleChange}
                displayEmpty
                sx={{
                  borderRadius: 2,
                }}
              >
                <MenuItem value="" disabled>
                  Select No. of Experience
                </MenuItem>
                {experienceYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {errors.yearOfExperience && (
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, ml: 1.75, color: 'error.main' }}
                >
                  {errors.yearOfExperience}
                </Typography>
              )}
            </FormControl>
          </Box>

          {/* HCP Status */}
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
                HCP
              </FormLabel>
              <RadioGroup
                row
                name="hcp"
                value={formData.hcp}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Confirmed"
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
                  label="Confirmed"
                />
                <FormControlLabel
                  value="Non-provisioned"
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
                  label="Non-provisioned"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Additional Qualification */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Additional Qualification
            </FormLabel>
            <TextField
              fullWidth
              multiline
              rows={2}
              name="additionalQualification"
              value={formData.additionalQualification}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Academic/research/teaching Institute */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Academic/research/teaching Institute
            </FormLabel>
            <TextField
              fullWidth
              multiline
              rows={2}
              name="academicInstitute"
              value={formData.academicInstitute}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Journal Publications */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Journal publications in peer reviewed publications/Books/Chapters/text books Edited (Number of publications prohibited)
            </FormLabel>
            <TextField
              fullWidth
              multiline
              rows={2}
              name="journalPublications"
              value={formData.journalPublications}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Select Publication */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  mb: 1,
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                Select Publication
              </FormLabel>
              <Select
                name="selectPublication"
                value={formData.selectPublication}
                onChange={handleChange}
                sx={{
                  borderRadius: 2,
                }}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Advisory Board Name */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Advisory Board Name
            </FormLabel>
            <TextField
              fullWidth
              name="advisoryBoardName"
              placeholder="Enter Advisory Board Name"
              value={formData.advisoryBoardName}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Medicolegal History */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Any History of medicolegal or case against the HCP as accused in local or national print media?
            </FormLabel>
            <TextField
              fullWidth
              name="medicolegalHistory"
              placeholder="Enter History of medical Legal or case against the HCP as accused in local or national print media?"
              value={formData.medicolegalHistory}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* CME Trial Year */}
          <Box sx={{ mb: 4 }}>
            <FormLabel
              sx={{
                display: 'block',
                mb: 1,
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              CME trial year
            </FormLabel>
            <TextField
              fullWidth
              name="cmeTrialYear"
              placeholder="No of trial"
              value={formData.cmeTrialYear}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
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
    </Box>
  );
}



