import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../services/api';
import { LoadingSpinner } from '../Common';
import { Platform } from '../../types';

export const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { platform } = useParams<{ platform: string }>();

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  const callbackMutation = useMutation({
    mutationFn: ({ platform, code, state }: { platform: Platform; code: string; state: string }) =>
      apiClient.handleOAuthCallback(platform, code, state),
    onSuccess: () => {
      navigate('/dashboard/accounts?connected=true');
    },
    onError: (error: any) => {
      console.error('OAuth callback error:', error);
      navigate('/dashboard/accounts?error=connection_failed');
    },
  });

  useEffect(() => {
    if (error) {
      navigate('/dashboard/accounts?error=oauth_denied');
      return;
    }

    if (code && state && platform) {
      callbackMutation.mutate({
        platform: platform as Platform,
        code,
        state,
      });
    } else {
      navigate('/dashboard/accounts?error=invalid_callback');
    }
  }, [code, state, platform, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Connecting your account...
        </p>
      </div>
    </div>
  );
};
