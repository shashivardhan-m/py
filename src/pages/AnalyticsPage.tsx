import React from 'react';
import { FiUsers, FiHeart, FiTrendingUp, FiFileText } from 'react-icons/fi';
import { StatCard } from '../components/Analytics/StatCard';
import { PlatformStats } from '../components/Analytics/PlatformStats';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track your social media performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Followers"
          value={0}
          icon={<FiUsers size={24} />}
          change={0}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlatformStats />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Activity
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Activity chart coming soon
          </p>
        </div>
      </div>
    </div>
  );
};
