import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  ArrowBack,
  Print,
  QrCode2,
  BadgeOutlined,
  DescriptionOutlined,
} from '@mui/icons-material';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const surveyQuestions = [
  'Q1. Rank filters',
  'Q2. Statins',
  'Q3. BMI',
  'Q4. Age',
  'Q5. Weight',
  'Q6. Systolic',
  'Q7. Diastolic',
  'Q8. LDL',
  'Q9. HDL',
  'Q10. VLDL',
  'Q11. HbA1c',
  'Q12. HCP specialty',
  'Q13. Patient mix',
  'Q14. Monthly cases',
  'Q15. Current Rx',
  'Q16. Brand recall',
  'Q17. Brand trial',
  'Q18. Repeat usage',
  'Q19. Switching drivers',
  'Q20. Barriers',
  'Q21. Awareness',
  'Q22. Preference',
  'Q23. Satisfaction',
  'Q24. Recommendation',
  'Q25. Follow-up intent',
  'Q26. Competitor share',
  'Q27. Channel impact',
  'Q28. Rep interaction',
  'Q29. Scientific value',
  'Q30. Overall perception',
];

const lineItemSx = {
  height: 11,
  borderRadius: 999,
  bgcolor: '#e5e7eb',
};

export default function AgreementPreviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const doctor = location.state?.doctor || {};
  const doctorId = searchParams.get('doctorId') || doctor.id || '114';
  const doctorName = doctor.name || 'NITIN KARNIK';
  const activityName = doctor.title || 'Medical Survey Participation';
  const doctorEmail = doctor.email || 'doctor@example.com';

  return (
    <Box>
      {/* <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#111827' }}>
            Agreement Preview
          </Typography>
          <Typography sx={{ color: '#6b7280', mt: 0.5 }}>
            Review the doctor agreement document in admin route.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Print />}
            onClick={() => window.print()}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Print
          </Button>
        </Stack>
      </Stack> */}

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          bgcolor: '#f4f4f5',
          border: '1px solid #e5e7eb',
          boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 920,
            mx: 'auto',
            p: { xs: 2, md: 5 },
            bgcolor: '#fff',
            borderRadius: 2,
            border: '1px solid #d1d5db',
          }}
        >
          <Typography align="center" fontWeight={700} sx={{ mb: 3, color: '#111827' }}>
            Medical Survey Consultant Details
          </Typography>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={0.6}>
                <Typography variant="body2"><strong>Agreement ID:</strong> 35</Typography>
                <Typography variant="body2"><strong>Activity Name:</strong> <span style={{ color: '#dc2626' }}>{activityName}</span></Typography>
                <Typography variant="body2"><strong>Name:</strong> {doctorName}</Typography>
                <Typography variant="body2"><strong>Email ID:</strong> {doctorEmail}</Typography>
                <Typography variant="body2"><strong>Address:</strong> Pune, Maharashtra, India</Typography>
                <Typography variant="body2"><strong>Mobile:</strong> 9876543210</Typography>
                <Typography variant="body2"><strong>PAN:</strong> ABCTY1234Z</Typography>
                <Typography variant="body2"><strong>Honorarium Amount:</strong> INR 4500</Typography>
                <Typography variant="body2"><strong>Activity Date:</strong> 08 Dec 2026</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, mt: { md: 2 } }}>
                <Paper
                  elevation={0}
                  sx={{
                    width: 112,
                    height: 112,
                    border: '2px dashed #9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fafafa',
                  }}
                >
                  <QrCode2 sx={{ fontSize: 66, color: '#111827' }} />
                </Paper>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="caption" sx={{ color: '#374151', fontWeight: 700 }}>Pan Card</Typography>
              <img src='/images/panCard.png' alt='PAN Card' style={{ width: '100%', borderRadius: 8, marginTop: 8 }} />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="caption" sx={{ color: '#374151', fontWeight: 700 }}>
                Agreement Overview
              </Typography>
              <Stack spacing={1.2} sx={{ mt: 1.2 }}>
                <Box sx={{ ...lineItemSx, width: '100%' }} />
                <Box sx={{ ...lineItemSx, width: '92%' }} />
                <Box sx={{ ...lineItemSx, width: '88%' }} />
                <Box sx={{ ...lineItemSx, width: '95%' }} />
              </Stack>
            </Grid>
          </Grid>

          <Typography align="center" sx={{ fontWeight: 700, textDecoration: 'underline', mb: 2 }}>
            E-SURVEY PARTICIPATION
          </Typography>

          <Typography variant="body2" sx={{ color: '#374151', lineHeight: 1.65 }}>
            This legal contract sets out the terms and conditions for participation in a perception study and associated honorarium.
            It includes consultant details, compliance declarations, payment information, and the respondent&apos;s survey inputs.
          </Typography>

          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 700 }}>
            Terms & Conditions
          </Typography>
          <Stack spacing={0.8} sx={{ mb: 4 }}>
            {Array.from({ length: 14 }).map((_, index) => (
              <Typography key={index} variant="body2" sx={{ color: '#374151', fontSize: '0.84rem' }}>
                {index + 1}. Participant confirms the information shared is true and agrees to the survey code of conduct and compliance requirements.
              </Typography>
            ))}
          </Stack>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: '#f3f4f6' }}>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Signature</Typography>
                <Typography sx={{ fontSize: '1.25rem', mt: 1.5, fontFamily: 'cursive' }}>Dr {doctorName}</Typography>
                <Typography variant="body2" sx={{ mt: 2, color: '#111827', fontWeight: 600 }}>
                  Name: {doctorName}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: '#f3f4f6' }}>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Agreement Meta</Typography>
                <Typography variant="body2" sx={{ mt: 1.5 }}><strong>Survey:</strong> {activityName}</Typography>
                <Typography variant="body2"><strong>PAN:</strong> ABCTY1234Z</Typography>
                <Typography variant="body2"><strong>Date of payment:</strong> 08 Dec 2026</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography align="center" sx={{ fontWeight: 700, mb: 1 }}>
            APPENDIX A
          </Typography>
          <Typography align="center" sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 3 }}>
            Survey Questions
          </Typography>

          <Stack spacing={1.35} sx={{ mb: 5 }}>
            {surveyQuestions.map((question, index) => (
              <Box key={question}>
                <Typography variant="body2" sx={{ fontSize: '0.83rem', color: '#111827', mb: 0.6 }}>
                  {question}
                </Typography>
                <Stack spacing={0.6}>
                  <Box sx={{ ...lineItemSx, width: `${90 - (index % 4) * 5}%` }} />
                  <Box sx={{ ...lineItemSx, width: `${78 - (index % 3) * 6}%` }} />
                </Stack>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography align="center" sx={{ fontWeight: 700, mb: 1 }}>
            APPENDIX B
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#374151' }}>
            It is mandatory for participant to be an employee or self-employed practitioner and not a government official at each institution.
          </Typography>

          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, bgcolor: '#f3f4f6', mb: 4 }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>Signature</Typography>
            <Typography sx={{ fontSize: '1.25rem', mt: 1.5, fontFamily: 'cursive' }}>{doctorName}</Typography>
            <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 600 }}>Name: {doctorName}</Typography>
            <Typography variant="body2">Place: Mumbai</Typography>
          </Paper>

          <Typography align="center" sx={{ fontWeight: 700, textDecoration: 'underline', mb: 2 }}>
            Curriculum Vitae
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={0.75}>
                <Typography variant="body2"><strong>Name of HCP:</strong> {doctorName}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {doctorEmail}</Typography>
                <Typography variant="body2"><strong>Specialty:</strong> Consultant Physician</Typography>
                <Typography variant="body2"><strong>Qualification:</strong> MBBS, MD</Typography>
                <Typography variant="body2"><strong>Years of Experience:</strong> 11 Years</Typography>
                <Typography variant="body2"><strong>Current Institute:</strong> City Care Hospital</Typography>
                <Typography variant="body2"><strong>Research Publications:</strong> 5</Typography>
                <Typography variant="body2"><strong>Medical Council Number:</strong> MC/2026/{doctorId}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  minHeight: 180,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <DescriptionOutlined sx={{ color: '#6b7280' }} />
                  <Typography fontWeight={700}>Professional Summary</Typography>
                </Stack>
                <Stack spacing={1}>
                  <Box sx={{ ...lineItemSx, width: '100%' }} />
                  <Box sx={{ ...lineItemSx, width: '93%' }} />
                  <Box sx={{ ...lineItemSx, width: '88%' }} />
                  <Box sx={{ ...lineItemSx, width: '95%' }} />
                  <Box sx={{ ...lineItemSx, width: '84%' }} />
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, bgcolor: '#f3f4f6', mt: 4 }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>Signature</Typography>
            <Typography sx={{ fontSize: '1.25rem', mt: 1.5, fontFamily: 'cursive' }}>{doctorName}</Typography>
            <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 600 }}>Name: {doctorName}</Typography>
          </Paper>
        </Paper>
      </Paper>
    </Box>
  );
}