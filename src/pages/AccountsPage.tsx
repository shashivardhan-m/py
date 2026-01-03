import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { apiClient } from '../services/api';
import { AccountCard } from '../components/AccountManager/AccountCard';
import { ConnectAccount } from '../components/AccountManager/ConnectAccount';
import { LoadingSpinner } from '../components/Common';

export const AccountsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: accounts, isLoading, isError } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => apiClient.getConnectedAccounts(),
  });

  useEffect(() => {
    const connected = searchParams.get('connected');
    const error = searchParams.get('error');

    if (connected) {
      // Could show a success toast here
      console.log('Account connected successfully');
      setSearchParams({});
    }

    if (error) {
      // Could show an error toast here
      console.error('Connection error:', error);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Connected Accounts
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your connected social media accounts
        </p>
      </div>

      <ConnectAccount />

      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {isError && (
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">
            Failed to load accounts. Please try again.
          </p>
        </div>
      )}

      {accounts && accounts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Your Accounts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </div>
      )}

      {accounts && accounts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No accounts connected yet. Connect your first account above!
          </p>
        </div>
      )}
    </div>
  );
};
