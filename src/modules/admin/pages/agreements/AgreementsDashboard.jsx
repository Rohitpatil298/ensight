import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Chip,
  Alert,
  Stack,
  alpha,
} from '@mui/material';
import {
  Add,
  Download,
  FileCopy,
  Delete,
  GetApp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DataTableWithDropdown } from '../../../../shared/components/DataTableWithDropdown';

const AgreementsDashboard = () => {
  const [searchName, setSearchName] = useState('');
  const [searchSurvey, setSearchSurvey] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const navigate = useNavigate();
  // Sample data matching the screenshot
  const [requests, setRequests] = useState([
    {
      id: 7,
      name: 'wqeqwqewe',
      survey: 'Test Yogi One to One',
      totalDoctors: 1,
      completedDoctors: 1,
      status: 'Completed',
      fromDate: '22-07-2025',
      toDate: '22-Jul-2025',
      createdDate: '23 Jul, 2025 3:30 PM',
    },
    {
      id: 6,
      name: 'asdadasd',
      survey: 'Test Yogi One to One',
      totalDoctors: 1,
      completedDoctors: 1,
      status: 'Completed',
      fromDate: '01-07-2025',
      toDate: '22-Jul-2025',
      createdDate: '23 Jul, 2025 3:19 PM',
    },
    {
      id: 5,
      name: 'ewrerwrwerwerwer',
      survey: 'Test Yogi One to One',
      totalDoctors: 0,
      completedDoctors: 0,
      status: 'Completed',
      fromDate: '01-07-2025',
      toDate: '22-Jul-2025',
      createdDate: '23 Jul, 2025 3:12 PM',
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'success',
      'Pending': 'warning',
      'In Progress': 'info',
    };
    return colors[status] || 'default';
  };

  const filteredRequests = requests.filter((request) => {
    const matchesName = searchName === '' || request.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesSurvey = searchSurvey === '' || request.survey === searchSurvey;
    const matchesStatus = searchStatus === '' || request.status === searchStatus;
    return matchesName && matchesSurvey && matchesStatus;
  });

  // Table columns configuration
  const columns = [
    {
      field: 'id',
      header: '#',
      cellSx: { fontWeight: 600 },
    },
    {
      field: 'name',
      header: 'Name',
      cellSx: { fontWeight: 500 },
    },
    {
      field: 'survey',
      header: 'Survey',
    },
    {
      field: 'totalDoctors',
      header: 'Total Doctors',
      align: 'center',
    },
    {
      field: 'completedDoctors',
      header: 'Completed Doctors',
      align: 'center',
    },
    {
      field: 'status',
      header: 'Status',
      render: (value) => (
        <Chip
          // icon={<Box component="span" sx={{ 
          //   width: 8, 
          //   height: 8, 
          //   borderRadius: '50%', 
          //   bgcolor: 'white',
          //   ml: 1.5,
          // }} />}
          label={value}
          color={getStatusColor(value)}
          size="small"
          sx={{ 
            fontWeight: 600,
            borderRadius: 1.5,
          }}
        />
      ),
    },
    {
      field: 'fromDate',
      header: 'From Date',
    },
    {
      field: 'toDate',
      header: 'To Date',
    },
    {
      field: 'createdDate',
      header: 'Created Date',
    },
  ];

  // Render expanded content (action buttons)
  const renderExpandedContent = (row) => (
    <Box>
      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
        Actions
      </Typography>
      <Stack direction="row" spacing={1.5} sx={{ mt: 2 }} flexWrap="wrap">
        <Button
          variant="contained"
          size="small"
          startIcon={<Download />}
          sx={{
            bgcolor: 'success.main',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1.5,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: 'success.dark',
              boxShadow: 'none',
            },
          }}
        >
          Agreements
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileCopy />}
          sx={{
            color: 'warning.main',
            borderColor: 'warning.main',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1.5,
            '&:hover': {
              borderColor: 'warning.dark',
              bgcolor: alpha('#ff9800', 0.08),
            },
          }}
        >
          Copy Agreements
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<GetApp />}
          sx={{
            bgcolor: 'info.main',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1.5,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: 'info.dark',
              boxShadow: 'none',
            },
          }}
        >
          CSV
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileCopy />}
          sx={{
            color: 'info.main',
            borderColor: 'info.main',
             textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1.5,
            '&:hover': {
              borderColor: 'info.dark',
              bgcolor: alpha('#2196f3', 0.08),
            },
          }}
        >
          Copy CSV
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<Delete />}
          sx={{
            bgcolor: 'error.main',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1.5,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: 'error.dark',
              boxShadow: 'none',
            },
          }}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Box>
      {/* Header */}
            {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>
          Download Request <span style={{ color: '#dc3545' }}>listing</span>
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<Add />}
          sx={{ textTransform: 'none', fontWeight: 600 }}
          onClick={() => navigate("/admin/cron/new")}
        >
          New Request
        </Button>
      </Box>

      {/* Alert */}
      <Alert 
        severity="error" 
        sx={{ 
          mb: 3,
          borderRadius: 2,
          '& .MuiAlert-message': {
            fontSize: '0.9375rem',
          }
        }}
      >
        Agreements Zip file will be deleted after 30 days.
      </Alert>


      {/* Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
          <TextField
            placeholder="Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            size="small"
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
              },
            }}
          />
          <FormControl size="small" sx={{ flex: 1 }}>
            <Select
              value={searchSurvey}
              onChange={(e) => setSearchSurvey(e.target.value)}
              displayEmpty
              sx={{ borderRadius: 1.5 }}
            >
              <MenuItem value="">Select Survey</MenuItem>
              <MenuItem value="Test Yogi One to One">Test Yogi One to One</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flex: 1 }}>
            <Select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              displayEmpty
              sx={{ borderRadius: 1.5 }}
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      

      {/* Entries per page */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Select
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(e.target.value)}
          size="small"
          sx={{ 
            minWidth: 70,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
            },
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        <Typography variant="body2" color="text.secondary">
          entries per page
        </Typography>
      </Box>

      {/* Data Table with Dropdown */}
      <DataTableWithDropdown
        columns={columns}
        data={filteredRequests}
        renderExpandedContent={renderExpandedContent}
        emptyMessage="No requests found"
        footerText={`Showing 1 to ${Math.min(entriesPerPage, filteredRequests.length)} of ${filteredRequests.length} entries`}
      />
      </Paper>
    </Box>
  );
};

export default AgreementsDashboard;