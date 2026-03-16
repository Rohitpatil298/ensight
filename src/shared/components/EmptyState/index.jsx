import { Box, Typography, Button } from '@mui/material';
import {
  FolderOpen,
  SearchOff,
  AssignmentLate,
  ErrorOutline,
  Inbox,
} from '@mui/icons-material';

const iconMap = {
  folder: FolderOpen,
  search: SearchOff,
  assignment: AssignmentLate,
  error: ErrorOutline,
  inbox: Inbox,
};

export function EmptyState({
  icon = 'inbox',
  title = 'No data available',
  description = 'There is no data to display at the moment.',
  actionLabel,
  onAction,
  customIcon,
}) {
  const IconComponent = customIcon || iconMap[icon] || Inbox;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <IconComponent sx={{ fontSize: 56, color: 'grey.400' }} />
      </Box>
      
      <Typography variant="h6" color="text.primary" gutterBottom fontWeight={600}>
        {title}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>
        {description}
      </Typography>
      
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} size="large">
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
