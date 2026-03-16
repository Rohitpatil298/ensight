import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

export function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  backLink,
}) {
  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 2 }}
        >
          {breadcrumbs.map((crumb, index) => (
            crumb.href ? (
              <Link
                key={index}
                underline="hover"
                color="text.secondary"
                href={crumb.href}
                sx={{ fontSize: '0.875rem', fontWeight: 500 }}
              >
                {crumb.label}
              </Link>
            ) : (
              <Typography
                key={index}
                color="text.primary"
                sx={{ fontSize: '0.875rem', fontWeight: 600 }}
              >
                {crumb.label}
              </Typography>
            )
          ))}
        </Breadcrumbs>
      )}
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: 'text.primary',
              mb: subtitle ? 1 : 0,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {actions && (
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 }, 
            alignItems: 'center',
            flexWrap: 'wrap',
            width: { xs: '100%', sm: 'auto' },
            '& > *': {
              flex: { xs: '1 1 auto', sm: '0 0 auto' },
              minWidth: { xs: '0', sm: 'auto' },
            }
          }}>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
}
