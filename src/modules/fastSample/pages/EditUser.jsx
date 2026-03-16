import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { LoadingButton } from "../../../shared/components/LoadingButton";
import { surveyApi } from "../api";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    parentEmployeeCode: "",
    employeeCode: "",
    name: "",
    employeePosition: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call when endpoint is available
      // const response = await surveyApi.getUserById(id);
      // setFormData(response);

      // Mock data for demonstration
      setTimeout(() => {
        // Simulate fetching user data
        const mockUser = {
          id: parseInt(id),
          parentEmployeeCode: "227446",
          employeeCode: "40022134",
          name: "ADITYA MISHRA",
          employeePosition: "ME",
          email: "adityamishra2@lupin.com",
        };
        setFormData(mockUser);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.parentEmployeeCode.trim())
      newErrors.parentEmployeeCode = "Parent Employee Code is required";
    if (!formData.employeeCode.trim())
      newErrors.employeeCode = "Employee Code is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.employeePosition.trim())
      newErrors.employeePosition = "Employee Position is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSaving(true);
      // TODO: Replace with actual API call when endpoint is available
      // await surveyApi.updateUser(id, formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("User updated:", formData);
      
      // Navigate back to users list
      navigate("/fast-sample/admin/user");
    } catch (error) {
      console.error("Failed to update user:", error);
      setErrors({ submit: "Failed to update user. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/fast-sample/admin/user");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Back Button and Title */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleCancel}
          sx={{
            mb: 2,
            color: "text.secondary",
            backgroundColor: "grey.200",
          }}
        >
          Back
        </Button>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Edit User
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          User ID: #{id}
        </Typography>
      </Box>

      {/* Form */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          {/* Parent Employee Code */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              required
              sx={{
                display: "block",
                mb: 1,
                color: "text.primary",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Parent Employee Code
            </FormLabel>
            <TextField
              fullWidth
              name="parentEmployeeCode"
              placeholder="Enter Parent Employee Code"
              value={formData.parentEmployeeCode}
              onChange={handleChange}
              error={!!errors.parentEmployeeCode}
              helperText={errors.parentEmployeeCode}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Employee Code */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              required
              sx={{
                display: "block",
                mb: 1,
                color: "text.primary",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Employee Code
            </FormLabel>
            <TextField
              fullWidth
              name="employeeCode"
              placeholder="Enter Employee Code"
              value={formData.employeeCode}
              onChange={handleChange}
              error={!!errors.employeeCode}
              helperText={errors.employeeCode}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Name */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              required
              sx={{
                display: "block",
                mb: 1,
                color: "text.primary",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Name
            </FormLabel>
            <TextField
              fullWidth
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Employee Position */}
          <Box sx={{ mb: 3 }}>
            <FormLabel
              required
              sx={{
                display: "block",
                mb: 1,
                color: "text.primary",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Employee Position
            </FormLabel>
            <TextField
              fullWidth
              name="employeePosition"
              placeholder="Enter Employee Position"
              value={formData.employeePosition}
              onChange={handleChange}
              error={!!errors.employeePosition}
              helperText={errors.employeePosition}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Email */}
          <Box sx={{ mb: 4 }}>
            <FormLabel
              required
              sx={{
                display: "block",
                mb: 1,
                color: "text.primary",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Email
            </FormLabel>
            <TextField
              fullWidth
              name="email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Submit Error */}
          {errors.submit && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Typography>
          )}

          {/* Submit Button */}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={saving}
            loadingText="Saving..."
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              bgcolor: "#22C55E",
              fontSize: "0.9375rem",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#16A34A",
                boxShadow: "none",
              },
            }}
          >
            Update User
          </LoadingButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditUser;
