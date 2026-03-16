import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useState } from 'react';
import { FastSampleUserSidebar } from './FastSampleUserSidebar';
import { FastSampleUserHeader } from './FastSampleUserHeader';

export function FastSampleUserLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <FastSampleUserSidebar
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <FastSampleUserHeader onMenuClick={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flex: 1,
            px: { xs: 1, sm: 2, md: 3 },
            py: { xs: 1.5, sm: 3 },
            overflowX: 'auto',
            overflowY: 'visible',
            minWidth: 0,
            '&::-webkit-scrollbar': { height: 5 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.15)',
              borderRadius: 4,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}