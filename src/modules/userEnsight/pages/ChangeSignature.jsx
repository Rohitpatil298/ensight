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

const ChangeSignature = () => {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Load scripts dynamically
    const loadScripts = async () => {
      // Load jQuery
      if (!window.jQuery) {
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://ensight.imagicahealth.live/assets/latest/js/jquery-3.7.0.js';
        jqueryScript.type = 'text/javascript';
        document.head.appendChild(jqueryScript);
        await new Promise(resolve => jqueryScript.onload = resolve);
      }

      // Load common scripts
      if (!document.querySelector('script[src*="common_scripts.min.js"]')) {
        const commonScript = document.createElement('script');
        commonScript.src = 'https://ensight.imagicahealth.live/assets/js/common_scripts.min.js';
        commonScript.type = 'text/javascript';
        document.head.appendChild(commonScript);
        await new Promise(resolve => commonScript.onload = resolve);
      }

      // Load SignaturePad
      if (!window.SignaturePad) {
        const signatureScript = document.createElement('script');
        signatureScript.src = 'https://ensight.imagicahealth.live/assets/latest/js/signature_pad.min.js';
        document.head.appendChild(signatureScript);
        await new Promise(resolve => signatureScript.onload = resolve);
      }

      // Initialize SignaturePad
      if (window.SignaturePad && canvasRef.current && !signaturePadRef.current) {
        const canvas = canvasRef.current;
        
        // Set canvas size
        const resizeCanvas = () => {
          const ratio = Math.max(window.devicePixelRatio || 1, 1);
          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = canvas.offsetHeight * ratio;
          canvas.getContext('2d').scale(ratio, ratio);
          if (signaturePadRef.current) {
            signaturePadRef.current.clear();
          }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        signaturePadRef.current = new window.SignaturePad(canvas, {
          backgroundColor: 'rgb(255, 255, 255)',
          penColor: 'rgb(0, 0, 0)',
          minWidth: 1,
          maxWidth: 2.5,
        });

        return () => {
          window.removeEventListener('resize', resizeCanvas);
        };
      }
    };

    loadScripts();
  }, []);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSubmit = () => {
    if (signaturePadRef.current) {
      if (signaturePadRef.current.isEmpty()) {
        alert('Please provide a signature first.');
      } else {
        // const dataURL = signaturePadRef.current.toDataURL();
        // console.log('Signature:', dataURL);
        // alert('Signature saved successfully!');
        navigate('/users/survey/otp-validation');
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
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
          sx={{
            animation: mounted ? 'fadeInUp 0.6s ease' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        >
          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: '#64748b',
              mb: 4,
              letterSpacing: '0.02em',
            }}
          >
            Manager E-Signature - Please sign here to save FMV form
          </Typography>

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
            {/* Signature Canvas */}
            <Box
              sx={{
                mb: 3,
                border: '2px solid #e2e8f0',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: '#ffffff',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: '300px',
                  display: 'block',
                  touchAction: 'none',
                }}
              />
            </Box>

            {/* Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {/* Clear Button */}
              <Button
                onClick={handleClear}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  bgcolor: '#cbd5e1',
                  color: '#475569',
                  borderRadius: 2,
                  minWidth: 140,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: '#94a3b8',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                  },
                }}
              >
                Clear
              </Button>

              {/* Back Button */}
              <Button
                onClick={handleBack}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
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
                Back
              </Button>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
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
                Submit
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ChangeSignature;