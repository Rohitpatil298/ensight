import { useState, useEffect } from 'react';
import { surveyApi } from '../api';

export function useSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSurveys = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await surveyApi.getSurveys();
      setSurveys(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSurveys();
  }, []);

  return { surveys, loading, error, reload: loadSurveys };
}
