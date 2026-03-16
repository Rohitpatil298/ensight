import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  alpha,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
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
import { ArrowBack, Download } from '@mui/icons-material';

const surveyCatalog = {
  32: { id: 32, shortTitle: 'Test-Survey' },
  33: { id: 33, shortTitle: 'hhh' },
  34: { id: 34, shortTitle: 'Durgesh' },
};

const responseRowsBySurvey = {
  34: [
    {
      id: 498,
      survey: 'Durgesh',
      empId: '241536',
      doctorName: 'SURENDRA KUMAR GHINTALA',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
    },
    {
      id: 497,
      survey: 'Durgesh',
      empId: '243073',
      doctorName: 'Abhilash kannan',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
    },
    {
      id: 496,
      survey: 'Durgesh',
      empId: '243073',
      doctorName: 'Ashish Parameshwar',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
    },
    {
      id: 495,
      survey: 'Durgesh',
      empId: '207956',
      doctorName: 'ROBIN VARGHESE',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
    },
    {
      id: 494,
      survey: 'Durgesh',
      empId: '207956',
      doctorName: 'JAZEER ABOOBACKER',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
    },
  ],
};

function SurveyIllustration() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 190,
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 420 260"
        sx={{ width: '100%', maxWidth: 360, height: 'auto' }}
      >
        <circle cx="300" cy="80" r="68" fill="#f3d8dc" />
        <rect x="146" y="58" width="116" height="142" rx="6" fill="#333" />
        <rect x="156" y="66" width="96" height="126" fill="#f8f8f8" />
        <rect x="176" y="45" width="66" height="20" rx="8" fill="#f38a9d" />
        <circle cx="208" cy="45" r="6" fill="#fff" />
        <rect x="170" y="92" width="18" height="18" fill="none" stroke="#f25d74" strokeWidth="2" />
        <path d="M173 100l5 6 10-12" fill="none" stroke="#f25d74" strokeWidth="3" />
        <rect x="198" y="94" width="54" height="3" fill="#555" />
        <rect x="198" y="104" width="48" height="3" fill="#555" />
        <rect x="170" y="120" width="18" height="18" fill="none" stroke="#f25d74" strokeWidth="2" />
        <path d="M173 128l5 6 10-12" fill="none" stroke="#f25d74" strokeWidth="3" />
        <rect x="198" y="122" width="58" height="3" fill="#555" />
        <rect x="198" y="132" width="44" height="3" fill="#555" />
        <rect x="170" y="148" width="18" height="18" fill="none" stroke="#f25d74" strokeWidth="2" />
        <rect x="198" y="150" width="56" height="3" fill="#555" />
        <rect x="198" y="160" width="40" height="3" fill="#555" />
        <path d="M112 118c20-14 36-8 46 12-22 6-38 2-46-12Z" fill="#d90429" />
        <path d="M101 94c15 5 22 14 22 30-14-1-25-12-22-30Z" fill="#ff7a8f" />
        <circle cx="328" cy="66" r="7" fill="#3b2c2c" />
        <rect x="322" y="73" width="10" height="40" rx="6" fill="#f4b42d" />
        <path d="M328 88l18 28" fill="none" stroke="#f4b42d" strokeWidth="7" />
        <path d="M334 112l18 24" fill="none" stroke="#333" strokeWidth="7" />
        <rect x="305" y="84" width="28" height="28" fill="#fff" stroke="#ff7a8f" strokeWidth="3" />
        <path d="M310 95l8 9 14-17" fill="none" stroke="#ff7a8f" strokeWidth="4" />
        <rect x="280" y="138" width="28" height="28" fill="#fff" stroke="#ff7a8f" strokeWidth="3" />
        <path d="M285 149l8 9 14-17" fill="none" stroke="#ff7a8f" strokeWidth="4" />
        <path d="M334 136h24l-16 62h-22Z" fill="none" stroke="#ff7a8f" strokeWidth="2" />
        <path d="M347 136l-3 62" fill="none" stroke="#ff7a8f" strokeWidth="2" />
      </Box>
    </Box>
  );
}

function StatusBadge({ value }) {
  const isPositive = value === 'Yes';

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 1,
        py: 0.35,
        minWidth: 28,
        borderRadius: 0.75,
        fontSize: '0.72rem',
        fontWeight: 700,
        color: 'common.white',
        backgroundColor: isPositive ? 'success.main' : '#f26d79',
      }}
    >
      {value}
    </Box>
  );
}

export function SurveyResponses() {
  const navigate = useNavigate();
  const location = useLocation();
  const { surveyId } = useParams();
  const [responseType, setResponseType] = useState('region');
  const [empIdFilter, setEmpIdFilter] = useState('');
  const [doctorNameFilter, setDoctorNameFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const currentSurvey =
    location.state?.survey ||
    surveyCatalog[surveyId] || {
      id: surveyId,
      shortTitle: `Survey ${surveyId}`,
    };

  const responseRows = responseRowsBySurvey[surveyId] || responseRowsBySurvey[34] || [];

  const filteredRows = useMemo(() => {
    return responseRows.filter((row) => {
      const matchesEmpId = row.empId.toLowerCase().includes(empIdFilter.trim().toLowerCase());
      const matchesDoctor = row.doctorName
        .toLowerCase()
        .includes(doctorNameFilter.trim().toLowerCase());

      return matchesEmpId && matchesDoctor;
    });
  }, [doctorNameFilter, empIdFilter, responseRows]);

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleDownloadCsv = () => {
    const rows = [
      [
        'Survey',
        'EMP Id',
        'Dr. Name',
        'Agreement Verified',
        'Survey Completed',
        'FMV Completed',
        'OTP Verified',
      ],
      ...filteredRows.map((row) => [
        row.survey,
        row.empId,
        row.doctorName,
        row.agreementVerified,
        row.surveyCompleted,
        row.fmvCompleted,
        row.otpVerified,
      ]),
    ];

    const csvContent = rows
      .map((columns) => columns.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', `${currentSurvey.shortTitle}-responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

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
          Survey Responses ({currentSurvey.shortTitle}){' '}
          <Typography component="span" sx={{ color: 'error.main', fontSize: '0.8rem' }}>
            listing
          </Typography>
        </Typography>
      </Stack>

      <Grid container spacing={3} alignItems="stretch" sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%',
            }}
          >
            <FormControl>
              <Typography variant="body2" sx={{ color: 'error.main', fontSize: '0.8rem', mb: 1 }}>
                Type
              </Typography>
              <RadioGroup
                row
                value={responseType}
                onChange={(event) => setResponseType(event.target.value)}
                sx={{ gap: 2 }}
              >
                <FormControlLabel
                  value="region"
                  control={<Radio size="small" color="success" />}
                  label="Region wise summary"
                />
                <FormControlLabel
                  value="doctor"
                  control={<Radio size="small" color="error" />}
                  label="Doctor wise response"
                />
              </RadioGroup>
            </FormControl>

            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Button
                variant="contained"
                color="error"
                startIcon={<Download />}
                onClick={handleDownloadCsv}
                sx={{ textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
              >
                Download CSV
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              minHeight: 190,
            }}
          >
            <SurveyIllustration />
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="EMP ID"
                value={empIdFilter}
                onChange={(event) => {
                  setEmpIdFilter(event.target.value);
                  setPage(0);
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="DR. NAME"
                value={doctorNameFilter}
                onChange={(event) => {
                  setDoctorNameFilter(event.target.value);
                  setPage(0);
                }}
              />
            </Grid>
          </Grid>

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
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04) }}>
                <TableCell sx={{ width: 50 }}>#</TableCell>
                <TableCell sx={{ width: 92 }}>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: 1.1,
                      py: 0.55,
                      bgcolor: 'error.main',
                      color: 'common.white',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                    }}
                  >
                    Delete
                  </Box>
                </TableCell>
                <TableCell>Survey</TableCell>
                <TableCell>EMP Id</TableCell>
                <TableCell>Dr. Name</TableCell>
                <TableCell>Agreement Verified ?</TableCell>
                <TableCell>Survey Completed ?</TableCell>
                <TableCell>FMV Completed ?</TableCell>
                <TableCell>OTP Verified</TableCell>
                <TableCell>OTP</TableCell>
                <TableCell>OTP Date</TableCell>
                <TableCell>Signature</TableCell>
                <TableCell>Signature Date</TableCell>
                <TableCell>Receiving Signature</TableCell>
                <TableCell>FMV Signature</TableCell>
                <TableCell>Pan Card</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Typography color="text.secondary">▶</Typography>
                    </TableCell>
                    <TableCell>{row.survey}</TableCell>
                    <TableCell>{row.empId}</TableCell>
                    <TableCell>{row.doctorName}</TableCell>
                    <TableCell><StatusBadge value={row.agreementVerified} /></TableCell>
                    <TableCell><StatusBadge value={row.surveyCompleted} /></TableCell>
                    <TableCell><StatusBadge value={row.fmvCompleted} /></TableCell>
                    <TableCell><StatusBadge value={row.otpVerified} /></TableCell>
                    <TableCell>{row.otp}</TableCell>
                    <TableCell>{row.otpDate}</TableCell>
                    <TableCell>{row.signature}</TableCell>
                    <TableCell>{row.signatureDate}</TableCell>
                    <TableCell>{row.receivingSignature}</TableCell>
                    <TableCell>{row.fmvSignature}</TableCell>
                    <TableCell>{row.panCard}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={16} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No responses found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {filteredRows.length > 0
              ? `Showing ${page * rowsPerPage + 1} to ${Math.min((page + 1) * rowsPerPage, filteredRows.length)} of ${filteredRows.length} entries`
              : 'Showing 0 to 0 of 0 entries'}
          </Typography>

          <TablePagination
            component="div"
            count={filteredRows.length}
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