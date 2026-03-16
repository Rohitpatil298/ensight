import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Stack,
  Paper,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { DataTable } from '../../../../shared/components/DataTable';

export function DivisionDashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Sample data - replace with actual API call
  const divisions = [
    {
      id: 241100,
      name: 'Dhrushail Test',
      isActive: true,
      createdDate: '15 Jul, 2025 4:35 PM',
    },
    {
      id: 241099,
      name: 'Ankit',
      isActive: true,
      createdDate: '27 Jun, 2025 11:03 AM',
    },
    {
      id: 241098,
      name: 'Sample Team',
      isActive: true,
      createdDate: '04 May, 2020 7:18 PM',
    },
    {
      id: 36,
      name: 'Aspire',
      isActive: true,
      createdDate: '04 May, 2020 7:18 PM',
    },
    {
      id: 34,
      name: 'ATT',
      isActive: true,
      createdDate: '04 May, 2020 7:18 PM',
    },
    {
      id: 33,
      name: 'Onrise',
      isActive: true,
      createdDate: '04 May, 2020 7:18 PM',
    },
    {
      id: 32,
      name: 'LUPIN UDAY',
      isActive: true,
      createdDate: '04 May, 2020 7:18 PM',
    },
    {
      id: 31,
      name: 'Respira Orlan',
      isActive: true,
      createdDate: '04 May, 2020 7:18 PM',
    },
    {
      id: 30,
      name: 'rnetacare',
      isActive: true,
      createdDate: '04 May, 2020 7:18 PM',
    },
    {
      id: 29,
      name: 'Pinnacle CV',
      isActive: true,
      createdDate: '04 May, 2020 7:18 PM',
    },
  ];

  const handleEdit = (id) => {
    console.log('Edit division:', id);
    // Navigate to edit page when ready
    // navigate(`/admin/sector/${id}/edit`);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this division?')) {
      console.log('Delete division:', id);
      // Add delete API call here
    }
  };

  const handleAddDivision = () => {
    navigate('/admin/sector/new');
  };

  // Table columns configuration
  const columns = [
    { 
      field: 'id', 
      header: '#', 
      width: 100,
      cellSx: { fontWeight: 600 }
    },
    { 
      field: 'name', 
      header: 'Name', 
      minWidth: 200,
      cellSx: { fontWeight: 500 }
    },
    {
      field: 'isActive',
      header: 'Is Active?',
      minWidth: 150,
      render: (value) => (
        <Chip
          label={value ? 'Enabled' : 'Disabled'}
          color={value ? 'success' : 'error'}
          size="small"
          sx={{ fontWeight: 600, borderRadius: 1.5 }}
        />
      ),
    },
    { 
      field: 'createdDate', 
      header: 'Created Date', 
      minWidth: 200 
    },
    {
      field: 'actions',
      header: 'Actions',
      minWidth: 180,
      render: (_, row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Edit sx={{ fontSize: 16 }} />}
            onClick={() => handleEdit(row.id)}
            sx={{
              color: 'info.main',
              borderColor: 'info.main',
              textTransform: 'none',
              fontSize: '0.75rem',
              py: 0.5,
              px: 1.5,
              '&:hover': {
                borderColor: 'info.dark',
                bgcolor: 'info.lighter',
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Delete sx={{ fontSize: 16 }} />}
            onClick={() => handleDelete(row.id)}
            sx={{
              color: 'error.main',
              borderColor: 'error.main',
              textTransform: 'none',
              fontSize: '0.75rem',
              py: 0.5,
              px: 1.5,
              '&:hover': {
                borderColor: 'error.dark',
                bgcolor: 'error.lighter',
              },
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>
          Division <span style={{ color: '#dc3545' }}>listing</span>
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<Add />}
          sx={{ textTransform: 'none', fontWeight: 600 }}
          onClick={handleAddDivision}
        >
          Add Division
        </Button>
      </Box>
    <Paper sx={{ p: 3, mb: 3 }} elevation={1}>
      {/* Search Filters */}
      <Stack direction="row" gap={2.5} sx={{ mb: 3 }}>
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
            Is Active?
          </Typography>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              displayEmpty
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="">Select...</MenuItem>
              <MenuItem value="true">Enabled</MenuItem>
              <MenuItem value="false">Disabled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

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
          data={divisions}
          emptyMessage="No divisions found"
      />

      {/* Pagination Info */}
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Showing 1 to {divisions.length} of 369 entries
      </Typography>
      </Paper>
    </Box>
  );
}
