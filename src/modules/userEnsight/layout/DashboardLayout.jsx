import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

/* ── Inject global styles once ───────────────────────────────── */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes slowDrift {
    0%   { transform: scale(1)   translate(0px, 0px); }
    33%  { transform: scale(1.04) translate(-8px, 6px); }
    66%  { transform: scale(1.02) translate(6px, -4px); }
    100% { transform: scale(1)   translate(0px, 0px); }
  }
  @keyframes orbFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(30px, -20px) scale(1.08); }
  }
  @keyframes orbFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(-20px, 25px) scale(0.94); }
  }
  @keyframes orbFloat3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(15px, 15px) scale(1.05); }
  }
`;
if (!document.head.querySelector('[data-layout-styles]')) {
  styleTag.setAttribute('data-layout-styles', '');
  document.head.appendChild(styleTag);
}

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(prev => !prev);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── Background Layer ─────────────────────────────────── */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Base gradient — matches SurveyPage's #fafafa → #f0f2f5 */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(145deg, #f8fafc 0%, #eef1f5 40%, #f0f2f7 100%)',
          }}
        />

        {/* Medical / healthcare photo — low-opacity, softly blurred */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1920&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            opacity: 0.01,
            filter: 'blur(2px) saturate(0.6)',
            animation: 'slowDrift 28s ease-in-out infinite',
            transformOrigin: 'center center',
          }}
        />

        {/* Gradient overlay to tie photo into the page colors */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: [
              'linear-gradient(180deg, rgba(248,250,252,0.55) 0%, rgba(240,242,247,0.72) 100%)',
              'linear-gradient(90deg,  rgba(248,250,252,0.35) 0%, transparent 60%)',
            ].join(', '),
          }}
        />

        {/* Decorative orb — top-right red glow (mirrors SurveyPage ::before) */}
        <Box
          sx={{
            position: 'absolute',
            top: '-18%',
            right: '-12%',
            width: 680,
            height: 680,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229,57,53,0.10) 0%, rgba(229,57,53,0.03) 50%, transparent 75%)',
            animation: 'orbFloat1 18s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Decorative orb — bottom-left amber glow (mirrors SurveyPage ::after) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-16%',
            left: '-10%',
            width: 580,
            height: 580,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,163,0,0.10) 0%, rgba(244,163,0,0.03) 50%, transparent 75%)',
            animation: 'orbFloat2 22s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Subtle mid-page green accent (survey "completed" color) */}
        <Box
          sx={{
            position: 'absolute',
            top: '42%',
            left: '38%',
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,83,0.055) 0%, transparent 70%)',
            animation: 'orbFloat3 26s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Fine dot-grid texture */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(30,41,59,0.055) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      </Box>

      {/* ── Main Content ─────────────────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Header sits above content with a very subtle backdrop */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(255,255,255,0.82)',
            borderBottom: '1px solid rgba(226,232,240,0.8)',
            boxShadow: '0 1px 20px rgba(0,0,0,0.04)',
          }}
        >
          <Header onMenuClick={handleDrawerToggle} />
        </Box>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            px: { xs: 2, sm: 3, md: 4, lg: 5 },
            py: { xs: 3, sm: 4 },
            // Transparent so the layout background shows through
            bgcolor: 'transparent',
            /* Thin custom scrollbar */
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.12)',
              borderRadius: 4,
              '&:hover': { background: 'rgba(0,0,0,0.22)' },
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}