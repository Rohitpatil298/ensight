import { authService } from '../../../core/auth/authService';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  Paper,
  Badge,
  Menu,
  MenuItem,
  Divider,
  alpha,
} from '@mui/material';
import {
  ExitToApp,
  AccountCircle,
  Notifications,
  Settings,
  ExpandMore,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FastSampleHeader({ onMenuClick }) {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1100,
        borderBottom: '1px solid',
        borderColor: alpha('#10b981', 0.1),
        borderRadius: 0,
        backdropFilter: 'blur(8px)',
        bgcolor: alpha('#FFFFFF', 0.95),
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        px: { xs: 2, sm: 4 },
        py: 2,
      }}>
        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Welcome Section */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8125rem', mb: 0.25 }}>
            Welcome back 👋
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.125rem' }}>
            {user?.email || 'User'}
          </Typography>
        </Box>
        
        {/* Actions Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Notifications */}
          <IconButton 
            sx={{ 
              bgcolor: alpha('#10b981', 0.08),
              '&:hover': { bgcolor: alpha('#10b981', 0.15) },
              transition: 'all 0.2s',
            }}
          >
            <Badge badgeContent={3} sx={{ '& .MuiBadge-badge': { bgcolor: '#10b981' } }}>
              <Notifications sx={{ color: '#10b981' }} />
            </Badge>
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          {/* User Profile Menu */}
          <Box>
            <Button
              onClick={handleMenuOpen}
              endIcon={<ExpandMore sx={{ display: { xs: 'none', sm: 'inline' } }} />}
              sx={{
                textTransform: 'none',
                borderRadius: 3,
                px: { xs: 1, sm: 2 },
                py: 1,
                minWidth: { xs: 'auto', sm: 'auto' },
                bgcolor: alpha('#10b981', 0.08),
                '&:hover': { bgcolor: alpha('#10b981', 0.15) },
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  mr: { xs: 0, sm: 1.5 },
                  bgcolor: '#10b981',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#10b981' }}>
                  {user?.email || 'User'}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  Administrator
                </Typography>
              </Box>
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 0,
                sx: {
                  minWidth: 200,
                  mt: 1.5,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                },
              }}
            >
              <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                <AccountCircle sx={{ mr: 1.5, color: 'text.secondary' }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                <Settings sx={{ mr: 1.5, color: 'text.secondary' }} />
                Settings
              </MenuItem>
              <Divider sx={{ my: 1 }} />
              <MenuItem 
                onClick={handleLogout} 
                sx={{ 
                  py: 1.5,
                  color: 'error.main',
                  '&:hover': { bgcolor: alpha('#ef4444', 0.08) },
                }}
              >
                <ExitToApp sx={{ mr: 1.5 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
