import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { Button, Input } from '../Common';
import { validateEmail } from '../../utils/helpers';
import type { LoginCredentials } from '../../types';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setTokens } = useAuthStore();
  
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => apiClient.login(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      setTokens(data.tokens);
      navigate('/dashboard');
    },
    onError: (error: any) => {
      setErrors({
        email: error.response?.data?.message || 'Login failed. Please try again.',
      });
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      loginMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginCredentials]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter your password"
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between text-sm">
        <Link
          to="/forgot-password"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        fullWidth
        loading={loginMutation.isPending}
      >
        Sign In
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};
