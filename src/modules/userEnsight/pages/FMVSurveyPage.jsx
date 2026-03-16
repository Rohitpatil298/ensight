import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Container,
  Fade,
  alpha,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
} from "@mui/material";

import { Header } from "../layout/Header";
import { useLocation, useNavigate } from "react-router-dom";

const FMVSurveyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorData = location.state?.doctor;

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const surveyQuestions = [
    {
      id: "q1",
      type: "radio",
      question:
        "According to Eligibility of speaker, select an appropriate Category?",
      options: [
        "Category C Criteria (Honorarium - Up to Rs. 30,000)",
        "Category B Criteria (Honorarium - Up to Rs. 50,000)",
        "Category A Criteria (Honorarium - Up to Rs. 1,00,000)",
      ],
    },
    {
      id: "q2",
      type: "checkbox",
      question:
        "Requirement: To qualify for Category C as CME speaker/Advisory Board Member / Medical Survey, Consultant must meet all the criteria below",
      options: [
        "Licensed HCP or Para medic (e.g. Physician assistant, nurse educator, diabetes educator, clinical psychologist, pharmacist, dietician, etc.)",
        "Clinical Experience on topic",
        "Medical expertise, reputation or knowledge and experience in the Therapeutic Area",
      ],
    },
  ];

  const currentQuestion = surveyQuestions[currentStep - 1];

  const handleAnswerChange = (questionId, value) => {
    const question = surveyQuestions.find((q) => q.id === questionId);

    if (question.type === "checkbox") {
      setAnswers((prev) => {
        const existing = prev[questionId] || [];

        if (existing.includes(value)) {
          return {
            ...prev,
            [questionId]: existing.filter((v) => v !== value),
          };
        } else {
          return {
            ...prev,
            [questionId]: [...existing, value],
          };
        }
      });
    } else {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < surveyQuestions.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    console.log("Survey Submitted:", {
      doctor: doctorData,
      answers: answers,
    });
    // Add your submission logic here
    navigate("/users/survey", {
      state: { message: "Survey submitted successfully!" },
    });
  };

  const canProceed = () => {
    if (!currentQuestion) return false;

    const answer = answers[currentQuestion.id];

    if (currentQuestion.type === "checkbox") {
      return (
        Array.isArray(answer) &&
        answer.length === currentQuestion.options.length
      );
    }

    return answer !== undefined;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(145deg, #f8fafc 0%, #eef1f5 40%, #f0f2f7 100%)",
      }}
    >
      {/* Background Layer with Medical Image */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* Medical photo */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1px) saturate(0.7)",
            animation: "slowDrift 28s ease-in-out infinite",
          }}
        />

        {/* Gradient overlays */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(248,250,252,0.7) 0%, rgba(240,242,247,0.85) 100%)",
          }}
        />

        {/* Decorative orbs */}
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            right: "-8%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-12%",
            left: "-6%",
            width: 450,
            height: 450,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,200,83,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Header */}
      <Box sx={{ position: "relative", zIndex: 10 }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 5, py: 6 }}>
        <Box>
          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "#64748b",
              mb: 4,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            Fair Market Value (FMV) / Eligibility
          </Typography>

          {/* Password Form Container */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 10px 60px rgba(0,0,0,0.15)",
              border: "1px solid rgba(255,255,255,0.9)",
              p: 5,
            }}
          >
            {/* Form Fields */}
            <Box sx={{ maxWidth: 600, mx: "auto" }}>
              <Fade in={mounted} timeout={500}>
                <Box>
                  {currentQuestion && (
                    <>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 5,
                          fontWeight: 700,
                          color: "#1E293B",
                          lineHeight: 1.6,
                        }}
                      >
                        {currentQuestion.question}
                      </Typography>

                      {currentQuestion.type === "radio" ? (
                        <RadioGroup
                          value={answers[currentQuestion.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(
                              currentQuestion.id,
                              e.target.value,
                            )
                          }
                        >
                          {currentQuestion.options.map((option, index) => (
                            <Paper
                              key={index}
                              elevation={0}
                              sx={{
                                mb: 2.5,
                                border: "3px solid",
                                borderColor:
                                  answers[currentQuestion.id] === option
                                    ? "#00C853"
                                    : "#e2e8f0",
                                borderRadius: 3,
                                cursor: "pointer",
                                bgcolor:
                                  answers[currentQuestion.id] === option
                                    ? alpha("#00C853", 0.08)
                                    : "white",
                              }}
                              onClick={() =>
                                handleAnswerChange(currentQuestion.id, option)
                              }
                            >
                              <FormControlLabel
                                value={option}
                                control={<Radio />}
                                label={option}
                                sx={{ width: "100%", m: 0, py: 2.5, px: 2 }}
                              />
                            </Paper>
                          ))}
                        </RadioGroup>
                      ) : (
                        <Box>
                          {currentQuestion.options.map((option, index) => {
                            const selected =
                              answers[currentQuestion.id]?.includes(option) ||
                              false;

                            return (
                              <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                  mb: 2.5,
                                  border: "3px solid",
                                  borderColor: selected ? "#00C853" : "#e2e8f0",
                                  borderRadius: 3,
                                  cursor: "pointer",
                                  bgcolor: selected
                                    ? alpha("#00C853", 0.08)
                                    : "white",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    borderColor: "#00C853",
                                    transform: "translateX(6px)",
                                  },
                                }}
                                onClick={() =>
                                  handleAnswerChange(currentQuestion.id, option)
                                }
                              >
                                <FormControlLabel
                                  sx={{ width: "100%", m: 0, py: 2.5, px: 2 }}
                                  control={
                                    <Checkbox
                                      checked={selected}
                                      onChange={() =>
                                        handleAnswerChange(
                                          currentQuestion.id,
                                          option,
                                        )
                                      }
                                      onClick={(e) => e.stopPropagation()} // 🔥 prevent double trigger
                                    />
                                  }
                                  label={option}
                                />
                              </Paper>
                            );
                          })}
                        </Box>
                      )}

                      {/* Navigation Buttons */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 3,
                          mt: 4,
                        }}
                      >
                        <Button
                          onClick={handleBack}
                          sx={{
                            px: 6,
                            py: 1.8,
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "white",
                            bgcolor: "#E53935",
                            borderRadius: 2,
                            textTransform: "uppercase",
                            minWidth: 160,
                            boxShadow: "0 4px 12px rgba(229,57,53,0.3)",
                            "&:hover": {
                              bgcolor: "#C62828",
                              boxShadow: "0 6px 16px rgba(229,57,53,0.4)",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          Back
                        </Button>

                        {currentStep < surveyQuestions.length ? (
                          <Button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            sx={{
                              px: 6,
                              py: 1.8,
                              fontSize: "1rem",
                              fontWeight: 700,
                              color: "white",
                              bgcolor: "#00C853",
                              borderRadius: 2,
                              textTransform: "uppercase",
                              minWidth: 160,
                              boxShadow: "0 4px 12px rgba(0,200,83,0.3)",
                              "&:hover": {
                                bgcolor: "#00A844",
                                boxShadow: "0 6px 16px rgba(0,200,83,0.4)",
                                transform: "translateY(-2px)",
                              },
                              "&:disabled": {
                                bgcolor: "#cbd5e1",
                                color: "#94a3b8",
                                boxShadow: "none",
                              },
                            }}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            onClick={handleSubmit}
                            disabled={!canProceed()}
                            sx={{
                              px: 6,
                              py: 1.8,
                              fontSize: "1rem",
                              fontWeight: 700,
                              color: "white",
                              bgcolor: "#00C853",
                              borderRadius: 2,
                              textTransform: "uppercase",
                              minWidth: 160,
                              boxShadow: "0 4px 12px rgba(0,200,83,0.3)",
                              "&:hover": {
                                bgcolor: "#00A844",
                                boxShadow: "0 6px 16px rgba(0,200,83,0.4)",
                                transform: "translateY(-2px)",
                              },
                              "&:disabled": {
                                bgcolor: "#cbd5e1",
                                color: "#94a3b8",
                                boxShadow: "none",
                              },
                            }}
                          >
                            Submit
                          </Button>
                        )}
                      </Box>
                    </>
                  )}
                </Box>
              </Fade>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default FMVSurveyPage;
