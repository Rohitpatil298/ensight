import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Container,
  LinearProgress,
  Fade,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Chip,
  alpha,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Send as SendIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Header } from '../layout/Header';

/* ─── Keyframe Injector ─────────────────────────────────────── */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .survey-question {
    animation: fadeInUp 0.5s ease forwards;
  }
  .step-active {
    animation: pulse 0.6s ease;
  }
`;
if (!document.head.querySelector('[data-survey-take-styles]')) {
  styleTag.setAttribute('data-survey-take-styles', '');
  document.head.appendChild(styleTag);
}

const TakeSurveyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorData = location.state?.doctor;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [answers, setAnswers] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Survey questions data
  const surveyQuestions = [
    {
      id: 'q1',
      question: 'Does pneumococcal vaccine provide protection from S. pneumoniae infection in COPD patients?',
      options: ['Yes', 'No'],
    },
    {
      id: 'q2',
      question: 'Do you recommend pneumococcal vaccination to your COPD patients?',
      options: ['Always', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 'q3',
      question: 'Which pneumococcal vaccine do you prefer for COPD patients?',
      options: ['PCV13', 'PPSV23', 'Both', 'None'],
    },
    {
      id: 'q4',
      question: 'At what stage of COPD do you recommend pneumococcal vaccination?',
      options: ['Early Stage', 'Moderate Stage', 'Severe Stage', 'All Stages'],
    },
    {
      id: 'q5',
      question: 'Have you observed any adverse effects with pneumococcal vaccination?',
      options: ['Yes, Frequently', 'Yes, Occasionally', 'Rarely', 'Never'],
    },
    {
      id: 'q6',
      question: 'Would you recommend pneumococcal vaccination to other healthcare professionals?',
      options: ['Definitely Yes', 'Probably Yes', 'Not Sure', 'No'],
    },
  ];

  const isTermsStep = currentStep === 0;
  const totalSteps = surveyQuestions.length + 1;
  const currentQuestion = surveyQuestions[currentStep - 1];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    console.log('Survey Submitted:', {
      doctor: doctorData,
      answers: answers,
    });
    // Add your submission logic here
    navigate('/users/survey/practice-type', { 
      state: { message: 'Survey submitted successfully!' } 
    });
  };

  const canProceed = () => {
    if (isTermsStep) {
      return acceptedTerms;
    }
    if (currentQuestion) {
      return answers[currentQuestion.id] !== undefined;
    }
    return false;
  };

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
      {/* Background Layer */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px) saturate(0.7)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(248,250,252,0.7) 0%, rgba(240,242,247,0.85) 100%)',
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
            background: 'radial-gradient(circle, rgba(0,200,83,0.12) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(229,57,53,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Header */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5, py: 6 }}>
        <Fade in={mounted} timeout={600}>
          <Box>
            {/* Top Info Card */}
            {/* <Card
              elevation={0}
              sx={{
                mb: 4,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #00C853 0%, #00A844 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(0,200,83,0.25)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                      Survey Questionnaire
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                      Doctor: {doctorData?.name || 'Survey Participant'}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Step {currentStep + 1} / {totalSteps}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {isTermsStep ? 'Terms & Conditions' : `Question ${currentStep}`}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'white',
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card> */}

            {/* Main Survey Paper */}
            <Paper
              elevation={0}
              className="survey-question"
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 60px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.9)',
                mb: 3,
              }}
            >
              {/* Stepper */}
              {/* <Box sx={{ p: 4, pb: 2, bgcolor: alpha('#00C853', 0.03) }}>
                <Stepper activeStep={currentStep} alternativeLabel>
                  {['Terms', ...surveyQuestions.map((_, i) => `Q${i + 1}`)].map((label, index) => (
                    <Step key={label} completed={index < currentStep}>
                      <StepLabel
                        StepIconProps={{
                          sx: {
                            '&.Mui-active': {
                              color: '#00C853',
                            },
                            '&.Mui-completed': {
                              color: '#00C853',
                            },
                          },
                        }}
                      >
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                          {label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Divider /> */}

              {/* Content Area */}
              <Box sx={{ p: 6, minHeight: 450 }}>
                {isTermsStep ? (
                  // Terms & Conditions
                  <Fade in={isTermsStep} timeout={500}>
                    <Box>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          bgcolor: '#f8fafc',
                          mb: 4,
                          '&::-webkit-scrollbar': {
                            width: '8px',
                          },
                          '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '10px',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: '#00C853',
                            borderRadius: '10px',
                          },
                        }}
                      >
                        {[
                          'The Participant agrees and undertakes not to assign or delegate his/her obligation to answer the questionnaire for the Survey to his/her compounders, nurses secretary or assistants.',
                          'The Participant confirm that he/she shall not infringe or violate or interfere with any intellectual property right and/or property right and/or any other rights available to or vested in any third party(ies) while answering the Survey.',
                          'The Participant agrees and acknowledges that the Company will be fully entitled to use any and all ideas or suggestions and data received, created or generated during the Survey.',
                          'The Participant shall duly comply with all law, including but not limited to, applicable anti-corruption laws.',
                          'Neither Party shall have any right or authority whatsoever to represent or bind the other Party in any way.',
                          'If any provision of these Terms & Conditions is held invalid by a court of competent jurisdiction, the remaining provisions shall nonetheless be enforceable according to the terms of this agreement.',
                          'The Participant confirms that he/she is permitted under applicable laws and regulations, including the Medical Council of India guidelines to execute these Terms & Conditions and to participate in the Survey.',
                          'If required, the Participant shall obtain written approval, from the Participant\'s institution/ body/authority/ council or any such third party that the Participant might be affiliated/employed/engaged.',
                          'These Terms & Conditions will be governed in all respects by Indian law and the parties hereby submit to the exclusive jurisdiction of the courts in Mumbai.',
                          'the remaining provisions shall nonetheless be enforceable according to the terms of this agreement.',
                        ].map((text, index) => (
                          <Box
                            key={index}
                            sx={{
                              mb: 3,
                              p: 2.5,
                              bgcolor: 'white',
                              borderRadius: 2,
                              border: '1px solid #e2e8f0',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                borderColor: '#00C853',
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#475569',
                                lineHeight: 1.8,
                                fontSize: '0.95rem',
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  fontWeight: 700,
                                  color: '#00C853',
                                  fontSize: '1.1rem',
                                  mr: 1,
                                }}
                              >
                                {index + 1}.
                              </Box>
                              {text}
                            </Typography>
                          </Box>
                        ))}
                      </Paper>

                      <Paper
                        elevation={0}
                        onClick={() => setAcceptedTerms(!acceptedTerms)}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={acceptedTerms}
                              onChange={(e) => setAcceptedTerms(e.target.checked)}
                              sx={{
                                color: '#00C853',
                                '&.Mui-checked': {
                                  color: '#00C853',
                                },
                                '& .MuiSvgIcon-root': {
                                  fontSize: 32,
                                },
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1E293B' }}>
                              I Accept the Terms & Conditions
                            </Typography>
                          }
                        />
                      </Paper>
                    </Box>
                  </Fade>
                ) : (
                  // Survey Question
                  <Fade in={!isTermsStep} timeout={500}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Chip
                          label={`Question ${currentStep} of ${surveyQuestions.length}`}
                          sx={{
                            bgcolor: alpha('#00C853', 0.1),
                            color: '#00C853',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            height: 32,
                            borderRadius: 2,
                          }}
                        />
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          mb: 5,
                          fontWeight: 700,
                          color: '#1E293B',
                          lineHeight: 1.6,
                        }}
                      >
                        {currentQuestion?.question}
                      </Typography>

                      <RadioGroup
                        value={answers[currentQuestion?.id] || ''}
                        onChange={(e) => handleAnswerChange(currentQuestion?.id, e.target.value)}
                      >
                        {currentQuestion?.options?.map((option, index) => (
                          <Paper
                            key={index}
                            elevation={0}
                            sx={{
                              mb: 2.5,
                              p: 0,
                              border: '3px solid',
                              borderColor:
                                answers[currentQuestion?.id] === option ? '#00C853' : '#e2e8f0',
                              borderRadius: 3,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              bgcolor:
                                answers[currentQuestion?.id] === option
                                  ? alpha('#00C853', 0.08)
                                  : 'white',
                              '&:hover': {
                                borderColor:
                                  answers[currentQuestion?.id] === option ? '#00C853' : '#cbd5e1',
                                transform: 'translateX(8px)',
                                boxShadow:
                                  answers[currentQuestion?.id] === option
                                    ? '0 8px 24px rgba(0,200,83,0.2)'
                                    : '0 4px 12px rgba(0,0,0,0.08)',
                              },
                            }}
                            onClick={() => handleAnswerChange(currentQuestion?.id, option)}
                          >
                            <FormControlLabel
                              value={option}
                              control={
                                <Radio
                                  sx={{
                                    color: '#cbd5e1',
                                    '&.Mui-checked': {
                                      color: '#00C853',
                                    },
                                    '& .MuiSvgIcon-root': {
                                      fontSize: 28,
                                    },
                                  }}
                                />
                              }
                              label={
                                <Typography
                                  sx={{
                                    fontWeight:
                                      answers[currentQuestion?.id] === option ? 700 : 500,
                                    color: '#1E293B',
                                    fontSize: '1.05rem',
                                  }}
                                >
                                  {option}
                                </Typography>
                              }
                              sx={{ width: '100%', m: 0, py: 2.5, px: 2 }}
                            />
                          </Paper>
                        ))}
                      </RadioGroup>
                    </Box>
                  </Fade>
                )}
              </Box>

              <Divider />

              {/* Footer Navigation */}
              <Box
                sx={{
                  px: 6,
                  py: 3.5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: alpha('#f8fafc', 0.8),
                }}
              >
                <Button
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'white',
                    bgcolor: '#E53935',
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(229,57,53,0.3)',
                    '&:hover': {
                      bgcolor: '#C62828',
                      boxShadow: '0 6px 16px rgba(229,57,53,0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {currentStep === 0 ? 'Cancel' : 'Back'}
                </Button>

                {currentStep === totalSteps - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    endIcon={<SendIcon />}
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'white',
                      bgcolor: '#00C853',
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
                      '&:hover': {
                        bgcolor: '#00A844',
                        boxShadow: '0 6px 16px rgba(0,200,83,0.4)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        bgcolor: '#cbd5e1',
                        color: '#94a3b8',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Submit Survey
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'white',
                      bgcolor: '#00C853',
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
                      '&:hover': {
                        bgcolor: '#00A844',
                        boxShadow: '0 6px 16px rgba(0,200,83,0.4)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        bgcolor: '#cbd5e1',
                        color: '#94a3b8',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Continue
                  </Button>
                )}
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default TakeSurveyPage;
