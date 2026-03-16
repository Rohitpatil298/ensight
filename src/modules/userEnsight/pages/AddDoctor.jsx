import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { surveyApi } from '../api';
import { Form, FormField } from '../../../shared/components/Form';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';

export function AddDoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    hospitalName: '',
    licenseNumber: '',
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
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.specialty.trim()) newErrors.specialty = 'Specialty is required';
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
      await surveyApi.addDoctor(formData);
      navigate('/survey');
    } catch (error) {
      console.error('Failed to add doctor:', error);
      setErrors({ submit: 'Failed to add doctor. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Doctor</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <Form onSubmit={handleSubmit}>
          <FormField label="Doctor Name" error={errors.name} required>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter doctor name"
            />
          </FormField>

          <FormField label="Specialty" error={errors.specialty} required>
            <Input
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Enter specialty"
            />
          </FormField>

          <FormField label="Email" error={errors.email} required>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </FormField>

          <FormField label="Phone" error={errors.phone}>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </FormField>

          <FormField label="Hospital Name" error={errors.hospitalName}>
            <Input
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Enter hospital name"
            />
          </FormField>

          <FormField label="License Number" error={errors.licenseNumber}>
            <Input
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Enter license number"
            />
          </FormField>

          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}

          <div className="flex space-x-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Doctor'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/survey')}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
