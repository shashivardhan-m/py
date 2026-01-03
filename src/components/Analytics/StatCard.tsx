import React from 'react';
import { Card } from '../Common';
import { formatNumber } from '../../utils/helpers';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: number;
  format?: 'number' | 'percentage';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  format = 'number',
}) => {
  const formattedValue = format === 'percentage' ? `${value.toFixed(1)}%` : formatNumber(value);
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {formattedValue}
          </p>
          {change !== undefined && (
            <p
              className={`text-sm mt-1 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositive ? '+' : ''}
              {change.toFixed(1)}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-400">
          {icon}
        </div>
      </div>
    </Card>
  );
};
