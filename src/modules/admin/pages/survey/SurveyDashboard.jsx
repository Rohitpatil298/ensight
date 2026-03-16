import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  alpha,
  Paper,
  Stack,
} from '@mui/material';
import {
  Add,
  Science,
  Edit,
  Assessment,
  Description,
  AutoAwesome,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DataTableWithDropdown } from '../../../../shared/components/DataTableWithDropdown';

export function SurveyDashboard() {
  const getStatusColor = (status) => {
    const colors = {
      'Completed-Archived': 'error',
      'Medical': 'info',
      'Sales-Enrolment Closed': 'warning',
      'Sales': 'success',
    };
    return colors[status] || 'default';
  };
    const navigate = useNavigate();
  const [surveys, setSurveys] = useState([
    {
      id: 34,
      shortTitle: 'Durgesh',
      status: 'Completed-Archived',
      honorariumAmount1: 0,
      honorariumAmount2: 0,
      honorariumAmount3: 0,
      honorariumAmount4: 0,
      honorariumAmount5: 0,
      totalDoctors: 5,
      pending: 5,
      done: 0,
      objective: 'New diabetic tablets information',
      createdDate: '29 Dec, 2025 2:20 PM',
    },
    {
      id: 33,
      shortTitle: 'hhh',
      status: 'Medical',
      honorariumAmount1: 1000,
      honorariumAmount2: 2000,
      honorariumAmount3: 0,
      honorariumAmount4: 0,
      honorariumAmount5: 0,
      totalDoctors: 0,
      pending: 0,
      done: 0,
      objective: 'Medical survey objective',
      createdDate: '28 Dec, 2025 10:15 AM',
    },
    {
      id: 32,
      shortTitle: 'Test-Survey',
      status: 'Sales-Enrolment Closed',
      honorariumAmount1: 30000,
      honorariumAmount2: 40000,
      honorariumAmount3: 45000,
      honorariumAmount4: 50000,
      honorariumAmount5: 55000,
      totalDoctors: 0,
      pending: 0,
      done: 0,
      objective: 'Sales enrollment survey',
      createdDate: '27 Dec, 2025 3:45 PM',
    },
  ]);

  const [searchTitle, setSearchTitle] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  // Table columns configuration
  const columns = [
    { 
      field: 'id', 
      header: 'Activity ID',
      cellSx: { fontWeight: 600 },
    },
    { 
      field: 'shortTitle', 
      header: 'Activity Short Title',
      cellSx: { fontWeight: 500 },
    },
    {
      field: 'status',
      header: 'Status',
      render: (value) => (
        <Chip
          label={value}
          color={getStatusColor(value)}
          size="small"
          sx={{ fontWeight: 600, borderRadius: 2 }}
        />
      ),
    },
    {
      field: 'honorariumAmount1',
      header: 'Honorarium 1',
      align: 'right',
      cellSx: { fontFamily: 'monospace' },
      render: (value) => value?.toLocaleString() || 0,
    },
    {
      field: 'honorariumAmount2',
      header: 'Honorarium 2',
      align: 'right',
      cellSx: { fontFamily: 'monospace' },
      render: (value) => value?.toLocaleString() || 0,
    },
    {
      field: 'honorariumAmount3',
      header: 'Honorarium 3',
      align: 'right',
      cellSx: { fontFamily: 'monospace' },
      render: (value) => value?.toLocaleString() || 0,
    },
    {
      field: 'honorariumAmount4',
      header: 'Honorarium 4',
      align: 'right',
      cellSx: { fontFamily: 'monospace' },
      render: (value) => value?.toLocaleString() || 0,
    },
    {
      field: 'honorariumAmount5',
      header: 'Honorarium 5',
      align: 'right',
      cellSx: { fontFamily: 'monospace' },
      render: (value) => value?.toLocaleString() || 0,
    },
    {
      field: 'totalDoctors',
      header: 'Total Doctors',
      align: 'right',
      cellSx: { fontWeight: 600 },
      render: (value) => value || 0,
    },
    {
      field: 'pending',
      header: 'Pending',
      align: 'right',
      render: (value) => (
        <Chip
          label={value || 0}
          size="small"
          sx={{ bgcolor: alpha('#F4A300', 0.1), color: 'primary.main', fontWeight: 600 }}
        />
      ),
    },
    {
      field: 'done',
      header: 'Done',
      align: 'right',
      render: (value) => (
        <Chip
          label={value || 0}
          size="small"
          color="success"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
  ];

  // Render expanded content for each row
  const renderExpandedContent = (survey) => (
    <>
      <Typography variant="subtitle2" color="text.primary" fontWeight={700} gutterBottom>
        Objective
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {survey.objective}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3, fontWeight: 600 }}>
        Created: {survey.createdDate}
      </Typography>
      
      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>
        Quick Actions
      </Typography>
      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={() =>
            navigate(`/admin/survey/${survey.id}/questions`, {
              state: { survey },
            })
          }
          sx={{ 
            borderRadius: 2,
            fontWeight: 600,
            borderColor: alpha('#F4A300', 0.5),
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: alpha('#F4A300', 0.08),
            },
          }}
        >
          Add Questions
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Science />}
          color="secondary"
          sx={{ borderRadius: 2, fontWeight: 600 }}
          onClick={() =>
            navigate(`/admin/survey/test/${survey.id}`, {
              state: { survey },
            })
          }
        >
          Test Survey
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Edit />}
          sx={{ borderRadius: 2, fontWeight: 600 }}
          onClick={() => navigate(`/admin/survey/edit/${survey.id}`, { state: { survey } }) }
        >
          Edit Status
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Assessment />}
          color="success"
          sx={{ borderRadius: 2, fontWeight: 600 }}
          onClick={() =>
            navigate(`/admin/survey/${survey.id}/responses`, {
              state: { survey },
            })
          }
        >
          Survey Responses
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Description />}
          sx={{ borderRadius: 2, fontWeight: 600 }}
          onClick={() =>
            navigate(`/admin/survey/${survey.id}/agreement-download`, {
              state: { survey },
            })
          }
        >
          Agreement Download
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AutoAwesome />}
          sx={{ borderRadius: 2, fontWeight: 600 }}
          onClick={() =>
            navigate(`/admin/survey/${survey.id}/auto-analyse`, {
              state: { survey },
            })
          }
        >
          Auto Analyse
        </Button>
      </Stack>
    </>
  );

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>
          Survey <span style={{ color: '#dc3545' }}>listing</span>
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<Add />}
          sx={{ textTransform: 'none', fontWeight: 600 }}
          onClick={() => navigate("/admin/survey/new")}
        >
          New Survey
        </Button>
      </Box>

      {/* Financial Year Card */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={1}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel>Financial Year *</InputLabel>
          <Select
            defaultValue=""
            label="Financial Year *"
            sx={{ bgcolor: 'white' }}
          >
            <MenuItem value="">Select Financial Year</MenuItem>
            <MenuItem value="2023-2024">2023-2024</MenuItem>
            <MenuItem value="2024-2025">2024-2025</MenuItem>
            <MenuItem value="2025-2026">2025-2026</MenuItem>
          </Select>
        </FormControl>
              {/* CSV Export Button */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="error"
          sx={{ textTransform: 'none' }}
        >
          All Survey/Non-Survey CSV
        </Button>
      </Box>
      </Paper>

      {/* Filters - Short Title and Status */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={1}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Short Title
          </Typography>
          <TextField
            size="small"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            sx={{ minWidth: 250, bgcolor: 'white' }}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Status
          </Typography>
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <Select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              displayEmpty
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="">Select...</MenuItem>
              <MenuItem value="medical">Medical</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="completed">Completed-Archived</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Entries per page */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, alignItems: 'center' }}>
        <Select size="small" defaultValue={10} sx={{ minWidth: 80, bgcolor: 'white' }}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Typography variant="body2" color="text.secondary">
          entries per page
        </Typography>
      </Box>

      {/* Table */}
      <DataTableWithDropdown
        columns={columns}
        data={surveys}
        renderExpandedContent={renderExpandedContent}
        emptyMessage="No surveys found"
      />
      </Paper>
    </Box>
  );
}
