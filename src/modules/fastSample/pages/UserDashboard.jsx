import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Checkbox,
} from '@mui/material';
import { FastSampleUserHeader } from '../layout/FastSampleUserHeader';

/* ─── Keyframe Injector ─────────────────────────────────────── */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  
  @keyframes slowDrift {
    0%   { transform: scale(1)   translate(0px, 0px); }
    33%  { transform: scale(1.04) translate(-8px, 6px); }
    66%  { transform: scale(1.02) translate(6px, -4px); }
    100% { transform: scale(1)   translate(0px, 0px); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .dashboard-row {
    animation: rowIn 0.35s ease forwards;
  }
`;
if (!document.head.querySelector('[data-user-dashboard-styles]')) {
  styleTag.setAttribute('data-user-dashboard-styles', '');
  document.head.appendChild(styleTag);
}

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [mounted, setMounted] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Handle select all
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(dashboardData.map((_, idx) => idx));
    } else {
      setSelectedRows([]);
    }
  };

  // Handle individual row selection
  const handleRowSelect = (idx) => {
    setSelectedRows(prev => 
      prev.includes(idx) 
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

  // Sample data - replace with actual data from API
  const dashboardData = [
    {
      date: '2026-02-20',
      doctorName: 'Dr. Rajesh Kumar',
      status: 'Pending',
      approvalStage: 'Level 1',
      requestLetter: 'View',
      inviteLink: 'Send',
      editRequest: 'Edit',
    },
    {
      date: '2026-02-19',
      doctorName: 'Dr. Priya Sharma',
      status: 'Approved',
      approvalStage: 'Level 2',
      requestLetter: 'View',
      inviteLink: 'Send',
      editRequest: 'Edit',
    },
    {
      date: '2026-02-18',
      doctorName: 'Dr. Amit Patel',
      status: 'Pending',
      approvalStage: 'Level 1',
      requestLetter: 'View',
      inviteLink: 'Send',
      editRequest: 'Edit',
    },
    {
      date: '2026-02-17',
      doctorName: 'Dr. Sunita Verma',
      status: 'Rejected',
      approvalStage: 'Level 1',
      requestLetter: 'View',
      inviteLink: 'Send',
      editRequest: 'Edit',
    },
    {
      date: '2026-02-16',
      doctorName: 'Dr. Rahul Mehta',
      status: 'Approved',
      approvalStage: 'Level 3',
      requestLetter: 'View',
      inviteLink: 'Send',
      editRequest: 'Edit',
    },
  ];

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
      {/* Background Layer with Medical Image */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Medical photo */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
            filter: 'blur(1px) saturate(0.7)',
            animation: 'slowDrift 28s ease-in-out infinite',
          }}
        />
        
        {/* Gradient overlays */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(248,250,252,0.7) 0%, rgba(240,242,247,0.85) 100%)',
          }}
        />

        {/* Decorative orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            right: '-8%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-12%',
            left: '-6%',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,163,0,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Header */}
      {/* <Box sx={{ position: 'relative', zIndex: 10 }}>
        <FastSampleUserHeader   onMenuClick={handleDrawerToggle}/>
      </Box> */}

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 5, py: 6 }}>
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#1e293b',
            mb: 4,
            animation: mounted ? 'fadeInUp 0.6s ease' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        >
          Dashboard
        </Typography>

        {/* Tab Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4,
            animation: mounted ? 'fadeInUp 0.6s ease 0.1s both' : 'none',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <Button
              onClick={() => setActiveTab('pending')}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                bgcolor: activeTab === 'pending' ? '#1565C0' : 'white',
                color: activeTab === 'pending' ? 'white' : '#64748b',
                borderRadius: 0,
                minWidth: 140,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: activeTab === 'pending' ? '#0d47a1' : '#f1f5f9',
                },
              }}
            >
              Pending
            </Button>
            <Button
              onClick={() => setActiveTab('all')}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                bgcolor: activeTab === 'all' ? '#1565C0' : 'white',
                color: activeTab === 'all' ? 'white' : '#64748b',
                borderRadius: 0,
                minWidth: 140,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: activeTab === 'all' ? '#0d47a1' : '#f1f5f9',
                },
              }}
            >
              All
            </Button>
          </Box>
        </Box>

        {/* Dashboard Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 10px 60px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.9)',
            animation: mounted ? 'fadeInUp 0.6s ease 0.2s both' : 'none',
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: 'linear-gradient(135deg, #0d47a1 0%, #1565C0 100%)',
                  }}
                >
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      py: 2,
                      borderBottom: 'none',
                      minWidth: 150,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        size="small"
                        checked={selectedRows.length === dashboardData.length && dashboardData.length > 0}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < dashboardData.length}
                        onChange={handleSelectAll}
                        sx={{
                          color: 'white',
                          '&.Mui-checked': { color: 'white' },
                          '&.MuiCheckbox-indeterminate': { color: 'white' },
                        }}
                      />
                      <Button
                        size="small"
                        sx={{
                          bgcolor: '#00C853',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          textTransform: 'none',
                          minWidth: 'auto',
                          '&:hover': { bgcolor: '#00A844' },
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          bgcolor: '#E53935',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          textTransform: 'none',
                          minWidth: 'auto',
                          '&:hover': { bgcolor: '#C62828' },
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      py: 2,
                      borderBottom: 'none',
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      py: 2,
                      borderBottom: 'none',
                    }}
                  >
                    Doctor Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      py: 2,
                      borderBottom: 'none',
                    }}
                  >
                    My Status
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      py: 2,
                      borderBottom: 'none',
                    }}
                  >
                    Approval Stage
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      py: 2,
                      borderBottom: 'none',
                    }}
                  >
                    View Request Letter
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      py: 2,
                      borderBottom: 'none',
                    }}
                  >
                    Invite by Link
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      py: 2,
                      borderBottom: 'none',
                    }}
                  >
                    Edit Request
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dashboardData.length > 0 ? (
                  dashboardData.map((row, idx) => (
                    <TableRow
                      key={idx}
                      className="dashboard-row"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                      sx={{
                        bgcolor: idx % 2 === 0 ? '#ffffff' : '#fafbfd',
                        borderBottom: '1px solid #f1f5f9',
                        '&:hover': {
                          bgcolor: 'rgba(21,101,192,0.03)',
                        },
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Checkbox 
                          size="small" 
                          checked={selectedRows.includes(idx)}
                          onChange={() => handleRowSelect(idx)}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2, fontSize: '0.85rem', color: '#475569' }}>
                        {row.date}
                      </TableCell>
                      <TableCell sx={{ py: 2, fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>
                        {row.doctorName}
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            bgcolor: row.status === 'Approved' 
                              ? 'rgba(0,200,83,0.1)' 
                              : row.status === 'Rejected'
                              ? 'rgba(229,57,53,0.1)'
                              : 'rgba(255,179,0,0.1)',
                            color: row.status === 'Approved'
                              ? '#00C853'
                              : row.status === 'Rejected'
                              ? '#E53935'
                              : '#FFB300',
                            border: `1px solid ${
                              row.status === 'Approved'
                                ? '#00C853'
                                : row.status === 'Rejected'
                                ? '#E53935'
                                : '#FFB300'
                            }`,
                          }}
                        >
                          {row.status}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            bgcolor: 'rgba(21,101,192,0.1)',
                            color: '#1565C0',
                            border: '1px solid #1565C0',
                          }}
                        >
                          {row.approvalStage}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Button
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: '#1565C0',
                            textTransform: 'none',
                            minWidth: 'auto',
                            '&:hover': {
                              bgcolor: 'rgba(21,101,192,0.1)',
                            },
                          }}
                        >
                          {row.requestLetter}
                        </Button>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Button
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: '#1565C0',
                            textTransform: 'none',
                            minWidth: 'auto',
                            '&:hover': {
                              bgcolor: 'rgba(21,101,192,0.1)',
                            },
                          }}
                        >
                          {row.inviteLink}
                        </Button>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Button
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: '#1565C0',
                            textTransform: 'none',
                            minWidth: 'auto',
                            '&:hover': {
                              bgcolor: 'rgba(21,101,192,0.1)',
                            },
                          }}
                        >
                          {row.editRequest}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                      sx={{
                        py: 12,
                        borderBottom: 'none',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: '#E53935',
                        }}
                      >
                        No Records
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserDashboard;