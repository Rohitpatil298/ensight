import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Stack,
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
    type: 'HO Survey',
    urn: '',
    methodology: 'Structured Questionnaire with one on one interaction with Drs in personal interview.',
    sampleSize: '0',
    statisticalAnalysis:
      'The data were entered into the Microsoft Excel 2013, and descriptive statistics were applied to evaluate the practice setting, educational qualifications and to elucidate knowledge, attitudes, and perceptions of the participants about prescribing of generic and original drugs.',
    dateCreated: '2025-12-27',
    division: 'Diabetes Care',
    conclusion: '',
    surveyBenefit: '',
  },
  33: {
    id: 33,
    shortTitle: 'hhh',
    objective: 'objective',
    type: 'HO Survey',
    urn: '',
    methodology: 'Structured Questionnaire with one on one interaction with Drs in personal interview.',
    sampleSize: '0',
    statisticalAnalysis:
      'The data were entered into the Microsoft Excel 2013, and descriptive statistics were applied to evaluate the practice setting, educational qualifications and to elucidate knowledge, attitudes, and perceptions of the participants about prescribing of generic and original drugs.',
    dateCreated: '2025-12-25',
    division: 'Diabetes Care',
    conclusion: '',
    surveyBenefit: '',
  },
  34: {
    id: 34,
    shortTitle: 'Durgesh',
    objective: 'New diabetic tablets information',
    type: 'HO Survey',
    urn: '',
    methodology: 'Structured Questionnaire with one on one interaction with Drs in personal interview.',
    sampleSize: '5',
    statisticalAnalysis:
      'The data were entered into the Microsoft Excel 2013, and descriptive statistics were applied to evaluate the practice setting, educational qualifications and to elucidate knowledge, attitudes, and perceptions of the participants about prescribing of generic and original drugs.',
    dateCreated: '2025-12-29',
    division: 'Diabetes Care',
    conclusion: '',
    surveyBenefit: '',
  },
};

const fieldLabelSx = {
  color: 'text.primary',
  fontWeight: 700,
  fontSize: '0.78rem',
};

const fieldValueSx = {
  color: 'text.secondary',
  fontSize: '0.82rem',
};

export function SurveyAutoAnalyse() {
  const navigate = useNavigate();
  const location = useLocation();
  const { surveyId } = useParams();
  const [loading, setLoading] = useState(false);

  const survey = useMemo(() => {
    const stateSurvey = location.state?.survey;
    const seededSurvey = surveyCatalog[surveyId];

    if (stateSurvey || seededSurvey) {
      return {
        ...seededSurvey,
        ...stateSurvey,
      };
    }

    return {
      id: surveyId,
      shortTitle: `Survey ${surveyId}`,
      objective: '',
      type: 'HO Survey',
      urn: '',
      methodology: '',
      sampleSize: '0',
      statisticalAnalysis: '',
      dateCreated: '',
      division: '',
      conclusion: '',
      surveyBenefit: '',
    };
  }, [location.state, surveyId]);

  const [formData, setFormData] = useState({
    methodology: survey.methodology || '',
    statisticalAnalysis: survey.statisticalAnalysis || '',
    conclusion: survey.conclusion || '',
    surveyBenefit: survey.surveyBenefit || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
    } finally {
      setLoading(false);
    }
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
          Auto Analyse{' '}
          <Typography component="span" sx={{ color: 'error.main', fontSize: '0.78rem' }}>
            listing
          </Typography>
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={1.6} sx={{ mb: 2.5 }}>
            <Typography sx={fieldValueSx}>
              <Box component="span" sx={fieldLabelSx}>• Objective:</Box> {survey.objective || 'objective'}
            </Typography>
            <Typography sx={fieldValueSx}>
              <Box component="span" sx={fieldLabelSx}>• Survey Short Title:</Box> {survey.shortTitle}
            </Typography>
            <Typography sx={fieldValueSx}>
              <Box component="span" sx={fieldLabelSx}>• Survey ID:</Box> {survey.id}
            </Typography>
            <Typography sx={fieldValueSx}>
              <Box component="span" sx={fieldLabelSx}>• Survey Type HO/RBD:</Box> {survey.type}
            </Typography>
            <Typography sx={fieldValueSx}>
              <Box component="span" sx={fieldLabelSx}>• Activity URN:</Box> {survey.urn || ''}
            </Typography>
          </Stack>

          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ ...fieldLabelSx, mb: 0.75 }}>• Methodology:</Typography>
            <TextField
              fullWidth
              name="methodology"
              value={formData.methodology}
              onChange={handleChange}
              multiline
              minRows={2}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.85rem' } }}
            />
          </Box>

          <Stack spacing={1.1} sx={{ mb: 2.5 }}>
            <Typography sx={fieldValueSx}>
              <Box component="span" sx={fieldLabelSx}>• Sample Size:</Box> {survey.sampleSize}
            </Typography>
          </Stack>

          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ ...fieldLabelSx, mb: 0.75 }}>• Statistical Analysis:</Typography>
            <TextField
              fullWidth
              name="statisticalAnalysis"
              value={formData.statisticalAnalysis}
              onChange={handleChange}
              multiline
              minRows={2}
              maxRows={4}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.85rem' } }}
            />
          </Box>

          <Stack spacing={1.1} sx={{ mb: 2.5 }}>
            <Typography sx={fieldValueSx}>
              <Box component="span" sx={fieldLabelSx}>• Date Created:</Box> {survey.dateCreated}
            </Typography>
            <Typography sx={fieldValueSx}>
              <Box component="span" sx={fieldLabelSx}>• Division:</Box> {survey.division}
            </Typography>
          </Stack>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ ...fieldLabelSx, mb: 0.75 }}>• Conclusion:</Typography>
            <TextField
              fullWidth
              name="conclusion"
              value={formData.conclusion}
              onChange={handleChange}
              multiline
              minRows={7}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.85rem' } }}
            />
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Typography sx={{ ...fieldLabelSx, mb: 0.75 }}>• Survey Benefit:</Typography>
            <TextField
              fullWidth
              name="surveyBenefit"
              value={formData.surveyBenefit}
              onChange={handleChange}
              multiline
              minRows={7}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.85rem' } }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              color="error"
              sx={{ textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}