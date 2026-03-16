import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAgreementPreviewPage = location.pathname === '/admin/cron/agreement-preview';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      {!isAgreementPreviewPage ? (
        <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      ) : null}
      
      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        {!isAgreementPreviewPage ? <Header onMenuClick={handleDrawerToggle} /> : null}
        
        {/* Page Content */}
        <Box 
          component="main" 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            px: isAgreementPreviewPage ? 0 : { xs: 2, sm: 3, md: 4, lg: 5 },
            py: isAgreementPreviewPage ? 0 : { xs: 3, sm: 4 },
            bgcolor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

