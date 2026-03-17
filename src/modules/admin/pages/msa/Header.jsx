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
import { authService } from '../../../../core/auth/authService';

export function Header({ onMenuClick }) {
  const user = authService.getCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/admin/login';
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
        borderColor: 'divider',
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
            {user?.name || 'User'}
          </Typography>
        </Box>
        
        {/* Actions Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Notifications */}
          <IconButton 
            sx={{ 
              bgcolor: 'grey.50',
              '&:hover': { bgcolor: 'grey.100' },
              transition: 'all 0.2s',
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Settings */}
          {/* <IconButton 
            sx={{ 
              bgcolor: 'grey.50',
              '&:hover': { bgcolor: 'grey.100' },
              transition: 'all 0.2s',
            }}
          >
            <Settings />
          </IconButton> */}

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          {/* Profile Menu */}
          <Button
            onClick={handleMenuOpen}
            endIcon={<ExpandMore sx={{ display: { xs: 'none', sm: 'inline' } }} />}
            sx={{
              borderRadius: 3,
              py: 1,
              px: { xs: 1, sm: 2 },
              bgcolor: 'grey.50',
              color: 'text.primary',
              textTransform: 'none',
              minWidth: { xs: 'auto', sm: 'auto' },
              '&:hover': {
                bgcolor: 'grey.100',
              },
              transition: 'all 0.2s',
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                mr: { xs: 0, sm: 1.5 },
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {user?.role || 'Administrator'}
              </Typography>
            </Box>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                '& .MuiMenuItem-root': {
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleMenuClose}>
              <AccountCircle sx={{ mr: 1.5, fontSize: 20 }} />
              My Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Settings sx={{ mr: 1.5, fontSize: 20 }} />
              Settings
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ExitToApp sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Paper>
  );
}

