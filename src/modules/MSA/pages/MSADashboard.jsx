import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  Container,
  Chip,
  Avatar,
  Tooltip,
  IconButton,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
  Download as DownloadIcon,
  FilterList as FilterListIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { TabNavigation } from '../components/TabNavigation';

/* ─── Keyframe Injector ─────────────────────────────────────── */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(229,57,53,0.35); }
    70%  { box-shadow: 0 0 0 8px rgba(229,57,53,0); }
    100% { box-shadow: 0 0 0 0 rgba(229,57,53,0); }
  }
  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slowDrift {
    0%   { transform: scale(1)   translate(0px, 0px); }
    33%  { transform: scale(1.04) translate(-8px, 6px); }
    66%  { transform: scale(1.02) translate(6px, -4px); }
    100% { transform: scale(1)   translate(0px, 0px); }
  }
  .survey-row {
    animation: rowIn 0.35s ease forwards;
  }
  .tab-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.25s ease !important;
  }
  .tab-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.12);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .tab-btn:hover::after { opacity: 1; }
  .icon-btn-hover {
    transition: transform 0.2s ease, color 0.2s ease !important;
  }
  .icon-btn-hover:hover {
    transform: scale(1.2) !important;
  }
`;
if (!document.head.querySelector('[data-survey-styles]')) {
  styleTag.setAttribute('data-survey-styles', '');
  document.head.appendChild(styleTag);
}

/* ─── Status Badge ───────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const isCompleted = status === 'completed';
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: '50%',
        bgcolor: isCompleted
          ? 'rgba(0, 200, 83, 0.1)'
          : 'rgba(255, 179, 0, 0.1)',
        border: `2px solid ${isCompleted ? '#00C853' : '#FFB300'}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'scale(1.15)',
          boxShadow: isCompleted
            ? '0 0 10px rgba(0,200,83,0.4)'
            : '0 0 10px rgba(255,179,0,0.4)',
        },
      }}
    >
      {isCompleted ? (
        <CheckCircleIcon sx={{ color: '#00C853', fontSize: 16 }} />
      ) : (
        <ScheduleIcon sx={{ color: '#FFB300', fontSize: 16 }} />
      )}
    </Box>
  );
};

/* ─── Main Component ─────────────────────────────────────────── */
const MSADashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const doctorsData = [
    { id: 1, name: 'AMARTYA SHANKAR',          initials: 'AS', title: 'Test Survey 6',  survey: 'completed', document: 'completed', receiving: 'pending', agreement: 'pending' },
    { id: 2, name: 'AMARTYA SHANKAR CHOWDHURY', initials: 'AC', title: 'Test Survey 6',  survey: 'completed', document: 'completed', receiving: 'pending', agreement: 'pending' },
    { id: 3, name: 'AMRUTA',                    initials: 'AM', title: 'Test Survey 6',  survey: 'pending',   document: 'pending',   receiving: 'pending', agreement: 'pending' },
    { id: 4, name: 'Test1',                     initials: 'T1', title: 'Test Survey 6',  survey: 'completed', document: 'completed', receiving: 'pending', agreement: 'pending' },
    { id: 5, name: 'Test2',                     initials: 'T2', title: 'Test Survey 6',  survey: 'pending',   document: 'pending',   receiving: 'pending', agreement: 'pending' },
    { id: 6, name: 'Test3',                     initials: 'T3', title: 'Test Survey 6',  survey: 'pending',   document: 'pending',   receiving: 'pending', agreement: 'pending' },
    { id: 7, name: 'Vishal Gupta Test',          initials: 'VG', title: 'ENLITE Survey', survey: 'pending',   document: 'pending',   receiving: 'pending', agreement: 'pending' },
  ];

  const filtered = doctorsData.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #f8fafc 0%, #eef1f5 40%, #f0f2f7 100%)',
      }}
    >
      {/* ── Background ── */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px) saturate(0.7)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(248,250,252,0.7) 0%, rgba(240,242,247,0.85) 100%)',
          }}
        />
        <Box sx={{ position: 'absolute', top: '-10%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-12%', left: '-6%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,163,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      </Box>

      {/* ── Hero / Tab Section ── */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 5,
          pt: { xs: 2, sm: 5 },
          pb: 2,
          px: { xs: 1.5, sm: 4 },
          animation: mounted ? 'fadeInUp 0.5s ease forwards' : 'none',
          opacity: mounted ? 1 : 0,
        }}
      >
        <TabNavigation />
      </Box>

      {/* ── Main Content ── */}
      <Container
        maxWidth="xl"
        sx={{
          pb: 8,
          position: 'relative',
          zIndex: 5,
          // Remove side padding on mobile so card fills width
          px: { xs: 1, sm: 3, md: 4 },
        }}
      >
        <Paper
          sx={{
            borderRadius: { xs: 2, sm: 4 },
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.7)',
          }}
        >
          {/* ── Card Top Bar ── */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
              px: { xs: 2, sm: 4 },
              py: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: { xs: '1.1rem', sm: '1.45rem' }, fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}
              >
                Select Doctor
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', mt: 0.3 }}>
                Manage survey status and documents
              </Typography>
            </Box>

            {/* Search + Filter Row */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1.5,
                width: { xs: '100%', md: 'auto' },
                maxWidth: 640,
              }}
            >
              <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
                <Select
                  displayEmpty
                  value={selectedActivity}
                  onChange={e => setSelectedActivity(e.target.value)}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: 2,
                    fontSize: '0.85rem',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                    '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.6)' },
                    '& .MuiSelect-select': { py: 1.1 },
                  }}
                >
                  <MenuItem value="">Select Activity</MenuItem>
                  <MenuItem value="mc2025">Medical Conference 2025</MenuItem>
                  <MenuItem value="hws">Health Workshop Series</MenuItem>
                  <MenuItem value="cme">CME Program 2025</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 1.5, flex: 1 }}>
                <TextField
                  size="small"
                  placeholder="Search for names..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      color: 'white',
                      fontSize: '0.85rem',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#00C853' },
                    },
                    '& input::placeholder': { color: 'rgba(255,255,255,0.4)', opacity: 1 },
                  }}
                />

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#00C853',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    px: 2.5,
                    py: 1.1,
                    borderRadius: 2,
                    textTransform: 'none',
                    flexShrink: 0,
                    boxShadow: '0 4px 14px rgba(0,200,83,0.35)',
                    '&:hover': {
                      bgcolor: '#00A844',
                      boxShadow: '0 6px 20px rgba(0,200,83,0.45)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Box>

          {/* ── Table ── */}
          {/*
            KEY FIX: wrap the TableContainer in an outer Box with
            overflow: 'auto' so the table scrolls horizontally on
            narrow screens instead of being clipped.
          */}
          <Box
            sx={{
              width: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch', // smooth scroll on iOS
              /* Visible scrollbar on mobile */
              '&::-webkit-scrollbar': { height: 5 },
              '&::-webkit-scrollbar-track': { background: '#f1f5f9' },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(0,0,0,0.18)', borderRadius: 4 },
            }}
          >
            <Table sx={{ minWidth: 780 }}>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(90deg, #E53935 0%, #C62828 100%)' }}>
                  {[
                    { label: 'Doctor Name' },
                    { label: 'Activity Name' },
                    { label: 'Agreement' },
                    { label: 'FMV' },
                    { label: 'Receiving' },
                    { label: 'Invite by Link' },
                    { label: 'Approval Status' },
                  ].map((col) => (
                    <TableCell
                      key={col.label}
                      align="center"
                      sx={{
                        color: 'rgba(255,255,255,0.95)',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        py: 1.5,
                        px: { xs: 1.5, sm: 2 },
                        whiteSpace: 'nowrap',
                        borderBottom: 'none',
                      }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((doc, idx) => (
                    <TableRow
                      key={doc.id}
                      className="survey-row"
                      sx={{
                        bgcolor: idx % 2 === 0 ? '#ffffff' : '#fafbfd',
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          bgcolor: 'rgba(229,57,53,0.03)',
                          boxShadow: 'inset 3px 0 0 #E53935',
                        },
                        '&:last-child td': { border: 0 },
                      }}
                    >
                      {/* Doctor Name */}
                      <TableCell sx={{ py: 2, px: { xs: 1.5, sm: 2 }, whiteSpace: 'nowrap' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: '#1E293B' }}>
                          {doc.name}
                        </Typography>
                      </TableCell>

                      {/* Activity */}
                      <TableCell align="center" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                        <Chip
                          label={doc.title}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(229,57,53,0.08)',
                            color: '#C62828',
                            fontWeight: 600,
                            fontSize: '0.68rem',
                            border: '1px solid rgba(229,57,53,0.2)',
                            borderRadius: '6px',
                            height: 22,
                            whiteSpace: 'nowrap',
                          }}
                        />
                      </TableCell>

                      {/* Agreement */}
                      <TableCell align="center" sx={{ py: 2 }}>
                        <StatusBadge status={doc.survey} />
                      </TableCell>

                      {/* FMV */}
                      <TableCell align="center" sx={{ py: 2 }}>
                        <StatusBadge status={doc.document} />
                      </TableCell>

                      {/* Receiving */}
                      <TableCell align="center" sx={{ py: 2 }}>
                        <StatusBadge status="pending" />
                      </TableCell>

                      {/* Invite by Link */}
                      <TableCell align="center" sx={{ py: 2 }}>
                        <Tooltip title="Send Invite Link" arrow>
                          <Box
                            className="icon-btn-hover"
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              bgcolor: 'rgba(229,57,53,0.08)',
                              border: '1.5px solid rgba(229,57,53,0.2)',
                              cursor: 'pointer',
                              '&:hover': { bgcolor: 'rgba(229,57,53,0.15)', borderColor: '#E53935' },
                            }}
                          >
                            <EmailIcon sx={{ color: '#E53935', fontSize: 16 }} />
                          </Box>
                        </Tooltip>
                      </TableCell>

                      {/* Approval Status */}
                      <TableCell align="center" sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="View Agreement" arrow>
                            <Box
                              className="icon-btn-hover"
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                bgcolor: 'rgba(229,57,53,0.08)',
                                border: '1.5px solid rgba(229,57,53,0.2)',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: 'rgba(229,57,53,0.15)', borderColor: '#E53935' },
                              }}
                            >
                              <DescriptionIcon sx={{ color: '#E53935', fontSize: 16 }} />
                            </Box>
                          </Tooltip>
                          <Tooltip title="Download Agreement" arrow>
                            <Box
                              className="icon-btn-hover"
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255,179,0,0.08)',
                                border: '1.5px solid rgba(255,179,0,0.25)',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: 'rgba(255,179,0,0.18)', borderColor: '#FFB300' },
                              }}
                            >
                              <DownloadIcon sx={{ color: '#FFB300', fontSize: 16 }} />
                            </Box>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                      <HospitalIcon sx={{ fontSize: 48, color: '#E2E8F0', mb: 2 }} />
                      <Typography variant="h6" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                        No doctors found
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#CBD5E1', mt: 0.5 }}>
                        Try adjusting your search or filter criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

          {/* ── Footer ── */}
          <Box
            sx={{
              px: { xs: 2, sm: 4 },
              py: 2,
              bgcolor: '#f8fafc',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 500 }}>
              Showing <strong style={{ color: '#475569' }}>{filtered.length}</strong> of{' '}
              <strong style={{ color: '#475569' }}>{doctorsData.length}</strong> HCPs
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00C853' }} />
                <Typography sx={{ fontSize: '0.72rem', color: '#64748B' }}>Completed</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FFB300' }} />
                <Typography sx={{ fontSize: '0.72rem', color: '#64748B' }}>Pending</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MSADashboard;