import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiTrash2, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Card, Button } from '../Common';
import { apiClient } from '../../services/api';
import { getPlatformColor, formatDate } from '../../utils/helpers';
import type { SocialAccount } from '../../types';

interface AccountCardProps {
  account: SocialAccount;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const queryClient = useQueryClient();

  const disconnectMutation = useMutation({
    mutationFn: () => apiClient.disconnectAccount(account.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  const handleDisconnect = () => {
    if (window.confirm(`Disconnect ${account.displayName} from ${account.platform}?`)) {
      disconnectMutation.mutate();
    }
  };

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {account.profilePicture && (
            <img
              src={account.profilePicture}
              alt={account.displayName}
              className="h-12 w-12 rounded-full"
            />
          )}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {account.displayName}
              </h3>
              {account.isActive ? (
                <FiCheckCircle className="text-green-500" size={16} />
              ) : (
                <FiXCircle className="text-red-500" size={16} />
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{account.username}
            </p>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-medium text-white rounded ${getPlatformColor(
                account.platform
              )}`}
            >
              {account.platform}
            </span>
          </div>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={handleDisconnect}
          loading={disconnectMutation.isPending}
        >
          <FiTrash2 size={16} />
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Connected: {formatDate(account.connectedAt)}
          </p>
          {account.permissions.length > 0 && (
            <div className="mt-2">
              <p className="text-gray-500 dark:text-gray-400 mb-1">Permissions:</p>
              <div className="flex flex-wrap gap-1">
                {account.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
