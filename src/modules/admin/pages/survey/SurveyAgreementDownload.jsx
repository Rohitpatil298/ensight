import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';

const surveyCatalog = {
  32: { id: 32, shortTitle: 'Test-Survey' },
  33: { id: 33, shortTitle: 'hhh' },
  34: { id: 34, shortTitle: 'Durgesh' },
  105: { id: 105, shortTitle: 'Repeat Engage (FY2025-26)' },
};

export function SurveyAgreementDownload() {
  const navigate = useNavigate();
  const location = useLocation();
  const { surveyId } = useParams();
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const survey = useMemo(() => {
    return (
      location.state?.survey ||
      surveyCatalog[surveyId] || {
        id: surveyId,
        shortTitle: `Survey ${surveyId}`,
      }
    );
  }, [location.state, surveyId]);

  const rows = [];

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 2.5 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            color: 'common.white',
            backgroundColor: 'error.main',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'error.dark',
            },
          }}
        >
          Back
        </Button>

        <Typography variant="h4" fontWeight={400} sx={{ color: 'text.primary' }}>
          Download Request ({survey.shortTitle}){' '}
          <Typography component="span" sx={{ color: 'error.main', fontSize: '0.78rem' }}>
            listing
          </Typography>
        </Typography>
      </Stack>

      <Typography sx={{ color: 'error.main', mb: 1.5, fontSize: '1rem' }}>
        Agreements Zip file will be deleted after 30 days.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<Add />}
          sx={{ textTransform: 'none', fontWeight: 700, boxShadow: 'none', mb: 3 }}
        >
          New Request
        </Button>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '170px 270px' },
            gap: 2,
            mb: 3,
            maxWidth: 460,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
              Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={nameFilter}
              onChange={(event) => setNameFilter(event.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
              Status
            </Typography>
            <Select
              fullWidth
              size="small"
              displayEmpty
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <MenuItem value="">Select...</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
            </Select>
          </Box>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <Select
            size="small"
            value={rowsPerPage}
            onChange={(event) => {
              setRowsPerPage(event.target.value);
              setPage(0);
            }}
            sx={{ minWidth: 72 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <Typography variant="body2" color="text.secondary">
            entries per page
          </Typography>
        </Stack>

        <TableContainer sx={{ border: '1px solid', borderColor: 'divider' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total Doctors</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Completed Doctors</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>From Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>To Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Created Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.totalDoctors}</TableCell>
                    <TableCell>{row.completedDoctors}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.fromDate}</TableCell>
                    <TableCell>{row.toDate}</TableCell>
                    <TableCell>{row.createdDate}</TableCell>
                    <TableCell>{row.actions}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 2.5, color: 'text.secondary' }}>
                    No data available in table
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            mt: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing 0 to 0 of 0 entries
          </Typography>

          <TablePagination
            component="div"
            count={0}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[]}
            labelRowsPerPage=""
          />
        </Box>
      </Paper>
    </Box>
  );
}