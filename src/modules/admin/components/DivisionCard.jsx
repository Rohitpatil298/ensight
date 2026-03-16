import { Card, CardContent, CardActions, Typography, IconButton, Box, alpha } from '@mui/material';
import { Edit, Delete, Business } from '@mui/icons-material';

export function DivisionCard({ division, onEdit, onDelete }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease-in-out',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: alpha('#F4A300', 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2.5,
          }}
        >
          <Business sx={{ fontSize: 28, color: 'primary.main' }} />
        </Box>
        
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 1 }}>
          {division.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {division.description || 'No description available'}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <IconButton
          onClick={() => onEdit(division)}
          size="small"
          sx={{
            bgcolor: alpha('#2196F3', 0.1),
            color: '#2196F3',
            '&:hover': {
              bgcolor: alpha('#2196F3', 0.2),
            },
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => onDelete(division.id)}
          size="small"
          sx={{
            bgcolor: alpha('#E53935', 0.1),
            color: '#E53935',
            '&:hover': {
              bgcolor: alpha('#E53935', 0.2),
            },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

