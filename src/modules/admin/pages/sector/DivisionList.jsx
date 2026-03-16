import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, alpha } from '@mui/material';
import { Add } from '@mui/icons-material';
import { adminApi } from '../api';
import { DivisionCard } from '../components/DivisionCard';
import { PageHeader } from '../../../shared/components/PageHeader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ListSkeleton } from '../../../shared/components/SkeletonLoader';

export function DivisionList() {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDivisions();
  }, []);

  const loadDivisions = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getDivisions();
      setDivisions(data);
    } catch (error) {
      console.error('Failed to load divisions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this division?')) {
      try {
        await adminApi.deleteDivision(id);
        loadDivisions();
      } catch (error) {
        console.error('Failed to delete division:', error);
      }
    }
  };

  if (loading) {
    return <ListSkeleton />;
  }

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      <PageHeader
        title="Divisions"
        subtitle="Manage organizational divisions and departments"
        actions={
          <Button
            component={Link}
            to="/admin/divisions/create"
            variant="contained"
            startIcon={<Add />}
            sx={{
              borderRadius: 2.5,
              px: 3,
              py: 1.25,
              fontWeight: 600,
            }}
          >
            Create Division
          </Button>
        }
      />

      {divisions.length === 0 ? (
        <EmptyState
          icon="folder"
          title="No divisions found"
          description="Get started by creating your first division to organize your team."
          actionLabel="Create Division"
          onAction={() => (window.location.href = '/admin/divisions/create')}
        />
      ) : (
        <Grid container spacing={3}>
          {divisions.map((division) => (
            <Grid item xs={12} sm={6} lg={4} key={division.id}>
              <DivisionCard
                division={division}
                onEdit={(div) => console.log('Edit:', div)}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
