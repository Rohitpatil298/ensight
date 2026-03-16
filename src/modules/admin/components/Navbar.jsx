
import {
  Box,
  Paper,
  alpha,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isMSALogin = location.pathname === '/MSA/admin/login';

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1100,
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        backdropFilter: 'blur(8px)',
        bgcolor: alpha('#FFFFFF', 0.95),
      }}
    >
       {/* Logo Section */}
       <Box 
         sx={{ 
           px: 3, 
           py: 2, 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'start',
         }}
       >
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
           <img 
             src={isMSALogin ? "/images/MSA_logo.png" : "/images/logo_wide.png"}
             alt="Ensight Logo" 
             style={{ 
               width: 160, 
               height: 'auto', 
               objectFit: 'contain'
             }} 
           />
         </Box>
       </Box>
    </Paper>
  );
}
export default Navbar;

