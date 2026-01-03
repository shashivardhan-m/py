import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiCheck } from 'react-icons/fi';
import { apiClient } from '../services/api';
import { Card, Button, LoadingSpinner } from '../components/Common';
import { formatRelativeTime } from '../utils/helpers';

export const NotificationsPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => apiClient.getNotifications({ page: 1, limit: 50 }),
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => apiClient.markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => apiClient.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={() => markAllReadMutation.mutate()}
            variant="secondary"
            size="sm"
          >
            Mark all as read
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {notifications.length === 0 && !isLoading && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No notifications yet
            </p>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`${
              !notification.read
                ? 'border-l-4 border-l-primary-600'
                : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                      notification.type === 'success'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : notification.type === 'error'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : notification.type === 'warning'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}
                  >
                    {notification.type}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {notification.message}
                </p>
              </div>
              {!notification.read && (
                <Button
                  onClick={() => markReadMutation.mutate(notification.id)}
                  variant="ghost"
                  size="sm"
                >
                  <FiCheck size={18} />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
