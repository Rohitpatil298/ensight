import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Sidebar } from './msaSidebar';
import { Header } from './Header';

export function MSADashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      
      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <Header onMenuClick={handleDrawerToggle} />
        
        {/* Page Content */}
        <Box 
          component="main" 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            px: { xs: 2, sm: 3, md: 4, lg: 5 },
            py: { xs: 3, sm: 4 },
            bgcolor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

