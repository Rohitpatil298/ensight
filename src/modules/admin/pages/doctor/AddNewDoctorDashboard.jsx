import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Add,
  Visibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddNewDoctorDashboard = () => {
  const navigate = useNavigate();
  const [drUin, setDrUin] = useState('');
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const mockDoctors = [];

  useEffect(() => {
    setDoctorData(mockDoctors);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Dr UIN:', drUin);
    // Implement search/filter logic here
  };

  const handleAddDoctor = () => {
    // Navigate to add doctor form or open modal
    navigate('/admin/dr/new');
  };

  const handleViewDoctorsInUser = () => {
    // Navigate to view doctors in user
    console.log('View Doctors in User clicked');
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: 'text.primary', mb: 0.5 }}
        >
          Main Doctor View
         <span style={{ color: '#dc3545' }}> listing</span>
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Section - Form and Table */}
        <Grid item xs={12} lg={8}>
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddDoctor}
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                px: 3,
                py: 1,
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  boxShadow: 'none',
                },
              }}
            >
              Add Doctor
            </Button>
            <Button
              variant="contained"
              startIcon={<Visibility />}
              onClick={handleViewDoctorsInUser}
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                px: 3,
                py: 1,
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  boxShadow: 'none',
                },
              }}
            >
              Views Doctors in User
            </Button>
          </Box>

          {/* Search Form */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ mb: 1, color: 'text.primary' }}
                >
                  Dr UIN
                </Typography>
                <TextField
                  fullWidth
                  value={drUin}
                  onChange={(e) => setDrUin(e.target.value)}
                  placeholder="Enter Dr UIN"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'white',
                  px: 4,
                  py: 1,
                  borderRadius: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                    boxShadow: 'none',
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Paper>

          {/* Data Table */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: 'grey.50',
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      #
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Uin
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Speciality
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Qualification
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Mobile
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Mcl_registration
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      City
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Clinic_pincode
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      State
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Pan Number
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Experience
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Address
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Doctor_type
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {doctorData.length > 0 ? (
                    doctorData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: 'grey.50',
                          },
                        }}
                      >
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.uin}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.speciality}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.qualification}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.email}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.mobile}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.mclRegistration}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.city}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.clinicPincode}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.state}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.panNumber}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.experience}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.address}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {row.doctorType}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem' }}>
                          {/* Action buttons can be added here */}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={16}
                        align="center"
                        sx={{ py: 8 }}
                      >
                        <Typography variant="body1" color="text.secondary">
                          No Records
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Right Section - Illustration */}
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: 400,
            }}
          >
            <Box
              component="img"
              src="/images/doctor-view-illustration.svg"
              alt="Doctor View Illustration"
              sx={{
                maxWidth: '100%',
                height: 'auto',
              }}
              onError={(e) => {
                // Fallback if image not found
                e.target.style.display = 'none';
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNewDoctorDashboard;