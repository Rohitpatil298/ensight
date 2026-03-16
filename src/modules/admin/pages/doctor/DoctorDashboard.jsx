import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Paper,
  Grid,
  Chip,
  TextField,
} from '@mui/material';
import {
  PictureAsPdf,
  Edit,
  Download,
} from '@mui/icons-material';
import { DataTableWithDropdown } from '../../../../shared/components/DataTableWithDropdown';

const DoctorDashboard = () => {
  const [viewType, setViewType] = useState('doctor');
  const [selectedSurvey, setSelectedSurvey] = useState('HD Test 1');
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchEmpId, setSearchEmpId] = useState('');
  const [searchDrName, setSearchDrName] = useState('');

  // Mock data - replace with actual API call
  const mockData = [
    {
      id: 498,
      survey: 'Durgaxin',
      empId: '241586',
      drName: 'SURENDRA KUMAR CHINTALA',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'Drkumarsuren@gmail.com',
      mobile: '7976982881',
      professionType: '',
      doctorUid: 'RJ012915',
      qualification: '',
      panNumber: 'APTPG6511Q',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '29 Dec, 2025 4:11 PM',
    },
    {
      id: 497,
      survey: 'Durgaxin',
      empId: '243073',
      drName: 'Akshath Kannan',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'akshath.kannan@example.com',
      mobile: '9876543210',
      professionType: '',
      doctorUid: 'KA045621',
      qualification: '',
      panNumber: 'BKXPK7890K',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '28 Dec, 2025 3:45 PM',
    },
    {
      id: 496,
      survey: 'Durgaxin',
      empId: '243073',
      drName: 'Ashish Parameshwar',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'ashish.p@example.com',
      mobile: '9123456780',
      professionType: '',
      doctorUid: 'KA032145',
      qualification: '',
      panNumber: 'CNTPM3456P',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '27 Dec, 2025 2:30 PM',
    },
    {
      id: 495,
      survey: 'Durgaxin',
      empId: '207996',
      drName: 'INDIRA VARGHESE',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'indira.v@example.com',
      mobile: '9876501234',
      professionType: '',
      doctorUid: 'KL078623',
      qualification: '',
      panNumber: 'ADPPV5678A',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '27 Dec, 2025 1:15 PM',
    },
    {
      id: 494,
      survey: 'Durgaxin',
      empId: '207996',
      drName: 'JAZEEL ABDULKADER',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'jazeel.a@example.com',
      mobile: '9988776655',
      professionType: '',
      doctorUid: 'KL056789',
      qualification: '',
      panNumber: 'BMXPA4321B',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '26 Dec, 2025 5:45 PM',
    },
    {
      id: 465,
      survey: 'Test one',
      empId: '243296',
      drName: 'V.SATHYANARAYANAN',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'v.sathya@example.com',
      mobile: '9845123456',
      professionType: '',
      doctorUid: 'TN098765',
      qualification: '',
      panNumber: 'BKLPS6789C',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '25 Dec, 2025 11:30 AM',
    },
    {
      id: 464,
      survey: 'Test one',
      empId: '40002042',
      drName: 'CHANDRASHEKHAR SADASHIVAPPA',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'chandra.s@example.com',
      mobile: '9567834210',
      professionType: '',
      doctorUid: 'KA065432',
      qualification: '',
      panNumber: 'DKLPC1234D',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '24 Dec, 2025 9:20 AM',
    },
    {
      id: 463,
      survey: 'Test one',
      empId: '40002042',
      drName: 'RAVEENDRA R',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'raveendra.r@example.com',
      mobile: '9443322110',
      professionType: '',
      doctorUid: 'KA087654',
      qualification: '',
      panNumber: 'EPRPR5678E',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '23 Dec, 2025 4:50 PM',
    },
    {
      id: 462,
      survey: 'Test one',
      empId: '210018',
      drName: 'PRASHANT AGARWAL',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'prashant.a@example.com',
      mobile: '9112233445',
      professionType: '',
      doctorUid: 'UP034567',
      qualification: '',
      panNumber: 'FGTPA2345F',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '22 Dec, 2025 2:15 PM',
    },
    {
      id: 461,
      survey: 'Test one',
      empId: '210018',
      drName: 'Shashti Kumar Gupta',
      agreementVerified: 'No',
      surveyCompleted: 'No',
      fmvCompleted: 'No',
      otpVerified: 'No',
      otp: '0',
      otpDate: '',
      signature: '',
      signatureDate: '',
      receivingSignature: '',
      fmvSignature: '',
      panCard: '',
      govtEmployeeDeclaration: '',
      email: 'shashti.kg@example.com',
      mobile: '9223344556',
      professionType: '',
      doctorUid: 'UP056789',
      qualification: '',
      panNumber: 'GHSPG3456G',
      yearOfExperience: '',
      address: '',
      ipDetails: '',
      createdDate: '21 Dec, 2025 10:05 AM',
    },
  ];

  useEffect(() => {
    setDoctorData(mockData);
  }, []);

  const handleDownloadCSV = () => {
    // Implement CSV download logic
    console.log('Downloading CSV...');
  };

  const handleDownloadAllCSV = () => {
    // Implement all CSV download logic
    console.log('Downloading all CSV...');
  };

  const handlePDFDownload = (row) => {
    console.log('Download PDF for:', row);
  };

  const handleEdit = (row) => {
    console.log('Edit:', row);
  };

  const StatusChip = ({ status }) => {
    const isNo = status === 'No';
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          bgcolor: isNo ? 'secondary.main' : 'success.main',
          color: 'white',
          fontWeight: 600,
          minWidth: 50,
          fontSize: '0.75rem',
        }}
      />
    );
  };

  // Define columns for DataTable
  const columns = [
    {
      field: 'id',
      header: '#',
      render: (value) => `${value}`,
    },
    {
      field: 'actions',
      header: 'Actions',
      render: (value, row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<PictureAsPdf />}
            onClick={(e) => {
              e.stopPropagation();
              handlePDFDownload(row);
            }}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              textTransform: 'none',
              fontSize: '0.75rem',
              minWidth: 'auto',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              '&:hover': {
                borderColor: 'primary.dark',
                bgcolor: 'primary.light',
              },
            }}
          >
            PDF
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Edit />}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            sx={{
              borderColor: 'success.main',
              color: 'success.main',
              textTransform: 'none',
              fontSize: '0.75rem',
              minWidth: 'auto',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              '&:hover': {
                borderColor: 'success.dark',
                bgcolor: 'success.light',
              },
            }}
          >
            Edit
          </Button>
        </Box>
      ),
    },
    {
      field: 'survey',
      header: 'Survey',
    },
    {
      field: 'empId',
      header: 'EMP Id',
    },
    {
      field: 'drName',
      header: 'Dr. Name',
    },
    {
      field: 'agreementVerified',
      header: 'Agreement Verified ?',
      render: (value) => <StatusChip status={value} />,
    },
    {
      field: 'surveyCompleted',
      header: 'Survey Completed ?',
      render: (value) => <StatusChip status={value} />,
    },
    {
      field: 'fmvCompleted',
      header: 'FMV Completed ?',
      render: (value) => <StatusChip status={value} />,
    },
    {
      field: 'otpVerified',
      header: 'OTP Verified ?',
      render: (value) => <StatusChip status={value} />,
    },
    {
      field: 'otp',
      header: 'OTP',
    },
    {
      field: 'otpDate',
      header: 'OTP Date',
    },
    {
      field: 'signature',
      header: 'Signature',
    },
  ];

  // Render expanded content for each row
  const renderExpandedContent = (row) => {
    const fields = [
      { label: 'Signature Date', value: row.signatureDate },
      { label: 'Receiving Signature', value: row.receivingSignature },
      { label: 'FMV Signature', value: row.fmvSignature },
      { label: 'Pan Card', value: row.panCard },
      { label: 'Govt. Employee Declaration', value: row.govtEmployeeDeclaration },
      { label: 'Email', value: row.email },
      { label: 'Mobile', value: row.mobile },
      { label: 'Profession Type', value: row.professionType },
      { label: 'Doctor Uid', value: row.doctorUid },
      { label: 'Qualification', value: row.qualification },
      { label: 'Pan Number', value: row.panNumber },
      { label: 'Year of Experience', value: row.yearOfExperience },
      { label: 'Address', value: row.address },
      { label: 'IP Details', value: row.ipDetails },
      { label: 'Created Date', value: row.createdDate },
    ];

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {fields.map((field, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              sx={{ minWidth: 200 }}
            >
              {field.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {field.value || '-'}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: 'text.primary', mb: 0.5 }}
        >
          Survey Responses & Activity Status
      <span style={{ color: '#dc3545' }}> listing</span>
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Section - Form and Table */}
        <Grid item xs={12} lg={8}>
          {/* Filter Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {/* Type Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ mb: 1.5, color: 'text.primary' }}
              >
                Type <span style={{ color: '#E53935' }}>*</span>
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={viewType}
                  onChange={(e) => setViewType(e.target.value)}
                >
                  <FormControlLabel
                    value="region"
                    control={
                      <Radio
                        sx={{
                          color: 'success.main',
                          '&.Mui-checked': {
                            color: 'success.main',
                          },
                        }}
                      />
                    }
                    label="Region wise summary"
                  />
                  <FormControlLabel
                    value="doctor"
                    control={
                      <Radio
                        sx={{
                          color: 'secondary.main',
                          '&.Mui-checked': {
                            color: 'secondary.main',
                          },
                        }}
                      />
                    }
                    label="Doctor wise response"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Survey Selection */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ mb: 1, color: 'text.primary' }}
              >
                Survey <span style={{ color: '#E53935' }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={selectedSurvey}
                  onChange={(e) => setSelectedSurvey(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'divider',
                    },
                  }}
                >
                  <MenuItem value="HD Test 1">HD Test 1</MenuItem>
                  <MenuItem value="Durgaxin">Durgaxin</MenuItem>
                  <MenuItem value="Test one">Test one</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Download CSV Button */}
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownloadCSV}
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                px: 3,
                py: 1,
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  boxShadow: 'none',
                },
              }}
            >
              Download CSV
            </Button>
          </Paper>
          <Paper sx={{ p: 3, mb: 3 }} elevation={1}>
                  {/* Filters - Short Title and Status */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Survey
                      </Typography>
                      <FormControl size="small" sx={{ minWidth: 250 }}>
                        <Select
                          value={searchStatus}
                          onChange={(e) => setSearchStatus(e.target.value)}
                          displayEmpty
                          sx={{ bgcolor: 'white' }}
                        >
                          <MenuItem value="">Select Survey</MenuItem>
                          <MenuItem value="medical">Medical</MenuItem>
                          <MenuItem value="sales">Sales</MenuItem>
                          <MenuItem value="completed">Completed-Archived</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                                        <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        EMP Id
                      </Typography>
                      <TextField
                        size="small"
                        value={searchEmpId}
                        onChange={(e) => setSearchEmpId(e.target.value)}
                        sx={{ minWidth: 250, bgcolor: 'white' }}
                      />
                    </Box>
                                        <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Dr Name
                      </Typography>
                      <TextField
                        size="small"
                        value={searchDrName}
                        onChange={(e) => setSearchDrName(e.target.value)}
                        sx={{ minWidth: 250, bgcolor: 'white' }}
                      />
                    </Box>
                  </Box>
          {/* All Survey/Non Survey CSV Button */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownloadAllCSV}
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                px: 3,
                py: 1,
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  boxShadow: 'none',
                },
              }}
            >
              All Survey/Non Survey CSV
            </Button>
          </Box>

          {/* Data Table */}
          <DataTableWithDropdown
            columns={columns}
            data={doctorData}
            renderExpandedContent={renderExpandedContent}
            footerText={`Showing 1 to ${doctorData.length} of ${doctorData.length} entries`}
          />
          </Paper>
        </Grid>

        {/* Right Section - Illustration */}
        {/* <Grid item xs={12} lg={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: 400,
            }}
          >
            <Box
              component="img"
              src="/images/doctor-dashboard-illustration.svg"
              alt="Doctor Dashboard Illustration"
              sx={{
                maxWidth: '100%',
                height: 'auto',
              }}
              onError={(e) => {
                // Fallback illustration if image not found
                e.target.style.display = 'none';
              }}
            />
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;