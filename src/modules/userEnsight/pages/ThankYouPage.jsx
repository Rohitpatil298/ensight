import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Paper, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header } from '../layout/Header';


/* ─── Keyframe Injector ─────────────────────────────────────── */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  
  @keyframes slowDrift {
    0%   { transform: scale(1)   translate(0px, 0px); }
    33%  { transform: scale(1.04) translate(-8px, 6px); }
    66%  { transform: scale(1.02) translate(6px, -4px); }
    100% { transform: scale(1)   translate(0px, 0px); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
if (!document.head.querySelector('[data-change-signature-styles]')) {
  styleTag.setAttribute('data-change-signature-styles', '');
  document.head.appendChild(styleTag);
}

const ThankYouPage = () => {
const navigate = useNavigate();

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
      {/* Background Layer with Medical Image */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Medical photo */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px) saturate(0.7)',
            animation: 'slowDrift 28s ease-in-out infinite',
          }}
        />
        
        {/* Gradient overlays */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(248,250,252,0.7) 0%, rgba(240,242,247,0.85) 100%)',
          }}
        />

        {/* Decorative orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            right: '-8%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-12%',
            left: '-6%',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,83,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Header */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 5, py: 6 }}>
        <Box
        >
          {/* Signature Container */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 10px 60px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.9)',
              p: 4,
            }}
          >
            <Typography
                variant="h4"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                    color: '#1E293B',
                    m: 6,
                }}
              >
                Thank you for participating in the survey study!!
                </Typography>
            {/* Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >

              {/* Back Button */}
              <Button
              onClick={()=>navigate('/users/survey')}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  bgcolor: '#E53935',
                  color: 'white',
                  borderRadius: 2,
                  minWidth: 140,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(229,57,53,0.3)',
                  '&:hover': {
                    bgcolor: '#C62828',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(229,57,53,0.4)',
                  },
                }}
              >
                Home
              </Button>

              {/* Submit Button */}
              <Button
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  bgcolor: '#00C853',
                  color: 'white',
                  borderRadius: 2,
                  minWidth: 140,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
                  '&:hover': {
                    bgcolor: '#00A844',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,200,83,0.4)',
                  },
                }}
              >
                View Uploaded Documents
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ThankYouPage;