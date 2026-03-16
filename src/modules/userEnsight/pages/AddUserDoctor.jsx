import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Container,
} from '@mui/material';
import { Header } from '../layout/Header';

/* ─── Keyframe Injector ─────────────────────────────────────── */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  
  @keyframes slowDrift {
    0%   { transform: scale(1)   translate(0px, 0px); }
    33%  { transform: scale(1.04) translate(-8px, 6px); }
    66%  { transform: scale(1.02) translate(6px, -4px); }
    100% { transform: scale(1)   translate(0px, 0px); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
if (!document.head.querySelector('[data-add-doctor-styles]')) {
  styleTag.setAttribute('data-add-doctor-styles', '');
  document.head.appendChild(styleTag);
}

const AddUserDoctor = () => {
  const [formData, setFormData] = useState({
    selectME: '',
    activity: '',
    doctorSelect: '',
    doctorName: '',
    doctorUIN: '',
    panCard: '',
    city: '',
    mobile: '',
    email: '',
    honorarium: 'amount1',
    honorariumAmount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your submit logic here
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
            background: 'radial-gradient(circle, rgba(244,163,0,0.08) 0%, transparent 70%)',
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
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#475569',
            mb: 4,
            animation: 'fadeInUp 0.6s ease',
          }}
        >
          Select Doctor for Survey & Non-Survey Enrolment
        </Typography>

        {/* Form Card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 10px 60px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.9)',
            animation: 'fadeInUp 0.6s ease 0.2s both',
          }}
        >
          <Box sx={{ p: 5 }}>
            <form onSubmit={handleSubmit}>
              {/* Select ME */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  Select ME <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  select
                  name="selectME"
                  value={formData.selectME}
                  onChange={handleChange}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#94a3b8" }}>
                            Select ME
                          </span>
                        );
                      }
                      return selected;
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#E53935' },
                      '&.Mui-focused fieldset': { borderColor: '#E53935' },
                    },
                  }}
                >
                  <MenuItem value="">Select ME</MenuItem>
                  <MenuItem value="me1">Medical Executive 1</MenuItem>
                  <MenuItem value="me2">Medical Executive 2</MenuItem>
                  <MenuItem value="me3">Medical Executive 3</MenuItem>
                </TextField>
              </Box>

              {/* Select Survey/Non-Survey Activity */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  Select Survey/ Non-Survey Activity <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  select
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                             SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#94a3b8" }}>
                            Select Survey/ Non-Survey Activity
                          </span>
                        );
                      }
                      return selected;
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#E53935' },
                      '&.Mui-focused fieldset': { borderColor: '#E53935' },
                    },
                  }}
                >
                  <MenuItem value="">Select Survey/ Non-Survey Activity</MenuItem>
                  <MenuItem value="survey1">Survey Activity 1</MenuItem>
                  <MenuItem value="nonsurvey1">Non-Survey Activity 1</MenuItem>
                  <MenuItem value="survey2">Survey Activity 2</MenuItem>
                </TextField>
              </Box>

                                {/* Select Survey/Non-Survey Activity */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  UIN No <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  select
                  name="doctorUIN"
                  value={formData.doctorUIN}
                  onChange={handleChange}
                             SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#94a3b8" }}>
                            Select UIN No
                          </span>
                        );
                      }
                      return selected;
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#E53935' },
                      '&.Mui-focused fieldset': { borderColor: '#E53935' },
                    },
                  }}
                >
                  <MenuItem value="">Select UIN No</MenuItem>
                  <MenuItem value="uin1">UIN 1234567890</MenuItem>
                  <MenuItem value="uin2">UIN 0987654321</MenuItem>
                  <MenuItem value="uin3">UIN 1122334455</MenuItem>
                </TextField>
              </Box>

              {/* Doctor Name */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  Doctor Name <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  placeholder="Enter doctor Name"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#E53935' },
                      '&.Mui-focused fieldset': { borderColor: '#E53935' },
                    },
                  }}
                />
              </Box>

             

              {/* Pan Card Number */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  Pan Card Number <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  name="panCard"
                  value={formData.panCard}
                  onChange={handleChange}
                  placeholder="Enter pan card number"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#E53935' },
                      '&.Mui-focused fieldset': { borderColor: '#E53935' },
                    },
                  }}
                />
              </Box>

              {/* City */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  City <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#E53935' },
                      '&.Mui-focused fieldset': { borderColor: '#E53935' },
                    },
                  }}
                />
              </Box>

              {/* Mobile */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  Mobile <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#E53935' },
                      '&.Mui-focused fieldset': { borderColor: '#E53935' },
                    },
                  }}
                />
              </Box>

              {/* Email */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  Email <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#E53935' },
                      '&.Mui-focused fieldset': { borderColor: '#E53935' },
                    },
                  }}
                />
              </Box>

              {/* Honorarium */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1.5,
                    fontSize: '0.9rem',
                  }}
                >
                  Honorarium <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    name="honorarium"
                    value={formData.honorarium}
                    onChange={handleChange}
                    sx={{ gap: 2 }}
                  >
                    <FormControlLabel
                      value="amount1"
                      control={
                        <Radio
                          sx={{
                            color: '#94a3b8',
                            '&.Mui-checked': { color: '#E53935' },
                          }}
                        />
                      }
                      label={<Typography sx={{ fontSize: '0.9rem' }}>Amount 1</Typography>}
                    />
                    <FormControlLabel
                      value="amount2"
                      control={
                        <Radio
                          sx={{
                            color: '#94a3b8',
                            '&.Mui-checked': { color: '#E53935' },
                          }}
                        />
                      }
                      label={<Typography sx={{ fontSize: '0.9rem' }}>Amount 2</Typography>}
                    />
                    <FormControlLabel
                      value="amount3"
                      control={
                        <Radio
                          sx={{
                            color: '#94a3b8',
                            '&.Mui-checked': { color: '#E53935' },
                          }}
                        />
                      }
                      label={<Typography sx={{ fontSize: '0.9rem' }}>Amount 3</Typography>}
                    />
                    <FormControlLabel
                      value="amount4"
                      control={
                        <Radio
                          sx={{
                            color: '#94a3b8',
                            '&.Mui-checked': { color: '#E53935' },
                          }}
                        />
                      }
                      label={<Typography sx={{ fontSize: '0.9rem' }}>Amount 4</Typography>}
                    />
                    <FormControlLabel
                      value="amount5"
                      control={
                        <Radio
                          sx={{
                            color: '#94a3b8',
                            '&.Mui-checked': { color: '#E53935' },
                          }}
                        />
                      }
                      label={<Typography sx={{ fontSize: '0.9rem' }}>Amount 5</Typography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* Honorarium Amount */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  Honorarium Amount <span style={{ color: '#E53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  name="honorariumAmount"
                  value={formData.honorariumAmount}
                  onChange={handleChange}
                  placeholder="Honorarium Amount"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#E53935' },
                      '&.Mui-focused fieldset': { borderColor: '#E53935' },
                    },
                  }}
                />
              </Box>

              {/* Submit Button */}
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#D32F2F',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    px: 8,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: '0 6px 20px rgba(211,47,47,0.35)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#C62828',
                      boxShadow: '0 8px 28px rgba(211,47,47,0.45)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Enroll
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddUserDoctor;