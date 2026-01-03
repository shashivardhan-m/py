import React from 'react';
import { LoginForm } from '../components/Auth/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">SocialHub</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your social media in one place
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Sign In
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
