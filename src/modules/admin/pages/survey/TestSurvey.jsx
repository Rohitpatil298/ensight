import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  alpha,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowBack, Science } from '@mui/icons-material';

const surveyCatalog = {
  32: { id: 32, shortTitle: 'Test-Survey' },
  33: { id: 33, shortTitle: 'hhh' },
  34: { id: 34, shortTitle: 'Durgesh' },
};

const surveyDoctors = {
  32: [
    { id: 1, name: 'Dr. Test One', specialty: 'General Physician' },
    { id: 2, name: 'Dr. Test Two', specialty: 'Cardiologist' },
  ],
  33: [
    { id: 1, name: 'Dr. Rahul Sharma', specialty: 'Diabetologist' },
    { id: 2, name: 'Dr. Priya Nair', specialty: 'Internal Medicine' },
  ],
  34: [
    { id: 1, name: 'Dr. Test One', specialty: 'Physician' },
    { id: 2, name: 'Dr. Test Two', specialty: 'Diabetologist' },
  ],
};

function TestSurvey() {
  const navigate = useNavigate();
  const location = useLocation();
  const { surveyId } = useParams();
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const currentSurvey =
    location.state?.survey ||
    surveyCatalog[surveyId] || {
      id: surveyId || 'test',
      shortTitle: 'Survey',
    };

  const doctors = useMemo(() => {
    if (surveyId && surveyDoctors[surveyId]) {
      return surveyDoctors[surveyId];
    }

    return [
      { id: 1, name: 'Dr. Test One', specialty: 'Physician' },
      { id: 2, name: 'Dr. Test Two', specialty: 'Diabetologist' },
    ];
  }, [surveyId]);

  const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId);

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
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
          Test Survey ({currentSurvey.shortTitle}){' '}
          <Box component="span" sx={{ color: 'error.main', fontSize: '0.9rem' }}>
            details
          </Box>
        </Typography>
      </Stack>

      <Paper
        elevation={1}
        sx={{
          p: { xs: 2, md: 3 },
          border: '1px solid',
          borderColor: 'divider',
          minHeight: 320,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#2f4864',
            mb: 3,
          }}
        >
          Click to test doctors below
        </Typography>

        <List disablePadding sx={{ maxWidth: 560 }}>
          {doctors.map((doctor) => {
            const isSelected = selectedDoctorId === doctor.id;

            return (
              <ListItem
                key={doctor.id}
                disableGutters
                sx={{
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexWrap: 'wrap',
                }}
              >
                <Typography component="span" sx={{ color: 'text.secondary', fontSize: '1.15rem' }}>
                  •
                </Typography>
                <ListItemText
                  primary={doctor.name}
                  secondary={doctor.specialty}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '1.05rem',
                      color: '#44556f',
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      fontSize: '0.8rem',
                    },
                  }}
                  sx={{ m: 0, flex: '0 1 auto' }}
                />
                <Button
                  variant={isSelected ? 'contained' : 'outlined'}
                  color="error"
                  size="small"
                  startIcon={<Science fontSize="small" />}
                  onClick={() => setSelectedDoctorId(doctor.id)}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 0,
                    fontWeight: 600,
                    boxShadow: 'none',
                    minWidth: 132,
                    '&:hover': {
                      boxShadow: 'none',
                      backgroundColor: isSelected ? 'error.dark' : alpha('#d32f2f', 0.08),
                    },
                  }}
                >
                  Click to test
                </Button>
              </ListItem>
            );
          })}
        </List>

        {selectedDoctor ? (
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: alpha('#d32f2f', 0.04),
              border: '1px solid',
              borderColor: alpha('#d32f2f', 0.18),
              maxWidth: 680,
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', sm: 'center' }}>
              <Chip label="Selected for test" color="error" size="small" />
              <Typography variant="body1" fontWeight={600}>
                {selectedDoctor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedDoctor.specialty}
              </Typography>
            </Stack>
          </Box>
        ) : null}
      </Paper>
    </Box>
  );
}

export default TestSurvey