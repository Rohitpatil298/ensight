import { alpha, Avatar, Box, Fade, Paper, Typography } from '@mui/material';
import React from 'react'
import { AnimatedCounter } from '../../../modules/admin/components/AnimatedCounter';

const StatsCard = ({ icon, count, label, gradient, iconBg }) => {
  return (
    <Fade in={true} timeout={600}>
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          p: 3.5,
          background: gradient,
          borderRadius: 3,
          height: "100%",
          minHeight: 160,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1px solid",
          borderColor: alpha("#000", 0.06),
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
            borderColor: alpha("#000", 0.08),
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "180px",
            height: "180px",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(35%, -35%)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                mb: 1,
                color: "#1E293B",
                fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
                letterSpacing: "-1px",
                fontSize: "2.5rem",
              }}
            >
              <AnimatedCounter end={count} />
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(0,0,0,0.7)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                lineHeight: 1.5,
                maxWidth: "85%",
              }}
            >
              {label}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: iconBg,
              width: 64,
              height: 64,
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </Paper>
    </Fade>
  );
};

export default StatsCard