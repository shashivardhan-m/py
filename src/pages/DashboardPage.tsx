import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiUsers, FiHeart, FiTrendingUp, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { apiClient } from '../services/api';
import { FeedList } from '../components/Feed/FeedList';
import { StatCard } from '../components/Analytics/StatCard';
import { Button, Card } from '../components/Common';

export const DashboardPage: React.FC = () => {
  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => apiClient.getConnectedAccounts(),
  });

  const connectedCount = accounts?.filter((acc) => acc.isActive).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening.
          </p>
        </div>
        <Link to="/dashboard/compose">
          <Button>Create Post</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Connected Accounts"
          value={connectedCount}
          icon={<FiUsers size={24} />}
        />
        <StatCard
          title="Total Posts"
          value={0}
          icon={<FiFileText size={24} />}
          change={0}
        />
        <StatCard
          title="Total Engagement"
          value={0}
          icon={<FiHeart size={24} />}
          change={0}
        />
        <StatCard
          title="Avg Engagement Rate"
          value={0}
          icon={<FiTrendingUp size={24} />}
          format="percentage"
          change={0}
        />
      </div>

      {connectedCount === 0 ? (
        <Card>
          <div className="text-center py-12">
            <FiUsers size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Accounts Connected
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connect your social media accounts to start managing your content
            </p>
            <Link to="/dashboard/accounts">
              <Button>Connect Accounts</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Unified Feed
          </h2>
          <FeedList />
        </div>
      )}
    </div>
  );
};
