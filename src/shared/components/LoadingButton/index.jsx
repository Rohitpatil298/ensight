import { Button, CircularProgress } from '@mui/material';

export function LoadingButton({
  loading = false,
  children,
  disabled,
  loadingText = 'Loading...',
  startIcon,
  ...props
}) {
  return (
    <Button
      {...props}
      disabled={loading || disabled}
      startIcon={loading ? null : startIcon}
    >
      {loading && (
        <CircularProgress
          size={20}
          sx={{
            mr: 1,
            color: 'inherit',
          }}
        />
      )}
      {loading ? loadingText : children}
    </Button>
  );
}
