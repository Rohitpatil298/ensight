# Quick Start Guide - Ensight UI Transformation

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎨 Quick Reference - Brand Colors

Use these colors throughout the application:

```javascript
// Primary Brand Color
primary: '#F4A300'

// Secondary/Accent
secondary: '#E53935'

// Background
background: '#F8FAFC'

// Text
textPrimary: '#1E293B'
textSecondary: '#64748B'
```

---

## 🧩 Component Usage Examples

### 1. Page Layout

```jsx
import { PageHeader } from '../shared/components/PageHeader';
import { Box } from '@mui/material';

function MyPage() {
  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      <PageHeader
        title="My Page"
        subtitle="Description of this page"
        actions={
          <Button variant="contained">Action</Button>
        }
      />
      
      {/* Your content */}
    </Box>
  );
}
```

### 2. Data Loading

```jsx
import { useState, useEffect } from 'react';
import { DashboardSkeleton } from '../shared/components/SkeletonLoader';

function MyComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    setLoading(true);
    try {
      const result = await api.fetchData();
      setData(result);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <DashboardSkeleton />;
  
  return <div>{/* Render data */}</div>;
}
```

### 3. Empty State

```jsx
import { EmptyState } from '../shared/components/EmptyState';

function MyList({ items }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon="folder"
        title="No items found"
        description="Create your first item to get started"
        actionLabel="Create Item"
        onAction={() => navigate('/create')}
      />
    );
  }
  
  return <div>{/* Render items */}</div>;
}
```

### 4. Form with Validation

```jsx
import { useState } from 'react';
import { TextField, Stack, Card, CardContent } from '@mui/material';
import { LoadingButton } from '../shared/components/LoadingButton';
import { useToast } from '../shared/components/Toast';

function MyForm() {
  const { showSuccess, showError, ToastComponent } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      setLoading(true);
      await api.submit(formData);
      showSuccess('Form submitted successfully!');
    } catch (error) {
      showError('Submission failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <ToastComponent />
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
              
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
              
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                loadingText="Submitting..."
              >
                Submit
              </LoadingButton>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
```

### 5. Enhanced Cards

```jsx
import { Card, CardContent, Typography, alpha } from '@mui/material';

function StatCard({ title, value, icon }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h3" fontWeight={800}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}
```

---

## 📊 Common Patterns

### Grid Layout for Cards
```jsx
import { Grid } from '@mui/material';

<Grid container spacing={3}>
  <Grid item xs={12} md={6} lg={4}>
    <StatCard {...props} />
  </Grid>
  <Grid item xs={12} md={6} lg={4}>
    <StatCard {...props} />
  </Grid>
  <Grid item xs={12} md={6} lg={4}>
    <StatCard {...props} />
  </Grid>
</Grid>
```

### Responsive Spacing
```jsx
// Padding
<Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, sm: 4 } }}>

// Margin
<Box sx={{ mb: { xs: 2, md: 3 } }}>

// Gap
<Stack spacing={{ xs: 2, md: 3 }}>
```

### Hover Effects
```jsx
<Box
  sx={{
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
  }}
>
```

---

## 🎭 Animation Classes

Add these to your components for smooth animations:

```jsx
// CSS classes (in index.css)
className="animate-fade-in"
className="animate-slide-up"
className="animate-slide-down"

// MUI Fade component
import { Fade } from '@mui/material';

<Fade in={true} timeout={600}>
  <Box>Content</Box>
</Fade>
```

---

## 🎨 Theme Access

```jsx
import { useTheme } from '@mui/material';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      color: theme.palette.primary.main,
      bgcolor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
    }}>
      Content
    </Box>
  );
}
```

---

## 📱 Responsive Breakpoints

```jsx
// xs: 0px (mobile)
// sm: 600px (tablet)
// md: 960px (small laptop)
// lg: 1280px (desktop)
// xl: 1920px (large desktop)

<Box sx={{
  display: { xs: 'block', md: 'flex' },
  width: { xs: '100%', md: '50%' },
}}>
```

---

## ⚡ Performance Tips

1. **Use lazy loading for routes** (already implemented)
2. **Show skeleton loaders during data fetch**
3. **Memoize expensive computations**
   ```jsx
   import { useMemo } from 'react';
   
   const expensiveValue = useMemo(() => {
     return computeExpensiveValue(data);
   }, [data]);
   ```
4. **Debounce search inputs**
   ```jsx
   import { useState, useEffect } from 'react';
   
   function useDebounce(value, delay) {
     const [debouncedValue, setDebouncedValue] = useState(value);
     
     useEffect(() => {
       const handler = setTimeout(() => {
         setDebouncedValue(value);
       }, delay);
       
       return () => clearTimeout(handler);
     }, [value, delay]);
     
     return debouncedValue;
   }
   ```

---

## 🔐 Common Mistakes to Avoid

❌ **Don't do this**:
```jsx
// Inline styles without sx prop
<div style={{ color: 'red' }}>

// Hardcoded colors
<Box sx={{ bgcolor: '#ff0000' }}>

// No loading states
const data = await api.fetch();
return <div>{data}</div>;

// No error boundaries
```

✅ **Do this instead**:
```jsx
// Use sx prop with theme
<Box sx={{ color: 'error.main' }}>

// Use theme colors
<Box sx={{ bgcolor: 'primary.main' }}>

// Show loading states
if (loading) return <Skeleton />;
return <div>{data}</div>;

// Handle errors
try {
  const data = await api.fetch();
} catch (error) {
  showError('Failed to load data');
}
```

---

## 📚 Further Reading

- [Material-UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

---

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Review the `UI_TRANSFORMATION_SUMMARY.md` file
3. Check component examples above
4. Refer to Material-UI documentation

---

## 🎯 Checklist for New Pages

When creating a new page:

- [ ] Import and use `PageHeader` for consistent headers
- [ ] Add skeleton loader for loading states
- [ ] Add empty state when no data
- [ ] Use toast notifications for feedback
- [ ] Wrap forms with proper validation
- [ ] Use `LoadingButton` for submit actions
- [ ] Make it responsive (test on mobile)
- [ ] Add hover effects on interactive elements
- [ ] Use theme colors (no hardcoded colors)
- [ ] Test accessibility (keyboard navigation, screen readers)

---

Happy coding! 🚀
