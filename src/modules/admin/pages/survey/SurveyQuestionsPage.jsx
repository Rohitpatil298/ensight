import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  alpha,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add,
  ArrowBack,
  DeleteOutline,
  Download,
  EditOutlined,
  Search,
  UploadFile,
} from '@mui/icons-material';

const surveyCatalog = {
  32: { id: 32, shortTitle: 'Test-Survey' },
  33: { id: 33, shortTitle: 'hhh' },
  34: { id: 34, shortTitle: 'Durgesh' },
};

const initialQuestions = [
  {
    id: 428,
    question: 'Do you use electronic medical records (EMR) in your practice?',
    answers: 'Yes, No, Planning to Implement',
    type: 'MCQ',
    status: 'Enabled',
    required: true,
    createdAt: '2024-06-15',
  },
  {
    id: 427,
    question: 'What factors limit optimal patient outcomes in your practice?',
    answers:
      'Patient Awareness, Financial Constraints, Time Limitations, Infrastructure, Follow-up Issues',
    type: 'MCQ',
    status: 'Enabled',
    required: true,
    createdAt: '2024-06-14',
  },
  {
    id: 426,
    question: 'Which patient age group do you treat most frequently?',
    answers: 'Pediatric, Adult, Geriatric, Mixed',
    type: 'MCQ',
    status: 'Enabled',
    required: true,
    createdAt: '2024-06-13',
  },
  {
    id: 425,
    question: 'How often do you follow standard treatment guidelines?',
    answers: 'Always, Often, Sometimes, Rarely, Never',
    type: 'MCQ',
    status: 'Enabled',
    required: true,
  },
  {
    id: 424,
    question: 'Please share any suggestions to improve patient care outcomes.',
    answers: '-',
    type: 'Descriptive',
    status: 'Enabled',
    required: false,
    createdAt: '2024-06-12',
  },
  {
    id: 423,
    question: 'Are digital tools helpful in your clinical practice?',
    answers: 'Yes, No, Somewhat',
    type: 'MCQ',
    status: 'Enabled',
    required: true,
    createdAt: '2024-06-11',
  },
  {
    id: 422,
    question: 'What improvements would you like to see in pharmaceutical company support?',
    answers: '-',
    type: 'Descriptive',
    status: 'Enabled',
    required: false,
    createdAt: '2024-06-10',
  },
  {
    id: 421,
    question: 'How would you rate the quality of interactions with Medical Representatives?',
    answers: 'Excellent, Good, Average, Poor',
    type: 'MCQ',
    status: 'Enabled',
    required: true,
    createdAt: '2024-06-09',
  },
  {
    id: 420,
    question: 'If yes, what is the main reason for prescribing generics?',
    answers: 'Cost Effective, Similar Efficacy, Availability, Other (Please Specify)',
    type: 'MCQ',
    status: 'Enabled',
    required: true,
    createdAt: '2024-06-08',
  },
  {
    id: 419,
    question: 'Would you recommend generic medicines to your patients?',
    answers: 'Yes, No, Sometimes',
    type: 'MCQ',
    status: 'Enabled',
    required: true,
    createdAt: '2024-06-07',
  },
];

const emptyForm = {
  question: '',
  answers: '',
  type: 'MCQ',
  status: 'Enabled',
};

export function SurveyQuestionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { surveyId } = useParams();

  const currentSurvey =
    location.state?.survey ||
    surveyCatalog[surveyId] || {
      id: surveyId,
      shortTitle: `Survey ${surveyId}`,
    };

  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');
  const [uploadMessage, setUploadMessage] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [questionFilter, setQuestionFilter] = useState('');
  const [answerFilter, setAnswerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [questionForm, setQuestionForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  const filteredQuestions = questions.filter((item) => {
    const matchesType = !typeFilter || item.type === typeFilter;
    const matchesQuestion = item.question
      .toLowerCase()
      .includes(questionFilter.trim().toLowerCase());
    const matchesAnswer = item.answers
      .toLowerCase()
      .includes(answerFilter.trim().toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;

    return matchesType && matchesQuestion && matchesAnswer && matchesStatus;
  });

  const paginatedQuestions = filteredQuestions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const requiredQuestionCount = questions.filter((item) => item.required).length;

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setSelectedFileName(file?.name || 'No file chosen');
    setUploadMessage('');
  };

  const handleUploadSubmit = () => {
    if (selectedFileName === 'No file chosen') {
      setUploadMessage('Please select a CSV file before submitting.');
      return;
    }

    setUploadMessage(`Ready to import ${selectedFileName}. CSV parsing can be connected to the API next.`);
  };

  const handleDownloadFormat = () => {
    const csvContent = [
      'question,answers,type,status',
      'Sample question,"Option 1|Option 2|Option 3",MCQ,Enabled',
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', 'question-format.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

  const resetQuestionForm = () => {
    setEditingQuestionId(null);
    setQuestionForm(emptyForm);
    setFormError('');
  };

  const openCreateDialog = () => {
    resetQuestionForm();
    setDialogOpen(true);
  };

  const openEditDialog = (question) => {
    setEditingQuestionId(question.id);
    setQuestionForm({
      question: question.question,
      answers: question.answers === '-' ? '' : question.answers,
      type: question.type,
      status: question.status,
    });
    setFormError('');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    resetQuestionForm();
  };

  const handleQuestionFormChange = (event) => {
    const { name, value } = event.target;
    setQuestionForm((previous) => ({
      ...previous,
      [name]: value,
    }));
    if (formError) {
      setFormError('');
    }
  };

  const handleSaveQuestion = () => {
    if (!questionForm.question.trim()) {
      setFormError('Question is required.');
      return;
    }

    if (questionForm.type === 'MCQ' && !questionForm.answers.trim()) {
      setFormError('Answers are required for MCQ questions.');
      return;
    }

    if (editingQuestionId) {
      setQuestions((previous) =>
        previous.map((item) =>
          item.id === editingQuestionId
            ? {
                ...item,
                question: questionForm.question.trim(),
                answers:
                  questionForm.type === 'Descriptive'
                    ? '-'
                    : questionForm.answers.trim(),
                type: questionForm.type,
                status: questionForm.status,
              }
            : item,
        ),
      );
    } else {
      setQuestions((previous) => [
        {
          id: Math.max(...previous.map((item) => item.id)) + 1,
          question: questionForm.question.trim(),
          answers:
            questionForm.type === 'Descriptive'
              ? '-'
              : questionForm.answers.trim(),
          type: questionForm.type,
          status: questionForm.status,
          required: questionForm.status === 'Enabled',
        },
        ...previous,
      ]);
    }

    closeDialog();
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions((previous) => previous.filter((item) => item.id !== questionId));
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary', backgroundColor: 'grey.200' }}
        >
          Back
        </Button>
      </Stack>

      <Typography variant="h4" fontWeight={600} sx={{ mb: 2.5 }}>
        Question ({currentSurvey.shortTitle}){' '}
        <Box component="span" sx={{ color: 'error.main', fontSize: '0.9rem' }}>
          listing
        </Box>
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }} elevation={1}>
        <Typography variant="body2" color="error.main" fontWeight={600} sx={{ mb: 1 }}>
          Question CSV *
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFile />}
            sx={{ width: { xs: '100%', md: 'fit-content' }, justifyContent: 'flex-start' }}
          >
            Choose File
            <input hidden accept=".csv" type="file" onChange={handleFileChange} />
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
            {selectedFileName}
          </Typography>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleUploadSubmit}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Download />}
            onClick={handleDownloadFormat}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Download Question Format
          </Button>
        </Stack>

        {uploadMessage ? (
          <Alert severity={selectedFileName === 'No file chosen' ? 'warning' : 'success'} sx={{ mt: 2 }}>
            {uploadMessage}
          </Alert>
        ) : null}
      </Paper>

      <Paper sx={{ p: 0, overflow: 'hidden' }} elevation={1}>
        <Box
          sx={{
            px: 2,
            py: 1.75,
            color: 'common.white',
            background: 'linear-gradient(90deg, #d90429 0%, #f2a93b 100%)',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '0.85rem',
          }}
        >
          Question Required : {requiredQuestionCount} | Questions Added : {questions.length}
        </Box>

        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Add />}
            onClick={openCreateDialog}
            sx={{ textTransform: 'none', fontWeight: 600, mb: 2 }}
          >
            Add Question
          </Button>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' },
              gap: 2,
              mb: 2,
            }}
          >
            <FormControl size="small" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={typeFilter} label="Type" onChange={(event) => {
                setTypeFilter(event.target.value);
                setPage(0);
              }}>
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="MCQ">MCQ</MenuItem>
                <MenuItem value="Descriptive">Descriptive</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Question"
              value={questionFilter}
              onChange={(event) => {
                setQuestionFilter(event.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              size="small"
              label="Answers"
              value={answerFilter}
              onChange={(event) => {
                setAnswerFilter(event.target.value);
                setPage(0);
              }}
            />

            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(0);
              }}>
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="Enabled">Enabled</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05) }}>
                  <TableCell width={70}>#</TableCell>
                  <TableCell width={160}>Actions</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Answers</TableCell>
                  <TableCell width={130}>Type</TableCell>
                  <TableCell width={130}>Status</TableCell>
                  <TableCell width={130}>Created At</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedQuestions.length > 0 ? (
                  paginatedQuestions.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => openEditDialog(item)}
                          >
                            <EditOutlined fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteQuestion(item.id)}
                          >
                            <DeleteOutline fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell>{item.question}</TableCell>
                      <TableCell>{item.answers}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.type}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            color: 'common.white',
                            bgcolor: item.type === 'MCQ' ? 'error.main' : 'info.main',
                          }}
                        />
                      </TableCell>
                         <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            color: 'common.white',
                            bgcolor: 'green',
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary">No questions found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredQuestions.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </Box>
      </Paper>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="md">
        <DialogTitle>{editingQuestionId ? 'Edit Question' : 'Add Question'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Question"
              name="question"
              value={questionForm.question}
              onChange={handleQuestionFormChange}
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              label="Answers"
              name="answers"
              value={questionForm.answers}
              onChange={handleQuestionFormChange}
              fullWidth
              multiline
              minRows={2}
              helperText="Use commas to separate answer options for MCQ questions."
              disabled={questionForm.type === 'Descriptive'}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  name="type"
                  value={questionForm.type}
                  onChange={handleQuestionFormChange}
                >
                  <MenuItem value="MCQ">MCQ</MenuItem>
                  <MenuItem value="Descriptive">Descriptive</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  value={questionForm.status}
                  onChange={handleQuestionFormChange}
                >
                  <MenuItem value="Enabled">Enabled</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {formError ? <Alert severity="error">{formError}</Alert> : null}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleSaveQuestion}>
            Save Question
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}