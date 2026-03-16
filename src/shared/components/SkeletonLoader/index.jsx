import { Box, CircularProgress } from '@mui/material';
import { keyframes } from '@mui/system';

// Premium pulse animation
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

// Premium Loader Component
export function Loader({ size = 40, color = 'primary', thickness = 4, message = '' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minHeight: '200px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
        }}
      >
        {/* Outer glow ring */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size + 16,
            height: size + 16,
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        />
        {/* Main spinner */}
        <CircularProgress
          size={size}
          thickness={thickness}
          sx={{
            color: (theme) => theme.palette[color].main,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
      {message && (
        <Box
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 500,
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        >
          {message}
        </Box>
      )}
    </Box>
  );
}

// All Loader Component
export function AllLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
      }}
    >
      <Loader size={56} message="Loading data..." />
    </Box>
  );
}

