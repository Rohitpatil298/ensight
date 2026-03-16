import { useState, useEffect } from 'react';
import { adminApi } from '../api';

export function useDivisions() {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDivisions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.getDivisions();
      setDivisions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDivisions();
  }, []);

  return { divisions, loading, error, reload: loadDivisions };
}
