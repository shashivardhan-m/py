import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { FiPlus } from 'react-icons/fi';
import { Card, Button } from '../Common';
import { apiClient } from '../../services/api';
import { Platform } from '../../types';
import { getPlatformColor } from '../../utils/helpers';

const platformList = [
  { platform: Platform.TWITTER, name: 'Twitter / X' },
  { platform: Platform.FACEBOOK, name: 'Facebook' },
  { platform: Platform.INSTAGRAM, name: 'Instagram' },
  { platform: Platform.LINKEDIN, name: 'LinkedIn' },
  { platform: Platform.TIKTOK, name: 'TikTok' },
];

export const ConnectAccount: React.FC = () => {
  const connectMutation = useMutation({
    mutationFn: (platform: Platform) => apiClient.connectAccount(platform),
    onSuccess: (data) => {
      window.location.href = data.authUrl;
    },
  });

  const handleConnect = (platform: Platform) => {
    connectMutation.mutate(platform);
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Connect New Account
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {platformList.map(({ platform, name }) => (
          <Button
            key={platform}
            onClick={() => handleConnect(platform)}
            variant="secondary"
            loading={connectMutation.isPending && connectMutation.variables === platform}
            className="justify-start"
          >
            <span
              className={`w-3 h-3 rounded-full mr-2 ${getPlatformColor(platform)}`}
            />
            <FiPlus size={16} className="mr-2" />
            {name}
          </Button>
        ))}
      </div>
    </Card>
  );
};
