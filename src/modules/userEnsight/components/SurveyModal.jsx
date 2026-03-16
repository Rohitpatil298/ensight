import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Fade,
  LinearProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const SurveyModal = ({ open, onClose, doctorData, surveyData }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = Terms, 1+ = Questions
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [answers, setAnswers] = useState({});

  const isTermsStep = currentStep === 0;
  const totalSteps = (surveyData?.questions?.length || 0) + 1; // +1 for terms
  const currentQuestion = surveyData?.questions?.[currentStep - 1];

  // Handle answer change
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Handle next
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle back
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    console.log('Survey Submitted:', {
      doctor: doctorData,
      answers: answers,
    });
    // Add your submission logic here
    onClose();
    resetModal();
  };

  // Reset modal state
  const resetModal = () => {
    setCurrentStep(0);
    setAcceptedTerms(false);
    setAnswers({});
  };

  // Close handler
  const handleClose = () => {
    onClose();
    resetModal();
  };

  // Check if can proceed
  const canProceed = () => {
    if (isTermsStep) {
      return acceptedTerms;
    }
    if (currentQuestion) {
      return answers[currentQuestion.id] !== undefined;
    }
    return false;
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        },
      }}
    >
      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          bgcolor: 'rgba(0,200,83,0.1)',
          '& .MuiLinearProgress-bar': {
            bgcolor: '#00C853',
          },
        }}
      />

      {/* Header */}
      <Box
        sx={{
          px: 4,
          py: 3,
          background: 'linear-gradient(135deg, #00C853 0%, #00A844 100%)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            {isTermsStep ? 'Terms & Conditions' : 'Survey Question'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {doctorData?.name || 'Doctor Survey'}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.15)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.25)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ minHeight: 400, p: 5 }}>
          {isTermsStep ? (
            // Terms & Conditions
            <Fade in={isTermsStep} timeout={500}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: '#1E293B',
                  }}
                >
                  I Hereby Section
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 2,
                    maxHeight: 320,
                    overflowY: 'auto',
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      mb: 2,
                    }}
                  >
                    <strong>11.</strong> The Participant agrees and undertakes not to assign or delegate
                    his/her obligation to answer the questionnaire for the Survey to his/her compounders,
                    nurses secretary or assistants.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      mb: 2,
                    }}
                  >
                    <strong>12.</strong> The Participant confirm that he/she shall not infringe or violate
                    or interfere with any intellectual property right and/or property right and/or any other
                    rights available to or vested in any third party(ies) while answering the Survey.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      mb: 2,
                    }}
                  >
                    <strong>13.</strong> The Participant agrees and acknowledges that the Company will be
                    fully entitled to use any and all ideas or suggestions and data received, created or
                    generated during the Survey.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      mb: 2,
                    }}
                  >
                    <strong>14.</strong> The Participant shall duly comply with all law, including but not
                    limited to, applicable anti-corruption laws.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      mb: 2,
                    }}
                  >
                    <strong>15.</strong> Neither Party shall have any right or authority whatsoever to
                    represent or bind the other Party in any way.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      mb: 2,
                    }}
                  >
                    <strong>16.</strong> If any provision of these Terms & Conditions is held invalid by a
                    court of competent jurisdiction, the remaining provisions shall nonetheless be
                    enforceable according to the terms of this agreement.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      mb: 2,
                    }}
                  >
                    <strong>17.</strong> The Participant confirms that he/she is permitted under applicable
                    laws and regulations, including the Medical Council of India guidelines to execute these
                    Terms & Conditions and to participate in the Survey.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      mb: 2,
                    }}
                  >
                    <strong>18.</strong> If required, the Participant shall obtain written approval, from
                    the Participant's institution/ body/authority/ council or any such third party that the
                    Participant might be affiliated/employed/engaged.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                    }}
                  >
                    <strong>19.</strong> These Terms & Conditions will be governed in all respects by Indian
                    law and the parties hereby submit to the exclusive jurisdiction of the courts in Mumbai.
                  </Typography>
                </Paper>

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
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontWeight: 600, color: '#1E293B' }}>
                      I Accept
                    </Typography>
                  }
                />
              </Box>
            </Fade>
          ) : (
            // Survey Question
            <Fade in={!isTermsStep} timeout={500}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: '#64748b',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.5px',
                  }}
                >
                  Question {currentStep} of {totalSteps - 1}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    fontWeight: 600,
                    color: '#1E293B',
                    lineHeight: 1.5,
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
                        mb: 2,
                        p: 2.5,
                        border: '2px solid',
                        borderColor:
                          answers[currentQuestion?.id] === option
                            ? '#00C853'
                            : '#e2e8f0',
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        bgcolor:
                          answers[currentQuestion?.id] === option
                            ? 'rgba(0,200,83,0.05)'
                            : 'white',
                        '&:hover': {
                          borderColor:
                            answers[currentQuestion?.id] === option
                              ? '#00C853'
                              : '#cbd5e1',
                          transform: 'translateX(4px)',
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
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontWeight:
                                answers[currentQuestion?.id] === option ? 600 : 400,
                              color: '#1E293B',
                            }}
                          >
                            {option}
                          </Typography>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                  ))}
                </RadioGroup>
              </Box>
            </Fade>
          )}
        </Box>
      </DialogContent>

      <Divider />

      {/* Footer */}
      <Box
        sx={{
          px: 5,
          py: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#f8fafc',
        }}
      >
        <Button
          onClick={handleBack}
          disabled={currentStep === 0}
          startIcon={<ArrowBackIcon />}
          sx={{
            px: 4,
            py: 1.2,
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'white',
            bgcolor: '#E53935',
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#C62828',
            },
            '&:disabled': {
              bgcolor: '#cbd5e1',
              color: '#94a3b8',
            },
          }}
        >
          Back
        </Button>

        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
          Step {currentStep + 1} of {totalSteps}
        </Typography>

        {currentStep === totalSteps - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed()}
            endIcon={<SendIcon />}
            sx={{
              px: 4,
              py: 1.2,
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'white',
              bgcolor: '#00C853',
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
              '&:hover': {
                bgcolor: '#00A844',
                boxShadow: '0 6px 16px rgba(0,200,83,0.4)',
              },
              '&:disabled': {
                bgcolor: '#cbd5e1',
                color: '#94a3b8',
                boxShadow: 'none',
              },
            }}
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            endIcon={<CheckCircleIcon />}
            sx={{
              px: 4,
              py: 1.2,
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'white',
              bgcolor: '#00C853',
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
              '&:hover': {
                bgcolor: '#00A844',
                boxShadow: '0 6px 16px rgba(0,200,83,0.4)',
              },
              '&:disabled': {
                bgcolor: '#cbd5e1',
                color: '#94a3b8',
                boxShadow: 'none',
              },
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </Dialog>
  );
};

export default SurveyModal;
