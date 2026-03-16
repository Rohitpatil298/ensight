import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Stack } from '@mui/material';
import { authService } from '../../core/auth/authService';
import { showSuccessToast, showErrorToast } from '../utils/notifications';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await authService.login({ email, password });
      navigate('/admin/login', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #0ea5e9 100%)',
        p: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack spacing={3} alignItems="center" mb={1}>
            <img src="public/images/logo_wide.png" alt="Ensight Logo" style={{ width: 'auto', height: 48, objectFit: 'cover' }} />
            <Box textAlign="center">
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                Sign in to your account
              </Typography>
            </Box>
          </Stack>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                required
                autoComplete="email"
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                required
                autoComplete="current-password"
              />

              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.4,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                {loading ? 'Logging in...' : 'Sign in'}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;