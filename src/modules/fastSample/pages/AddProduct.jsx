import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Stack,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchProductData();
    }
  }, [id]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call when endpoint is available
      // const response = await surveyApi.getProductById(id);
      // setFormData(response);
      
      // Mock data for demonstration
      setTimeout(() => {
        setFormData({
          name: "ESTUCHOL TAB 150MG 10 X 10 T",
          status: "Active",
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
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
      setLoading(true);
      // TODO: Replace with actual API call when endpoint is available
      if (isEditMode) {
        // await surveyApi.updateProduct(id, formData);
        console.log("Product updated:", formData);
      } else {
        // await surveyApi.createProduct(formData);
        console.log("Product created:", formData);
      }
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate("/fast-sample/admin/products");
      }, 1000);
    } catch (error) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} product:`, error);
      setErrors({ submit: `Failed to ${isEditMode ? 'update' : 'create'} product. Please try again.` });
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/fast-sample/admin/products")}
          sx={{
            color: "#6B7280",
            "&:hover": {
              bgcolor: "transparent",
              color: "#374151",
            },
          }}
        >
          Back
        </Button>
        <Typography variant="h4" fontWeight={600}>
          Product <span style={{ color: "#16A34A" }}>{isEditMode ? '>> edit' : '>> create'}</span>
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E5E7EB",
          borderRadius: 2,
          p: 4,
          maxWidth: 800,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box>
              <FormLabel
                sx={{
                  display: "block",
                  mb: 1,
                  color: "#374151",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  "&::after": {
                    content: '" *"',
                    color: "#EF4444",
                  },
                }}
              >
                Name
              </FormLabel>
              <TextField
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name..."
                error={!!errors.name}
                helperText={errors.name}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "white",
                    "& fieldset": {
                      borderColor: "#D1D5DB",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9CA3AF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#22C55E",
                    },
                  },
                }}
              />
            </Box>

            <Box>
              <FormLabel
                sx={{
                  display: "block",
                  mb: 1,
                  color: "#374151",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  "&::after": {
                    content: '" *"',
                    color: "#EF4444",
                  },
                }}
              >
                Status
              </FormLabel>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Active"
                    control={
                      <Radio
                        sx={{
                          color: "#22C55E",
                          "&.Mui-checked": {
                            color: "#22C55E",
                          },
                        }}
                      />
                    }
                    label="Active"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.875rem",
                        color: "#374151",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="Inactive"
                    control={
                      <Radio
                        sx={{
                          color: "#EF4444",
                          "&.Mui-checked": {
                            color: "#EF4444",
                          },
                        }}
                      />
                    }
                    label="Inactive"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.875rem",
                        color: "#374151",
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {errors.submit && (
              <Typography variant="body2" color="error">
                {errors.submit}
              </Typography>
            )}

            <Box>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: "#3B82F6",
                  color: "white",
                  fontWeight: 600,
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    bgcolor: "#2563EB",
                  },
                  "&:disabled": {
                    bgcolor: "#E5E7EB",
                    color: "#9CA3AF",
                  },
                }}
              >
                {loading ? (isEditMode ? "Updating..." : "Submitting...") : (isEditMode ? "Update" : "Submit")}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;
