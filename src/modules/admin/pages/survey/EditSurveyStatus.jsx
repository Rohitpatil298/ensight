import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '../../../../shared/components/LoadingButton';

const surveyCatalog = {
  32: {
    id: 32,
    shortTitle: 'Test-Survey',
    objective: 'Sales enrollment survey',
    honorariumAmount1: 30000,
    honorariumAmount2: 40000,
    honorariumAmount3: 45000,
    honorariumAmount4: 50000,
    honorariumAmount5: 55000,
    status: 'Sales-Enrolment Closed',
    financialYear: '2025-2026',
    urn: '',
    remainingValidityDays: '',
    totalBudget: '',
  },
  33: {
    id: 33,
    shortTitle: 'hhh',
    objective: 'Medical survey objective',
    honorariumAmount1: 1000,
    honorariumAmount2: 2000,
    honorariumAmount3: 0,
    honorariumAmount4: 0,
    honorariumAmount5: 0,
    status: 'Medical',
    financialYear: '2024-2025',
    urn: '',
    remainingValidityDays: '',
    totalBudget: '',
  },
  34: {
    id: 34,
    shortTitle: 'Repeat Engage (FY2024-25)',
    objective: 'to understand the usage and preference of statins among Diabetologists',
    honorariumAmount1: 500,
    honorariumAmount2: 300,
    honorariumAmount3: 100,
    honorariumAmount4: 0,
    honorariumAmount5: 2,
    status: 'Sales',
    financialYear: '2024-2025',
    urn: '',
    remainingValidityDays: '',
    totalBudget: '',
  },
};

function normalizeStatus(status) {
  return status?.toLowerCase().includes('sales') ? 'Sales' : 'Medical';
}

function SurveyIllustration() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 420,
        display: { xs: 'none', lg: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 420 360"
        sx={{ width: '100%', maxWidth: 1000, height: 'auto' }}
      >
        <circle cx="300" cy="90" r="84" fill="#f3d8dc" />
        <rect x="142" y="72" width="136" height="188" rx="6" fill="#333" />
        <rect x="154" y="82" width="112" height="168" fill="#f8f8f8" />
        <rect x="176" y="56" width="72" height="24" rx="8" fill="#f38a9d" />
        <circle cx="210" cy="56" r="7" fill="#fff" />
        <rect x="168" y="110" width="20" height="20" fill="none" stroke="#f25d74" strokeWidth="2" />
        <path d="M171 119l6 7 12-14" fill="none" stroke="#f25d74" strokeWidth="3" />
        <rect x="200" y="112" width="70" height="3" fill="#555" />
        <rect x="200" y="122" width="58" height="3" fill="#555" />
        <rect x="168" y="148" width="20" height="20" fill="none" stroke="#f25d74" strokeWidth="2" />
        <path d="M171 157l6 7 12-14" fill="none" stroke="#f25d74" strokeWidth="3" />
        <rect x="200" y="150" width="64" height="3" fill="#555" />
        <rect x="200" y="160" width="68" height="3" fill="#555" />
        <rect x="168" y="186" width="20" height="20" fill="none" stroke="#f25d74" strokeWidth="2" />
        <rect x="200" y="188" width="72" height="3" fill="#555" />
        <rect x="200" y="198" width="44" height="3" fill="#555" />
        <path d="M92 124c22-18 40-10 52 12-26 8-44 4-52-12Z" fill="#d90429" />
        <path d="M84 98c18 6 26 18 24 36-16-2-28-14-24-36Z" fill="#ff7a8f" />
        <path d="M298 100c16 18 16 36 0 54 22-4 36-20 40-46-10-10-24-12-40-8Z" fill="#d90429" />
        <path d="M333 162h30l-22 84h-28Z" fill="none" stroke="#ff7a8f" strokeWidth="2" />
        <path d="M349 162l-3 83" fill="none" stroke="#ff7a8f" strokeWidth="2" />
        <path d="M332 183h25" fill="none" stroke="#ff7a8f" strokeWidth="2" />
        <path d="M327 208h33" fill="none" stroke="#ff7a8f" strokeWidth="2" />
        <path d="M320 233h41" fill="none" stroke="#ff7a8f" strokeWidth="2" />
        <circle cx="330" cy="126" r="8" fill="#3b2c2c" />
        <rect x="324" y="134" width="12" height="48" rx="6" fill="#f4b42d" />
        <path d="M330 150l20 32" fill="none" stroke="#f4b42d" strokeWidth="8" />
        <path d="M336 176l24 30" fill="none" stroke="#333" strokeWidth="8" />
        <path d="M328 182l-4 54" fill="none" stroke="#333" strokeWidth="8" />
        <path d="M324 235l8 0" fill="none" stroke="#333" strokeWidth="6" />
        <path d="M356 207l8 6" fill="none" stroke="#333" strokeWidth="6" />
        <rect x="302" y="78" width="32" height="32" fill="#fff" stroke="#ff7a8f" strokeWidth="3" />
        <path d="M308 91l9 10 18-21" fill="none" stroke="#ff7a8f" strokeWidth="5" />
        <rect x="284" y="150" width="32" height="32" fill="#fff" stroke="#ff7a8f" strokeWidth="3" />
        <path d="M290 163l9 10 18-21" fill="none" stroke="#ff7a8f" strokeWidth="5" />
      </Box>
    </Box>
  );
}

function EditSurveyStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const baseSurvey = useMemo(() => {
    return (
      location.state?.survey ||
      surveyCatalog[id] || {
        id,
        shortTitle: '',
        objective: '',
        honorariumAmount1: 0,
        honorariumAmount2: 0,
        honorariumAmount3: 0,
        honorariumAmount4: 0,
        honorariumAmount5: 0,
        status: 'Medical',
        financialYear: '',
        urn: '',
        remainingValidityDays: '',
        totalBudget: '',
      }
    );
  }, [id, location.state]);

  const [formData, setFormData] = useState({
    shortTitle: baseSurvey.shortTitle || '',
    objective: baseSurvey.objective || '',
    honorariumAmount1: baseSurvey.honorariumAmount1 ?? 0,
    honorariumAmount2: baseSurvey.honorariumAmount2 ?? 0,
    honorariumAmount3: baseSurvey.honorariumAmount3 ?? 0,
    honorariumAmount4: baseSurvey.honorariumAmount4 ?? 0,
    honorariumAmount5: baseSurvey.honorariumAmount5 ?? 0,
    status: normalizeStatus(baseSurvey.status),
    urn: baseSurvey.urn || '',
    financialYear: baseSurvey.financialYear || '',
    remainingValidityDays: baseSurvey.remainingValidityDays || '',
    totalBudget: baseSurvey.totalBudget || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.shortTitle.trim()) {
      nextErrors.shortTitle = 'Short title is required';
    }

    if (!formData.objective.trim()) {
      nextErrors.objective = 'Objective is required';
    }

    if (!formData.financialYear.trim()) {
      nextErrors.financialYear = 'Financial year is required';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);
      navigate('/admin/survey');
    } catch (error) {
      console.error('Failed to update survey:', error);
      setErrors({ submit: 'Failed to update survey. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    '& .MuiInputBase-root': {
      fontSize: '0.95rem',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'divider',
    },
  };

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            color: 'common.white',
            mb: 2,
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
          Edit Survey{' '}
          <Typography component="span" sx={{ color: 'error.main', fontSize: '0.8rem' }}>
            form
          </Typography>
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
            }}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ mb: 2.5 }}>
                <FormLabel required sx={{ color: 'error.main', fontSize: '0.95rem' }}>
                  Short Title
                </FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  name="shortTitle"
                  value={formData.shortTitle}
                  onChange={handleChange}
                  error={!!errors.shortTitle}
                  helperText={errors.shortTitle || 'Cardio Connect 1'}
                  sx={inputStyles}
                />
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <FormLabel required sx={{ color: 'error.main', fontSize: '0.95rem' }}>
                  Objective
                </FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  multiline
                  minRows={2}
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  error={!!errors.objective}
                  helperText={errors.objective || 'Ex : to understand the usage and preference of statins among Diabetologists'}
                  sx={inputStyles}
                />
              </Box>

              {[1, 2, 3, 4, 5].map((number) => (
                <Box key={number} sx={{ mb: 2.5 }}>
                  <FormLabel sx={{ color: 'error.main', fontSize: '0.95rem' }}>
                    Honorarium Amount {number}
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    name={`honorariumAmount${number}`}
                    value={formData[`honorariumAmount${number}`]}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              ))}

              <Box sx={{ mb: 2.5 }}>
                <FormControl component="fieldset">
                  <FormLabel required sx={{ color: 'error.main', fontSize: '0.95rem', mb: 0.75 }}>
                    Status
                  </FormLabel>
                  <RadioGroup row name="status" value={formData.status} onChange={handleChange}>
                    <FormControlLabel value="Medical" control={<Radio size="small" />} label="Medical" />
                    <FormControlLabel value="Sales" control={<Radio size="small" />} label="Sales" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <FormLabel sx={{ color: 'error.main', fontSize: '0.95rem' }}>
                  URN
                </FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  name="urn"
                  value={formData.urn}
                  onChange={handleChange}
                  placeholder="Enter URN"
                  sx={inputStyles}
                />
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <FormLabel required sx={{ color: 'error.main', fontSize: '0.95rem' }}>
                  Financial Year
                </FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  name="financialYear"
                  value={formData.financialYear}
                  onChange={handleChange}
                  error={!!errors.financialYear}
                  helperText={errors.financialYear}
                  sx={inputStyles}
                />
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <FormLabel sx={{ color: 'error.main', fontSize: '0.95rem' }}>
                  Remaining Validity [Days]
                </FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  type="number"
                  name="remainingValidityDays"
                  value={formData.remainingValidityDays}
                  onChange={handleChange}
                  sx={inputStyles}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormLabel sx={{ color: 'error.main', fontSize: '0.95rem' }}>
                  Total Budget
                </FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  type="number"
                  name="totalBudget"
                  value={formData.totalBudget}
                  onChange={handleChange}
                  sx={inputStyles}
                />
              </Box>

              {errors.submit ? (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {errors.submit}
                </Typography>
              ) : null}

              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                color="error"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Submit
              </LoadingButton>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <SurveyIllustration />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditSurveyStatus