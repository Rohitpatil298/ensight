import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { EmailOutlined as EmailOutlinedIcon } from '@mui/icons-material';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Header } from '../layout/Header';

const InviteDoctorForAggrement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const doctor = location.state?.doctor || {};
  const doctorId = searchParams.get('doctorId') || params.id || doctor.id || '';
  const doctorName = doctor.name || 'Doctor';
  const [email, setEmail] = useState(doctor.email || '');
  const [feedback, setFeedback] = useState('');

  const inviteLink = useMemo(() => {
    if (!doctorId) {
      return `${window.location.origin}/users/survey`;
    }

    return `${window.location.origin}/user/sendlink?doctor_id=${doctorId}`;
  }, [doctorId]);

  const handleSendMail = () => {
    if (!email.trim()) {
      setFeedback('Doctor email is required.');
      return;
    }

    const subject = encodeURIComponent('Invitation to complete agreement process');
    const body = encodeURIComponent(
      `Dear Dr. ${doctorName},\n\nPlease complete the agreement process using the link below:\n${inviteLink}\n\nRegards,\nEnsight Team`
    );

    setFeedback('Opening your mail client with the invite link.');
    window.location.href = `mailto:${email.trim()}?subject=${subject}&body=${body}`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #f8fafc 0%, #eef1f5 40%, #f0f2f7 100%)',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px) saturate(0.7)',
            transform: 'scale(1.02)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(248,250,252,0.74) 0%, rgba(240,242,247,0.9) 100%)',
          }}
        />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Header />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5, py: { xs: 5, md: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            mx: 'auto',
            maxWidth: 1100,
            borderRadius: 4,
            px: { xs: 3, sm: 6, md: 8 },
            py: { xs: 4, sm: 5 },
            background: 'rgba(255, 255, 255, 0.84)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 18px 55px rgba(15, 23, 42, 0.14)',
            border: '1px solid rgba(255,255,255,0.8)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.55rem', md: '2rem' },
              fontWeight: 500,
              color: '#1f2937',
              mb: 8.5,
            }}
          >
            Invite doctor for completing agreement process through mail.
          </Typography>

          {/* <Typography
            sx={{
              textAlign: 'center',
              color: '#64748b',
              fontSize: '0.95rem',
              mb: 4.5,
            }}
          >
            {doctorId ? `Doctor ID: ${doctorId}` : 'Select a doctor from the survey list to prefill the invite.'}
          </Typography> */}

          {feedback ? (
            <Alert
              severity={feedback.includes('required') ? 'error' : 'success'}
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setFeedback('')}
            >
              {feedback}
            </Alert>
          ) : null}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '180px minmax(0, 1fr)' },
              alignItems: 'center',
              gap: { xs: 1.5, md: 4 },
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: '#1f2937',
                fontSize: '0.98rem',
                textAlign: { xs: 'left', md: 'right' },
              }}
            >
              Dr. Email Id: *
            </Typography>

            <TextField
              fullWidth
              variant="standard"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="doctor@example.com"
              InputProps={{
                startAdornment: <EmailOutlinedIcon sx={{ color: '#94a3b8', mr: 1.25, fontSize: 18 }} />,
                disableUnderline: false,
              }}
              sx={{
                '& .MuiInputBase-root': {
                  fontSize: '1rem',
                  color: '#64748b',
                  pb: 0.5,
                },
                '& .MuiInput-root:before': {
                  borderBottomColor: '#cbd5e1',
                },
                '& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                  borderBottomColor: '#94a3b8',
                },
                '& .MuiInput-root:after': {
                  borderBottomColor: '#00c853',
                },
              }}
            />
          </Box>

          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              onClick={handleSendMail}
              sx={{
                minWidth: 206,
                py: 1.5,
                px: 5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
                color: '#fff',
                bgcolor: '#08c44d',
                boxShadow: '0 10px 24px rgba(8,196,77,0.22)',
                '&:hover': {
                  bgcolor: '#06aa42',
                },
              }}
            >
              Send Mail
            </Button>

            <Button
              onClick={() => navigate(-1)}
              sx={{
                ml: 2,
                color: '#64748b',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default InviteDoctorForAggrement;