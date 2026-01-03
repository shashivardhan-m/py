import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiUsers, FiFileText, FiTrendingUp } from 'react-icons/fi';
import { apiClient } from '../../services/api';
import { Card, LoadingSpinner } from '../Common';
import { formatNumber, getPlatformColor } from '../../utils/helpers';

export const PlatformStats: React.FC = () => {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['platformStats'],
    queryFn: () => apiClient.getPlatformStats(),
  });

  if (isLoading) {
    return (
      <Card>
        <LoadingSpinner />
      </Card>
    );
  }

  if (isError || !stats) {
    return (
      <Card>
        <p className="text-red-600 dark:text-red-400">Failed to load platform stats</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Platform Performance
      </h3>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.platform}
            className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-3 h-3 rounded-full ${getPlatformColor(stat.platform)}`}
                />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {stat.platform}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stat.avgEngagementRate.toFixed(2)}% avg engagement
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 mb-1">
                  <FiUsers size={14} />
                  <span className="text-xs">Followers</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {formatNumber(stat.followers)}
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 mb-1">
                  <FiFileText size={14} />
                  <span className="text-xs">Posts</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {formatNumber(stat.totalPosts)}
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 mb-1">
                  <FiTrendingUp size={14} />
                  <span className="text-xs">Engagement</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {formatNumber(stat.totalEngagement)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {stats.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No platform data available yet
        </p>
      )}
    </Card>
  );
};
