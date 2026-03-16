import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Chip,
  IconButton,
  Paper,
} from '@mui/material';
import { Edit, Download } from '@mui/icons-material';
import { DataTable } from '../../../../shared/components/DataTable';

export function SalesTeamDashboard() {
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [empPosition, setEmpPosition] = useState('');
  const [parentEmpId, setParentEmpId] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Sample data
  const salesTeam = [
    {
      id: 14077,
      empId: '40033725',
      empName: 'anjali',
      empPosition: 'PMT Manager',
      parentEmpId: '',
      fmvSignature: '',
      empHQ: 'MUMBAI',
      empRegion: 'MUMBAI',
      mobileNo: '0',
      emailId: 'anjali@lupin.com',
      empPassword: '',
      createdDate: '01 Jan, 1970 5:30 AM',
    },
    {
      id: 13885,
      empId: '40023075',
      empName: 'TUSHAR ASARAM SAINDANE',
      empPosition: 'PMT Manager',
      parentEmpId: '',
      fmvSignature: '',
      empHQ: 'MUMBAI',
      empRegion: 'MUMBAI',
      mobileNo: '9767630855',
      emailId: 'tusharsaindane@lupin.com',
      empPassword: '',
      createdDate: '01 Jan, 1970 5:30 AM',
    },
    {
      id: 13884,
      empId: '40003025',
      empName: 'Vinod S Mahadik',
      empPosition: 'PMT Manager',
      parentEmpId: '',
      fmvSignature: '',
      empHQ: 'MUMBAI',
      empRegion: 'MUMBAI',
      mobileNo: '8657303216',
      emailId: 'vinodmahadik@lupin.com',
      empPassword: '',
      createdDate: '01 Jan, 1970 5:30 AM',
    },
    {
      id: 13857,
      empId: '13823',
      empName: 'PUNE-7',
      empPosition: 'ME',
      parentEmpId: '233245',
      fmvSignature: '',
      empHQ: 'PUNE',
      empRegion: 'PUNE',
      mobileNo: '0',
      emailId: '0',
      empPassword: 'Synox@123',
      createdDate: '08 Feb, 2025 9:01 AM',
    },
    {
      id: 13814,
      empId: '230479',
      empName: 'Venkat Maddila',
      empPosition: 'AM',
      parentEmpId: '40003856',
      fmvSignature: '',
      empHQ: 'TIRUPATI',
      empRegion: 'HYDERABAD',
      mobileNo: '9494515626',
      emailId: 'venkatmaddila@lupin.com',
      empPassword: 'Lupin@123',
      createdDate: '01 Jan, 1970 5:30 AM',
    },
    {
      id: 13761,
      empId: '40038628',
      empName: 'THOMAS SABASTIAN A',
      empPosition: 'ME',
      parentEmpId: '216964',
      fmvSignature: '',
      empHQ: 'COIMBATORE',
      empRegion: 'CHENNAI',
      mobileNo: '8124222740',
      emailId: 'thomasa@lupin.com',
      empPassword: 'kesiamart@28',
      createdDate: '01 Jan, 1970 5:30 AM',
    },
    {
      id: 13592,
      empId: '40023105',
      empName: 'SANJAY PATWAL',
      empPosition: 'ME',
      parentEmpId: '205864',
      fmvSignature: '',
      empHQ: 'HALDWANI',
      empRegion: 'LUCKNOW',
      mobileNo: '7017781183',
      emailId: 'sanjaypatwal@lupin.com',
      empPassword: '',
      createdDate: '01 Jan, 1970 5:30 AM',
    },
    {
      id: 13076,
      empId: '40017055',
      empName: 'Yash Chavan',
      empPosition: 'PMT Manager',
      parentEmpId: '',
      fmvSignature: '',
      empHQ: 'MUMBAI',
      empRegion: 'MUMBAI',
      mobileNo: '8452083703',
      emailId: 'yashchavan@lupin.com',
      empPassword: 'Lupin@321',
      createdDate: '01 Jan, 1970 5:30 AM',
    },
    {
      id: 13075,
      empId: '40007045',
      empName: 'Rushabh Shah',
      empPosition: 'PMT Manager',
      parentEmpId: '',
      fmvSignature: '',
      empHQ: 'MUMBAI',
      empRegion: 'MUMBAI',
      mobileNo: '9011079514',
      emailId: 'rushabhshah1@lupin.com',
      empPassword: 'Lupin@321',
      createdDate: '01 Jan, 1970 5:30 AM',
    },
    {
      id: 13074,
      empId: '13176',
      empName: 'Barnora',
      empPosition: 'PMT Manager',
      parentEmpId: '',
      fmvSignature: '',
      empHQ: 'MUMBAI',
      empRegion: 'MUMBAI',
      mobileNo: '0',
      emailId: 'barnorasusu@lupin.com',
      empPassword: 'Lupin@321',
      createdDate: '01 Jan, 1970 5:30 AM',
    },
  ];

  const getPositionColor = (position) => {
    const colors = {
      'PMT Manager': 'error',
      'ME': 'error',
      'AM': 'info',
    };
    return colors[position] || 'default';
  };

  const handleEdit = (id) => {
    console.log('Edit employee:', id);
  };

  const handleDownloadCSV = () => {
    console.log('Download CSV');
  };

  // Table columns configuration
  const columns = [
    { field: 'id', header: 'ID', width: 80 },
    {
      field: 'actions',
      header: 'Actions',
      width: 120,
      render: (_, row) => (
        <IconButton
          size="small"
          onClick={() => handleEdit(row.id)}
          sx={{
            color: 'white',
            bgcolor: '#198754',
            '&:hover': { bgcolor: '#157347' },
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
          }}
        >
          <Edit sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="caption">Edit</Typography>
        </IconButton>
      ),
    },
    { field: 'empId', header: 'Emp Id', minWidth: 120 },
    { field: 'empName', header: 'Emp Name', minWidth: 180 },
    {
      field: 'empPosition',
      header: 'Emp Position',
      minWidth: 140,
      render: (value) => (
        <Chip
          label={value}
          color={getPositionColor(value)}
          size="small"
        />
      ),
    },
    { field: 'parentEmpId', header: 'Parent Emp Id', minWidth: 120 },
    { field: 'fmvSignature', header: 'FMV Signature', minWidth: 120 },
    { field: 'empHQ', header: 'Emp HQ', minWidth: 120 },
    { field: 'empRegion', header: 'Emp Region', minWidth: 120 },
    { field: 'mobileNo', header: 'Mobile No', minWidth: 120 },
    { field: 'emailId', header: 'Email Id', minWidth: 200 },
    { field: 'empPassword', header: 'Emp Password', minWidth: 120 },
    { field: 'createdDate', header: 'Created Date', minWidth: 180 },
  ];

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
        Sales Team <span style={{ color: '#dc3545' }}>listing</span>
      </Typography>
    <Paper sx={{ p: 3, mb: 3 }} elevation={1}>
      {/* Search Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Emp Id
          </Typography>
          <TextField
            size="small"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            sx={{ minWidth: 200, bgcolor: 'white' }}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Name
          </Typography>
          <TextField
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ minWidth: 200, bgcolor: 'white' }}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Emp Position
          </Typography>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select
              value={empPosition}
              onChange={(e) => setEmpPosition(e.target.value)}
              displayEmpty
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="">Select...</MenuItem>
              <MenuItem value="PMT Manager">PMT Manager</MenuItem>
              <MenuItem value="ME">ME</MenuItem>
              <MenuItem value="AM">AM</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Parent Emp Id
          </Typography>
          <TextField
            size="small"
            value={parentEmpId}
            onChange={(e) => setParentEmpId(e.target.value)}
            sx={{ minWidth: 200, bgcolor: 'white' }}
          />
        </Box>
      </Box>

      {/* Download CSV Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<Download />}
          onClick={handleDownloadCSV}
          sx={{ textTransform: 'none' }}
        >
          Download CSV
        </Button>
      </Box>

      {/* Entries per page */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, alignItems: 'center' }}>
        <Select
          size="small"
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(e.target.value)}
          sx={{ minWidth: 80, bgcolor: 'white' }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Typography variant="body2" color="text.secondary">
          entries per page
        </Typography>
      </Box>

      {/* Table */}
      <DataTable
        columns={columns}
        data={salesTeam}
        emptyMessage="No sales team members found"
      />

      {/* Pagination Info */}
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Showing 1 to {salesTeam.length} of 369 entries
      </Typography>
      </Paper>
    </Box>
  );
}
