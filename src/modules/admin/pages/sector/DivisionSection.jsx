import { Paper, Typography, Stack, alpha, Box } from "@mui/material";
import DivisionChip from "../../components/DivisionChip";

export default function DivisionSection({ title, divisions, onSelect }) {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 2.5, sm: 3, md: 4 }, 
        mb: 3, 
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
      }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          mb: { xs: 2, sm: 2.5, md: 3 },
          px: { xs: 2, sm: 2.5 },
          py: { xs: 0.75, sm: 1 },
          borderRadius: 2,
          bgcolor: alpha('#F4A300', 0.08),
          border: '1px solid',
          borderColor: alpha('#F4A300', 0.2),
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            letterSpacing: '0.3px',
          }}
        >
          {title}
        </Typography>
      </Box>

      <Stack direction="row" flexWrap="wrap" gap={{ xs: 1.5, sm: 2 }} useFlexGap>
        {divisions.map((d) => (
          <DivisionChip
            key={d.id}
            label={d.name}
            onClick={() => onSelect(d)}
          />
        ))}
      </Stack>
    </Paper>
  );
}
