import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../services/api';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiClient.getCurrentUser(),
    enabled: isAuthenticated && !user,
    retry: false,
  });

  useEffect(() => {
    if (data && !user) {
      setUser(data);
    }
  }, [data, user, setUser]);

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  return {
    user: user || data,
    isLoading,
    isAuthenticated,
  };
};
