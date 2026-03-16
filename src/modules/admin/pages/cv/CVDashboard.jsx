import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

export function CVDashboard() {
  const [drUIN, setDrUIN] = useState('');
  const [drName, setDrName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = () => {
    console.log('Submit:', { drUIN, drName });
  };

  const handleReset = () => {
    setDrUIN('');
    setDrName('');
    setSearchQuery('');
  };

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
        CV Doctors View <span style={{ color: '#dc3545' }}>listing</span>
      </Typography>

      {/* Search Filters */}
      <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Dr UIN
          </Typography>
          <TextField
            size="small"
            value={drUIN}
            onChange={(e) => setDrUIN(e.target.value)}
            sx={{ minWidth: 250, bgcolor: 'white' }}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Dr Name
          </Typography>
          <TextField
            size="small"
            value={drName}
            onChange={(e) => setDrName(e.target.value)}
            sx={{ minWidth: 250, bgcolor: 'white' }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
              borderColor: '#dc3545',
              color: '#dc3545',
              px: 4,
              '&:hover': {
                borderColor: '#dc3545',
                bgcolor: 'rgba(220, 53, 69, 0.04)',
              },
            }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              textTransform: 'none',
              borderColor: '#198754',
              color: '#198754',
              px: 4,
              '&:hover': {
                borderColor: '#198754',
                bgcolor: 'rgba(25, 135, 84, 0.04)',
              },
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>CV Status</TableCell>
              <TableCell>Uin</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Speciality</TableCell>
              <TableCell>Qualification</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Mcl_registration</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Clinic_pincode</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Pan Number</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Doctor_type</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={17} sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search Doctor UIN or Name to Find it."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ bgcolor: 'white' }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Data rows will be added here */}
            <TableRow>
              <TableCell colSpan={17} sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                No doctors found. Use the filters above to search.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
