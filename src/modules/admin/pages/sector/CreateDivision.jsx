import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Stack,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { adminApi } from '../../api';
import { PageHeader } from '../../../../shared/components/PageHeader';
import { LoadingButton } from '../../../../shared/components/LoadingButton';

export function CreateDivision() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.code.trim()) newErrors.code = 'Code is required';
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
      await adminApi.createDivision(formData);
      showSuccess('Division created successfully!');
      setTimeout(() => navigate('/admin/divisions'), 1500);
    } catch (error) {
      console.error('Failed to create division:', error);
      showError('Failed to create division. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
      
      <PageHeader
        title="Create Division"
        subtitle="Add a new division to your organization"
        breadcrumbs={[
          { label: 'Divisions', href: '/admin/divisions' },
          { label: 'Create' },
        ]}
      />

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Division Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
                fullWidth
                autoFocus
              />

              <TextField
                label="Division Code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                error={!!errors.code}
                helperText={errors.code}
                required
                fullWidth
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                fullWidth
              />

              {errors.submit && (
                <Alert severity="error">{errors.submit}</Alert>
              )}

              <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loading}
                  loadingText="Creating..."
                  startIcon={<Save />}
                  sx={{ borderRadius: 2.5, px: 4, py: 1.25 }}
                >
                  Create Division
                </LoadingButton>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate('/admin/divisions')}
                  startIcon={<Cancel />}
                  sx={{ borderRadius: 2.5, px: 4, py: 1.25 }}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
