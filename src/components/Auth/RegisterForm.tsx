import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { Button, Input } from '../Common';
import { validateEmail, validatePassword } from '../../utils/helpers';
import type { RegisterData } from '../../types';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setTokens } = useAuthStore();
  
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    username: '',
    fullName: '',
    password: '',
  });
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Partial<RegisterData & { confirmPassword: string }>>({});

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => apiClient.register(data),
    onSuccess: (data) => {
      setUser(data.user);
      setTokens(data.tokens);
      navigate('/dashboard');
    },
    onError: (error: any) => {
      setErrors({
        email: error.response?.data?.message || 'Registration failed. Please try again.',
      });
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterData & { confirmPassword: string }> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.errors[0];
    }

    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      registerMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterData]) {
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
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        placeholder="Choose a username"
        autoComplete="username"
      />

      <Input
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        placeholder="Enter your full name"
        autoComplete="name"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Create a password"
        autoComplete="new-password"
        helperText="At least 8 characters with uppercase, lowercase, and numbers"
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }
        }}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        autoComplete="new-password"
      />

      <Button
        type="submit"
        fullWidth
        loading={registerMutation.isPending}
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};
